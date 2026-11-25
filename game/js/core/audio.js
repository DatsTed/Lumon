/* ================= AUDIO ================= */
let AC=null,master=null,musG=null,sfxG=null,musicOn=!!OPT.music,mStep=0,mNext=0;
let song=SONGS.town;
const mf=n=>440*Math.pow(2,(n-69)/12);
function audioInit(){if(AC){AC.resume&&AC.resume();return}try{AC=new(window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=.034*3;master.connect(AC.destination);musG=AC.createGain();sfxG=AC.createGain();musG.connect(master);sfxG.connect(master);applyVol();mNext=AC.currentTime+.1;setInterval(sched,60)}catch(e){AC=null}}
function applyVol(){if(!AC||!musG)return;const t=AC.currentTime;musG.gain.setTargetAtTime(Math.pow(OPT.mv/100,1.5)*1.6,t,.05);sfxG.gain.setTargetAtTime(Math.pow(OPT.sv/100,1.5)*1.6,t,.05)}
function tone(f,t,d,type,v,bus){const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(bus||sfxG||master);o.start(t);o.stop(t+d+.02)}
let NOISE=null;function noiseBuf(){if(NOISE)return NOISE;const b=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return NOISE=b}
function drum(k,t){if(k==='k'){const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(45,t+.12);g.gain.setValueAtTime(1.1,t);g.gain.exponentialRampToValueAtTime(.001,t+.16);o.connect(g);g.connect(musG||master);o.start(t);o.stop(t+.18);return}
 const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=noiseBuf();f.type=k==='h'?'highpass':'bandpass';f.frequency.value=k==='h'?7000:1800;const d=k==='h'?.04:.14,v=k==='h'?.35:.7;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(f);f.connect(g);g.connect(musG||master);s.start(t,Math.random());s.stop(t+d+.02)}
function sched(){if(!AC)return;while(mNext<AC.currentTime+.2){if(musicOn){const n=song.m[mStep%song.m.length];if(n)tone(mf(n),mNext,song.t*(song.w?1.6:.9),song.w||'square',song.v||.22,musG);
  const bs=song.bb?2:4;if(mStep%bs===0)tone(mf(song.b[(mStep/4|0)%song.b.length]),mNext,song.t*(bs-.4),song.bb?'square':'triangle',song.bb?.22:.5,musG);
  if(song.d){const c=song.d[mStep%song.d.length];if(c&&c!=='.')drum(c,mNext)}}mStep++;mNext+=song.t}}
const AMB={r:null,w:null,wf:null};function ambInit(){if(!AC||AMB.r)return;const mk=(type,freq,q)=>{const s=AC.createBufferSource();s.buffer=noiseBuf();s.loop=true;const f=AC.createBiquadFilter();f.type=type;f.frequency.value=freq;f.Q.value=q;const g=AC.createGain();g.gain.value=0;s.connect(f);f.connect(g);g.connect(sfxG||master);s.start();return{g,f}};
 const r=mk('lowpass',2600,.4),r2=AC.createBiquadFilter();r2.type='highpass';r2.frequency.value=500;r.f.disconnect();r.f.connect(r2);r2.connect(r.g);AMB.r=r;AMB.w=mk('bandpass',420,1.6)}
function ambUpdate(){if(!AC)return;ambInit();if(!AMB.r)return;const out=cur&&!cur.room,on=OPT.sfx&&player&&!$('narr').classList.contains('show');const t=AC.currentTime;
 const rv=on&&ENV.w==='drache'?(out?2.2:.6):0,wv=on&&out?(ENV.w==='vent'?2.4:ENV.w==='brume'?.8:ENV.w==='clair'&&cur&&cur.id==='route'?.35:0):0;
 AMB.r.g.gain.setTargetAtTime(rv,t,.8);AMB.w.g.gain.setTargetAtTime(wv*(.7+.3*Math.sin(t*.37)+.2*Math.sin(t*1.3)),t,.6);AMB.w.f.frequency.setTargetAtTime(320+220*Math.sin(t*.29)+80*Math.sin(t*1.1),t,.5)}
setInterval(ambUpdate,400);
function fanfare(){if(!AC||!musG)return;const t0=AC.currentTime+.02,seq=[[60,0],[64,.1],[67,.2],[72,.3],[67,.45],[72,.55],[76,.65],[79,.8]];seq.forEach(([n,dt])=>tone(mf(n),t0+dt,.22,'square',.3,musG));
 [72,76,79,84].forEach(n=>{tone(mf(n),t0+1,1.6,'square',.22,musG);tone(mf(n),t0+1,1.8,'triangle',.3,musG)});tone(mf(48),t0+1,1.8,'triangle',.6,musG);tone(mf(36),t0+1,1.8,'sine',.7,musG)}
function setSong(k){if(song!==SONGS[k]){song=SONGS[k];mStep=0}}
function sfx(f,d=.08,type='square',v=.15){if(AC&&OPT.sfx)tone(f,AC.currentTime,d,type,v)}
const blip=()=>sfx(820+rnd()*80,.035,'square',.08);
$('mute').onclick=e=>{e.stopPropagation();audioInit();musicOn=!musicOn;OPT.music=musicOn?1:0;saveOpt();$('mute').style.opacity=musicOn?1:.4};$('mute').style.opacity=musicOn?1:.4;
