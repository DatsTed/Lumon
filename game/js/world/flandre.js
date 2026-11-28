/* ---- Chapitres 8, 9 et 10 : Route 8, Gandoux, Route 9, Côte du Nord, la Ligue d'Ardenval ----
   Route 8 « Les polders » : la sortie ouest de Bruxellia (après le chapitre 7), le canal, un moulin, Alex et l'invitation au Gala.
   Gandoux : Château des Comtes (arène type Spectre, Comtesse Mathilde), cathédrale Saint-Bavon (l'Agneau mystique et son panneau
   volé), le canal et ses ponts, Gravenholding (le Gala de la Ligue, le coffre du Président).
   Route 9 « Les dunes » puis Côte du Nord : la mer, la plage, la digue, l'estacade, le cargo « Northern Star », l'arène des
   Éoliennes (type Électrik, Jef), les pêcheurs de crevettes à cheval, Captain et son port.
   Ligue d'Ardenval (Bruxellia, chapitre 10) : quatre membres du Conseil, des grilles qui s'ouvrent une à une, le Champion. */
let ROUTE8=null,GAND=null,CENTREG=null,GYMG=null,GALA=null,ROUTE9=null,COTE=null,CENTREC=null,GYMC=null,NAVIRE=null,LIGUE=null;
function moulin(g,X,Z,s=1){add(g,new THREE.CylinderGeometry(.7*s,1*s,2.6*s,8),'#e8dcc8',X,1.3*s,Z,{ol:.03});const c=add(g,new THREE.ConeGeometry(.95*s,.9*s,8),'#8a3a2a',X,3*s,Z,{ol:.03});
 const rot=new THREE.Group();rot.position.set(X,2.6*s,Z+.85*s);g.add(rot);for(let k=0;k<4;k++){const p=new THREE.Group();p.rotation.z=k*PI/2;rot.add(p);box(p,.22*s,1.6*s,.04,0,.85*s,0,'#f4f0e8',{ol:.015})}
 return t=>rot.rotation.z=t*.9}
function eolienne(g,X,Z,h=7,s=1){add(g,new THREE.CylinderGeometry(.12,.22,h,8),'#f4f8ff',X,h/2,Z,{ol:.02});box(g,.35,.3,.6,X,h,Z,'#e8eef4',{ol:.02});
 const rot=new THREE.Group();rot.position.set(X,h,Z+.35);g.add(rot);for(let k=0;k<3;k++){const p=new THREE.Group();p.rotation.z=k*PI*2/3;rot.add(p);box(p,.16*s,2.6*s,.05,0,1.3*s,0,'#ffffff',{ol:.015})}
 return t=>rot.rotation.z=t*1.2+X}
function buildFlandre(){
 // ---------- Route 8 : les polders
 {const W=36,H=16,m=ROUTE8=makeMap('route8',W,H,2500,0,'route'),g=m.group,T=grid(W,H);treesRim(T,W,H,(x,z)=>(x===W-1&&z>=7&&z<=9)||(x===0&&z>=7&&z<=9));
  rect(T,1,2,W-2,3,'~');rect(T,26,4,33,6,'g');rect(T,14,4,22,6,'g');rect(T,2,11,9,14,'g');rect(T,27,12,33,14,'g');
  pathLine(T,[[35,8],[24,8],[24,11],[12,11],[12,8],[0,8]],3);
  [[3,5],[9,5],[30,11],[20,14],[22,14],[24,14]].forEach(([x,z])=>{if(T[z][x]==='.')T[z][x]='T'});[[11,5],[25,5],[16,13]].forEach(([x,z])=>{if(T[z][x]==='.')T[z][x]='f'});
  terrain(m,T);m.anim.push(moulin(g,m.ox+6,m.oz+5.6,1));setSolid(m,6,5);setSolid(m,6,6);m.signs['6,6']="Un vieux moulin des polders. Ses ailes tournent depuis trois cents ans. Sur la porte : « Hier malen we graan ». « Ici, on moud le grain. »";
  for(let k=0;k<6;k++){const x=m.ox+3+k*6;box(g,.9,.5,2.4,x,-.05,m.oz+2.5,'#5a3a2a',{ol:.02})}
  sg(m,33,6,"Route 8 — « Les polders ». ← Gandoux · Bruxellia →",true);sg(m,2,10,"Gandoux ← La ville des Comtes. Attention : les cyclistes ont toujours la priorité. Toujours.",true);
  item(m,28,13,'eclairlumi',1,'r8i1');item(m,4,13,'supersirop',3,'r8i2');item(m,16,5,'megalumi',2,'r8i3');
  for(let z=7;z<=9;z++){m.steps[(W-1)+','+z]=()=>goMap(BRUX,1,13,'right');m.steps['0,'+z]=()=>goMap(GAND,30,13,'left')}
  arrows(m,[[W-1,7],[W-1,8],[W-1,9]],'right');arrows(m,[[0,7],[0,8],[0,9]],'left');
  m.grassRate=.14;m.wildAt=z=>{const n=ENV.night;return[['moulivent',40,42,n?5:25],['canardin',40,42,20],['echassor',40,42,n?0:10],['gravenfant',40,42,n?25:0],['pigeolet',40,41,n?0:15],['gaufrelin',40,41,10]].filter(e=>e[3]>0)};
  const t1=npc(m,'scout',18,13,'up',async()=>F().lotte?say('Cycliste Lotte',"Quarante kilomètres par jour. Avec le vent de face. Dans les deux sens. C'est ça, la Flandre."):trainerSpot(m.trainers[0],1));
  m.trainers.push({c:t1,range:2,flag:'lotte',name:'Cycliste Lotte',key:'scout',smart:.5,mons:()=>[mkMon('moulivent',42),mkMon('echassor',42)],
   intro:"Hé ! Tu marches sur la piste cyclable ! …Bon, il n'y a pas de piste. Mais si. Combat !",win:"Je dois retourner m'entraîner. Contre le vent.",reward:['eclairlumi',1]});
  const t2=npc(m,'fisher',30,6,'down',async()=>F().wouter?say('Fermier Wouter',"Mes vaches regardent passer les trains. Moi je regarde passer les dresseurs. C'est moins rapide, mais plus drôle."):trainerSpot(m.trainers[1],1));
  m.trainers.push({c:t2,range:2,flag:'wouter',name:'Fermier Wouter',key:'fisher',smart:.45,mons:()=>[mkMon('canardin',42),mkMon('dunelle',41)],
   intro:"Goeiedag ! Tu viens de Bruxellia ? Ici, on parle peu et on combat bien. Vas-y !",win:"Allez, salut. Et ferme bien la barrière du champ.",reward:['supersirop',2]});
  m.hook=(x,z)=>{const f=F();if(!f.r8)return r8Entree;return null}}
 // ---------- Gandoux
 {const W=32,H=26,m=GAND=makeMap('gand',W,H,2560,0,'town'),g=m.group,T=grid(W,H);treesRim(T,W,H,(x,z)=>(x===W-1&&z>=12&&z<=14)||(x===0&&z>=12&&z<=14));
  rect(T,14,1,15,24,'~');rect(T,0,12,W-1,14,'c');rect(T,14,20,15,21,'#');rect(T,3,7,12,11,'c');rect(T,17,7,28,11,'c');rect(T,17,15,28,19,'c');rect(T,3,15,12,19,'c');
  rect(T,16,6,26,6,'c');rect(T,5,6,9,6,'c');
  [[1,2],[30,2],[1,22],[30,23],[12,23],[28,22]].forEach(([x,z])=>T[z][x]='T');terrain(m,T);
  // le pont principal sur le canal (z 12-14) et le petit pont (z 20-21)
  for(const[z0,z1]of[[12,14],[20,21]]){const Z=m.oz+(z0+z1)/2;box(g,2.4,.16,z1-z0+1.2,m.ox+14.5,.04,Z,'#9a8a78',{ol:.02});for(const s of[-1.1,1.1])box(g,.12,.45,z1-z0+1.2,m.ox+14.5,.3,Z+0,'#5a4a3a',{ol:false})}
  for(const z of[4,9,17,23])box(g,.7,.35,1.8,m.ox+14.5,-.1,m.oz+z,['#6a3a2a','#2a5a7a'][z%2],{ol:.02});
  // le Château des Comtes (arène)
  {bigBuilding(g,m,3,1,9,5,'#7a7a82','#3a3a42',7,'CHÂTEAU DES COMTES','#2a2a30','#c9a14a');for(let k=0;k<10;k++)box(g,.45,.45,.45,m.ox+3+k*.9,2.75,m.oz+5.4,'#7a7a82',{ol:.02});
   for(const x of[3,11]){add(g,new THREE.CylinderGeometry(.9,.9,3.6,10),'#6a6a72',m.ox+x,1.8,m.oz+5,{ol:.03});add(g,new THREE.ConeGeometry(1,1.2,10),'#3a3a42',m.ox+x,4.2,m.oz+5,{ol:.03})}}
  m.doors['7,5']=()=>goMap(GYMG,5,13,'up');
  // la cathédrale Saint-Bavon (l'Agneau mystique)
  {bigBuilding(g,m,18,1,7,5,'#9a9288','#5a524a',21,'CATHÉDRALE SAINT-BAVON','#3a3430','#f6c80f');box(g,2,6,2,m.ox+24,3,m.oz+2.5,'#8a8278',{ol:.03,tex:'stone',rx:1.5,ry:4})}
  m.doors['21,5']=cathedrale;
  belfry(g,m,27,8);
  // Gravenholding (le Gala de la Ligue)
  {const b=bigBuilding(g,m,3,20,7,4,'#2a2a30','#c9a14a',6,'GRAVENHOLDING','#1a1a1e','#c9a14a');for(const x of[-2.6,2.6])box(g,.14,2,.14,b.cx+x,1.1,b.fz+.1,'#c9a14a',{emi:'#8a6a20',ol:false})}
  m.doors['6,23']=galaPorte;
  bigBuilding(g,m,18,20,5,3,'#fdf6f0','#8a2a2a',20,'MAISON DES LUMONS','#d8232a','#ffffff');m.doors['20,22']=()=>goMap(CENTREG,4,5,'up');
  house(g,m,25,20,3,3,'#c87a4a','#5a2a1a',26);m.doors['26,22']=async()=>say('',"Une maison à pignons en escalier, toute étroite. Sur la sonnette : « Familie Peeters — pas de publicité, pas de Lumons qui aboient ».");
  house(g,m,9,16,3,3,'#e8c87a','#5a3a2a',10);m.doors['10,18']=async()=>say('Friterie « Het Frietje »',"Ici, on dit « frieten » ! Avec de la mayo, du ketchup, de la sauce andalouse, de la sauce samouraï, de la sauce américaine… Tu veux du choix ? On a du choix.");
  [[3,12],[28,12],[16,7],[12,9],[18,17],[12,17]].forEach(([x,z])=>lamp(g,m,x,z));
  sg(m,29,15,"Gandoux — « La ville des Comtes ». Château · Cathédrale Saint-Bavon · Canal · Maison des Lumons. ← Route 9 : la Côte du Nord",true);
  for(let z=12;z<=14;z++){m.steps[(W-1)+','+z]=()=>goMap(ROUTE8,1,8,'right');m.steps['0,'+z]=gandOuest}
  arrows(m,[[W-1,12],[W-1,13],[W-1,14]],'right');arrows(m,[[0,12],[0,13],[0,14]],'left');
  wand(npc(m,'boy',22,9,'down',async()=>say('Guide Pieter',F().ch8done?"Le panneau des Juges intègres, retrouvé ? Après cent ans ? Je vais devoir réécrire toute ma visite guidée. Avec plaisir !":"Bienvenue à Gandoux ! Ici, le Château des Comtes, là, la cathédrale et son Agneau mystique. Il lui manque un panneau, volé il y a cent ans. On ne l'a jamais retrouvé. Mystère !")));
  wand(npc(m,'kid',8,13,'right',async()=>say('Petite Fien',"Tu savais qu'on peut traverser Gandoux en bateau ? Moi, je préfère sur le dos d'un Canardin. Mais il veut jamais.")));
  npc(m,'granny',24,17,'left',async()=>say('Mevrouw Godelieve',F().ch8done?"Le Président de la Ligue ? Je l'ai toujours trouvé trop poli. Les gens trop polis cachent toujours quelque chose. Comme mon beau-frère.":"Gravenholding a racheté la moitié des maisons du canal. Ils disent qu'ils vont « rénover ». Moi je dis qu'ils vont « remplacer ». Tu sens la différence ?"));
  m.hook=(x,z)=>{const f=F();if(!f.gand)return gandArrivee;return null}}
 CENTREG=centreRoom('centre_g',2620,()=>goMap(GAND,20,23,'down'),'Infirmière Ann','gand');npc(CENTREG,'clerk',1,4,'right',shopMenu);
 // l'arène du Château des Comtes (type Spectre)
 {const X=2640,m=GYMG=room('gym_g',11,15,X,'K','#4a4a52',()=>goMap(GAND,7,6,'down'));m.song='gymb';
  plane(m.group,4.4,.7,X+5,2.2,.46,labelTex('ARÈNE · TYPE SPECTRE','#2a2a30','#7fe8ff',768,128,52));
  for(const x of[2,8])for(const z of[4,8,11]){add(m.group,new THREE.CylinderGeometry(.08,.12,1.2,6),'#c9a14a',X+x,.6,z,{ol:false});glowAt(m.group,X+x,1.4,z,'#7fe8ff',1.2)}
  for(let k=0;k<3;k++){box(m.group,1,1.4,.1,X+2+k*3,1.5,.5,'#5a4a3a',{ol:.02});box(m.group,.8,1.2,.11,X+2+k*3,1.5,.5,['#3a2a4a','#2a3a4a','#4a2a2a'][k],{ol:false})}
  const pg=npc(m,'boy',5,8,'down',async()=>F().pageArno?say('Page Arno',"La Comtesse dit que les fantômes du château sont gentils. Moi, je dors avec la lumière allumée. Juste au cas où."):trainerSpot(m.trainers[0],1));
  m.trainers.push({c:pg,range:3,flag:'pageArno',name:'Page Arno',key:'boy',smart:.5,mons:()=>[mkMon('gravenfant',44),mkMon('smogule',44)],
   intro:"Halte ! Nul n'approche la Comtesse sans affronter son page ! …C'est moi. Le page.",win:"Bouh… euh, je veux dire : bravo.",reward:['supersirop',2]});
  NPC.comtesse=npc(m,'comtesse',5,2,'down',comtesseTalk)}
 // Gravenholding : la salle du Gala, les tableaux, le coffre
 {const X=2670,m=GALA=room('gala',13,13,X,'W','#2a2a30',()=>goMap(GAND,6,24,'down'));m.song='lift';
  box(m.group,4,.9,.8,X+6,.45,3,'#c9a14a',{ol:.03});for(const x of[5,6,7])setSolid(m,x,3);plane(m.group,4.4,.7,X+6,2.4,.46,labelTex('GALA DE LA LIGUE','#1a1a1e','#c9a14a',768,128,56));
  for(const[x,z]of[[2,6],[10,6],[3,9],[9,9]]){add(m.group,new THREE.CylinderGeometry(.45,.45,.75,12),'#f4f0e8',X+x,.4,z,{ol:.02});setSolid(m,x,z)}
  m.tableaux=[];for(const[k,x]of[[0,1],[1,4],[2,8],[3,11]]){box(m.group,1.2,1,.08,X+x,1.6,.5,'#c9a14a',{ol:.02});box(m.group,1,.8,.09,X+x,1.6,.5,['#3a5a3a','#5a3a3a','#3a3a5a','#5a5a3a'][k],{ol:false});m.signs[x+',0']=()=>tableau(k)}
  NPC.president=npc(m,'president',6,2,'down',presidentGala);for(const x of[5,6,7])m.signs[x+',3']=presidentGala;
  const bg=npc(m,'brutus',11,4,'left',async()=>F().brutus?say('Brutus, garde du corps',"…"):say('Brutus, garde du corps',"Circulez. Le Président ne signe pas d'autographes."));NPC.brutus=bg;
  wand(npc(m,'alias',3,7,'right',async()=>say('Alias, avocat',"Toi ici ? Moi, je suis invité. Je suis toujours invité. Les avocats sont comme les mouettes : là où il y a à manger.")));
  m.hook=(x,z)=>{const f=F();if(!f.galaVu)return galaScene;return null}}
 // ---------- Route 9 : les dunes
 {const W=36,H=16,m=ROUTE9=makeMap('route9',W,H,2720,0,'route'),g=m.group,T=grid(W,H);treesRim(T,W,H,(x,z)=>(x===W-1&&z>=7&&z<=9)||(x===0&&z>=7&&z<=9));
  pathLine(T,[[35,8],[26,8],[26,5],[14,5],[14,10],[0,10],[0,8]],3);rect(T,0,7,2,11,'#');
  rect(T,28,10,33,13,'g');rect(T,16,7,24,12,'g');rect(T,3,2,11,6,'g');rect(T,5,12,12,14,'g');
  [[30,3],[20,2],[8,8],[34,13]].forEach(([x,z])=>{if(T[z][x]==='.')T[z][x]='T'});terrain(m,T);
  for(let k=0;k<9;k++){const x=m.ox+2+k*4,z=m.oz+((k*7)%3===0?1:14.5);add(g,new THREE.ConeGeometry(1.6,1.1,10),'#e8d4a0',x,.4,z,{ol:.02})}
  for(let k=0;k<4;k++)m.anim.push(eolienne(g,m.ox+4+k*9,m.oz-5,8));
  sg(m,33,6,"Route 9 — « Les dunes ». ← Côte du Nord · Gandoux →",true);
  item(m,30,12,'nuitlumi',2,'r9i1');item(m,6,3,'supersirop',3,'r9i2');item(m,20,11,'eclairlumi',2,'r9i3');
  for(let z=7;z<=9;z++){m.steps[(W-1)+','+z]=()=>goMap(GAND,1,13,'right');m.steps['0,'+z]=()=>goMap(COTE,32,13,'left')}
  arrows(m,[[W-1,7],[W-1,8],[W-1,9]],'right');arrows(m,[[0,7],[0,8],[0,9]],'left');
  m.grassRate=.15;m.wildAt=z=>{const n=ENV.night;return[['dunelle',44,46,20],['mouettor',44,46,n?5:25],['crevetin',44,45,15],['eolys',45,46,n?5:10],['canardin',44,45,10],['fagnelin',45,46,n?15:0]].filter(e=>e[3]>0)};
  const t1=npc(m,'boy',20,6,'down',async()=>F().kite?say('Kitesurfeur Bram',"Le vent, c'est gratuit. Le matériel, par contre…"):trainerSpot(m.trainers[0],1));
  m.trainers.push({c:t1,range:3,flag:'kite',name:'Kitesurfeur Bram',key:'boy',smart:.5,mons:()=>[mkMon('mouettor',46),mkMon('eolys',46)],
   intro:"Le vent est parfait ! Pour voler. Et pour te battre. Allez !",win:"Le vent a tourné. Pour moi, en tout cas.",reward:['eclairlumi',2]});
  const t2=npc(m,'granny',8,9,'right',async()=>F().mamieDune?say('Mamie Lutgarde',"Je ramasse les coquillages depuis soixante ans. Ils sont plus petits qu'avant. Ou c'est moi qui suis plus grande."):trainerSpot(m.trainers[1],1));
  m.trainers.push({c:t2,range:3,flag:'mamieDune',name:'Mamie Lutgarde',key:'granny',smart:.55,mons:()=>[mkMon('dunelle',46),mkMon('crevettor',47)],
   intro:"Hé, jeune homme ! Tu crois que les mamies ne combattent pas ? Ma Crevettor va te pincer les fesses !",win:"Pas mal… Tu viendras manger des tomates-crevettes, un jour.",reward:['supersirop',3]});
  m.hook=(x,z)=>{const f=F();if(!f.r9)return r9Entree;return null}}
 // ---------- Côte du Nord
 {const W=34,H=24,m=COTE=makeMap('cote',W,H,2780,0,'town'),g=m.group,T=grid(W,H);treesRim(T,W,H,(x,z)=>x===W-1&&z>=12&&z<=14);
  rect(T,0,0,W-1,5,'~');rect(T,1,6,W-2,8,'#');rect(T,0,9,W-1,10,'c');rect(T,0,12,W-2,14,'c');rect(T,12,15,22,19,'c');rect(T,26,1,27,8,'#');
  [[1,22],[32,22],[1,17],[31,18]].forEach(([x,z])=>T[z][x]='T');terrain(m,T);
  // l'estacade (en bois, au-dessus de l'eau) et le cargo « Northern Star »
  {box(g,2.2,.16,8.2,m.ox+26.5,.05,m.oz+4.5,'#8a6a4a',{ol:.02});for(let z=1;z<=8;z+=2)for(const s of[-1,1])box(g,.14,.9,.14,m.ox+26.5+s*1.05,-.2,m.oz+z,'#5a4a3a',{ol:false});
   const sh=new THREE.Group();sh.position.set(m.ox+30.5,0,m.oz+2.5);g.add(sh);box(sh,3,1.4,7,0,.4,0,'#2a3a4a',{ol:.03});box(sh,2.6,.2,6.6,0,1.15,0,'#8a7a6a',{ol:.02});box(sh,1.6,1.4,1.8,0,1.9,2,'#e8e8ee',{ol:.03});
   for(const z of[-1.5,0,-2.8])box(sh,1,.8,1,0,1.6,z,['#d8232a','#3a8adf','#f6c80f'][(z*10|0)%3+0>2?0:Math.abs((z*10|0)%3)],{ol:.02});
   plane(sh,2.6,.4,0,.8,3.52,labelTex('NORTHERN STAR','#2a3a4a','#ffffff',512,96,60));sh.rotation.y=0;m.ship=sh;
   const kb=new THREE.Group();kb.position.set(m.ox+21.5,0,m.oz+3);g.add(kb);box(kb,1.8,.7,4,0,.1,0,'#5a3a22',{ol:.03});add(kb,new THREE.CylinderGeometry(.06,.06,3,6),'#3a2a1a',0,1.8,0,{ol:false});
   box(kb,.04,1.6,1.4,0,2,-.3,'#f4f0e8',{ol:false});box(kb,.5,.35,.04,0,3.1,0,'#1a1a1a',{ol:false})}
  setSolid(m,26,1);setSolid(m,27,1);m.signs['26,1']=m.signs['27,1']=naviPorte;
  for(let k=0;k<5;k++)m.anim.push(eolienne(g,m.ox+3+k*5,m.oz-6,9));
  // arène des Éoliennes, Maison des Lumons, baraque à crevettes
  bigBuilding(g,m,4,15,6,4,'#e8f4ff','#3a8adf',7,'ARÈNE DES ÉOLIENNES','#3a8adf','#ffffff');m.doors['7,18']=()=>goMap(GYMC,5,13,'up');
  bigBuilding(g,m,24,15,5,3,'#fdf6f0','#8a2a2a',26,'MAISON DES LUMONS','#d8232a','#ffffff');m.doors['26,17']=()=>goMap(CENTREC,4,5,'up');
  house(g,m,16,19,4,3,'#f4f0e8','#3a8adf',18);m.doors['18,21']=async()=>say('Baraque « Garnaal »',"Tomates-crevettes, croquettes de crevettes, crevettes tout court. Les crevettes viennent des pêcheurs à cheval. Les chevaux, eux, viennent d'Ostende.");
  for(let x=2;x<=30;x+=4)box(g,.5,.9,.5,m.ox+x,.45,m.oz+10.6,'#e8e8ee',{ol:.02});
  [[4,9],[12,9],[20,9],[30,9],[12,15],[22,15]].forEach(([x,z])=>lamp(g,m,x,z));
  sg(m,31,11,"Côte du Nord — « La digue, la mer, le vent ». Arène des Éoliennes · Maison des Lumons · Estacade. Ne nourrissez pas les mouettes.",true);
  for(let z=12;z<=14;z++)m.steps[(W-1)+','+z]=()=>goMap(ROUTE9,1,8,'right');arrows(m,[[W-1,12],[W-1,13],[W-1,14]],'right');
  NPC.rik=npc(m,'fisher',10,7,'down',crevetteJeuTalk);
  NPC.capCote=npc(m,'captain',26,10,'up',captainCote);
  wand(npc(m,'kid',18,13,'down',async()=>say('Petit Lucas',"Une Mouettor m'a volé ma glace ! Avec le cornet ! Et elle m'a regardé dans les yeux en partant !")));
  npc(m,'girl',6,9,'right',async()=>say('Surfeuse Margot',F().badge7?"T'as battu Jef ? Il va bouder trois jours. Puis il va construire une éolienne de plus. Il fait toujours ça.":"Jef, à l'arène, il a monté une éolienne sur son toit pour recharger ses Lumons. Ses Lumons, ils piquent."));
  m.hook=(x,z)=>{const f=F();if(!f.cote)return coteArrivee;return null}}
 CENTREC=centreRoom('centre_c',2840,()=>goMap(COTE,26,18,'down'),'Infirmière Ilse','cote');npc(CENTREC,'clerk',1,4,'right',shopMenu);
 {const X=2860,m=GYMC=room('gym_c',11,15,X,'K','#2a4a6a',()=>goMap(COTE,7,19,'down'));m.song='gymb';
  plane(m.group,4.4,.7,X+5,2.2,.46,labelTex('ARÈNE · TYPE ÉLECTRIK','#2a4a6a','#f6e84a',768,128,50));
  for(const[x,z]of[[2,4],[8,4],[2,10],[8,10]]){m.anim.push(eolienne(m.group,X+x,z,1.4,.3));setSolid(m,x,z)}
  const ts=npc(m,'scout',5,8,'down',async()=>F().saar?say('Technicienne Saar',"Une éolienne tourne à quinze tours par minute. Jef, lui, tourne à trente. Surtout quand il perd."):trainerSpot(m.trainers[0],1));
  m.trainers.push({c:ts,range:3,flag:'saar',name:'Technicienne Saar',key:'scout',smart:.55,mons:()=>[mkMon('eolys',47),mkMon('anguimeuse',47)],
   intro:"Attention, haute tension ! Personne ne passe sans un petit choc !",win:"Court-circuit. Le mien.",reward:['eclairlumi',2]});
  NPC.jef=npc(m,'jef',5,2,'down',jefTalk)}
 // le cargo « Northern Star »
 {const X=2890,m=NAVIRE=room('navire',13,15,X,'W','#3a4a5a',()=>goMap(COTE,26,2,'down'));m.song='keto';
  for(const[x,z]of[[2,3],[3,3],[9,3],[10,3],[2,7],[10,7]]){box(m.group,.9,.9,.9,X+x,.45,z,'#8a6a4a',{ol:.03});setSolid(m,x,z)}
  for(const x of[4,6,8]){const o=new THREE.Group();o.position.set(X+x,0,10);m.group.add(o);for(let i=0;i<5;i++)box(o,.05,1.3,.05,-.4+i*.2,.65,.4,'#9aa3ad',{ol:false});box(o,1,.08,1,0,1.3,0,'#9aa3ad',{ol:false});
   const sp=['eolys','mouettor','crevettor'][(x-4)/2];const mm=monModel(sp);mm.g.scale.setScalar(.42*(MSCALE[sp]||1));o.add(mm.g);setSolid(m,x,10);m.signs[x+',10']=cageNavire}
  sg(m,6,6,"Sur une caisse : « LIVRAISON — LIGUE D'ARDENVAL — À L'ATTENTION DE M. LE PRÉSIDENT — LUMONS TRAITÉS À L'ÉCLAT (ÉQUIPE DU CHAMPION) ».",false);
  const m1=npc(m,'pirate2',3,12,'right',async()=>F().matelot1?say('Matelot Joris',"Je savais pas ce qu'il y avait dans les caisses. Enfin… je me doutais. Un peu."):trainerSpot(m.trainers[0],1));
  m.trainers.push({c:m1,range:3,flag:'matelot1',name:'Matelot Joris',key:'pirate2',smart:.55,mons:()=>[mkMon('mouettor',48),mkMon('crevettor',48)],
   intro:"Des pirates à bord ! Tous à vos postes !",win:"On coule… enfin, pas le bateau. Moi.",reward:['supersirop',2]});
  NPC.visser=npc(m,'visser',6,2,'down',visserScene)}
 // ---------- la Ligue d'Ardenval (Bruxellia)
 {const X=2940,W=11,H=27,m=LIGUE=room('ligue',W,H,X,'K','#1c1c22',()=>goMap(BRUX,24,20,'down'));m.song='gymb';
  m.grilles=[];const Zs=[19,14,9,4];Zs.forEach((z,k)=>{for(let x=1;x<W-1;x++)setSolid(m,x,z);for(let x=1;x<W-1;x++)if(x!==5)box(m.group,1,1.6,.3,X+x,.8,z,'#2a2a34',{ol:.02});
   const gr=new THREE.Group();gr.position.set(X+5,0,z);m.group.add(gr);for(let i=-2;i<=2;i++)box(gr,.06,1.6,.06,i*.2,.8,0,'#c9a14a',{ol:false});m.grilles.push(gr)});
  const SEATS=[[21,'godelieve','#5fae3a'],[16,'ronny','#c9a24a'],[11,'ingrid','#7fe0e8'],[6,'masque','#a04ae8']];
  SEATS.forEach(([z,k,c])=>{box(m.group,1.6,.12,1.6,X+5,.13,z,c,{emi:c,cast:false});glowAt(m.group,X+5,2.2,z,c,1.6)});
  plane(m.group,5,.8,X+5,2.4,.46,labelTex("LIGUE D'ARDENVAL",'#1c1c22','#f6c80f',768,128,56));box(m.group,2.4,.2,1.4,X+5,.15,1.6,'#c9a14a',{emi:'#8a6a20',cast:false});
  NPC.godelieve=npc(m,'godelieve',5,21,'down',()=>conseil(0));NPC.ronny=npc(m,'ronny',5,16,'down',()=>conseil(1));NPC.ingrid=npc(m,'ingrid',5,11,'down',()=>conseil(2));NPC.masque=npc(m,'masque',5,6,'down',()=>conseil(3));
  NPC.champion=npc(m,'president',5,2,'down',championScene);
  npc(m,'nurse',2,24,'right',ligueSoin);for(const z of[18,13,8])m.signs['1,'+z]=ligueFontaine;for(const z of[18,13,8]){add(m.group,new THREE.CylinderGeometry(.3,.35,.6,10),'#7fe8ff',X+1,.3,z,{emi:'#3ef0ff',ol:.02});setSolid(m,1,z)}
  sg(m,9,24,"« Quatre membres du Conseil. Un Champion. Aucune revanche ce jour-là. » Règlement de la Ligue, article premier.",false)}
}
