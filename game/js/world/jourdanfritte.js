function buildJourdanfritte(){
 /* ---- Jourdanfritte ---- */
 {const W=26,H=22,m=JF=makeMap('jf',W,H,880,0,'town'),g=m.group,T=grid(W,H);treesRim(T,W,H,(x,z)=>x===0&&z===11);
  rect(T,6,6,19,15,'c');rect(T,0,11,6,11,'#');rect(T,9,5,9,5,'c');rect(T,15,5,17,5,'c');rect(T,20,12,21,12,'c');rect(T,12,17,13,17,'c');
  [[1,1],[24,1],[24,20],[1,20],[22,15],[5,18]].forEach(([x,z])=>T[z][x]='T');terrain(m,T);
  nightWhiteExt(g,m,8,2,4,3,9);m.doors['9,4']=()=>goMap(NWJ,5,6,'up');
  friterie(g,m,15,4,'SMILE AND EAT');m.signs['15,5']=m.signs['16,5']=smileEat;NPC.jalal=npc(m,'jalal',17,5,'left',smileEat);
  friterie(g,m,12,16,'FRITERIE DE LA PLACE');m.signs['12,17']=m.signs['13,17']=friteJosette;
  bigBuilding(g,m,19,8,5,4,'#fdf6f0','#d8232a',21,'MAISON DES LUMONS','#d8232a','#ffffff');m.doors['21,11']=()=>goMap(CENTREJ,4,5,'up');
  house(g,m,2,2,4,3,'#b9563c','#33363f',3);house(g,m,2,16,4,3,'#efe4c4','#2f6f5a',3);house(g,m,19,16,4,3,'#d9a05b','#5a3a3a',20);fountain(g,m,13,10);
  [[7,7],[18,7],[7,14],[18,14]].forEach(([x,z])=>lamp(g,m,x,z));
  m.doors['3,4']=m.doors['3,18']=m.doors['20,18']=async()=>say('',"C'est fermé. On entend une télé et quelqu'un qui crie « GOAAAL ! ».");
  sg(m,4,12,"Jourdanfritte — « La place où les frites sont reines. » Night White · Smile and Eat · Friterie de la Place",true);
  for(let z=10;z<=12;z++)m.steps['0,'+z]=()=>goMap(ROUTE3,30,9,'left');arrows(m,[[0,10],[0,11],[0,12]],'left');
  wand(npc(m,'miner',11,12,'down',async()=>say('Monsieur Roger',"Ça fait quarante ans que je mange mes frites sur cette place. Le secret ? Toujours manger debout. Les frites, ça se mange debout.")));
  wand(npc(m,'kid',16,13,'left',async()=>say('Petite Inès',"Jalal, du Smile and Eat, il a les plus beaux cheveux du monde. Il dit que c'est grâce à l'huile d'olive.")))}
}
