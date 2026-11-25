function buildRoute3(){
 /* ---- Route 3 + garage ---- */
 {const W=32,H=18,m=ROUTE3=makeMap('route3',W,H,830,0,'route'),g=m.group,T=grid(W,H);treesRim(T,W,H,(x,z)=>(x===0||x===W-1)&&z>=8&&z<=10);
  rect(T,20,1,29,6,'g');rect(T,2,12,7,16,'g');rect(T,21,15,29,16,'g');pathLine(T,[[0,9],[8,9],[8,4],[18,4],[18,13],[26,13],[26,9],[31,9]],3);rect(T,9,6,17,12,'c');
  [[3,3],[5,6],[14,15],[30,3],[30,15],[12,2]].forEach(([x,z])=>T[z][x]='T');terrain(m,T);
  {const x0=10,z0=6,w=6,d=2,cx=m.ox+x0+(w-1)/2,cz=m.oz+z0+(d-1)/2,fz=cz+d*.48;add(g,new THREE.BoxGeometry(w*.96,1.9,d*.95),'#e8e8ee',cx,1.05,cz,{ol:.04});box(g,w,.16,d+.2,cx,2.06,cz,'#1c1c22',{ol:.03});
   box(g,w*.9,1.2,.05,cx,.8,fz,'#bfe0ff',{emi:'#9ab8d8',cast:false});plane(g,3.6,.5,cx,1.75,fz+.04,labelTex('GARAGE ALEX PRESTIGE','#1c1c22','#f6c80f',768,128,52));solidRect(m,x0,z0,w,d)}
  const car=(x,z,kind)=>{const cg=new THREE.Group();cg.position.set(m.ox+x+.5,.1,m.oz+z);g.add(cg);const P={a6:['#9aa3ad','#2a2f36',.42,.36,2],phantom:['#3a0a14','#111114',.55,.5,2.3],ghost:['#e8e8ee','#c9ccd4',.48,.42,2.2]}[kind];
   box(cg,P[4],P[2],.95,0,.14+P[2]/2,0,P[0],{ol:.03});box(cg,P[4]*.55,P[3],.85,-.05,.14+P[2]+P[3]/2,0,kind==='phantom'?P[1]:P[0],{ol:.03});box(cg,P[4]*.5,P[3]*.7,.87,-.05,.14+P[2]+P[3]/2,0,'#2a3a4a',{ol:false,cast:false});
   for(const sx of[-1,1])for(const sz of[-1,1])tp(cg,CYL,'#1a1a1e',sx*P[4]*.32,.2,sz*.46,.17,.08,.17,{r:[PI/2,0,0]});
   box(cg,.06,P[2]*.8,.6,P[4]/2+.01,.14+P[2]/2,0,kind==='a6'?'#1a1a1e':'#d8dce4',{ol:false,emi:kind==='a6'?null:'#8a8a90'});for(const sz of[-.3,.3])box(cg,.05,.08,.16,P[4]/2+.02,.14+P[2]*.75,sz,'#fff6d8',{emi:'#fff6d8',ol:false});
   if(kind!=='a6')tp(cg,SPH,'#d8dce4',P[4]/2-.05,.16+P[2]+.04,0,.04,.07,.03,{emi:'#8a8a90',ol:false});m.anim.push(t=>cg.rotation.y=Math.sin(t*.3+x)*.04);setSolid(m,x,z);setSolid(m,x+1,z)};
  car(9,11,'a6');car(12,11,'phantom');car(15,11,'ghost');
  m.signs['9,11']=m.signs['10,11']="Une Audi A6. Gris métallisé, sièges en cuir, phares qui te regardent de travers. Sobre et classe.";
  m.signs['12,11']=m.signs['13,11']="Une Rolls-Royce Phantom. Bordeaux et noir, une calandre plus grande que ta chambre chez ta mère. La petite statuette sur le capot brille.";
  m.signs['15,11']=m.signs['16,11']="Une Rolls-Royce Ghost. Blanche, silencieuse comme… un fantôme. Ce soir, elle te fait rêver.";
  npc(m,'alex',13,9,'down',async()=>{const A='Alex';if(!F().alex){F().alex=1;await say(A,"Bienvenue au Garage Wagner. Alex, enchanté. Ici, que du haut de gamme : une Audi A6, une Rolls-Royce Phantom et une Rolls-Royce Ghost.");
    await say(A,"Tu travailles où, toi ? Au Night White ? Ah, très bien, très bien. Pour la Phantom, compte… disons quelques milliers de services. Hé hé.");await say(A,"Mais un jour, qui sait ? Les plus belles histoires commencent souvent au fond d'un night shop.")}
   else await say(A,["Une voiture, c'est comme un Lumon : il faut en prendre soin, et elle te le rend au centuple.","La Ghost ? Je l'ai lustrée trois fois ce matin. Il pleuvait. Je l'ai relustrée.","Captain est passé hier. Il voulait la Phantom « en échange de services ». J'ai dit non. Poliment. Très poliment."][(rnd()*3)|0])});
  sg(m,6,8,"Route 3 — Bruxellia ↔ Jourdanfritte. Garage Wagner à 200 m. Attention : Pirates signalés !",true);item(m,24,2,'mitraillette',1,'r3i1');item(m,4,14,'lumisphere',2,'r3i2');
  for(let z=8;z<=10;z++){m.steps['0,'+z]=()=>goMap(BRUX,28,12,'left');m.steps[(W-1)+','+z]=()=>goMap(JF,1,11,'right')}arrows(m,[[0,8],[0,9],[0,10]],'left');arrows(m,[[31,8],[31,9],[31,10]],'right');
  m.grassRate=.12;m.wildAt=wildNight(()=>[['pigeolet',13,15,25],['hannetonne',13,16,25],['terrilou',14,16,25],['gaufrelin',13,15,25]]);
  const p1=npc(m,'pirate',22,12,'down',async()=>say('Pirate Bob',F().pir1?"On a même pas de quoi s'acheter des fringues… Tout ce qu'on vend, on le… enfin bref.":"…"));
  m.trainers.push({c:p1,range:3,flag:'pir1',name:'Pirate Bob',key:'pirate',smart:.3,mons:()=>[mkMon('terrilou',15),mkMon('hannetonne',15)],intro:"Yo, man… T'aurais pas une pièce ? Non ? Alors bagarre, man… Peace and love, mais bagarre.",win:"Ouais… c'est cool, man. Tout est cool.",reward:['frites',1]});
  const p2=npc(m,'pirate2',27,6,'down',async()=>say('Pirate Jerry',F().pir2?"Captain ? Il est quelque part par là. Méfie-toi : il rigole, et la seconde d'après il casse tout.":"…"));
  m.trainers.push({c:p2,range:3,flag:'pir2',name:'Pirate Jerry',key:'pirate2',smart:.35,mons:()=>[mkMon('scorion',15),mkMon('pigeolet',16)],intro:"Hé ! Cette route, c'est le territoire des Pirates ! … Enfin, quand on se réveille avant midi.",win:"Ok, ok… Je retourne à ma sieste.",reward:['fricadelle',1]});
  m.hook=(x,z)=>{const f=F();if(f.nourBox===1&&x>=3&&x<=8)return pigeonHeist;if(f.nourBox===2&&x>=9&&x<=17&&z>=8&&z<=12)return pigeonFight;return!f.captain&&x>=20?captainScene:null}}
}
