/* ---- Chapitre 7 : Route 7 (Namuroc -> Bastognac) et Bastognac, la forêt d'hiver ----
   Route 7 « La route des sapins » : de l'autre côté du pont de Jambes, la neige, les sapins, les Pirates de Captain qui ont abordé
   une péniche de Grognon (f.r7), un marcassin pris dans un piège de la Fondation (f.piege), deux dresseurs.
   Bastognac : place du Sapin enneigée, la grande Noix, Maison des Lumons, arène de la garde forestière Hélène (type Plante),
   boutique « Noix & Jambon », et au nord la clôture de la Fondation Ardenne (après la Médaille Sapin).
   Fondation Ardenne : laboratoire (donjon du chapitre) : code du labo, cages, la Directrice et le Prototype zéro (Prismalis). */
let ROUTE7=null,BAST=null,CENTREBA=null,GYMBA=null,FOND=null;
function sapin(g,X,Z,h=2.6){add(g,new THREE.CylinderGeometry(.12,.16,.6,6),'#5a3a22',X,.3,Z,{ol:.02});
 for(let k=0;k<3;k++){add(g,new THREE.ConeGeometry(.9-k*.22,h*.42,8),'#2f5a3a',X,.6+k*h*.24+h*.2,Z,{ol:.02});add(g,new THREE.ConeGeometry(.75-k*.2,.18,8),'#f4f8ff',X,.6+k*h*.24+h*.38,Z,{ol:false})}}
function buildBastognac(){
 // ---------- Route 7
 {const W=22,H=36,m=ROUTE7=makeMap('route7',W,H,2260,0,'route'),g=m.group,T=grid(W,H,'S');treesRim(T,W,H,(x,z)=>(z===0&&x>=9&&x<=11)||(z===H-1&&x>=9&&x<=11));
  pathLine(T,[[10,0],[10,6],[15,6],[15,16],[8,16],[8,26],[10,26],[10,35]],3);
  rect(T,3,3,7,10,'g');rect(T,12,19,17,24,'g');rect(T,2,28,6,33,'g');rect(T,17,8,19,13,'g');
  [[2,13],[3,15],[5,20],[18,3],[19,16],[16,28],[18,31],[13,11],[4,24],[14,33]].forEach(([x,z])=>{if(T[z][x]!=='#')T[z][x]='T'});
  terrain(m,T);for(let k=0;k<14;k++){const x=m.ox-2+((k*7)%25),z=m.oz-3-((k*5)%3);sapin(g,x,z,3+(k%3))}
  // un ruisseau gelé
  for(let x=1;x<=6;x++){box(g,1,.04,1,m.ox+x,.12,m.oz+26,'#cfefff',{cast:false,emi:'#5a8aa0'})}
  sg(m,12,2,"Route 7 — « La route des sapins ». ↑ Namuroc · Bastognac ↓ · Attention : sangliers.",true);sg(m,11,33,"Bastognac ↓ — « Le cœur de l'Ardenne ». (Quelqu'un a ajouté au feutre : « et de la noix ».)",true);
  item(m,5,5,'nuitlumi',2,'r7i1');item(m,18,10,'supersirop',3,'r7i2');item(m,3,31,'megalumi',2,'r7i3');
  for(let x=9;x<=11;x++){m.steps[x+',0']=()=>goMap(NAMU,27,28,'up');m.steps[x+','+(H-1)]=()=>goMap(BAST,15,1,'down')}
  arrows(m,[[9,0],[10,0],[11,0]],'up');arrows(m,[[9,H-1],[10,H-1],[11,H-1]],'down');
  m.grassRate=.15;m.wildAt=z=>{const n=ENV.night;return[['marcassor',35,37,n?15:30],['fagnelin',35,38,n?35:5],['cervolt',36,38,n?5:15],['escargolin',35,36,10],['hannetonne',35,36,n?0:10],['smogule',35,37,n?10:0]].filter(e=>e[3]>0)};
  const t1=npc(m,'miner',13,5,'left',async()=>F().joseph?say('Bûcheron Joseph',"Les sapins, ça repousse. Les forêts, non. Pas quand on les rase pour construire des laboratoires."):trainerSpot(m.trainers[0],1));
  m.trainers.push({c:t1,range:3,flag:'joseph',name:'Bûcheron Joseph',key:'miner',smart:.45,mons:()=>[mkMon('marcassor',37),mkMon('cervolt',38)],
   intro:"Halte ! Tu marches sur mes copeaux ! …Bon, ça va, c'est de la neige. Allez, combat, ça réchauffe !",win:"Fort comme un chêne, le gamin. Enfin, comme un sapin. Un petit sapin.",reward:['supersirop',2]});
  const t2=npc(m,'scout',18,21,'left',async()=>F().ines?say('Garde de la Fondation Inès',"J'ai démissionné ce matin. Ce qu'ils font aux Lumons, là-dedans… Je peux pas. Je peux plus."):trainerSpot(m.trainers[1],1));
  m.trainers.push({c:t2,range:5,flag:'ines',name:'Garde de la Fondation Inès',key:'scout',smart:.55,mons:()=>[mkMon('fagnelin',38),mkMon('sanglardenne',38)],
   intro:"Route privée de la Fondation Ardenne ! Faites demi-tour, s'il vous plaît. …Non ? Alors je dois vous arrêter. C'est mon travail.",win:"…C'est mon travail. Pour l'instant.",reward:['nuitlumi',2]});
  m.hook=(x,z)=>{const f=F();if(!f.r7)return r7Entree;if(!f.piege&&z>=17&&z<=19&&x>=7&&x<=9)return piegeScene;return null}}
 // ---------- Bastognac
 {const W=30,H=26,m=BAST=makeMap('bast',W,H,2320,0,'town'),g=m.group,T=grid(W,H,'S');treesRim(T,W,H,(x,z)=>(z===0&&x>=14&&x<=16)||(x===W-1&&z>=3&&z<=5));
  rect(T,14,0,16,7,'c');rect(T,8,7,22,17,'c');rect(T,4,14,8,16,'c');rect(T,22,3,28,5,'c');rect(T,22,6,24,8,'c');rect(T,18,17,20,20,'c');
  [[1,1],[28,1],[1,24],[28,24],[26,12],[27,18],[3,8],[2,20],[11,22],[24,22]].forEach(([x,z])=>T[z][x]='T');
  terrain(m,T);for(let k=0;k<10;k++)sapin(g,m.ox+2+k*3,m.oz-1.5,3+(k%2));
  // la grande Noix de la place, et le sapin de Noël
  {const X=m.ox+15,Z=m.oz+12;add(g,new THREE.CylinderGeometry(1,1.2,.5,10),'#8a8278',X,.3,Z,{ol:.03});const n=add(g,new THREE.SphereGeometry(.9,12,10),'#a07040',X,1.4,Z,{ol:.03});n.scale.set(1,.85,1.1);
   box(g,.08,1.6,1.9,X,1.4,Z,'#7a5030',{ol:false});solidRect(m,14,11,3,3);for(const k of['14,11','15,11','16,11','14,12','16,12','14,13','15,13','16,13'])m.signs[k]="La Grande Noix de Bastognac. Sur la plaque : « Quand on leur a demandé de se rendre, ils ont répondu en un seul mot. » Les gens d'ici aiment les réponses courtes.";}
  sapin(g,m.ox+10,m.oz+9,4.2);solidRect(m,10,9,1,1);for(let k=0;k<8;k++){const a=k/8*PI*2;box(g,.12,.12,.12,m.ox+10+Math.cos(a)*.6,1.4+k*.25,m.oz+9+Math.sin(a)*.6,k%2?'#d8232a':'#f6c80f',{emi:k%2?'#d8232a':'#f6c80f',ol:false})}
  m.signs['10,9']="Le grand sapin de la place, décoré par les enfants de l'école. Une boule porte un dessin de Laïka. Tu ne sais pas comment c'est possible.";
  // bâtiments
  bigBuilding(g,m,3,10,5,3,'#fdf6f0','#8a2a2a',5,'MAISON DES LUMONS','#d8232a','#ffffff');m.doors['5,12']=()=>goMap(CENTREBA,4,5,'up');
  bigBuilding(g,m,18,13,5,3,'#6a4a32','#2f5a3a',20,'ARÈNE DE BASTOGNAC','#2f5a3a','#f4f8ff');m.doors['20,15']=()=>goMap(GYMBA,5,13,'up');
  house(g,m,9,3,4,3,'#7a5032','#3a2a1e',11);m.doors['11,5']=noixShop;sg(m,13,6,"« Noix & Jambon » — Spécialités d'Ardenne. Horaires : quand Mamie Noisette a envie.",false);
  house(g,m,4,4,3,3,'#8a6040','#3a2a1e',5);m.doors['5,6']=async()=>say('',"Un chalet. Sur la porte : « Ici vit Hélène Noiset, garde forestière. Si je ne suis pas là, je suis à l'arène. Si je ne suis pas à l'arène, je suis dans la forêt. Si je ne suis pas dans la forêt, appelez quelqu'un. »");
  // la clôture de la Fondation Ardenne (nord-est)
  {for(let z=0;z<=9;z++)if(z<3||z>5)box(g,.12,1.6,1,m.ox+28.6,.8,m.oz+z,'#9aa3ad',{ol:false});bigBuilding(g,m,23,0,4,2,'#e8eef4','#5a6a7a',25,'FONDATION ARDENNE','#e8eef4','#3a6a9a');}
  for(let z=3;z<=5;z++)m.steps[(W-1)+','+z]=fondationPorte;arrows(m,[[W-1,3],[W-1,4],[W-1,5]],'right');
  sg(m,26,6,"→ Fondation Ardenne · Centre de recherche sur les Lumons. « Pour un avenir plus lumineux. » Accès réservé — réserve forestière.",true);
  [[8,7],[22,7],[8,17],[22,17],[15,6]].forEach(([x,z])=>lamp(g,m,x,z));
  sg(m,13,2,"Bastognac — « Le cœur de l'Ardenne ». Place du Sapin · Arène · Maison des Lumons · Noix & Jambon",true);
  for(let x=14;x<=16;x++)m.steps[x+',0']=()=>goMap(ROUTE7,10,34,'up');arrows(m,[[14,0],[15,0],[16,0]],'up');
  // habitants
  wand(npc(m,'kid',12,15,'right',async()=>say('Petit Arthur',F().ch7done?"La dame de la Fondation est partie dans une voiture de police ! Et y a des Lumons partout dans la forêt ! Libres ! Comme dans les livres !":"Tu veux faire de la luge ? Non ? Moi non plus, j'ai pas de luge. Mais un jour, j'aurai un Cervolt et il me tirera.")));
  npc(m,'granny',18,9,'down',async()=>say('Mamie Noisette',"Nuts ! …Pardon, c'est la tradition, ici. Quand on ne sait pas quoi répondre, on dit « Nuts ! ». Ça marche pour tout. Les impôts, la météo, les beaux-fils."));
  npc(m,'fisher',6,17,'up',async()=>say('Chasseur Raymond',"Depuis que la Fondation a construit là-bas, les sangliers sont bizarres. Agressifs. Et on trouve des pièges partout. Des pièges qui ne tuent pas. Qui capturent."));
  npc(m,'clerk',21,8,'left',async()=>say('Chercheur inquiet',F().ch7done?"Je vais témoigner. Tout raconter. Le Prototype, les cages, les doses. J'aurais dû le faire avant.":"Je travaille à la Fondation. Ne dites à personne que je vous ai parlé. Le code de la porte du labo change chaque mois. Il est noté… quelque part à l'intérieur. Ils sont très organisés. Et très distraits."));
  m.hook=(x,z)=>{const f=F();if(!f.bast)return bastArrivee;return null}}
 // ---------- intérieurs
 CENTREBA=centreRoom('centre_ba',2380,()=>goMap(BAST,5,13,'down'),'Infirmière Gisèle','bast');npc(CENTREBA,'clerk',1,4,'right',shopMenu);
 {const X=2400,m=GYMBA=room('gym_ba',11,15,X,'W','#6a4a32',()=>goMap(BAST,20,16,'down'));m.song='gymb';
  plane(m.group,4.4,.7,X+5,2.2,.46,labelTex('ARÈNE · TYPE PLANTE','#2f5a3a','#f4f8ff',768,128,52));
  for(const[x,z]of[[2,4],[8,4],[2,8],[8,8],[2,11],[8,11]]){sapin(m.group,X+x,z,2.2);setSolid(m,x,z)}
  NPC.helene=npc(m,'helene',5,2,'down',heleneTalk)}
 // la Fondation Ardenne : le laboratoire
 {const X=2430,m=FOND=room('fond',15,15,X,'c','#e8eef4',()=>goMap(BAST,27,4,'left'));m.song='keto';
  // cloison avec la porte à code (z=8)
  for(let x=1;x<=13;x++)if(x!==7){setSolid(m,x,8);box(m.group,1,2.2,.3,X+x,1.1,8,'#c8d0d8',{ol:.02})}
  const porte=box(m.group,1,2.2,.25,X+7,1.1,8,'#3a6a9a',{emi:'#1a3a5a',ol:.02});m.porte=porte;setSolid(m,7,8);m.signs['7,8']=fondCode;
  box(m.group,.5,.7,.1,X+8,1.2,8.2,'#2b2b30',{ol:false});
  // indices (salle d'entrée, sur la cloison et le bureau)
  box(m.group,2.4,1.2,.1,X+3,1.4,8.2,'#ffffff',{ol:.02});m.signs['2,8']=m.signs['3,8']=m.signs['4,8']="Un tableau blanc couvert de formules. En gros, entouré en rouge : « EXPÉRIENCE N° 14 : RÉUSSIE !!! ». En dessous, plus petit : « les autres : ne plus en parler ».";
  box(m.group,.9,1,.1,X+11,1.4,8.2,'#f6e8c8',{ol:.02});m.signs['11,8']="Un calendrier de l'année. Le mois de juillet est entouré : « 07 — arrivée du Prototype zéro ». Quelqu'un a dessiné un petit cœur à côté. Puis l'a barré.";
  box(m.group,1.2,.8,.6,X+12,.4,11,'#8a8a92',{ol:.02});setSolid(m,12,11);m.signs['12,11']="Un bureau. Un post-it jaune collé sur l'écran : « Code de la porte = n° de l'expérience réussie, puis le mois d'arrivée du Prototype (2 chiffres). NE PAS LAISSER CE POST-IT ICI !!! »";
  const gd=npc(m,'scout',3,11,'right',async()=>F().gardeF?say('Garde Kevin',"Je surveille. Je surveille rien. C'est pareil."):trainerSpot(m.trainers[0],1));
  m.trainers.push({c:gd,range:4,flag:'gardeF',name:'Garde Kevin',key:'scout',smart:.55,mons:()=>[mkMon('sanglardenne',40),mkMon('cervolt',40)],
   intro:"Hé ! Comment vous êtes entré ? Le badge, s'il vous plaît. …Pas de badge ? Pas de chance.",win:"Je vais me faire virer. Tant mieux, en fait.",reward:['supersirop',2]});
  // la salle des cages (au fond)
  for(const x of[2,4,10,12]){const o=new THREE.Group();o.position.set(X+x,0,3);m.group.add(o);for(let i=0;i<5;i++)box(o,.05,1.4,.05,-.4+i*.2,.7,.4,'#9aa3ad',{ol:false});box(o,1,.08,1,0,1.4,0,'#9aa3ad',{ol:false});
   const sp=['marcassor','fagnelin','echassor','anguimeuse'][[2,4,10,12].indexOf(x)];const mm=monModel(sp);mm.g.scale.setScalar(.45*(MSCALE[sp]||1));mm.g.position.set(0,.05,0);o.add(mm.g);setSolid(m,x,3);
   m.signs[x+',3']=cageTalk;}
  {const tube=add(m.group,new THREE.CylinderGeometry(.55,.55,2,14),'#bfefff',X+7,1,2,{ol:.02});tube.material.transparent=true;tube.material.opacity=.35;const pm=monModel('prismalis');pm.g.scale.setScalar(.55);pm.g.position.set(X+7,.2,2);m.group.add(pm.g);m.proto=pm;
   glowAt(m.group,X+7,1.2,2,'#7fe8ff',2);setSolid(m,7,2);m.signs['7,2']=async()=>say('',F().ch7done?"Le tube est vide. Le Prototype zéro est avec toi, maintenant.":"Dans le tube de verre, un petit Lumon de cristal te regarde. Il pose sa patte contre la vitre. Pile en face de ta main.");}
  NPC.directrice=npc(m,'directrice',7,4,'down',directriceScene);
  m.hook=(x,z)=>{const f=F();if(f.fondCode&&!f.ch7done&&z<=6)return directriceScene;return null}}
}
