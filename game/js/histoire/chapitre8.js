/* ---- Chapitre 8 : Gandoux, la ville des Comtes ----
   Les actionnaires de la Fondation Ardenne : « Gravenholding », à Gandoux. Derrière les sociétés écrans, un seul nom :
   Albéric Delvaux-Dewinter, Président de la Ligue d'Ardenval… et son Champion depuis douze ans.
   1. Bruxellia, sortie ouest (après f.ch7done). 2. Route 8 (f.r8) : l'agent au téléphone, Alex et l'invitation au Gala
      (réglo : chauffeur officiel ; combines : invitation du Marché gris, f.invitFausse -> le portier se méfie).
   3. Gandoux (f.gand). 4. Château des Comtes : la Comtesse Mathilde, type Spectre (f.badge6, Médaille Gravensteen).
   5. Gravenholding, le Gala (f.galaVu) : le Président ; les tableaux ; le coffre (f.coffre) ; Brutus ; le Registre et le panneau volé
      des « Juges intègres » (f.ch8done). 6. Facultatif : rendre le panneau à la cathédrale (f.panneau) -> un Agnelys. */
CH.comtesse={skin:'#f4dcc8',hair:'#2a1a14',hs:'long',shirt:'#3a2a4a',coat:1,pants:'#2a2030',boots:'#1a1a1a',eye:'#3a6a5a',glasses:0};
CH.president={skin:'#f0d0b0',hair:'#c8c4c0',hs:'slick',shirt:'#f4f4f8',jacket:'#1a1a2a',collar:1,tie:'#c9a14a',pants:'#1a1a2a',boots:'#1a1a1a',bw:1.05,eye:'#5a6a7a'};
CH.brutus={skin:'#c8946a',hair:'#141014',hs:'bald',shirt:'#141016',jacket:'#141016',pants:'#141016',boots:'#141016',bw:1.4,glasses:1,eye:'#2a2a2a'};
Object.assign(ICON,{invitation:icoB('#1a1a1e','#c9a14a','✉'),registre:icoB('#2a2a30','#c9a14a','▤'),panneau:icoB('#3a2a1a','#f6c80f','▣')});
Object.assign(ITEMS,{
 invitation:{n:'Invitation au Gala',d:"Un carton doré : « Gala de la Ligue d'Ardenval — Gravenholding, Gandoux ». Avec ça, on entre. Normalement.",price:0,quest:1},
 registre:{n:'Registre de Gravenholding',d:"Les vrais comptes : la Compagnie Grognon, le Baron, la Fondation Ardenne… et tout en haut, une signature. Albéric Delvaux-Dewinter, Président de la Ligue.",price:0,quest:1},
 panneau:{n:'Les Juges intègres',d:"Le panneau volé du retable de l'Agneau mystique, disparu depuis cent ans. Il était dans le coffre du Président. Il doit retourner à la cathédrale.",price:0,quest:1}});
function ch8Obj(){const f=F();if(f.ch8done)return ch9Obj();
 if(!f.r8)return"Bruxellia, sortie ouest : la Route 8 mène à Gandoux, chez les actionnaires de la Fondation";if(!f.gand)return"Traverse les polders de la Route 8 jusqu'à Gandoux";
 if(!f.badge6)return"Défie l'arène du Château des Comtes (type Spectre) : la Comtesse Mathilde";
 if(!f.galaVu)return"Le Gala de la Ligue a lieu chez Gravenholding (sud-ouest de Gandoux). Ton invitation t'y attend";
 return"Pendant le Gala, trouve le coffre du Président (un des tableaux cache quelque chose)"}
async function bruxOuest(){const f=F();if(!f.ch7done){await say('',"La route de l'ouest : « Route 8 — fermée pour travaux. Déviation par… » La suite du panneau est tombée. Pas maintenant.");player.face('right');return}
 await goMap(ROUTE8,34,8,'left')}
async function gandOuest(){const f=F();if(!f.ch8done){await say('',"La route de la côte : « Route 9 — fermée, tempête sur la mer du Nord ». Le vent hurle dans les dunes. Tu as encore à faire à Gandoux.");player.face('right');return}
 await goMap(ROUTE9,34,8,'left')}
// ---- 2. Route 8
async function r8Entree(){const f=F();f.r8=1;setObj();await banner('Route 8','Les polders',2200);
 phoneOn([['Agent','agent']]);const A='Agent Verhaegen (au téléphone)';
 await say(A,"J'ai fouillé l'ordinateur de la Directrice. Les actionnaires de la Fondation, c'est une seule société : Gravenholding, à Gandoux. Derrière, quinze sociétés écrans… et un seul nom.");
 await say(A,"Albéric Delvaux-Dewinter. Le Président de la Ligue d'Ardenval. Et son Champion, depuis douze ans. Personne ne l'a jamais battu. Maintenant, je sais pourquoi.");
 await say(A,"Ce samedi, il donne un Gala chez Gravenholding. Je ne peux pas y entrer : il connaît tous les policiers d'Ardenval. Toi, il ne te connaît pas. Enfin… pas encore.");phoneOff();
 const[x,z]=lucFree(cur,player.x-1,player.z+1);const al=await tempChar('alex',x,z,'up');al.face(dirTo(al,player.x,player.z));const L='Alex';
 await say(L,"Mon ami ! Je t'ai suivi avec le GPS de la Ruber. Ne me regarde pas comme ça, c'est pour ta sécurité.");
 if(lienVoie('alex')==='combine'){f.invitFausse=1;await say(L,"Le Gala de la Ligue ? J'ai ce qu'il faut. Deux invitations. Le Marché gris. Elles sont fausses, mais elles sont belles. Plus belles que les vraies, même.");
  await say(L,"Si le portier pose des questions, tu dis que t'es mon cousin. J'ai beaucoup de cousins.")}
 else{await say(L,"Le Gala de la Ligue ? Wagner Events a le contrat des voitures. Je t'embauche : chauffeur officiel. Voilà ton invitation, et ta casquette. Elle te va mal. C'est parfait.");
  await say(L,"Tu déposes les invités, tu te fais oublier, tu regardes partout. C'est ça, être chauffeur.")}
 give('invitation');await lienChoix('alex','Alex',"…Fais attention à toi, hein. Ce type-là, il achète les gens comme moi j'achète des pneus.",[["Merci, Alex. T'es un vrai pote.",'honnete',1,"Arrête, je vais pleurer dans le volant."],["T'inquiète, je sais mentir aussi bien que toi.",'combine',1,"…C'est ça qui m'inquiète, justement."]]);
 await tween(500,q=>{al.k=1-q;al.place()});killTemp(al);setObj()}
// ---- 3. Gandoux
async function gandArrivee(){const f=F();f.gand=1;await banner('Gandoux','La ville des Comtes',2600);
 await say('',"Des maisons à pignons en escalier se reflètent dans le canal. Des vélos partout. Le château gris, au nord, a l'air de surveiller la ville depuis mille ans.");
 await say('',"Sur les façades, des affiches dorées : « GALA DE LA LIGUE D'ARDENVAL — GRAVENHOLDING — EN PRÉSENCE DU PRÉSIDENT-CHAMPION ».");setObj()}
async function cathedrale(){const f=F(),N='Sacristain Hubert';
 if(f.panneau){await say(N,"Le retable est complet. Pour la première fois depuis cent ans. Les gens pleurent devant. Moi aussi. Mais en cachette.");return}
 if(S.bag.panneau){await say(N,"C'est… ce n'est pas possible. « Les Juges intègres ». Le panneau volé ! Où l'as-tu… Non. Ne me dis rien. Je ne veux pas savoir. Je veux juste le remettre à sa place.");
  delete S.bag.panneau;f.panneau=1;sfx(784,.15);sfx(1046,.3);await banner('Le retable est complet !',"L'Agneau mystique retrouve son panneau volé",2600);
  await say(N,"Quelque chose est sorti de la chapelle quand on l'a remis. Un petit agneau tout blanc, qui brille. Il est venu se coucher à tes pieds. Je crois qu'il t'a choisi.");
  const m=mkMon('agnelys',44);m.iv=[31,31,31,20];calc(m);m.hp=m.mhp;S.dex.seen.agnelys=S.dex.caught.agnelys=1;const w=receiveMon(m);
  await banner('Agnelys rejoint ton équipe !',w==='box'?'Envoyé au PC de stockage':"L'Agneau mystique t'a choisi",2400);setObj();return}
 await say(N,"Bienvenue à Saint-Bavon. Le grand retable de l'Agneau mystique, peint par les frères Van Eyck. Regarde en bas à gauche : il manque un panneau. « Les Juges intègres ».");
 await say(N,"Volé il y a cent ans. Le voleur a écrit qu'il reposait « là où personne ne peut l'enlever sans attirer l'attention ». On ne l'a jamais retrouvé. Si un jour tu le vois…")}
async function comtesseTalk(){const f=F(),M='Comtesse Mathilde';
 if(f.badge6){await say(M,f.ch8done?"Gravenholding louait mon château pour ses réceptions. Le contrat est annulé. Les fantômes sont soulagés. Moi aussi.":"Le Gala, c'est chez Gravenholding, au sud-ouest. Le Président y sera. Méfie-toi de lui : il sourit comme un tableau. Les tableaux ne sourient jamais par hasard.");return}
 await say(M,"Mathilde, comtesse sans comté et maîtresse de cette arène. Ici, les fantômes du château combattent à mes côtés. Type Spectre. Ils ne mordent pas. Enfin, pas tous.");
 await say(M,"Tu vas au Gala ? Alors tu auras besoin de sang-froid. Voyons si tu en as.");
 const res=await battle({trainer:{name:'Comtesse Mathilde',key:'comtesse',smart:.66,prize:320,mons:[mkMon('gravenfant',45),mkMon('smogule',45),mkMon('fagnelin',46),mkMon('gravenspectre',48)],win:"Mes fantômes s'inclinent. Et moi aussi. Tu as le cœur plus solide que mes remparts.",lose:"Les fantômes rient. C'est mauvais signe. Pour toi."}});
 if(res!=='win')return;f.badge6=1;S.badges=S.badges||[];if(!S.badges.includes('gravensteen'))S.badges.push('gravensteen');sfx(784,.15);sfx(1046,.3);
 await banner('Médaille Gravensteen obtenue !','Arène de Gandoux · sixième médaille',2600);
 await say(M,"La Médaille Gravensteen. Encore deux, et la Ligue t'ouvrira ses portes. Mais d'abord, le Gala. Je te donne un conseil de comtesse : dans les maisons des riches, on cache toujours les coffres derrière les tableaux.");setObj()}
// ---- 5. Le Gala
async function galaPorte(){const f=F(),P='Portier de Gravenholding';
 if(f.ch8done){await say('',"Des scellés de police sur la porte dorée. « Gravenholding — perquisition en cours ».");player.face('up');return}
 if(!S.bag.invitation){await say(P,"Gala privé. Invitation, s'il vous plaît. …Non ? Alors bonne soirée. Ailleurs.");return}
 if(!f.badge6){await say(P,"Invitation… correcte. Mais le Gala ne commence que ce soir. Revenez après avoir fait un tour en ville. La Comtesse, au château, reçoit les dresseurs, paraît-il.");return}
 if(f.invitFausse&&!f.portier){await say(P,"Hmm. Cette invitation… le papier est trop beau. Les vraies sont moins belles. Vous êtes qui, exactement ?");await say(S.name,"Le cousin d'Alex Wagner.");
  await say(P,"Alex Wagner a quarante-trois cousins sur la liste. Prouvez-le. Comme un vrai Wagner : en combat.");
  const res=await battle({trainer:{name:'Portier de Gravenholding',key:'brutus',smart:.5,prize:100,mons:[mkMon('perronrat',46),mkMon('sanglardenne',46)],win:"…Bon. Entrez. Vous avez bien le caractère d'un Wagner.",lose:"Pas de cousin, pas de gala."}});
  if(res!=='win')return;f.portier=1}
 await goMap(GALA,6,11,'up')}
async function galaScene(){const f=F();f.galaVu=1;player.walking=false;
 await say('',"Des lustres, du champagne, un quatuor à cordes. Des députés, des patrons, des dresseurs célèbres. Et au fond, derrière le comptoir doré, un homme aux cheveux d'argent qui sourit à tout le monde.");
 await presidentGala();setObj()}
async function presidentGala(){const f=F(),P='Président Albéric Delvaux-Dewinter';if(f.ch8done){await say('',"Le comptoir est vide.");return}
 const pr=NPC.president;pr.face('down');
 if(f.presVu){await say(P,"Profitez de la soirée, jeune homme. Les petits fours sont excellents. Le chef vient de Gandoux. Comme tout ce qui est bon.");return}f.presVu=1;
 await say(P,"Tiens, tiens. Le rockeur d'Ixellette. Celui qui a fait tomber le Baron, Grognon, et ma chère Isaure. Vous êtes une véritable petite entreprise de démolition.");
 await say(P,"Je ne vous en veux pas. Dans les affaires, il y a toujours de la casse. Et le Baron, entre nous, avait très mauvais goût.");
 await say(P,"Vous savez ce qu'est la Ligue d'Ardenval ? Un spectacle. Des millions de gens regardent. Et un spectacle a besoin d'un héros qui ne perd jamais. Moi.");
 const c=await choose(P,"Je vous propose un marché. Travaillez pour moi. Je vous ferai entrer à la Ligue sans médailles. Qu'en dites-vous ?",["Jamais.","Vous trichez depuis douze ans.","Je vais vous battre à la Ligue. Pour de vrai."]);
 await say(P,["Quel dommage. Les gens qui disent « jamais » finissent toujours par dire « peut-être ». Je suis patient.","Tricher ? Je préfère « optimiser ». Prouvez-le, si vous pouvez.","Ah ! Le grand défi. Il vous faut huit médailles, jeune homme. Et ensuite, il faudra me battre. Personne ne l'a jamais fait."][c]);
 await say('',"Il se détourne pour serrer d'autres mains. Derrière lui, au mur, quatre tableaux dans des cadres dorés. Brutus, son garde du corps, ne te quitte pas des yeux.")}
async function tableau(k){const f=F();if(f.ch8done){await say('',"Le tableau a été décroché par la police. Il reste un rectangle plus clair sur le mur.");return}if(!f.galaVu)return;
 const D=["Un paysage de polders. Un moulin, des vaches, un ciel immense. Rien derrière : le mur est froid.","Un portrait du Président, jeune, en tenue de Champion. Il sourit. Le cadre est vissé au mur.",
  "Le château de Gandoux sous la neige. Le cadre est un peu de travers… et derrière, le mur sonne creux.","Un bouquet de tulipes. Très beau. Très cher. Très ennuyeux. Rien derrière."];
 if(k!==2){await say('',D[k]);return}
 if(f.coffre){await say('',"Le coffre est ouvert et vide.");return}
 await say('',D[k]);const c=await choose('',"Tu décroches le tableau ?",["Oui, discrètement","Non"]);if(c)return;
 await say('',"Derrière le tableau, un coffre-fort. Ouvert. Le Président est si sûr de lui qu'il ne le ferme même pas pendant ses fêtes.");
 f.coffre=1;give('registre');give('panneau');
 await say('',"Dedans : un gros registre relié de cuir… et, enveloppé dans une couverture, un vieux panneau de bois peint. Des juges à cheval. Les Juges intègres. Le panneau volé de l'Agneau mystique !");
 const bg=NPC.brutus;bg.face(dirTo(bg,player.x,player.z));
 await say('Brutus, garde du corps',"Repose ça. Tout de suite.");
 const res=await battle({music:'boss',trainer:{name:'Brutus, garde du corps',key:'brutus',boss:1,smart:.62,prize:300,mons:[mkMon('sanglardenne',47),mkMon('perronrat',47),mkMon('gravenspectre',48)],win:"…Je suis payé pour garder le Président. Pas pour perdre contre des rockeurs.",lose:"Le Président te remercie de ta visite."}});
 if(res!=='win'){f.coffre=0;delete S.bag.registre;delete S.bag.panneau;return}
 f.brutus=1;const P='Président Albéric Delvaux-Dewinter';const pr=NPC.president;pr.face(dirTo(pr,player.x,player.z));
 await say(P,"Le registre. Bien sûr. Vous pouvez le garder, jeune homme. Montrez-le à qui vous voulez. Aux juges, aux députés, aux journalistes. Je les connais tous.");
 await say(P,"Mais il y a une règle que même moi je ne peux pas acheter : le Champion de la Ligue ne peut être destitué… que par un dresseur qui le bat. Article premier. C'est mon grand-père qui l'a écrit.");
 await say(P,"Venez me voir à la Ligue. Si vous avez huit médailles. Et si vous survivez à mon Conseil. Le panneau ? Gardez-le aussi. C'est mon grand-père qui l'a volé. Moi, je n'ai jamais aimé ce tableau.");
 await say('',"Le Président retourne à ses invités comme si de rien n'était. Le quatuor reprend. Alias, dans un coin, te fait un petit signe : il a tout vu. Et il a l'air ravi.");
 f.ch8done=1;saveGame();await banner('Chapitre 8 terminé',"Le Président t'attend à la Ligue · la Côte du Nord est ouverte",3200);
 await chapitre8Fin();setObj()}
async function chapitre8Fin(){await goMap(GAND,6,24,'up');phoneOn([['Agent','agent']]);const A='Agent Verhaegen (au téléphone)';
 await say(A,"Le registre… C'est tout. Tout est là. Mais il a raison, le salaud : tant qu'il est Champion, la loi de la Ligue le protège. Ce sont les statuts. Personne ne les a jamais changés.");
 await say(A,"Captain, le père de Luciole, a appelé. Un cargo de Gravenholding, le « Northern Star », est amarré à la Côte du Nord. Il charge des Lumons pour la Ligue. Va voir ça. Route 9, à l'ouest de Gandoux.");
 phoneOff()}
