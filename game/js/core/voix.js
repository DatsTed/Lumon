/* ---- Voix des personnages, façon Animal Crossing ----
   Pendant que le texte défile, chaque personnage « parle » en petites syllabes synthétisées :
   hauteur (p), timbre (w), formant (f), vitesse (s), variation (j) et glissé (g) propres à chacun.
   La voyelle de la syllabe colore le son ; « ? » fait monter la fin, « ! » rend plus aigu.
   Volume = curseur des bruitages. Option : OPT.vx (Options > Voix des personnages). */
if(OPT.vx==null)OPT.vx=1;
const VOIX={
 'Françoise':{p:330,w:'triangle',f:1.1},'Doudoune':{p:290,w:'square',f:.9,j:.25},'Verhaegen':{p:360,w:'sine',f:1.2,s:.9},'Prof':{p:360,w:'sine',f:1.2,s:.9},
 'Dolba':{p:205,w:'square',f:.85,s:1.2,j:.3},'Younes':{p:245,w:'sawtooth',f:.95,j:.2},'Fifi':{p:540,w:'square',f:1.4,s:1.35,j:.35},
 'Nour':{p:195,w:'triangle',f:.9,s:.85},'Amin':{p:175,w:'sawtooth',f:.85},'Colin':{p:165,w:'square',f:.8,j:.4},'Luciole':{p:430,w:'sine',f:1.3,s:.9,g:1.04},
 'Snow':{p:110,w:'sine',f:.7,s:.7,g:.86},'MC Sambre':{p:190,w:'square',f:.9,s:1.15,j:.35},'Captain':{p:140,w:'sawtooth',f:.75,j:.3},'Alias':{p:260,w:'sine',f:1,s:.95},
 'Alex':{p:150,w:'triangle',f:.8,s:.85},'Jalal':{p:235,w:'triangle',f:1,s:1.1},'Danny':{p:280,w:'sawtooth',f:1,s:1.3,j:.45},'Rudy':{p:250,w:'triangle',f:.95},
 'Ginette':{p:380,w:'square',f:1.15},'Gérard':{p:200,w:'triangle',f:.85,s:.85},'Rose':{p:400,w:'sine',f:1.2,s:.8},'Lemaire':{p:170,w:'triangle',f:.8,s:.9},
 'Martens':{p:185,w:'triangle',f:.85},'Kétosaure':{p:230,w:'square',f:.9,s:1.2,j:.4},'Pirate':{p:160,w:'sawtooth',f:.8,j:.35},'Infirmière':{p:420,w:'sine',f:1.25},
 'Vendeur':{p:300,w:'triangle',f:1},'Fernand':{p:210,w:'triangle',f:.9},'Josette':{p:390,w:'square',f:1.1},'Odette':{p:410,w:'sine',f:1.15,s:.8},'Léon':{p:520,w:'triangle',f:1.35,s:1.2},
 'Jef':{p:190,w:'triangle',f:.85,s:.85},'Théo':{p:470,w:'triangle',f:1.3,s:1.2},'Sofiane':{p:240,w:'triangle',f:1},'Lou':{p:410,w:'sine',f:1.2}};
let VXS=7;const voixRnd=()=>(VXS=VXS*16807%2147483647)/2147483647; // hasard à part : ne touche pas aux tirages du jeu
const VOYF={a:[800,1200],e:[500,1800],i:[320,2300],o:[500,900],u:[350,800],y:[320,2100]};
function voixDe(name){if(!name)return null;if(S&&name===S.name)return S.gender?{p:400,w:'triangle',f:1.2}:{p:250,w:'triangle',f:1};
 for(const k in VOIX)if(name.includes(k))return VOIX[k];let h=0;for(const c of name)h=(h*31+c.charCodeAt(0))%997;return{p:200+h%220,w:['triangle','square','sine'][h%3],f:.85+(h%5)*.1}}
function voiceBlip(name,text,i){if(!AC||!OPT.sfx||!OPT.vx)return false;const v=voixDe(name);if(!v)return false;if(i%2)return true;const ch=(text[i-1]||'').toLowerCase();
 if(/[\s.,…;:!?«»"'()-]/.test(ch))return true;
 const rest=text.slice(i-1),vw=(rest.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().match(/[aeiouy]/)||['a'])[0],F2=VOYF[vw];
 const end=text.trimEnd().slice(-1),tail=i/text.length,q=end==='?'&&tail>.7?1+(tail-.7)*1.2:1,ex=end==='!'?1.12:1;
 const t=AC.currentTime,d=.075/(v.s||1),f=v.p*q*ex*(1+(voixRnd()-.5)*(v.j||.18));
 const o=AC.createOscillator(),bp=AC.createBiquadFilter(),g=AC.createGain();o.type=v.w||'triangle';o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*(v.g||.94),t+d);
 bp.type='bandpass';bp.frequency.value=F2[1]*(v.f||1)*.6;bp.Q.value=1.4;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.5,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+d);
 o.connect(bp);bp.connect(g);g.connect(sfxG||master);o.start(t);o.stop(t+d+.02);return true}
