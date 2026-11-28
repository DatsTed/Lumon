function buildBruxellia(){
 /* ---- Bruxellia ---- */
 {const W=30,H=26,m=BRUX=makeMap('brux',W,H,760,0,'town'),g=m.group,T=grid(W,H);treesRim(T,W,H,(x,z)=>(z===H-1&&x>=13&&x<=15)||(x===W-1&&z===12)||(z===0&&(x===8||x===9))||(x===0&&z>=13&&z<=14));rect(T,8,0,9,6,'#');
  rect(T,13,14,15,25,'#');rect(T,9,7,21,13,'c');rect(T,5,13,8,13,'c');rect(T,21,12,29,12,'#');rect(T,6,20,24,20,'#');rect(T,9,6,21,6,'c');
  [[2,7],[27,7],[2,23],[27,23],[10,22],[19,22],[1,14],[28,16]].forEach(([x,z])=>T[z][x]='T');[[11,15],[17,15],[10,17],[18,17],[3,14],[26,14]].forEach(([x,z])=>{if(T[z][x]==='.')T[z][x]='f'});rect(T,0,13,4,14,'#');
  terrain(m,T);
  bigBuilding(g,m,11,2,9,4,'#e8d8b0','#5a4a3a',15,"HÔTEL DE VILLE",'#5a4a3a','#f6c80f');m.doors['15,5']=async()=>say('',"L'Hôtel de ville de Bruxellia. Les portes dorées sont fermées. Un garde dort debout.");
  bigBuilding(g,m,3,9,5,4,'#fdf6f0','#d8232a',5,'MAISON DES LUMONS','#d8232a','#ffffff');m.doors['5,12']=()=>goMap(CENTREB,4,5,'up');
  nightWhiteExt(g,m,22,9,4,3,23);m.doors['23,11']=()=>goMap(NWB,5,6,'up');
  bigBuilding(g,m,3,16,6,4,'#c9c4b8','#6a6a72',6,'PALAIS DE JUSTICE','#3a3a42','#ffffff');m.doors['6,19']=async()=>say('',"Le Palais de justice. Immense. Il paraît que c'est le plus grand bâtiment d'Ardenval. Alias y a son bureau.");
  bigBuilding(g,m,21,16,6,4,'#1c1c22','#f6c80f',24,"LIGUE D'ARDENVAL",'#f6c80f','#1c1c22');m.doors['24,19']=ligueEntree;
  fountain(g,m,15,10);m.signs['15,10']="La fontaine du Manneken-Lumon. Un petit Moulinet en bronze qui fait… ce qu'il fait depuis quatre cents ans. C'est ça, Bruxellia.";
  [[9,8],[21,8],[9,13],[12,21],[18,21]].forEach(([x,z])=>lamp(g,m,x,z));house(g,m,2,2,4,3,'#d9a05b','#5a3a3a',3);house(g,m,24,2,4,3,'#efe4c4','#33363f',25);
  m.doors['3,4']=async()=>say('',"Fermé. Une plaque : « Chocolatier Pierre — de retour dans dix minutes. » La plaque est poussiéreuse.");m.doors['25,4']=async()=>say('',"Une odeur de gaufre de Bruxelles. Personne ne répond.");
  sg(m,16,23,"Bruxellia, capitale d'Ardenval. « Ici, même les pigeons ont un accent. »",true);sg(m,26,13,"→ Route 3 : vers Jourdanfritte et le Garage Wagner.");
  for(let x=13;x<=15;x++)m.steps[x+',25']=()=>goMap(ROUTE2,11,1,'down');arrows(m,[[13,25],[14,25],[15,25]],'down');m.steps['29,12']=()=>goMap(ROUTE3,1,9,'right');for(const z of[13,14])m.steps['0,'+z]=bruxOuest;arrows(m,[[0,13],[0,14]],'left');for(const x of[8,9])m.steps[x+',0']=()=>F().ch4?goMap(ROUTE4,11,38,'up'):say('',"Une barrière : « Route 4 — fermée par la police de Bruxellia (opération en cours). »");arrows(m,[[8,0],[9,0]],'up');
  wand(npc(m,'granny',12,10,'down',async()=>say('Bonne-maman Ghislaine',"De mon temps, Bruxellia sentait la gaufre et le chocolat. Maintenant, la nuit, ça sent la fumée des concerts de Snow…")));
  wand(npc(m,'kid',18,12,'left',async()=>say('Petit Mehdi',"T'as vu la Ligue ? Un jour, j'y entrerai avec huit médailles ! Bon, d'abord faut que j'aie un Lumon…")));
  NPC.alias=npc(m,'alias',8,20,'right',aliasTalk);NPC.cop=npc(m,'agent',10,21,'up',talkCop);
  m.hook=(x,z)=>{const f=F();if(!f.brux){f.brux=1;setObj()}return!f.alias&&z<=22&&z>=19&&x>=12&&x<=16?aliasScene:null}}
}
