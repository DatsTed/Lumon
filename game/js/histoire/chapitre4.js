/* ---- Chapitre 4 : Bruxellia -> Route 4 -> Anversaille ----
   1. Bruxellia, Maison des Lumons : Alex Wagner installe son PC de stockage (f.pcWagner).
   2. Nour : les Kétosaures ont déménagé au port d'Anversaille (f.ch4). La sortie nord de Bruxellia s'ouvre.
   3. Route 4 : l'éclusier Marcel et son énigme (f.pont4), puis Luciole révèle son secret (f.lucR4).
   4. Anversaille (f.anv) : arène de Marieke, type Eau, Médaille Diamant (f.badge2) -> accès au port.
   5. Port : la grue (mini-jeu, f.grue) trouve le container de Snow -> Snow et MC Sambre en 2 contre 2 -> fin (f.ch4done). */
CH.marieke={skin:'#f2d4b8',hair:'#e0b85a',hs:'pony',shirt:'#3ef0ff',jacket:'#0a3a5a',collar:1,pants:'#1a2a3a',boots:'#111014',eye:'#3a8fe0'};

// 1. Le PC de stockage d'Alex
async function alexPCScene(){const f=F(),A='Alex';f.pcWagner=1;const[x,z]=lucFree(cur,6,4);const a=await tempChar('alex',x,z,'left');a.face(dirTo(a,player.x,player.z));player.face(dirTo(player,a.x,a.z));player.yawOv=null;
 await say(A,"Ah ! Te voilà ! Je t'attendais. Alex Wagner, Garage Wagner, Ruber, Wagner Events… et maintenant : WAGNER STORAGE.");
 await say(A,"Après l'histoire du Pigeolet, je me suis dit : les dresseurs perdent leurs Lumons comme moi je perds mes clés. Alors j'ai codé un système de stockage. Moi. Tout seul. Une nuit blanche et trois Cisoa.");
 await say(A,"Tous les PC des Maisons des Lumons sont maintenant reliés à MON serveur. Tu ranges tes Lumons, tu les retires, tu les échanges. Et ceux que tu as capturés avec une équipe pleine ? Ils sont déjà dedans, en sécurité.");
 if(f.cisoaAlex===1)await say(A,"Et merci encore pour le Cisoa, hein. Hé hé. … Quoi ? Rien. Rien du tout.");else if(f.cisoaAlex===0)await say(A,"Toi, t'es honnête. T'as même pas voulu me donner un Cisoa. Ça m'a vexé… et ça m'a plu.");
 await lienChoix('alex',A,"Génial, non ?",[["Et les données des dresseurs, elles sont protégées ?",'honnete',1,"Protégées ? Mon ami, c'est plus sécurisé que le coffre de la Ghost. Mot de passe : « Rolls ». …Je vais le changer."],["Tu pourrais revendre les infos des dresseurs…",'combine',1,"Chut ! …Ce serait illégal. Et lucratif. Mais surtout illégal. Hé hé."]]);
 await say(A,"Le PC est juste là, à droite du comptoir. Allez, je file : j'ai un mariage à Waterloo dans une heure, et la Phantom n'aime pas être en retard.");
 await tween(500,q=>{a.k=1-q;a.place()});killTemp(a);await banner('PC de stockage débloqué !',"Wagner Storage · dans toutes les Maisons des Lumons",2400);setObj()}
// 2. Nour lance le chapitre 4
async function nourCh4(N){const f=F();f.ch4=1;
 await say(N,"Te voilà, collègue ! Amin m'a raconté pour l'huile de coude. HAHAHA ! Bienvenue dans la famille, pour de vrai cette fois.");
 await say(N,"Bon. Sérieusement, maintenant. Les Kétosaures ont disparu de Bruxellia. Lemaire dit qu'ils ont tout déménagé au port d'Anversaille, au nord.");
 await say(N,"Des containers entiers. Des caisses de « fumigènes », qu'ils disent. Snow prépare un gros coup, et je veux pas qu'il touche à mes magasins.");
 await say(N,"La Route 4 part de la sortie nord de Bruxellia, à gauche de l'Hôtel de ville. Fais gaffe au pont de l'éclusier : le vieux Marcel ne le baisse que pour les gens malins.");
 await banner('Chapitre 4','Le port d\'Anversaille',2600);setObj()}
// 3a. L'énigme de l'éclusier
const ECLUSE=[["Je suis plat, je suis brun, on me trempe dans le café, et Saint-Nicolas me distribue. Qui suis-je ?",["Un spéculoos","Une gaufre","Une frite"]],
 ["On me mange cuite deux fois, dans un cornet, avec une sauce. Je suis… ?",["Une frite","Une moule","Une praline"]],
 ["Je fais pipi depuis quatre siècles à Bruxellia, et tout le monde me prend en photo. Je suis… ?",["Le Manneken-Pis","L'Atomium","Le Grand-Place"]]];
async function ecluseEnigme(){const f=F(),M='Éclusier Marcel';if(f.pont4){await say(M,"Le pont est baissé, fieu. Bonne route vers Anversaille !");return}
 await say(M,"Halte ! Le pont-levis, je le baisse que pour les gens malins. Trois devinettes, trois bonnes réponses. Sinon, tu restes de ce côté du canal.");
 for(const[q,opts]of ECLUSE){for(;;){const ord=opts.map((o,i)=>i).sort(()=>rnd()-.5);const c=await choose(M,q,ord.map(i=>opts[i]));if(ord[c]===0){sfx(988,.1);await say(M,"Juste !");break}sfx(160,.2,'square',.1);await say(M,"Pfff… Non. Réfléchis, fieu. Je repose la question.")}}
 f.pont4=1;cur.block&&cur.block();sfx(220,.6,'sawtooth',.12);camShake(400,.06);await say('',"Marcel tourne une grosse manivelle en ronchonnant. Le pont-levis descend lentement sur le canal… CLONK.");
 await say(M,"T'es plus malin que le dernier. Lui, il a répondu « une frite » à toutes les questions. Il habite toujours de ce côté-là.");setObj()}
// 3b. Le secret de Luciole
async function lucioleSecret(){const f=F(),L='Luciole';f.lucR4=1;const[x,z]=lucFree(cur,player.x+2,player.z-1);const lu=await tempChar('luciole',x,z,'left');lu.face(dirTo(lu,player.x,player.z));player.face(dirTo(player,lu.x,lu.z));player.yawOv=null;setSong('memory');
 await say(L,"…Encore toi. À ce stade, c'est plus le destin, c'est du harcèlement. Assieds-toi. Enfin, reste debout, y a que de l'herbe mouillée.");
 await say(L,"Je me suis tirée. Snow a pété les plombs : il veut tout envoyer par bateau depuis Anversaille. La « poudre de lune », l'argent sale… tout.");
 await say(L,"Et je vais te dire mon secret. Parce que j'en peux plus de le porter toute seule, et parce que t'es le seul qui m'a jamais posé de questions sans rien attendre en échange.");
 await say(L,"Captain. Le chef des Pirates. Le fou qui crie sur les routes. C'est… mon père.");sfx(180,.6,'sine',.15);
 await say(L,"Je suis partie de chez lui à quinze ans. Snow m'a recueillie. Et maintenant, mon père et Snow se font la guerre, et je suis au milieu. Comme une idiote.");
 if(f.captain)await say(L,"Il t'a parlé de moi, hein ? « T'APPROCHES PAS D'ELLE ! » Il fait ça avec tout le monde. Même avec le facteur.");
 const k=await lienChoix('luciole',L,"Tu ne diras rien à Snow, hein ?",[["Promis, ton secret est en sécurité.",'coeur',2],["Tu devrais parler à ton père.",'ami',2,"…Peut-être. Un jour. T'es le premier à me dire ça sans me juger."],["C'est pas mes oignons.",'froid',-2]]);
 await say(L,k===2?"…Ok. Pas tes oignons. J'ai compris. Va à Anversaille.":"…Merci. T'es bizarre, toi. Un rockeur avec un chien et un cœur. Ça court pas les rues. Va à Anversaille. Je te retrouverai là-bas. Peut-être.");
 setSong(cur.song);await tween(600,q=>{lu.k=1-q;lu.place()});killTemp(lu);setObj()}
// 4. L'arène de Marieke (type Eau)
async function mariekeTalk(){const f=F(),M='Marieke, maîtresse d\'arène';
 if(f.badge2){await say(M,"Ta Médaille Diamant brille bien, dis donc. Le port t'est ouvert. Et fais attention aux Kétosaures : ils ne savent pas nager, mais ils savent couler les autres.");return}
 await say(M,"Bienvenue à l'arène d'Anversaille ! Moi, c'est Marieke. Ici, l'eau, c'est la vie : la mer, le port, et la bière. Enfin, pour les grands.");
 await say(M,"Tu veux entrer au port ? Il te faut ma Médaille Diamant. Et pour l'avoir… il faudra survivre à la marée !");
 const res=await battle({trainer:{name:'Marieke',key:'marieke',smart:.55,prize:160,mons:[mkMon('moulinet',22),mkMon('krakamoule',24)],win:"Golfje… T'as tenu bon face à la marée. Respect.",lose:"La marée a été plus forte. Reviens quand t'auras appris à nager !"}});
 if(res!=='win')return;f.badge2=1;S.badges=S.badges||[];if(!S.badges.includes('diamant'))S.badges.push('diamant');sfx(784,.15);sfx(1046,.3);
 await banner('Médaille Diamant obtenue !',"Arène d'Anversaille · l'accès au port est ouvert",2600);
 await say(M,"La Médaille Diamant. Taillée ici, à Anversaille. Les dockers te laisseront passer au port. Et la Boutique Lumi vend maintenant les Lumisphères Éclair, profites-en.");setObj()}
// 5a. La grue du port : mini-jeu (taper les containers dans l'ordre 1 → 9 avant la fin du chrono)
function craneGame(){return new Promise(res=>{let ov=$('crane');if(!ov){ov=document.createElement('div');ov.id='crane';ov.className='ov';document.body.appendChild(ov)}
 const nums=[1,2,3,4,5,6,7,8,9].sort(()=>rnd()-.5),cols=['#d8232a','#3a8ae8','#2fbf5a','#f6c80f','#a04ae8','#ff8a2c','#3a3a42','#3ef0ff','#e86aa8'];let next=1,t=15,done=false;
 const draw=()=>{ov.innerHTML=`<div class="panel dnap"><div class="dnat">🏗 Grue du port — attrape les containers de 1 à 9</div><div class="dnah">⏱ ${t}s · prochain : ${next<=9?next:'✔'}</div>
  <div class="crg">${nums.map((n,k)=>`<button class="btn crc${n<next?' ok':''}" data-n="${n}" style="--c:${cols[k]}">${n<next?'✔':n}</button>`).join('')}</div></div>`;
  ov.querySelectorAll('.crc').forEach(b=>b.onclick=()=>{if(done)return;const n=+b.dataset.n;if(n===next){next++;sfx(500+next*80,.06,'triangle',.1);if(next>9)end(true)}else if(n>=next){t=Math.max(0,t-2);sfx(150,.15,'square',.1)}if(!done)draw()})};
 const end=ok=>{if(done)return;done=true;clearInterval(iv);hide('crane');res(ok)};const iv=setInterval(()=>{t--;if(t<=0)end(false);else if(!done)draw()},1000);draw();show('crane')})}
async function portGrue(){const f=F(),D='Docker Bart';if(!f.badge2){await say('',"La cabine de la grue. Un docker te fait signe : pas de médaille, pas de grue.");return}
 if(f.ch4done){await say(D,"La grue ? Elle se repose. Comme moi. Allez, file.");return}
 if(!f.grue){await say(D,"Le container mauve de Snow est caché quelque part dans la pile. Prends la grue : attrape-les dans l'ordre, du 1 au 9, sinon tout s'écroule !");
  for(;;){const ok=await craneGame();if(ok)break;await say(D,"Raté ! Tout s'est mélangé. On recommence, et plus vite cette fois !")}
  f.grue=1;sfx(784,.12);await say('',"Le dernier container pivote au bout du câble… Mauve. Un dinosaure couronné peint sur le flanc. Et derrière lui, deux silhouettes.")}
 await snowPort()}
// 5b. Snow et MC Sambre sur les quais (2 contre 2), puis fin du chapitre 4
async function snowPort(){const f=F(),SN='Snow',M='MC Sambre';const[x1,z1]=lucFree(cur,player.x-1,player.z-2),[x2,z2]=lucFree(cur,player.x+1,player.z-2);
 const sn=await tempChar('snow',x1,z1,'down'),mc=await tempChar('mcsambre',x2,z2,'down');[sn,mc].forEach(c=>c.face(dirTo(c,player.x,player.z)));setSong('ketoboss');
 await say(SN,"Le rockeur. Évidemment. Tu sais que t'es la seule personne d'Ardenval qui me suit plus loin que ma propre ombre ?");
 await say(M,"Yo, le poète ! T'as fait tout ce chemin pour nous ? Respect. Mais ce soir, pas de rimes. Ce soir, on charge le bateau.");
 await say(SN,"Ce container, c'est l'avenir des Kétosaures. Assez de « poudre de lune » pour que tout Ardenval danse pour moi pendant un an. Et toi… tu vas regarder.");
 const res=await snowBattle(24);
 if(res!=='win'){killTemp(sn);killTemp(mc);setSong(cur.song);return}
 await say(SN,"…Encore. ENCORE ce chien. Encore cette lumière. Sambre, on se tire.");camShake(400,.1);sfx(110,.6,'sawtooth',.15);
 await say('',"Snow et MC Sambre sautent sur une vedette qui démarre en trombe. Le container mauve reste sur le quai, ouvert. Vide… sauf une enveloppe : « Rendez-vous à Liègenoir. — S. »");
 await Promise.all([sn,mc].map(c=>tween(700,q=>{c.k=1-q;c.place()})));killTemp(sn);killTemp(mc);
 const[x,z]=lucFree(cur,player.x+2,player.z);const lu=await tempChar('luciole',x,z,'left');lu.face(dirTo(lu,player.x,player.z));
 await say('Luciole',"Je t'avais dit que je te retrouverais. Il est parti à Liègenoir, hein ? … Alors on y va. Tous les deux. Enfin, tous les trois, avec ta chienne.");
 await lienChoix('luciole','Luciole',"…Ça te va ?",[["Tous les trois. J'aime bien cette idée.",'coeur',1,"…Moi aussi. Ne le répète pas."],["Ok, mais c'est toi qui payes les frites.",'ami',1,"Marché conclu. Grand cornet, sauce andalouse. Je te ruinerai."],["Je bosse mieux seul.",'froid',-2,"…Comme tu veux. Je viendrai quand même. Pour Snow. Pas pour toi."]]);await lienCheck('luciole');
 await tween(500,q=>{lu.k=1-q;lu.place()});killTemp(lu);
 phoneOn([['Prof','prof']]);await say('Prof. Verhaegen (au téléphone)',"{P} ! L'agent Verhaegen, mon frère, m'a tout raconté. Le port, Snow… Je suis fière de toi. Vraiment.");
 await say('Prof. Verhaegen (au téléphone)',"Je t'envoie quelque chose par la Maison des Lumons. Une Master Lumisphère. Il n'en existe que trois au monde. Garde-la pour le jour où tu en auras VRAIMENT besoin.");phoneOff();
 give('masterlumi',1);f.ch4done=1;setSong(cur.song);unlock&&ACH.port&&unlock('port');
 await banner('Chapitre 4 terminé !','Le port d\'Anversaille',2600);$('endH').textContent='Chapitre 4 terminé !';
 $('endTxt').innerHTML=`Tu as résolu l'énigme de l'éclusier, appris le secret de <b>Luciole</b>, battu <b>Marieke</b> et arrêté le chargement de <b>Snow</b> au port d'Anversaille.<br><br>Snow a filé à <b>Liègenoir</b>. Luciole est avec toi. La suite arrive bientôt…`;
 show('endc');await new Promise(r=>$('endOk').onclick=()=>{hide('endc');r()});setObj()}
