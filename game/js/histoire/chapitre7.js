/* ---- Chapitre 7 : Bastognac, la forêt d'hiver ----
   La Fondation Ardenne, « pour un avenir plus lumineux », fabrique des Lumons à partir d'Éclat : plus forts, plus obéissants.
   La Prof Verhaegen y a travaillé il y a quinze ans (révélé à la fin du chapitre 6).
   1. Route 7 (f.r7) : Captain, le père de Luciole, a abordé une péniche de Grognon ; la scène dépend de la voie de Luciole.
   2. Le piège (f.piege) : un marcassin pris dans un piège de la Fondation. Le libérer (f.piegeLibre) : sa mère laisse un œuf.
   3. Bastognac (f.bast). 4. Arène d'Hélène Noiset, garde forestière, type Plante (f.badge5, Médaille Sapin) : le laissez-passer.
   5. Fondation Ardenne : code de la porte (f.fondCode), cages, la Directrice Isaure Delcourt et le Prototype zéro (Prismalis) (f.ch7done).
   Fin : Snow vient aider (si f.snowClean), la Prof et l'agent, la déclaration de Luciole si le lien est prêt, teaser de Gandoux. */
CH.helene={skin:'#f0d0b0',hair:'#a0522d',hs:'bun',shirt:'#2f5a3a',jacket:'#5a6a3a',pants:'#3a3a2a',boots:'#3a2a1e',hat:'beret',hatC:'#2f5a3a',eye:'#3a6a3a'};
CH.directrice={skin:'#f4dcc8',hair:'#e8e4e0',hs:'bun',shirt:'#e8eef4',coat:1,pants:'#2a2a30',boots:'#1a1a1a',glasses:1,eye:'#4a7aa0'};
Object.assign(ICON,{laissezpasser:icoB('#2f5a3a','#f4f8ff','✓')});
Object.assign(ITEMS,{laissezpasser:{n:'Laissez-passer forestier',d:"Signé par Hélène Noiset, garde forestière. Il ouvre la route de la réserve, jusqu'à la Fondation Ardenne. « Ne fais pas de bêtises dans ma forêt. »",price:0,quest:1}});
function ch7Obj(){const f=F();if(f.ch7done)return"Chapitre 7 terminé · Gandoux t'attend · La suite bientôt";
 if(!f.r7)return"Traverse le pont de Jambes (sud de Namuroc) : la Route 7 mène à Bastognac";if(!f.bast)return"Suis la Route 7 à travers les sapins jusqu'à Bastognac";
 if(!f.badge5)return"Défie l'arène de Bastognac : Hélène Noiset, la garde forestière (type Plante)";
 if(!f.fondCode)return"Entre à la Fondation Ardenne (est de Bastognac) et trouve le code de la porte du labo";
 return"Au fond du labo, arrête la Directrice de la Fondation"}
// les personnages dont l'histoire est finie quittent la scène (Grognon en prison, Snow reparti à Liègenoir, la Directrice arrêtée)
{const rn=refreshNPCs;refreshNPCs=function(){rn();const f=F();if(NPC.grognon)NPC.grognon.show(!f.ch6done);if(NPC.directrice)NPC.directrice.show(!f.ch7done);if(NPC.snowC)NPC.snowC.show(!(f.ch7done&&f.snowClean))}}
// ---- 1. Route 7 : Captain
async function r7Entree(){const f=F();f.r7=1;setObj();await banner('Route 7','La route des sapins',2200);const C='Captain';
 const[x,z]=lucFree(cur,player.x+1,player.z+1);const cp=await tempChar('captain',x,z,'up');cp.face(dirTo(cp,player.x,player.z));
 await say(C,"HALTE-LÀ, MATELOT ! …Ah, c'est toi. Le rockeur. Le gamin au chien. Celui qui traîne avec MA FILLE.");
 await say(C,"Cette nuit, mes Pirates et moi, on a abordé une péniche de Grognon sur la Meuse. À l'abordage, à l'ancienne ! Elle était pleine de caisses d'Éclat. Adresse de livraison : Fondation Ardenne, Bastognac.");
 const v=lienVoie('luciole');
 if(v==='froid'){await say(C,"Luciole ne te parle plus, hein ? Elle m'a dit. Enfin, elle m'a dit « rien », ce qui chez elle veut dire beaucoup.");
  await say(C,"Si tu la croises… dis-lui que son vieux père l'attend. Avec des gaufres. Elle saura.");f.capMsg=1}
 else if(f.lucCouple){await say(C,"Elle m'a TOUT raconté. Le Ranch, le pendentif, et TOI. T'APPROCHES PAS D'ELLE ! …");
  await say(C,"…Bon. Je rigole. Enfin, à moitié. Elle a l'air heureuse. Ça faisait des années que je l'avais pas vue comme ça. Prends soin d'elle, matelot. Sinon je te jette à la Meuse.");
  await say('',"Il te tend une main énorme, couverte de tatouages d'ancres. Tu la serres. Il serre un peu trop fort. Exprès.")}
 else{await say(C,"Ma fille dit que t'es quelqu'un de bien. Ma fille dit jamais ça. Ni de moi, ni de personne. Alors je vais te croire. Pour cette fois.");
  await say(C,"Elle m'a rappelé, tu sais. Après des années. On s'est vus à Namuroc, on a mangé des frites au bord de l'eau. Sans crier. Enfin, presque.")}
 await say(C,"La Fondation est à l'est de Bastognac, dans la réserve forestière. Pour y entrer, il te faudra le laissez-passer des gardes forestiers. Moi, j'ai pas de laissez-passer. J'ai un grappin.");
 give('megalumi',2);await say(C,"Tiens. Deux Méga Lumisphères, prises sur la péniche. Butin de guerre. Bon vent, matelot !");
 await tween(500,q=>{cp.k=1-q;cp.place()});killTemp(cp);setObj()}
// ---- 2. Le piège
async function piegeScene(){const f=F();f.piege=1;player.walking=false;
 await say('',"Un petit cri dans la neige. Un marcassin, la patte coincée dans une cage métallique. Sur la cage, une étiquette : « FONDATION ARDENNE — SPÉCIMEN SAUVAGE N° 312 ».");
 await say('',"Derrière les sapins, un grognement sourd. Deux yeux rouges. Sa mère.");
 const c=await choose('',"Que fais-tu ?",["Ouvrir la cage doucement, avec Laïka.","Le capturer : il sera mieux avec toi.","Reculer lentement."]);
 if(c===0){f.piegeLibre=1;await say('',"Tu t'accroupis. Laïka s'assoit à côté, très calme. Tu soulèves le loquet. Le marcassin file vers sa mère en couinant.");
  await say('',"La grande Sanglardenne te fixe longtemps. Puis elle pousse quelque chose du groin vers toi, dans la neige, et disparaît entre les arbres.");
  const e=mkEgg('marcassor',[31,0,0,0],false);const r=typeof ranchGiveEgg==='function'?ranchGiveEgg(e):(giveEgg(e)?'sac':null);
  await banner('Tu as reçu un Œuf !',r==='couveuse'?'Déposé à la couveuse du Ranch (tu portes déjà 3 œufs)':r?'Un œuf de Marcassor, tiède dans la neige':'Plus de place pour un œuf…',2200)}
 else if(c===1){await say('',"Tu sors une Lumisphère. La mère charge à travers les sapins !");
  const m=mkMon('sanglardenne',39);const res=await battle({wild:m,music:'boss'});
  await say('',res==='caught'?"Tu as capturé la mère… Le marcassin s'enfuit seul dans la forêt, en boitant. Laïka le regarde partir.":"La mère t'a repoussé. Elle libère son petit d'un coup de défense et ils disparaissent dans la forêt.")}
 else await say('',"Tu recules. La mère s'approche, tord la cage de ses défenses et libère son petit. Ils disparaissent dans les sapins. Elle ne t'a même pas regardé.");
 setObj()}
// ---- 3. Bastognac
async function bastArrivee(){const f=F();f.bast=1;await banner('Bastognac','Le cœur de l\'Ardenne',2600);
 await say('',"La neige craque sous tes bottes. Ça sent le feu de bois et le jambon fumé. Au milieu de la place, une énorme noix en bronze. Et au loin, à l'est, derrière une clôture, un bâtiment tout blanc, tout neuf, tout propre.");
 await say('',"La Fondation Ardenne. « Pour un avenir plus lumineux », dit le panneau. Laïka grogne en le regardant.");setObj()}
async function noixShop(){const N='Mamie Noisette';
 const c=await choose(N,"Bienvenue chez « Noix & Jambon » ! Qu'est-ce qui te ferait plaisir, mon grand ?",["Des noix (Sirop, 6 €)","Du jambon d'Ardenne (Super Sirop, 14 €)","La Fondation, vous en pensez quoi ?","Rien, merci"]);
 if(c===0||c===1){const id=c?'supersirop':'sirop',p=PRIX[id]||(c?14:6);if(S.money<p){await say(N,"Nuts ! T'as pas assez de sous. Reviens quand t'auras travaillé un peu.");return}S.money-=p;give(id);await say(N,c?"Fumé au bois de hêtre pendant trois semaines. Ça requinque un Lumon mieux que n'importe quel sirop. Enfin, c'est un sirop, en vrai. Mais au goût jambon.":"Des noix de Bastognac ! Ça soigne, ça nourrit, ça se lance sur les touristes. Nuts !")}
 else if(c===2)await say(N,"La Fondation ? Ils ont payé la nouvelle école, le terrain de foot et le sapin de la place. Alors tout le monde se tait. Moi, je dis : quand quelqu'un paie tout, c'est qu'il a beaucoup à cacher. Nuts !");
 else await say(N,"Nuts ! Reviens quand tu veux.")}
// ---- 4. Hélène Noiset, arène type Plante
async function heleneTalk(){const f=F(),M='Hélène Noiset, garde forestière';
 if(f.badge5){await say(M,f.ch7done?"La Fondation est fermée. Les Lumons des cages sont retournés dans ma forêt. Je les reconnais : ils ont tous une petite marque à l'oreille. Ils guérissent.":"Mon laissez-passer t'ouvre la route de la Fondation, à l'est de la place. Je ne peux pas y aller moi-même : ils ont des avocats qui me feraient virer. Toi, t'as rien à perdre.");return}
 await say(M,"Hélène Noiset, garde forestière et maîtresse de l'arène. Ici, on combat avec la forêt : type Plante. Lente, patiente… et impossible à arrêter.");
 await say(M,"Tu veux entrer à la Fondation ? La route traverse ma réserve. Je donne mon laissez-passer à ceux qui respectent la forêt. Montre-moi que tu sais te battre sans tout casser.");
 const res=await battle({trainer:{name:'Hélène Noiset',key:'helene',smart:.65,prize:280,mons:[mkMon('citadescar',40),mkMon('cervolt',40),mkMon('escargolin',39),mkMon('cervolt',42)],win:"Tu as plié sans casser. Comme un sapin dans la tempête. Tu as gagné.",lose:"La forêt gagne toujours, à la fin. Reviens quand tu auras pris racine."}});
 if(res!=='win')return;f.badge5=1;S.badges=S.badges||[];if(!S.badges.includes('sapin'))S.badges.push('sapin');sfx(784,.15);sfx(1046,.3);
 await banner('Médaille Sapin obtenue !',"Arène de Bastognac · la réserve forestière t'est ouverte",2600);give('laissezpasser');
 await say(M,"La Médaille Sapin, et mon laissez-passer. La Fondation est à l'est de la place, derrière la clôture. Ils ont des pièges partout dans ma forêt. Des pièges qui capturent. Trouve pourquoi.");setObj()}
// ---- 5. La Fondation Ardenne
async function fondationPorte(){const f=F();
 if(!f.badge5){await say('Garde de la réserve',"Réserve forestière, accès réglementé. Sans le laissez-passer d'Hélène Noiset, je ne peux pas vous laisser passer. Désolé. Elle est à l'arène, sur la place.");player.face('left');return}
 if(f.ch7done){await say('',"Des rubans de police barrent l'entrée de la Fondation. Un panneau tout neuf : « Futur refuge pour Lumons. Bénévoles bienvenus. »");player.face('left');return}
 await goMap(FOND,7,13,'up');if(!f.fondVu){f.fondVu=1;await say('',"Tout est blanc. Les murs, le sol, les blouses. Ça sent le désinfectant. Et derrière la porte du fond, des petits cris étouffés.")}}
async function fondCode(){const f=F(),m=FOND;if(f.fondCode){await say('',"La porte est ouverte.");return}
 const codes=['0714','1407','1471','7140'];const c=await choose('',"Un clavier à quatre chiffres. Quel code tapes-tu ?",[...codes,'Ne rien taper']);
 if(c===4)return;if(c!==1){sfx(90,.5,'square',.15);flashScr('#ff2030',300,.5);await say('',"BIIIP ! Code refusé. Une alarme sonne une seconde, puis s'arrête. Personne ne vient. Ils doivent avoir l'habitude.");return}
 f.fondCode=1;sfx(660,.1);sfx(990,.15);await tween(600,q=>m.porte.position.y=1.1+q*2.4);m.porte.visible=false;setSolid(m,7,8,0);
 await say('',"BIP. Porte ouverte. Expérience 14, juillet. Pas très malin, comme code.");setObj()}
async function cageTalk(){await say('',F().ch7done?"La cage est ouverte et vide.":"Dans la cage, un Lumon sauvage te regarde sans bouger. Une étiquette sur sa patte : « dose 3 — comportement : docile ». Il a l'air éteint.")}
async function directriceScene(){const f=F(),D='Docteure Isaure Delcourt';if(f.ch7done)return;if(!f.fondCode){await say('',"La porte du labo est fermée.");return}player.walking=false;
 const di=NPC.directrice;di.face(dirTo(di,player.x,player.z));
 await say(D,"Ah. Vous êtes donc le fameux rockeur. Lianne m'a beaucoup parlé de vous… Non, je plaisante. Lianne ne me parle plus depuis quinze ans.");
 await say(D,"Regardez autour de vous. Des Lumons sauvages, apaisés. Plus d'agressivité, plus de peur. Et lui, dans le tube : le Prototype zéro. Né de l'Éclat. Parfait. Obéissant.");
 await say(D,"La Poudre du Baron ? Un brouillon. Une erreur de débutant. Moi, je ne drogue pas les Lumons : je les AMÉLIORE. Je leur enlève ce qui les rend… imprévisibles.");
 const c=await choose(D,"Vous ne trouvez pas ça beau ?",["Vous leur enlevez ce qui les rend vivants.","Laïka aussi est imprévisible. C'est pour ça que je l'aime.","Ouvrez ces cages. Maintenant."]);
 await say(D,["Vivants… Quel mot romantique. Lianne disait la même chose.","Un chien. Vous comparez la science à un chien.","Quelle impolitesse. Mes Lumons vont vous apprendre les bonnes manières."][c]);
 const res=await battle({music:'boss',trainer:{name:'Docteure Isaure Delcourt',key:'directrice',boss:1,smart:.72,prize:500,mons:[mkMon('sanglardenne',43),mkMon('fagnelin',43),mkMon('cervolt',44),mkMon('prismalis',45)],
  win:"Impossible. Mes Lumons sont parfaits. Comment un… un chien…",lose:"Vous voyez ? La perfection gagne toujours. Sortez."}});
 if(res!=='win')return;
 await say(D,"…Le Prototype un. Battu. Par un Lumon des rues et un chien qui n'a même pas de pedigree.");
 if(f.snowClean){await say('',"La porte du labo s'ouvre d'un coup. Snow. Et Givrâle, les yeux bleus, qui grogne. Snow ne dit rien. Il ouvre les cages, une par une.");
  await say('Snow',"…Vingt et un jours. Sans rien. Je compte. Ouvre le tube, le rockeur. Moi j'ose pas. Il te regarde, toi.")}
 const[x,z]=lucFree(cur,player.x+1,player.z);const pr=await tempChar('prof',x,z,'up');pr.face(dirTo(pr,di.x,di.z));const P='Prof. Verhaegen';
 await say(P,"Bonjour, Isaure.");await say(D,"Lianne. Tu as vieilli.");await say(P,"Toi, tu n'as pas changé. C'est bien le problème.");
 await say(P,"Mon frère est dehors, avec la moitié de la police d'Ardenval. Et les cages sont ouvertes. C'est fini.");
 await say(D,"Fini ? Ma pauvre Lianne. La Fondation n'est qu'un laboratoire. Nos actionnaires sont à Gandoux. Ils financent tout : Grognon, le Baron, nous. Ils ont besoin de Lumons parfaits. Pour la Ligue.");
 await say(D,"Le Prototype zéro était à eux. Ils viendront le chercher.");
 await say('',"La Prof ouvre le tube. Le petit Lumon de cristal sort, chancelant, renifle Laïka… puis grimpe sur tes bottes et ne bouge plus.");
 await say(P,"Il a choisi. Personne ne viendra le chercher : il est à toi. Et à lui-même, surtout.");
 const m=mkMon('prismalis',40);calc(m);m.hp=m.mhp;S.dex.seen.prismalis=S.dex.caught.prismalis=1;const w=receiveMon(m);sfx(784,.15);sfx(1046,.3);
 await banner('Prismalis rejoint ton équipe !',w==='box'?'Envoyé au PC de stockage (ton équipe est pleine)':'Le Prototype zéro est libre',2600);
 await tween(500,q=>{pr.k=1-q;pr.place()});killTemp(pr);di.show(false);m&&(FOND.proto&&(FOND.proto.g.visible=false));
 f.ch7done=1;saveGame();await banner('Chapitre 7 terminé','La Fondation Ardenne est fermée · Gandoux t\'attend',3200);
 await chapitre7Fin();setObj()}
async function chapitre7Fin(){const f=F();await goMap(BAST,15,9,'down');
 if(f.snowClean)await say('Snow',"Je retourne à Liègenoir. Samira cherche des bras pour l'association. Des gars qui savent de quoi ils parlent. …Merci, le rockeur. Pour le viaduc.");
 if(lienVoie('luciole')!=='froid'){const[x,z]=lucFree(cur,player.x+1,player.z+1);const lu=await tempChar('luciole',x,z,'up');lu.face(dirTo(lu,player.x,player.z));
  await say('Luciole',"Je suis venue dès que mon père m'a appelée. Il a dit : « Ton rockeur a fermé un labo tout seul. » Il a dit « ton rockeur ». J'ai failli tomber.");
  await say('Luciole',"Il neige. On s'assoit deux minutes ? Juste deux. Après, on sauve le monde, promis.");
  await lienCheck('luciole',true);await tween(500,q=>{lu.k=1-q;lu.place()});killTemp(lu)}
 else if(f.capMsg)await say('',"Ton téléphone vibre. « Mon père m'a donné ton message. Merci. — L. » C'est court. Mais c'est déjà ça.");
 phoneOn([['Prof','prof']]);await say('Prof. Verhaegen (au téléphone)',"Gandoux… La ville de la Ligue d'Ardenval. Si c'est vrai, ça va bien au-delà de quelques laboratoires. Repose-toi, {P}. Tu l'as mérité. Et prends soin du petit.");phoneOff()}
