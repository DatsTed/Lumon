/* ---- Gallery / 3D viewer ---- */
let galModel=null,galPrev=null,GZ=0;
function galOpen(){if(!galPrev)galPrev={mode:camMode,vis:Object.values(MAPS).filter(m=>m.group.visible&&m!==GAL)};Object.values(MAPS).forEach(m=>m.group.visible=false);GAL.group.visible=true;camMode='gallery'}
const mscale=sp=>{const v=MSCALE[sp];return isFinite(v)&&v>0?v:1};
function viewSpecies(sp){disposeModel(galModel);galModel=monModel(sp);galModel.g.position.set(500,.1,0);galModel.g.scale.setScalar(1.25*mscale(sp));GAL.group.add(galModel.g);
 if(!galPrev)galPrev={mode:camMode,vis:Object.values(MAPS).filter(m=>m.group.visible&&m!==GAL)};Object.values(MAPS).forEach(m=>m.group.visible=false);GAL.group.visible=true;camMode='gallery'}
function closeView(){disposeModel(galModel);galModel=null;GAL.group.visible=false;if(galPrev){galPrev.vis.forEach(m=>m.group.visible=true);camMode=galPrev.mode;galPrev=null}}
const galList=()=>DEX.concat(Object.keys(S.fusions||{}));
let dexVoice=null;function frVoices(){const vs=(window.speechSynthesis&&speechSynthesis.getVoices())||[];const f=vs.filter(v=>/^fr/i.test(v.lang));return f.length?f:vs}
function voiceLabel(){const L=frVoices();if(!L.length)return 'aucune';const v=dexVoice||pickVoice();return v?(v.name.replace(/Microsoft |Google |\(.*?\)| - .*$/g,'').trim().slice(0,22)+' · '+v.lang):'auto'}
function pickVoice(){const vs=(window.speechSynthesis&&speechSynthesis.getVoices())||[];if(OPT.vname){const m=vs.find(v=>v.name===OPT.vname);if(m)return m}return vs.find(v=>/^fr/i.test(v.lang)&&/natural|neural|online|premium|enhanced|améliorée/i.test(v.name))||vs.find(v=>/fr[-_]BE/i.test(v.lang))||vs.find(v=>/fr[-_]FR/i.test(v.lang)&&/google|amélie|thomas|denise|henri/i.test(v.name))||vs.find(v=>/^fr/i.test(v.lang))||null}
if(window.speechSynthesis)speechSynthesis.onvoiceschanged=()=>{dexVoice=pickVoice()};
function hushDex(){try{window.speechSynthesis&&speechSynthesis.cancel()}catch(e){}}
function speakDex(sp){hushDex();if(!OPT.voice||!window.speechSynthesis)return;const s=SP[sp],strip=h=>h.replace(/<[^>]+>/g,'').replace(/«|»/g,'');
 const n=DEX.indexOf(sp),intro=[`${s.n} !`,`Voici ${s.n} !`,`Attention, c'est ${s.n} !`][(n<0?0:n)%3];
 const txt=`${intro} Un Lumon de type ${s.t.join(' et ')}. ${s.d} ${etyOf(sp)?"D'où vient son nom ? "+strip(etyOf(sp)):''}`;
 const parts=txt.match(/[^.!?]+[.!?]*/g)||[txt];if(!dexVoice)dexVoice=pickVoice();
 parts.forEach((t,i)=>{const u=new SpeechSynthesisUtterance(t.trim());u.lang=dexVoice?dexVoice.lang:'fr-FR';if(dexVoice)u.voice=dexVoice;u.rate=1.06;u.pitch=i===0?1.25:1.08;u.volume=Math.min(1,.35+OPT.vol*.18);speechSynthesis.speak(u)})}
function etyOf(sp){const s=SP[sp];if(ETY[sp])return ETY[sp];ensureLore(sp);if(s.ety)return s.ety;if(s.fusion)return `Un nom de fusion, collé à partir de <b>${s.fusion.map(x=>SP[x]?SP[x].n:x).join('</b> et <b>')}</b>. Chaque fusion d'Ardenval reçoit un nom unique, un peu comme une bière d'abbaye : on mélange, on goûte, on baptise.`;return''}
function gallery(i,list,dex){return new Promise(r=>{const L=list||galList(),sh=()=>{const sp=L[i%L.length],s=SP[sp];viewSpecies(sp);const n=DEX.indexOf(sp);$('gName').textContent=`${s.fusion?'Fusion':'N°'+String(n+1).padStart(3,'0')} ${s.n}`;$('gType').innerHTML=typH(s.t)+(dex&&S.dex.caught[sp]?' <small style="color:#3ef0ff">● capturé</small>':'');ensureLore(sp);$('gDesc').textContent=s.d+(s.evo?(SP[s.evo[1]]?` Évolue en ${SP[s.evo[1]].n} au niveau ${s.evo[0]}.`:` Peut évoluer au niveau ${s.evo[0]}… mais en quoi ? Mystère.`):'');
  const e=etyOf(sp);$('gStory').innerHTML=e?`<b>D'où vient son nom ?</b><br>${e}`:'';$('gStory').scrollTop=0;if(dex)speakDex(sp)};
 sh();show('gal');$('gPrev').onclick=()=>{i=(i+L.length-1)%L.length;sh()};$('gNext').onclick=()=>{i=(i+1)%L.length;sh()};$('gClose').onclick=()=>{hushDex();hide('gal');closeView();r()}})}
