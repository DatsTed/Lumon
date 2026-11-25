async function nwIxCine(){const f=F(),Y='Younes',c=NPC.younesH,fi=NPC.fifi,X=NWSHOP.town.ox;f.nwCine=f.nwCine2=1;f.younesMet=1;setSong('lift');
 const savedPatrol=fi&&fi.patrol;if(fi){fi.patrol=[[2,4],[2,6]];fi.pi=0;fi.x=2;fi.z=5;fi.px&&(fi.px=2,fi.pz=5);fi.place();fi.snap&&fi.snap()}
 await moveTo(player,[[5,6],[5,5]],4);player.face('up');player.yawOv=null;if(follower){follower.x=4;follower.z=6;follower.px=4;follower.pz=6;follower.place();follower.snap&&follower.snap();follower.face('up')}
 c.x=9;c.z=4;c.place();c.snap&&c.snap();c.face('down');
 cineOn();const H=1.12;
 // 1. plan d'ensemble, depuis l'entrée
 camShot([X+5,3.3,10],[X+5,.9,3]);await say('',"♪ Une musique d'ascenseur douce et un peu kitsch flotte dans le magasin. Les frigos ronronnent. Ça sent le Spéculoos et le désinfectant au citron.");
 // 2. travelling sur Fifi qui range
 if(fi){track(fi,[.9,1.55,2.1],.95,.04);await say('',"Un employé fait des allers-retours devant les chips, un paquet à la fois, en fredonnant. Il les aligne au millimètre.",{auto:2600})}
 // 3. Younes derrière sa caisse (3/4 face)
 camShot([X+7.1,1.5,4.7],[X+9,H,4]);await say(Y,"Bienvenue au Night White d'Ixellette, le night shop haut de gamme ouvert vingt-quatre heures sur vingt-quatre, où chaque client est un roi, chaque canette une…",{auto:1400});
 sfx(900,.06,'square',.1);sfx(400,.15,'sawtooth',.1);
 // 4. zoom lent pendant qu'il se fige
 camShot([X+7.5,1.35,4.45],[X+9,H+.05,4],{move:true,sm:.35});await say(Y,"…");
 for(const d of['left','right','left','right','down']){c.face(d);sfx(700,.03,'square',.05);await sleep(d==='down'?650:420)}
 // 5. il contourne le comptoir et vient vers toi
 camShot([X+7.4,1.9,7.2],[X+6.5,.9,4.5]);await moveTo(c,[[8,4],[5,4]],4.2);c.face('down');
 // 6. champ / contrechamp
 const OTS_P=[X+5.75,1.85,6.9],OTS_Y=[X+5.3,2.05,3.15],PROF=[X+7.7,1.4,4.55];
 camShot(OTS_P,[X+5,H,4]);await say(Y,"Attends… attends attends attends. Cette tête. Cette veste. Cette façon de tenir sa chienne comme un sac de frites…");
 camShot(OTS_Y,[X+5,H-.05,5]);await say('',"Tu le regardes. Il te regarde. Quinze ans d'un coup.");
 camShot([X+6.25,1.3,5.0],[X+5,H,4]);await say(Y,"{P} ?! C'EST TOI ?! La formation d'animateur, il y a quinze ans ! Le camp de Bouillon !");
 camShot(PROF,[X+5,H-.1,4.5]);await say(Y,"Le grand jeu « Chasse aux Lumons » où t'avais perdu la moitié des gamins dans la forêt ! On les a retrouvés à la friterie du village, ils avaient tous pris une mitraillette !");
 camShot([X+6.25,1.35,4.0],[X+5,H,5]);await say('',"Younes. Le gars qui faisait des chansons à gestes pendant trois heures, même sous la drache. Toujours la même coupe courte, propre, impeccable. Il la touche toutes les dix secondes.");
 camShot(OTS_P,[X+5,H,4]);await say(Y,"Quinze ans, frère ! T'es devenu quoi ? … Non, laisse, je vois. T'as besoin d'un boulot. Ça se lit dans tes yeux comme un menu de friterie.");
 camShot(PROF,[X+5,H-.1,4.5],{move:true,sm:.3});await say(Y,"Ici, je suis responsable du magasin. Le Night White, c'est aux frères Nour et Amin. Si tu veux bosser, va voir Nour au Night White de Bruxellia. Ils recrutent jusqu'au Jour 200.");
 await say(Y,"Bruxellia ? Tu montes à Charleroc par la Route 1, puis la Route 2 tout au nord. Enfin… quand la brume de Snow voudra bien se lever.");
 camShot([X+6.25,1.3,5.0],[X+5,H,4]);camShot([X+5.9,1.22,4.75],[X+5,H+.03,4],{move:true,sm:.4,silent:true});
 await say(Y,"Et petit conseil, entre nous… Nour, c'est le GRAND frère. L'aîné. Le daron de la famille. Tu l'appelles « Monsieur Nour », et tu lui demandes des nouvelles de son petit frère Amin. Il adore. Fais-moi confiance.");
 camShot(OTS_Y,[X+5,H-.05,5]);await say('',"Younes a l'air très sérieux. Peut-être un peu trop sérieux.");
 // 7. Fifi s'incruste
 if(fi){fi.patrol=null;await moveTo(fi,[[2,5],[4,5]],4.5);fi.face('right')}
 camShot([X+3.7,1.45,6.9],[X+4.4,H-.1,4.7]);await say('Fifi le Firat',"Bonjour ! Moi c'est Fifi le Firat ! Fas Firate, hein. Firat. Avec un F. … Bon, bienvenue quand même !");
 camShot([X+5,2.6,8.6],[X+4.8,.9,4.4]);await say(Y,"C'est Fifi. Il a un cheveu sur la langue, il dit des F à la place des P. Ne lui demande jamais de dire « pépé ». Jamais.");
 cineOff();await moveTo(c,[[8,4],[9,4]],4.5);c.face('down');if(fi){fi.patrol=savedPatrol||[[3,2],[8,2],[8,4],[2,4]];fi.pi=0}
 unlock('nw');setSong(cur.song||'nw')}
async function nwIxCineOld(){const f=F(),Y='Younes',c=NPC.younesH;f.nwCine=1;f.younesMet=1;setSong('lift');player.face('up');
 await sleep(500);await say('',"Une musique d'ascenseur douce et un peu kitsch s'échappe des haut-parleurs. Les frigos ronronnent. Ça sent le Spéculoos et le désinfectant au citron.");
 c.face('down');await say(Y,"Bienvenue au Night White d'Ixellette, le night shop haut de gamme ouvert vingt-quatre heures sur vingt-quatre, où chaque client est un roi, chaque canette une…",{auto:1400});
 sfx(900,.06,'square',.1);sfx(400,.15,'sawtooth',.1);await sleep(500);
 await say(Y,"…");for(const d of['left','right','left','right','down']){c.face(d);sfx(700,.03,'square',.05);await sleep(d==='down'?600:380)}
 await say(Y,"Attends… attends attends attends. Cette tête. Cette veste. Cette façon de tenir sa chienne comme un sac de frites…");
 await say(Y,"{P} ?! C'EST TOI ?! La formation d'animateur, il y a quinze ans ! Le camp de Bouillon !");
 await say(Y,"Le grand jeu « Chasse aux Lumons » où t'avais perdu la moitié des gamins dans la forêt ! On les a retrouvés à la friterie du village, ils avaient tous pris une mitraillette !");
 await say('',"Younes. Le gars qui faisait des chansons à gestes pendant trois heures, même sous la drache. Il avait déjà une coiffure impeccable, à l'époque. Il l'a toujours. Il la touche toutes les dix secondes.");
 await say(Y,"Quinze ans, frère ! T'es devenu quoi ? … Non, laisse, je vois. T'as besoin d'un boulot. Ça se lit dans tes yeux comme un menu de friterie.");
 await say(Y,"Ici, moi je suis responsable du magasin. Le Night White, c'est aux frères Nour et Amin. Si tu veux bosser, va voir Nour au Night White de Bruxellia. Ils recrutent jusqu'au Jour 200.");
 await say(Y,"Bruxellia ? Tu montes à Charleroc par la Route 1, puis la Route 2 tout au nord. Enfin… quand la brume de Snow voudra bien se lever.");
 await say(Y,"Et petit conseil, entre nous… Nour, c'est le GRAND frère. L'aîné. Le daron de la famille. Tu l'appelles « Monsieur Nour », et tu lui demandes des nouvelles de son petit frère Amin. Il adore. Fais-moi confiance.");
 await say('',"Younes a l'air très sérieux. Peut-être un peu trop sérieux.");
 await say('Fifi le Firat',"Bonjour ! Moi c'est Fifi le Firat ! Fas Firate, hein. Firat. Avec un F. … Bon, bienvenue quand même !");
 await say(Y,"C'est Fifi. Il a un cheveu sur la langue, il dit des F à la place des P. Ne lui demande jamais de dire « pépé ». Jamais.");
 unlock('nw');setSong(cur.song||'nw');setObj()}
async function younesBaldScene(){const Y='Younes',c=NPC.younesB;setSong('lift');
 await say('',"Derrière la caisse, une boule à zéro brille sous les néons. Elle reflète les frigos. Elle reflète ta tête. Elle reflète Laïka.");
 c&&c.face('down');await say(Y,"Dis rien. DIS. RIEN.");
 await say(Y,"Un pari d'animateur, c'est sacré. Quinze ans que je tiens toutes mes promesses de colo. Même celle de manger un chicon cru devant quarante gamins.");
 await say('Fifi le Firat',"C'est moi qui l'ai rasé ! Avec la tondeuse du rayon animaux. Le modèle « Fetit chien à foils longs ».");
 await say(Y,"Et il a raté le côté gauche. Deux fois. À la fin, j'ai dû tout enlever. Tout.");
 await say(Y,"Le pire ? Nour m'a envoyé une carte de condoléances. « À tes cheveux. Ils étaient plus intelligents que toi. Signé : Monsieur Nour. »");
 await say(Y,"Bon. Au moins, maintenant, je brille plus que les frigos. Bienvenue au Night White… collègue.");setSong(cur.song||'nw')}
async function amineReveal(N){const f=F();
 if(f.nourBox===3){delete S.bag.colisnw;if(f.cisoaAlex===1){await say(N,"C'est toi que Nour m'envoie ? Et… MES CISOA ! Merci, frère !");await say(N,"…Attends. Une, deux, trois… onze. ONZE. Il en manque une.");await say(N,"C'est Alex, hein ? Ce gros gourmand. Il me fait le coup à CHAQUE livraison. Il te l'a échangée contre quoi ? Une Mitraillette ? Classique.")}
  else if(f.cisoaAlex===0){await say(N,"C'est toi que Nour m'envoie ? Et… MES CISOA ! Les douze ! Intactes !");await say(N,"T'es passé devant le garage d'Alex et il t'a rien pris ? Frère… Personne ne résiste à Alex. T'es un monstre. Respect.")}
  else await say(N,"C'est toi que Nour m'envoie ? Et… MES CISOA ! Merci, frère ! Il en manque une, mais je vais faire comme si j'avais rien vu.")}
 else await say(N,"Alors c'est toi que Nour m'envoie ? {P}, c'est ça ? Bienvenue à Jourdanfritte !");
 await say('',"Tu te redresses et tu transmets le message, avec le plus grand respect : « Votre grand frère, Monsieur Nour, vous passe le bonjour, petit Amin. »");
 await say(N,"…Mon quoi ?");sfx(330,.2,'triangle',.12);await sleep(400);await say(N,"Mon GRAND frère ? NOUR ? « Petit » Amin ?");
 camShake(300,.08);await say(N,"HAHAHAHAHA ! Frère… C'est MOI le grand ! J'ai trois ans de plus que Nour ! C'est moi qui lui ai appris à faire du vélo, et c'est moi qui ai pris la raclée quand il a cassé la vitrine du voisin !");
 await say(N,"Laisse-moi deviner… C'est Younes qui t'a dit ça ?");
 await say('',"Tu repenses au « Monsieur Nour ». Au regard bizarre de Nour. Et à Younes, ton vieux pote de la formation d'animateur, si sérieux derrière sa caisse d'Ixellette.");
 await say(N,"Il t'a eu. Il t'a eu en beauté. Attends, faut que je les appelle.");
 await say('',"Amin sort son téléphone et lance un appel vidéo sur le groupe « Night White Family 🌙 ». Quatre visages hilares apparaissent à l'écran.");phoneOn([['Younes','younesH'],['Colin','colin'],['Nour','nour'],['Fifi','nwstaff']]);
 for(const q of[523,659,784])sfx(q,.08,'square',.08);
 await say('Younes (en vidéo)',"ALLÔÔÔ ? Alors, il l'a dit ? Il t'a appelé « Monsieur Amin » aussi ?! HAHAHAHA !");
 await say('Colin (en vidéo)',"IL A DEMANDÉ À NOUR DES NOUVELLES DU « PETIT FRÈRE » !!! DEVANT TOUTE LA FILE ! J'ai fait tomber un pack de Titvel ! … Je l'ai ramassé, hein. Je suis pas un sauvage.");
 await say('Nour (en vidéo)',"Pour info : oui, je suis le PETIT frère. Mais « Monsieur Nour », ça me plaît bien. On va garder ça pour toujours.");
 await say('Fifi (en vidéo)',"Moi j'bosse là defuis deux ans et j'y croyais aussi ! Faut dire qu'Amin fait flus jeune.");
 await say(N,"Merci Fifi. Enfin quelqu'un d'intelligent.");
 await say('Colin (en vidéo)',"ATTENDEZ ! Younes, t'avais pas fait un PARI sur le groupe, toi ?! « Si le stagiaire découvre la blague avant la fin de la semaine, je me rase la tête. Parole d'animateur. »");
 await say('Younes (en vidéo)',"…");await sleep(300);await say('Younes (en vidéo)',"On est quel jour ?");await say(N,"Lundi, Younes. On est lundi.");
 await say('Younes (en vidéo)',"…Fifi. Va chercher la tondeuse.");await say('Fifi (en vidéo)',"La tondeuse du rayon animaux ? Le modèle « Fetit chien » ? Avec flaisir !");sfx(180,.5,'sawtooth',.08);f.younesBald=1;
 await say('Younes (en vidéo)',"Bienvenue dans l'équipe, frère ! Chez nous, tout le monde se fait avoir une fois. Toi, c'était le premier jour. C'est un record !");
 await say('',"Le groupe entier se met à chanter « Monsieur Nouuur, Monsieur Nouuur » sur l'air d'un chant de supporters. Amin raccroche en pleurant de rire.");phoneOff();
 f.prank=1;unlock('prank');
 await say(N,"Bon. Moi c'est Amin, le GRAND frère. Et le plus beau, aussi. Bienvenue à Jourdanfritte, collègue. Ta période d'essai : trois services ici. On commence ?")}

/* Bruxellia, Night White : Younes aide Nour, crâne rasé… et se met en congé maladie */
async function younesSickScene(N){const f=F(),Y='Younes';f.younesSick=1;const[x,z]=lucFree(cur,6,5);const y=await tempChar('younes',x,z,'right');
 y.face(dirTo(y,player.x,player.z));player.face(dirTo(player,y.x,y.z));player.yawOv=null;
 await say('',"Derrière Nour, quelqu'un remplit le rayon chips en rasant les murs. Un crâne tout lisse qui brille sous les néons… Younes.");
 await say(Y,"…Salut. Je… je donne juste un coup de main à Nour. Il manquait quelqu'un. Regarde pas ma tête. REGARDE PAS MA TÊTE.");
 await choose(S.name||'Toi',"Tu ne peux pas t'en empêcher…",["« Monsieur Younes ! Comment va votre GRAND frère ? »","« Ça brille, dis donc ! On peut éteindre les néons ! »"]);
 camShake(200,.05);await say('Colin',"HAHAHAHA ! IL BRILLE ! ON VOIT LE PLAFOND DEDANS !");await say(N,"Respire, Younes. Respire.");
 await say(Y,"…Ok. C'est bon. J'ai compris. Je me sens pas bien, là. Je crois que je couve quelque chose. Un truc grave. Une… allergie aux blagues.");
 await say(Y,"Nour, je me mets en congé maladie. Je t'envoie mon certificat dans deux heures. … Enfin, dans le bus.");
 y.face('down');await tween(700,q=>{y.k=1-q;y.place()});killTemp(y);sfx(900,.06,'square',.06);
 await say(N,"Congé maladie, mon œil. Il rentre jouer à GTA 6. Il l'a précommandé il y a deux ans, il compte les jours sur son calendrier.");
 await say('Colin',"Il est parti avec trois paquets de chips. Pour sa « convalescence ».")}
