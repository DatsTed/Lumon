async function gerardSphere(){const f=F(),G='Mineur Gérard';f.sphereGot=1;const sp=freeNear(3)||freeNear(2)||[player.x+1,player.z];const c=await tempChar('miner',sp[0],sp[1],'down');c.k=.01;c.place();await tween(300,q=>{c.k=q;c.place()});c.k=1;
 c.face(dirTo(c,player.x,player.z));player.face(dirTo(player,c.x,c.z));player.yawOv=null;
 await say(G,"Hé ! Toi, là ! T'es le petit protégé de la Prof Verhaegen ? Celui avec la grosse chienne ? On parle que de toi sur la grande place.");
 await say(G,"Ce matin, au fond du vieux puits Sainte-Barbe, j'ai trouvé ça. Une Lumisphère… mais pas une normale. Elle brille toute seule, et elle est chaude comme un poêle.");
 sfx(660,.1,'triangle',.12);sfx(990,.2,'triangle',.12);flashScr('#3ef0ff',400,.35);
 await say(G,"Les anciens disaient qu'on trouvait de l'Éclat dans la mine, autrefois. Moi j'y connais rien. Mais la Prof, elle, saura quoi en faire.");
 await say(G,"Tu peux la lui ramener, à Ixellette ? Moi je redescends plus la Route 1, mes genoux sont en charbon.");
 give('sphereEclat');await banner("Lumisphère d'Éclat",'Objet de quête · à rapporter au labo de la Prof',2000);
 await say(G,"Rien ne presse, hein. Fais d'abord tes affaires ici, l'arène, tout ça. Mais la perds pas, surtout !");
 await tween(300,q=>{c.k=1-q;c.place()});killTemp(c);setObj()}
async function gateTalk(){const f=F(),N='Gardien Émile';if(f.gate1){await say(N,"La barrière est ouverte, fieu. Charleroc, c'est tout droit !");return}
 if(!f.gateMet){f.gateMet=1;await say(N,"Halte ! Cette barrière, c'est celle de l'ancienne mine Sainte-Barbe. Elle ne s'ouvre qu'avec le code des gueules noires.");await say(N,"Trois chiffres. Les anciens les ont cachés sur la Route 1 : un sur un vieux panneau, un auprès d'un dresseur, et un près de l'étang. Trouve-les, et je t'ouvre.")}
 const n=[f.clue1,f.clue2,f.clue3].filter(Boolean).length;if(n<3){await say(N,`Tu as trouvé ${n} indice${n>1?'s':''} sur trois. Cherche encore : un vieux panneau, un dresseur, et l'étang.`);if(!n)return}
 const c=await choose(N,"Alors, tu tentes le code ?",["Oui","Pas encore"]);if(c)return;const code=[];
 for(const lab of['Premier','Deuxième','Troisième']){const i=await pickList(`${lab} chiffre`,[0,1,2,3,4,5,6,7,8,9].map(d=>({html:`<span class="grow" style="font-size:20px;text-align:center"><b>${d}</b></span>`})),false);code.push(i)}
 if(code.join('')==='731'){sfx(392,.15);sfx(523,.15);sfx(784,.4);await say(N,"7… 3… 1. C'est ça ! Le puits n°7, les trois terrils, l'étang unique. T'es un vrai Carolo dans l'âme, toi !");f.gate1=1;refreshNPCs();await banner('Barrière ouverte !','La route de Charleroc est libre',2000);unlock('code')}
 else await say(N,`${code.join('-')} ? Non non non. Relis bien tes indices, et reviens me voir.`)}
async function ketoApproach(key){const sp=freeNear(3)||freeNear(2);if(!sp)return null;const c=await tempChar(key,sp[0],sp[1],dirTo({x:sp[0],z:sp[1]},player.x,player.z));
 c.k=.01;c.place();await tween(250,q=>{c.k=q;c.place()});c.k=1;const ex=new THREE.Group();tp(ex,BOXG,'#a04ae8',0,.18,0,.08,.26,.08);tp(ex,SPH,'#a04ae8',0,-.02,0,.05,.05,.05);ex.position.y=1.8;c.g.add(ex);sfx(1200,.15);await sleep(600);c.g.remove(ex);
 while(Math.abs(c.x-player.x)+Math.abs(c.z-player.z)>1){const nx=c.x+Math.sign(player.x-c.x),nz=nx!==c.x?c.z:c.z+Math.sign(player.z-c.z);if(!walkable(cur,nx,nz)||(nx===player.x&&nz===player.z))break;c.face(dirTo(c,nx,nz));await c.step(nx,nz,5)}
 c.face(dirTo(c,player.x,player.z));player.face(dirTo(player,c.x,c.z));player.yawOv=null;return c}
const KETO_LINES=["Yo, bouge pas ! T'as pas croisé un dresseur qui veut de la « poudre de lune » ? Non ? Alors tu vas goûter à mes Lumons !","Hé, toi ! Cette route, c'est le territoire des Kétosaures maintenant. Faut payer le passage, une fois !","Snow prépare son grand concert, et toi tu traînes dans nos pattes ? Allez, viens, on règle ça !"];
async function ketoBattle(c,lines,mons,name){await say(name,lines);const res=await battle({trainer:{name,key:c?c.keyName:'keto',smart:.25,prize:60,mons,win:"Pfff… Tu vas voir quand Snow va apprendre ça…",lose:"Hé hé ! Les Kétosaures, on rigole pas avec !"}});return res}
async function ketoFirst(){const f=F();f.keto1=1;f.ketoCd=60;const c=await ketoApproach('keto');if(!c)return;c.keyName='keto';const N='Sbire Kétosaure';
 await say(N,"Ohé, le rockeur ! Ouais, toi, avec ta chienne. Tu sais à qui t'as affaire ? On est les Kétosaures, fieu. Le crew de Snow.");
 await say(N,"Snow, c'est le roi de la nuit d'Ardenval. Ses concerts, sa musique… et le reste, si tu vois ce que je veux dire.");
 await say(N,"Et si un jour tu croises Luciole, sa protégée… baisse les yeux. Personne ne la regarde en face.");
 await say('',"Tu vois très bien. Les sachets dans sa sacoche, tu les connais. Tu as passé des années à t'en sortir.");
 const r=await ketoBattle(c,"Bon, assez parlé. On va voir si t'as les crocs !",[mkMon('pigeolet',6),mkMon('terrilou',7)],N);
 if(r==='win'){await say(N,"Ok, ok… T'es pas un touriste, toi. Mais on est partout, tu sais. Partout.");f.ketoN=1}
 await tween(300,q=>{c.k=1-q;c.place()});killTemp(c);setObj()}
async function ketoRandom(){const f=F();f.ketoCd=70+((rnd()*60)|0);const key=rnd()<.5?'keto':'keto2',c=await ketoApproach(key);if(!c)return;c.keyName=key;
 const lv=f.badge1?10:6,pool=[['pigeolet','hannetonne'],['terrilou','gaufrelin'],['scorion','pigeolet']][(rnd()*3)|0];
 const r=await ketoBattle(c,KETO_LINES[(rnd()*KETO_LINES.length)|0],pool.map((sp,i)=>mkMon(sp,lv+i)),'Sbire Kétosaure');if(r==='win')f.ketoN=(f.ketoN||0)+1;
 await tween(300,q=>{c.k=1-q;c.place()});killTemp(c)}
async function lucioleScene(){const f=F(),L='Luciole';player.face('up');
 await say('',"Au pied du vieux terril, le vent siffle. Là-haut, une silhouette fine, veste de cuir noire, cheveux courts. Une petite lueur verte danse à son cou.");
 const lu=await tempChar('luciole',8,1,'down');lu.k=.01;lu.place();sfx(180,.6,'sine',.15);setSong('memory');await tween(900,q=>{lu.k=q;lu.place()});await sleep(300);
 while(Math.abs(lu.x-player.x)+Math.abs(lu.z-player.z)>1){const nx=lu.x+Math.sign(player.x-lu.x),nz=nx!==lu.x?lu.z:lu.z+Math.sign(player.z-lu.z);if(!walkable(cur,nx,nz)||(nx===player.x&&nz===player.z))break;lu.face(dirTo(lu,nx,nz));await lu.step(nx,nz,3)}
 lu.face(dirTo(lu,player.x,player.z));player.face(dirTo(player,lu.x,lu.z));player.yawOv=null;
 await say(L,"…Tu te mêles de ce qui ne te regarde pas, {P}. Oui, je connais ton nom. Snow connaît tout le monde.");
 await say(L,"Tu crois que tu vas sauver Ardenval avec ta chienne et ta veste en cuir ? Montre-moi d'abord ce que vaut ta lumière.");
 setSong(cur.song);const res=await battle({trainer:{name:'Luciole',key:'luciole',boss:1,smart:.5,prize:200,mons:[mkMon('noctiluce',12)],win:"…Ta lumière est plus forte que je pensais.",lose:"Retourne dormir, petit rockeur."}});S.dex.seen.noctiluce=1;
 if(res!=='win'){killTemp(lu);return}
 await say(L,"Les Kétosaures m'ont recueillie quand je n'avais plus personne. Snow dit qu'il me protège… Je ne sais plus très bien de quoi.");
 await say(L,"Et il y a quelqu'un… quelqu'un de l'autre côté. Chez les Pirates. Si Snow l'apprenait…");await say(L,"Oublie ce que je viens de dire.");
 await say(L,"Ce soir, Snow donne un concert ici, à Charleroc, à l'est de la grande place. Va voir de quoi il est fait. Après, tu choisiras ton camp.");
 sfx(180,.6,'sine',.15);await tween(600,q=>{lu.k=1-q;lu.place()});killTemp(lu);f.luciole=1;refreshNPCs();
 await banner('Nouvelle quête','Le concert de Snow à Charleroc',2200);unlock('luciole');setObj()}
async function rapEvent(){const f=F(),M='MC Sambre';if(f.rap1){await say(M,"Le concert est fini, fieu. Mais Snow, lui, il t'a dans le viseur…");return}
 setSong('rap');await say('',"Des basses à faire trembler les terrils. Des lumières mauves. Une foule de Kétosaures en training qui hochent la tête…");
 await say(M,"Yo yo yo, Charleroc ! Ici MC Sambre, élite des Kétosaures, première partie du grand SNOW !");
 await say(M,"Et c'est qui, lui ? Le petit rockeur qui a fait pleurer nos sbires ? Monte sur scène, on va faire un battle. Lumons contre Lumons, rimes contre rimes !");
 const res=await battle({music:'rap',trainer:{name:'MC Sambre',key:'mcsambre',boss:1,smart:.55,prize:400,mons:[mkMon('scorion',11),mkMon('pigeolet',12),mkMon('sambrax',13)],win:"Quoi ?! Le micro m'a lâché… et mes Lumons aussi.",lose:"Retourne dans ta chambre, le rockeur !"}});
 if(res!=='win'){setSong(cur.song);return}
 f.rap1=1;await say('',"La musique s'arrête net. Un homme monte sur scène, torse nu, jean délavé, le regard ailleurs. À sa ceinture, une petite poche reliée à un tube…");
 await say('',"La kétamine lui a pris plus que ce qu'elle lui a donné. À côté de lui avance un grand loup de glace, presque transparent.");S.dex.seen.givrale=1;
 const sn=await tempChar('snow',26,15,'down');sn.k=.01;sn.place();await tween(600,q=>{sn.k=q;sn.place()});
 await say('Snow',"Pas mal, le rockeur. Pas mal du tout. Tu sais qui je suis ? Moi, c'est Snow. Ce soir, Charleroc danse pour moi. Demain, ce sera tout Ardenval.");
 await say('Snow',"Toi aussi, t'as connu la rue, hein ? Ça se voit dans tes yeux. On est pareils, toi et moi. Sauf que toi, t'as choisi la lumière… pour l'instant.");
 await say('Snow',"Si un jour tu croises Alias, l'avocat… dis-lui que Snow n'a rien oublié. Rien.");
 await say('Snow',"Givrâle, on y va. Bruxellia nous attend.");await tween(600,q=>{sn.k=1-q;sn.place()});killTemp(sn);setSong(cur.song);
 await banner('Chapitre 2 terminé !','Les Kétosaures, Luciole… et Snow',2600);unlock('snow');
 $('endH').textContent='Chapitre 2 terminé !';$('endTxt').innerHTML=`Tu as battu <b>MC Sambre</b> et rencontré <b>Snow</b>, le chef des Kétosaures.<br><br>Prochaine étape : redescendre à Ixellette rapporter la Lumisphère d'Éclat et montrer ta médaille à la Prof. La brume du nord se lève… La Route 2, Bruxellia, Alias l'avocat et les Pirates de Captain t'attendent.<br><br>Ton <b>journal de quêtes</b> (☰ Menu) garde la suite de l'histoire.`;
 show('endc');await new Promise(r=>$('endOk').onclick=()=>{hide('endc');r()});setObj()}
async function friteJosette(){const N=cur===JF?'Dédé le friturier':'Josette la friturière';const ks=['frites','fricadelle','mitraillette'];
 await say(N,cur===JF?"Bienvenue à la Friterie de la Place ! Ici, à Jourdanfritte, on fait les meilleures frites d'Ardenval. Les gens font la file jusqu'au bout de la place !":"Bienvenue chez Josette ! Ici, les frites, on les cuit deux fois dans le blanc de bœuf. Les Lumons en raffolent, et ça les requinque !");
 for(;;){const i=await pickList(`Friterie chez Josette · ${S.money} €`,ks.map(x=>({html:`${ico(x)}<span class="grow"><b>${ITEMS[x].n}</b> — ${ITEMS[x].price} €<br><small>${ITEMS[x].d} · Tu en as ${S.bag[x]||0}</small></span>`,dis:S.money<ITEMS[x].price})));if(i<0)break;S.money-=ITEMS[ks[i]].price;give(ks[i])}
 await say(N,"Et n'oublie pas : mayonnaise ou andalouse, mais jamais de ketchup sur mes frites, hein !")}
async function talkRudy(){const f=F(),N='Rudy';const st=f.rudy||0;
 if(st===0){await say(N,"…Hé. Hé, attends. Toi… t'étais au squat de la rue Haute, à Ixellette ! Avec ta petite chienne qui tremblait.");await say(N,"T'as l'air… bien. Propre. Moi j'y suis encore, tu vois. Les Kétosaures me vendent leur saloperie, et j'arrive pas à dire non.");
  await say(N,"J'voudrais m'en sortir. Comme toi. Mais j'ai la gorge en feu, j'ai rien bu depuis hier… T'aurais pas une Eau de Titvel ?");f.rudy=1;setObj();return}
 if(st===1){if(!(S.bag.titzvel>0)){await say(N,"Une Eau de Titvel… ça se trouve dans les boutiques, ou au Night White d'Ixellette. S'il te plaît, frère.");return}
  const c=await choose(N,"T'as une Eau de Titvel ? Tu me la donnes ?",["Donner l'Eau de Titvel","Pas maintenant"]);if(c)return;S.bag.titzvel--;f.rudy=2;
  await say(N,"…Merci. Ça fait du bien. Tu sais, personne m'a donné quelque chose sans rien demander en retour depuis longtemps.");
  await say(N,"Tu crois que… l'infirmière Josiane voudrait bien m'aider ? J'ose pas y aller tout seul.");const d=await choose(N,"Tu m'accompagnes à la Maison des Lumons ?",["On y va ensemble","Plus tard"]);if(d){setObj();return}}
 if(f.rudy===2){await fadeOut();NPC.rudy.show(false);await sleep(300);await fadeIn();await say('',"Tu accompagnes Rudy jusqu'à la Maison des Lumons. L'infirmière Josiane l'écoute longtemps, sans le juger.");
  await say('Infirmière Josiane',"Tu as bien fait de venir, Rudy. On va t'aider. Et en attendant, j'ai besoin de quelqu'un pour ranger les Lumisphères. Ça te dit ?");
  await say(N,"…Ouais. Ouais, ça me dit. Merci, {P}. Je l'oublierai pas.");f.rudy=3;give('supersirop',2);give('eclat_feu');unlock('rudy');if(NPC.rudyC)NPC.rudyC.show(true);setObj();return}
 await say(N,"Je tiens le coup, frère. Un jour à la fois.")}
async function ginetteTalk(){const G='Maître de Guilde Ginette';
 if(F().badge1){await say(G,"Ah, {P} ! Ma Médaille Terril te va très bien. Continue comme ça, et un jour tu deviendras Champion·ne d'Ardenval !");return}
 await say(G,"Alors c'est toi, le petit nouveau d'Ixellette ? Moi, c'est Ginette. Trente ans au fond de la mine, et pas une seule fois je n'ai reculé !");
 await say(G,"Mes Lumons sont durs comme les pavés de la Grand-Place. Montre-moi si tu as le cœur d'un vrai Carolo !");
 const res=await battle({trainer:{name:'Ginette',key:'ginette',smart:.5,prize:100,mons:[mkMon('scorion',9),mkMon('terrilou',11)],win:"Bon sang de bonsoir ! T'as gagné, et à la régulière. Je reconnais un vrai dresseur quand j'en vois un.",lose:"Pas encore assez costaud ! Va t'entraîner sur la Route 1 et reviens me voir."}});
 if(res!=='win')return;F().badge1=1;S.badges=['terril'];unlock('badge1');
 await say(G,"Voici la Médaille Terril. Elle prouve que tu as battu l'arène de Charleroc !");sfx(784,.15);sfx(988,.15);sfx(1318,.45);
 await banner('Médaille Terril obtenue !',`${S.name} a battu Ginette, Maître de Guilde de Charleroc`,2600);
 await say(G,"Et prends ça aussi : un Spéculoos de la meilleure boulangerie de la ville, et un Éclat terril. Avec ça, n'importe quel Lumon peut prendre la Forme Terril !");give('speculoos');await sleep(400);give('eclat_roche');
 await say(G,"Ah, et la Prof Verhaegen a appelé. Elle a laissé un colis pour toi à la Maison des Lumons. Va voir l'infirmière Josiane !");
 await say(G,"Et fais gaffe : les Kétosaures traînent de plus en plus dans Charleroc. Des petits jeunes en training mauve… Ils vendent des saletés aux gamins. Ça me fend le cœur.");
 await say(G,"Autre chose… Depuis quelques nuits, une fille en noir monte sur le vieux terril, au nord-ouest de la ville. Elle reste là, à regarder Charleroc. Les gamins disent qu'elle brille dans le noir. Si tu y vas, sois prudent·e.");F().lucHint=1;
 $('endH').textContent='Chapitre 1 terminé !';$('endTxt').innerHTML=`${ico('badge',48)}<br>Tu as obtenu la <b>Médaille Terril</b> !<br><br>Mais en sortant de l'arène, quelque chose t'attend sur la grande place…`;
 show('endc');await new Promise(r=>$('endOk').onclick=()=>{hide('endc');r()})}
