function buildIxellette(){
 /* ---- Ixellette (30x26) ---- */
 {const W=30,H=26,m=TOWN=makeMap('town',W,H,0,0,'town'),g=m.group,T=grid(W,H);
  for(let z=0;z<H;z++)for(let x=0;x<W;x++)if(x===0||x===W-1||z===H-1||(z===0&&(x<12||x>16)))T[z][x]='T';
  for(let z=0;z<H;z++){T[z][24]='~';T[z][25]='~'}
  [[1,1],[2,1],[1,2],[10,1],[9,2],[18,1],[19,2],[22,1],[22,3],[1,10],[1,12],[2,11],[1,15],[2,16],[1,23],[2,24],[8,23],[9,24],[20,24],[22,23],[22,20],[23,8],[23,11],[27,3],[28,5],[27,20],[28,22],[26,24],[10,20],[11,21]].forEach(([x,z])=>T[z][x]='T');
  rect(T,12,0,16,1,'#');rect(T,13,2,15,10,'#');rect(T,9,11,19,17,'c');rect(T,14,18,14,22,'#');rect(T,5,22,18,22,'#');rect(T,5,21,5,21,'#');rect(T,18,21,18,21,'#');
  rect(T,6,7,6,8,'#');rect(T,6,8,12,8,'#');rect(T,18,6,18,8,'#');rect(T,16,8,18,8,'#');rect(T,20,14,23,14,'#');T[14][24]=T[14][25]='=';rect(T,26,14,27,14,'#');
  [[3,9],[4,9],[3,10],[8,10],[7,13],[7,14],[4,13],[20,12],[21,12],[21,16],[16,24],[17,24],[12,24],[26,9],[27,9],[26,17],[3,16],[4,16],[11,4],[17,4],[11,6]].forEach(([x,z])=>{if(T[z][x]==='.')T[z][x]='f'});
  terrain(m,T);
  box(g,2.3,.14,1.1,24.5,.08,14,'#a8743f',{ol:.02});box(g,2.3,.12,.08,24.5,.45,13.5,'#7a5230');box(g,2.3,.12,.08,24.5,.45,14.5,'#7a5230');
  labExt(g,m,3,3);house(g,m,17,3,4,3,'#d9a05b','#5a3a3a',18);belfry(g,m,20,8);house(g,m,3,18,4,3,'#b9563c','#33363f',5);nightWhiteExt(g,m,17,18,4,3,18);
  fountain(g,m,14,14);friterie(g,m,10,16);[[9,11],[19,11],[9,17],[19,17]].forEach(([x,z])=>lamp(g,m,x,z));
  for(const zz of[11,17])for(let k=0;k<21;k++)box(g,.16,.24,.02,9.2+k*.48,2.05-Math.sin(k/20*PI)*.35,zz,['#1b1b1f','#f6c80f','#d8232a'][k%3],{cast:false});
  arch(g,m,11,17,1,'ROUTE 1');m.barrier=[];for(let x=12;x<=16;x++){m.barrier.push(box(g,.1,.7,.1,x-.4,.45,1,'#2b2b2b'),box(g,1,.18,.08,x,.6,1,x%2?'#d8232a':'#ffffff',{ol:.02}));setSolid(m,x,1)}
  m.arrows=arrows(m,[[13,0],[14,0],[15,0]],'up');m.arrows.forEach(a=>a.visible=false);
  const mg=new THREE.BufferGeometry(),mN=40,mA=new Float32Array(mN*3),mP=[];for(let k=0;k<mN;k++)mP.push([1+rnd()*22,rnd()*6.28,1+rnd()*23]);
  mg.setAttribute('position',new THREE.BufferAttribute(mA,3));g.add(new THREE.Points(mg,new THREE.PointsMaterial({color:'#ffe58a',size:.13,transparent:true,opacity:.75})));
  m.anim.push(t=>{mP.forEach((p,k)=>{mA[k*3]=p[0]+Math.sin(t*.4+p[1])*.4;mA[k*3+1]=1.2+Math.sin(t*.7+p[1])*.6;mA[k*3+2]=p[2]+Math.cos(t*.3+p[1])*.4});mg.attributes.position.needsUpdate=true});
  sg(m,16,3,()=>say('',F().nilsBattle?"↑ Route 1 — vers Charleroc, la cité des terrils, au nord. La route est ouverte !":"↑ Route 1 — vers Charleroc. « Travaux de la commune — réouverture imminente. »"),true);
  sg(m,19,10,"Beffroi d'Ixellette. Ses cloches sonnent à chaque fois qu'un dresseur part à l'aventure. Classé au patrimoine, s'il vous plaît !");
  sg(m,8,12,"Grand-Place d'Ixellette. « Ici, chaque Lumon est le bienvenu… même ceux qui ne disent pas bonjour. »");
  sg(m,4,22,()=>say('',`Chez Françoise et Doudoune. Une maison pleine de chats, un Jack Russell, et une odeur de gaufres de Liège. ${S.name} y dort dans la petite chambre du dessus.`));
  sg(m,19,6,"Maison de Dolba. Quelqu'un a gribouillé « Futur champion d'Ardenval » en dessous. Pas très discret, une fois.");
  sg(m,7,7,"Laboratoire Verhaegen — Recherches sur l'Éclat. Le mini-Atomium sur le toit, c'est l'antenne. Si, si.");
  sg(m,19,21,"Night White — Ixellette. Ouvert 24h/24, 7j/7. « Ton night shop haut de gamme. » Une affichette : « On recrute — voir le patron. »");
  m.doors['18,20']=async()=>{await goMap(NWT,5,6,'up');if(!F().nwCine2)await nwIxCine()};
  for(let x=12;x<=16;x++)m.signs[x+',1']="Une barrière de chantier : « Route 1 — travaux, réouverture imminente. »";
  m.signs['14,14']="La fontaine Mouli-Pis. Un petit Moulinet en pierre crache de l'eau depuis trois cents ans. Personne ne sait pourquoi. C'est ça, la Belgique.";
  m.signs['10,16']=m.signs['11,16']=()=>talkFernand();
  m.doors['6,6']=enterLab;
  m.doors['5,20']=async()=>{if(S.party.length){const c=await choose('',"Ta petite chambre chez ta mère et ta tante. Qu'est-ce que tu fais ?",["Se reposer","Changer de tenue","Rien"]);if(c===1){await pickLook();rebuildHero();await say('Françoise',"Oh, mais tu es magnifique comme ça ! Doudoune, regarde !");await say('Doudoune',"Hmpf. Ça ira.");return}if(c===2)return;await say('',"Ta mère te tend un bol de soupe bien chaude. Ta tante râle qu'il n'y en aura plus pour les chats.");await healFx();sfx(784,.1);sfx(1046,.2);await say('Mamy Paulette',"Voilà, tes Lumons sont en pleine forme ! Allez, file, et sois prudent·e.")}else await say('',"Ta mère a fait des gaufres… mais la Prof t'attend ! Pas le temps de traîner.")};
  m.doors['18,5']=async()=>say('',"C'est fermé. Les parents de Dolba sont partis au marché de Bruxellia.");

  for(let z=2;z<=5;z++)for(let x=13;x<=15;x++)m.steps[x+','+z]=async()=>{if(F().chapterDone&&!F().nilsBattle)await nilsDuel()};
  for(let x=12;x<=16;x++)m.steps[x+',0']=()=>goMap(ROUTE,11,46,'up');}

}
function placePNJIxellette(){
 /* ---- Ixellette NPCs ---- */
 NPC.mom=npc(TOWN,'mom',4,21,'down',talkMom);NPC.doudoune=npc(TOWN,'doudoune',2,21,'down',talkDoudoune);
 [['cat','#e8a050',6,23],['cat','#2a2a30',2,23],['cat','#d8d8dc',7,21],['jack','#f4f0e8',3,22]].forEach(([k,c,x,z],i)=>{const pc=new Char(petModel(k,c),TOWN,x,z,'down',k==='jack'?.55:.45);pc.snap();pc.talk=k==='jack'?talkJack:talkCat;pc.wander=1;pc.home=[x,z];pc.wt=1+i;pc.wr=2;TOWN.npcs.push(pc)});
 NPC.nils=npc(TOWN,'nils',15,15,'down',talkNilsTown);
 NPC.fisher=npc(TOWN,'fisher',27,12,'left',async()=>{await say('Pêcheur Jef',"La Meuse traverse tout Ardenval, fieu. Les Moulinet la remontent jusqu'aux Ardennes, à ce qu'on dit.");await say('Pêcheur Jef',"Moi, ça fait septante ans que je pêche ici. J'en ai jamais vu un mordre. Mais je perds pas espoir, hein !")});
 NPC.kid=npc(TOWN,'kid',8,19,'down',async()=>say('Petit Léon',"Tu vois l'arche « Route 1 », tout au nord du village ? Derrière, il y a des hautes herbes pleines de Gaufrelin ! Des gaufres vivantes, j'te jure !"));
 NPC.granny=npc(TOWN,'granny',11,13,'down',async()=>{await say('Bonne-maman Odette',"Avant, la nuit, on voyait les terrils de Charleroc briller jusqu'ici. Depuis que ce Consortium Brume rôde, tout est terne…");await say('Bonne-maman Odette',"Le type Feu bat le type Plante, la Plante bat l'Eau, et l'Eau éteint le Feu. Retiens bien ça, mon petit !")});
 NPC.fernand=npc(TOWN,'fernand',12,16,'down',talkFernand);
 NPC.prof=npc(LAB,'prof',4,1,'down',async()=>{if(!F().chapterDone)await labScene();else await talkProf()});
 wand(NPC.kid);wand(NPC.granny);
 NPC.danny=wand(npc(TOWN,'danny',12,13,'down',talkDanny));NPC.danny.wr=7;
 NPC.nilsL=npc(LAB,'nils',2,3,'right',async()=>say('Dolba',"Allez, choisis, une fois ! Moi je sais déjà lequel je vais prendre…"));
}
