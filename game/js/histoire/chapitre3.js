function pigeonModel(){const r=monModel('pigeolet');r.g.scale.setScalar(1.35*mscale('pigeolet'));tp(r.g,CONE,'#f6c80f',0,1.15,0,.12,.16,.12,{emi:'#a07a10'});const box=new THREE.Group();tp(box,BOXG,'#c9a06a',0,0,0,.34,.24,.26);tp(box,BOXG,'#7fd16a',0,.0,.135,.2,.1,.01,{ol:false});box.position.set(0,.05,.25);r.g.add(box);r.box=box;return r}
function pigeonSync(){const f=F(),m=ROUTE3;if(f.nourBox===2){if(!m.pig){m.pig=pigeonModel();m.pig.g.position.set(m.ox+15.5,.95,m.oz+11);m.pig.g.rotation.y=.4;m.group.add(m.pig.g);m.anim.push(t=>{if(m.pig){m.pig.g.position.y=.95+Math.abs(Math.sin(t*3))*.06;m.pig.g.rotation.y=.4+Math.sin(t*.7)*.5}})}}else if(m.pig){disposeModel(m.pig);m.pig=null}}
async function pigeonHeist(){const f=F(),m=cur;player.face('right');sfx(1400,.05,'square',.06);
 await say('',"Un bruit d'ailes… Au-dessus de toi, un Pigeolet énorme, gonflé comme un ballon de foot, avec une capsule dorée sur la tête. Il te fixe. Il fixe le colis.");
 const pg=pigeonModel();pg.box.visible=false;const sx=m.ox+player.x-2,sz=m.oz+player.z-3;pg.g.position.set(sx,5,sz);m.group.add(pg.g);
 const px=m.ox+player.x,pz=m.oz+player.z;await tween(900,q=>{pg.g.position.set(sx+(px-sx)*q,5-(5-1.4)*Math.sin(q*PI/2),sz+(pz-sz)*q);pg.g.rotation.y=PI/2});
 sfx(300,.1,'sawtooth',.12);camShake(250,.1);pg.box.visible=true;delete S.bag.colisnw;f.nourBox=2;
 await say('Pigeolet royal',"ROUCOUUU !");await say('',"Il attrape le colis de Nour dans ses pattes et repart en battant des ailes ! Douze Cisoa Pomme-Poire s'envolent vers l'est…");
 const tx=m.ox+15.5,tz=m.oz+11;await tween(1600,q=>{pg.g.position.set(px+(tx-px)*q,1.4+Math.sin(q*PI)*2.5-(.35*q),pz+(tz-pz)*q);pg.g.rotation.y=Math.atan2(tx-px,tz-pz)});
 disposeModel(pg);pigeonSync();sfx(200,.4,'square',.1);
 await say('Alex (au loin)',"NOOOON ! PAS SUR LA GHOST ! PAS SUR LA GHOST ! Je l'ai lustrée QUATRE fois ce matin !");
 await say('',"Le Pigeolet s'est posé sur le toit de la Rolls-Royce Ghost d'Alex, au garage un peu plus loin. Amin va te tuer si tu reviens sans ses Cisoa.");setObj()}
async function pigeonFight(){const f=F(),A='Alex';player.face('down');
 await say(A,"Toi ! Le livreur ! C'est TON pigeon ?! Il squatte ma Ghost depuis dix minutes ! Il a déjà grignoté le cuir du rétroviseur !");
 await say(A,"Fais quelque chose ! Je n'ai pas fait trois ans de Solvay pour finir à chasser des pigeons sur une Rolls !");
 await say('Pigeolet royal',"ROUCOUUU ! ROUCOU-COU !");
 const w=mkMon('pigeolet',16);w.iv=[24,24,24,28];calc(w);w.hp=w.mhp;const res=await battle({wild:w,music:'boss'});
 if(res==='win'||res==='caught'){f.nourBox=3;give('colisnw');pigeonSync();unlock('pigeon');
  await say('',res==='caught'?"Le Pigeolet royal est dans ta Lumisphère. Le colis de Nour tombe sur le capot de la Ghost avec un petit « poc ».":"Le Pigeolet royal lâche le colis et s'enfuit vers Bruxellia en roucoulant des insultes.");
  await say(A,"Ma Ghost… Il y a une fiente sur le capot. UNE FIENTE. Sur une Rolls-Royce.");await sleep(300);
  await say(A,"…Attends. C'est quoi, dans ton colis ? … Des CISOA POMME-POIRE ?! Ma boisson préférée ! Introuvable à Bruxellia, ça !");
  await say(A,"Écoute, je te propose un deal entre gentlemen : UNE canette de Cisoa contre une Mitraillette maison. Pain, frites, deux fricadelles, sauce andalouse. Deal ?");
  const c=await choose(A,"Une canette contre une Mitraillette ?",["Deal ! (donner une canette)","Non, c'est pour Amin"]);
  if(c===0){f.cisoaAlex=1;give('mitraillette');sfx(784,.12);sfx(1046,.2);await say('',"Alex ouvre la canette et la boit d'une traite, les yeux fermés, comme un grand vin. Il en a des larmes.");
   await say(A,"Ahhh… Merci, vraiment. Et dis à Amin que la prochaine fois, il se fait livrer par camion. Pas par pigeon.");await say('',"Tu récupères le colis… avec onze canettes. Et une Mitraillette. Direction Jourdanfritte !")}
  else{f.cisoaAlex=0;await say(A,"…Pfff. Un livreur honnête. On n'en fait plus, des comme toi. Respect, hein. Mais tu me fends le cœur.");await say('',"Tu récupères le colis, intact : douze Cisoa Pomme-Poire. Direction Jourdanfritte !")}}
 else await say(A,"Il est toujours là… Reviens quand tes Lumons seront en forme. Et VITE !");setObj()}
async function captainScene(){const f=F(),C='Captain';f.captain=1;const sp=freeNear(3)||freeNear(2)||[player.x+1,player.z];const c=await tempChar('captain',sp[0],sp[1],'left');c.keyName='captain';c.k=.01;c.place();await tween(300,q=>{c.k=q;c.place()});
 c.face(dirTo(c,player.x,player.z));player.face(dirTo(player,c.x,c.z));player.yawOv=null;sfx(110,.4,'sawtooth',.2);camShake(300,.15);
 await say(C,"HÉ ! TOI ! Ouais, toi ! Tu marches sur MA route !");await say(C,"…Hé hé hé. Non, j'rigole. Ou pas. J'sais plus. Ça dépend des jours.");
 await say(C,"Attends… cette tête… T'es le gamin de la cale ?! Le môme qui traînait avec nous au port ! HAHAHA ! Regarde-toi, avec ta veste de rockeur !");
 await say(C,"T'as cogné les Kétosaures de Snow, à ce qu'il paraît. Pfff. Snow me doit de l'argent. BEAUCOUP d'argent. Ses fumigènes, ses concerts… tout ça, c'est NOTRE marchandise.");
 await say(C,"Et la petite Luciole… T'APPROCHES PAS D'ELLE. C'EST CLAIR ?!");await say(C,"…Pardon. J'ai crié. Krakapitaine, viens dire bonjour au gamin.");S.dex.seen.krakapitaine=1;
 await say('Pirate Bob',"Capitaine ! J'arrive, Capitaine ! À deux contre lui !");await say(C,"À DEUX ! Comme au bon vieux temps ! Sors tes deux meilleurs Lumons, gamin !");
 const res=await battle({duo:alive().length>=2?2:0,music:'boss',trainer:{name:'Captain et Pirate Bob',key:'captain',boss:1,smart:.55,prize:300,mons:[mkMon('pigeolet',14),mkMon('krakapitaine',16),mkMon('pigeolet',13)],win:"HAHAHA ! T'es fou, toi ! J'aime bien les fous !",lose:"Retourne à la cale, moussaillon ! HAHAHA !"}});
 if(res!=='win'){f.captain=0;killTemp(c);return}
 await say(C,"On se reverra, gamin. Et ce jour-là, j'serai peut-être de bonne humeur. Ou pas. Hé hé.");await tween(400,q=>{c.k=1-q;c.place()});killTemp(c);unlock('captain');setObj()}
