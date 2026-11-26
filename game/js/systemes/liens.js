/* ---- Liens : la relation avec certains personnages (Luciole, Alex) ----
   Chaque réponse importante compte : des points d'affinité (p) et une « voie » (le style de tes réponses).
   Aux paliers ♥3 / ♥6 / ♥10, le personnage te fait un cadeau qui DÉPEND de la voie :
   - Luciole : coeur (tendre) · ami (complice) · froid (p <= -3 : elle prend ses distances, définitif).
     ♥3 Bracelet-luciole (coeur, œufs shiny ×3) ou Mixtape (ami, +10 % XP) · ♥6 Œuf de Lucinelle (shiny si coeur, IV parfaits si ami)
     · ♥10 la déclaration (au calme : Ranch ou fin du chapitre 5) : en couple -> Pendentif (shiny sauvages ×2), potes -> Veste (+25 % d'argent).
     · froide -> elle te laisse le Carnet de Snow et ne vient plus au Ranch.
   - Alex : honnete (réglo) · combine (magouilles).
     ♥3 Carte Ruber VIP (taxi gratuit vers les villes visitées) ou Clé du Marché gris · ♥6 Contrat Wagner Events (300 €/jour) ou œufs de
     contrebande au Marché gris · ♥10 Clés de la coloc (appart au-dessus du garage) ou l'Œuf de la Ghost (shiny garanti, IV parfaits).
   Sources : les scènes de l'histoire (lienChoix), la discussion du jour au garage d'Alex, les balades avec Luciole au Ranch.
   État : S.liens = {_init, luciole:{p,v:{voie:n},got:{palier:voie},day,vus}, alex:{…}}. */
const LIENS={
 luciole:{n:'Luciole',col:'#7fffd0',voies:{coeur:'Cœur',ami:'Complices',froid:'Distante'},met:f=>!!(f.luciole||f.lucBx||f.lucR4||f.r5)},
 alex:{n:'Alex Wagner',col:'#f6c80f',voies:{honnete:'Réglo',combine:'Combines'},met:f=>!!(f.alex||f.pcWagner)}};
const PALIERS=[3,6,10];
const icoB=(bg,fg,g)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="${bg}" stroke="${fg}" stroke-width="2"/><text x="16" y="21.5" font-size="15" text-anchor="middle" fill="${fg}" font-family="sans-serif" font-weight="bold">${g}</text></svg>`;
Object.assign(ICON,{liens:icoB('#2a1030','#ff5a8a','♥'),bracelet:icoB('#141018','#7fffd0','◎'),mixtape:icoB('#141018','#7fffd0','♪'),pendentif:icoB('#2a1030','#7fffd0','♥'),
 veste:icoB('#141016','#7fffd0','V'),carnetsnow:icoB('#e8e8ee','#a04ae8','✎'),ruber:icoB('#141416','#3fe08a','R'),clegris:icoB('#2a2a30','#f6c80f','¤'),
 contrat:icoB('#141416','#f6c80f','€'),clescoloc:icoB('#3a2a20','#f6c80f','⌂')});
Object.assign(ITEMS,{
 bracelet:{n:'Bracelet-luciole',d:"Un bracelet tressé par Luciole, avec une perle qui brille dans le noir. Les œufs qui éclosent ont 3 fois plus de chances d'être shiny.",price:0,quest:1},
 mixtape:{n:'Mixtape de Luciole',d:"Une cassette « POUR TES COMBATS — L. ». Écoutée en boucle, elle donne +10 % d'expérience à ton équipe.",price:0,quest:1},
 pendentif:{n:'Pendentif partagé',d:"La moitié d'un pendentif lumineux ; Luciole porte l'autre. Les Lumons sauvages shiny apparaissent 2 fois plus souvent.",price:0,quest:1},
 veste:{n:'Veste de Luciole',d:"Sa vieille veste noire aux bandes vertes. Les dresseurs te prennent au sérieux : +25 % d'argent après chaque victoire.",price:0,quest:1},
 carnetsnow:{n:'Carnet de Snow',d:"Le carnet que Luciole a volé à Snow. Des adresses à Namuroc, des chiffres, et une phrase soulignée : « La Citadelle a des yeux partout. »",price:0,quest:1},
 ruber:{n:'Carte Ruber VIP',d:"Alex t'emmène gratuitement dans toutes les villes que tu as déjà visitées : touche une ville sur la carte d'Ardenval.",price:0,quest:1},
 clegris:{n:'Clé du Marché gris',d:"La clé de l'arrière-boutique du Garage Wagner (Route 3). « Rien de volé. Juste… tombé du camion. »",price:0,quest:1},
 contrat:{n:'Contrat Wagner Events',d:"Tu es chauffeur officiel de Wagner Events. Passe au Garage Wagner : Alex te verse 300 € par jour.",price:0,quest:1},
 clescoloc:{n:'Clés de la coloc',d:"Les clés de l'appartement au-dessus du Garage Wagner (Route 3) : ton lit, le frigo, le panier de Laïka.",price:0,quest:1}});

// ---- état
function lien(id){S.liens=S.liens||{_init:1};return S.liens[id]=S.liens[id]||{p:0,v:{},got:{}}}
function lienAdd(id,v,n){const L=lien(id);L.p+=n;L.v[v]=(L.v[v]||0)+Math.abs(n);return L}
// anciennes sauvegardes : les scènes déjà jouées comptent (réponses inconnues -> voie la plus probable)
function lienRetro(){S.liens=S.liens||{};if(S.liens._init)return;S.liens._init=1;const f=F();
 if(f.lucBx)lienAdd('luciole','ami',1);if(f.lucR4)lienAdd('luciole','coeur',2);if(f.ch4done)lienAdd('luciole','coeur',1);if(f.r5)lienAdd('luciole','ami',1);
 if(f.poudre)lienAdd('luciole','ami',1);if(f.cokerie)lienAdd('luciole','ami',1);if(f.ch5done)lienAdd('luciole','coeur',1);
 if(f.cisoaAlex===0)lienAdd('alex','honnete',2);else if(f.cisoaAlex===1)lienAdd('alex','combine',2);if(f.pcWagner)lienAdd('alex','honnete',1)}
{const cg=continueGame;continueGame=function(sv){const p=cg(sv);try{lienRetro()}catch(e){}return p}}
{const ng=newGame;newGame=function(...a){const p=ng(...a);S.liens={_init:1};return p}}
function lienVoie(id){const L=lien(id);if(id==='luciole'&&(F().lucFroid||L.p<=-3))return'froid';const vs=Object.keys(LIENS[id].voies).filter(v=>v!=='froid');
 return vs.reduce((a,b)=>(L.v[b]||0)>(L.v[a]||0)?b:a,vs[0])}
const coeurs=p=>{const n=Math.max(0,Math.min(10,p));return'<span style="color:#ff5a8a">'+'♥'.repeat(n)+'</span><span style="color:#5a4a6a">'+'♥'.repeat(10-n)+'</span>'};

// ---- un choix qui compte : opts = [[texte, voie, points, réplique?], …] -> index choisi
async function lienChoix(id,who,q,opts){const k=await choose(who,q,opts.map(o=>o[0]));const o=opts[Math.max(0,k)]||opts[0];const L=lienAdd(id,o[1],o[2]);
 if(o[2])toast('liens',o[2]>0?`♥ ${LIENS[id].n} s'en souviendra.`:`${LIENS[id].n} s'en souviendra…`);if(o[2]>0)sfx(880,.08,'triangle',.08);else if(o[2]<0)sfx(220,.25,'sine',.1);
 if(o[3])await say(who,o[3]);
 if(id==='luciole'&&L.p<=-3&&!F().lucFroid)await lucFroid();return Math.max(0,k)}
// cadeaux des paliers (le personnage doit être là). calm : la déclaration de Luciole n'arrive qu'au calme.
async function lienCheck(id,calm){const L=lien(id);if(id==='luciole'&&F().lucFroid)return;
 for(let i=0;i<PALIERS.length;i++){if(L.got[i]||L.p<PALIERS[i])continue;if(id==='luciole'&&i===2&&!calm)return;const v=lienVoie(id);await LIEN_REW[id][i](v);if(!L.got[i])L.got[i]=v;saveGame()}}
function lienEgg(sp,o){const e=mkEgg(sp,o.iv||null,!!o.shiny);if(o.left){e.left=e.total=o.left}if(o.nat!=null)e.nat=o.nat;const r=ranchGiveEgg(e);
 return banner('Tu as reçu un Œuf !',r==='couveuse'?'Déposé dans la couveuse du Ranch (tu portes déjà 3 œufs)':r?'Marche pour le faire éclore':'Plus de place… Mariette le gardera pour toi',2000).then(()=>{if(!r){ranchS().attente=(ranchS().attente||[]);ranchS().attente.push(e)}})}
const LIEN_REW={
 luciole:[
  async v=>{const L='Luciole';if(v==='coeur'){await say(L,"Attends. Tends ton poignet. …Ne fais pas cette tête, c'est juste un bracelet. Je l'ai tressé dans le bus.");
    await say(L,"La perle, c'est un bout de la lueur de Noctiluce. Il paraît que ça porte chance aux œufs. Moi j'y crois pas. Mais toi, peut-être.");give('bracelet')}
   else{await say(L,"Tiens. Une cassette. Oui, une CASSETTE. Je t'ai fait une compil' pour tes combats : du punk, du rap liégeois, et une chanson de Snow que j'ai rayée exprès.");
    await say(L,"Si tu dis que c'est mignon, je la reprends.");give('mixtape')}lien('luciole').got[0]=v},
  async v=>{const L='Luciole';await say(L,"Il s'est passé un truc cette nuit. Noctiluce a pondu. Un œuf. La première fois de sa vie… et peut-être la dernière.");
   await say(L,v==='coeur'?"Je veux que ce soit toi qui le gardes. Toi et personne d'autre. Ne me demande pas pourquoi, j'ai pas de réponse qui ne soit pas gênante.":"Snow aurait vendu cet œuf. Mon père l'aurait mangé, je crois. Toi, tu vas en prendre soin. C'est pour ça que tu es mon pote.");
   await lienEgg('lucinelle',v==='coeur'?{shiny:1,left:900}:{iv:[31,31,31,(rnd()*32)|0],left:900});lien('luciole').got[1]=v},
  async v=>{const L='Luciole',f=F();setSong('memory');
   if(v==='coeur')await say(L,"Je vais dire un truc. Et après, si c'est nul, tu fais comme si de rien n'était. …Je crois que je suis amoureuse de toi. Voilà. C'est dit. C'est nul.");
   else await say(L,"T'es devenu mon meilleur ami. Le seul, en fait. …Dis, et si un jour je te disais que c'était peut-être un peu plus que ça ?");
   const c=await choose(L,v==='coeur'?"…Alors ?":"Hypothétiquement, hein.",v==='coeur'?["Moi aussi. Depuis le terril.","T'es ma meilleure amie. Je veux pas te perdre."]:["Moi, je dirais oui.","Restons comme ça. C'est précieux."]);
   if(c===0){f.lucCouple=1;sfx(784,.15);sfx(1046,.15);sfx(1318,.4);await say(L,"…Ok. Ok ok ok. Ne souris pas comme ça, on dirait ta chienne devant une fricadelle.");
    await say(L,"Tiens. Un pendentif coupé en deux : je garde l'autre moitié. Comme ça, même à Namuroc, même dans le noir, je saurai où tu es.");give('pendentif');await banner('Luciole et toi','En couple ♥',2400)}
   else{f.lucPote=1;await say(L,"…T'as raison. Ce qu'on a, c'est rare. Je veux pas l'abîmer. Mais alors tu prends ça : ma veste. Celle des Kétosaures, avec les bandes vertes.");
    await say(L,"Avec ça sur le dos, les dresseurs vont te prendre au sérieux. Et ils vont payer plus. Crois-moi, je sais de quoi je parle.");give('veste');await banner('Luciole et toi','Meilleurs potes',2400)}
   setSong(cur.song);lien('luciole').got[2]=c===0?'couple':'pote'}],
 alex:[
  async v=>{const A='Alex';if(v==='honnete'){await say(A,"Tu sais quoi ? T'es réglo, toi. Ça me change de mes clients. Tiens : la Carte Ruber VIP. Une ville où t'es déjà allé, tu m'appelles, je t'emmène. Gratuit. Enfin, pour toi.");give('ruber')}
   else{await say(A,"T'as le sens des affaires, toi… J'aime ça. Tiens, la clé de l'arrière-boutique. Le Marché gris. Rien de volé, hein. Juste… tombé du camion.");give('clegris')}},
  async v=>{const A='Alex';if(v==='honnete'){await say(A,"Wagner Events cherche un chauffeur de confiance pour les mariages. J'ai pensé à toi. Tu conduis pas ? Pas grave, tu ouvres les portières et tu souris. Très bien payé.");
    give('contrat');lien('alex').pay=dayNum();S.money+=300;await say(A,"Voilà ta première paie : 300 €. Passe au garage, j'en ai pour toi chaque jour.")}
   else{if(!S.bag.clegris)give('clegris');await say(A,"Nouvel arrivage dans l'arrière-boutique. Des œufs. Me demande pas d'où ils viennent, j'en sais rien et je veux pas savoir.");
    await say(A,"Un par jour, au Marché gris. Surprise à l'intérieur. Comme les œufs Kinder, mais en plus illégal.")}},
  async v=>{const A='Alex';if(v==='honnete'){await say(A,"Bon. J'ai une chambre d'amis au-dessus du garage. Elle sert à rien, à part à stocker des cires pour carrosserie. Ça te dit, une coloc ?");
    await say(A,"Un lit, un frigo plein de Cisoa, un panier pour Laïka. Et moi, qui chante sous la douche. Le dernier point n'est pas négociable.");give('clescoloc');await banner('Coloc avec Alex','Porte de l\'appart : devant le Garage Wagner',2400)}
   else{await say(A,"Psst. Viens. J'ai trouvé ça dans le coffre de la Ghost, après le gala d'hier. Un œuf. Il brille. Il BRILLE, mon ami.");
    await say(A,"Le client ne l'a jamais réclamé. Donc il est à moi. Donc il est à toi. La logique Wagner.");await lienEgg(oeufSurprise(),{shiny:1,iv:[31,31,31,31],left:1500})}}]};
// Luciole prend ses distances (voie froide, définitif)
async function lucFroid(){const f=F(),L='Luciole';f.lucFroid=1;await say(L,"…Tu sais quoi ? Laisse tomber. J'ai cru que t'étais différent. T'es comme Snow : tu prends ce qui t'arrange et tu jettes le reste.");
 await say(L,"Tiens. Le carnet de Snow. Je l'ai volé avant de partir. Je comptais te le donner pour une autre raison. Maintenant, c'est juste pour m'en débarrasser.");give('carnetsnow');
 await say('',"Luciole remonte sa capuche. Elle ne te regarde plus.")}

// ---- écran « Liens » (menu)
async function liensScreen(){const f=F();for(;;){const ids=Object.keys(LIENS).filter(id=>LIENS[id].met(f));
 if(!ids.length){await say('',"Tu n'as encore lié personne. Les gens se souviennent de ce que tu leur dis…");return}
 const i=await pickList('Liens — ils se souviennent de tes réponses',ids.map(id=>{const L=lien(id),v=lienVoie(id),n=Object.keys(L.got).length;
  return{html:`${ico(id==='luciole'?'bracelet':'ruber',34)}<span class="grow"><b style="color:${LIENS[id].col}">${LIENS[id].n}</b> · ${id==='luciole'&&f.lucCouple?'En couple ♥':id==='luciole'&&f.lucPote?'Meilleurs potes':LIENS[id].voies[v]}<br>${coeurs(L.p)} <small>${L.p} · cadeaux ${n}/3</small></span><span style="color:#3ef0ff">›</span>`}}));
 if(i<0)return;const id=ids[i],L=lien(id),v=lienVoie(id);
 const rows=PALIERS.map((s,k)=>{const g=L.got[k];if(g)return{html:`<span class="grow">✔ <b>♥${s}</b> — ${LIEN_TXT[id][k][g]||LIEN_TXT[id][k][v]||''}</span>`};
  return{dis:true,html:`<span class="grow">🔒 <b>♥${s}</b> — ${v==='froid'?'Elle ne veut plus rien te donner.':'Un cadeau qui dépendra de tes réponses (pour l\'instant : '+LIENS[id].voies[v]+').'}</span>`}});
 rows.unshift({dis:true,html:`<span class="grow"><small>${LIEN_AIDE[id]}</small></span>`});await pickList(LIENS[id].n,rows)}}
const LIEN_TXT={luciole:[{coeur:'Bracelet-luciole (œufs shiny ×3)',ami:'Mixtape de Luciole (+10 % XP)'},{coeur:'Œuf de Lucinelle (shiny)',ami:'Œuf de Lucinelle (IV parfaits)'},{couple:'En couple : Pendentif partagé (shiny sauvages ×2)',pote:'Meilleurs potes : Veste de Luciole (+25 % d\'argent)'}],
 alex:[{honnete:'Carte Ruber VIP (taxi gratuit)',combine:'Clé du Marché gris'},{honnete:'Contrat Wagner Events (300 €/jour)',combine:'Œufs de contrebande au Marché gris'},{honnete:'Clés de la coloc',combine:"L'Œuf de la Ghost (shiny)"}]};
const LIEN_AIDE={luciole:"Tendre ou complice : ses cadeaux changent selon ta façon de lui répondre. Trop froid, et elle s'en ira. Balade avec elle au Ranch, une fois par jour.",
 alex:"Réglo ou magouilleur : Alex récompense les deux, mais pas de la même façon. Passe au Garage Wagner : une discussion par jour."};

// ---- Alex : la discussion du jour au garage (Route 3)
const ALEX_SUJETS=[
 {i:["Un client veut louer la Phantom pour un mariage. Il paie en liquide. Beaucoup de liquide. Sans facture, évidemment."],q:"T'en penses quoi ?",
  o:[["Une facture, toujours. Sinon tu finis comme le Baron.",'honnete',1,"…Ouais. Le Baron, il a fini en prison. Moi je veux finir à la mer. Facture."],["Le liquide, ça ne laisse pas de traces…",'combine',1,"Hé hé. T'as pas tort. Mais chut, hein."]]},
 {i:["J'ai trouvé un portefeuille sur la banquette arrière de la Ghost. Bien rempli. Une carte d'identité dedans : un certain Jean-Claude."],q:"On fait quoi ?",
  o:[["On le rend à Jean-Claude.",'honnete',1,"T'as raison. Jean-Claude avait l'air triste. Il sera moins triste."],["On regarde d'abord combien il y a dedans.",'combine',1,"…Quatre cents euros et une photo de son chat. Bon. On rend le chat. Je rigole. On rend tout. …Peut-être."]]},
 {i:["Captain est repassé. Il me propose des GPS « neufs ». Ils sont encore collés aux tableaux de bord, avec des bouts de plastique."],q:"J'accepte ?",
  o:[["Refuse. Ce sont des GPS volés.",'honnete',1,"Je savais que t'allais dire ça. Je lui ai déjà dit non. Je voulais juste voir ta tête."],["Prends-en deux, pour voir.",'combine',1,"Deux. Pour voir. J'aime ta façon de penser."]]},
 {i:["Cette nuit, un client bourré voulait conduire la Ruber lui-même. Il disait qu'il était pilote de Formule 1. Il avait une chaussure."],q:"T'aurais fait quoi, toi ?",
  o:[["Tu le ramènes chez lui. Point.",'honnete',1,"C'est ce que j'ai fait. Il m'a fait un bisou sur le front. Le métier, mon ami."],["Tu lui factures le double.",'combine',1,"Le triple. Il a vomi dans la portière."]]},
 {i:["J'ai reçu une lettre des impôts. Ils veulent « discuter » de Wagner Events. Discuter. Tu sais ce que ça veut dire, « discuter » ?"],q:"Un conseil ?",
  o:[["Tu déclares tout et tu dors tranquille.",'honnete',2,"Dormir tranquille… Ça fait longtemps. Ok. Je déclare. Mais tu viens avec moi au rendez-vous."],["Mets tout au nom de ta tante.",'combine',2,"Ma tante a 94 ans. Elle est déjà propriétaire de trois Audi. Elle ne le sait pas."]]},
 {i:["Mariage samedi. Et l'ex de la mariée veut louer la Ghost pour arriver en plein milieu de la cérémonie. Il a préparé un discours."],q:"Je lui loue ?",
  o:[["Non. Il y a des limites.",'honnete',1,"T'as raison. Les limites, c'est important. Je lui loue la Smart de ma cousine, à la place."],["Prix triple, et on ne pose pas de questions.",'combine',1,"Prix triple ET des pop-corn pour moi. Je veux voir ça."]]},
 {i:["Tu te souviens du colis de Cisoa pour Amin ? Il m'a grillé. Il dit qu'il « compte les canettes » maintenant."],q:"Je fais quoi ?",
  o:[["Tu lui rembourses la canette. Et tu t'excuses.",'honnete',1,"M'excuser ? Moi ? …Ok. Mais je lui offre un tour en Rolls, ça compense."],["Il a pas de preuve.",'combine',1,"Il a une caméra. Dans sa caisse. Bon. Il a une preuve."]]},
 {i:["La police vend la Rolls du Baron aux enchères. Une Phantom blanche, intérieur doré. Un rêve. Un vulgaire rêve."],q:"Je l'achète comment ?",
  o:[["Aux enchères, légalement, avec ton argent.",'honnete',2,"Mon argent… Ok. Je vais vendre l'Audi. Non. Je vais vendre ma tante. Je rigole. Enchères !"],["Un flic de Liègenoir te la sortira en douce.",'combine',2,"Je connais un flic. Il s'appelle pas Lambert. Hé hé."]]}];
async function alexTalk(t0){const f=F(),A='Alex',L=lien('alex');await lienCheck('alex');
 if(S.bag.contrat&&L.pay!==dayNum()){L.pay=dayNum();S.money+=300;sfx(988,.1);sfx(1318,.2);await say(A,["Ta part de Wagner Events, chauffeur : 300 €. La mariée d'hier a pleuré dans la Phantom. De joie, je crois.","300 € pour toi. Le gala d'hier soir : un ministre, deux footballeurs et un Pigeolet. Ne pose pas de questions.","Ta paie : 300 €. Et un morceau de pièce montée. Il est un peu écrasé."][(dayNum())%3])}
 const att=(S.ranch&&S.ranch.attente)||[];
 const opts=['Discuter'];if(S.bag.clegris)opts.push('Le Marché gris');opts.push('Rien');
 const c=await choose(A,"Alors, quoi de neuf, mon ami ?",opts);const o=opts[c];
 if(o==='Le Marché gris')return marcheGris();if(o!=='Discuter')return say(A,"Allez, file. Et passe le bonjour à ta chienne.");
 const vus=L.vus=L.vus||[],k=ALEX_SUJETS.findIndex((s,i)=>!vus.includes(i));
 if(L.day===dayNum()||k<0)return t0();L.day=dayNum();vus.push(k);const s=ALEX_SUJETS[k];for(const l of s.i)await say(A,l);
 await lienChoix('alex',A,s.q,s.o);await lienCheck('alex')}
async function marcheGris(){const A='Alex',L=lien('alex');await say(A,"Bienvenue dans l'arrière-boutique. Rien de volé, hein. Juste… tombé du camion. Plusieurs fois.");
 const arr=[['megalumi',.8],['speculoos',.6],['baklava',.6],['eclat_feu',.6],['eclat_eau',.6],['eclat_plante',.6],['eclat_roche',.6],['zisoa',.5]].filter(([k])=>ITEMS[k]).map(([k,r])=>[k,Math.round(ITEMS[k].price*r)]),oeufs=L.got[1]==='combine';
 for(;;){const rows=arr.map(([k,p])=>({html:`${ico(k)}<span class="grow"><b>${ITEMS[k].n}</b> — ${p} €<br><small>${ITEMS[k].d} · Tu en as ${S.bag[k]||0}</small></span>`,dis:S.money<p}));
  if(oeufs)rows.push({html:`${ico('egg')}<span class="grow"><b>Œuf de contrebande</b> — 2500 €<br><small>Un œuf « trouvé » dans un coffre. Espèce surprise, 1 chance sur 20 d'être shiny. ${L.egg===dayNum()?'Plus rien aujourd\'hui.':'Un par jour.'}</small></span>`,dis:S.money<2500||L.egg===dayNum()});
  const i=await pickList(`Marché gris · ${S.money} €`,rows);if(i<0)break;
  if(i<arr.length){S.money-=arr[i][1];give(arr[i][0])}else{S.money-=2500;L.egg=dayNum();await lienEgg(oeufSurprise(),{shiny:rnd()<1/20})}}
 await say(A,"Tu n'es jamais venu ici. Moi non plus.")}
// ---- Alex en panne sur la Route 5 (chapitre 5) : le pourboire du Baron
async function alexR5(){const f=F(),A='Alex';f.alexR5=1;const g=cur.group,car=carModel('a6',{ruber:1});car.position.set(cur.ox+6.5,.1,cur.oz+6.2);car.rotation.y=PI/2;g.add(car);
 const[x,z]=lucFree(cur,player.x+1,player.z-1);const a=await tempChar('alex',x,z,'down');a.face(dirTo(a,player.x,player.z));player.face(dirTo(player,a.x,a.z));player.yawOv=null;
 await say(A,"Hé ! Toi ! Viens voir ! La Ruber m'a lâché. En pleine Route 5. Le moteur fait « pfffuit », comme mon compte en banque.");
 await say(A,"J'avais un client, il y a dix minutes. Costume blanc, chaussures dorées, une bague comme un œuf de Lumon. Il m'a payé la course en billets de 500.");
 await say(A,"Et il m'a laissé ÇA en pourboire.");await say('',"Alex te montre une enveloppe mauve, frappée d'un dinosaure couronné. Dedans : une liasse de billets.");
 await say(A,"Deux mille euros. Pour Jourdanfritte–Liègenoir. Le type m'a dit : « Pour ta discrétion, chauffeur. » Tu trouves ça normal, toi ?");
 const k=await lienChoix('alex',A,"J'en fais quoi, de cette enveloppe ?",[["C'est l'argent du Baron. Donne-le à quelqu'un qui en a besoin.",'honnete',2],["Un pourboire, c'est un pourboire. Moitié-moitié ?",'combine',2],["Je pousse la voiture. On verra après.",'honnete',1]]);
 if(k===0){f.alexDon=1;await say(A,"…T'as raison. Ça me brûle les doigts. Je le donnerai à l'éducatrice de rue de Liègenoir. Samira, je crois. Les gamins en ont plus besoin que ma Rolls.")}
 else if(k===1){S.money+=1000;sfx(988,.1);sfx(1318,.2);await say(A,"Hé hé. Je savais que je t'aimais bien. Mille pour toi, mille pour moi. On n'en parle à personne. Surtout pas à Nour.")}
 else{await say('',"Tu pousses l'Audi de toutes tes forces. Laïka aboie pour t'encourager. Au bout de vingt mètres, le moteur tousse… et repart !");await say(A,"UN VRAI AMI ! Bon, l'enveloppe… je vais réfléchir. Promis.")}
 await lienCheck('alex');await say(A,"Allez, je file. Si tu passes au garage, on discute. J'ai toujours un dilemme moral sur le feu. Hé hé.");
 await tween(500,q=>{a.k=1-q;a.place()});killTemp(a);g.remove(car);setObj()}
// ---- Luciole au Ranch : une balade par jour (après la Route 5), la déclaration au palier ♥10
const LUC_BALADES=[
 {i:["Luciole regarde Mariette nourrir les Lumons des enclos."],q:"Tu crois qu'on peut être quelqu'un de bien quand on a grandi chez les Kétosaures ?",
  o:[["Tu l'es déjà. Je le vois tous les jours.",'coeur',2,"…Arrête. Non, continue. Non, arrête."],["Regarde-moi : rockeur, ancien squatteur, et j'élève des œufs.",'ami',2,"HA ! Ok, t'as gagné. Si toi t'y arrives, tout le monde peut."],["Ça dépend de ce que t'as fait.",'froid',-1,"…Ouais. Ça dépend. Merci du réconfort."]]},
 {i:["Luciole tient son téléphone, l'air ailleurs.","Mon père m'a appelée. Il pleurait. Captain. Le fou des Pirates. Il PLEURAIT."],q:"Je fais quoi ?",
  o:[["Va le voir. Je viens avec toi, si tu veux.",'coeur',1,"Tu ferais ça ? …Ok. Un jour. Pas aujourd'hui. Mais un jour."],["Un pirate qui pleure, je veux voir ça.",'ami',1,"T'es bête. …Il pleure comme un phoque. Je te montrerai la vidéo."],["Il l'a bien cherché.",'froid',-2,"C'est mon père. T'as pas le droit de dire ça."]]},
 {i:["Toi aussi, t'as connu la rue. Le squat, la came, tout ça. Je l'ai vu dans tes yeux, à Charleroc."],q:"Comment t'en es sorti ?",
  o:[["Laïka. Et des gens qui m'ont tendu la main. Comme toi.",'coeur',2,"…Faut que j'aille voir les Lumons. Là-bas. Loin de ton visage. Deux minutes."],["Une friterie, une guitare et beaucoup trop de Cisoa.",'ami',2,"Le Cisoa sauve des vies. C'est scientifique."],["Ça te regarde pas.",'froid',-2,"Ok. Message reçu."]]},
 {i:["La nuit tombe sur le Pays de Herve. Au-dessus des vergers, le ciel est rempli d'étoiles.","À Liègenoir, j'avais oublié qu'elles existaient."],q:"Elles sont belles, hein ?",
  o:[["Tu brilles plus qu'elles.",'coeur',1,"…Ringard. Ringard, mais efficace."],["Celle-là, c'est la Grande Frite. Et là, la Petite Fricadelle.",'ami',1,"La Petite Fricadelle. Je vais plus jamais pouvoir regarder le ciel normalement."],["Il fait froid, je rentre.",'froid',-1,"…D'accord. Bonne nuit."]]},
 {i:["Snow m'a appris à me battre. À mentir. À survivre. Je lui dois tout… et je le déteste."],q:"C'est normal, ça ?",
  o:[["Tu ne lui dois rien. Tu t'es sauvée toute seule.",'coeur',2,"…Personne m'avait jamais dit ça."],["On va le retrouver à Namuroc et on va lui dire en face.",'ami',2,"« On ». T'as dit « on ». J'ai entendu."],["Alors retourne avec lui.",'froid',-3,"…Wow."]]},
 {i:["Luciole lance un caillou dans la mare. Un Moulinet le renvoie, vexé."],q:"Quand tout ça sera fini, tu feras quoi ?",
  o:[["Un endroit à nous. Avec Laïka et une ribambelle de Lumons.",'coeur',2,"« À nous ». …Je fais semblant de pas avoir entendu. Mais j'ai entendu."],["Une tournée rock dans tous les Night White d'Ardenval !",'ami',2,"Je fais les chœurs. Et Laïka, la batterie."],["Je partirai seul. Loin.",'froid',-1,"Ah. Ok. Seul. Évidemment."]]}];
async function lucBalade(){const f=F(),L='Luciole',Lk=lien('luciole');if(f.lucFroid){await say(L,"…");return}
 await lienCheck('luciole',true);
 if(Lk.day===dayNum()){await say(L,f.lucCouple?["Reste un peu. Juste… reste un peu.","Mariette m'a demandé si on était ensemble. J'ai dit non. Puis oui. Puis je suis partie en courant.","Ton bracelet brille quand t'es là. Coïncidence. Sûrement."][dayNum()%3]:["On s'est déjà baladés aujourd'hui. Reviens demain, je serai encore là. Les Lumons de Mariette m'ont adoptée.","Je regarde les œufs. C'est hypnotisant. Ne le répète à personne.","Laïka a essayé de manger un œuf. Je l'ai sauvé. L'œuf. Pas Laïka."][dayNum()%3]);return}
 const vus=Lk.vus=Lk.vus||[],k=LUC_BALADES.findIndex((s,i)=>!vus.includes(i));
 if(k<0){await say(L,f.lucCouple?"On a fait le tour de tous nos secrets. Maintenant, on peut juste… être là. C'est bien, aussi.":"On a tout dit, toi et moi. Le reste, on le vivra à Namuroc.");return}
 Lk.day=dayNum();vus.push(k);const s=LUC_BALADES[k];setSong('memory');await say('',"Tu fais quelques pas avec Luciole autour de la mare.");for(const l of s.i)await say(l.startsWith('Luciole ')||l.startsWith('La nuit')?'':L,l);
 await lienChoix('luciole',L,s.q,s.o);setSong(cur.song);await lienCheck('luciole',true)}
