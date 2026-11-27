/* ===== Flipper Lumons, au Smile and Eat de Jalal (Jourdanfritte) =====
   Le flipper de High & Rouillé (dossier game/flipper/, voir LISEZMOI.md) s'ouvre en plein écran dans une iframe.
   - Les billes sont des Lumisphères : une partie coûte FLIP_COST Lumisphères (la toute première est offerte par Jalal).
   - Les « pièces » des chasses sont des Lumons sauvages ou des œufs : capturés, ils rejoignent vraiment l'équipe (ou le PC),
     les œufs vont dans le sac, puis la couveuse du Ranch, sinon Jalal les garde au frais.
   - Tour du Légendaire (table 9) : un Lumon de départ chromatique aux stats parfaites. Paliers de score : des œufs rares.
   - Les tickets de fin de partie sont rachetés par Jalal : 1 € les 5 tickets.
   Équilibrage (v1.0) : le flipper reste un à-côté. FLIP_JOUR vraies captures par jour de jeu (ensuite le Lumon est relâché,
   on garde les points), le Légendaire ne revient que tous les FLIP_LEG_J jours, les Lumons attrapés ont 5 à 8 niveaux de moins
   que ton meilleur Lumon, et les chromatiques sont réservés à l'Ultra rare et au Légendaire. Pas de Lucinelle : elle ne naît
   que d'un œuf confié par Luciole.
   LUMPIN = tout ce que le flipper (00_shim.js, HOST) peut demander au jeu. S.flipper = progression du flipper + œufs en attente. */
const FLIP_COST=3,FLIP_JOUR=3,FLIP_LEG_J=5;
const FLIP_T=[['gaufrelin','pigeolet','hannetonne'],['terrilou','scorion','ratoir'],['smogule','cokelin','tchantchou'],['chicorin','charbonnet','moulinet']];
const FLIP={on:false,el:null,res:null,sess:null,wrapped:false};
function flipS(){return S.flipper||(S.flipper={arc:null,free:1,parties:0,caps:0,best:0,attente:[]})}
function flipLv(){const L=(S.party||[]).map(m=>m.lv),top=L.length?Math.max(...L):5;return Math.max(3,Math.min(60,top-5-((rnd()*4)|0)))}
/* captures restantes aujourd'hui (jour de jeu) ; le Légendaire est-il réveillé ? */
function flipReste(){const f=flipS(),d=dayNum();if(f.qd!==d){f.qd=d;f.qn=0}return Math.max(0,FLIP_JOUR-f.qn)}
function flipLegOK(){const f=flipS();return f.legDay==null||dayNum()-f.legDay>=FLIP_LEG_J}
function flipTire(a){const L=a.filter(k=>SP[k]);return L[(rnd()*L.length)|0]||'gaufrelin'}
/* rareté du flipper (0 Commun … 6 Ultra rare) → espèce ; arc = « pièce d'arcade » (stats parfaites) ; tower = le Légendaire de la tour */
function flipEspece(r,arc,tower){
 if(tower)return flipLegOK()?{sp:flipTire(FLIP_T[3]),shiny:1,iv:4,leg:1}:{sp:flipTire(FLIP_T[3]),iv:1,dort:1};
 const o=r<=3?{sp:flipTire(FLIP_T[Math.max(0,r)])}:r===4?{sp:flipTire(FLIP_T[3])}:r===5?{sp:flipTire(FLIP_T[3]),iv:1}:{sp:flipTire(FLIP_T[2].concat(FLIP_T[3])),shiny:1,iv:1};
 if(arc)o.iv=Math.max(o.iv||0,2);return o}
function flipIV(n){const iv=[0,0,0,0].map(()=>Math.floor(rnd()*32)),ix=[0,1,2,3].sort(()=>rnd()-.5);for(let i=0;i<n;i++)iv[ix[i]]=31;return iv}
function flipOeuf(sp,iv,shiny){const e=mkEgg(baseOf(sp),iv?flipIV(iv):null,shiny);const w=typeof ranchGiveEgg==='function'?ranchGiveEgg(e):(giveEgg(e)?'sac':null);
 if(w)return w;flipS().attente.push(e);return'jalal'}
const FLIP_OU={sac:'dans ton sac',couveuse:'à la couveuse du Ranch',jalal:'au frigo de Jalal'};
const LUMPIN={
 load(){return flipS().arc},
 save(arc){flipS().arc=arc?JSON.parse(JSON.stringify(arc)):null},
 balls(){return S.bag.lumisphere||0},
 costTxt(){return flipS().free?'1ʳᵉ partie offerte':FLIP_COST+' Lumisphères'},
 pay(){const f=flipS();if(f.free){f.free=0;f.parties++;return true}if((S.bag.lumisphere||0)<FLIP_COST)return false;S.bag.lumisphere-=FLIP_COST;if(!S.bag.lumisphere)delete S.bag.lumisphere;f.parties++;return true},
 pick(r,arc,tower){const o=flipEspece(r,arc,tower),d=SP[o.sp],egg=!tower&&rnd()<.25,ic=egg?null:monIcon(o.sp);
  return{key:o.sp+(o.shiny?'s':'')+(o.dort?'d':''),sp:o.sp,name:egg?'Œuf mystère':d.n+(o.shiny?' ✨':'')+(o.dort?' (le Légendaire dort)':''),egg,shiny:!!o.shiny,iv:o.iv||0,leg:!!o.leg,dort:!!o.dort,col:TC[d.t[0]]||'#9aa3ad',img:ic?ic[0]:null,r}},
 quota(){return{reste:flipReste(),max:FLIP_JOUR,leg:flipLegOK()}},
 capture(p){const ss=FLIP.sess,f=flipS();
  if(flipReste()<=0){ss&&ss.rel++;return{name:(p.egg?'Œuf':SP[p.sp].n)+' relâché · '+FLIP_JOUR+' captures par jour'}}
  f.qn++;f.caps++;if(p.leg)f.legDay=dayNum();
  if(p.egg){const w=flipOeuf(p.sp,p.iv,p.shiny);ss&&ss.caps.push('un œuf ('+FLIP_OU[w]+')');return{name:'Œuf mystère → '+(w==='sac'?'sac':w==='couveuse'?'couveuse':'Jalal')}}
  const m=mkMon(p.sp,flipLv());if(p.shiny)m.shiny=1;if(p.iv){ensureGenes(m);m.iv=flipIV(p.iv)}calc(m);m.hp=m.mhp;
  S.dex.seen[m.sp]=1;S.dex.caught[m.sp]=1;if(m.shiny)unlock('shiny');const w=receiveMon(m);
  ss&&ss.caps.push(`${nm(m)}${m.shiny?' ✨':''} N.${m.lv}${w==='box'?' (au PC)':''}`);
  return{name:`${nm(m)}${m.shiny?' ✨':''} N.${m.lv}${w==='box'?' · PC':''}`}},
 palier(r){const sp=flipTire(FLIP_T[r>=3?3:2]);
  const w=flipOeuf(sp,r>=5?3:r>=3?2:1,r>=5);const n=r>=5?'Œuf mythique':r>=3?'Œuf épique':'Œuf rare';FLIP.sess&&FLIP.sess.caps.push(n.toLowerCase()+' ('+FLIP_OU[w]+')');
  return{name:n+' → '+(w==='sac'?'sac':w==='couveuse'?'couveuse':'Jalal')}},
 money(n){n=Math.round(n);if(n>0){S.money+=n;if(FLIP.sess)FLIP.sess.money+=n}},
 audio(){return{music:!!OPT.music,sfx:!!OPT.sfx}},
 end(r){const f=flipS();f.best=Math.max(f.best||0,r.score||0);if(FLIP.sess)FLIP.sess.parties++;try{saveGame()}catch(e){}},
 ready(w){FLIP.win=w;try{w.focus()}catch(e){}},
 close(){flipperClose()}
};
window.LUMPIN=LUMPIN;   /* lu par l'iframe du flipper (window.parent.LUMPIN) : une const n'est pas une propriété de window */
/* pause du jeu pendant la partie (la boucle de rendu ne dessine plus la ville derrière l'iframe) */
function flipWrapLoop(){if(FLIP.wrapped||typeof loop!=='function')return;FLIP.wrapped=true;const L0=loop;loop=function(t){if(FLIP.on){last=t;requestAnimationFrame(loop);return}return L0(t)}}
function flipperOpen(){return new Promise(res=>{flipWrapLoop();FLIP.res=res;FLIP.sess={caps:[],money:0,parties:0,rel:0};FLIP.mus=musicOn;musicOn=false;
 const o=document.createElement('div');o.id='flipov';o.style.cssText='position:fixed;inset:0;z-index:9000;background:#06071A';
 const fr=document.createElement('iframe');fr.src='flipper/index.html';fr.title='Flipper Lumons';fr.setAttribute('allow','autoplay');fr.style.cssText='border:0;width:100%;height:100%;display:block';
 o.appendChild(fr);document.body.appendChild(o);FLIP.el=o;FLIP.on=true;fr.addEventListener('load',()=>{try{fr.contentWindow.focus()}catch(e){}})})}
function flipperClose(){if(!FLIP.el)return;const o=FLIP.el;FLIP.el=null;FLIP.on=false;musicOn=FLIP.mus;setTimeout(()=>o.remove(),0);try{saveGame()}catch(e){}const r=FLIP.res;FLIP.res=null;r&&r(FLIP.sess)}
/* ---- la borne, dans le coin du Smile and Eat ---- */
function flipBorne3d(g,x,z){
 for(const[dx,dz]of[[-.3,-.45],[.3,-.45],[-.3,.45],[.3,.45]])box(g,.07,.8,.07,x+dx,.4,z+dz,'#c9a14a',{ol:false});
 const t=new THREE.Group();t.position.set(x,.92,z);t.rotation.x=.12;g.add(t);
 box(t,.74,.26,1.12,0,0,0,'#1c1a22',{ol:.025});for(const[w,d,dx,dz]of[[.78,.05,0,-.56],[.78,.05,0,.56],[.05,1.16,-.37,0],[.05,1.16,.37,0]])box(t,w,.06,d,dx,.15,dz,'#d8b45a',{emi:'#5a4010',ol:false});
 {const c=document.createElement('canvas');c.width=256;c.height=384;const k=c.getContext('2d');k.fillStyle='#120a2a';k.fillRect(0,0,256,384);
  for(let i=0;i<14;i++){k.strokeStyle=i%2?'#ff2bd6':'#00e5ff';k.globalAlpha=.25;k.strokeRect(10+i*3,10+i*3,236-i*6,364-i*6)}k.globalAlpha=1;
  for(const[cx,cy,col]of[[80,120,'#ffd84a'],[176,120,'#ff3b5c'],[128,175,'#3cff9e']]){k.fillStyle=col;k.beginPath();k.arc(cx,cy,24,0,7);k.fill();k.fillStyle='#fff';k.beginPath();k.arc(cx-7,cy-7,6,0,7);k.fill()}
  k.fillStyle='#2a1450';k.beginPath();k.arc(128,260,18,PI,0);k.fill();k.fillStyle='#ff3b5c';k.beginPath();k.arc(128,260,18,0,PI);k.fill();k.fillStyle='#f6c80f';k.fillRect(110,257,36,5);
  k.strokeStyle='#f4f4f4';k.lineWidth=9;k.lineCap='round';k.beginPath();k.moveTo(70,330);k.lineTo(112,350);k.moveTo(186,330);k.lineTo(144,350);k.stroke();
  const tx=new THREE.CanvasTexture(c);const pl=new THREE.Mesh(new THREE.PlaneGeometry(.66,1.02),new THREE.MeshBasicMaterial({map:tx}));pl.rotation.x=-PI/2;pl.position.y=.14;t.add(pl);const gl=new THREE.Mesh(new THREE.PlaneGeometry(.7,1.08),new THREE.MeshBasicMaterial({color:0xbfe8ff,transparent:true,opacity:.12}));gl.rotation.x=-PI/2;gl.position.y=.175;t.add(gl)}
 box(g,.76,.7,.14,x,1.55,z-.6,'#1c1a22',{ol:.025});
 plane(g,.66,.5,x,1.57,z-.52,labelTex('FLIPPER · LUMONS','#1c0a2a','#ff2bd6',512,380,60));
 box(g,.06,.06,.3,x-.42,1.02,z+.3,'#ff3b5c',{emi:'#ff3b5c',ol:false});box(g,.06,.06,.3,x+.42,1.02,z+.3,'#ff3b5c',{emi:'#ff3b5c',ol:false})}
async function flipBorne(){const f=flipS(),N='Jalal';
 if(!f.vu){f.vu=1;await say(N,"Ah, tu regardes ma bécane ? Un flipper d'époque, je l'ai racheté à un forain. Mais je l'ai un peu trafiqué, hein !");
  await say(N,"Les billes, c'est des Lumisphères. Et sur la table, des Lumons sauvages se baladent. Tape-les assez fort et assez souvent : ils sont à toi. Pour de vrai !");
  await say(N,`Mais attention : la machine ne lâche que ${FLIP_JOUR} Lumons par jour. Après, ceux que tu tapes retournent dans la machine. Et le Légendaire de la tour, il dort ${FLIP_LEG_J} jours après chaque sortie.`);
  await say(N,`Une partie, c'est ${FLIP_COST} Lumisphères. La première, c'est cadeau de la maison. Et je te rachète tes tickets : un euro les cinq. Allez, avec le sourire !`)}
 if(f.attente&&f.attente.length){let n=0;while(f.attente.length){const e=f.attente[0];const w=typeof ranchGiveEgg==='function'?ranchGiveEgg(e):(giveEgg(e)?'sac':null);if(!w)break;f.attente.shift();n++}
  if(n)await say(N,n>1?`Tiens, tes ${n} œufs du flipper. Je les gardais au frais à côté des baklavas.`:"Tiens, ton œuf du flipper. Je le gardais au frais à côté des baklavas.");
  if(f.attente.length)await say(N,`J'ai encore ${f.attente.length>1?f.attente.length+' œufs':'un œuf'} à toi au frigo. Fais de la place dans ton sac ou à la couveuse du Ranch.`)}
 if(!f.free&&(S.bag.lumisphere||0)<FLIP_COST){await say(N,`Il te faut ${FLIP_COST} Lumisphères pour une partie, mon frère. La Boutique Lumi en vend, 8 € pièce.`);return}
 const ss=await flipperOpen();
 if(ss&&(ss.parties||ss.caps.length)){const L=ss.caps;
  if(L.length)await say(N,`${L.length>1?'Ouah, '+L.length+' captures':'Une capture'} ! ${L.join(', ')}.${ss.money?` Et ${ss.money} € pour tes tickets.`:''} Ça, c'est un sourire !`);
  else if(ss.rel)await say(N,`La machine a fait son quota pour aujourd'hui, mon frère : ${FLIP_JOUR} Lumons par jour, pas un de plus. Reviens demain !${ss.money?` Tiens, ${ss.money} € pour tes tickets.`:''}`);
  else await say(N,`Pas de capture cette fois… ${ss.money?`Tiens, ${ss.money} € pour tes tickets. `:''}Faut taper les Lumons plusieurs fois, hein, pas juste les caresser !`)}}
function buildFlipper(){const m=SMILE;if(!m)return;flipBorne3d(m.group,m.ox+9,1);setSolid(m,9,1);m.signs['9,1']=flipBorne}
