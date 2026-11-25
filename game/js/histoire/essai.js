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
 ['frite','Madame Gilberte, friterie de la place',"De l'huile de coude ? Ici on a de la graisse de bœuf, mon chou. Pour le coude, essaie le Night White : Adnan sait tout."],
 ['sofiane','Employé Adnan',"De l'huile de… *éclate de rire et se cache derrière le rayon* Pardon, pardon. Non. Rupture de stock depuis… toujours. Va dire ça à Amin."]];
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
 await say(S.name||'Toi',"Amin… Il se fait tard. J'ai demandé à TOUT le monde. La pharmacie, Roger, Inès, Jalal, Danny, la friterie, Adnan… Personne n'a d'huile de coude.");
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
async function talkPharma(){if(await huile('pharma'))return;const N='Pharmacienne Mireille',ks=['sirop','supersirop','spa'];
 await say(N,["Bonjour ! Sirops, Eau de Spa… Tout pour remettre tes Lumons sur pattes. Les vrais soins gratuits, c'est à la Maison des Lumons, hein.","Encore un dresseur ! Sirop de Liège ? C'est le meilleur, on le met même sur les gaufres."][(rnd()*2)|0]);
 for(;;){const i=await pickList(`Pharmacie · ${S.money} €`,ks.map(x=>({html:`${ico(x)}<span class="grow"><b>${ITEMS[x].n}</b> — ${ITEMS[x].price} €<br><small>${ITEMS[x].d} · Tu en as ${S.bag[x]||0}</small></span>`,dis:S.money<ITEMS[x].price})));if(i<0)break;S.money-=ITEMS[ks[i]].price;give(ks[i])}}
async function friteJF(){if(await huile('frite'))return;await friteJosette()}

/* ---- Danny crie dans Jourdanfritte (bulles qui ne bloquent pas le jeu) ---- */
const DANNY_CRIS=["DEUX EUROS ! QUELQU'UN A DEUX EUROS ?!","JE VENDS UNE CHAUSSURE ! LA GAUCHE !","HÉ, MADAME ! VOUS AVEZ FAIT TOMBER… NON RIEN, DONNEZ-MOI DEUX EUROS !","QUI VEUT UN TICKET DE TOMBOLA ? IL A DÉJÀ PERDU, MAIS IL EST JOLI !","JALAAAL ! JE PAIE DEMAIN, PROMIS !","UNE FRITE ! JUSTE UNE FRITE ! C'EST PAS BEAUCOUP UNE FRITE !"];
function shoutBubble(txt,who){let el=$('shout');if(!el){el=document.createElement('div');el.id='shout';document.body.appendChild(el)}
 el.textContent=txt;el.classList.add('on');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('on'),3400);
 if(AC&&OPT.sfx&&OPT.vx&&who)for(let k=0;k<8;k++)setTimeout(()=>voiceBlip(who,'HAHAHAHA',2),k*85)}
function dannyShout(){shoutBubble('Danny (au loin) : « '+DANNY_CRIS[(voixRnd()*DANNY_CRIS.length)|0]+' »','Danny')}
async function dannyPiece(){const f=F();const c=await choose('Danny',["Attends ! Avant de partir… T'aurais pas une petite pièce ? Une seule. Pour le parcmètre. J'ai pas de voiture, mais bon.","Psst ! Une pièce, chef ? Je te la rends demain. Ou après-demain. Ou jamais.","Hé ! Toi qui sors le ventre plein… Une pièce pour un frère qui a faim ?"][(rnd()*3)|0],["Donner 1 €","Désolé, Danny"]);
 if(c===0&&S.money>=1){S.money-=1;f.dannyDon=(f.dannyDon||0)+1;sfx(1318,.08);await say('Danny',f.dannyDon>=5?"T'es le seul qui m'aime, toi. Un jour je te rendrai tout. Avec les intérêts. Les intérêts de cœur.":"Merci, chef ! Que Saint-Nicolas te le rende !")}
 else await say('Danny',"Pas grave… Je comprends… *s'effondre théâtralement sur une chaise*")}
{let next=0;setInterval(()=>{if(!player||cur!==JF||document.hidden||B)return;const t=performance.now();if(!next){next=t+6000;return}if(t>next){next=t+12000+voixRnd()*14000;dannyShout()}},1000)}

/* ---- Jour 25 : la « Nuit Mauve » ----
   Le Jour 25, Snow organise une rave géante : Younes appelle pour prévenir. Ce jour-là, les Kétosaures embusqués reviennent dans les buissons,
   et Younes offre 3 Lumisphères Nocturnes. Si on n'a pas encore atteint Bruxellia, le recrutement de Nour se durcit (seuil du test +2). */
async function jour25Event(){const f=F();f.jour25=1;const Y='Younes (au téléphone)';phoneOn([['Younes','younesH']]);
 await say(Y,"Allô ? Frère ! T'as vu la date ? Jour 25 ! Ce soir, c'est la « Nuit Mauve » : Snow organise une rave géante, sans autorisation, quelque part entre Charleroc et Bruxellia.");
 await say(Y,"Tous les Kétosaures sont de sortie. Ils se planquent de nouveau dans les buissons des routes, ils guettent les dresseurs. Ouvre l'œil.");
 if(!f.brux){f.nourHard=1;await say(Y,"Et… mauvaise nouvelle : Nour a clôturé les recrutements « officiels ». Il te prendra quand même, mais il sera plus exigeant au test. Faut pas traîner, frère !")}
 await say(Y,"Tiens, je t'ai mis trois Lumisphères Nocturnes de côté. Elles marchent super bien la nuit. Fais-en bon usage !");phoneOff();give('nuitlumi',3);
 for(const k in f)if(k.startsWith('amb_'))delete f[k];await banner('La Nuit Mauve','Jour 25 · les Kétosaures sont de sortie',2400);setObj()}
setInterval(()=>{if(!S||!S.flags||!player||busy||B||!cur||cur.room)return;const f=F();if(f.introDone&&f.chapterDone&&!f.jour25&&dayNum()>=25)runScript(jour25Event)},5000);
/* ---- Trame pour les chapitres 5-6 (à jouer plus tard) ----
   Le colis de Cisoa était un TEST d'honnêteté des frères Amin et Nour.
   f.cisoaAlex===1 (canette donnée à Alex) -> trame négative : Alex ne viendra pas en colocation et fera remarquer que c'était un test.
   f.cisoaAlex===0 (refus) -> trame positive. Ancienne sauvegarde (undefined) -> positive par défaut. */
const trameHistoire=()=>F().cisoaAlex===1?'negative':'positive';
