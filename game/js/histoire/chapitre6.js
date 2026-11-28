/* ---- Chapitre 6 : Namuroc, la ville des deux rivières ----
   Le Baron est tombé, mais d'où venait son Éclat ? Les comptes du coffre mènent à la « Compagnie Grognon », à Namuroc :
   officiellement des visites des souterrains de la Citadelle, en vrai une mine d'Éclat brut où des Lumons creusent de force.
   L'histoire réagit aux liens : Luciole (cœur / complice / distante) et Alex (réglo / combines).
   1. Route 6 (f.r6) : l'agent Verhaegen et les comptes du Baron ; Luciole selon la voie.
   2. Sous le viaduc (f.givrale) : Givrâle, le Lumon de Snow, en manque de Poudre. L'aider (f.givAide) change la Citadelle.
   3. Namuroc (f.namu) : appel d'Alex -> Factures Wagner (réglo) ou Carnet de livraisons (combines).
   4. Halle des Échasseurs : joute d'échasses (mini-jeu, f.joute) puis Théo, type Vol (f.badge4, Médaille Citadelle).
   5. Téléphérique -> Citadelle : Snow (f.cita). 6. Souterrains : énigme des herses (f.herseOK), Hector Grognon (f.ch6done). */
CH.theo={skin:'#e8c4a0',hair:'#c8902a',hs:'curly',shirt:'#f6c80f',stripes:1,stripeC:'#d8232a',pants:'#2b2b33',boots:'#5a3a22',eye:'#3a6a8a'};
CH.grognon={skin:'#f0c8a8',hair:'#8a8a8a',hs:'horseshoe',beard:1,beardC:'#9a9a9a',shirt:'#f4f0e8',jacket:'#2a3a2a',collar:1,tie:'#a04ae8',pants:'#2a3a2a',boots:'#1a1a1a',bw:1.2,glasses:1,eye:'#5a4a3a'};
const SOUT_DATES=['1816','1542','1631'];   // herses : la plus ancienne d'abord -> 1542, 1631, 1816
Object.assign(ICON,{factures:icoB('#f4f0e8','#2a3a5a','€'),carnetalex:icoB('#3a2a20','#f6c80f','✎'),medcitadelle:icoB('#f6c80f','#d8232a','★')});
Object.assign(ITEMS,{
 factures:{n:'Factures Wagner',d:"Trois factures de camions vendus à la Compagnie Grognon, payés en liquide. Alex les a sorties de son classeur « pour la police ». Une preuve.",price:0,quest:1},
 carnetalex:{n:'Carnet de livraisons',d:"Le carnet d'Alex : des livraisons de nuit pour la Compagnie Grognon. Une page cornée : « entrée de service : la vieille poudrière ». Il sait ce qu'il a fait.",price:0,quest:1}});
function ch6Obj(){const f=F();if(f.ch6done)return ch7Obj();
 if(!f.r6)return"La route du sud de Liègenoir (derrière l'arène) mène à Namuroc : prends la Route 6, le long de la Meuse";
 if(!f.givrale)return"Descends la Route 6, le long de la Meuse";if(!f.namu)return"Continue la Route 6 jusqu'à Namuroc";
 if(!f.badge4)return f.joute?"Défie Théo, le maître de la Halle des Échasseurs (arène type Vol)":"Défie l'arène de Namuroc : la Halle des Échasseurs, au nord-est de la place d'Armes";
 if(!f.cita)return"Prends le téléphérique (ouest de la place) : Snow t'attend à la Citadelle";
 if(!f.herseOK)return"Entre dans la Terra Nova de la Citadelle : les souterrains de la Compagnie Grognon";
 return"Au fond des souterrains, arrête Hector Grognon"}
// ---- Liègenoir : la sortie sud
async function lieSud(){const f=F();if(!f.ch5done){await say('',"Une ruelle derrière l'arène. Deux Kétosaures montent la garde : « Personne ne sort de Liègenoir sans l'accord du Baron. » Pas maintenant.");player.face('up');return}
 await goMap(ROUTE6,10,1,'down')}
// ---- 1. Route 6
async function r6Entree(){const f=F();f.r6=1;setObj();const A='Agent Verhaegen';
 const[x,z]=lucFree(cur,player.x+1,player.z+1);const ag=await tempChar('agent',x,z,'up');ag.face(dirTo(ag,player.x,player.z));
 await say(A,"Te voilà ! L'inspecteur Lambert m'a envoyé les comptes du coffre du Baron. Ma sœur dirait que c'est « fascinant ». Moi, je dirais que ça pue.");
 await say(A,"Quarante tonnes d'Éclat brut, achetées en deux ans à une seule société : la Compagnie Grognon, à Namuroc. Officiellement, elle organise des visites des souterrains de la Citadelle.");
 await say(A,"Hector Grognon. Un notable. Il dîne avec des députés, il finance la fanfare, il a même sa statue en chocolat aux Fêtes de Wallonie. Sans preuve, je ne peux rien contre lui.");
 await say(A,"Et Snow est parti vers Namuroc, lui aussi. Fais attention. Un homme qui n'a plus rien à perdre, c'est le pire genre d'homme.");
 await tween(500,q=>{ag.k=1-q;ag.place()});killTemp(ag);
 const v=lienVoie('luciole');
 if(v==='froid'){await say('',"Un SMS s'affiche sur ton téléphone. Numéro inconnu. « Namuroc. Fais gaffe à toi. — L. » Rien d'autre.");setObj();return}
 const[x2,z2]=lucFree(cur,player.x-1,player.z+1);const lu=await tempChar('luciole',x2,z2,'up');lu.face(dirTo(lu,player.x,player.z));
 if(f.lucCouple){await say('Luciole',"Hé. T'allais partir sans moi ? …Ne fais pas cette tête. J'ai pris ma brosse à dents et deux paquets de gaufres. On est partis.");
  await say('Luciole',"Mon père a appelé. Il dit que des péniches pleines de pierres mauves descendent la Meuse, la nuit. Vers le sud. Il veut les aborder. Je lui ai dit d'attendre. De T'attendre.")}
 else if(v==='coeur'){await say('Luciole',"Je savais que tu prendrais cette route. Tu prends toujours la route la plus dangereuse. C'est agaçant. …Et un peu rassurant.");
  await say('Luciole',"Mon père dit que des péniches pleines de pierres mauves descendent la Meuse, la nuit. Il veut les aborder. Les Pirates contre une société cotée en bourse. Ça va mal finir.")}
 else{await say('Luciole',"Yo, le rockeur ! Route 6, la vallée de la Meuse. Il paraît qu'il y a des grimpeurs complètement tarés sur les rochers. Ça te ressemble.");
  await say('Luciole',"Mon vieux a vu des péniches pleines de pierres mauves sur la Meuse. Il veut jouer au pirate. Enfin, plus que d'habitude.")}
 await lienChoix('luciole','Luciole',"…Bon. On y va ?",[["Ensemble. Comme d'hab.",'coeur',1,"Comme d'hab. J'aime bien quand tu dis ça."],["Dernier à Namuroc paie les frites !",'ami',1,"T'es sérieux ? …Prépare ton portefeuille."],["Je préfère y aller seul.",'froid',-1,"…Ok. Comme tu veux. On se verra là-bas. Peut-être."]]);
 await tween(500,q=>{lu.k=1-q;lu.place()});killTemp(lu);setObj()}
async function dylanTalk(){const f=F(),N='Dylan, ancien Kétosaure';
 if(f.dylan){await say(N,"Quatre-vingt-dix-sept jours sans Poudre. Je compte. Rudy, à Charleroc, il dit que compter, ça aide. Il a raison.");return}f.dylan=1;
 await say(N,"T'inquiète, je mords plus. J'ai rendu ma veste mauve le jour où le Baron est tombé. Je dors sous le viaduc depuis. C'est pas le Ritz, mais c'est à moi.");
 await say(N,"Tu sais ce qui est le plus dur ? Pas le manque. Le manque, ça passe. C'est le silence après. Quand t'as plus rien à faire de tes mains.");
 const c=await choose('',"Que lui réponds-tu ?",["Je connais ça. Ça va passer.","Trouve-toi un Lumon. Ça occupe les mains.","Pas mon problème."]);
 if(c===0){await say(N,"…T'as l'air de savoir de quoi tu parles. Merci, frère. Tiens, prends ça : j'en ai plus besoin.");give('titzvel',3);await say('',"Tu repenses au squat, à la rue, aux mains qui tremblent. C'était il y a longtemps. Laïka te pousse la main avec sa truffe.")}
 else if(c===1){await say(N,"Un Lumon… Ouais. Peut-être. Un Escargolin, tiens. Ça va pas vite, mais ça lâche jamais. Comme moi, maintenant.");give('titzvel',2)}
 else await say(N,"Ouais. Je sais. C'est le problème de personne. C'est bien pour ça qu'on tombe.")}
// ---- 2. Givrâle sous le viaduc
async function givraleScene(){const f=F();f.givrale=1;player.walking=false;
 await say('',"Sous le viaduc, quelque chose grelotte dans l'ombre. Un loup de glace, maigre, les yeux encore un peu violets. Givrâle. Le Lumon de Snow.");
 await say('',"Il tremble de partout. Il ne t'attaque pas. Il n'en a pas la force. Il est en manque de Poudre.");
 await say('',"Tu connais ce regard. Les mains qui tremblent, le froid qui vient de l'intérieur, la honte. Tu l'as vu dans le miroir, il y a longtemps. Laïka gémit doucement.");
 const spa=S.bag.spa?'spa':S.bag.titzvel?'titzvel':null;
 const opts=["Rester avec lui, sans rien dire.",spa?`Lui donner ${ITEMS[spa].de||'de l\''+ITEMS[spa].n}.`:"Partager ton sandwich avec lui.","Le capturer pendant qu'il est faible."];
 const c=await choose('',"Que fais-tu ?",opts);
 if(c===2){f.givAide=0;await say('',"Tu sors une Lumisphère. Givrâle te regarde. Laïka se met entre vous deux et grogne. Contre toi. Pour la première fois.");
  await say('',"Givrâle se relève dans un dernier effort et s'enfuit vers le sud. Laïka ne te regarde pas pendant un long moment.");setObj();return}
 f.givAide=1;
 if(c===1&&spa){S.bag[spa]--;if(!S.bag[spa])delete S.bag[spa];await say('',`Il boit, lentement. Puis il pose sa tête sur tes bottes.`)}
 else if(c===1)await say('',"Il renifle le sandwich, hésite… et le mange en trois secondes. Laïka fait semblant de ne pas être jalouse.");
 else await say('',"Tu t'assois contre le pilier. Tu ne dis rien. Laïka se couche contre lui pour le réchauffer. Au bout d'un long moment, il arrête de trembler.");
 await say('',"Un sifflement, au loin, vers le sud. Givrâle dresse les oreilles. Il te regarde une dernière fois, puis il file le long de la Meuse. Vers Namuroc. Vers Snow.");
 await say('',"Ça passe. Pas vite. Mais ça passe.");setObj()}
// ---- 3. Namuroc
async function namuArrivee(){const f=F();f.namu=1;await banner('Namuroc','La ville des deux rivières',2600);
 await say('',"Des drapeaux jaunes et rouges sur toutes les façades : la ville prépare les Fêtes de Wallonie. Sur la place, des gamins s'entraînent à marcher sur des échasses.");
 await say('',"Mais sous les pavés, quelque chose gronde. Comme des pioches. Et là-haut, sur son rocher, la Citadelle regarde la ville.");
 // l'appel d'Alex : la suite dépend de la voie (réglo / combines)
 phoneOn([['Alex','alex']]);const v=lienVoie('alex'),A='Alex (au téléphone)';
 await say(A,"Allô ? C'est Alex. Écoute, j'ai entendu parler de Namuroc. De la Compagnie Grognon. Faut que je te dise un truc.");
 if(v==='combine'){await say(A,"Le Baron m'achetait des voitures. Grognon aussi. Et des fois… je livrais des « colis » avec. Sans ouvrir le coffre. Je voulais pas savoir.");
  await say(A,"J'ai mon carnet de livraisons. Les adresses, les dates. Et l'entrée de service des souterrains : la vieille poudrière, sous la Citadelle. Je te l'envoie à la Maison des Lumons.");
  const k=await lienChoix('alex','Alex',"…Tu me détestes, hein ?",[["T'as fait une connerie. Là, tu la répares.",'honnete',2,"…Ouais. Ouais, t'as raison. Merci de pas raccrocher."],["Tant que ça rapporte, moi je juge pas.",'combine',1,"T'es un vrai, toi. …Mais là, ça me rapporte rien. Ça me fait juste mal au ventre."]]);
  give('carnetalex')}
 else{await say(A,"La Compagnie Grognon a acheté trois camions chez moi l'an dernier. Payés en liquide. J'ai trouvé ça louche, j'ai refusé de livrer le quatrième.");
  await say(A,"J'ai gardé les factures. Toutes. Le nom de Grognon est dessus, sa signature aussi. Je les envoie à la Maison des Lumons, pour toi et pour l'agent Verhaegen.");
  await lienChoix('alex','Alex',"Je fais bien, hein ?",[["T'es un homme bien, Alex.",'honnete',2,"Arrête, je vais pleurer dans ma cravate. …Merci, mon ami."],["T'aurais pu les revendre à Grognon, ces factures.",'combine',1,"…Je l'ai pensé. Une seconde. Puis j'ai pensé à toi."]]);
  give('factures')}
 phoneOff();setObj()}
async function telepherique(){const f=F();
 if(!f.badge4){await say('Préposé du téléphérique',"Le téléphérique de la Citadelle est réservé. Ordre de la Compagnie Grognon. Seuls les échasseurs peuvent y monter… ou quelqu'un qui a une médaille d'arène. T'en as une de Namuroc ?");return}
 await say('',"La cabine rouge grince, puis s'élève au-dessus des toits. La Meuse brille en dessous. Laïka colle sa truffe à la vitre.");await goMap(CITA,7,9,'up');
 if(!f.citaVu){f.citaVu=1;await banner('La Citadelle','Sept kilomètres de souterrains',2200)}}
async function pontJambes(){const f=F();if(!f.ch6done){await say('',"Le pont de Jambes. De l'autre côté, la route des forêts d'Ardenne. Mais tu as encore à faire à Namuroc : la Citadelle t'attend.");player.face('up');return}
 await goMap(ROUTE7,10,1,'down')}
// ---- 4. Halle des Échasseurs : la joute puis Théo
function jouteJeu(){return new Promise(res=>{let ov=$('joute');if(!ov){ov=document.createElement('div');ov.id='joute';ov.className='ov';document.body.appendChild(ov)}
 let x=0,v=0,t=15,done=false,last=performance.now();const L=95;
 const draw=()=>{ov.innerHTML=`<div class="panel stp"><div class="dnat">🎪 Joute d'échasses — garde l'équilibre !</div><div class="dnah">Ne tombe pas pendant 15 secondes. ⏱ ${Math.ceil(t)} s</div>
  <div style="position:relative;height:34px;margin:14px 6px;border-radius:17px;background:linear-gradient(90deg,#d8232a 0 12%,#f6c80f 12% 30%,#3fe08a 30% 70%,#f6c80f 70% 88%,#d8232a 88%)">
  <i style="position:absolute;top:-6px;left:calc(${50+x/2}% - 9px);width:18px;height:46px;border-radius:9px;background:#fff;box-shadow:0 0 8px #000"></i></div>
  <div class="stk"><button class="btn jtb" data-p="g">◀ Penche à gauche</button><button class="btn jtb" data-p="d">Penche à droite ▶</button></div></div>`;
  ov.querySelectorAll('.jtb').forEach(b=>b.onclick=()=>{if(done)return;v+=b.dataset.p==='g'?-26:26;sfx(400,.04,'triangle',.06)})};
 const end=ok=>{if(done)return;done=true;clearInterval(iv);ov.innerHTML=`<div class="panel stp"><div class="dnat">${ok?'✦ Toujours debout !':'… Patatras !'}</div><div class="dnah">${ok?"Théo est tombé avant toi. La Halle applaudit.":"Tu tombes dans la paille. Les gamins rigolent. Allez, on remonte !"}</div></div>`;
  setTimeout(()=>{hide('joute');res(ok)},1400)};
 const iv=setInterval(()=>{const now=performance.now(),dt=Math.min(.1,(now-last)/1000);last=now;if(done)return;t-=dt;
  const vent=(Math.sin(now/700)+Math.sin(now/310)*.6)*(1.2+(15-t)*.12);v+=(x*.9+vent*9)*dt*3;v*=.93;x+=v*dt*2.2;
  if(Math.abs(x)>=L*1.05){end(false);return}if(t<=0){end(true);return}draw()},60);draw();show('joute')})}
async function theoTalk(){const f=F(),M='Théo, maître de la Halle';
 if(f.badge4){await say(M,f.ch6done?"Grognon en prison et la Citadelle rendue aux Namurois ! Cette année, aux Fêtes de Wallonie, je te réserve une paire d'échasses. Taille rockeur.":"La Médaille Citadelle t'ouvre le téléphérique. Là-haut, Snow t'attend. Ne tombe pas. Ni des échasses, ni ailleurs.");return}
 if(!f.joute){await say(M,"Bienvenue à la Halle des Échasseurs ! Ici, on ne se bat pas tout de suite. D'abord, on monte sur des échasses. Si tu tiens debout plus longtemps que moi, on parle combat.");
  await say(M,"Les règles : le vent te pousse, tu te penches de l'autre côté. Pas trop, sinon tu tombes de l'autre côté. C'est comme la vie, mais en plus haut.");
  const ok=await jouteJeu();if(!ok){await say(M,"Hé hé ! Tout le monde tombe la première fois. Même moi. Surtout moi, en fait. Reviens quand tu veux !");return}
  f.joute=1;await say(M,"…Je suis tombé ?! Moi ?! Devant les gamins ?! Bon. Bon bon bon. Tu tiens debout, le rockeur. Maintenant, voyons si tes Lumons volent.");setObj()}
 else await say(M,"Revanche ! Mais pas sur des échasses, hein. Mes genoux ne s'en remettraient pas.");
 const res=await battle({trainer:{name:'Théo, maître de la Halle',key:'theo',smart:.62,prize:240,mons:[mkMon('echassor',35),mkMon('hannetonne',35),mkMon('pigeolet',35),mkMon('echassor',37)],win:"Tu voles plus haut que moi. Ça fait mal à l'orgueil, mais c'est beau à voir.",lose:"Le vent a tourné, l'ami. Remonte sur tes échasses et reviens !"}});
 if(res!=='win')return;f.badge4=1;S.badges=S.badges||[];if(!S.badges.includes('citadelle'))S.badges.push('citadelle');sfx(784,.15);sfx(1046,.3);
 await banner('Médaille Citadelle obtenue !',"Arène de Namuroc · le téléphérique t'est ouvert",2600);
 await say(M,"La Médaille Citadelle. Avec ça, le préposé du téléphérique te laissera monter. Grognon a réservé la Citadelle pour lui tout seul… mais une médaille d'arène, c'est la loi d'Ardenval.");setObj()}
// ---- 5. Snow à la Citadelle
async function snowCitadelle(){const f=F(),SN='Snow';if(f.cita){await say(SN,f.ch6done?"…Je suis encore là. Je regarde la Meuse. Je compte les jours. Va, le rockeur.":"La Terra Nova, à droite. L'entrée des souterrains. Grognon est en bas. Moi, je reste ici. Si je descends, je vais tout casser. Même ce qu'il faut pas.");return}
 f.cita=1;player.walking=false;const sn=NPC.snowC;sn.face(dirTo(sn,player.x,player.z));
 await say(SN,"Le rockeur. Évidemment. Tu sais que t'es plus fidèle que mon ombre ? Elle, au moins, elle disparaît la nuit.");
 await say(SN,"Regarde en bas. La Meuse, les toits, les petits drapeaux. Et sous tes pieds, sept kilomètres de tunnels. Grognon y fait creuser l'Éclat. Par des Lumons. Jour et nuit.");
 await say(SN,"C'est lui qui vendait la pierre au Baron. Et à d'autres. Moi, je vendais la poudre. On était une belle chaîne, hein ? Chacun son maillon. Personne de coupable.");
 if(f.givAide){await say('',"Givrâle sort de derrière Snow. Il a les yeux bleus, maintenant. Plus une trace de violet. Il trottine jusqu'à Laïka, et ils se reniflent comme de vieux amis.");
  await say(SN,"…Il est revenu cette nuit. Il avait plus froid. Il sentait ton chien. T'étais sous le viaduc, hein ?");
  await say(SN,"Moi, je voulais descendre et tout faire sauter. Les veines, les machines, Grognon. Mais… il y a des Lumons en bas. Comme lui. Et toi, tu t'es assis à côté de lui. Sans rien demander.");
  await say(SN,"J'arrête. La Poudre. Tout. Je sais pas comment on fait. Mais lui il l'a fait, alors…");
  const c=await choose(SN,"…Tu crois que c'est possible ?",["Oui. Un jour à la fois.","Ça sera dur. Mais t'es pas seul.","Je sais pas. Mais essaie."]);
  await say(SN,["Un jour à la fois. Ok. Je compte à partir d'aujourd'hui.","…Pas seul. Ça fait bizarre à entendre. Ok.","Ouais. J'essaie. C'est déjà pas mal, pour un type comme moi."][c]);f.snowClean=1}
 else{await say(SN,"Givrâle est revenu cette nuit. Il tremblait encore. Il m'a regardé comme si c'était ma faute. C'est ma faute.");
  await say(SN,"Je vais descendre et tout faire sauter. Les veines, les machines, Grognon. Et tant pis pour ce qu'il y a dedans. Pousse-toi, le rockeur. …Non ? Alors on règle ça ici.");
  const res=await battle({music:'ketoboss',trainer:{name:'Snow',key:'snow',boss:1,smart:.7,prize:200,mons:[bossMon('givrale',38),mkMon('smogule',36),mkMon('cokelin',37)],
   win:"…T'as raison. Faire sauter des Lumons pour en sauver d'autres. Je suis devenu le Baron sans m'en rendre compte.",lose:"Rentre chez toi. Je m'occupe de Grognon."}});
  if(res!=='win'){f.cita=0;return}
  await say(SN,"Ok. Ok. Je descends pas. C'est toi qui y vas. Sans explosifs. Avec ton chien et ta lumière débile.")}
 await say(SN,"La Terra Nova, à droite. Derrière la porte, l'escalier des souterrains. Les herses sont gravées de dates. L'histoire d'abord, comme ils disent.");setObj()}
async function souterrainsPorte(){const f=F();if(!f.cita){await say('',"Une porte blindée flambant neuve dans un vieux mur. « COMPAGNIE GROGNON — ACCÈS INTERDIT ». Quelqu'un t'attend sur l'esplanade.");return}
 if(f.ch6done){await say('',"Les scellés de la police ferment la porte. « Souterrains de la Citadelle : visites à nouveau ouvertes au public à partir du printemps. »");return}
 if(S.bag.carnetalex&&!f.poudriere){f.poudriere=1;await say('',"Tu ouvres le carnet d'Alex à la page cornée : « entrée de service : la vieille poudrière ». Une petite porte, à côté de la grande. Elle n'est même pas fermée.");
  await say('',"Tu passes par là. Le garde de l'entrée principale ne te verra jamais.");F().gardeS1=1}
 await goMap(SOUT,6,13,'up');if(!f.soutVu){f.soutVu=1;await say('',"Il fait humide et froid. Au loin, le bruit des pioches. Et des petits cris de Lumons fatigués.")}}
async function herse(k){const f=F(),m=SOUT,H=m.herses[k],ordre=[1,2,0];f.herses=f.herses||0;
 if(f.herseOK){await say('',"La herse est levée.");return}
 if(ordre[f.herses]===k){f.herses++;sfx(220,.3,'sawtooth',.1);await tween(600,q=>H.o.position.y=q*1.9);setSolid(m,H.x,9,0);
  await say('',`La herse de ${SOUT_DATES[k]} se lève dans un grincement.`);if(f.herses>=3){f.herseOK=1;await say('',"Les trois herses sont levées. Le couloir continue vers le fond, vers la lumière mauve.");setObj()}}
 else{f.herses=0;sfx(90,.4,'square',.15);camShake(300,.12);await say('',"CLANG ! Toutes les herses retombent d'un coup. Mauvais ordre. « L'histoire d'abord » : la plus ancienne en premier.");
  for(const h of m.herses){h.o.position.y=0;setSolid(m,h.x,9)}}}
// ---- 6. Hector Grognon
async function grognonScene(){const f=F(),G='Hector Grognon';if(f.ch6done)return;if(!f.herseOK){await say('',"Les herses te barrent la route.");return}player.walking=false;
 const gr=NPC.grognon;gr.face(dirTo(gr,player.x,player.z));
 await say(G,"Tiens tiens. Le petit rockeur d'Ixellette. Vous savez que vous êtes sur une propriété privée ? Classée au patrimoine, en plus. Essuyez vos bottes.");
 await say('',"Derrière lui, une dizaine d'Escargolin traînent des chariots d'Éclat. Ils ont des petites lampes frontales et l'air épuisé. L'un d'eux s'est endormi sur sa pioche.");
 await say(G,"Ne faites pas cette tête. Je ne fabrique rien de mal, moi. Je vends de la pierre. Ce que les clients en font, ça les regarde. Le Baron en faisait de la poudre. D'autres en font… mieux.");
 const res=await battle({music:'boss',trainer:{name:'Hector Grognon',key:'grognon',boss:1,smart:.68,prize:400,mons:[mkMon('citadescar',38),mkMon('anguimeuse',38),mkMon('perronrat',39),mkMon('echassor',40)],
  win:"Impossible… Battu par un chevelu avec un chien.",lose:"Dehors. Et n'oubliez pas de payer la visite en sortant."}});
 if(res!=='win')return;
 await say(G,"Bon. Bon bon bon. Vous avez gagné un combat. Bravo. Mais vous n'avez aucune preuve. Mes avocats…");
 const[x,z]=lucFree(cur,player.x+1,player.z);const ag=await tempChar('agent',x,z,'up');ag.face(dirTo(ag,gr.x,gr.z));const A='Agent Verhaegen';
 if(S.bag.factures)await say(A,"Vos avocats liront ça : trois factures de camions, signées de votre main, payées en liquide. Les mêmes camions que ceux qui livraient la Cokerie du Baron. Merci, Monsieur Wagner.");
 else if(S.bag.carnetalex)await say(A,"Vos avocats liront ça : un carnet de livraisons. Dates, adresses, poids. Un témoin qui accepte de parler. Il a du courage, votre ancien chauffeur.");
 else await say(A,"Vos avocats regarderont ces Lumons, dans votre mine. Épuisés, marqués. Une preuve vivante. Et dix témoins à quatre pattes.");
 await say(A,"Hector Grognon, vous êtes en état d'arrestation pour exploitation illégale de Lumons, trafic d'Éclat et complicité avec le Baron de Liègenoir.");
 await say(G,"Vous croyez que je suis le sommet ? Pauvre petit agent. Je vends de la pierre. Ceux qui en font des monstres, ce sont les chercheurs de la Fondation Ardenne, à Bastognac.");
 await say(G,"Demandez donc à votre chère sœur. La Professeure Verhaegen. Elle y a travaillé, à la Fondation. Ah, elle ne vous l'a jamais dit ?");
 await say('',"L'agent Verhaegen ne répond rien. Il passe les menottes à Grognon. Ses mains tremblent un peu.");
 await say('',"Les Escargolin posent leurs pioches, un par un. Le plus petit rampe jusqu'à toi, très lentement, et se colle contre ta botte. Il a décidé qu'il venait avec toi. À son rythme.");
 const m=mkMon('escargolin',32);m.iv=[31,31,20,15];calc(m);m.hp=m.mhp;S.dex.seen.escargolin=S.dex.caught.escargolin=1;const w=receiveMon(m);sfx(784,.15);await banner('Escargolin rejoint ton équipe !',w==='box'?'Envoyé au PC de stockage (ton équipe est pleine)':'Il avance lentement. Mais il ne lâche jamais.',2400);
 await tween(500,q=>{ag.k=1-q;ag.place()});killTemp(ag);gr.show(false);
 f.ch6done=1;saveGame();await banner('Chapitre 6 terminé','La Citadelle est libre · la Fondation Ardenne t\'attend à Bastognac',3200);
 await chapitre6Fin();setObj()}
async function chapitre6Fin(){const f=F(),P='Prof. Verhaegen (au téléphone)';phoneOn([['Prof','prof']]);
 await say(P,"{P}… Mon frère m'a appelée. Il m'a dit ce que Grognon a raconté. Sur moi. Sur la Fondation.");
 await say(P,"C'est vrai. J'y ai travaillé, il y a quinze ans. On étudiait l'Éclat pour soigner les Lumons malades. C'est là que j'ai eu l'idée du Fusionneur.");
 await say(P,"Puis un jour, la directrice a voulu « améliorer » les Lumons. Les rendre plus forts, plus obéissants. J'ai démissionné. J'ai cru que ça suffisait. Je me suis trompée.");
 await say(P,"Va à Bastognac. Prends la Route 7, de l'autre côté du pont de Jambes. Et… pardonne-moi de ne pas te l'avoir dit plus tôt.");phoneOff()}
