function buildRoute1(){
 /* ---- Route 1 (24x48) ---- */
 {const W=24,H=48,m=ROUTE=makeMap('route',W,H,0,-60,'route'),T=grid(W,H);
  for(let z=0;z<H;z++)for(let x=0;x<W;x++)if(x<2||x>=W-2||z===0||z===H-1)T[z][x]='T';
  [[4,4],[5,4],[4,5],[19,10],[20,11],[8,14],[9,15],[13,25],[14,26],[3,31],[20,29],[21,30],[2,19],[3,20],[20,17],[21,18],[13,45],[8,38],[9,37],[5,13],[15,4],[16,5]].forEach(([x,z])=>T[z][x]='T');
  rect(T,2,41,8,45,'g');rect(T,14,42,21,46,'g');rect(T,13,32,21,38,'g');rect(T,9,12,13,17,'g');rect(T,18,3,21,7,'g');rect(T,2,3,6,8,'g');
  rect(T,2,34,12,34,'~');rect(T,18,14,21,14,'~');ellipse(T,19.5,24.5,2.5,2.2,'~');
  [[3,36],[4,37],[10,44],[15,8],[3,11],[14,22],[8,2],[20,40],[6,46]].forEach(([x,z])=>{if(T[z][x]==='.')T[z][x]='f'});
  pathLine(T,[[11,47],[11,40],[18,40],[18,30],[6,30],[6,20],[16,20],[16,10],[11,10],[11,0]],3);rect(T,4,23,8,27,'g');
  terrain(m,T);
  sg(m,14,44,"Route 1 — Ixellette ↔ Charleroc. Attention : hautes herbes, Lumons sauvages ! Les ruisseaux, on les contourne.",true);
  sg(m,15,23,"Étang du Moulin. Pêche interdite… sauf pour le vieux Jef, mais ça, tout le monde le sait.");
  sg(m,17,22,()=>{F().clue3=1;return say('',"Une vieille pierre au bord de l'étang. Quelqu'un y a gravé : « Le dernier chiffre de la barrière ? Un seul… comme il n'y a qu'un seul étang. » → 1")});
  sg(m,7,9,()=>{F().clue1=1;return say('',"Vieux panneau rouillé : « Charbonnage de Sainte-Barbe — Puits n°7. Que les gueules noires reposent en paix. » Le chiffre 7 est entouré à la craie.")});
  m.gate=[];for(let x=10;x<=12;x++){m.gate.push(box(m.group,1,.16,.1,x,.55,1-60,x%2?'#f6c80f':'#1b1b1f',{ol:.02}),box(m.group,1,.16,.1,x,.95,1-60,x%2?'#1b1b1f':'#f6c80f',{ol:.02}));setSolid(m,x,1)}
  m.gate.push(box(m.group,.16,1.6,.16,9.45,.85,1-60,'#5a3a22',{ol:.02}),box(m.group,.16,1.6,.16,12.55,.85,1-60,'#5a3a22',{ol:.02}),box(m.group,3.3,.18,.18,11,1.62,1-60,'#5a3a22',{ol:.02}));
  m.gate.push(plane(m.group,1.4,.34,11,1.92,1.02-60,labelTex('MINE STE-BARBE','#1b1b1f','#f6c80f',512,128,56)));
  for(let x=10;x<=12;x++)m.signs[x+',1']=gateTalk;NPC.guard=npc(m,'miner',9,1,'down',gateTalk);
  sg(m,9,45,()=>{const f=F();if(f.crownAsk&&!f.crownFound){f.crownFound=1;sfx(988,.1);sfx(1318,.2);return say('',"Dans les herbes, une couronne en carton toute cabossée, avec des capsules de bière collées dessus. Ça doit être celle de Danny !")}return say('',f.crownFound?"L'endroit où tu as trouvé la couronne de Danny.":"Des herbes hautes… et un vieux papier doré qui dépasse.")});
  m.hook=(x,z)=>{const f=F();if(f.chapterDone&&laika()){f.stepN=(f.stepN||0)+1;if(f.stepN%25===0)addFr(1)}if(!f.nilsBattle)return null;if(!f.keto1&&z===20&&x>=6&&x<=16)return ketoFirst;return null};
  sg(m,13,2,"↑ Charleroc, la cité des terrils. Maison des Lumons · Boutique · Arène !",true);
  item(m,3,39,'lumisphere',2,'it1');item(m,20,11,'sirop',2,'it2');item(m,20,45,'speculoos',1,'it3');item(m,3,24,'supersirop',1,'it4');
  for(let x=10;x<=12;x++){m.steps[x+','+(H-1)]=()=>goMap(TOWN,14,1,'down');m.steps[x+',0']=()=>goMap(CHARL,14,24,'up')}
  arrows(m,[[10,0],[11,0],[12,0]],'up');arrows(m,[[10,47],[11,47],[12,47]],'down');
  m.grassRate=.11;m.wildBase=z=>z<24?[['pigeolet',4,6,30],['hannetonne',4,6,30],['gaufrelin',4,5,20],['terrilou',5,6,20]]:[['gaufrelin',2,4,40],['pigeolet',2,4,40],['hannetonne',3,4,20]];
  m.wildAt=z=>{let t=m.wildBase(z).map(e=>e.slice());if(ENV.night){t=t.filter(e=>e[0]!=='pigeolet');t.push(['scorion',z<24?5:3,z<24?7:5,25])}else t=t.filter(e=>e[0]!=='scorion');if(F().badge1)t.forEach(e=>{e[1]+=6;e[2]+=7});return t};
  const lola=npc(m,'lola',14,37,'down',async()=>say('Gamine Lola',F().lola?"Mon Hannetonne boude maintenant. Merci, hein !":"…"));
  m.trainers.push({c:lola,range:3,flag:'lola',name:'Gamine Lola',key:'lola',smart:.15,mons:()=>[mkMon('hannetonne',3),mkMon('gaufrelin',3)],intro:"Hé ! T'as marché sur mes fleurs ! Pour la peine, duel !",win:"Bouhouh… Bon, c'était pas mes fleurs, en vrai.",reward:['sirop',1]});
  const jules=npc(m,'scout',10,26,'down',async()=>{if(!F().jules)return say('Scout Jules',"…");await say('Scout Jules',"La barrière de la vieille mine, tout au nord, juste avant Charleroc ? Le gardien demande un code à trois chiffres.");F().clue2=1;await say('Scout Jules',"Le chiffre du milieu, je le connais : c'est 3, comme les trois terrils qu'on voit depuis le pont. Les deux autres sont cachés sur la route : un sur un vieux panneau, un près de l'étang.")});
  m.trainers.push({c:jules,range:4,flag:'jules',name:'Scout Jules',key:'scout',smart:.25,mons:()=>[mkMon('gaufrelin',4),mkMon('pigeolet',5)],intro:"Hé toi ! Les scouts sont toujours prêts ! Un duel, ça te dit ?",win:"Ah zut… T'es costaud, toi ! J'aurais dû manger plus de frites ce matin.",reward:['lumisphere',2]});
  const anouk=npc(m,'anouk',13,7,'down',async()=>say('Randonneuse Anouk',F().anouk?"Les terrils de Charleroc, je les ai tous grimpés. Mais l'arène, ça, c'est autre chose !":"…"));
  m.trainers.push({c:anouk,range:3,flag:'anouk',name:'Randonneuse Anouk',key:'anouk',smart:.3,mons:()=>[mkMon('terrilou',6),mkMon('hannetonne',6)],intro:"Tu montes vers Charleroc ? Montre-moi d'abord si t'as des mollets !",win:"Joli ! Ginette, la cheffe de l'arène, utilise le type Roche. Les attaques Eau et Plante, ça lui fait mal !",reward:['supersirop',1]});}

}
