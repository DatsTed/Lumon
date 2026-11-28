/* ---- Chapitre 5 : Liègenoir, la ville sombre ----
   Le Baron tient Liègenoir : il raffine l'Éclat dans la Cokerie pour en faire de la « Poudre d'Éclat », une drogue pour Lumons
   (ils deviennent plus forts, puis ils s'éteignent), il rackette les commerces, il garde les papiers des filles de la rue des Vitrines
   et il paie le rappeur Lil Perron pour que ses clips fassent passer le crime pour un rêve. Le smog des fours cache le soleil.
   1. Route 5 (f.r5 Luciole, f.poudre le Lumon drogué)   2. Arrivée (f.lie), Samira l'éducatrice de rue (f.samira)
   3. Arène de l'inspecteur Lambert, type Ténèbres (f.badge3, Médaille Perron) : ouvre la Cokerie
   4. Cokerie : énigme des fours (f.cokerie)   5. Montagne de Bueren : 374 marches + battle de rap (f.rap, mot de passe)
   6. Club « Le Perron Noir » : le Baron (f.ch5done) -> le soleil se lève, Snow file à Namuroc.  Jade (rue des Vitrines, f.jade) : facultatif. */
CH.samira={skin:'#c8946a',hair:'#1a1214',hs:'long',shirt:'#f6c80f',jacket:'#2f6f5a',pants:'#2b2b33',boots:'#3a2a1e',eye:'#3a2a1a'};
CH.maigre={skin:'#e8cfc0',hair:'#6a5a4a',hs:'messy',shirt:'#8a8a8a',jacket:'#4a4a3a',pants:'#3a3a40',boots:'#2a2420',bw:.82,eye:'#a03a3a'};
CH.jade={skin:'#f0d0b8',hair:'#2a1a20',hs:'long',shirt:'#c8102e',jacket:'#141016',pants:'#141016',boots:'#c8102e',eye:'#3a8a5a'};
CH.lambert={skin:'#e8c4a0',hair:'#6a6a6a',hs:'short',beard:1,beardC:'#7a7a7a',shirt:'#e8e4d8',tie:'#3a2a2a',collar:1,jacket:'#b89a6a',pants:'#4a3a2a',boots:'#2a1e14',eye:'#5a7a8a'};
CH.lilperron={skin:'#a8724a',hair:'#141014',hs:'buzz',hat:'cap',hatC:'#ff3bd8',shirt:'#141016',pants:'#2b2b33',stripes:1,stripeC:'#ff3bd8',strap:1,boots:'#f4f4f4'};
CH.baron={skin:'#f0c8a0',hair:'#d8d0c0',hs:'slick',shirt:'#141016',jacket:'#f4f0e8',collar:1,tie:'#a04ae8',pants:'#f4f0e8',boots:'#c9a14a',bw:1.25,eye:'#a04ae8'};
const COKE_T=[1100,800,1250,950];
// ---- Liègenoir dans le smog : nuit permanente tant que le Baron tient la ville
{const na=nightApply;nightApply=function(n){const dark=S&&S.flags&&cur&&DARK_MAPS.has(cur.id)&&!F().ch5done;if(LIE)LIE.song=S&&S.flags&&F().ch5done?'town':'keto';
 if(dark){scene.background.set('#160c16');scene.fog.color.set('#2a1820');scene.fog.near=9;scene.fog.far=36;HEMIL.intensity=.36;HEMIL.color.set('#c890b0');sun.intensity=.22;sun.color.set('#ff9a7a');
  ENV.stars.material.opacity=0;ENV.moon.visible=false;ENV.rain.visible=false;for(const k in TM){const m=TM[k];if(m.emissive&&k.includes('#ffd24a')||k.includes('#fff2b0')||k.includes('#c8f0ff')||k.includes('#fff3a0'))m.emissiveIntensity=3.5}
  n=1}
 ENV.smog=!!dark;na(n)}}
function ch5Obj(){const f=F();if(f.ch5done)return ch6Obj();
 if(!f.r5)return"Prends la Route 5 (sortie est de Jourdanfritte), direction Liègenoir";if(!f.lie)return"Traverse la Route 5 jusqu'à Liègenoir";
 if(!f.samira)return"Liègenoir est plongée dans le smog : parle aux habitants de la place du Marché";
 if(!f.ranch&&!f.badge3)return f.oeufSamira?"Emmène l'œuf de Samira au Ranch du Pays de Herve (Route 5, chemin du sud)":"Visite le Ranch du Pays de Herve (Route 5, chemin du sud) : on y élève des Lumons";
 if(!f.badge3)return"Défie l'arène de Liègenoir (type Ténèbres) : l'inspecteur Lambert peut t'ouvrir la Cokerie";
 if(!f.cokerie)return"Entre dans la Cokerie (nord-ouest de la place) et arrête les fours de la Poudre d'Éclat";
 if(!f.rap)return"Monte les 374 marches de la Montagne de Bueren (nord-est) : Lil Perron connaît le mot de passe du club";
 return"Entre au Perron Noir, le club au nord de la place, et affronte le Baron"}
// ---- 1. Route 5
async function r5Entree(){const f=F();f.r5=1;setObj();const[x,z]=lucFree(cur,player.x+1,player.z+1);const lu=await tempChar('luciole',x,z,'up');lu.face(dirTo(lu,player.x,player.z));
 await say('Luciole',"Te voilà. J'ai pris le premier bus pour Jourdanfritte… et j'ai marché. Liègenoir, c'est au bout de cette route. Tu vois les cheminées, là-bas ?");
 await say('Luciole',"Mon père dit que Liègenoir, c'était la Cité Ardente. Les forges, les fêtes, le 15 août en Outremeuse… Maintenant, il paraît qu'il n'y fait plus jamais jour.");
 await say('Luciole',"Snow est là-bas. Et derrière Snow, il y a quelqu'un d'autre. Un type qu'on appelle « le Baron ». Reste sur tes gardes.");
 await lienChoix('luciole','Luciole',"…Tu m'écoutes, au moins ?",[["Je veillerai sur toi.",'coeur',1,"Je sais me défendre, idiot. …Mais merci."],["T'inquiète, j'ai Laïka. Elle mord les barons.",'ami',1,"Elle mord surtout les fricadelles. Mais ok."],["Tu me ralentis, là.",'froid',-2,"…Charmant."]]);
 await say('Luciole',"Ah, et au sud de la route, il y a le Ranch du Pays de Herve. Si tu trouves des œufs, c'est là qu'il faut aller.");await lienCheck('luciole');
 await tween(500,q=>{lu.k=1-q;lu.place()});killTemp(lu)}
async function poudreScene(){const f=F();f.poudre=1;sfx(90,.4,'sawtooth',.15);camShake(300,.1);
 await say('',"Un Pigeolet tombe du ciel juste devant toi. Ses yeux brillent d'un violet malsain, ses plumes fument. Il est couvert d'une poudre mauve.");
 await say('',"Il attaque sans prévenir !");const m=mkMon('pigeolet',26);m.atk=Math.round(m.atk*1.5);m.spd=Math.round(m.spd*1.4);m.dope=1;
 const res=await battle({wild:m,music:'keto'});
 const[x,z]=lucFree(cur,player.x-1,player.z+1);const lu=await tempChar('luciole',x,z,'up');lu.face(dirTo(lu,player.x,player.z));
 await say('Luciole',res==='caught'?"Tu l'as attrapé… Bien. Dans une Lumisphère, au moins, il est à l'abri. Regarde la poudre sur ses plumes.":"Il s'est enfui… Regarde ce qu'il a laissé par terre. Cette poudre mauve.");
 await say('Luciole',"C'est de la Poudre d'Éclat. De l'Éclat raffiné, comme celui du Fusionneur de la Prof. Les Lumons qui en avalent deviennent plus forts, plus rapides… puis ils s'éteignent. Pour de bon.");
 await say('Luciole',"Les Kétosaures la vendent aux dresseurs qui veulent gagner à tout prix. Et ça vient de Liègenoir. Allez, on y va.");
 await lienChoix('luciole','Luciole',"…Ça va, toi ?",[["Ça me retourne. Ce pauvre Lumon…",'coeur',1,"T'as un cœur gros comme un terril. C'est pour ça que je te suis."],["On va leur faire bouffer leur poudre.",'ami',1,"Ça, c'est un programme."],["Bah. Chacun prend ce qu'il veut.",'froid',-2,"…Tu dirais pas ça si t'avais vu ce que j'ai vu."]]);await lienCheck('luciole');
 await tween(500,q=>{lu.k=1-q;lu.place()});killTemp(lu);setObj()}
// ---- 2. Liègenoir
async function lieArrivee(){const f=F();f.lie=1;await banner('Liègenoir','La Cité Ardente… éteinte',2600);
 await say('',"Il est midi, et pourtant il fait noir. Un smog épais, orange sale, couvre la ville. Ça sent le charbon brûlé. Sur les murs, des tags mauves : un dinosaure couronné, et partout le même slogan : « LE BARON C'EST LE PATRON ».");
 await say('',"Les volets sont fermés. Seuls brillent les néons du club, au nord de la place, et les vitrines rouges, à l'est.");setObj()}
async function samiraTalk(){const f=F(),N='Samira, éducatrice de rue';
 if(f.ch5done){await say(N,"Les petits ont arrêté de chanter les chansons du Baron. Ils chantent celle de Lil Perron, la nouvelle. Celle sur le soleil. C'est pas du Brel, mais c'est mieux.");return}
 if(f.samira){if(f.alexDon&&!f.alexDonVu){f.alexDonVu=1;await say(N,"Tu sais quoi ? Un chauffeur en costume est passé ce matin. Il m'a donné une enveloppe : deux mille euros, « pour les gamins ». Il a dit qu'il s'appelait Alex. Tu le connais ?");return}await say(N,["Le Baron a trois piliers : la Cokerie, le club, et ses chansons. Fais tomber les trois.","Si tu passes rue des Vitrines, parle à Jade. Elle sait des choses sur le Baron. Elle a peur, sois doux.","L'inspecteur Lambert, à l'arène, est le seul flic qui n'a pas été acheté. Il est fatigué, mais il est honnête."][(rnd()*3)|0]);return}
 await say(N,"Toi, t'es pas d'ici. Ça se voit : tu regardes encore les gens dans les yeux. Moi, c'est Samira. Je m'occupe des jeunes du quartier… de ceux qui restent.");
 await say(N,"Liègenoir appartient au Baron. Sa Cokerie fabrique la Poudre d'Éclat : c'est elle qui crache ce smog. Il rackette les friteries, il « protège » les filles de la rue des Vitrines… en gardant leurs papiers.");
 await say(N,"Et il paie un rappeur, Lil Perron, pour faire des clips où les dealers roulent en Rolls et où la police est ridicule. Les gamins de dix ans connaissent les paroles par cœur. Ils veulent tous devenir « comme le Baron ».");
 const c=await choose(N,"Tu veux vraiment l'aider, cette ville ?",["Oui. On commence par où ?","Le Baron, je vais le défoncer."]);
 await say(N,c?"Doucement, cow-boy. La colère, c'est son carburant à lui. Commence par l'arène : l'inspecteur Lambert peut t'ouvrir la Cokerie.":"Par l'arène. L'inspecteur Lambert est le seul à pouvoir te faire entrer à la Cokerie. Et après… il faudra faire taire les fours.");
 f.samira=1;
 await say(N,"Attends. Une dernière chose. Les petits ont trouvé ça dans une caisse des Kétosaures, à la gare. Un œuf. Le Baron fait couver des Lumons pour les droguer dès la naissance.");
 await say(N,"Prends-le. Au sud de la Route 5, il y a le Ranch du Pays de Herve. Mariette saura s'en occuper. Ici, il ne verrait jamais le soleil.");
 {const e=mkEgg('tchantchou',null,rnd()<1/100);e.left=e.total=600;const r=ranchGiveEgg(e);f.oeufSamira=1;sfx(784,.15);sfx(1046,.25);await banner('Tu as reçu un Œuf !',r==='couveuse'?'Déposé dans la couveuse du Ranch':'Marche pour le faire éclore',2000)}
 setObj()}
async function gaminsRap(){const f=F();if(f.ch5done){await say('Gamin',"♪ Le soleil s'est levé sur le Perron, on a éteint la nuit, on a gardé le son ! ♪ …C'est la nouvelle de Lil Perron. Elle est trop bien.");return}
 await say('Gamin',"♪ Le Baron c'est l'patron, on fait des ronds au Perron, la police on s'en fout, nous on veut des sous-sous-sous ! ♪");
 await say('Gamin',"Plus tard, je serai guetteur pour les Kétosaures. Ils gagnent cinquante euros par jour juste pour crier « ARAH » quand la police arrive. C'est mieux que l'école.")}
async function maigreTalk(){const f=F(),N='Homme maigre';if(f.ch5done){await say(N,"Samira m'a trouvé une place en cure. Je pars demain. …Merci. Je sais pas pourquoi je te dis merci. Mais merci.");return}
 await say(N,"T'as pas… t'as pas un peu de poudre ? Non ? Pour mon Lumon, hein. Il est fatigué. Moi aussi.");
 await say('',"Il a les yeux rouges, les mains qui tremblent. Son Ratoir, roulé en boule à ses pieds, ne bouge presque plus. Le même violet terne dans le regard que le Pigeolet de la Route 5.")}
async function jadeTalk(){const f=F(),N='Jade';
 if(f.ch5done){await say(N,f.jade?"Mes papiers. Mon nom. J'avais oublié ce que ça faisait de les tenir dans mes mains. Je rentre chez ma mère, à Verviers. Je t'enverrai une carte.":"Le Baron est tombé. Les néons s'éteignent un par un. On va enfin pouvoir partir, toutes.");return}
 if(f.jade){await say(N,"Le coffre est derrière le bar du Perron Noir. Si tu fais tomber le Baron… pense à nous.");return}
 await say(N,"…Tu cherches quelqu'un ? Non ? Alors circule, c'est mieux pour toi. Les guetteurs regardent.");
 const c=await choose(N,"Pourquoi tu restes là ?",["Je viens faire tomber le Baron.","Rien, pardon."]);if(c){await say(N,"C'est ça. Bonne soirée.");return}
 await say(N,"…Tu parles fort, toi. Le Baron nous a « fait venir » ici. Il a gardé nos papiers « pour les protéger ». Sans papiers, on ne peut pas partir. On travaille, on rembourse une dette qui ne finit jamais.");
 await say(N,"Il les garde dans un coffre, derrière le bar de son club. Si un jour quelqu'un le fait tomber… rapporte-les. S'il te plaît.");f.jade=1}
// ---- 3. Arène de l'inspecteur Lambert
async function lambertTalk(){const f=F(),M='Inspecteur Lambert';
 if(f.badge3){await say(M,f.ch5done?"Le Baron est en cellule. Pour la première fois depuis des années, mes collègues ne regardent pas leurs chaussures. Merci, gamin.":"La Médaille Perron t'ouvre la Cokerie. Les gardes de l'entrée sont des Kétosaures, mais ils respectent une médaille d'arène. Coupe-moi ces fours.");return}
 await say(M,"Inspecteur Lambert, police de Liègenoir. Et maître d'arène, à mes heures. Ici, c'est type Ténèbres : je combats le crime avec ses propres armes.");
 await say(M,"Le Baron ? Ça fait cinq ans que je le traque. Mes chefs ont été achetés, mes collègues ont peur. Toi, t'es libre. Montre-moi que tu tiens le choc… et je t'ouvre la Cokerie.");
 const res=await battle({trainer:{name:'Inspecteur Lambert',key:'lambert',smart:.6,prize:200,mons:[mkMon('ratoir',29),mkMon('smogule',30),mkMon('perronrat',32)],win:"Pas mal. Pas mal du tout. T'as le cran qu'il me manque depuis des années.",lose:"Le crime ne pardonne pas, gamin. Reviens quand tu seras prêt."}});
 if(res!=='win')return;f.badge3=1;S.badges=S.badges||[];if(!S.badges.includes('perron'))S.badges.push('perron');sfx(784,.15);sfx(1046,.3);
 await banner('Médaille Perron obtenue !',"Arène de Liègenoir · la Cokerie t'est ouverte",2600);
 await say(M,"La Médaille Perron. Les gardes de la Cokerie la reconnaîtront. Une fois dedans, il faut arrêter la batterie de fours. Lis bien la consigne de sécurité : une erreur, et tout saute.");setObj()}
// ---- 4. Cokerie : les fours (énigme)
async function cokeriePorte(){const f=F();if(!f.badge3){await say('Garde de la Cokerie',"Cokerie privée. Propriété du Baron. Pas de médaille, pas d'entrée. Et même avec une médaille… réfléchis bien.");return}
 if(!f.cokerieIn){f.cokerieIn=1;await say('Garde de la Cokerie',"…Une Médaille Perron. Lambert t'envoie ? Bon. Je t'ai pas vu. Personne ne t'a vu.")}await goMap(COKERIE,6,8,'up')}
function cokeOrder(){return COKE_T.map((t,i)=>[t,i]).sort((a,b)=>a[0]-b[0]).map(x=>x[1])}
async function vanne(k){const f=F(),m=COKERIE;if(f.cokerie){await say('',"Le four est éteint. La tôle refroidit en craquant.");return}
 if(!f.rudi||!f.vanessa){await say('',"Une vanne rouge, brûlante. Quelqu'un te surveille… Occupe-toi d'abord des Kétosaures de la Cokerie.");return}
 m.seq=m.seq||[];if(m.seq.includes(k)){await say('',"Celui-là est déjà coupé.");return}
 const ok=cokeOrder()[m.seq.length]===k;sfx(ok?320:120,.25,'square',.12);
 if(!ok){m.seq=[];m.fours.forEach(o=>{o.fire.visible=true;o.v.rotation.z=0});camShake(500,.25);sfx(60,.6,'sawtooth',.3);if(typeof flashScr==='function')flashScr('#ff7a1a',400,.6);
  await say('',"BOUM ! Un jet de vapeur brûlante… Les sécurités se déclenchent et RALLUMENT tous les fours. Relis la consigne de sécurité.");return}
 m.seq.push(k);const o=m.fours[k];await tween(400,q=>o.v.rotation.z=q*PI);o.fire.visible=false;
 if(m.seq.length<4){await say('',`Tu tournes la vanne du four à ${COKE_T[k]} °C. Il s'éteint dans un long soupir. (${m.seq.length}/4)`);return}
 f.cokerie=1;sfx(523,.2);sfx(659,.2);sfx(784,.4);camShake(400,.12);
 await say('',"Le dernier four s'éteint. La Cokerie se tait. Pour la première fois, on entend… le silence. Et dehors, quelqu'un crie : « La fumée ! Regardez, la fumée s'arrête ! »");
 const[x,z]=lucFree(cur,player.x+1,player.z+1);const lu=await tempChar('luciole',x,z,'up');lu.face(dirTo(lu,player.x,player.z));
 await say('Luciole',"T'as réussi ! J'étais dans la ruelle derrière, j'ai suivi un camion de Poudre. Il allait au Perron Noir, le club du Baron. Snow y est entré aussi.");
 await say('Luciole',"Mais le videur ne laisse entrer qu'avec le mot de passe. Il paraît que ce rappeur, Lil Perron, le connaît. Il tourne son clip en haut de la Montagne de Bueren.");
 await lienChoix('luciole','Luciole',"Quoi ? Pourquoi tu me regardes comme ça ?",[["T'as suivi un camion du Baron toute seule ? Fais attention à toi.",'coeur',1,"…Personne m'a jamais dit de faire attention à moi. C'est bizarre. C'est pas désagréable."],["Bien joué, l'espionne.",'ami',1,"Observatrice. Nuance. Mais merci."],["T'aurais pu m'aider avec les fours.",'froid',-1,"J'étais occupée à te trouver le club. De rien."]]);await lienCheck('luciole');
 await say('',"En repartant, tu jettes un œil dans le four le plus froid. Entre deux briques encore tièdes, quelque chose brille… Un œuf ! Un vieil ouvrier l'avait caché là, au chaud, comme on faisait avant.");
 {const r=ranchGiveEgg(mkEgg('cokelin',null,rnd()<1/100));sfx(784,.15);sfx(1046,.25);await banner('Tu as trouvé un Œuf de Cokelin !',r==='couveuse'?'Déposé dans la couveuse du Ranch':r?'Marche pour le faire éclore':'Plus de place pour lui… Il reste au chaud dans le four.',2000)}
 await tween(500,q=>{lu.k=1-q;lu.place()});killTemp(lu);setObj()}
// ---- 5. Montagne de Bueren : 374 marches (pied gauche, pied droit, en alternance, avant la fin du chrono)
function escalierJeu(){return new Promise(res=>{let ov=$('stairs');if(!ov){ov=document.createElement('div');ov.id='stairs';ov.className='ov';document.body.appendChild(ov)}
 const N=374;let s=0,t=30,last=null,done=false;
 const draw=()=>{ov.innerHTML=`<div class="panel stp"><div class="dnat">🪜 Montagne de Bueren — 374 marches</div><div class="dnah">Alterne pied gauche et pied droit ! ⏱ ${t}s</div>
  <div class="stbar"><i style="height:${s/N*100}%"></i><b>${s} / ${N}</b></div><div class="stk"><button class="btn stf" data-p="g">🦶 Gauche</button><button class="btn stf" data-p="d">Droite 🦶</button></div></div>`;
  ov.querySelectorAll('.stf').forEach(b=>b.onclick=()=>{if(done)return;const p=b.dataset.p;if(p===last){s=Math.max(0,s-6);sfx(140,.08,'square',.1)}else{s+=7;last=p;sfx(300+s,.03,'triangle',.06)}if(s>=N)end(true);else draw()})};
 const end=ok=>{if(done)return;done=true;clearInterval(iv);ov.innerHTML=`<div class="panel stp"><div class="dnat">${ok?'✦ Au sommet !':'… À bout de souffle'}</div><div class="dnah">${ok?'374 marches. Tes mollets s\'en souviendront.':`${s} marches. Tu redescends reprendre ton souffle.`}</div></div>`;
  setTimeout(()=>{hide('stairs');res(ok)},1300)};
 const iv=setInterval(()=>{t--;if(t<=0)end(false);else if(!done)draw()},1000);draw();show('stairs')})}
async function buerenEscalier(){const f=F();if(!f.cokerie&&!f.rap){await say('',"Un escalier interminable qui grimpe vers les coteaux. Là-haut, on entend des basses. Tu as autre chose à faire pour l'instant : la Cokerie crache toujours sa fumée.");return}
 if(f.rap){await goMap(BUEREN,5,6,'up');return}
 await say('',"La Montagne de Bueren : 374 marches. Tout en haut, des basses qui font trembler les vitres.");const ok=await escalierJeu();if(!ok)return;await goMap(BUEREN,5,6,'up')}
// battle de rap : à chaque tour, choisir la réplique qui rime ET qui ne fait pas l'apologie du crime
const RAP=[{l:"« Dans ma ville on fait la loi, le Baron c'est notre roi ! »",o:[["« Un roi qui vend d'la poudre aux gosses, c'est pas un roi, c'est un boss de la loi du plus fort… et il finit seul, crois-moi ! »",1],["« T'as raison, vive le Baron, moi aussi j'veux des millions ! »",0],["« Euh… j'aime bien les gaufres ? »",0]]},
 {l:"« J'ai les poches pleines, pas besoin d'école, l'argent sale ça rigole ! »",o:[["« L'argent sale, ça colle : ton p'tit frère te copie, et lui il quitte l'école. »",1],["« Grave, l'école c'est pour les nuls, vive la came et les bolides ! »",0],["« Moi j'ai que des pièces de vingt centimes, c'est la crise. »",0]]},
 {l:"« Liègenoir c'est la nuit, ici personne ne s'enfuit ! »",o:[["« La nuit c'est fini : les fours sont éteints, demain le soleil luit ! »",1],["« Ouais la nuit c'est la vie, on dort jamais, on deale la nuit ! »",0],["« Moi à vingt-deux heures, je suis au lit. »",0]]}];
function rapJeu(){return new Promise(res=>{let ov=$('rap');if(!ov){ov=document.createElement('div');ov.id='rap';ov.className='ov';document.body.appendChild(ov)}let r=0,score=0;
 const tour=()=>{if(r>=RAP.length){fin();return}const R=RAP[r],o=R.o.map(x=>x).sort(()=>rnd()-.5);
  ov.innerHTML=`<div class="panel rpp"><div class="dnat">🎤 Battle de rap — round ${r+1}/3</div><div class="rpl"><b>Lil Perron :</b> ${R.l}</div><div class="dnah">Ta réplique (elle doit rimer… et dire la vérité) :</div>${o.map(([t,ok],i)=>`<button class="btn alt rpo" data-ok="${ok}">${t}</button>`).join('')}<div class="dnah">Public : ${'🔥'.repeat(score)}${'·'.repeat(3-score)}</div></div>`;
  ov.querySelectorAll('.rpo').forEach(b=>b.onclick=()=>{const ok=b.dataset.ok==='1';score+=ok?1:0;sfx(ok?880:160,.15,ok?'triangle':'square',.12);b.classList.add(ok?'ok':'bad');setTimeout(()=>{r++;tour()},700)})};
 const fin=()=>{ov.innerHTML=`<div class="panel rpp"><div class="dnat">${score>=2?'🔥 Le public est avec toi !':'😶 Le public hésite…'}</div><div class="dnah">${score}/3 répliques qui touchent.</div></div>`;setTimeout(()=>{hide('rap');res(score)},1400)};
 tour();show('rap')})}
async function rapBattle(){const f=F(),N='Lil Perron';
 if(f.rap){await say(N,f.ch5done?"J'ai sorti un nouveau morceau : « Soleil sur le Perron ». Zéro dealer, zéro Rolls. Les gamins adorent. Comme quoi.":"Le mot de passe, c'est « Tchantchès ». Le Baron trouve ça drôle. Moi plus.");return}
 await say(N,"Yo yo yo ! Qui monte les 374 marches pendant MON clip ? Coupez la caméra ! …Toi, t'es le gamin qui a éteint la Cokerie ? Le Baron est vénère.");
 await say(N,"Tu veux le mot de passe du Perron Noir ? Gagne-le. Battle de rap. Trois rounds. Si le public est avec toi, je parle.");
 const sc=await rapJeu();if(sc<2){await say(N,"Hé hé. Le public a parlé. Reviens quand t'auras du flow, le touriste.");return}
 await say(N,"……");await say(N,"Ouais. T'as raison. C'est ça le pire. Le Baron me paie pour raconter une vie que j'ai jamais eue. Moi, avant, je rappais sur ma grand-mère et les boulets à la liégeoise.");
 await say(N,"Les petits de la place connaissent mes paroles par cœur. Et ils y croient. …Le mot de passe du club, c'est « Tchantchès ». Va. Et dis au Baron que Lil Perron démissionne.");
 f.rap=1;give('ombrelumi',2);setObj()}
// ---- 6. Le Perron Noir : le Baron
async function clubPorte(){const f=F(),V='Videur';if(f.ch5done){await goMap(CLUB,6,8,'up');return}
 if(!f.cokerie){await say(V,"Club privé. Dégage.");return}
 const c=await choose(V,"Mot de passe ?",["Euh… « Pèkèt » ?","« Tchantchès »","« Le Baron c'est le patron »"]);
 if(c!==1){await say(V,c===2?"Tout le monde dit ça. C'est pas le mot de passe. Dégage.":"Non. Dégage.");return}
 await say(V,"…Entre. Et essuie tes pieds, le Baron déteste la poussière. Surtout la mauve.");await goMap(CLUB,6,8,'up')}
async function baronScene(){const f=F(),Bn='Le Baron',SN='Snow';setSong('ketoboss');
 const ba=await tempChar('baron',6,3,'down'),sn=await tempChar('snow',8,3,'down');
 await say(Bn,"Ah ! Le petit héros d'Ixellette. Entre, entre. Tu as éteint ma Cokerie, débauché mon rappeur… Tu me coûtes cher, tu sais ? Assieds-toi. Un jus ? Une poudre ?");
 await say(Bn,"Tu crois que je suis le méchant ? Je donne du travail. Je donne du rêve. Les gens VEULENT ma Poudre. Les gamins VEULENT ma vie. Je ne force personne. …Enfin, presque personne.");
 await say(SN,"…Il drogue aussi les nôtres. Givrâle. Il en a mis dans sa gamelle. J'ai vu ses yeux devenir violets.");
 await say(Bn,"Snow, Snow. Tu bosses pour moi, tu te tais. Bon, le héros : on va régler ça entre gens civilisés. Mes Lumons à moi ont eu… un petit remontant.");
 const dope=(sp,lv)=>{const m=mkMon(sp,lv);m.atk=Math.round(m.atk*1.25);m.spd=Math.round(m.spd*1.2);m.dope=1;return m};
 const res=await battle({music:'ketoboss',trainer:{name:'Le Baron',key:'baron',boss:1,smart:.7,prize:400,mons:[dope('cokelin',32),dope('smogule',32),dope('ratoir',33),dope('perronrat',35)],
  win:"Impossible… Mes Lumons… ils ne se relèvent pas. Ils sont… éteints.",lose:"Tu vois ? La Poudre gagne toujours. Reviens quand tu auras compris le monde, petit."}});
 if(res!=='win'){killTemp(ba);killTemp(sn);setSong(cur.song);return}
 await say(SN,"Ses Lumons sont épuisés. Comme Givrâle l'était. …T'as gagné, le rockeur.");camShake(300,.08);
 await say(SN,"Le coffre est derrière le bar. Les papiers des filles, l'argent, les comptes. Prends tout. Moi je prends Givrâle, et je me tire.");
 await say(Bn,"Snow ! Espèce de traître ! Sans moi tu ne serais RIEN !");await say(SN,"Sans toi, je serais peut-être quelqu'un. On se reverra à Namuroc, le rockeur. Là-bas, on finira ce qu'on a commencé.");
 await tween(600,q=>{sn.k=1-q;sn.place()});killTemp(sn);
 sfx(660,.3,'square',.1);sfx(880,.3,'square',.1);await say('',"Des sirènes, dehors. La porte du club s'ouvre en grand.");
 const[x,z]=lucFree(cur,player.x-1,player.z);const la=await tempChar('lambert',x,z,'up');la.face(dirTo(la,ba.x,ba.z));
 await say('Inspecteur Lambert',"Monsieur le Baron. Vous êtes en état d'arrestation pour trafic de Poudre d'Éclat, racket, traite d'êtres humains et… mauvais goût vestimentaire. Ce dernier point est personnel.");
 await say(Bn,"Mes avocats vous mangeront tout cru, Lambert !");await say('Inspecteur Lambert',"Ils ont déjà essayé. Mais cette fois, j'ai les comptes du coffre. Merci, gamin.");
 await tween(700,q=>{ba.k=1-q;la.k=1-q;ba.place();la.place()});killTemp(ba);killTemp(la);
 if(f.jade)await say('',"Dans le coffre, une liasse de passeports attachés par un élastique. Tu les mets de côté pour Jade et les autres.");
 f.ch5done=1;give('megalumi',3);S.money+=300;setSong(cur.song);
 await goMap(LIE,14,8,'down');S.clock=6.5*60;updateEnv();
 await banner('Le soleil se lève sur Liègenoir','Chapitre 5 terminé',3200);
 await say('',"Les cheminées de la Cokerie ne fument plus. Le smog se déchire, et un soleil pâle se lève sur le Perron. Une à une, les fenêtres s'ouvrent. Quelqu'un met de la musique. Pas celle du Baron.");
 const[x2,z2]=lucFree(cur,player.x+1,player.z+1);const lu=await tempChar('luciole',x2,z2,'up');lu.face(dirTo(lu,player.x,player.z));
 await say('Luciole',"Regarde-moi ça. La Cité Ardente. …Snow va à Namuroc. Il n'a plus de patron, plus rien. Un type comme ça, c'est encore plus dangereux.");
 await say('Luciole',"Mais d'abord, va dormir. T'as une tête de zombie. Moi je vais appeler mon père : il faut qu'il sache, pour la Poudre. Les marins en trouvent dans les ports depuis des semaines.");
 if(!f.lucFroid){await lienChoix('luciole','Luciole',"…Et toi, tu vas faire quoi ?",[["Viens au Ranch avec moi. On se repose, tous les deux.",'coeur',2,"…Au Ranch. Avec toi. Ok. Je viendrai. Après avoir appelé mon père."],["Appelle ton père. Et dis-lui bonjour de ma part. Fort.",'ami',2,"Il va hurler. Il hurle toujours. Mais je lui dirai."],["Dormir. Seul. Bonne nuit.",'froid',-1,"…Ok. Bonne nuit, alors."]]);await lienCheck('luciole',true)}
 await tween(500,q=>{lu.k=1-q;lu.place()});killTemp(lu);setObj();if(typeof saveGame==='function')saveGame()}
