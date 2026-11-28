/* ---- Chapitre 10 : la Ligue d'Ardenval (fin du jeu) ----
   1. Nour, au Night White de Bruxellia, est le maître de l'arène de la capitale depuis toujours : type Feu (f.badge8, Médaille Manneken).
   2. La Ligue (porte du bâtiment, place de Bruxellia) : huit médailles ; Dolba tient sa promesse de la Route 2 (f.dolbaFin).
   3. Le Conseil des Quatre (salle LIGUE, grilles qui s'ouvrent une à une : f.conseil = 0…4) ; soins à l'entrée et fontaines entre les combats.
   4. Le Champion : le Président Albéric Delvaux-Dewinter et ses Lumons traités à l'Éclat. Le battre le destitue (article premier) :
      l'agent Verhaegen l'arrête avec le registre et les bons de livraison (f.champion).
   5. Épilogue à Ixellette, déclaration de Luciole si le lien est prêt, générique (f.fin). Ensuite : le jeu continue (Lumidex). */
CH.godelieve={skin:'#f2d8c0',hair:'#f4f4f8',hs:'bun',shirt:'#3a2a20',coat:0,jacket:'#2a1a14',pants:'#2a1a14',boots:'#1a1a1a',hat:'beret',hatC:'#f4f4f8',eye:'#4a6a3a'};
CH.ronny={skin:'#d8a878',hair:'#5a4a3a',hs:'short',beard:1,beardC:'#5a4a3a',shirt:'#c9a24a',jacket:'#5a4a3a',pants:'#3a3028',boots:'#2a2018',bw:1.2,eye:'#5a4a3a'};
CH.ingrid={skin:'#f4e0d0',hair:'#f4f0e0',hs:'long',shirt:'#bfe8ff',coat:1,pants:'#5a6a8a',boots:'#e8eef4',eye:'#7fd0ff'};
CH.masque={skin:'#2a2a30',hair:'#141014',hs:'slick',shirt:'#141016',jacket:'#3a1a4a',collar:1,pants:'#141016',boots:'#141016',glasses:1,eye:'#a04ae8'};
const CONSEIL=[
 {n:'Sœur Godelieve',t:'Insecte et Plante',l:"Sœur Godelieve, de l'abbaye d'Orvalis. Je fais la bière, le fromage et je combats. Pas forcément dans cet ordre. Que Dieu te garde… de mes Lumons.",
  w:"Bien. Tu as la foi, même si tu ne le sais pas. Va. La suite est plus dure.",mons:()=>[mkMon('hannetonne',53),mkMon('cervolt',53),mkMon('endivaure',54),mkMon('citadescar',54)]},
 {n:'Monsieur Ronny',t:'Sol',l:"Ronny, quarante ans de mine à Charleroc. Ginette, c'est ma femme. Elle m'a dit de pas te faire de cadeau. Je fais toujours ce qu'elle dit.",
  w:"Ginette va me tuer. …Non, en vrai, elle va être fière de toi. Moi aussi. Allez, file.",mons:()=>[mkMon('sanglardenne',54),mkMon('dunelle',54),mkMon('scorion',54),mkMon('hautfourno',55)]},
 {n:'Madame Ingrid',t:'Glace et Eau',l:"Ingrid. J'ai nagé dans la mer du Nord tous les matins pendant cinquante ans. En janvier. Le froid ne me fait pas peur. Toi non plus.",
  w:"…Brrr. Ça, c'était un combat. Tu as réchauffé une vieille dame. Continue.",mons:()=>[mkMon('fagnelin',55),mkMon('crevettor',55),mkMon('krakamoule',55),mkMon('anguimeuse',56)]},
 {n:'Le Masque',t:'Ténèbres',l:"…On m'appelle le Masque. Personne ne sait qui je suis. Le Président me paie pour ça. Pour être le dernier mur entre lui et les gens comme toi.",
  w:"…Le mur est tombé. Tu veux savoir qui je suis ? Le neveu de l'inspecteur Lambert. J'ai honte depuis des années. Va le battre. Pour moi aussi.",mons:()=>[mkMon('perronrat',56),mkMon('smogule',56),mkMon('sanglardenne',56),mkMon('gravenspectre',57)]}];
function nbMedailles(){const f=F();return[1,2,3,4,5,6,7,8].filter(i=>f['badge'+i]).length}
function ch10Obj(){const f=F();
 if(f.champion)return`Champion·ne d'Ardenval ! Complète le Lumidex : ${Object.keys(S.dex.caught||{}).filter(k=>DEX.includes(k)).length} / ${DEX.length}`;
 if(!f.badge8)return"Retourne à Bruxellia : Nour, au Night White, est le maître de l'arène de la capitale (type Feu)";
 if(!f.ligue)return"Huit médailles ! Entre à la Ligue d'Ardenval, sur la place de Bruxellia";
 return`Ligue d'Ardenval : bats le Conseil des Quatre (${f.conseil||0}/4) puis le Champion`}
// ---- 1. Nour, maître de l'arène de Bruxellia
{const nsm=nwShopMenu;nwShopMenu=function(k){const h=nsm(k);if(k!=='brux')return h;return async()=>{const f=F();if(f.ch9done&&!f.badge8)return nourArene();return h()}}}
async function nourArene(){const f=F(),N='Nour, patron du Night White';
 if(!f.nourArVu){f.nourArVu=1;await say(N,"…Bon. L'agent Verhaegen t'a dit, hein ? Oui. Je suis le maître de l'arène de Bruxellia. Depuis dix ans. L'arène, c'est la réserve, derrière les frigos.");
  await say(N,"Pourquoi je le dis à personne ? Parce que les gens viendraient me défier toute la journée. Et qui tiendrait la caisse ? Colin ? Colin a rendu la monnaie sur un billet de Monopoly, la semaine dernière.");
  await say(N,"Et ton test d'embauche, au début ? C'était pour voir si t'avais du cœur. T'en as. Trop, même. Maintenant, voyons si t'as du feu.");
  phoneOn([['Younes','younesH'],['Amin','amine'],['Fifi','younesH']]);await say('Amin (en visio)',"VAS-Y NOUR ! Enfin… vas-y le rockeur ! Enfin… vas-y, les deux !");await say('Younes (en visio)',"Fifi a fait des pancartes. Elles disent « ALLEZ LE ROCKEUR ». Avec un F à la place du R, mais c'est l'intention qui compte.");phoneOff()}
 else await say(N,"Revanche ? Ok. Mais si tu casses un frigo, tu le paies.");
 const res=await battle({trainer:{name:'Nour, maître de l\'arène de Bruxellia',key:'nour',smart:.7,prize:400,mons:[mkMon('terrillon',51),mkMon('cokelin',51),mkMon('charbonnet',52),mkMon('hautfourno',53)],win:"…Et merci ! Euh, non, c'est moi qui dis ça d'habitude. Bravo. Vraiment.",lose:"T'as encore besoin d'un peu de feu, le rockeur. Va manger une fricadelle et reviens."}});
 if(res!=='win')return;f.badge8=1;S.badges=S.badges||[];if(!S.badges.includes('manneken'))S.badges.push('manneken');sfx(784,.15);sfx(1046,.3);
 await banner('Médaille Manneken obtenue !','Huit médailles · la Ligue d\'Ardenval t\'attend',2800);
 await say(N,"La Médaille Manneken. Huit. Tu as les huit. La Ligue est sur la place, de l'autre côté de la fontaine. Et… fais tomber ce Président. Il ne dit jamais « merci », lui.");setObj()}
// ---- 2. L'entrée de la Ligue et Dolba
async function ligueEntree(){const f=F(),G='Garde de la Ligue';
 if(f.champion){await say(G,"Champion·ne ! Entrez, entrez. Le Conseil vous attend pour l'entraînement. Enfin, il vous attend pour prendre un café, surtout.");await goMap(LIGUE,5,25,'up');return}
 if(nbMedailles()<8){await say(G,`Halte ! La Ligue d'Ardenval n'accueille que les dresseurs qui ont les huit médailles. Tu en as ${nbMedailles()}. Reviens quand tu seras prêt·e !`);return}
 if(!f.dolbaFin){const[x,z]=lucFree(cur,player.x-1,player.z);const d=await tempChar('nils',x,z,'up');d.face(dirTo(d,player.x,player.z));const D='Dolba';
  await say(D,"TOI ! Évidemment, toi. Je t'avais dit : à la Ligue de Bruxellia, s'il le faut. Eh ben il le faut.");
  await say(D,"Moi aussi j'ai mes huit médailles. Enfin, sept. Et demie. La dernière, Nour me l'a pas donnée, il a dit que je devais d'abord apprendre à dire « bonjour ». Bref.");
  await say(D,"Avant de rentrer là-dedans, tu passes par moi. Une dernière fois. Comme à Ixellette, le premier jour.");
  const s0=STARTERS[f.nilsMon||0],e1=SP[s0].evo?SP[s0].evo[1]:s0,e2=SP[e1]&&SP[e1].evo?SP[e1].evo[1]:e1;
  const res=await battle({trainer:{name:'Rival Dolba',key:'nils',smart:.6,prize:300,mons:[mkMon('pigeolet',50),mkMon('scorion',50),mkMon('moulivent',51),mkMon(e2,54)],win:"…Encore. ENCORE. Bon. Bon bon bon. T'es le meilleur, ok ? Voilà. Je l'ai dit. Ne le répète à personne.",lose:"HA ! Enfin ! Reviens quand tu seras moins nul !"}});
  if(res!=='win'){killTemp(d);return}f.dolbaFin=1;
  await say(D,"Vas-y. Bats ce Président. Et après… on refait un combat. Pour rire. Sans rien en jeu. Comme deux potes. …Si t'en as envie.");
  await tween(500,q=>{d.k=1-q;d.place()});killTemp(d)}
 if(!f.ligue){f.ligue=1;await say(G,"Huit médailles… Vérifiées. Bienvenue à la Ligue d'Ardenval. Quatre membres du Conseil, puis le Champion. Bonne chance. Sincèrement.");setObj()}
 await goMap(LIGUE,5,25,'up')}
// ---- 3. Le Conseil des Quatre
async function ligueSoin(){await say('Infirmière de la Ligue',"Je soigne tes Lumons. Ici, c'est gratuit. Au Conseil, par contre, on ne fait pas de cadeaux.");healAll();sfx(660,.1);sfx(880,.15);toast('egg','Tes Lumons sont en pleine forme !')}
async function ligueFontaine(){healAll();sfx(660,.1);sfx(990,.15);await say('',"Une fontaine de soin, offerte par la Ligue. L'eau est tiède et sent la menthe. Tes Lumons sont en pleine forme.")}
function ligueGrilles(){if(!LIGUE)return;const n=F().conseil||0;LIGUE.grilles.forEach((g,k)=>{const open=k<n;g.visible=!open;setSolid(LIGUE,5,[19,14,9,4][k],open?0:1)})}
{const rn=refreshNPCs;refreshNPCs=function(){rn();ligueGrilles();const f=F();if(NPC.champion)NPC.champion.show(!f.champion);if(NPC.president)NPC.president.show(!f.ch8done)}}
async function conseil(k){const f=F(),C=CONSEIL[k];const n=f.conseil||0;
 if(k<n){await say(C.n,f.champion?"Champion·ne ! Un café ? Un combat pour rire ? Les deux ?":C.w);return}
 await say(C.n,C.l);await say('',`${C.n} · Conseil des Quatre · type ${C.t}`);
 const res=await battle({music:'boss',trainer:{name:C.n+', Conseil des Quatre',key:['godelieve','ronny','ingrid','masque'][k],boss:1,smart:.7+k*.03,prize:500+k*100,mons:C.mons(),win:C.w,lose:"Reviens quand tu seras prêt. Le Conseil ne bouge pas."}});
 if(res!=='win')return;f.conseil=k+1;sfx(220,.3,'sawtooth',.1);ligueGrilles();await say('',k<3?"La grille dorée se lève dans un grondement. Le couloir continue.":"La dernière grille se lève. Tout au fond, sur une estrade dorée, quelqu'un t'attend.");setObj()}
// ---- 4. Le Champion
async function championScene(){const f=F(),P='Président Albéric Delvaux-Dewinter';
 if(f.champion){await say('',"L'estrade du Champion. C'est ta place, maintenant. Laïka s'y est déjà couchée.");return}
 if((f.conseil||0)<4)return;
 const pr=NPC.champion;pr.face(dirTo(pr,player.x,player.z));
 await say(P,"Le rockeur d'Ixellette. Dans ma Ligue. Devant mon estrade. Douze ans que personne n'était arrivé jusqu'ici.");
 await say(P,"Vous avez mon registre. Vous avez mes bons de livraison. Et alors ? Ici, il n'y a qu'une loi : le Champion ne tombe que s'il perd. Et je ne perds pas. Mes Lumons y veillent.");
 await say('',"Il ouvre ses Lumisphères. Les Lumons qui en sortent ont les yeux qui brillent mauve. Comme ceux des cages.");
 const c=await choose(P,"Une dernière fois : rejoignez-moi. Vous serez mon successeur. Riche, célèbre, intouchable.",["Non.","Laïka, on y va.","Je fais ça pour tous les Lumons des cages."]);
 await say(P,["Comme vous voudrez.","…Un chien. Toujours ce chien.","Les Lumons des cages ? Ce sont des outils. Comme vous."][c]);
 const D=(sp,lv)=>{const m=mkMon(sp,lv);m.atk=Math.round(m.atk*1.15);m.spd=Math.round(m.spd*1.15);m.dope=1;return m};   // Lumons « traités à l'Éclat » : plus forts, plus rapides
 const res=await battle({music:'ketoboss',trainer:{name:'Président-Champion Albéric',key:'president',boss:1,smart:.78,prize:2000,mons:[D('eolys',56),D('gravenspectre',56),D('sanglardenne',57),D('crevettor',57),D('prismalis',58)],
  win:"…Impossible. Mes Lumons… traités… parfaits… battus par un chien et un rockeur.",lose:"Vous voyez ? Le Champion ne perd jamais. Rentrez chez votre mère."}});
 if(res!=='win')return;
 await say(P,"…");await say('',"Le Président s'assoit sur les marches de son estrade. Pour la première fois, il ne sourit pas.");
 const[x,z]=lucFree(cur,player.x+1,player.z+1);const ag=await tempChar('agent',x,z,'up');ag.face(dirTo(ag,pr.x,pr.z));
 const[x2,z2]=lucFree(cur,player.x-1,player.z+1);const al=await tempChar('alias',x2,z2,'up');al.face(dirTo(al,pr.x,pr.z));
 await say('Alias, avocat',"Article premier des statuts de la Ligue d'Ardenval : « Le Champion vaincu perd son titre et toutes les fonctions qui y sont attachées. » Y compris celle de Président. Y compris l'immunité. C'est votre grand-père qui l'a écrit. Il écrivait bien.");
 await say('Agent Verhaegen',"Albéric Delvaux-Dewinter, vous êtes en état d'arrestation. Trafic d'Éclat, exploitation de Lumons, corruption, triche à la Ligue. Le registre, les bons de livraison et le témoignage de la Docteure Delcourt. On a tout.");
 await say(P,"…Mon grand-père aurait dû brûler ce panneau.");await say('Agent Verhaegen',"Votre grand-père aurait dû faire beaucoup de choses. Allez. On y va.");
 await tween(500,q=>{ag.k=1-q;ag.place();pr.k=1-q;pr.place()});killTemp(ag);pr.show(false);
 await say('Alias, avocat',"Et toi… Félicitations, Champion·ne d'Ardenval. Je suis ton avocat, maintenant. Si tu veux. Mes tarifs sont raisonnables. Pour un avocat.");
 await tween(500,q=>{al.k=1-q;al.place()});killTemp(al);
 f.champion=1;unlock('champion');saveGame();sfx(784,.15);sfx(1046,.3);sfx(1318,.45);
 await banner('Champion·ne d\'Ardenval !',`${S.name} et ${laika()?nm(laika()):'Laïka'} entrent au Panthéon de la Ligue`,3600);
 await epilogue()}
// ---- 5. Épilogue et générique
async function epilogue(){const f=F();setSong('memory');await goMap(TOWN,12,12,'up');
 await say('',"Une semaine plus tard. Ixellette. Toute la Grand-Place est décorée. Ta mère a fait des gaufres pour trois cents personnes. Il en reste. Il en reste toujours.");
 const gens=[['mom','Françoise',"Mon fils… mon enfant. Champion d'Ardenval. Ton père aurait été… Non, ton père aurait dit une bêtise. Mais il aurait été fier. Moi, je le suis."],
  ['prof','Prof. Verhaegen',"Le Fusionneur est rangé. Je vais travailler avec Samira, à Liègenoir, pour soigner les Lumons qui ont pris de la Poudre. Il était temps que l'Éclat serve à guérir."],
  ['alex','Alex',lienVoie('alex')==='combine'?"J'ai fermé le Marché gris. Si, si. J'ai ouvert une auto-école. Pour Lumons. Ne me demande pas comment ça marche, je cherche encore.":"Wagner Events a le contrat de la Ligue ! Officiellement ! Avec des factures ! Je t'emmène où tu veux, Champion, c'est gratuit à vie."],
  ['younesH','Younes',"Fifi a fait un discours. Personne n'a rien compris, mais tout le monde a applaudi. Nour a dit « merci ». Amin a pleuré. C'était la plus belle fête de ma vie."]];
 for(const[k,n,l]of gens){const[x,z]=lucFree(cur,player.x+(gens.indexOf(gens.find(g=>g[0]===k))%2?1:-1),player.z-1);const c=await tempChar(k,x,z,'down');c.face(dirTo(c,player.x,player.z));await say(n,l);await tween(400,q=>{c.k=1-q;c.place()});killTemp(c)}
 if(f.snowClean)await say('',"Un message arrive sur ton téléphone. Une photo : Snow et Givrâle devant l'association de Samira, à Liègenoir. Snow ne sourit pas vraiment. Mais presque. « Cent jours. Merci, le rockeur. »");
 if(lienVoie('luciole')!=='froid'){const[x,z]=lucFree(cur,player.x+1,player.z+1);const lu=await tempChar('luciole',x,z,'up');lu.face(dirTo(lu,player.x,player.z));
  await say('Luciole',f.lucCouple?"Hé, Champion. …Ça me fait bizarre de dire ça. Viens, on s'éclipse. Mon père nous attend à la Côte, il a promis de ne pas crier. Il va crier.":"Champion·ne d'Ardenval. Et dire que la première fois, t'as perdu contre moi sur un terril. Je le raconterai à tout le monde. Tout le temps.");
  await lienCheck('luciole',true);await tween(500,q=>{lu.k=1-q;lu.place()});killTemp(lu)}
 await say('',"Laïka pose sa tête sur tes genoux. Il y a quelques mois, sous un pont, elle n'avait plus rien. Toi non plus. Maintenant, vous avez tout un pays.");
 f.fin=1;saveGame();await credits();setSong(cur.song||'town');setObj()}
function credits(){return new Promise(res=>{let ov=$('credits');if(!ov){ov=document.createElement('div');ov.id='credits';ov.className='ov';document.body.appendChild(ov)}
 const L=[['Lumons','Les Éclats d\'Ardenval'],['Une idée et un monde de','Ted'],['Avec','Laïka, la seule de son espèce'],
  ['Dans les rôles principaux','Luciole · Alex Wagner · Snow · Dolba · la Prof Verhaegen · l\'agent Verhaegen'],['Et aussi','Françoise, Doudoune, Younes, Fifi le Firat, Nour, Amin, Colin, Gérard, Ginette, Mamie Rose, Captain, MC Sambre, Samira, Jade, Lambert, Lil Perron, Mariette, Théo, Hélène, la Comtesse, Jef, Jalal, Danny, Rudy, Alias…'],
  ['Les villes','Ixellette · Charleroc · Bruxellia · Jourdanfritte · Anversaille · Liègenoir · Namuroc · Bastognac · Gandoux · la Côte du Nord'],
  ['Les huit médailles','Terril · Diamant · Perron · Citadelle · Sapin · Gravensteen · Éolienne · Manneken'],['Musiques, voix, Lumons et décors','générés par le code, une note à la fois'],
  ['Merci d\'avoir joué','Le monde d\'Ardenval reste ouvert : complète ton Lumidex, élève des œufs au Ranch, défie tes amis au flipper de Jalal.']];
 ov.innerHTML=`<div class="panel stp" style="max-height:80vh;overflow:hidden;text-align:center"><div id="crR" style="transition:transform 0s">${L.map(([a,b])=>`<div style="margin:22px 0"><small style="opacity:.7">${a}</small><div class="dnat" style="margin-top:4px">${b}</div></div>`).join('')}</div>
  <button class="btn" id="crOk" style="margin-top:10px">Continuer l'aventure</button></div>`;
 show('credits');setSong('celeste');let y=0;const r=ov.querySelector('#crR');const iv=setInterval(()=>{y+=1;r.style.transform=`translateY(${-Math.min(y,Math.max(0,r.scrollHeight-260))}px)`},40);
 $('crOk').onclick=()=>{clearInterval(iv);hide('credits');res()}})}
