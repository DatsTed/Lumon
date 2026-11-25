/* ---- Route 4 : Bruxellia ↔ Anversaille (chapitre 4) ----
   Le canal et le pont de l'éclusier Marcel (énigme), la rencontre avec Luciole (son secret), dresseurs, herbes hautes. */
let ROUTE4=null;
function buildRoute4(){
 {const W=22,H=40,m=ROUTE4=makeMap('route4',W,H,1300,0,'route'),g=m.group,T=grid(W,H);treesRim(T,W,H,(x,z)=>x>=10&&x<=12&&(z===0||z===H-1));
  for(let z=0;z<H;z++){T[z][1]='T';T[z][W-2]='T'}
  rect(T,2,22,19,23,'~');rect(T,2,30,8,36,'g');rect(T,13,8,19,13,'g');rect(T,3,9,8,14,'g');rect(T,14,31,19,35,'g');
  pathLine(T,[[11,39],[11,28],[16,28],[16,16],[6,16],[6,6],[11,6],[11,0]],3);
  [[4,26],[18,25],[9,19],[13,3],[4,3],[18,38],[3,39]].forEach(([x,z])=>{if(T[z]&&T[z][x]==='.')T[z][x]='T'});[[3,18],[19,18],[9,34],[14,5]].forEach(([x,z])=>{if(T[z][x]==='.')T[z][x]='f'});
  terrain(m,T);
  // pont-levis de l'éclusier sur le canal (x 15..17, z 22..23) : relevé tant que l'énigme n'est pas résolue
  const br=new THREE.Group();br.position.set(m.ox+16,0,m.oz+22.5);g.add(br);box(br,3.2,.18,2.3,0,.12,0,'#8a5a32',{ol:.03});for(const s of[-1,1])box(br,3.2,.35,.12,0,.35,s*1.1,'#6b4426',{ol:.02});
  const bar=new THREE.Group();bar.position.set(m.ox+16,0,m.oz+24.2);g.add(bar);box(bar,3.2,.14,.14,0,.75,0,'#d8232a',{ol:.02});for(const s of[-1.5,1.5])add(bar,new THREE.CylinderGeometry(.06,.06,.85,6),'#2b2b2b',s,.42,0,{ol:false});
  m.bridge={br,bar};m.anim.push(()=>{const up=!F().pont4;bar.visible=up;br.rotation.x=up?-.35:0;br.position.y=up?.35:0});
  m.block=()=>{const up=!F().pont4;for(let x=15;x<=17;x++)setSolid(m,x,24,up?1:0)};setTimeout(()=>m.block(),0);
  const marcel=npc(m,'fisher',14,25,'right',ecluseEnigme);m.signs['15,24']=m.signs['16,24']=m.signs['17,24']=ecluseEnigme;
  sg(m,13,37,"Route 4 — Bruxellia ↓ · Anversaille ↑. Attention : pont-levis sur le canal.",true);sg(m,13,2,"↑ Anversaille, la ville portuaire. Port · Arène · Maison des Lumons",true);
  item(m,3,31,'superlumi',2,'r4i1');item(m,18,9,'supersirop',1,'r4i2');item(m,4,10,'aqualumi',2,'r4i3');
  for(let x=10;x<=12;x++){m.steps[x+','+(H-1)]=()=>goMap(BRUX,8,1,'down');m.steps[x+',0']=()=>goMap(ANV,14,24,'up')}arrows(m,[[10,0],[11,0],[12,0]],'up');arrows(m,[[10,39],[11,39],[12,39]],'down');
  m.grassRate=.13;m.wildAt=wildNight(z=>z<22?[['hannetonne',19,22,25],['moulinet',19,21,20],['pigeolet',19,21,25],['terrilou',20,22,15],['gaufrelin',19,21,15]]:[['pigeolet',17,19,30],['gaufrelin',17,19,25],['hannetonne',17,20,25],['moulinet',17,19,20]]);
  const t1=npc(m,'scout',8,31,'right',async()=>say('Scout Elise',F().elise?"Anversaille, c'est là où je vais faire mes études de diamantaire. Ou de dresseuse. Je sais pas encore.":"…"));
  m.trainers.push({c:t1,range:3,flag:'elise',name:'Scout Elise',key:'scout',smart:.35,mons:()=>[mkMon('hannetonne',19),mkMon('moulinet',20)],intro:"Halte ! Tout dresseur qui passe sur la Route 4 doit me battre. C'est la règle. Je viens de l'inventer.",win:"Bon… Ta règle est meilleure que la mienne.",reward:['sirop',2]});
  const t2=npc(m,'miner',15,10,'left',async()=>say('Docker Jens',F().jens?"Au port, on charge des containers bizarres depuis une semaine. Mauves. Avec un dinosaure dessus.":"…"));
  m.trainers.push({c:t2,range:3,flag:'jens',name:'Docker Jens',key:'miner',smart:.4,mons:()=>[mkMon('terrilou',21),mkMon('krakamoule',21)],intro:"Un dresseur de Bruxellia ? Allez, on va voir si les gens de la capitale savent se battre !",win:"Pfff. T'as des bras de docker, toi.",reward:['megalumi',1]});
  m.hook=(x,z)=>{const f=F();if(!f.route4){f.route4=1;setObj()}return f.pont4&&!f.lucR4&&z<=15&&z>=8?lucioleSecret:null}}
}
