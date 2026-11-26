/* ===== 07_xp.js : réglage de l'XP du flipper et des scores des rivaux
   Repris de High & Rouillé et adapté à Lumons (voir game/flipper/LISEZMOI.md), src-jeu/new74.js (ne pas modifier ici : adapter 00_shim.js ou 09_hooks.js). ===== */
/* ---------- 4. flipper : expérience et classement ---------- */
{ const k='Nakai'; if(ARCR&&ARCR.pin&&ARCR.pin[0]&&ARCR.pin[0][0]===k) ARCR.pin=[['Jalal',250000],['Alex',140000],['Luciole',80000],['Amin',35000],['Danny',12000]]; }
/* l'XP du flipper est calculée dans rewards() (fermeture de GAMES.pin) : on corrige après coup le gain (score/25 → 8·√score, identique à 40 000 points) */
{ const _pin74=GAMES.pin; GAMES.pin=function(api){ const P=pbS(), lv0=P.lv, xp0=P.xp, end0=api.end;
    const api2=Object.assign({},api,{end:(score,note)=>{ try{ const lin=Math.floor(Math.max(0,score)/25), soft=Math.floor(8*Math.sqrt(Math.max(0,score)));
        if(soft<lin){ /* refait la montée de niveau avec le gain adouci */ const caps=Math.max(0,(P.xp-xp0)+[...Array(Math.max(0,P.lv-lv0))].reduce((a,_,i)=>a+pbNeed(lv0+i),0)-lin);
          let xp=xp0+soft+caps, lv=lv0; while(lv<PB_MAXLV&&xp>=pbNeed(lv)){ xp-=pbNeed(lv); lv++; } P.lv=lv; P.xp=xp;
          if(typeof note==='string') note=note.replace(/<b>\+[\d\s  ]+ XP<\/b> · niveau \d+[^<]*/,`<b>+${fmt(soft+caps)} XP</b> · niveau ${P.lv}${P.lv>=PB_MAXLV?' (max)':` · ${fmt(P.xp)}/${fmt(pbNeed(P.lv))}`}`).replace(/<span class="pbup">⬆ NIVEAU \d+ !<\/span>/,P.lv>lv0?`<span class="pbup">⬆ NIVEAU ${P.lv} !</span>`:'');
          try{ save(); }catch(_){} } }catch(_){} return end0(score,note); }});
    return _pin74.call(this,api2); }; }
