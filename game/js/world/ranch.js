/* ---- Ranch du Pays de Herve (chapitre 5) : tout pour l'élevage ----
   Accès : Route 5, chemin du sud (x 23-25). Fermière Mariette (enclos), petit Arnaud (Carnet d'élevage), tante Huguette (soins + boutique).
   - 2 enclos (A et B) : on y confie un couple ; les Lumons s'y promènent en 3D ; un œuf environ tous les 100 pas (50 avec des pommes).
   - Couveuse (ferme) : 4 œufs en plus des 3 qu'on porte ; ils avancent à chaque pas, où que tu sois.
   - Nid du jour (grange) : un œuf surprise par jour dans le foin.  - Au Ranch, les œufs portés éclosent 2× plus vite.
   - Boutique : Panier de pommes, Couverture en laine (œufs plus rapides), Fromage de Herve (4 IV hérités + nature de la mère).
   - Ferme : soins, PC de stockage, couveuse, le Grand Livre de l'élevage.  - Appart d'Alex (coloc, voir liens.js) : porte du Garage Wagner.
   État : S.ranch = {pens:[{mons,steps,egg,boost}×2], couv:[œufs], nid:jour, attente:[œufs sans place]}. */
let RANCH=null,FERME=null,COLOC=null;
const EGG_POOL=['pigeolet','hannetonne','gaufrelin','chicorin','moulinet','charbonnet','terrilou','scorion','ratoir','tchantchou','smogule','cokelin'];
function oeufSurprise(){const L=EGG_POOL.filter(k=>SP[k]&&!SP[k].unique&&!SP[k].fusion);return baseOf(L[(rnd()*L.length)|0])}
function ranchS(){S.ranch=S.ranch||{};const R=S.ranch;R.pens=R.pens||[{mons:[],steps:0,egg:null},{mons:[],steps:0,egg:null}];R.couv=R.couv||[];R.attente=R.attente||[];return R}
// un œuf reçu : dans le sac (3 max), sinon dans la couveuse (4 max)
function ranchGiveEgg(e){F().egg1=1;if(giveEgg(e))return'sac';const R=ranchS();if(R.couv.length<4){R.couv.push(e);return'couveuse'}return null}
Object.assign(ICON,{pommes:icoB('#3a1a14','#ff4a3a','●'),couverture:icoB('#3a2a4a','#f2d8a0','≋'),fromage:icoB('#3a3014','#f6c80f','◆'),carnet:icoB('#2a3a2a','#bfe09a','✎')});
Object.assign(ITEMS,{
 pommes:{n:'Panier de pommes',d:"Des pommes du Pays de Herve. À verser dans un enclos du Ranch : le prochain œuf arrive deux fois plus vite.",price:400,quest:1},
 couverture:{n:'Couverture en laine',d:"Tricotée par tante Huguette. Tes œufs restent au chaud : ils éclosent plus vite (un pas de plus à chaque pas).",price:2400,quest:1},
 fromage:{n:'Fromage de Herve',d:"Il pue tellement que les Lumons des enclos se serrent l'un contre l'autre. Leurs œufs héritent de 4 IV au lieu de 3, et de la nature de la mère.",price:3000,quest:1},
 carnet:{n:"Carnet d'élevage",d:"Offert par le petit Arnaud. Il te dit de quelle espèce est un œuf et combien de pas il lui reste.",price:0,quest:1}});
{const eh=eggHint;eggHint=function(e){const t=eh(e);return S.bag&&S.bag.carnet&&SP[e.sp]?`${t} <b>(${SP[e.sp].n} · ${Math.max(0,e.left)} pas)</b>`:t}}
// ---- les pas : enclos, couveuse, éclosion plus rapide (couverture, Ranch)
function ranchEgg(ms){const mom=ms.find(m=>m.gender==='f')||ms[0],dad=ms.find(m=>m!==mom);const iv=[0,0,0,0].map(()=>Math.floor(rnd()*32)),fro=!!(S.bag&&S.bag.fromage);
 [0,1,2,3].sort(()=>rnd()-.5).slice(0,fro?4:3).forEach(k=>{iv[k]=(rnd()<.5?mom:dad).iv[k]});const e=mkEgg(baseOf(mom.sp),iv,rnd()<1/400);e.nat=fro?mom.nat:(rnd()<.5?mom:dad).nat;return e}
function ranchTick(){const R=S.ranch;if(!R||!R.pens)return;
 R.pens.forEach((P,k)=>{if(P.mons.length<2)return;P.steps++;P.mons.forEach(m=>{m.xp+=1;while(m.xp>=(m.lv+1)**3&&m.lv<100){m.lv++;calc(m);m.hp=m.mhp}});
  const c=compat(P.mons[0],P.mons[1]);if(!P.egg&&c&&P.steps%(P.boost?50:100)===0&&rnd()<(c===2?.7:.35)){P.egg=ranchEgg(P.mons);P.boost=0;toast('egg',`Mariette t'appelle : un œuf est apparu dans l'enclos ${k?'B':'A'} !`)}});
 for(const e of R.couv)if(e.left>0){e.left--;if(!e.left)toast('egg',"La couveuse du Ranch sonne : un œuf est prêt à éclore !")}}
{const bt=breedTick;breedTick=function(){bt();ranchTick()}}
eggTick=async function(){if(!S.eggs||!S.eggs.length)return;const n=(1+(laika()&&(laika().fr||0)>=200?1:0)+(S.bag&&S.bag.couverture?1:0))*(cur===RANCH?2:1);
 for(const e of S.eggs)e.left=Math.max(0,e.left-n);const e=S.eggs.find(x=>x.left<=0);if(e&&!busy)await runScript(()=>hatch(e))};
{const h=hatch;hatch=async function(e){if(!e.shiny&&!e.rb&&S.bag&&S.bag.bracelet){e.rb=1;if(rnd()<2/400)e.shiny=true}return h(e)}}

// ---- la carte
function buildRanch(){
 {const W=28,H=22,m=RANCH=makeMap('ranch',W,H,1760,0,'hope'),g=m.group,T=grid(W,H);treesRim(T,W,H,(x,z)=>z===0&&x>=13&&x<=15);
  pathLine(T,[[14,0],[14,9]],3);pathLine(T,[[5,8],[23,8]],1);pathLine(T,[[5,7],[5,8]],1);pathLine(T,[[11,12],[16,12],[16,20],[11,20],[11,12]],1);pathLine(T,[[14,9],[14,12]],1);
  rect(T,2,10,9,11,'g');rect(T,18,10,25,11,'g');ellipse(T,13.5,16,1.6,3,'~');
  for(const[x0,x1]of[[3,10],[17,24]]){for(let x=x0;x<=x1;x++){T[13][x]='F';T[19][x]='F'}for(let z=13;z<=19;z++){T[z][x0]='F';T[z][x1]='F'}rect(T,x0+1,14,x1-1,18,'D')}
  [[1,3],[1,6],[2,15],[1,18],[26,3],[26,13],[25,19],[9,2],[19,2],[1,10]].forEach(([x,z])=>{if(T[z][x]==='.')T[z][x]='T'});[[11,5],[17,5],[8,20],[20,20],[10,9]].forEach(([x,z])=>{if(T[z][x]==='.')T[z][x]='f'});
  terrain(m,T);
  // pommiers (Pays de Herve) : des pommes rouges sur les arbres du bord
  for(let z=0;z<H;z++)for(let x=0;x<W;x++)if(T[z][x]==='T'&&(x*7+z*3)%3===0)for(let k=0;k<3;k++)tp(g,SPH,'#d8232a',m.ox+x+(k-1)*.35,1.7+k%2*.3,m.oz+z+.25,.1,.1,.1,{ol:false});
  // la ferme (soins, PC, couveuse)
  bigBuilding(g,m,2,3,6,4,'#f0e6d0','#a03a2a',5,'FERME DU RANCH','#a03a2a','#ffffff');m.doors['5,6']=()=>goMap(FERME,5,7,'up');
  // la grange : le nid du jour
  {const X=m.ox+21.5,Z=m.oz+4.5;box(g,5.6,2.4,3.6,X,1.2,Z,'#a8322a',{ol:.04});for(const s of[-1,1]){const r=box(g,3.3,.18,3.9,X+s*1.35,2.95,Z,'#4a3a32',{ol:.03});r.rotation.z=-s*.62}
   box(g,1.6,1.7,.08,X,.85,Z+1.82,'#f0e6d0',{ol:.02});box(g,1.5,.08,.09,X,.85,Z+1.86,'#a8322a',{ol:false,cast:false});box(g,.08,1.6,.09,X,.85,Z+1.86,'#a8322a',{ol:false,cast:false});
   for(const[dx,dz]of[[-3.4,1],[-3.4,-.4],[3.4,1]]){const b=add(g,new THREE.CylinderGeometry(.42,.42,.7,12),'#e8c860',X+dx,.42,Z+dz,{ol:.02});b.rotation.x=PI/2}
   solidRect(m,19,3,6,4);for(const x of[18,25])setSolid(m,x,5);setSolid(m,18,4);setSolid(m,25,4)}
  m.signs['21,6']=m.signs['22,6']=nidDuJour;
  // éolienne de ferme
  {const X=m.ox+26,Z=m.oz+8;add(g,new THREE.CylinderGeometry(.08,.14,3.4,6),'#cfcfd8',X,1.7,Z,{ol:.02});const rot=new THREE.Group();rot.position.set(X,3.4,Z+.12);g.add(rot);
   for(let k=0;k<4;k++){const b=box(rot,.12,1.1,.03,0,.55,0,'#f0f0f0',{ol:.015});const p=new THREE.Group();p.rotation.z=k*PI/2;p.add(b);rot.add(p)}m.anim.push(t=>rot.rotation.z=t*1.6);setSolid(m,26,8)}
  // enclos : panneaux + Lumons qui se promènent
  m.pens=[{x0:3,x1:10,z0:13,z1:19,mods:[]},{x0:17,x1:24,z0:13,z1:19,mods:[]}];
  m.pens.forEach((p,k)=>{for(let z=p.z0+1;z<p.z1;z++)for(let x=p.x0+1;x<p.x1;x++)setSolid(m,x,z);const gx=Math.round((p.x0+p.x1)/2);
   for(const x of[gx,gx+1])m.signs[x+','+p.z0]=()=>enclos(k);signPost(g,m,gx-1,12,'ENCLOS '+(k?'B':'A'));setSolid(m,gx-1,12);m.signs[(gx-1)+',12']=()=>enclos(k)});
  m.anim.push(t=>ranchPenAnim(t));
  sg(m,12,2,"Ranch du Pays de Herve — Élevage de Lumons. Ferme (soins, PC, couveuse) · Grange · Enclos A et B. « Ici, l'air est si pur que les œufs éclosent deux fois plus vite ! »",true);
  sg(m,16,9,"Chemin de la mare. Fais des tours avec tes œufs : à la campagne, ils grandissent plus vite.",false);
  [[12,9],[16,7],[10,12],[17,12],[4,8]].forEach(([x,z])=>lamp(g,m,x,z));
  for(let x=13;x<=15;x++)m.steps[x+',0']=()=>goMap(ROUTE5,24,14,'up');arrows(m,[[13,0],[14,0],[15,0]],'up');
  m.grassRate=.12;m.wildAt=()=>[['gaufrelin',22,25,25],['hannetonne',22,25,ENV.night?5:25],['chicorin',22,25,15],['pigeolet',22,25,ENV.night?0:20],['moulinet',22,25,15],['tchantchou',23,25,5]].filter(e=>e[3]>0);
  NPC.mariette=npc(m,'mariette',13,11,'down',marietteTalk);
  wand(npc(m,'kid',20,9,'down',arnaudTalk));
  NPC.lucR=npc(m,'luciole',11,19,'right',lucBalade);NPC.lucR.show(false);
  m.hook=()=>F().ranch?null:ranchArrivee}
 // la ferme : soins, boutique, PC, couveuse, cheminée
 {const X=1800,m=FERME=room('ferme',11,9,X,'W','#e8d8b8',()=>goMap(RANCH,5,7,'down')),g=m.group;m.song='hope';
  box(g,3.4,.9,.8,X+3,.55,2,'#8a5a3a',{ol:.03});box(g,3.6,.1,1,X+3,1.02,2,'#f0e6d0',{ol:.02});solidRect(m,2,2,3,1);
  tp(g,SPH,'#f6c80f',X+2.3,1.15,2,.18,.12,.14);tp(g,SPH,'#d8232a',X+3.5,1.13,2.1,.1,.1,.1,{ol:false});tp(g,SPH,'#d8232a',X+3.7,1.13,1.9,.1,.1,.1,{ol:false});
  npc(m,'huguette',3,1,'down',huguetteTalk);for(let x=2;x<=4;x++)m.signs[x+',2']=huguetteTalk;
  pcTerminal(g,X+9,1);setSolid(m,9,1);m.signs['9,1']=pcMenu;
  // la couveuse : un dôme de verre, des œufs, une lampe chauffante
  {const cg=new THREE.Group();cg.position.set(X+8.5,0,4.5);g.add(cg);box(cg,1.6,.7,1.2,0,.35,0,'#5a6a7a',{ol:.03});box(cg,1.7,.08,1.3,0,.72,0,'#c9ccd4',{ol:.02});
   const dome=new THREE.Mesh(new THREE.SphereGeometry(.7,16,10,0,PI*2,0,PI/2),new THREE.MeshBasicMaterial({color:'#bfe8ff',transparent:true,opacity:.28,depthWrite:false}));dome.scale.set(1.05,.8,.8);dome.position.y=.76;cg.add(dome);
   m.couvEggs=[];for(let k=0;k<4;k++){const e=tp(cg,SPH,'#fbf6ea',-.45+k*.3,.92,0,.12,.16,.12,{ol:.01});e.visible=false;m.couvEggs.push(e)}
   glowAt(cg,0,1.4,0,'#ffb84a',1.6,false);plane(cg,1.2,.3,0,.42,.61,labelTex('COUVEUSE','#1a2430','#ffb84a',512,128,60));m.anim.push(t=>m.couvEggs.forEach((e,k)=>e.rotation.z=Math.sin(t*2+k)*.08))}
  for(const x of[8,9])for(const z of[4,5])setSolid(m,x,z);m.signs['8,4']=m.signs['9,4']=m.signs['8,5']=m.signs['9,5']=m.signs['7,4']=m.signs['7,5']=couveuse;
  // cheminée et table
  box(g,.9,1.8,1.4,X+1,.9,4.5,'#8a7a6a',{ol:.03});box(g,.5,.5,.8,X+1.3,.4,4.5,'#ff7a1a',{emi:'#ff5a10',ol:false,cast:false});glowAt(g,X+1.6,.8,4.5,'#ff8a3a',2,false);setSolid(m,1,4);setSolid(m,1,5);
  box(g,1.8,.1,1.1,X+4.5,.75,5,'#8a5a3a',{ol:.02});for(const[a,b]of[[-.8,-.45],[.8,-.45],[-.8,.45],[.8,.45]])box(g,.08,.7,.08,X+4.5+a,.37,5+b,'#5a3a2a');solidRect(m,4,5,2,1);
  box(g,.9,1.6,.4,X+6.5,.8,.7,'#6a4a3a',{ol:.03});for(let k=0;k<3;k++)box(g,.8,.06,.36,X+6.5,.4+k*.45,.75,'#4a3020',{ol:false});
  for(let k=0;k<6;k++)box(g,.1,.32,.25,X+6.2+k*.12,.62+(k%2)*.45,.75,['#d8232a','#3a8fe0','#f6c80f'][k%3],{ol:false});setSolid(m,6,1);
  m.signs['6,1']=grandLivre;sg(m,7,1,"Une photo encadrée : Mariette, jeune, avec un énorme Moulefrit dans les bras. « Concours agricole de Herve, 1er prix ».",false)}
 // l'appart d'Alex, au-dessus du Garage Wagner (coloc)
 {const X=1830,m=COLOC=room('coloc',9,7,X,'W','#d8d0e0',()=>goMap(ROUTE3,12,8,'down')),g=m.group;m.song='hope';
  box(g,1.4,.45,2.2,X+1.5,.25,2.5,'#3a4a8a',{ol:.03});box(g,1.4,.2,.5,X+1.5,.55,1.6,'#f0f0f0',{ol:.02});solidRect(m,1,2,2,2);m.signs['1,2']=m.signs['2,2']=m.signs['1,3']=m.signs['2,3']=colocLit;
  add(g,new THREE.CylinderGeometry(.5,.45,.25,14),'#a04a2a',X+6.5,.18,4,{ol:.02});setSolid(m,6,4);m.signs['6,4']=colocPanier;
  box(g,.8,1.7,.7,X+7.5,.85,1,'#e8e8ee',{ol:.03});box(g,.05,.5,.05,X+7.15,1.1,1.37,'#9aa0b8',{ol:false});setSolid(m,7,1);m.signs['7,1']=colocFrigo;
  pcTerminal(g,X+5,1);setSolid(m,5,1);m.signs['5,1']=pcMenu;plane(g,1.4,.8,X+3.5,1.7,.46,labelTex('ROLLS-ROYCE','#141416','#f6c80f',512,256,70))}
 // Route 3 : la porte de l'appart (devant le garage) ; la discussion du jour avec Alex
 ROUTE3.doors['12,7']=async()=>{if(S.bag.clescoloc)return goMap(COLOC,4,5,'up');await say('',"Une petite porte à côté du garage : « Appartement — privé ». Un paillasson : « Wagner Living ». C'est fermé à clé.")};
 {const a=ROUTE3.npcs.find(c=>c.x===13&&c.z===9);if(a){const t0=a.talk;a.talk=async()=>{if(!F().alex)return t0();return alexTalk(t0)}}}
 // Route 5 : Alex en panne (après l'arrivée de Luciole)
 {const h0=ROUTE5.hook;ROUTE5.hook=(x,z)=>{const f=F();if(f.r5&&f.alex&&!f.alexR5&&x>=4&&x<=8&&z>=7&&z<=9)return alexR5;return h0?h0(x,z):null}}
}
// ---- les Lumons des enclos (modèles 3D qui se promènent)
function ranchPenSync(){if(!RANCH)return;const R=ranchS();RANCH.pens.forEach((p,k)=>{const sig=R.pens[k].mons.map(m=>m.sp+(m.shiny?'*':'')).join(',');if(p.sig===sig)return;p.sig=sig;
 p.mods.forEach(o=>disposeModel(o.r));p.mods=R.pens[k].mons.map((mon,j)=>{const r=monModel(mon.sp,mon.form);if(mon.shiny)shinyfy(r);r.g.scale.setScalar(.7*(MSCALE[mon.sp]||1));RANCH.group.add(r.g);
  const o={r,x:p.x0+2+j*3,z:p.z0+3,tx:0,tz:0,t:0};o.tx=o.x;o.tz=o.z;r.g.position.set(RANCH.ox+o.x,0,RANCH.oz+o.z);return o})})}
function ranchPenAnim(t){if(!RANCH||cur!==RANCH)return;RANCH.pens.forEach(p=>p.mods.forEach((o,j)=>{if(t>o.t){o.t=t+2+rnd()*3;o.tx=p.x0+1.3+rnd()*(p.x1-p.x0-2.6);o.tz=p.z0+1.3+rnd()*(p.z1-p.z0-2.6)}
 const dx=o.tx-o.x,dz=o.tz-o.z,d=Math.hypot(dx,dz);if(d>.05){const s=Math.min(d,.025);o.x+=dx/d*s;o.z+=dz/d*s;o.r.g.rotation.y=Math.atan2(dx,dz)}
 o.r.g.position.set(RANCH.ox+o.x,Math.abs(Math.sin(t*6+j))*(d>.05?.08:0),RANCH.oz+o.z)}))}
function ranchRefresh(){if(!RANCH)return;const f=F();ranchPenSync();if(NPC.lucR)NPC.lucR.show(!!(f.ranch&&f.r5&&!f.lucFroid));
 if(FERME){const R=ranchS();FERME.couvEggs.forEach((e,k)=>e.visible=k<R.couv.length)}}
{const rn=refreshNPCs;refreshNPCs=function(){rn();ranchRefresh()}}

// ---- scènes et menus
CH.mariette={skin:'#f0c8a8',hair:'#b8b0a8',hs:'bun',shirt:'#5a8a3a',jacket:'#3a5a8a',pants:'#3a3a40',boots:'#5a3a20',eye:'#4a6a3a',bw:1.15};
CH.huguette={skin:'#f2d0b8',hair:'#e8e0d8',hs:'curly',shirt:'#c84a6a',jacket:'#f0e6d0',pants:'#4a3a4a',boots:'#3a2a20',eye:'#5a4a3a'};
async function ranchArrivee(){const f=F(),M='Fermière Mariette';f.ranch=1;f.egg1=1;await banner('Ranch du Pays de Herve','Élevage de Lumons',2400);
 const c=NPC.mariette;c.face(dirTo(c,player.x,player.z));
 await say(M,"Bonjour, bonjour ! Bienvenue au Ranch ! Moi c'est Mariette. Ma sœur Rose tient la Pension de Charleroc. Moi, j'ai vu plus grand. Beaucoup plus grand.");
 if((S.eggs||[]).length)await say(M,"Oh, mais tu portes un œuf ! Fais-moi voir… Il a froid, le pauvre. Ici, il sera bien : au Ranch, l'air est si bon que les œufs éclosent deux fois plus vite.");
 await say(M,"Deux enclos, là, en bas : tu me confies un mâle et une femelle qui s'entendent, et le reste, c'est la nature. Dans la ferme, ma sœur Huguette soigne tes Lumons et vend ce qu'il faut. Il y a aussi un PC et la couveuse.");
 await say(M,"Et va voir la grange tous les jours : les poules… euh, les Lumons sauvages y laissent souvent un œuf dans le foin. Premier arrivé, premier servi !");
 await say(M,"Tiens, deux paniers de pommes de chez nous, pour bien commencer.");give('pommes',2);ranchRefresh();setObj()}
async function marietteTalk(){const M='Fermière Mariette',R=ranchS();if(!F().ranch)return ranchArrivee();
 if(R.attente.length){const e=R.attente[0];const r=ranchGiveEgg(e);if(r){R.attente.shift();await say(M,"Tiens, je t'avais gardé un œuf ! "+(r==='sac'?"Le voilà.":"Je l'ai mis dans la couveuse de la ferme."))}}
 const n=R.pens.filter(p=>p.egg).length;
 const c=await choose(M,n?`Il y a ${n>1?'des œufs':'un œuf'} pour toi dans les enclos ! Tu veux t'occuper de quel enclos ?`:"Qu'est-ce que je peux faire pour toi, mon petit ?",['Enclos A','Enclos B','Comment ça marche ?','Rien']);
 if(c===0||c===1)return enclos(c);if(c!==2)return say(M,"Allez, va. Et ne laisse pas ta chienne courir après les Moulinet.");
 await say(M,"Un mâle et une femelle de la même famille : ils s'adorent, l'œuf vient vite. Juste un type en commun : ça marche aussi, mais c'est plus lent. Les Lumons uniques et les fusions ne font jamais d'œufs.");
 await say(M,"Le petit hérite de 3 IV de ses parents (4 avec le Fromage de Herve), et souvent de leur nature. Des pommes dans l'enclos, et le prochain œuf arrive deux fois plus vite.")}
async function enclos(k){const R=ranchS(),P=R.pens[k],N=`Enclos ${k?'B':'A'}`;
 if(P.egg){const r=ranchGiveEgg(P.egg);if(r){P.egg=null;sfx(784,.15);sfx(1046,.25);await banner('Tu as reçu un Œuf !',r==='sac'?'Marche pour le faire éclore':'Déposé dans la couveuse de la ferme',1800)}else await say('Fermière Mariette',"Il y a un œuf pour toi, mais tu en portes trois et la couveuse est pleine !")}
 if(P.mons.length)await say('',`${N} : ${P.mons.map(m=>nm(m)+(m.gender==='m'?' ♂':m.gender==='f'?' ♀':'')+' N.'+m.lv).join(' et ')}. ${compatTxt(P.mons)}${P.boost?' Ils mâchonnent des pommes.':''}`);
 const opts=P.mons.length?['Reprendre mes Lumons','Donner des pommes','Rien']:['Confier deux Lumons','Rien'];const c=await choose('',N,opts),o=opts[c];
 if(o==='Donner des pommes'){if(!S.bag.pommes){await say('',"Tu n'as pas de pommes. Tante Huguette en vend à la ferme.");return}if(P.boost){await say('',"Ils ont déjà des pommes. Ils mâchonnent tranquillement.");return}
  S.bag.pommes--;P.boost=1;sfx(660,.1);await say('',`Tu verses un panier de pommes de Herve dans l'enclos. ${P.mons.map(nm).join(' et ')} se régalent. Le prochain œuf viendra plus vite !`);return}
 if(o==='Reprendre mes Lumons'){const where=P.mons.map(m=>receiveMon(m));P.mons=[];P.steps=0;P.boost=0;refreshFollower();ranchRefresh();
  await say('Fermière Mariette',where.includes('box')?"Les voilà ! Ton équipe était pleine, alors j'en ai envoyé dans ton PC.":"Les voilà ! Ils ont bien profité du grand air.");return}
 if(o!=='Confier deux Lumons')return;
 if(S.party.length<3){await say('Fermière Mariette',"Il faut garder au moins un Lumon avec toi, mon petit. Reviens avec trois Lumons ou plus.");return}
 const pick=[];for(let j=0;j<2;j++){const i=await pickList(j?'Le 2e Lumon à confier':'Le 1er Lumon à confier',S.party.map(m=>({html:partyRow(m)+`<small>${m.gender==='m'?'♂':m.gender==='f'?'♀':''}</small>`,dis:pick.includes(m)})));if(i<0)return;pick.push(S.party[i])}
 S.party=S.party.filter(m=>!pick.includes(m));P.mons=pick;P.steps=0;refreshFollower();ranchRefresh();sfx(523,.1);
 await say('Fermière Mariette',`Allez, ${pick.map(nm).join(' et ')}, dans l'enclos ! ${compatTxt(pick)}`)}
async function couveuse(){const R=ranchS(),C=e=>`${ico('egg',30)}<span class="grow"><b>Œuf</b><br><small>${e.left<=0?'<b style="color:#ffd84a">Prêt à éclore !</b>':eggHint(e)}</small></span>`;
 for(;;){const rows=R.couv.map(e=>({html:C(e)}));
  rows.push({html:`<span class="grow">➕ <b>Déposer un œuf</b> <small>(${(S.eggs||[]).length} sur toi)</small></span>`,dis:!(S.eggs||[]).length||R.couv.length>=4});
  rows.push({html:`<span class="grow">🎒 <b>Reprendre un œuf</b></span>`,dis:!R.couv.length||(S.eggs||[]).length>=3});
  const i=await pickList(`Couveuse · ${R.couv.length}/4 œufs · ils avancent à chaque pas`,rows);if(i<0)break;
  if(i<R.couv.length){const e=R.couv[i];if(e.left>0){await say('',"L'œuf est bien au chaud sous la lampe. "+eggHint(e));continue}
   if(S.party.length>=6){await say('',"L'œuf est prêt, mais ton équipe est pleine ! Range un Lumon dans le PC d'abord.");continue}R.couv.splice(i,1);ranchRefresh();await hatch(e);continue}
  if(i===R.couv.length){const j=await pickList('Quel œuf déposer ?',S.eggs.map(e=>({html:C(e)})));if(j>=0){R.couv.push(S.eggs.splice(j,1)[0]);sfx(660,.1)}ranchRefresh();continue}
  const j=await pickList('Quel œuf reprendre ?',R.couv.map(e=>({html:C(e)})));if(j>=0){S.eggs.push(R.couv.splice(j,1)[0]);sfx(660,.1)}ranchRefresh()}}
async function nidDuJour(){const R=ranchS();if(R.nid===dayNum()){await say('',"Tu fouilles le foin… Rien de neuf aujourd'hui. Juste un Hannetonne qui ronfle. Reviens demain !");return}
 const e=mkEgg(oeufSurprise(),null,rnd()<1/200),r=ranchGiveEgg(e);if(!r){await say('',"Il y a un œuf dans le foin ! Mais tu en portes trois et la couveuse est pleine. Fais-en éclore un d'abord.");return}
 R.nid=dayNum();sfx(784,.15);sfx(1046,.25);await say('',"Tu fouilles le foin… et ta main touche quelque chose de tiède et de lisse. Un œuf !");
 await banner('Tu as trouvé un Œuf !',r==='sac'?'Marche pour le faire éclore':'Déposé dans la couveuse de la ferme',1800);ranchRefresh()}
async function arnaudTalk(){const A='Petit Arnaud';if(!S.bag.carnet){await say(A,"T'as des œufs ? Moi je sais toujours ce qu'il y a dedans. Je note tout dans mon carnet. Tiens, j'en ai un en trop !");give('carnet');
  await say(A,"Regarde ton équipe : à côté de chaque œuf, il y a l'espèce et le nombre de pas qu'il reste. C'est moi qui ai inventé. Enfin, presque.");return}
 await say(A,["Un mâle et une femelle de la même famille, c'est le plus rapide. Mamie Mariette dit que c'est « l'amour ». Beurk.","Les shiny, c'est une chance sur 400. Mais Luciole dit qu'avec un bracelet magique, c'est plus. Elle me fait marcher, je crois.","Le Fromage de Herve, ça pue tellement que les Lumons se collent l'un à l'autre. C'est pour ça que ça marche.","Si tu portes tes œufs en courant autour de la mare, ils éclosent hyper vite. J'ai fait 200 tours hier. J'ai vomi."][(rnd()*4)|0])}
async function huguetteTalk(){const N='Tante Huguette';const c=await choose(N,"Bonjour, mon chou ! Je te soigne tes Lumons, ou tu viens faire des courses ?",['Soigner mes Lumons','Boutique du Ranch','Rien']);
 if(c===0){await say(N,"Viens là, mes petits… Une soupe aux pois, une couverture, et au lit.",{auto:900});await healMachine();await say(N,"Et voilà ! Ils sont frais comme des pommes de Herve.");return}
 if(c!==1)return say(N,"Mets ton bonnet, il y a du vent sur le plateau.");
 const ks=['pommes','couverture','fromage',...ballsDispo(),'sirop','supersirop','speculoos'].filter(k=>ITEMS[k]);
 for(;;){const i=await pickList(`Boutique du Ranch · ${S.money} €`,ks.map(k=>{const one=['couverture','fromage'].includes(k),own=one&&S.bag[k];
   return{html:`${ico(k)}<span class="grow"><b>${ITEMS[k].n}</b> — ${own?'déjà à toi':ITEMS[k].price+' €'}<br><small>${ITEMS[k].d}${one?'':' · Tu en as '+(S.bag[k]||0)}</small></span>`,dis:own||S.money<ITEMS[k].price}}));
  if(i<0)break;const k=ks[i];S.money-=ITEMS[k].price;give(k)}
 await say(N,"Merci, mon chou ! Et reviens manger une tartine de sirop, un de ces jours.")}
async function grandLivre(){const L="Le Grand Livre de l'élevage";
 await pickList(L,[["Le couple","Un mâle et une femelle. Même famille : très compatibles. Un type en commun : compatibles. Uniques et fusions : jamais d'œuf."],
  ["L'hérédité","3 IV viennent des parents (4 avec le Fromage de Herve). La nature vient d'un des deux parents (de la mère avec le Fromage)."],
  ["Les pas","Chaque pas fait avancer tes œufs. Au Ranch : ×2. Avec la Couverture en laine : un pas de plus. Laïka très affectueuse : un pas de plus."],
  ["La couveuse","4 places en plus de tes 3 œufs. Les œufs avancent à chaque pas, même quand tu es loin. Reviens les faire éclore ici."],
  ["Les shiny","Une chance sur 400 à la naissance. Une chance sur 200 dans le nid de la grange. Certains cadeaux aident…"]].map(([t,d])=>({dis:true,html:`<span class="grow"><b>${t}</b><br><small>${d}</small></span>`})))}
async function colocLit(){const A='Alex';await say('',"Ton lit. Les draps sentent la cire pour carrosserie. Tu t'allonges, Laïka saute à tes pieds…");await fadeOut();healAll();
 if(S.clock!=null&&(S.clock<6*60||S.clock>20*60)){S.clock=7*60;updateEnv()}await sleep(400);await fadeIn();sfx(523,.2);sfx(659,.3);await say('',"Tu te réveilles reposé. Toute ton équipe est en pleine forme. Dans la salle de bains, Alex chante du Johnny Hallyday. Faux.")}
async function colocPanier(){const f=F(),l=laika();if(!l){await say('',"Le panier de Laïka. Il sent le biscuit.");return}
 if(f.panierDay===dayNum()){await say('',`${nm(l)} dort en boule dans son panier. Elle ronfle comme la Phantom.`);return}f.panierDay=dayNum();l.fr=Math.min(255,(l.fr||0)+10);await say('',`${nm(l)} tourne trois fois sur elle-même et se couche dans son panier en soupirant d'aise. Elle t'aime encore un peu plus.`)}
async function colocFrigo(){const f=F();if(f.frigoDay===dayNum()){await say('',"Le frigo. Il reste du ketchup, un citron triste et un mot d'Alex : « TOUCHE PAS À MES CISOA (sauf une) ».");return}
 f.frigoDay=dayNum();await say('',"Le frigo d'Alex. Quarante canettes de Cisoa, et un post-it : « Une par jour pour mon coloc préféré ». Tu en prends une.");give('zisoa')}
