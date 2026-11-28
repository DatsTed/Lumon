/* ---- Liègenoir : la ville sombre (chapitre 5) ----
   Tant que le Baron tient la ville (!f.ch5done), le smog des cokeries cache le soleil : il y fait nuit en permanence.
   Place du Marché et le Perron · club « Le Perron Noir » (nord) · Cokerie (nord-ouest) · Montagne de Bueren (nord-est)
   · rue des Vitrines (est) · Maison des Lumons et arène de l'inspecteur Lambert (sud). */
let LIE=null,CENTREL=null,GYML=null,COKERIE=null,CLUB=null,BUEREN=null;
const DARK_MAPS=new Set(['lie','bueren']);
function buildLiegenoir(){
 {const W=32,H=28,m=LIE=makeMap('lie',W,H,1520,0,'town'),g=m.group,T=grid(W,H);treesRim(T,W,H,(x,z)=>(x===0&&z>=13&&z<=15)||(z===H-1&&x>=14&&x<=16));
  rect(T,0,13,9,15,'#');rect(T,9,9,23,19,'c');rect(T,13,7,15,8,'c');rect(T,3,7,5,12,'c');rect(T,5,12,9,12,'c');rect(T,23,13,30,15,'#');rect(T,24,16,30,25,'c');
  rect(T,26,8,28,12,'c');rect(T,5,19,9,24,'c');rect(T,14,20,16,27,'c');rect(T,9,19,14,20,'c');
  [[1,1],[30,1],[1,26],[30,26],[21,24],[10,25]].forEach(([x,z])=>T[z][x]='T');terrain(m,T);
  // le Perron, au milieu de la place du Marché (colonne + pomme de pin dorée)
  {const X=m.ox+16,Z=m.oz+14;add(g,new THREE.CylinderGeometry(.9,1.1,.5,8),'#6a6a72',X,.3,Z,{ol:.03});add(g,new THREE.CylinderGeometry(.18,.22,2.6,10),'#8a8a92',X,1.8,Z,{ol:.02});
   add(g,new THREE.SphereGeometry(.32,10,8),'#c9a14a',X,3.25,Z,{emi:'#6a4a10',ol:.02});add(g,new THREE.ConeGeometry(.12,.4,8),'#c9a14a',X,3.6,Z,{ol:false});solidRect(m,15,13,3,3);
   m.signs['16,16']=m.signs['15,14']=m.signs['17,14']="Le Perron : le symbole des libertés de la ville. Quelqu'un a tagué dessus, en mauve : « LE BARON C'EST LE PATRON ».";}
  // club « Le Perron Noir » (le QG du Baron)
  {const b=bigBuilding(g,m,12,3,6,4,'#120a14','#a04ae8',14,'LE PERRON NOIR','#120a14','#ff3bd8');for(const x of[-2.6,2.6])box(g,.14,2.2,.14,b.cx+x,1.2,b.fz+.1,'#ff3bd8',{emi:'#c010a0',ol:false});glowAt(g,b.cx,2.4,b.fz+.6,'#ff3bd8',2.2)}
  m.doors['14,6']=clubPorte;const vid=npc(m,'keto2',15,7,'down',clubPorte);m.videur=vid;
  // Cokerie (nord-ouest) : bâtiment industriel, cheminées qui crachent
  {bigBuilding(g,m,2,3,6,4,'#3a3430','#2b2b2b',4,"COKERIE D'OUGRÉE",'#2b2b2b','#ff8a2c');m.anim.push(chimney(g,m.ox+2.2,m.oz+2.2,6.5,.55));m.anim.push(chimney(g,m.ox+6.8,m.oz+2.4,7.5,.6))}
  m.doors['4,6']=cokeriePorte;
  // Montagne de Bueren (nord-est) : un escalier de 374 marches qui monte vers les coteaux
  {const X=m.ox+27,Z0=m.oz+8;for(let k=0;k<12;k++)box(g,2.8,.18+k*.22,.55,X,(.18+k*.22)/2,Z0-k*.55,k%2?'#8a8278':'#9a9288',{ol:.015});for(const s of[-1.45,1.45])box(g,.12,.9,6.6,X+s,1.2+.2,Z0-3,'#5a524a',{ol:.02});
   for(let x=26;x<=28;x++)for(let z=2;z<=7;z++)setSolid(m,x,z)}
  m.signs['26,8']=m.signs['27,8']=m.signs['28,8']=buerenEscalier;sg(m,25,9,"Montagne de Bueren — 374 marches. « Courage, le panorama vaut le coup ! » (En dessous, au marqueur : « Lil Perron tourne son clip là-haut, NE PAS DÉRANGER ».)",false);
  // rue des Vitrines (est) : façades aux néons rouges
  for(const[z,col]of[[17,'#7a2a3a'],[21,'#5a2a4a']]){house(g,m,28,z,3,3,col,'#2b1a22',28);for(const k of[0,1]){const w=box(g,.7,.9,.06,m.ox+28.8+k*.95-.45,1,m.oz+z+1+1.43,'#ff2a4a',{emi:'#ff1a3a',ol:false,cast:false});glowAt(g,m.ox+28.8+k*.95-.45,1,m.oz+z+3,'#ff2a4a',1.2)}}
  m.doors['28,19']=m.doors['28,23']=async()=>say('',"Derrière la vitrine aux néons rouges, un rideau se ferme. Une affichette : « Propriété du Baron. »");
  sg(m,24,16,"Rue des Vitrines. Les néons ne s'éteignent jamais. Les sourires, si.",false);
  // Maison des Lumons, arène, friterie
  bigBuilding(g,m,3,21,5,3,'#fdf6f0','#8a2a2a',5,'MAISON DES LUMONS','#d8232a','#ffffff');m.doors['5,23']=()=>goMap(CENTREL,4,5,'up');
  bigBuilding(g,m,12,23,6,3,'#1a1420','#3a1a2a',15,'ARÈNE DE LIÈGENOIR','#ff3b5c','#1a1420');m.doors['15,25']=()=>goMap(GYML,5,13,'up');
  house(g,m,19,20,4,3,'#c9b08a','#3a2a22',20);m.doors['20,22']=async()=>say('Friterie « Chez Tchantchès »',"Fermé. « Réouverture quand le Baron arrêtera de racketter les friteries. » Écrit à la main, souligné trois fois.");
  [[9,9],[23,9],[9,19],[23,19],[3,13],[20,14],[25,13]].forEach(([x,z])=>lamp(g,m,x,z));
  sg(m,2,12,"Liègenoir — « La Cité Ardente ». Place du Marché · Arène · Maison des Lumons · Cokerie",true);
  for(let z=13;z<=15;z++)m.steps['0,'+z]=()=>goMap(ROUTE5,34,11,'left');
  // sortie sud (derrière l'arène) : la Route 6 vers Namuroc, ouverte quand le Baron est tombé (chapitre 6)
  for(let x=14;x<=16;x++)m.steps[x+','+(H-1)]=lieSud;arrows(m,[[14,H-1],[15,H-1],[16,H-1]],'down');arrows(m,[[0,13],[0,14],[0,15]],'left');
  // habitants
  NPC.samira=npc(m,'samira',11,15,'right',samiraTalk);
  wand(npc(m,'kid',19,11,'down',gaminsRap));wand(npc(m,'kid',21,16,'left',gaminsRap));
  NPC.maigre=npc(m,'maigre',22,10,'down',maigreTalk);
  NPC.jade=npc(m,'jade',26,20,'left',jadeTalk);
  wand(npc(m,'granny',12,18,'up',async()=>say('Mamy Josée',F().ch5done?"Le soleil ! Ça fait des mois… Je vais pouvoir étendre mon linge dehors. Et aller au marché de la Batte, comme avant.":"Avant, le dimanche, on allait au marché de la Batte. Maintenant on reste chez soi. Le smog, les Kétosaures… et les petits qui chantent des horreurs.")));
  m.hook=(x,z)=>{const f=F();if(!f.lie)return lieArrivee;return null}}
 CENTREL=centreRoom('centre_l',1580,()=>goMap(LIE,5,24,'down'),'Infirmière Mireille','lie');
 // arène de l'inspecteur Lambert : salle sombre, projecteurs
 {const X=1600,m=GYML=room('gym_l',11,15,X,'K','#1a1420',()=>goMap(LIE,15,26,'down'));m.song='gymb';
  for(const x of[2,8]){box(m.group,.3,2.2,.3,X+x,1.1,11.5,'#ff3b5c',{emi:'#a01a30',ol:.02})}plane(m.group,4.4,.7,X+5,2.2,.46,labelTex('ARÈNE · TYPE TÉNÈBRES','#1a1420','#ff3b5c',768,128,52));
  for(const z of[4,8])for(const x of[3,7]){box(m.group,.5,.04,.5,X+x,.13,z,'#2b2b30',{cast:false});glowAt(m.group,X+x,2.8,z,'#ffe8c0',1.4)}
  NPC.lambert=npc(m,'lambert',5,2,'down',lambertTalk)}
 // la Cokerie : quatre fours (énigme des vannes) et deux gardes
 {const X=1620,m=COKERIE=room('cokerie',13,11,X,'D','#3a3430',()=>goMap(LIE,4,7,'down'));m.song='keto';
  m.fours=[];const temps=COKE_T;for(let k=0;k<4;k++){const x=2+k*3,o=new THREE.Group();o.position.set(X+x,0,1);m.group.add(o);box(o,1.6,2,1,0,1,0,'#4a403a',{ol:.03});const fire=box(o,.9,.6,.08,0,.7,.52,'#ff7a1a',{emi:'#ff5a10',ol:false,cast:false});
   plane(o,.9,.3,0,1.6,.53,labelTex(temps[k]+' °C','#1a1414','#ffb030',256,96,56));const v=add(o,new THREE.TorusGeometry(.18,.05,6,14),'#d8232a',.55,1.1,.55,{ol:false});
   setSolid(m,x,1);m.signs[x+',1']=()=>vanne(k);m.fours.push({fire,v,x})}
  sg(m,6,6,"CONSIGNE DE SÉCURITÉ : pour arrêter la batterie de fours, on coupe TOUJOURS le four le plus FROID en premier, puis le suivant, et ainsi de suite. Le plus chaud en dernier. Sinon : BOUM.",false);
  box(m.group,2,.9,1,X+2,.45,7,'#6a3aa0',{ol:.03});box(m.group,2,.9,1,X+10,.45,7,'#6a3aa0',{ol:.03});setSolid(m,2,7);setSolid(m,10,7);
  m.signs['2,7']=m.signs['10,7']="Des sacs mauves frappés d'un dinosaure couronné : « POUDRE D'ÉCLAT — NE PAS LAISSER À LA PORTÉE DES LUMONS ». Ironique.";
  const g1=npc(m,'keto',4,5,'right',async()=>F().rudi?say('Contremaître Rudi',"Tu vas couper les fours ? Le Baron va me tuer. …Fais-le quand même. J'ai des enfants, ils respirent cette fumée."):trainerSpot(m.trainers[0],1));
  m.trainers.push({c:g1,range:4,flag:'rudi',name:'Contremaître Rudi',key:'keto',smart:.5,mons:()=>[mkMon('cokelin',29),mkMon('terrillon',29)],intro:"Qu'est-ce que tu fais là ? La Cokerie est interdite au public ! …Ah, t'es le gamin dont parle le Baron. Allez, en garde !",win:"Les fours… vas-y. Je regarderai ailleurs.",reward:['supersirop',2]});
  const g2=npc(m,'keto2',9,4,'left',async()=>F().vanessa?say('Chimiste Vanessa',"On raffine l'Éclat dans les fours à coke. Ça fait une poudre mauve. Les Lumons qui en prennent brillent… puis s'éteignent."):trainerSpot(m.trainers[1],1));
  m.trainers.push({c:g2,range:3,flag:'vanessa',name:'Chimiste Vanessa',key:'keto2',smart:.55,mons:()=>[mkMon('smogule',30),mkMon('perronrat',30)],intro:"Encore un curieux. Tu sais combien vaut un sac de Poudre ? Plus que ta vie. En garde !",win:"…J'avais fait des études pour soigner les Lumons. Pas pour ça.",reward:['ombrelumi',2]})}
 // le club du Baron
 {const X=1640,m=CLUB=room('club',13,11,X,'K','#120a14',()=>goMap(LIE,14,7,'down'));m.song='lift';
  for(let x=4;x<=8;x++)for(let z=4;z<=7;z++){const t=box(m.group,.96,.03,.96,X+x,.13,z,(x+z)%2?'#3a1450':'#1a0a28',{cast:false,emi:(x+z)%2?'#5a1a80':'#200a30'});m.anim.push(tt=>{t.material.emissiveIntensity=.4+.6*Math.max(0,Math.sin(tt*3+x*.7+z))})}
  box(m.group,4,.9,.8,X+6,.45,1.6,'#c9a14a',{ol:.03});for(const x of[5,6,7])setSolid(m,x,1);plane(m.group,4.4,.7,X+6,2.4,.46,labelTex('LE PERRON NOIR','#120a14','#ff3bd8',768,128,60));
  for(const x of[1.5,10.5]){box(m.group,1.4,.6,2.4,X+x,.3,5,'#2b1a3a',{ol:.03});glowAt(m.group,X+x,2.6,5,'#ff3bd8',2,false)}for(const z of[4,5,6])setSolid(m,1,z),setSolid(m,10,z);
  m.hook=(x,z)=>{const f=F();if(!f.ch5done&&z<=6)return baronScene;return null}}
 // haut de la Montagne de Bueren : le clip de Lil Perron, la vue sur la ville
 {const W=11,H=8,m=BUEREN=makeMap('bueren',W,H,1700,0,'town'),g=m.group,T=grid(W,H,'c');treesRim(T,W,H,(x,z)=>z===H-1&&x>=4&&x<=6);for(let x=1;x<W-1;x++)T[1][x]='T';terrain(m,T);
  for(let k=0;k<14;k++){const x=m.ox-6+k*1.7,z=m.oz-4-((k*37)%5),h=1+((k*13)%6);box(g,1.4,h,1.4,x,h/2,z,'#2a2430',{ol:.02});box(g,.3,.3,.05,x-.3,h*.6,z+.71,'#ffd27a',{emi:'#ffb84a',ol:false,cast:false})}
  [[2,3],[8,3]].forEach(([x,z])=>lamp(g,m,x,z));box(g,1.2,1,.8,m.ox+5,.5,m.oz+2,'#2b2b30',{ol:.03});setSolid(m,5,2);
  for(let x=4;x<=6;x++)m.steps[x+','+(H-1)]=()=>goMap(LIE,27,9,'down');arrows(m,[[4,H-1],[5,H-1],[6,H-1]],'down');
  NPC.lilperron=npc(m,'lilperron',5,3,'down',rapBattle);
  m.signs['5,2']="Une enceinte énorme. Dessus, au marqueur : « PROPRIÉTÉ DE LIL PERRON (et un peu du Baron) ».";}
}
