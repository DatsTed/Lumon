/* ---- Anversaille : la ville portuaire (chapitre 4) ----
   Maison des Lumons, arène de Marieke (type Eau, Médaille Diamant), port (grue à containers), Snow sur les quais. */
let ANV=null,CENTREA=null,GYMA=null;
function buildAnversaille(){
 {const W=30,H=26,m=ANV=makeMap('anv',W,H,1340,0,'town'),g=m.group,T=grid(W,H);treesRim(T,W,H,(x,z)=>z===H-1&&x>=13&&x<=15);
  rect(T,1,0,28,3,'~');rect(T,1,4,28,6,'c');rect(T,13,7,15,25,'#');rect(T,8,13,22,17,'c');rect(T,5,14,8,14,'c');rect(T,22,14,24,14,'c');
  [[2,8],[27,8],[2,22],[27,22],[9,21],[19,21]].forEach(([x,z])=>T[z][x]='T');terrain(m,T);
  bigBuilding(g,m,3,9,5,4,'#fdf6f0','#d8232a',5,'MAISON DES LUMONS','#d8232a','#ffffff');m.doors['5,12']=()=>goMap(CENTREA,4,5,'up');
  bigBuilding(g,m,21,9,6,4,'#1a3a5a','#3ef0ff',24,"ARÈNE D'ANVERSAILLE",'#3ef0ff','#0a1a2a');m.doors['24,12']=()=>goMap(GYMA,5,13,'up');
  house(g,m,3,18,4,3,'#c9b08a','#3a3a42',4);m.doors['4,20']=async()=>say('Diamantaire Moshe (derrière la porte)',"On ne vend pas de diamants aux dresseurs, désolé. Par contre, on achète les Lumisphères d'Éclat. Non ? Bon.");
  house(g,m,22,18,4,3,'#e8d8b0','#5a3a3a',23);m.doors['23,20']=async()=>say('',"Une odeur de frites et de mayonnaise. Ici, on dit « friet ». Personne ne répond.");
  // port : quais, containers, grue
  const cols=['#d8232a','#3a8ae8','#2fbf5a','#f6c80f','#a04ae8','#ff8a2c','#3a3a42'];
  for(let k=0;k<9;k++){const x=4+k*2.6,z=4.6+(k%2)*.9;box(g,2.1,1,1,m.ox+x,.6,m.oz+z,cols[k%cols.length],{ol:.03});box(g,2.12,.06,1.02,m.ox+x,1.12,m.oz+z,'#2b2b2b',{ol:false});setSolid(m,Math.round(x),Math.round(z))}
  {const c=new THREE.Group();c.position.set(m.ox+25,0,m.oz+5);g.add(c);for(const s of[-.6,.6])box(c,.25,4,.25,s,2,0,'#f6c80f',{ol:.02});box(c,4,.3,.3,-1.2,4,0,'#f6c80f',{ol:.02});box(c,.5,.5,.5,-2.6,3.4,0,'#2b2b2b',{ol:.02});setSolid(m,25,5);setSolid(m,24,5)}
  // la barrière du port : seulement pour les dresseurs médaillés (Médaille Diamant)
  const gate=box(g,3.2,.16,.16,m.ox+14,.8,m.oz+7.5,'#d8232a',{ol:.02});m.anim.push(()=>{gate.visible=!F().badge2;for(let x=13;x<=15;x++)setSolid(m,x,7,F().badge2?0:1)});
  m.signs['12,7']="Port d'Anversaille — accès réservé aux dockers… et aux dresseurs titulaires de la Médaille Diamant.";
  m.signs['20,5']=m.signs['21,5']=portGrue;
  [[8,13],[22,13],[8,17],[22,17],[12,8],[16,8]].forEach(([x,z])=>lamp(g,m,x,z));fountain(g,m,15,15);
  m.signs['15,15']="La fontaine du Brabo-Lumon : un Moulinet en bronze qui lance… une main ? Les gens d'ici trouvent ça normal.";
  sg(m,16,23,"Anversaille — « Le port qui ne dort jamais. » Arène · Maison des Lumons · Port",true);
  for(let x=13;x<=15;x++)m.steps[x+',25']=()=>goMap(ROUTE4,11,1,'down');arrows(m,[[13,25],[14,25],[15,25]],'down');
  wand(npc(m,'miner',10,16,'down',async()=>say('Docker Bart',"Les Kétosaures ? Ils déchargent la nuit, au quai numéro 5. Des caisses de « fumigènes », qu'ils disent. Mon œil.")));
  wand(npc(m,'kid',19,14,'left',async()=>say('Petite Fien',"Marieke, de l'arène, elle a un Lumon qui fait des vagues dans la salle ! Mon papa a dû racheter des chaussettes.")));
  m.hook=(x,z)=>{const f=F();if(!f.anv){f.anv=1;return async()=>{await banner('Anversaille','Le port qui ne dort jamais',2400);await say('',"Une odeur de mer, de gasoil et de frites. Des grues jaunes, des containers à perte de vue… et, sur le quai n°5, des caisses mauves frappées d'un dinosaure couronné.");setObj()}}return null}}
 CENTREA=centreRoom('centre_a',1400,()=>goMap(ANV,5,13,'down'),'Infirmière Leen','anv');
 {const X=1420,m=GYMA=room('gym_a',11,15,X,'W','#1a3a5a',()=>goMap(ANV,24,13,'down'),T=>{for(let z=3;z<=10;z++)for(const x of[1,2,8,9])T[z][x]='~'});m.song='gymb';
  for(const x of[2,8])box(m.group,.3,2.2,.3,X+x,1.1,11.5,'#3ef0ff',{emi:'#1a8ab0',ol:.02});plane(m.group,4,.7,X+5,2.2,.46,labelTex('ARÈNE · TYPE EAU','#0a1a2a','#3ef0ff',768,128,56));
  NPC.marieke=npc(m,'marieke',5,2,'down',mariekeTalk)}
}
