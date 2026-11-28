/* ---- Chapitre 9 : la Côte du Nord ----
   Le cargo « Northern Star » de Gravenholding charge des Lumons traités à l'Éclat pour l'équipe du Champion. Captain, le père de
   Luciole, veut l'aborder. La réconciliation de Luciole et de son père dépend de ta relation avec elle.
   1. Route 9 (f.r9) : Luciole rentre au port de son enfance (sauf si elle est distante). 2. Côte du Nord (f.cote).
   3. Facultatif : la pêche à la crevette à cheval avec Rik (mini-jeu, f.crevettes).
   4. Arène des Éoliennes, Jef, type Électrik (f.badge7, Médaille Éolienne). 5. Captain sur la digue (f.capCote) -> l'estacade.
   6. Le « Northern Star » : les cages, le commandant Visser (f.ch9done) -> les preuves de la triche. */
CH.jef={skin:'#e8c4a0',hair:'#f6e8a0',hs:'messy',shirt:'#3a8adf',jacket:'#f6e84a',pants:'#2b2b33',boots:'#3a3a3a',eye:'#3a8adf'};
CH.visser={skin:'#e8c4a0',hair:'#e8e4e0',hs:'short',beard:1,beardC:'#e8e4e0',shirt:'#f4f4f8',jacket:'#1a2a4a',collar:1,hat:'fisher',hatC:'#1a2a4a',pants:'#1a2a4a',boots:'#1a1a1a',eye:'#3a5a7a'};
Object.assign(ICON,{preuves:icoB('#1a2a4a','#f6e84a','!')});
Object.assign(ITEMS,{preuves:{n:'Bons de livraison',d:"Les bons de livraison du « Northern Star » : « Lumons traités à l'Éclat — équipe du Champion — à l'attention de M. le Président ». La preuve de la triche.",price:0,quest:1}});
function ch9Obj(){const f=F();if(f.ch9done)return ch10Obj();
 if(!f.r9)return"Gandoux, sortie ouest : la Route 9 traverse les dunes jusqu'à la Côte du Nord";if(!f.cote)return"Suis la Route 9 à travers les dunes jusqu'à la Côte du Nord";
 if(!f.badge7)return"Défie l'arène des Éoliennes (type Électrik), sur la digue de la Côte du Nord";
 if(!f.capCote)return"Retrouve Captain sur la digue, au pied de l'estacade";
 return"Monte à bord du « Northern Star », au bout de l'estacade"}
// ---- 1. Route 9
async function r9Entree(){const f=F();f.r9=1;setObj();await banner('Route 9','Les dunes',2200);
 const v=lienVoie('luciole');if(v==='froid'){await say('',"Le vent du large te fouette le visage. Ça sent le sel et les frites. Quelque part au bout de ces dunes, il y a la mer.");setObj();return}
 const[x,z]=lucFree(cur,player.x-1,player.z+1);const lu=await tempChar('luciole',x,z,'up');lu.face(dirTo(lu,player.x,player.z));const L='Luciole';
 await say(L,"…Tu sens ? Le sel. Je suis née là-bas, au bout des dunes. Mon père y a son port. Je n'y suis pas retournée depuis mes quinze ans.");
 await say(L,"Il m'a appelée hier. Il veut aborder un cargo du Président. Il a dit : « J'ai besoin de toi, moussaillon. » Il m'appelait comme ça quand j'étais petite.");
 await lienChoix('luciole',L,"…Tu crois que je peux rentrer à la maison, après tout ce temps ?",[["Oui. Il t'attend depuis le premier jour.",'coeur',1,"…T'es nul. Tu me fais pleurer au milieu des dunes. Merci."],["On y va ensemble. Et s'il crie, Laïka le mord.",'ami',1,"Ha ! Elle le mordra pas. Elle mord que les fricadelles."]]);
 await tween(500,q=>{lu.k=1-q;lu.place()});killTemp(lu);setObj()}
// ---- 2. Côte du Nord
async function coteArrivee(){const f=F();f.cote=1;await banner('Côte du Nord','La digue, la mer, le vent',2600);
 await say('',"La mer du Nord, grise et immense. Des éoliennes au large, qui tournent dans la brume. Sur la digue, des cuistax, des glaces, des mouettes qui volent les frites.");
 await say('',"Au bout de l'estacade, un énorme cargo noir : « NORTHERN STAR ». Des grues chargent des caisses. Des caisses qui bougent.");setObj()}
// ---- 3. La pêche à la crevette à cheval (mini-jeu facultatif)
function crevetteJeu(){return new Promise(res=>{let ov=$('crevette');if(!ov){ov=document.createElement('div');ov.id='crevette';ov.className='ov';document.body.appendChild(ov)}
 let x=0,dir=1,n=0,t=20,done=false,zc=50+Math.random()*30-15;const W=14;
 const draw=()=>{ov.innerHTML=`<div class="panel stp"><div class="dnat">🐴 Pêche à la crevette à cheval</div><div class="dnah">Lance le filet quand le cheval passe sur le banc de crevettes ! ${n}/5 · ⏱ ${Math.ceil(t)} s</div>
  <div style="position:relative;height:34px;margin:14px 6px;border-radius:17px;background:#2f6f9f"><b style="position:absolute;top:0;bottom:0;left:${zc-W/2}%;width:${W}%;background:#e8d4a0aa;border-radius:12px"></b>
  <i style="position:absolute;top:-6px;left:calc(${x}% - 11px);width:22px;height:46px;border-radius:9px;background:#8a5a3a;box-shadow:0 0 8px #000"></i></div>
  <div class="stk"><button class="btn crv">🎣 Lancer le filet !</button></div></div>`;
  ov.querySelector('.crv').onclick=()=>{if(done)return;if(Math.abs(x-zc)<=W/2){n++;sfx(880,.08,'triangle',.08);zc=15+Math.random()*70;if(n>=5){end(true);return}}else{sfx(140,.1,'square',.08);t=Math.max(0,t-1.5)}draw()}};
 const end=ok=>{if(done)return;done=true;clearInterval(iv);ov.innerHTML=`<div class="panel stp"><div class="dnat">${ok?'✦ Filet plein !':'… Marée montante'}</div><div class="dnah">${ok?'Cinq bancs de crevettes ! Rik siffle d\'admiration.':`${n} banc${n>1?'s':''} sur 5. La mer remonte, il faut rentrer.`}</div></div>`;setTimeout(()=>{hide('crevette');res(ok)},1400)};
 const iv=setInterval(()=>{if(done)return;t-=.05;x+=dir*1.6;if(x>=100){x=100;dir=-1}if(x<=0){x=0;dir=1}if(t<=0){end(false);return}draw()},50);draw();show('crevette')})}
async function crevetteJeuTalk(){const f=F(),N='Rik, pêcheur à cheval';
 if(f.crevettes){await say(N,"Mon cheval s'appelle Bertha. Elle a vingt-deux ans. Elle connaît la mer mieux que moi. Toi, t'as la main, petit. Reviens pêcher quand tu veux.");
  const c=await choose(N,"Une autre pêche ?",["Allez !","Non merci"]);if(c)return;const ok=await crevetteJeu();if(ok){give('supersirop',1);await say(N,"Encore un filet plein ! Tiens, pour la peine.")}return}
 await say(N,"Ici, on pêche la crevette à cheval. Depuis cinq cents ans. Le cheval tire le filet dans les vagues, à marée basse. Il n'en reste plus que quelques-uns comme moi.");
 const c=await choose(N,"Tu veux essayer ? Monte sur Bertha, elle est gentille.",["Oui !","Une autre fois"]);if(c)return;
 const ok=await crevetteJeu();if(!ok){await say(N,"Pas mal, pour un premier essai ! La mer ne pardonne pas, mais elle revient deux fois par jour. Reviens.");return}
 f.crevettes=1;await say(N,"Cinq bancs ! T'es un vrai pêcheur, toi. Tiens : des crevettes pour tes Lumons, et ce petit-là qui s'était pris dans le filet. Il ne veut plus te lâcher.");
 give('supersirop',3);const m=mkMon('crevetin',42);calc(m);m.hp=m.mhp;S.dex.seen.crevetin=S.dex.caught.crevetin=1;const w=receiveMon(m);
 await banner('Crevetin rejoint ton équipe !',w==='box'?'Envoyé au PC de stockage':'Tik-tik !',2200)}
// ---- 4. Jef, arène des Éoliennes
async function jefTalk(){const f=F(),M='Jef, maître des Éoliennes';
 if(f.badge7){await say(M,f.ch9done?"Le cargo du Président, saisi ? Ha ! Les éoliennes ont tourné deux fois plus vite cette nuit. Je te jure.":"La Médaille Éolienne ! Plus qu'une. Celle de Bruxellia. Et après… la Ligue. Que le vent te porte, man.");return}
 await say(M,"Yo ! Jef. Surfeur le matin, ingénieur éolien l'après-midi, maître d'arène le soir. Ici, c'est type Électrik. On recharge nos Lumons au vent du large.");
 await say(M,"Captain t'attend sur la digue, hein ? Il m'a dit de te tester d'abord. Il ne monte à l'abordage qu'avec des gens qui ont du courant dans les veines.");
 const res=await battle({trainer:{name:'Jef, maître des Éoliennes',key:'jef',smart:.68,prize:340,mons:[mkMon('eolys',48),mkMon('anguimeuse',48),mkMon('cervolt',49),mkMon('eolys',50)],win:"Court-jus total ! T'as plus de courant que mes éoliennes, man.",lose:"Le vent a tourné, man. Va recharger tes batteries !"}});
 if(res!=='win')return;f.badge7=1;S.badges=S.badges||[];if(!S.badges.includes('eolienne'))S.badges.push('eolienne');sfx(784,.15);sfx(1046,.3);
 await banner('Médaille Éolienne obtenue !','Arène de la Côte du Nord · septième médaille',2600);
 await say(M,"La Médaille Éolienne. Captain t'attend sur la digue, au pied de l'estacade. Dis-lui que Jef te recommande. Il va grogner. C'est sa façon de dire merci.");setObj()}
// ---- 5. Captain sur la digue
async function captainCote(){const f=F(),C='Captain';
 if(f.ch9done){await say(C,"La mer est calme, matelot. Pour une fois. Tu reviens quand tu veux. Il y aura toujours une couchette pour toi sur mon bateau. Et des gaufres.");return}
 if(f.capCote){await say(C,"Au bout de l'estacade ! Mes Pirates s'occupent des grues. Toi, tu montes à bord et tu ouvres les cages. À L'ABORDAGE !");return}
 if(!f.badge7){await say(C,"MATELOT ! Tu tombes bien. Ce cargo, là, le « Northern Star », c'est le bateau du Président. Il charge des Lumons dopés pour la Ligue. On va l'aborder.");
  await say(C,"Mais d'abord, va voir Jef à l'arène des Éoliennes. Je ne monte à l'abordage qu'avec des gens qui ont gagné leur médaille ici. Tradition de pirates. Je viens de l'inventer.");return}
 f.capCote=1;const v=lienVoie('luciole');
 if(v!=='froid'){const[x,z]=lucFree(cur,player.x+1,player.z);const lu=await tempChar('luciole',x,z,'up');lu.face(dirTo(lu,NPC.capCote.x,NPC.capCote.z));
  await say(C,"…Moussaillon.");await say('Luciole',"…Papa.");
  await say('',"Un long silence. Le vent, les mouettes. Puis Captain ouvre ses grands bras tatoués, et Luciole s'y jette. Laïka remue la queue si fort qu'elle en tombe assise.");
  await say(C,"Pardon, moussaillon. J'ai crié trop fort, pendant trop longtemps. J'avais peur que tu partes. Alors tu es partie.");
  await say('Luciole',"T'es un vieux crétin. …Je suis rentrée, maintenant.");
  if(F().lucCouple)await say(C,"Et toi, matelot. Ma fille m'a tout dit. T'APPROCHES PAS D'… non. Non. Je rigole. Prends soin d'elle. Elle est plus forte que nous deux.");
  await tween(500,q=>{lu.k=1-q;lu.place()});killTemp(lu)}
 else await say(C,"Ma fille n'est pas venue. Elle a dit qu'elle ne voulait voir personne. Pas même moi. …Pas même toi, matelot. Allez. On a un cargo à prendre.");
 await say(C,"Mes Pirates bloquent les grues. Toi, tu montes à bord par l'estacade. Il y a des cages dans la cale. Et un commandant qui ne va pas aimer ta tête. À L'ABORDAGE !");setObj()}
async function naviPorte(){const f=F();if(f.ch9done){await say('',"Le « Northern Star » est sous scellés. Des policiers en ciré jaune font l'inventaire. Ils comptent les caisses. Il y en a beaucoup.");return}
 if(!f.capCote){await say('Marin de quart',"Accès interdit ! Propriété de Gravenholding. Circulez.");return}
 await say('',"Pendant que les Pirates de Captain chantent faux en bloquant les grues, tu te glisses sur la passerelle.");await goMap(NAVIRE,6,13,'up')}
async function cageNavire(){await say('',F().ch9done?"La cage est ouverte et vide.":"Dans la cage, un Lumon sauvage aux yeux qui brillent d'un éclat mauve. Une étiquette : « traité à l'Éclat — dose 5 — pour l'équipe du Champion ».")}
// ---- 6. Le commandant Visser
async function visserScene(){const f=F(),V='Commandant Visser';if(f.ch9done){await say(V,"…");return}
 const vs=NPC.visser;vs.face(dirTo(vs,player.x,player.z));
 await say(V,"Un passager clandestin. Sur mon bateau. Pendant que des pirates chantent sur mon quai. Quelle soirée.");
 await say(V,"Ces Lumons partent pour Bruxellia. Pour la Ligue. Le Président les prend dans son équipe le jour du tournoi : plus forts, plus rapides, plus obéissants. Personne ne vérifie jamais. Pourquoi vérifier ? C'est lui qui fait les règles.");
 const res=await battle({music:'boss',trainer:{name:'Commandant Visser',key:'visser',boss:1,smart:.7,prize:420,mons:[mkMon('mouettor',49),mkMon('crevettor',50),mkMon('eolys',50),mkMon('gravenspectre',51)],win:"…Vous avez gagné. Et moi, je crois que je vais enfin dormir tranquille.",lose:"Par-dessus bord ! …Façon de parler."}});
 if(res!=='win')return;
 await say(V,"Prenez les bons de livraison, dans mon bureau. Signés par le Président lui-même. Il signe tout. Il croit que sa signature le protège.");
 give('preuves');await say('',"Tu ouvres les cages une par une. Les Lumons sortent, clignent des yeux, et filent vers les dunes. L'éclat mauve dans leurs yeux pâlit déjà.");
 f.ch9done=1;saveGame();await banner('Chapitre 9 terminé',"Les preuves de la triche · Bruxellia : la dernière médaille",3200);
 await goMap(COTE,26,9,'down');
 await say('Captain',"Les Lumons sont libres, le cargo est saisi, et mes Pirates ont chanté toute la nuit. Une belle prise, matelot !");
 phoneOn([['Agent','agent']]);await say('Agent Verhaegen (au téléphone)',"Les bons de livraison, le registre… On a tout. Maintenant, il faut le battre à la Ligue. Il te manque une médaille : celle de Bruxellia. Le maître de l'arène… tu le connais. Très bien, même.");
 await say('Agent Verhaegen (au téléphone)',"C'est Nour. Au Night White. Si, si. Il a toujours été maître d'arène. Il ne le dit à personne. Il trouve que ça fait « frimeur ».");phoneOff();setObj()}
