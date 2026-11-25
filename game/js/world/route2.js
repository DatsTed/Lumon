function buildRoute2(){
 /* ---- Route 2 ---- */
 {const W=22,H=40,m=ROUTE2=makeMap('route2',W,H,700,0,'route'),T=grid(W,H);treesRim(T,W,H,(x,z)=>x>=10&&x<=12&&(z===0||z===H-1));for(let z=0;z<H;z++){T[z][1]='T';T[z][W-2]='T'}
  [[4,4],[8,6],[18,12],[3,18],[19,22],[8,27],[15,31],[4,35],[17,37],[7,2],[14,15]].forEach(([x,z])=>T[z][x]='T');
  rect(T,2,32,8,37,'g');rect(T,13,24,19,29,'g');rect(T,2,10,9,16,'g');rect(T,16,2,19,6,'g');ellipse(T,16,34,2.5,2,'~');
  pathLine(T,[[11,39],[11,30],[5,30],[5,20],[16,20],[16,8],[11,8],[11,0]],3);[[3,22],[18,16],[9,33],[13,4]].forEach(([x,z])=>{if(T[z][x]==='.')T[z][x]='f'});
  terrain(m,T);sg(m,13,37,"Route 2 — Charleroc ↑ Bruxellia, plein nord. La brume de Snow s'est levée : bonne route, dresseur !",true);sg(m,13,2,"↑ Bruxellia, la capitale. Night White · Maison des Lumons · Ligue d'Ardenval",true);
  item(m,3,36,'supersirop',1,'r2i1');item(m,18,3,'lumisphere',3,'r2i2');item(m,4,11,'zisoa',1,'r2i3');
  for(let x=10;x<=12;x++){m.steps[x+','+(H-1)]=()=>goMap(CHARL,19,3,'down');m.steps[x+',0']=()=>goMap(BRUX,14,24,'up')}arrows(m,[[10,0],[11,0],[12,0]],'up');arrows(m,[[10,39],[11,39],[12,39]],'down');
  m.grassRate=.12;m.wildAt=wildNight(z=>z<20?[['pigeolet',12,14,30],['hannetonne',12,14,25],['terrilou',13,15,25],['gaufrelin',12,13,20]]:[['pigeolet',10,12,35],['gaufrelin',10,12,30],['hannetonne',10,13,25],['terrilou',11,13,10]]);
  const theo=npc(m,'scout',8,25,'left',async()=>say('Scout Théo',F().theo?"Les scouts de Bruxellia, on est les meilleurs ! Enfin… après toi.":"…"));
  m.trainers.push({c:theo,range:3,flag:'theo',name:'Scout Théo',key:'scout',smart:.3,mons:()=>[mkMon('pigeolet',12),mkMon('hannetonne',13)],intro:"Hé ! T'as une médaille de Charleroc ? Montre-moi ce que vaut le Pays Noir !",win:"Waw… Le Pays Noir, ça rigole pas !",reward:['sirop',2]});
  const marc=npc(m,'anouk',3,21,'right',async()=>say('Randonneuse Marie',F().marie?"La Route 2 était fermée par la brume des concerts de Snow. Des fumigènes, rien que ça !":"…"));
  m.trainers.push({c:marc,range:3,flag:'marie',name:'Randonneuse Marie',key:'anouk',smart:.35,mons:()=>[mkMon('terrilou',13),mkMon('gaufrelin',13),mkMon('pigeolet',14)],intro:"Enfin quelqu'un sur cette route ! Un duel pour se réchauffer ?",win:"Pfiou ! Tu marches vite et tu cognes fort.",reward:['supersirop',1]});
  m.hook=(x,z)=>!F().r2scene&&z<=32&&z>=26?r2Scene:null;
  const nl=npc(m,'nils',12,5,'down',async()=>say('Dolba',F().nils2?"La prochaine fois, je te battrai. À la Ligue de Bruxellia, s'il le faut !":"…"));
  m.trainers.push({c:nl,range:4,flag:'nils2',name:'Rival Dolba',key:'nils',smart:.4,prize:60,mons:()=>{const s0=STARTERS[F().nilsMon||0],e=SP[s0].evo?SP[s0].evo[1]:s0;return[mkMon('pigeolet',14),mkMon(e,16)]},intro:"{P} ! Je t'attendais ! T'as vu, mon Lumon a évolué. Cette fois, c'est moi qui gagne !",re:"Encore un duel ? Avec plaisir !",win:"Encore perdu ?! Bon… T'es vraiment devenu·e fort·e. On se reverra à Bruxellia !",reward:['speculoos',1]});}
}
