async function testMode(){if(!S||!S.party||!player){await say('',"Lance ou continue une partie d'abord, puis reviens dans les Options.");return}
 const c=await choose('',"Mode test : tes Lumons passent au niveau 15, ton équipe est complétée jusqu'à 4 Lumons, tu reçois des objets, le Lumidex est entièrement déverrouillé (touche un Lumon pour le recevoir) et les fiches ont des boutons pour monter de niveau et évoluer. Ta partie sera modifiée. On y va ?",["Activer","Annuler"]);if(c)return;
 const up=m=>{if(m.lv>=15)return;m.lv=15;m.xp=15**3;m.moves=[];for(const[l,id]of SP[m.sp].L)if(l<=15&&!m.moves.some(x=>x.id===id)){m.moves.push({id,pp:MV[id].pp});if(m.moves.length>4)m.moves.shift()}
  while(SP[m.sp].evo&&m.lv>=SP[m.sp].evo[0])m.sp=SP[m.sp].evo[1];calc(m);m.hp=m.mhp};
 S.party.forEach(up);for(const sp of['chicorin','charbonnet','moulinet','gaufrelin']){if(S.party.length>=4)break;if(S.party.some(m=>m.sp===sp))continue;const m=mkMon(sp,5);up(m);S.party.push(m)}
 S.party.forEach(m=>{S.dex.seen[m.sp]=S.dex.caught[m.sp]=1;m.hp=m.mhp;m.status=null;m.moves.forEach(x=>x.pp=MV[x.id].pp)});
 give('lumisphere',10);give('supersirop',5);give('speculoos',3);S.money+=300;S.testMode=1;refreshFollower();saveGame();
 await banner('Mode test activé !',S.party.map(m=>nm(m)+' N.'+m.lv).join(' · '),2600)}
// Mode test : combat 2 contre 2 contre une équipe tirée au hasard (niveau proche du tien), pour tester les duos
const DUO_NOMS=['Duo de Kétosaures','Les jumeaux Peeters','Supporters du Sporting','Livreurs à vélo','Étudiants de Louvain','Les cousines De Smet','Gang du terril','Joueurs de pétanque'];
async function testDuo(){if(!S||!player||B)return;if(alive().length<2){await say('',"Il te faut au moins deux Lumons en forme pour un combat en 2 contre 2.");return}
 const lv=Math.max(5,Math.round(alive().reduce((a,m)=>a+m.lv,0)/alive().length)),pool=Object.keys(SP).filter(k=>!SP[k].unique&&!k.startsWith('laik')&&SP[k].b&&MODELS[k]||SP[k].fusion),n=2+((rnd()*3)|0);
 const mons=Array.from({length:n},()=>mkMon(pool[(rnd()*pool.length)|0],Math.max(2,lv-2+((rnd()*5)|0))));
 const name=DUO_NOMS[(rnd()*DUO_NOMS.length)|0];
 await battle({duo:2,music:'keto',trainer:{name,key:'keto',smart:.5,prize:0,mons,win:"Bien joué ! On remet ça quand tu veux.",lose:"Ha ! À deux, on est plus forts."}});
 S.party.forEach(m=>{m.hp=m.mhp;m.status=null;m.moves.forEach(x=>x.pp=MV[x.id].pp)})}
