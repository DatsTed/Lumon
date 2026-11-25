async function testMode(){if(!S||!S.party||!player){await say('',"Lance ou continue une partie d'abord, puis reviens dans les Options.");return}
 const c=await choose('',"Mode test : tes Lumons passent au niveau 15, ton équipe est complétée jusqu'à 4 Lumons, tu reçois des objets, le Lumidex est entièrement déverrouillé (touche un Lumon pour le recevoir) et les fiches ont des boutons pour monter de niveau et évoluer. Ta partie sera modifiée. On y va ?",["Activer","Annuler"]);if(c)return;
 const up=m=>{if(m.lv>=15)return;m.lv=15;m.xp=15**3;m.moves=[];for(const[l,id]of SP[m.sp].L)if(l<=15&&!m.moves.some(x=>x.id===id)){m.moves.push({id,pp:MV[id].pp});if(m.moves.length>4)m.moves.shift()}
  while(SP[m.sp].evo&&m.lv>=SP[m.sp].evo[0])m.sp=SP[m.sp].evo[1];calc(m);m.hp=m.mhp};
 S.party.forEach(up);for(const sp of['chicorin','charbonnet','moulinet','gaufrelin']){if(S.party.length>=4)break;if(S.party.some(m=>m.sp===sp))continue;const m=mkMon(sp,5);up(m);S.party.push(m)}
 S.party.forEach(m=>{S.dex.seen[m.sp]=S.dex.caught[m.sp]=1;m.hp=m.mhp;m.status=null;m.moves.forEach(x=>x.pp=MV[x.id].pp)});
 give('lumisphere',10);give('supersirop',5);give('speculoos',3);S.money+=300;S.testMode=1;refreshFollower();saveGame();
 await banner('Mode test activé !',S.party.map(m=>nm(m)+' N.'+m.lv).join(' · '),2600)}
