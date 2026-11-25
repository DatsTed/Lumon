function buildCharleroc(){
 /* ---- Charleroc (30x26) ---- */
 {const W=30,H=26,m=CHARL=makeMap('charl',W,H,0,-110,'charl'),g=m.group,T=grid(W,H);
  for(let z=0;z<H;z++)for(let x=0;x<W;x++)if(x===0||(z===0&&x!==19&&x!==20)||(z===H-1&&(x<13||x>15))||x===W-1)T[z][x]='T';
  rect(T,1,16,11,24,'D');rect(T,19,16,28,24,'D');rect(T,1,1,9,4,'D');rect(T,21,1,28,4,'D');
  [[1,9],[2,10],[1,13],[27,8],[28,15],[11,23],[18,23],[10,7],[19,7],[1,20],[28,20]].forEach(([x,z])=>T[z][x]='T');
  rect(T,13,6,15,25,'#');rect(T,7,10,21,15,'c');rect(T,6,9,6,9,'#');rect(T,22,9,22,9,'#');rect(T,4,21,25,21,'#');rect(T,5,20,5,20,'#');rect(T,23,20,23,20,'#');rect(T,22,12,29,12,'#');
  [[8,17],[12,18],[17,18],[20,15],[8,15],[16,24],[12,24]].forEach(([x,z])=>{if(T[z][x]==='.')T[z][x]='f'});
  rect(T,19,0,20,4,'#');rect(T,19,5,19,9,'#');for(let x=13;x<=15;x++)T[25][x]='#';T[12][29]='T';rect(T,9,5,9,9,'#');
  terrain(m,T);
  {const sx=m.ox+25.5,sz=m.oz+13.5;box(g,4,.4,2,sx,.3,sz,'#1c1c22',{ol:.03});box(g,4.1,.06,2.1,sx,.53,sz,'#6a3aa0',{emi:'#4a1a80',cast:false});for(const s2 of[-1,1]){box(g,.6,1.4,.6,sx+s2*1.8,1.2,sz-.4,'#141418',{ol:.03});tp(g,CYL,'#2a2a30',sx+s2*1.8,1.2,sz-.09,.2,.02,.2,{r:[PI/2,0,0]})}
   box(g,4.2,.12,.12,sx,2.2,sz-.9,'#2a2a30');for(let k=0;k<5;k++)tp(g,CONE,['#a04ae8','#ffffff','#a04ae8','#3ef0ff','#a04ae8'][k],sx-1.6+k*.8,2.05,sz-.85,.12,.22,.12,{emi:'#6a2aa0',r:[PI,0,0]});
   m.stage=plane(g,3,.6,sx,1.6,sz-.98,labelTex('SNOW — KÉTO TOUR','#120a1c','#c88aff',768,128,56));solidRect(m,24,13,4,2)}
  NPC.mcs=npc(m,'mcsambre',25,15,'down',rapEvent);
  friterie(g,m,2,11,'FRITERIE CHEZ JOSETTE');m.signs['2,12']=m.signs['3,12']=friteJosette;
  NPC.rudy=npc(m,'rudy',5,13,'left',talkRudy);NPC.rose=npc(m,'granny',2,14,'right',talkPension);m.signs['24,14']=m.signs['25,14']=m.signs['26,14']=m.signs['27,14']=()=>F().luciole?rapEvent():say('',"Une scène vide, couverte d'affiches : « SNOW — KÉTO TOUR — bientôt à Charleroc ». Le logo, un dinosaure mauve avec une couronne.");
  m.hook=(x,z)=>{const f=F();if(!f.sphereGot&&z>=17&&x>=11&&x<=17)return gerardSphere;if(f.badge1&&!f.lucHint)f.lucHint=1;return f.lucHint&&!f.luciole&&z<=4&&x>=7&&x<=9?lucioleScene:null};
  bigBuilding(g,m,4,5,5,4,'#fdf6f0','#d8232a',6,'MAISON DES LUMONS','#d8232a','#ffffff');tp(g,SPH,'#f6c80f',m.ox+6,2.95,m.oz+6.5,.35,.35,.35,{emi:'#f6c80f'});
  bigBuilding(g,m,20,5,5,4,'#eef6ff','#3f7fd6',22,'BOUTIQUE LUMI','#3f7fd6','#ffffff');
  const gy=bigBuilding(g,m,10,1,9,5,'#7a5040','#33333a',14,'ARÈNE DE CHARLEROC','#2b2b2b','#f6c80f');
  for(const s of[-1,1])add(g,new THREE.CylinderGeometry(.25,.25,2.4,10),'#c9c2b0',gy.cx+s*1.2,1.3,gy.fz+.35,{ol:.03});
  const em=new THREE.Group();em.position.set(gy.cx,gy.top+.6,gy.cz+1);g.add(em);tp(em,CONE,'#3a3a42',0,0,0,.7,1,.7,{th:.04});tp(em,SPH,'#ff8a2c',0,.1,.45,.18,.18,.08,{emi:'#ff7a1a',ol:false});m.anim.push(t=>em.rotation.y=Math.sin(t)*.3);
  house(g,m,3,17,4,3,'#8a4a32','#33363f',5);house(g,m,22,17,4,3,'#a0603a','#3a3a42',23);
  terril(g,m,4,2.5,3.4,5.5);terril(g,m,25,2.5,3.4,6.2);terril(g,m,3,23,2.6,4);terril(g,m,26.5,23.5,2.6,4.4);headframe(g,m,9,18);
  for(const zz of[10,15])for(let k=0;k<29;k++)box(g,.16,.24,.02,m.ox+7.2+k*.48,2.05-Math.sin(k/28*PI)*.35,m.oz+zz,['#1b1b1f','#f6c80f','#d8232a'][k%3],{cast:false});
  [[7,10],[21,10],[7,15],[21,15]].forEach(([x,z])=>lamp(g,m,x,z));fountain(g,m,14,12,'terrilou');
  sg(m,11,24,"Charleroc — la cité des terrils. « Ici, on travaille dur et on mange encore plus ! »",true);
  sg(m,16,6,"Arène de Charleroc — Maître de Guilde : Ginette, la Reine des terrils. Type Roche.",true);
  sg(m,10,19,"Le chevalement de l'ancien charbonnage Sainte-Lumière. Les mineurs disent qu'on y trouvait de l'Éclat, autrefois.");
  m.signs['14,12']="La fontaine du Terrilou. Les enfants de Charleroc y jettent des pièces pour avoir de la chance à l'arène.";
  m.doors['6,8']=()=>goMap(CENTRE,4,5,'up');m.doors['22,8']=()=>goMap(SHOP,4,5,'up');m.doors['14,5']=()=>goMap(GYM,5,13,'up');
  m.doors['5,19']=async()=>say('',"Une odeur de boulets à la liégeoise… mais la porte est fermée.");m.doors['23,19']=async()=>say('',"Quelqu'un regarde le foot à la télé. « Allez les Zèbres ! »");
  m.steps['19,0']=m.steps['20,0']=()=>goMap(ROUTE2,11,38,'up');arrows(m,[[19,0],[20,0]],'up');for(let x=13;x<=15;x++)m.steps[x+',25']=()=>goMap(ROUTE,11,1,'down');arrows(m,[[13,25],[14,25],[15,25]],'down');
  sg(m,21,1,"↑ Route 2 — vers Bruxellia, la capitale. ← Vieux terril (à l'ouest, derrière la Maison des Lumons).");
  m.mist=[];for(let k=0;k<12;k++){const mm=new THREE.Mesh(new THREE.SphereGeometry(.8+rnd()*.6,10,8),new THREE.MeshBasicMaterial({color:'#c9b6e8',transparent:true,opacity:.42,depthWrite:false}));mm.position.set(m.ox+18.5+rnd()*3,.5+rnd()*1.3,m.oz+.6+rnd()*2.2);mm.userData.p=rnd()*6;g.add(mm);m.mist.push(mm)}
  m.anim.push(t=>m.mist.forEach(o2=>{if(o2.visible){o2.position.x+=Math.sin(t*.5+o2.userData.p)*.004;o2.material.opacity=.32+Math.sin(t*.8+o2.userData.p)*.1}}));
  for(const x of[19,20])m.signs[x+',2']="Une brume mauve et épaisse noie la Route 2. Ça sent la machine à fumée de concert… Impossible de passer.";
  NPC.agent=npc(m,'agent',21,2,'left',async()=>{const A='Agent de quartier Dupont',f=F();if(f.north){await say(A,"La brume est partie ! La Route 2 vers Bruxellia est libre. Bonne route, et méfie-toi des Kétosaures.");return}
   if(f.rap1){await say(A,"La brume se lève doucement… C'étaient les fumigènes des concerts de Snow. On attend le feu vert de la Prof Verhaegen pour rouvrir.");await say(A,"Redescends à Ixellette par la Route 1, au sud. Elle voudra voir ta médaille… et ce que tu lui rapportes.");return}
   await say(A,"Halte-là ! La Route 2 vers Bruxellia est noyée dans une brume mauve. Personne ne passe.");await say(A,"Paraît que c'est la fumée des concerts de Snow… Il joue bientôt ici, à Charleroc. Tant que ce cirque continue, c'est fermé.")});
  wand(npc(m,'miner',17,13,'down',async()=>{if(!F().egg1&&S.party.length){await eggStory();return}await say('Mineur Gérard',"Les terrils, c'est notre fierté ! Avant, c'était du charbon. Maintenant, c'est plein de Terrilou.");await say('Mineur Gérard',"Le type Roche, ça résiste bien au Feu et au Vol. Mais l'Eau et la Plante, ça le fait pleurer !")}));
  NPC.jadeC=wand(npc(m,'kid',10,13,'down',async()=>say('Petite Jade',"La Boutique Lumi vend des Spéculoos ! Ça relève un Lumon K.O., c'est magique !")));
  wand(npc(m,'granny',11,22,'down',async()=>say('Bonne-maman Lucienne',"Mon petit-fils est parti à Bruxellia… Quand la brume sera partie, je pourrai enfin aller le voir.")));
  NPC.nilsC=npc(m,'nils',16,8,'down',async()=>{const f=F();if(f.rap1)await say('Dolba',"T'as vu ? La brume se lève ! Redescends à Ixellette montrer ta médaille à la Prof, et rapporte-lui sa Lumisphère. Moi je reste encore un peu… Ginette m'a promis une revanche.");else if(f.luciole)await say('Dolba',"Le concert de Snow, c'est sur la scène à l'est de la grande place. Vas-y, moi les Kétosaures me font flipper.");else if(f.badge1&&f.starter2==null)await say('Dolba',"Tu l'as battue ?! Bon… Passe à la Maison des Lumons, l'infirmière a un colis de la Prof pour toi.");else if(f.badge1)await say('Dolba',"Tu l'as battue ?! Bon… Hé, paraît qu'il y a une fille bizarre sur le vieux terril, à l'ouest, derrière la Maison des Lumons. Tu passes par le petit chemin à côté de l'arène.");else if(!f.sphereGot)await say('Dolba',"T'as vu le vieux Gérard ? Il te cherchait, il avait un truc qui brille dans les mains.");else{await say('Dolba',"{P} ! J'ai défié Ginette… Elle m'a fait une misère. Son Terrilou est dur comme un pavé !");await say('Dolba',"Le type Roche, faut l'attaquer avec de l'Eau ou de la Plante. Et passe à la Maison des Lumons avant, hein !")}});}

}
