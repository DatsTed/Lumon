/* ---- Jourdanfritte : période d'essai chez Amin (chapitre 3) ----
   Service 1 -> Amin a faim : repas au Smile and Eat (Jalal) [f.food 1 -> 2 -> 3]
   Service 2 -> « tu es lent » : huile de coude à la pharmacie… qui n'existe pas [f.huile=1, f.huileVus]
   Tout Jourdanfritte joue le jeu ; retour chez Amin -> fou rire, essai validé sans 3e service.
   + Smile and Eat (resto chic), Danny qui gratte et crie dans la ville, la pharmacie. */
let SMILE=null;
ITEMS.repas={n:'Repas pour Amin',d:'Dürüm, double frites, sauce samouraï. Emballé avec amour (et trop de sauce) par Jalal.',price:0,quest:1};
ICON.repas=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M6 12 h20 l-2 16 h-16 z" fill="#1c1a22" stroke="#d8b45a" stroke-width="2" stroke-linejoin="round"/><path d="M11 12 q0-6 5-6 q5 0 5 6" fill="none" stroke="#d8b45a" stroke-width="2"/><text x="16" y="23" font-family="sans-serif" font-size="7" font-weight="700" fill="#ffd84a" text-anchor="middle">S&amp;E</text></svg>`;

const HUILE=[
 ['pharma','Pharmacienne Mireille',"De l'huile de… de coude ? *se mord la lèvre* Pfff… pardon. Hum. On est en rupture. Demande à Monsieur Roger, sur la place. Il en utilise beaucoup… paraît-il."],
 ['roger','Monsieur Roger',"De l'huile de coude ? Hé hé hé… À mon âge, j'en ai plus une goutte, fiston. Va voir la petite Inès, les jeunes en ont plein."],
 ['ines','Petite Inès',"Hihihi ! De l'huile de coude ? Jalal en met dans ses cheveux, je crois. Ou c'était de l'huile d'olive ? Hihihi !"],
 ['jalal','Jalal',"De l'huile de coude ? Mon frère… *se retient très fort de rire* Ici j'ai de l'huile de friture, d'olive, de tournesol. De coude, non. Demande à Danny, il vend de tout."],
 ['danny','Danny',"De l'huile de coude ?! Ouais j'en ai ! Deux euros le flacon ! … Bon, non, j'en ai pas. Mais t'aurais pas deux euros quand même ?"],
 ['frite','Madame Gilberte, friterie de la place',"De l'huile de coude ? Ici on a de la graisse de bœuf, mon chou. Pour le coude, essaie le Night White : Sofiane sait tout."],
 ['sofiane','Employé Sofiane',"De l'huile de… *éclate de rire et se cache derrière le rayon* Pardon, pardon. Non. Rupture de stock depuis… toujours. Va dire ça à Amin."]];
const huileVus=()=>(F().huileVus||[]).length;
// Réponse « huile de coude » d'un habitant (renvoie true si la quête a pris la main)
async function huile(k){const f=F();if(f.huile!==1)return false;const h=HUILE.find(x=>x[0]===k);if(!h)return false;f.huileVus=f.huileVus||[];
 if(f.huileVus.includes(k)){await say(h[1],"Toujours pas d'huile de coude, hein ? Hé hé.");return true}
 f.huileVus.push(k);await say(h[1],h[2]);
 if(huileVus()>=HUILE.length)await say('',"Il se fait tard. Tu as demandé à tout Jourdanfritte, et personne n'a d'huile de coude… Retourne voir Amin au Night White.");
 else toast('map',`Huile de coude : ${huileVus()}/${HUILE.length}`);setObj();return true}

async function foodStart(N){const f=F();f.food=1;
 await say(N,"Bon premier service, collègue ! Par contre… j'ai une dalle de malade. Le ventre qui crie plus fort que la caisse.");
 await say(N,"Va me chercher à manger au Smile and Eat, le resto chic collé à la friterie de la place. Dis à Jalal que c'est pour Amin : dürüm, double frites, sauce samouraï. Il saura.");setObj()}
async function huileStart(N){const f=F();f.huile=1;f.huileVus=[];
 await say(N,"Deuxième service… Bon. C'est pas mal, hein. Mais franchement, frère, t'es un peu lent. Tu scannes les chips comme si c'étaient des œuvres d'art.");
 await say(N,"Écoute, va à la pharmacie, juste à côté, et demande de l'huile de coude. Une bonne dose, et tu iras deux fois plus vite. Dis-leur que c'est pour moi.");
 await say('',"Amin a l'air très sérieux. Peut-être un peu trop sérieux… comme Younes, la dernière fois.");setObj()}
async function huileFin(N){const f=F();
 await say(S.name||'Toi',"Amin… Il se fait tard. J'ai demandé à TOUT le monde. La pharmacie, Roger, Inès, Jalal, Danny, la friterie, Sofiane… Personne n'a d'huile de coude.");
 await say(N,"…");camShake(300,.08);await say(N,"HAHAHAHAHAHA ! Frère… L'HUILE DE COUDE, ÇA N'EXISTE PAS ! C'est une expression ! Ça veut dire « se bouger » !");
 await say(N,"Nour me l'a faite quand j'avais seize ans. J'ai cherché pendant trois jours. TROIS JOURS. Ma mère a appelé la pharmacie pour moi.");
 await say(N,"Mais tu sais quoi ? T'as fait le tour de tout Jourdanfritte sans râler, avec le sourire. Ça, c'est de l'huile de coude. La vraie.");
 await say(N,"On s'arrête là : pas besoin de troisième service. Période d'essai validée, collègue ! Ta place t'attend au Night White d'Ixellette, avec Younes et sa nouvelle coupe. Et Fifi, évidemment.");
 f.huile=2;f.trialDone=1;unlock('worker');
 if(!f.ch3){f.ch3=1;await banner('Chapitre 3 terminé !','Un vrai travail, enfin',2600);$('endH').textContent='Chapitre 3 terminé !';
  $('endTxt').innerHTML=`Tu as réussi le test de <b>Nour</b>, survécu à la blague de <b>Younes</b>, sauvé la Rolls d'Alex d'un Pigeolet, cherché de l'<b>huile de coude</b> dans tout Jourdanfritte… et validé ta période d'essai chez <b>Amin</b>. Ta place t'attend au <b>Night White d'Ixellette</b>, à côté de chez toi.<br><br>Snow prépare quelque chose à Bruxellia, Captain rôde, et Alias compte sur toi… La suite arrive bientôt.`;
  show('endc');await new Promise(r=>$('endOk').onclick=()=>{hide('endc');r()})}setObj()}
// Amin pendant la période d'essai (renvoie false pour laisser ouvrir la boutique)
async function aminTrial(N){const f=F();
 if(f.food===1||f.food===2){if(S.bag.repas){delete S.bag.repas;f.food=3;sfx(784,.12);
   await say(N,"AH ! Le Smile and Eat ! … Il t'a mis de la sauce samouraï ? Il t'a mis de la sauce samouraï. Ce mec est un artiste.");
   await say(N,"Bon, le ventre plein, on reprend. Deuxième service quand tu veux.");setObj();return true}
  await say(N,"J'ai toujours la dalle, frère. Le Smile and Eat, c'est le resto chic collé à la friterie de la place. Dis à Jalal que c'est pour moi.");return true}
 if(f.huile===1){if(huileVus()>=HUILE.length){await huileFin(N);return true}
  await say(N,`Alors, cette huile de coude ? T'as demandé à tout le monde ? (${huileVus()}/${HUILE.length}) … Hé hé. Cherche encore. La pharmacie, la place, le resto…`);return true}
 if((f.trial||0)>=1&&!f.food){await foodStart(N);return true}
 if((f.trial||0)>=2&&f.food===3&&!f.huile){await huileStart(N);return true}
 const ch=await choose(N,`Période d'essai : service ${(f.trial||0)+1}. On y va ?`,["Prendre mon service","Acheter","Plus tard"]);if(ch===2)return true;if(ch===1)return false;
 const r=await nwJob('trial',N);f.trial=(f.trial||0)+1;await say(N,`Service ${f.trial} terminé : ${r.score} points, ${r.earn} € de paie.`);
 if(f.trial===1&&!f.food)await foodStart(N);else if(f.trial>=2&&!f.huile){if(!f.food)f.food=3;await huileStart(N)}
 setObj();return true}

/* ---- Smile and Eat (intérieur) ---- */
async function smileEat2(){const f=F(),N='Jalal';
 if(f.food===1){if(!f.jalal){f.jalal=1;await say(N,"Bienvenue au Smile and Eat ! Moi c'est Jalal. Ici, on mange avec le sourire, sinon c'est pas la peine, hein !")}
  await say(N,"Pour Amin ? Dürüm, double frites, sauce samouraï. Je connais par cœur, il commande la même chose depuis 2009.");
  await say(N,"Tiens. Je t'ai mis une fourchette en or. C'est pas de l'or. Mais c'est l'intention qui compte.");
  f.food=2;give('repas');await say('Danny (de sa table)',"Psst ! Psst ! Si t'as faim en route, moi je surveille ton sac, hein ! Gratuitement ! … Enfin, deux euros.");setObj();return}
 if(await huile('jalal'))return;
 await smileEat()}
async function talkDannyJF(){if(await huile('danny'))return;
 await say('Danny',["T'aurais pas deux euros ? C'est pour un dürüm. Enfin, une moitié de dürüm.","Le Smile and Eat, c'est mon bureau. Je gère les restes. Business.","Jalal m'a interdit de demander de l'argent aux clients. Du coup je demande aux clients DEHORS. Malin, hein ?","Un jour, je serai riche. Ce jour-là, je rendrai tout. Enfin, une partie."][(rnd()*4)|0])}
async function talkPharma(){if(await huile('pharma'))return;
 await say('Pharmacienne Mireille',["Bonjour ! Sirop, pansements, crème pour les coups de soleil… Tout pour soigner les dresseurs. Les Lumons, c'est à la Maison des Lumons, hein.","Encore un client qui demande du sirop pour Lumon… Ici c'est pour les humains, chéri."][(rnd()*2)|0])}
async function friteJF(){if(await huile('frite'))return;await friteJosette()}

/* ---- Danny crie dans Jourdanfritte (bulles qui ne bloquent pas le jeu) ---- */
const DANNY_CRIS=["DEUX EUROS ! QUELQU'UN A DEUX EUROS ?!","JE VENDS UNE CHAUSSURE ! LA GAUCHE !","HÉ, MADAME ! VOUS AVEZ FAIT TOMBER… NON RIEN, DONNEZ-MOI DEUX EUROS !","QUI VEUT UN TICKET DE TOMBOLA ? IL A DÉJÀ PERDU, MAIS IL EST JOLI !","JALAAAL ! JE PAIE DEMAIN, PROMIS !","UNE FRITE ! JUSTE UNE FRITE ! C'EST PAS BEAUCOUP UNE FRITE !"];
function dannyShout(){let el=$('shout');if(!el){el=document.createElement('div');el.id='shout';document.body.appendChild(el)}
 el.textContent='Danny (au loin) : « '+DANNY_CRIS[(voixRnd()*DANNY_CRIS.length)|0]+' »';el.classList.add('on');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('on'),3200);
 if(AC&&OPT.sfx&&OPT.vx)for(let k=0;k<6;k++)setTimeout(()=>voiceBlip('Danny','DEUXEUROS',2+k*0),k*90)}
{let next=0;setInterval(()=>{if(!player||cur!==JF||document.hidden||B)return;const t=performance.now();if(!next){next=t+6000;return}if(t>next){next=t+12000+voixRnd()*14000;dannyShout()}},1000)}
