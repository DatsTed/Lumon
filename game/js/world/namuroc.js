/* ---- Chapitre 6 : Route 6 (Liègenoir -> Namuroc) et Namuroc, la ville des deux rivières ----
   Route 6 « La vallée de la Meuse » : la sortie sud de Liègenoir (derrière l'arène). La Meuse à gauche, les rochers à droite,
   un viaduc de chemin de fer sous lequel Givrâle grelotte (scène f.givrale). Deux dresseurs, un ancien Kétosaure.
   Namuroc : place d'Armes, Parlement d'Ardenval, Halle des Échasseurs (arène type Vol), Maison des Lumons, téléphérique vers la
   Citadelle (après la Médaille Citadelle), la Meuse et le pont vers la Route 7 (chapitre 7, après f.ch6done).
   Citadelle : le grand escargot, Snow ; la Terra Nova mène aux souterrains de la Compagnie Grognon (donjon du chapitre). */
let ROUTE6=null,NAMU=null,CENTREN=null,GYMN=null,CITA=null,SOUT=null;
function snail(g,X,Z,s=1){const sh=add(g,new THREE.SphereGeometry(.9*s,14,10),'#c8a878',X,.9*s,Z,{ol:.03});sh.scale.set(1,1,.75);
 add(g,new THREE.TorusGeometry(.5*s,.14*s,8,18),'#8a6a4a',X,.95*s,Z+.62*s,{ol:.02});box(g,1.9*s,.35*s,.6*s,X-.2*s,.18*s,Z+.1*s,'#a89878',{ol:.03});
 for(const k of[-1,1]){add(g,new THREE.CylinderGeometry(.04*s,.05*s,.6*s,6),'#a89878',X-1*s,.65*s,Z+k*.15*s,{ol:false});add(g,new THREE.SphereGeometry(.09*s,8,6),'#2b2b2b',X-1*s,.98*s,Z+k*.15*s,{ol:false})}}
function buildNamuroc(){
 // ---------- Route 6
 {const W=22,H=34,m=ROUTE6=makeMap('route6',W,H,2000,0,'route'),g=m.group,T=grid(W,H);treesRim(T,W,H,(x,z)=>(z===0&&x>=9&&x<=11)||(z===H-1&&x>=9&&x<=11));
  rect(T,1,1,4,H-2,'~');for(let z=2;z<=30;z++)if(z%7!==3)rect(T,17,z,20,z,'r');
  rect(T,12,3,15,7,'g');rect(T,9,11,14,17,'g');rect(T,14,22,16,30,'g');rect(T,5,26,7,31,'g');
  pathLine(T,[[10,0],[10,8],[7,8],[7,20],[12,20],[12,26],[10,26],[10,33]],3);
  [[15,10],[13,19],[6,4],[16,31],[8,30]].forEach(([x,z])=>{if(T[z][x]==='.'||T[z][x]==='g')T[z][x]='T'});[[14,9],[6,23],[15,20]].forEach(([x,z])=>{if(T[z][x]==='.')T[z][x]='f'});
  terrain(m,T);
  // le viaduc du chemin de fer (on passe dessous, z=14)
  {const Z=m.oz+14;for(const x of[4.6,9.4]){box(g,.7,2.6,.9,m.ox+x,1.3,Z,'#8a7a6a',{ol:.03});}box(g,6.2,.45,1.1,m.ox+7,2.75,Z,'#7a6a5a',{ol:.03});
   for(const s of[-.45,.45])box(g,6.2,.12,.08,m.ox+7,3.05,Z+s,'#4a4a52',{ol:false});setSolid(m,5,14);setSolid(m,9,14)}
  // les rochers de la Meuse, à l'horizon
  for(let k=0;k<5;k++)add(g,new THREE.ConeGeometry(1.4+k%2*.5,3.2+(k*7)%3,6),'#9a9288',m.ox+21.5+(k%2)*.8,1.5,m.oz+4+k*6.5,{ol:.03});
  sg(m,12,2,"Route 6 — « La vallée de la Meuse ». ↑ Liègenoir · Namuroc ↓",true);sg(m,13,31,"Namuroc ↓ — La ville des deux rivières. « Ici, on prend le temps. Comme les escargots. »",true);
  item(m,14,5,'aqualumi',2,'r6i1');item(m,6,29,'titzvel',2,'r6i2');item(m,16,24,'eclairlumi',1,'r6i3');
  for(let x=9;x<=11;x++){m.steps[x+',0']=()=>goMap(LIE,15,26,'up');m.steps[x+','+(H-1)]=()=>goMap(NAMU,17,1,'down')}
  arrows(m,[[9,0],[10,0],[11,0]],'up');arrows(m,[[9,H-1],[10,H-1],[11,H-1]],'down');
  m.grassRate=.14;m.wildAt=z=>{const n=ENV.night;return[['escargolin',30,32,n?10:25],['echassor',30,32,n?5:20],['anguimeuse',30,33,n?30:12],['pigeolet',30,31,n?0:10],['ratoir',30,32,n?25:5],['hannetonne',30,31,10]].filter(e=>e[3]>0)};
  const t1=npc(m,'scout',16,12,'left',async()=>F().zoe?say('Grimpeuse Zoé',"Les rochers de la Meuse, je les grimpe depuis mes huit ans. Là-haut, on voit jusqu'à la Citadelle de Namuroc."):trainerSpot(m.trainers[0],1));
  m.trainers.push({c:t1,range:3,flag:'zoe',name:'Grimpeuse Zoé',key:'scout',smart:.45,mons:()=>[mkMon('echassor',32),mkMon('terrilou',33)],
   intro:"Hé, le rockeur ! T'as l'air de quelqu'un qui grimpe pas. Voyons si tu tiens debout dans un combat !",win:"Bien joué. Tu tombes pas facilement, toi.",reward:['eclairlumi',1]});
  const t2=npc(m,'fisher',8,23,'right',async()=>F().albert?say('Pêcheur Albert',"La nuit, les Anguimeuse remontent la Meuse en s'éclairant. C'est beau. Mais ça fait fuir mes poissons."):trainerSpot(m.trainers[1],1));
  m.trainers.push({c:t2,range:4,flag:'albert',name:'Pêcheur Albert',key:'fisher',smart:.4,mons:()=>[mkMon('anguimeuse',33),mkMon('moulefrit',32)],
   intro:"Chut ! Tu fais fuir les poissons ! …Bon, tant pis. Un petit combat, ça me réchauffera.",win:"T'as la main, toi. Comme moi avec la canne.",reward:['aqualumi',2]});
  npc(m,'keto',13,27,'left',dylanTalk);
  m.hook=(x,z)=>{const f=F();if(!f.r6)return r6Entree;if(!f.givrale&&z>=13&&z<=15&&x>=6&&x<=8)return givraleScene;return null}}
 // ---------- Namuroc
 {const W=34,H=30,m=NAMU=makeMap('namu',W,H,2060,0,'town'),g=m.group,T=grid(W,H);treesRim(T,W,H,(x,z)=>(z===0&&x>=16&&x<=18)||(z===H-1&&x>=26&&x<=28));
  rect(T,0,24,W-1,27,'~');rect(T,1,18,3,23,'~');rect(T,26,24,28,28,'#');rect(T,1,28,W-2,28,'.');
  rect(T,16,0,18,8,'#');rect(T,5,6,30,8,'c');rect(T,10,8,24,18,'c');rect(T,4,12,10,13,'c');rect(T,5,13,8,19,'c');rect(T,24,17,28,23,'c');rect(T,11,19,16,22,'c');
  [[1,1],[32,1],[30,12],[31,20],[1,28],[32,28],[12,28],[20,28]].forEach(([x,z])=>T[z][x]='T');[[31,15],[29,10],[8,20],[9,21]].forEach(([x,z])=>{if(T[z][x]==='.')T[z][x]='f'});
  terrain(m,T);
  // le pont de Jambes sur la Meuse (vers la Route 7)
  {const X=m.ox+27;box(g,3.4,.18,5,X,.02,m.oz+26,'#8a8278',{ol:.02});for(const s of[-1.6,1.6])box(g,.14,.5,5,X+s,.3,m.oz+26,'#5a524a',{ol:.02})}
  // Parlement d'Ardenval, Halle des Échasseurs (arène), Maison des Lumons
  bigBuilding(g,m,5,2,6,4,'#e8e0d0','#5a6a7a',8,"PARLEMENT D'ARDENVAL",'#2a3a5a','#f6c80f');
  m.doors['8,5']=async()=>say('Huissier du Parlement',F().ch6done?"Séance extraordinaire ! Les députés votent une loi contre la Poudre d'Éclat. À l'unanimité. Même ceux qui ont pris l'argent de Grognon. Surtout eux, en fait.":"Séance en cours depuis neuf heures. Sujet du jour : « La frite est-elle wallonne ou bruxelloise ? ». Revenez dans trois ans.");
  bigBuilding(g,m,24,3,6,4,'#e8d8b8','#8a2a1a',27,'HALLE DES ÉCHASSEURS','#d8232a','#f6c80f');m.doors['27,6']=()=>goMap(GYMN,5,13,'up');
  for(const x of[24.4,29.6]){box(g,.1,1.8,.1,m.ox+x,2.9,m.oz+6.6,'#c9a14a',{ol:false});box(g,.6,.4,.04,m.ox+x+.3*(x<27?1:-1),3.6,m.oz+6.6,x<27?'#f6c80f':'#d8232a',{ol:false})}
  bigBuilding(g,m,4,9,5,3,'#fdf6f0','#8a2a2a',6,'MAISON DES LUMONS','#d8232a','#ffffff');m.doors['6,11']=()=>goMap(CENTREN,4,5,'up');
  // le beffroi, le grand escargot de la place
  belfry(g,m,21,9);snail(g,m.ox+14,m.oz+12,1);solidRect(m,13,12,2,1);m.signs['13,12']=m.signs['14,12']="« L'Escargot de Namuroc ». Une statue offerte par la ville jumelle. Il avance d'un centimètre par an. Il a déjà fait le tour de la place deux fois.";
  // la station du téléphérique (ouest) et la Citadelle sur son rocher, au loin
  {house(g,m,4,15,4,3,'#c8c0b0','#3a5a8a',6);const X=m.ox-7,Z=m.oz+6;add(g,new THREE.ConeGeometry(6,7,8),'#7a8a5a',X,3.4,Z,{ol:.03});
   box(g,5,1.6,3.4,X,7.2,Z,'#b8ac98',{ol:.03,tex:'stone',rx:3,ry:1});for(let k=0;k<5;k++)box(g,.6,.6,.6,X-2.2+k*1.1,8.2,Z+1.7,'#a89c88',{ol:.02});
   const ca=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new V(m.ox+6,2.6,m.oz+15.5),new V(X+1,8,Z)]),new THREE.LineBasicMaterial({color:'#2b2b2b'}));g.add(ca);
   const cab=box(g,.6,.5,.5,m.ox+3,4,m.oz+12,'#d8232a',{ol:.02});m.anim.push(t=>{const q=(Math.sin(t*.25)+1)/2;cab.position.set(m.ox+6+(X+1-m.ox-6)*q,2.4+(8-2.6)*q,m.oz+15.5+(Z-m.oz-15.5)*q)})}
  m.signs['6,17']=m.signs['5,17']=m.signs['7,17']=telepherique;
  sg(m,9,18,"Téléphérique de la Citadelle. Sur la porte, une bombe de peinture mauve : « RENDEZ-VOUS À LA CITADELLE, LE ROCKEUR. — S. »",false);
  // la confluence (le Grognon) et la Meuse
  sg(m,4,22,"Le Grognon — la pointe où la Sambre se jette dans la Meuse. Un panneau tout neuf : « Propriété de la Compagnie Grognon. Visites des souterrains : FERMÉ POUR TRAVAUX. »",false);
  sg(m,25,22,"Pont de Jambes → Route 7, vers Bastognac et les forêts d'Ardenne.",true);
  [[10,8],[24,8],[10,18],[24,18],[5,13],[26,20],[16,6]].forEach(([x,z])=>lamp(g,m,x,z));
  sg(m,15,2,"Namuroc — « La ville des deux rivières ». Place d'Armes · Halle des Échasseurs · Parlement · Téléphérique de la Citadelle",true);
  for(let x=16;x<=18;x++)m.steps[x+',0']=()=>goMap(ROUTE6,10,32,'up');arrows(m,[[16,0],[17,0],[18,0]],'up');
  for(let x=26;x<=28;x++)m.steps[x+','+(H-1)]=pontJambes;arrows(m,[[26,H-1],[27,H-1],[28,H-1]],'down');
  // habitants
  wand(npc(m,'boy',18,11,'down',async()=>say('Échasseur Max',F().badge4?"T'as battu Théo à la joute ? Sur des échasses ? Toi ? …Respect, le rockeur.":"Tu veux défier Théo ? Il va d'abord te faire monter sur des échasses. Personne ne tient plus de quinze secondes face à lui.")));
  wand(npc(m,'girl',12,15,'right',async()=>say('Échasseuse Léa',"Aux Fêtes de Wallonie, les Mélans (en jaune) affrontent les Avresses (en rouge). On se pousse jusqu'à ce qu'il en reste un debout. C'est comme la politique, mais en plus honnête.")));
  npc(m,'granny',20,15,'left',async()=>say('Mamy Lisette',F().ch6done?"Les souterrains sont fermés pour de bon ? Tant mieux. Ça grondait sous la place, la nuit. Mes escargots n'osaient plus sortir.":"Des escargots à la crème, mon petit ? Non ? Tant pis. Dis, tu trouves pas que ça gronde, sous la place, la nuit ? Comme des pioches…"));
  npc(m,'fisher',14,23,'down',async()=>say('Pêcheur Gilbert',"Depuis quelques mois, des péniches de la Compagnie Grognon partent la nuit, chargées à ras bord. Vers la Meuse, vers le sud. Des pierres, qu'ils disent. Des pierres qui brillent mauve."));
  npc(m,'clerk',9,16,'right',async()=>say('Guide de la Compagnie Grognon',F().ch6done?"Je cherche du travail. Un vrai. Si vous entendez parler de quelque chose…":"Les souterrains de la Citadelle ? Sept kilomètres de tunnels ! Fermés pour travaux. Quels travaux ? …Des travaux. Circulez."));
  m.hook=(x,z)=>{const f=F();if(!f.namu)return namuArrivee;return null}}
 // ---------- intérieurs
 CENTREN=centreRoom('centre_n',2110,()=>goMap(NAMU,6,12,'down'),'Infirmière Babette','namu');npc(CENTREN,'clerk',1,4,'right',shopMenu);
 {const X=2130,m=GYMN=room('gym_n',11,15,X,'W','#e8d8b8',()=>goMap(NAMU,27,7,'down'));m.song='gymb';
  plane(m.group,4.4,.7,X+5,2.2,.46,labelTex('ARÈNE · TYPE VOL','#e8d8b8','#d8232a',768,128,52));
  for(const x of[2,8])for(const z of[4,8]){add(m.group,new THREE.CylinderGeometry(.06,.06,1.6,6),'#8a6a4a',X+x,.8,z,{ol:false});box(m.group,.3,.08,.2,X+x,.25,z,'#5a4a3a',{ol:false})}
  for(const z of[3,6,9]){box(m.group,.3,.04,9,X+1.5,.13,6,'#f6c80f',{cast:false});box(m.group,.3,.04,9,X+8.5,.13,6,'#d8232a',{cast:false})}
  NPC.theo=npc(m,'theo',5,2,'down',theoTalk)}
 // la Citadelle (en haut du téléphérique)
 {const W=16,H=12,m=CITA=makeMap('cita',W,H,2160,0,'town'),g=m.group,T=grid(W,H,'c');treesRim(T,W,H,(x,z)=>z===H-1&&x>=7&&x<=8);
  rect(T,1,1,14,1,'r');for(let z=2;z<=9;z++){T[z][1]='r';T[z][14]='r'}rect(T,2,8,4,10,'.');rect(T,11,8,13,10,'.');terrain(m,T);
  for(let k=0;k<12;k++)box(g,1,.9,1,m.ox+2+k,.45,m.oz+.4,'#b8ac98',{ol:.02,tex:'stone',rx:1,ry:1});
  bigBuilding(g,m,10,2,4,3,'#b8ac98','#5a4a3a',12,'TERRA NOVA','#3a3430','#f6c80f');m.doors['12,4']=souterrainsPorte;
  snail(g,m.ox+5,m.oz+3.4,1.7);solidRect(m,3,2,4,2);m.signs['4,3']=m.signs['5,3']="L'Escargot géant de la Citadelle. Il regarde la Meuse depuis cent ans. Il en a vu, des choses.";
  for(let k=0;k<6;k++){const x=m.ox-8+k*5,h=1+(k*13)%4;box(g,2.4,h,2.4,x,-2+h/2,m.oz+16,'#8a8070',{ol:.02})}
  [[3,6],[12,6]].forEach(([x,z])=>lamp(g,m,x,z));
  for(let x=7;x<=8;x++)m.steps[x+','+(H-1)]=()=>goMap(NAMU,6,19,'down');arrows(m,[[7,H-1],[8,H-1]],'down');
  NPC.snowC=npc(m,'snow',8,6,'down',snowCitadelle);
  m.hook=(x,z)=>{const f=F();if(!f.cita&&z<=8)return snowCitadelle;return null}}
 // les souterrains de la Compagnie Grognon
 {const X=2200,m=SOUT=room('sout',13,15,X,'D','#3a3430',()=>goMap(CITA,12,5,'down'));m.song='keto';
  for(const z of[3,7,11])for(const x of[1.3,11.7])glowAt(m.group,X+x,1.6,z,'#ffb84a',1.2);
  // trois herses (énigme des dates), rangée z=9
  m.herses=[];const D=SOUT_DATES;for(let k=0;k<3;k++){const x=3+k*3,o=new THREE.Group();o.position.set(X+x,0,9);m.group.add(o);
   for(let i=-1;i<=1;i++)box(o,.08,1.8,.08,i*.3,.9,0,'#3a3a40',{ol:false});box(o,1,.08,.08,0,1.5,0,'#3a3a40',{ol:false});box(o,1,.08,.08,0,.6,0,'#3a3a40',{ol:false});
   plane(o,.9,.3,0,2.05,.06,labelTex(D[k],'#1a1414','#f6c80f',256,96,60));setSolid(m,x,9);m.signs[x+',9']=()=>herse(k);m.herses.push({o,x})}
  for(let x=1;x<=11;x++)if(![3,6,9].includes(x))setSolid(m,x,9);for(let x=1;x<=11;x++)if(x%3)box(m.group,1,1.8,.5,X+x,.9,9,'#5a524a',{ol:.02,tex:'stone',rx:1,ry:1});
  sg(m,6,12,"Gravé dans la pierre : « LES HERSES S'OUVRENT DE LA PLUS ANCIENNE À LA PLUS RÉCENTE. L'HISTOIRE D'ABORD. »",false);
  // les veines d'Éclat et les Lumons forcés de creuser
  for(const[x,z]of[[2,3],[10,4],[2,6],[10,7]]){const c=add(m.group,new THREE.OctahedronGeometry(.35),'#c8a0ff',X+x,.6,z,{emi:'#a04ae8',ol:.02});glowAt(m.group,X+x,.8,z,'#c8a0ff',1);setSolid(m,x,z);
   m.signs[x+','+z]="Une veine d'Éclat brut, mauve et froide. Autour, des traces de pioche… et des traces de petites pattes.";}
  const gd1=npc(m,'clerk',4,12,'right',async()=>F().gardeS1?say('Garde Bertrand',"Je suis guide, moi. Pas garde. On m'a filé un Lumon et une matraque. …Je démissionne."):trainerSpot(m.trainers[0],1));
  m.trainers.push({c:gd1,range:3,flag:'gardeS1',name:'Garde Bertrand',key:'clerk',smart:.5,mons:()=>[mkMon('citadescar',36),mkMon('cokelin',36)],
   intro:"Halte ! Zone de travaux ! …Oh et puis zut, le patron a dit « personne ». En garde !",win:"Bon. J'ai rien vu. J'ai jamais rien vu, d'ailleurs.",reward:['supersirop',2]});
  NPC.grognon=npc(m,'grognon',6,2,'down',grognonScene);
  m.hook=(x,z)=>{const f=F();if(f.herseOK&&!f.ch6done&&z<=6)return grognonScene;return null}}
}
