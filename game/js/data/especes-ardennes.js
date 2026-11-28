/* ---- Lumons de la Meuse et des Ardennes (chapitres 6 et 7) ----
   Namuroc et la Route 6 : Escargolin -> Citadescar (l'escargot de la Citadelle), Échassor (les échasseurs), Anguimeuse (l'anguille de la Meuse).
   Bastognac et la Route 7 : Marcassor -> Sanglardenne (le sanglier), Fagnelin (le feu follet des Fagnes), Cervolt (le cerf à bois électriques).
   Prismalis : le Lumon d'Éclat de la Fondation Ardenne (unique, chapitre 7).
   Nouvelles attaques : Vol (Rafale de Meuse, Piqué des échasses), Électrik (Étincelle, Foudre des Fagnes), Sol (Coup de boutoir).
   Modèles procéduraux (gène plan : silhouettes de systemes/formes.js). Chargé après especes-liegenoir.js. */
Object.assign(MV,{
 rafale:{n:'Rafale de Meuse',t:'Vol',p:40,a:100,pp:30},
 pique:{n:'Piqué des échasses',t:'Vol',p:75,a:95,pp:15,hc:1},
 etincelle:{n:'Étincelle',t:'Électrik',p:40,a:100,pp:30},
 foudre:{n:'Foudre des Fagnes',t:'Électrik',p:85,a:90,pp:10},
 boutoir:{n:'Coup de boutoir',t:'Sol',p:70,a:95,pp:15}});
Object.assign(MOVEFX,{
 rafale:async(a,d)=>{sfx(500,.4,'sawtooth',.05);await streamFx(A_(a),D_(d),'wind',7,.6,520,.2);await Promise.all([burstAt(D_(d),'plume',8,1.1,.4,500),shock(d.base,'#cfc0ff',1.4)])},
 pique:async(a,d)=>{sfx(900,.15,'triangle',.1);await tween(260,q=>a.g.position.y=a.base.y+Math.sin(q*PI)*1.2);a.g.position.copy(a.base);await lunge(a,d.base);
  await Promise.all([popFx(D_(d),'impact',1.2,320,0),burstAt(D_(d),'plume',10,1.3,.45,550),camShake(260,.15)])},
 etincelle:async(a,d)=>{sfx(1800,.06,'square',.1);const b=bolt(A_(a),D_(d));flashScr('#fff6a0',120,.35);await sleep(180);b.kill();await burstAt(D_(d),'spark',8,1,.35,400)},
 foudre:async(a,d)=>{sfx(60,.5,'sawtooth',.25);const top=D_(d).setY(4.5);const bs=[0,1,2].map(i=>bolt(top.clone().setX(top.x+(i-1)*.4),D_(d)));flashScr('#fff6a0',300,.7);
  await Promise.all([camShake(420,.25),shock(d.base,'#f6e84a',2.2),burstAt(D_(d),'spark',14,1.5,.5,500)]);bs.forEach(b=>b.kill())},
 boutoir:async(a,d)=>{sfx(80,.3,'sawtooth',.25);await lunge(a,d.base);await Promise.all([fountainFx(D_(d),'dust',10,.5,600,.8),shock(d.base,'#c9a24a',1.9),camShake(300,.2)])}});
const ARD_SP={
 escargolin:{n:'Escargolin',t:['Plante','Roche'],b:[58,52,78,30],xp:70,cr:150,evo:[32,'citadescar'],L:[[1,'bousculade'],[1,'durcir'],[1,'feuille'],[14,'jetpierre'],[24,'fouet'],[30,'eboulis']],
  G:{plan:'serpent',body:'round',size:.8,c1:'#c8a878',c2:'#7a5a3a',c3:'#5fae3a',eyes:'sleepy',top:'antennae',ears:'none',side:'none',back:'shellback',feet:'none',pattern:'spots'},
  d:"Les escargots de Namuroc. Ils montent la Citadelle à leur rythme, c'est-à-dire en trois semaines. Personne ne les a jamais vus pressés.",cry:'Slllp…'},
 citadescar:{n:'Citadescar',t:['Plante','Roche'],b:[82,74,108,40],xp:175,cr:45,L:[[1,'durcir'],[1,'jetpierre'],[1,'fouet'],[36,'eboulis'],[42,'seisme']],
  G:{plan:'serpent',body:'rock',size:1.3,c1:'#a89878',c2:'#5a4a3a',c3:'#5fae3a',eyes:'fierce',top:'helmet',ears:'none',side:'none',back:'shellback',feet:'none',pattern:'stripes'},
  d:"Sa coquille est une forteresse, avec des remparts et des meurtrières. Il paraît que les soldats de la Citadelle s'abritaient dessous pendant les orages.",cry:'SLLLOOOMP !'},
 echassor:{n:'Échassor',t:['Vol','Normal'],b:[56,70,48,88],xp:118,cr:110,L:[[1,'bousculade'],[1,'rafale'],[12,'aile'],[20,'roucoule'],[28,'pique']],
  G:{plan:'bipede',body:'tall',size:.95,c1:'#f4f0e8',c2:'#d8232a',c3:'#f6c80f',eyes:'fierce',top:'crown',ears:'none',side:'wings',back:'tail',feet:'two',pattern:'stripes'},
  d:"Un oiseau perché sur des pattes interminables. À Namuroc, deux Échassor qui se croisent se poussent jusqu'à ce que l'un tombe. Les gens appellent ça « la joute ».",cry:'Kraaa-kak !'},
 anguimeuse:{n:'Anguimeuse',t:['Eau','Électrik'],b:[62,74,56,80],xp:125,cr:100,L:[[1,'jet'],[1,'etincelle'],[18,'bulles'],[30,'foudre']],
  G:{plan:'serpent',body:'round',size:1,c1:'#2a5a7a',c2:'#7fe0ff',c3:'#f6e84a',eyes:'round',top:'none',ears:'fins',side:'none',back:'tail',feet:'none',pattern:'glow'},
  d:"Elle remonte la Meuse la nuit en s'éclairant toute seule. Les pêcheurs de Namuroc disent qu'elle sait où sont les poissons… et qu'elle ne le dit jamais.",cry:'Bzzzouïï !'},
 marcassor:{n:'Marcassor',t:['Sol','Normal'],b:[62,72,58,52],xp:80,cr:140,evo:[30,'sanglardenne'],L:[[1,'bousculade'],[1,'grogne'],[12,'boutoir'],[22,'seisme']],
  G:{plan:'quadrupede',body:'box',size:.75,c1:'#6a4a2a',c2:'#c8a070',c3:'#3a2a1a',eyes:'round',top:'spikes',ears:'pointy',side:'none',back:'tail',feet:'four',pattern:'stripes'},
  d:"Le marcassin des forêts d'Ardenne. Il fouille la neige avec son groin pour trouver des faînes. Si tu le croises, cherche bien : sa mère n'est jamais loin.",cry:'Groïk !'},
 sanglardenne:{n:'Sanglardenne',t:['Sol','Ténèbres'],b:[98,102,82,62],xp:190,cr:45,L:[[1,'boutoir'],[1,'morsure'],[1,'grogne'],[34,'seisme'],[40,'triplecroc']],
  G:{plan:'quadrupede',body:'rock',size:1.35,c1:'#3a2a1a',c2:'#7a5a3a',c3:'#e8e4d8',eyes:'fierce',top:'spikes',ears:'horns',side:'none',back:'tail',feet:'four',pattern:'none'},
  d:"Le roi des sangliers de Bastognac. Ses défenses ont la couleur de la neige. Les chasseurs racontent qu'il les laisse passer… une fois.",cry:'GROOOAAARK !'},
 fagnelin:{n:'Fagnelin',t:['Spectre','Glace'],b:[50,62,60,88],xp:122,cr:90,L:[[1,'feufollet'],[1,'givre'],[22,'hantise'],[32,'blizzard']],
  G:{plan:'flottant',body:'blob',size:.85,c1:'#bfe8ff',c2:'#7a8ad0',c3:'#e8faff',eyes:'sleepy',top:'none',ears:'none',side:'none',back:'none',feet:'tentacles',pattern:'glow'},
  d:"Une petite lumière froide qui flotte au-dessus des tourbières. Les anciens disent de ne jamais la suivre. Les gamins la suivent quand même.",cry:'Fiiiuuu…'},
 cervolt:{n:'Cervolt',t:['Électrik','Plante'],b:[72,82,62,92],xp:160,cr:60,L:[[1,'etincelle'],[1,'feuille'],[20,'fouet'],[30,'foudre'],[38,'tranche']],
  G:{plan:'quadrupede',body:'tall',size:1.15,c1:'#8a5a3a',c2:'#f4e8c8',c3:'#f6e84a',eyes:'fierce',top:'antennae',ears:'horns',side:'none',back:'tail',feet:'four',pattern:'spots'},
  d:"Le grand cerf des forêts de Bastognac. Ses bois crépitent pendant les orages. Quand il brame, toutes les lampes du village clignotent.",cry:'BRrrrâââ !'},
 prismalis:{n:'Prismalis',t:['Roche','Électrik'],b:[82,88,82,98],xp:220,cr:0,unique:1,L:[[1,'etincelle'],[1,'jetpierre'],[1,'durcir'],[30,'foudre'],[40,'eboulis']],
  G:{plan:'quadrupede',body:'cone',size:1,c1:'#7fe8ff',c2:'#c8a0ff',c3:'#ffffff',eyes:'round',top:'crown',ears:'long',side:'none',back:'tail',feet:'four',pattern:'glow'},
  d:"Fabriqué à partir d'Éclat dans les laboratoires de la Fondation Ardenne. Le « Prototype zéro ». Il n'a jamais vu le ciel avant toi. Il ne sait pas encore qu'il a le droit d'être libre.",cry:'Ting… ting ?'}
};
for(const id in ARD_SP){const d=Object.assign({},ARD_SP[id]),cry=d.cry;delete d.cry;registerSpecies(id,d);CRY[id]=cry;if(!DEX.includes(id))DEX.push(id)}
// « D'où vient son nom ? » dans le Lumidex
Object.assign(ETY,{
 escargolin:"D'<b>escargot</b>, bien sûr : Namuroc est la ville des escargots, avec une statue géante dans la Citadelle et des fêtes où on en mange par seaux. Le <b>-lin</b> le rend mignon. Lui, il trouve ça vexant.",
 citadescar:"De <b>Citadelle</b> et d'<b>escargot</b>. Une coquille en forme de forteresse, des remparts sur le dos. Il a fallu cent ans pour bâtir la vraie Citadelle de Namuroc ; il en faut autant pour qu'un Citadescar traverse une rue.",
 echassor:"Des <b>échasses</b> des jouteurs de Namuroc : depuis des siècles, deux équipes s'affrontent sur des échasses jusqu'à ce que la dernière reste debout. Le <b>-or</b>, c'est pour faire champion.",
 anguimeuse:"D'<b>anguille</b> et de <b>Meuse</b>, le grand fleuve qui traverse Namuroc et Liègenoir. Elle produit son propre courant électrique. Les pêcheurs l'appellent aussi « la lampe de poche ».",
 marcassor:"De <b>marcassin</b>, le petit du sanglier, reconnaissable à ses rayures. Le <b>-or</b> vient de son grand-père, qui se prenait déjà pour un roi.",
 sanglardenne:"De <b>sanglier</b> et d'<b>Ardenne</b>, la grande forêt du sud. Le sanglier est le vrai seigneur de l'Ardenne : on le voit sur les blasons, les bières et les panneaux « attention, traversée ».",
 fagnelin:"Des <b>Fagnes</b>, les hauts plateaux de tourbe et de bruyère, où le brouillard tombe en quelques minutes. Les légendes y parlent de petites lumières qui égarent les marcheurs. Ce sont des Fagnelin. Ils trouvent ça drôle.",
 cervolt:"De <b>cerf</b> et de <b>volt</b>, l'unité de l'électricité. Ses bois se rechargent pendant les orages. On raconte qu'un Cervolt a alimenté tout Bastognac une nuit de panne.",
 prismalis:"De <b>prisme</b> et de <b>lis</b>, la fleur. Un nom choisi par les chercheurs de la Fondation pour un « produit », pas pour un être vivant. Tu peux lui en donner un autre, si tu veux. Lui, il s'en fiche : il répond quand tu l'appelles."});
