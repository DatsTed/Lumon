/* ---- Route 5 : Jourdanfritte ↔ Liègenoir (chapitre 5) ----
   « La route des cokeries » : herbes hautes, terrils, cheminées à l'horizon. Luciole t'y rejoint ;
   un Lumon drogué à la Poudre d'Éclat t'attaque (f.poudre) ; deux sbires des Kétosaures. */
let ROUTE5=null;
function chimney(g,X,Z,h=7,r=.7){add(g,new THREE.CylinderGeometry(r*.75,r,h,12),'#5a4a44',X,h/2,Z,{ol:.02});box(g,r*1.7,.25,r*1.7,X,h-.3,Z,'#8a2a1a',{ol:false});
 const f=box(g,r*1.1,.3,r*1.1,X,h+.1,Z,'#ff7a1a',{emi:'#ff5a10',ol:false,cast:false});glowAt(g,X,h+.4,Z,'#ff8a3a',3,false);
 const sm=[];for(let k=0;k<5;k++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:vfxTex('fumee'),transparent:true,opacity:.55,depthWrite:false}));s.scale.set(2.2,2.2,1);g.add(s);sm.push(s)}
 return t=>sm.forEach((s,k)=>{const q=(t*.12+k/5)%1;s.position.set(X+q*3,h+.6+q*5,Z-q*1.5);s.scale.setScalar(1.6+q*3.4);s.material.opacity=.6*(1-q)})}
function buildRoute5(){
 {const W=36,H=16,m=ROUTE5=makeMap('route5',W,H,1460,0,'route'),g=m.group,T=grid(W,H);treesRim(T,W,H,(x,z)=>(x===0&&z>=7&&z<=9)||(x===W-1&&z>=10&&z<=12));
  rect(T,2,11,7,14,'g');rect(T,12,7,20,12,'g');rect(T,27,2,33,7,'g');rect(T,28,14,33,14,'g');
  pathLine(T,[[0,8],[9,8],[9,4],[24,4],[24,11],[35,11]],3);
  [[3,3],[6,2],[14,14],[20,14],[30,9],[33,9],[17,2],[28,13]].forEach(([x,z])=>{if(T[z]&&T[z][x]==='.')T[z][x]='T'});[[4,6],[12,2],[19,9],[31,13]].forEach(([x,z])=>{if(T[z][x]==='.')T[z][x]='f'});
  terrain(m,T);
  // à l'horizon : les cheminées des cokeries de Liègenoir (hors de la carte, derrière les arbres)
  [[26,-3,8],[30,-4,10],[34,-2.5,7]].forEach(([x,z,h])=>m.anim.push(chimney(g,m.ox+x,m.oz+z,h)));
  // un terril noir
  add(g,new THREE.ConeGeometry(2.6,2.4,9),'#2b2620',m.ox+11,1.1,m.oz+14.8,{ol:.02});
  sg(m,2,6,"Route 5 — « La route des cokeries ». ← Jourdanfritte · Liègenoir →",true);sg(m,33,9,"Liègenoir → La Cité Ardente. (Quelqu'un a barré « Ardente » et écrit « Éteinte ».)",true);
  item(m,4,13,'nuitlumi',2,'r5i1');item(m,31,3,'supersirop',2,'r5i2');item(m,30,14,'ombrelumi',2,'r5i3');
  for(let z=7;z<=9;z++)m.steps['0,'+z]=()=>goMap(JF,24,13,'left');arrows(m,[[0,7],[0,8],[0,9]],'left');
  for(let z=10;z<=12;z++)m.steps[(W-1)+','+z]=()=>goMap(LIE,1,14,'right');arrows(m,[[W-1,10],[W-1,11],[W-1,12]],'right');
  m.grassRate=.14;m.wildAt=z=>{const n=ENV.night;return[['ratoir',24,27,n?35:25],['terrillon',24,26,15],['hannetonne',24,26,n?5:20],['smogule',25,27,n?25:5],['cokelin',25,27,15],['pigeolet',24,26,n?0:15],['tchantchou',25,27,5]].filter(e=>e[3]>0)};
  const t1=npc(m,'keto',16,3,'down',async()=>F().kev?say('Dealer Kev',"Garde ta morale, gamin. À Liègenoir, tout le monde en prend. Même les Lumons."):trainerSpot(m.trainers[0],1));
  m.trainers.push({c:t1,range:3,flag:'kev',name:'Dealer Kev',key:'keto',smart:.45,mons:()=>[mkMon('ratoir',25),mkMon('cokelin',26)],
   intro:"Psst. Un petit sachet de Poudre d'Éclat pour ton Lumon ? Il frappera comme jamais. …Non ? Alors tu vas goûter à ceux qui en prennent.",win:"Ok, ok… T'es pas client. J'ai compris.",reward:['speculoos',2]});
  const t2=npc(m,'keto2',25,8,'left',async()=>F().momo?say('Guetteur Momo',"Je dirai rien au Baron. De toute façon, il sait déjà que t'arrives."):trainerSpot(m.trainers[1],1));
  m.trainers.push({c:t2,range:4,flag:'momo',name:'Guetteur Momo',key:'keto2',smart:.4,mons:()=>[mkMon('smogule',26),mkMon('ratoir',26)],
   intro:"Hé ! Je fais le guet, moi. Personne n'entre à Liègenoir sans que le Baron le sache. Allez, montre ce que t'as !",win:"Aïe… Je vais me faire allumer, moi.",reward:['megalumi',1]});
  m.hook=(x,z)=>{const f=F();if(!f.r5)return r5Entree;if(!f.poudre&&x>=13&&x<=15&&z>=3&&z<=5)return poudreScene;return null}}
}
