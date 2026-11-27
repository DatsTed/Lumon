/* ===== 09_hooks.js : branchement du flipper sur Lumons (HOST, voir 00_shim.js) =====
   - une partie se paie en Lumisphères (HOST.pay) ; le bouton Jouer affiche le prix ;
   - chaque capture appelle HOST.capture (le Lumon rejoint l'équipe, l'œuf va dans le sac ou la couveuse) ;
   - les paliers de score donnent des œufs (HOST.palier) ;
   - les tickets de fin de partie sont rachetés par Jalal en euros (HOST.money) ;
   - quitter ferme l'iframe (HOST.close). */
ARC.pin.cost = 0;
{ const fix = () => document.querySelectorAll('#arcov [data-a="arcstart"]').forEach(b => { b.textContent = b.textContent.replace(/\s*·\s*0 cr/, ' · ' + HOST.costTxt()); });
  const top = () => { const e = document.getElementById('arctk'); if (e) e.textContent = lumHud(); };
  const _i = arcIntro; arcIntro = function(){ const r = _i.apply(this, arguments); fix(); top(); return r; };
  const _s = arcStart; arcStart = function(){
    if (!AOV || (AOV.stop && !AOV.over)) return;
    let ok = false; try { ok = HOST.pay(); } catch (e) { console.error(e); }
    if (!ok) return toast('Il te faut des Lumisphères pour jouer : ce sont les billes ! (' + HOST.costTxt() + ')');
    top(); return _s.apply(this, arguments); };
  const _e = arcEnd; arcEnd = function(score, note){
    const A = arcS(), tk0 = A.tk; const r = _e.apply(this, arguments); fix(); top();
    try { const d = lumEur(A.tk - tk0); if (d > 0) HOST.money(d); } catch (e) { console.error(e); }
    try { const P = pbS(); HOST.end({ score: Math.round(score), level: P.lv, captures: P.caps }); } catch (e) { console.error(e); }
    return r; };
  const _q = arcQuit; arcQuit = function(){ const r = _q.apply(this, arguments); try { HOST.close(); } catch (e) { console.error(e); } return r; }; }

Object.assign(ACT, { arc(d){ arcOpen(d.id); }, arcstart(){ arcStart(); }, arcquit(){ arcQuit(); } });

/* capture d'une chasse (lum = le Lumon ou l'œuf de la médaille) ou palier de score (sans lum) */
pbGrant = function(r, arc, lum){
  let res = null;
  try { res = lum ? HOST.capture(lum) : HOST.palier(r); } catch (e) { console.error(e); }
  const name = (res && res.name) || (lum && lum.name) || 'Lumon';
  try { const e = document.getElementById('arctk'); if (e) e.textContent = lumHud(); } catch (e) {}
  const rr = res && res.r != null ? res.r : r;
  return { m: null, name, r: rr, arc: arc ? 1 : 0 };
};

/* récap des captures en fin de partie */
pbRecap = function(list){
  return `<div class="pbrec"><b>🎁 Captures (${list.length})</b><div class="pbcap">${list.map(c =>
    `<button class="pbc" disabled style="--rc:${RAR[Math.max(0, Math.min(6, c.r))].c}"><i>${c.pal ? '🥚' : c.arc ? '⭐' : '✨'}</i><span>${c.name}</span><em>${RAR[Math.max(0, Math.min(6, c.r))].n}${c.pal ? ' · palier' : ''}</em></button>`).join('')}</div></div>`;
};

/* point d'entrée pour le jeu : ouvre l'écran d'accueil du flipper */
const PINBALL = {
  open(){ arcOpen('pin'); },
  play(){ if (!AOV) arcOpen('pin'); arcStart(); },
  close(){ arcQuit(); },
  state(){ return pbS(); },
  setLevel(lv){ const P = pbS(); P.lv = Math.max(1, Math.min(PB_MAXLV, lv)); P.xp = 0; save(); }
};
