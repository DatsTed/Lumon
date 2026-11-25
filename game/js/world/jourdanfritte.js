function buildJourdanfritte(){
 /* ---- Jourdanfritte ---- */
 {const W=26,H=22,m=JF=makeMap('jf',W,H,880,0,'town'),g=m.group,T=grid(W,H);treesRim(T,W,H,(x,z)=>x===0&&z===11);
  rect(T,6,6,19,15,'c');rect(T,0,11,6,11,'#');rect(T,9,5,9,5,'c');rect(T,15,5,17,5,'c');rect(T,20,12,21,12,'c');rect(T,12,17,13,17,'c');rect(T,14,16,14,19,'c');rect(T,14,19,18,19,'c');
  [[1,1],[24,1],[24,20],[1,20],[22,15],[5,18]].forEach(([x,z])=>T[z][x]='T');terrain(m,T);
  nightWhiteExt(g,m,8,2,4,3,9);m.doors['9,4']=()=>goMap(NWJ,5,6,'up');
    friterie(g,m,12,16,'FRITERIE DE LA PLACE');m.signs['12,17']=m.signs['13,17']=friteJosette;
  bigBuilding(g,m,19,8,5,4,'#fdf6f0','#d8232a',21,'MAISON DES LUMONS','#d8232a','#ffffff');m.doors['21,11']=()=>goMap(CENTREJ,4,5,'up');
  house(g,m,2,2,4,3,'#b9563c','#33363f',3);house(g,m,2,16,4,3,'#efe4c4','#2f6f5a',3);house(g,m,19,16,4,3,'#d9a05b','#5a3a3a',20);fountain(g,m,13,10);
  [[7,7],[18,7],[7,14],[18,14]].forEach(([x,z])=>lamp(g,m,x,z));
  m.doors['3,18']=m.doors['20,18']=async()=>say('',"C'est fermé. On entend une télé et quelqu'un qui crie « GOAAAL ! ».");
  // pharmacie (ancienne maison du nord-ouest)
  {const fz=m.oz+4.45;plane(g,1.9,.42,m.ox+3.5,2.05,fz+.12,labelTex('PHARMACIE','#ffffff','#1f9a4a',768,128,64));for(const[w2,h2]of[[.42,.14],[.14,.42]])box(g,w2,h2,.06,m.ox+4.6,1.15,fz+.08,'#2fd06a',{emi:'#1fbf5a',cast:false});m.doors['3,4']=talkPharma}
  // Smile and Eat : grand fast-food chic (noir et or), collé à la friterie de la place
  {const b=bigBuilding(g,m,15,16,4,3,'#1c1a22','#c9a14a',16,'SMILE AND EAT','#1c1a22','#ffd84a');for(const x of[-1.75,1.75])box(g,.16,2.3,.16,b.cx+x,1.25,b.fz+.1,'#d8b45a',{emi:'#7a5a10',ol:.02});
   box(g,3.9,.12,.5,b.cx,2.55,b.fz+.2,'#d8b45a',{emi:'#7a5a10',ol:.02});for(let k=0;k<5;k++)box(g,.7,.06,.45,b.cx-1.5+k*.75,2.38,b.fz+.35,k%2?'#1c1a22':'#d8b45a',{cast:false}).rotation.x=.45;
   m.doors['16,18']=()=>goMap(SMILE,5,6,'up')}
  sg(m,4,12,"Jourdanfritte — « La place où les frites sont reines. » Night White · Smile and Eat · Friterie de la Place",true);
  for(let z=10;z<=12;z++)m.steps['0,'+z]=()=>goMap(ROUTE3,30,9,'left');arrows(m,[[0,10],[0,11],[0,12]],'left');
  wand(npc(m,'miner',11,12,'down',async()=>{if(await huile('roger'))return;await say('Monsieur Roger',"Ça fait quarante ans que je mange mes frites sur cette place. Le secret ? Toujours manger debout. Les frites, ça se mange debout.")}));
  wand(npc(m,'kid',16,13,'left',async()=>{if(await huile('ines'))return;await say('Petite Inès',"Jalal, du Smile and Eat, il a les plus beaux cheveux du monde. Il dit que c'est grâce à l'huile d'olive.")}));
  m.signs['12,17']=m.signs['13,17']=friteJF}
 // intérieur du Smile and Eat
 {const X=1200,m=SMILE=room('smile',11,8,X,'K','#1c1a22',()=>goMap(JF,16,19,'down')),g=m.group;m.song='hope';
  box(g,5,.95,.8,X+5,.55,2,'#1c1a22',{ol:.03});box(g,5.1,.08,.9,X+5,1.05,2,'#d8b45a',{emi:'#5a4010',cast:false});solidRect(m,3,2,5,1);
  plane(g,4.2,.7,X+5,2.2,.46,labelTex('SMILE AND EAT · DEPUIS 2009','#1c1a22','#ffd84a',1024,160,54));
  for(const[tx,tz]of[[2,4],[8,4],[2,6],[8,6]]){tp(g,CYL,'#f4efe6',X+tx,.55,tz,.42,.06,.42);tp(g,CYL,'#d8b45a',X+tx,.28,tz,.06,.5,.06);setSolid(m,tx,tz)}
  for(let k=0;k<4;k++)box(g,.5,.5,.05,X+2.2+k*2,1.9,.47,['#e8402a','#ffd23a','#f6c80f','#ff8a2c'][k],{emi:'#5a3a10',cast:false});
  NPC.jalal=npc(m,'jalal',5,1,'down',smileEat2);NPC.dannyJ=npc(m,'danny',3,5,'right',talkDannyJF)}
}
