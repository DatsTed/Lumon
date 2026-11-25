/* ---- PC de stockage d'Alex Wagner (comme le PC de Léo dans Pokémon) ----
   S.box : Lumons rangés. Un Lumon reçu ou capturé avec une équipe pleine part au PC (rien n'est jamais perdu).
   Avant la présentation d'Alex (F().pcWagner), le PC garde les Lumons mais on ne peut pas encore les gérer.
   + colis de la Prof : reçu à Charleroc, ouvert chez la Prof (le 2e starter). */
function boxOf(){if(!S.box)S.box=[];return S.box}
// ajoute un Lumon à l'équipe, ou au PC si l'équipe est pleine (renvoie 'party' ou 'box')
function receiveMon(m){if(S.party.length<6){S.party.push(m);refreshFollower();return'party'}boxOf().push(m);return'box'}
async function pcMenu(){const f=F(),N='PC de stockage Wagner';sfx(880,.06,'square',.06);sfx(1320,.08,'square',.06);
 if(!f.pcWagner){await say('',`Le PC de la Maison des Lumons. Un logo clignote : « WAGNER STORAGE · bientôt disponible ». ${boxOf().length?`Il garde déjà ${boxOf().length} Lumon${boxOf().length>1?'s':''} en sécurité pour toi.`:''}`);return}
 await say(N,`Connexion au PC de stockage d'Alex Wagner… ${boxOf().length} Lumon${boxOf().length>1?'s':''} rangé${boxOf().length>1?'s':''}.`,{auto:700,fast:true});
 for(;;){const c=await pickList(`PC Wagner · équipe ${S.party.length}/6 · PC ${boxOf().length}`,[{html:'<span class="grow"><b>Retirer un Lumon</b> — du PC vers ton équipe</span>',dis:!boxOf().length},{html:'<span class="grow"><b>Déposer un Lumon</b> — de ton équipe vers le PC</span>',dis:S.party.length<=1},{html:'<span class="grow"><b>Échanger</b> — un Lumon du PC contre un de ton équipe</span>',dis:!boxOf().length}]);
  if(c<0)break;
  if(c===0){if(S.party.length>=6){await say(N,"Ton équipe est pleine. Utilise « Échanger » ou dépose d'abord un Lumon.");continue}const j=await pickList('Retirer quel Lumon ?',boxOf().map(m=>({html:partyRow(m)})));if(j<0)continue;const[m]=boxOf().splice(j,1);S.party.push(m);toast('team',`${nm(m)} rejoint ton équipe`)}
  if(c===1){const j=await pickList('Déposer quel Lumon ?',S.party.map(m=>({html:partyRow(m),dis:SP[m.sp].unique&&m===S.party.find(x=>SP[x.sp].unique)&&m.sp.startsWith('laik')})));if(j<0)continue;if(S.party[j].sp.startsWith('laik')){await say(N,"Laïka refuse catégoriquement d'entrer dans un PC. Elle te regarde comme si tu l'avais trahie.");continue}const[m]=S.party.splice(j,1);boxOf().push(m);toast('team',`${nm(m)} est rangé au PC`)}
  if(c===2){const j=await pickList('Prendre quel Lumon du PC ?',boxOf().map(m=>({html:partyRow(m)})));if(j<0)continue;const k=await pickList('En échange de quel Lumon ?',S.party.map(m=>({html:partyRow(m),dis:m.sp.startsWith('laik')})));if(k<0)continue;
   const a=boxOf()[j];boxOf()[j]=S.party[k];S.party[k]=a;toast('team',`${nm(a)} rejoint ton équipe`)}
  refreshFollower();saveGame()}
 await say(N,"Déconnexion. « Wagner Storage : vos Lumons, notre fierté. » … C'est Alex qui a écrit ce slogan, ça se sent.",{auto:900,fast:true})}

ITEMS.colisprof={n:'Colis de la Prof',d:"Un colis bien ficelé, avec « FRAGILE — Prof. Verhaegen » écrit au marqueur. Quelque chose de rond bouge dedans.",price:0,quest:1};
ICON.colisprof=ICON.colisnw;
// la Prof ouvre son colis : le 2e Lumon de départ
async function profColis(P){const f=F(),i=[0,1,2].find(k=>k!==f.nilsMon&&k!==f.starter);delete S.bag.colisprof;if(i==null)return;f.starter2=i;
 await say(P,"Oh ! Mon colis ! Josiane te l'a confié ? Ouvre-le, ouvre-le ! Il est pour toi, en fait.");
 const m=mkMon(STARTERS[i],8);S.dex.seen[STARTERS[i]]=S.dex.caught[STARTERS[i]]=1;sfx(784,.15);sfx(1046,.3);
 await say('',`Dans le colis, une Lumisphère tiède… À l'intérieur, ${SP[STARTERS[i]].n} te fait un clin d'œil.`);
 if(S.party.length>=6){const c=await choose(P,`Ton équipe est complète. Qu'est-ce qu'on fait de ${SP[STARTERS[i]].n} ?`,["Remplacer un Lumon de l'équipe","L'envoyer au PC"]);
  if(c===0){const j=await pickList(`Qui part au PC à la place de ${SP[STARTERS[i]].n} ?`,S.party.map(x=>({html:partyRow(x),dis:x.sp.startsWith('laik')})),false);const[o]=S.party.splice(Math.max(0,j),1,m);boxOf().push(o);await say('',`${nm(o)} part au PC. ${nm(m)} rejoint ton équipe !`)}
  else{boxOf().push(m);await say('',`${nm(m)} est envoyé au PC de stockage. Il t'attend bien au chaud.`)}}
 else{S.party.push(m);await banner(`${SP[STARTERS[i]].n} rejoint ton équipe !`,'Le cadeau de la Prof Verhaegen',2200)}
 refreshFollower();await say(P,`Prends bien soin de ${SP[STARTERS[i]].n}, hein. Et de ta Laïka aussi !`)}
