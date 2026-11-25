function nwLogoTex(w=512,h=160){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.fillStyle='#09090c';x.fillRect(0,0,w,h);
 x.shadowColor='#ffffff';x.shadowBlur=18;x.fillStyle='#f6f6fa';const bars=[3,1,2,1,1,3,2,1,3,1,2,2,1,3,1,2,1,3];const tot=bars.reduce((a,b)=>a+b+1,0),u=(w*.62)/tot;let px=w*.19;bars.forEach((b,i)=>{if(i%2===0)x.fillRect(px,h*.1,u*b,h*.46);px+=u*(b+1)});
 x.font=`600 ${h*.26}px Fredoka,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText('NIGHT WHITE',w/2,h*.78);const t=new THREE.CanvasTexture(c);t.anisotropy=4;return t}
let NWLOGO=null;const nwLogo=()=>NWLOGO||(NWLOGO=nwLogoTex());
function nightWhiteExt(g,m,x0,z0,w,d,doorX){const{ox,oz}=m,cx=ox+x0+(w-1)/2,cz=oz+z0+(d-1)/2,H=1.9,ww=w*.95,dd=d*.95,fz=cz+dd/2;
 add(g,new THREE.BoxGeometry(ww,H,dd),'#121216',cx,.1+H/2,cz,{ol:.04});box(g,ww+.2,.16,dd+.2,cx,.1+H+.08,cz,'#1c1c22',{ol:.03});
 box(g,ww+.22,.04,.04,cx,.1+H+.18,fz+.1,'#ffffff',{emi:'#ffffff',cast:false});box(g,ww+.22,.04,.04,cx,.18,fz+.06,'#ffffff',{emi:'#ffffff',cast:false});
 for(let x=x0;x<x0+w;x++){if(x===doorX)continue;box(g,.86,1.05,.05,ox+x,.78,fz+.02,'#dfe8f6',{emi:'#c9d6ea',cast:false});for(let r=0;r<2;r++)for(let b=0;b<3;b++)box(g,.16,.18,.05,ox+x-.25+b*.25,.5+r*.36,fz+.05,['#e8402a','#ffd23a','#3a8ae8','#7a4a22','#2fbf5a'][(b+r+x)%5],{cast:false})}
 box(g,.78,1.2,.06,ox+doorX,.7,fz+.03,'#f4f6ff',{emi:'#eef2ff',cast:false,ol:.02});box(g,.04,1.1,.07,ox+doorX,.7,fz+.06,'#111',{cast:false});
 plane(g,Math.min(ww-.2,2.8),.86,cx,1.62,fz+.07,nwLogo());solidRect(m,x0,z0,w,d);return fz}
const NWSHOP={town:{cash:'Younes',staff:'Fifi',ck:'younesH',disc:0,ox:200,boss:0},brux:{cash:'Nour',staff:'Colin',sk:'colin',boss:1,ck:'nour',disc:0,ox:1040},jf:{cash:'Amin',staff:'Sofiane',boss:1,ck:'amine',job:1,disc:0,ox:1060},charl:{cash:'Mehdi',staff:'Lou',disc:0,ox:220},route:{cash:'Nadia',staff:'Bart',disc:0,ox:240,rest:1}};
const YOUNES_POST=["« Monsieur Nour »… Frère, je vais la raconter à mes petits-enfants, celle-là. Même si ça m'a coûté mes cheveux.","Bonjour, Monsieur le stagiaire ! Comment va votre petit frère ? HAHAHA ! … Arrête de regarder mon crâne.","Ça repousse, hein. Le coiffeur dit trois mois. Fifi dit « trois fois ». J'ai pas compris.","Tu te souviens de la chanson du camp de Bouillon ? « Le Lumon dans la forêt »… Non ? Moi je la chante encore la nuit, quand y a personne."],
 HAKIM=["Bienvenue au Night White de Bruxellia ! … QUOI ? POURQUOI TU ME REGARDES COMME ÇA ?! … Pardon. Les Spéculoos, c'est au fond.","J'AI RANGÉ TOUS LES CHIPS PAR COULEUR ET QUELQU'UN A TOUT MÉLANGÉ !!! … Ça va. Ça va. Je respire. Comme m'a dit le psy.","Tu savais que le Cisoa Pomme-Poire, c'est fait avec des pommes ET des poires ? Moi je l'ai appris hier. Ça m'a mis une claque.","Mon tatouage ? C'est un Krakamoule. Enfin, normalement. Le tatoueur a dit que ça ressemblait à une saucisse. JE L'AI PAS FRAPPÉ, HEIN. Presque.","Nour dit que je dois « gérer mes émotions ». Alors je les range. Comme les chips. Par couleur.","Nour ? Il est à la caisse. Il connaît toutes les chansons de Disney par cœur. MOI AUSSI. … Mais ça, tu le dis à personne."],
 FIFI=["Bienvenue ! Moi c'est Fifi le Firat. Fas Firate, hein ! FIRAT ! … Bon, Fifi le Firate. Mais rien à voir avec le gang de Cafitain, hein !","Les Sfeculoos sont en fromo cette semaine : moins vingt four cent !","Fourquoi tout le monde rigole quand je dis « fomme de terre » ? C'est fourtant fas drôle.","J'ai rangé les fâtes, les fizzas et le fafier toilette. Le fafier, c'est le flus dur à dire.","Younes chante encore des chansons d'animateur quand y a fersonne. « Fetit fapa noël »… J'ai fas le droit d'en farler."],
 FIFI_POST=["C'est moi qui ai rasé Younes ! Avec la tondeuse du rayon animaux. Le modèle « Fetit chien à foils longs ». Il a fas aimé.","Younes brille tellement sous les néons qu'on a éteint une lamfe. Économie d'énergie !","Monsieur Nour, fetit frère, grand frère… Moi j'ai jamais rien comfris à cette famille."];
async function talkColinNW(){const H='Colin',f=F();
 if(f.prank&&!f.prankTeased){f.prankTeased=1;await say(H,"LE VOILÀÀÀ !!! MESDAMES ET MESSIEURS, LE FRÈRE ADOPTIF DE MONSIEUR NOUR !!!");camShake(200,.05);await say(H,"Hé, stagiaire ! Tu veux un Cisoa ? Ah non, c'est vrai, faut demander au GRAND frère ! HAHAHA ! … HAHA. … Ha. Bon.");
  await say('Nour, patron du Night White',"Laisse-le. Ils ont fait pareil à Colin le mois dernier : il a cherché « la clé du rayon invisible » pendant tout son service.");await say(H,"…ON AVAIT DIT QU'ON EN PARLAIT PLUS !!!");sfx(160,.2,'sawtooth',.1);await say(H,"…Pardon. Je respire. Voilà. Ça va mieux.");await say(H,"Allez, bienvenue dans la famille, frère. Pour de vrai, cette fois. Check ?");sfx(988,.08);sfx(1318,.12);return}
 await say(H,HAKIM[(rnd()*HAKIM.length)|0])}
async function talkFifi(){const f=F(),L=f.younesBald?FIFI_POST.concat(FIFI):FIFI;await say('Fifi le Firat',L[(rnd()*L.length)|0])}
const NWSTAFF=["Pas le temps, chef ! Le camion vient de livrer huit palettes de chips paprika !","Les frigos se vident plus vite que je les remplis. C'est la soif du samedi soir, ça.","Si tu cherches les Spéculoos, c'est rayon biscuits. Si tu cherches le patron, il est parti chercher des frites.","Attention, ça glisse, je viens de passer la serpillière ! … Bon, ok, c'était il y a trois heures.","Le rayon animaux, c'est mon préféré. Les Lumons adorent les croquettes au bœuf. Les chats aussi, mais ils font les difficiles."];
function nwShopMenu(k){const c=NWSHOP[k];return async()=>{const N=c.boss?c.cash+', patron du Night White':'Caissier '+c.cash;const f=F();
 if(k==='town'&&f.prank&&!f.baldSeen){f.baldSeen=1;await younesBaldScene();return}
 if(k==='brux'&&!f.nourMet){if(!f.nourTry){
   if(f.younesMet&&!f.monsieurNour){f.monsieurNour=1;await say(S.name,"Bonjour, Monsieur Nour ! Euh… Comment va votre petit frère Amin ?");
    await say(N,"…« Monsieur Nour » ? Mon… PETIT frère ?");await say('',"Le téléphone de Nour vibre sur le comptoir. Un message de Younes, depuis Ixellette : « Il l'a dit ??? 😂😂😂 »");
    await say(N,"…Ok. D'accord. Je vois. Amin va très bien, merci. Il sera ravi d'apprendre que tu t'inquiètes pour lui.");sfx(220,.15,'triangle',.1)}
   await say(N,"Bref. C'est toi, {P} ? Younes m'a parlé de toi. Il paraît que t'as du cran… et une chienne qui fait peur aux Kétosaures.");
   await say(N,"Moi c'est Nour. Le Night White, on l'a monté à deux, mon frère Amin et moi. Tu veux bosser chez nous ? Alors on fait comme tout le monde : un test d'embauche.");
   await say(N,"Caisse, réassort, rendu de monnaie… Trois épreuves. Il me faut au moins 8 points. Prêt·e ?")}else await say(N,"Tu reviens pour le test ? J'aime ça, les gens qui insistent.");
  f.nourTry=(f.nourTry||0)+1;const r=await nwJob('test',N);
  if(r.score>=8){f.nourMet=1;sfx(784,.15);sfx(1046,.3);await banner('Test réussi !',`${r.score} points`,2000);
   await say(N,"Pas mal du tout ! T'es embauché·e… à l'essai. Ici à Bruxellia mon équipe est complète, mais mon frère Amin a besoin de quelqu'un à Jourdanfritte.");
   await say(N,"Première mission : tu lui apportes ce colis. Douze canettes de Cisoa Pomme-Poire, sa commande perso. Il en boit trois par jour, et il devient insupportable quand il en a plus.");
   f.nourBox=1;give('colisnw');sfx(784,.12);await banner('Tu as reçu le Colis de Nour !','À livrer à Amin, à Jourdanfritte',1800);
   await say(N,"Prends la Route 3, à l'est. Tu feras ta période d'essai chez lui : trois services. Si Amin est content, ta place t'attendra au Night White d'Ixellette, à côté de chez toi.");
   await say(N,"Ah, et… dis-lui que son « petit frère » lui passe le bonjour. Hé hé.");
   await say(N,"Et fais gaffe sur la route… Les Pirates de Captain traînent par là. Lui, il est pas net dans sa tête.")}
  else await say(N,`${r.score} point${r.score>1?'s':''}… C'est pas encore ça. Va boire un café et reviens retenter quand tu veux.`);setObj();return}
 if(k==='jf'&&!f.trialDone){if(!f.nourMet){await say(N,"Salut ! Moi c'est Amin. Tu cherches du boulot ? Faut d'abord passer le test de mon frère Nour, au Night White de Bruxellia.");return}
  if(!f.hired){if(f.nourBox===1||f.nourBox===2){await say(N,"C'est toi que Nour m'envoie ? Il m'a dit que tu m'apportais mes Cisoa Pomme-Poire… Ils sont où ?");if(f.nourBox===2)await say(N,"Un PIGEOLET ?! Il a volé mes Cisoa ?! Frère… Va me récupérer ça. Au Garage d'Alex ? Cours !");return}
   await amineReveal(N);f.hired=1}
  const ch=await choose(N,`Période d'essai : ${f.trial||0}/3 services. On y va ?`,["Prendre mon service","Acheter","Plus tard"]);if(ch===2)return;
  if(ch===0){const r=await nwJob('trial',N);f.trial=(f.trial||0)+1;await say(N,`Service ${f.trial}/3 terminé : ${r.score} points, ${r.earn} € de paie.`);
   if(f.trial>=3){f.trialDone=1;await say(N,"Trois services, et pas une seule bêtise. Période d'essai validée, collègue ! Ta place t'attend au Night White d'Ixellette, avec Younes et sa nouvelle coupe. Et Fifi, évidemment.");unlock('worker');
    if(!f.ch3){f.ch3=1;await banner('Chapitre 3 terminé !','Un vrai travail, enfin',2600);$('endH').textContent='Chapitre 3 terminé !';
     $('endTxt').innerHTML=`Tu as réussi le test de <b>Nour</b>, survécu à la blague de <b>Younes</b>, sauvé la Rolls d'Alex d'un Pigeolet, et validé ta période d'essai chez <b>Amin</b>. Ta place t'attend au <b>Night White d'Ixellette</b>, à côté de chez toi.<br><br>Snow prépare quelque chose à Bruxellia, Captain rôde, et Alias compte sur toi… La suite arrive bientôt.`;
     show('endc');await new Promise(r=>$('endOk').onclick=()=>{hide('endc');r()})}}setObj();return}}
 await say(N,k==='town'?(F().younesBald?YOUNES_POST[(rnd()*YOUNES_POST.length)|0]:"Yo {P} ! Qu'est-ce que je te sers, frère ? Comme au camp de Bouillon : une gaufre et un Cisoa ?"):"Bienvenue au Night White ! Ouvert jour et nuit, sept jours sur sept, une fois.");
 if(!F()['nwVisit_'+k]){F()['nwVisit_'+k]=1}unlock('nw');
 if((k==='town'||k==='jf')&&F().trialDone){const ch=await choose(N,"Alors, collègue, tu viens acheter quelque chose, ou tu prends ton service ?",["Acheter","Prendre mon service","Rien"]);if(ch===1){const r=await nwJob('shift',N);await say(N,`Bon service ! ${r.score} points, ${r.earn} € de paie.`);return}if(ch===2)return}
 const ks=['sirop','chips','titzvel','zisoa','supersirop','choco','spa','speculoos','lumisphere'],pr=x=>Math.round(ITEMS[x].price*(1-c.disc)/10)*10;
 for(;;){const i=await pickList(`Night White · ${S.money} €${c.disc?' · −20 %':''}`,ks.map(x=>({html:`${ico(x)}<span class="grow"><b>${ITEMS[x].n}</b> — ${pr(x)} €${c.disc?` <s style="opacity:.5">${ITEMS[x].price} €</s>`:''}<br><small>${ITEMS[x].d} · Tu en as ${S.bag[x]||0}</small></span>`,dis:S.money<pr(x)})));
  if(i<0)break;const x=ks[i];S.money-=pr(x);give(x);sfx(1568,.05,'square',.08)}
 await say(N,k==='jf'&&F().hired?"À plus, collègue ! Et ramène pas Laïka derrière le comptoir.":"Merci et bonne route ! Garde ton ticket, hein.")}}
function nwRoom(k,exitFn){const c=NWSHOP[k],X=c.ox,m=room('nw_'+k,11,8,X,'N','#0e0e12',exitFn),g=m.group;m.nw=k;m.song='nw';
 box(g,9.8,.05,.05,X+5,2.55,.44,'#ffffff',{emi:'#ffffff',cast:false});plane(g,2.6,.8,X+5.6,2.0,.46,nwLogo());
 plane(g,1.3,.72,X+3.2,2.2,.46,labelTex('SPÉCULOOS −20 %','#0e0e12','#ffffff',512,256,58));plane(g,1.2,.68,X+8.1,2.0,.46,labelTex('OUVERT 24/7','#0e0e12','#ffffff',512,256,64));
 const pal={chips:['#e8402a','#ffd23a','#3a8ae8','#2fbf5a','#ff8a2c'],choco:['#5a2e16','#7a4a22','#d8232a','#f6c80f','#c07a3a'],pet:['#8a5a32','#3a7ae8','#c9ccd4','#2f6f5a','#e8402a']};
 const shelf=(x0,x1,z,p,lab,back)=>{const w=x1-x0+1,cx=X+(x0+x1)/2;box(g,w-.05,back?1.25:1.05,back?.55:.75,cx,back?.7:.62,z+(back?.1:0),'#f2f2f6',{ol:.03});box(g,w-.02,.1,back?.6:.8,cx,.12,z+(back?.1:0),'#16161a',{cast:false});
  const lv=2;for(let r=0;r<lv;r++)for(let i=0;i<w*4;i++){const xx=X+x0-.38+i*.24,yy=.36+r*.48,col=p[(i*3+r*7)%p.length];
   if(p===pal.pet&&i%3===0)tp(g,CYL,col,xx,yy+.04,z+(back?.34:.3),.08,.18,.08,{th:.012});else tp(g,BOXG,col,xx,yy+.06,z+(back?.34:.3),.17,p===pal.chips?.26:.18,.08,{th:.012,r:[0,0,p===pal.chips?(i%2?.06:-.06):0]});
   if(!back){tp(g,BOXG,p[(i+r)%p.length],xx,yy+.06,z-.3,.17,.2,.08,{th:.012})}}
  if(lab)plane(g,.95,.26,cx,1.35,z+(back?.39:.39),labelTex(lab,'#0e0e12','#ffffff',512,128,60));for(let x=x0;x<=x1;x++)setSolid(m,x,z)};
 shelf(1,2,1,pal.chips,'CHIPS',1);shelf(3,4,3,pal.choco,'CHOCO · BISCUITS');shelf(6,7,3,pal.pet,'ANIMAUX');
 for(let z=1;z<=3;z++){box(g,.62,1.95,.94,X+9.05,1.07,z,'#1a1a20',{ol:.03});box(g,.04,1.7,.8,X+8.72,1.07,z,'#dff4ff',{emi:'#bcd8f2',cast:false});
  for(let r=0;r<4;r++)for(let b=0;b<4;b++)tp(g,CYL,['#3ef0ff','#e8402a','#f6c80f','#2fbf5a','#ffffff','#8a6ad0'][(b+r+z)%6],X+8.88,.42+r*.4,z-.27+b*.18,.05,.16,.05,{ol:false});setSolid(m,9,z)}
 plane(g,.9,.26,X+8.66,2.15,2,labelTex('BOISSONS FRAÎCHES','#0e0e12','#ffffff',512,128,52)).rotation.y=-PI/2;
 box(g,1.9,.95,.8,X+8.5,.55,5,'#121216',{ol:.03});box(g,2,.06,.86,X+8.5,1.05,5,'#f4f4f8',{cast:false});box(g,.4,.3,.3,X+9,1.25,5,'#1c1c22',{ol:.02});box(g,.34,.2,.02,X+9,1.32,4.84,'#bfeaff',{emi:'#9ad8ff',cast:false});
 box(g,.18,.05,.12,X+8.2,1.1,5.1,'#ff2a3a',{emi:'#ff1020',cast:false});setSolid(m,8,5);setSolid(m,9,5);
 {const cs=npc(m,c.ck||'nwcash',9,4,'down',nwShopMenu(k));if(k==='town'){NPC.younesH=cs;NPC.younesB=npc(m,'younes',9,4,'down',nwShopMenu(k));NPC.younesB.show(false)}}m.signs['8,5']=m.signs['9,5']=nwShopMenu(k);
 const st=npc(m,c.sk||'nwstaff',2,2,'right',async()=>{if(k==='brux'){await talkColinNW();return}if(k==='town'){await talkFifi();return}await say('Employé '+c.staff,NWSTAFF[(rnd()*NWSTAFF.length)|0])});st.patrol=[[3,2],[8,2],[8,4],[2,4]];st.pi=0;st.wt=1;if(k==='town')NPC.fifi=st;
 if(c.rest){box(g,.5,1.3,.5,X+1,.75,5,'#1a1a20',{ol:.03});box(g,.3,.2,.02,X+1,1.15,5.26,'#ffffff',{emi:'#ffffff',cast:false});box(g,.9,.35,.5,X+1,.28,6,'#2a2a30',{ol:.03});setSolid(m,1,5);setSolid(m,1,6);
  m.signs['1,5']=m.signs['1,6']=async()=>{await say('',"Le coin repos du Night White : une banquette, une machine à café… Tu t'assieds deux minutes.");healAll();for(const q of[523,659,784])sfx(q,.15,'triangle',.15);await say('',"Tes Lumons se reposent et repartent en pleine forme ! Rien de tel qu'un café avant le prochain combat.")}}
 m.signs['3,0']=m.signs['2,0']="Des chips à tous les goûts : paprika, sel, pickles… et un paquet « andalouse » en édition limitée.";
 return m}
async function nwJob(mode='shift',N){const f=F();const P=[['chips','Chips'],['zisoa','Cisoa'],['titzvel','Titvel'],['choco','Lait choco'],['speculoos','Spéculoos'],['croq','Croquettes']];
 const lvl=Math.min(3,Math.floor((f.shifts||0)/3)),T0=mode==='test'?16:15-lvl,kinds=['caisse','reassort','monnaie'].sort(()=>rnd()-.5);let score=0;
 for(const kind of kinds){const ttl={caisse:'Caisse : scanne ce que veut le client',reassort:'Réassort : remplis les trous du rayon',monnaie:'Monnaie : rends la bonne somme'}[kind];
  score+=await new Promise(r=>{let t=T0,pts=0,state={};const end=()=>{clearInterval(iv);r(pts)};
   const head=()=>{$('jobT').innerHTML=`<b>${ttl}</b><br>⏱ ${t}s · ${pts} pt${pts>1?'s':''} · total ${score+pts}`};
   const bad=b=>{sfx(140,.15,'square',.15);t=Math.max(0,t-2);b.classList.add('bad');setTimeout(()=>b.classList.remove('bad'),250);head()};
   const good=()=>{sfx(1568,.05,'square',.1)};
   const newRound=()=>{if(kind==='caisse'){const n=1+((rnd()*Math.min(3,1+lvl+pts/2))|0);state.order=Array.from({length:n},()=>P[(rnd()*P.length)|0][0]);state.got=state.order.map(()=>0)}
    if(kind==='reassort'){const p=P[(rnd()*P.length)|0][0];state.p=p;state.slots=Array.from({length:9},()=>rnd()<.45?null:P[(rnd()*P.length)|0][0]);if(!state.slots.some(x=>x===null))state.slots[(rnd()*9)|0]=null}
    if(kind==='monnaie'){const price=(5+((rnd()*90)|0)*5)/100*(lvl+2),paid=price<5?5:price<10?10:price<20?20:50,ch=Math.round((paid-price)*100)/100;const opts=[ch,Math.round((ch+.5)*100)/100,Math.max(.1,Math.round((ch-.3)*100)/100)].sort(()=>rnd()-.5);state={price:price.toFixed(2),paid,ch,opts}}draw()};
   const draw=()=>{head();
    if(kind==='caisse'){$('jobO').innerHTML=state.order.map((k,i)=>`<span class="jo${state.got[i]?' ok':''}">${ico(k,38)}</span>`).join('');
     $('jobG').innerHTML=P.map(([k,n])=>`<button class="btn alt jb" data-k="${k}" data-good="${state.order.some((x,j)=>x===k&&!state.got[j])?1:0}">${ico(k,34)}<br><small>${n}</small></button>`).join('');
     $('jobG').querySelectorAll('.jb').forEach(b=>b.onclick=()=>{const i=state.order.findIndex((x,j)=>x===b.dataset.k&&!state.got[j]);if(i<0)return bad(b);state.got[i]=1;good();if(state.got.every(Boolean)){pts+=1+Math.floor(state.order.length/2);sfx(988,.1);setTimeout(newRound,200)}draw()})}
    if(kind==='reassort'){$('jobO').innerHTML=`<span style="font-size:13px">Caisse de ${ITEMS[state.p]?ITEMS[state.p].n:'croquettes'} :</span> <span class="jo">${ico(state.p,38)}</span>`;
     $('jobG').innerHTML=state.slots.map((x,i)=>`<button class="btn alt jb${x?'':' emp'}" data-i="${i}" data-good="${x?0:1}">${x?ico(x,30):'<span style="font-size:22px;opacity:.5">＋</span>'}</button>`).join('');
     $('jobG').querySelectorAll('.jb').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(state.slots[i])return bad(b);state.slots[i]=state.p;good();pts+=1;if(state.slots.every(Boolean)){sfx(988,.1);setTimeout(newRound,200)}draw()})}
    if(kind==='monnaie'){$('jobO').innerHTML=`<span style="font-size:15px">Le client doit <b>${state.price} €</b> et te donne <b>${state.paid} €</b>.</span>`;
     $('jobG').innerHTML=state.opts.map(o=>`<button class="btn alt jb" data-v="${o}" data-good="${o===state.ch?1:0}" style="font-size:17px">${o.toFixed(2)} €</button>`).join('');
     $('jobG').querySelectorAll('.jb').forEach(b=>b.onclick=()=>{if(+b.dataset.v!==state.ch)return bad(b);good();pts+=2;sfx(988,.1);newRound()})}};
   show('job');newRound();const iv=setInterval(()=>{t--;head();if(t<=0){end()}},1000)});
  await sleep(300)}
 hide('job');const earn=mode==='test'?0:score*9+((rnd()*10)|0);S.money+=earn;if(mode!=='test'){f.shifts=(f.shifts||0)+1;if(f.shifts>=5)unlock('worker')}unlock('nw');return{score,earn}}
