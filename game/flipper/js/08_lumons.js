/* ===== 08_lumons.js : l'habillage Lumons du flipper =====
   - lumPick : le Lumon (ou l'œuf) d'une chasse, choisi par le jeu (HOST.pick) ; son image est celle du Lumidex.
   - lumFaceTex / lumImg : la médaille de la chasse montre le Lumon (3D et repli 2D).
   - lumiBallTex : les billes sont des Lumisphères (moitié violette, moitié rouge, bande dorée, bouton).
   - lumEgg3d : sur la Tour du Légendaire, un grand œuf remplace la Rolls-Royce exposée.
   Appelés depuis 02_pinball.js et 05_flipper3d.js (voir LISEZMOI.md). */
const lumEur = tk => Math.floor(Math.max(0, tk) / 5);   /* Jalal rachète les tickets : 1 € les 5 (une Lumisphère vaut 8 €) */
const LUMF = {};                         /* clé de médaille → { name, egg, col, shiny, img } */
function lumHud(){ let q = ''; try { const o = HOST.quota && HOST.quota(); if (o) q = ' · 🎯 Captures du jour : ' + o.reste + '/' + o.max; } catch (e) {} return '🔴 Lumisphères : ' + fmt(HOST.balls()) + q; }
function lumPick(r, arc, tower){
  let p = null; try { p = HOST.pick(r, !!arc, !!tower); } catch (e) { console.error(e); }
  if (!p) p = { key: 'x', name: 'Lumon', egg: false, col: '#9aa3ad', r };
  const ic = 'lum:' + p.key + (p.egg ? ':oeuf' : '') + (p.shiny ? ':sh' : '');
  if (!LUMF[ic]) { const f = LUMF[ic] = { name: p.name, egg: !!p.egg, col: p.col || '#9aa3ad', shiny: !!p.shiny, img: null };
    if (p.img && !p.egg) { const im = new Image(); im.src = p.img; f.img = im; } }
  return Object.assign({}, p, { ic });
}
/* dessin d'une médaille (canevas carré de côté n) ; renvoie false si l'image du Lumon n'est pas encore chargée */
function lumDraw(x, n, f, col){
  const h = n / 2, g = x.createRadialGradient(h, h, n * .05, h, h, h); g.addColorStop(0, '#ffffff'); g.addColorStop(.4, col); g.addColorStop(1, '#141020');
  x.clearRect(0, 0, n, n); x.fillStyle = g; x.beginPath(); x.arc(h, h, h - 1, 0, 7); x.fill();
  x.fillStyle = 'rgba(255,255,255,.88)'; x.beginPath(); x.arc(h, h, h * .8, 0, 7); x.fill();
  x.strokeStyle = 'rgba(255,255,255,.95)'; x.lineWidth = n * .04; x.beginPath(); x.arc(h, h, h * .86, 0, 7); x.stroke();
  let ok = true;
  if (f.egg) lumEggDraw(x, h, h * 1.04, n * .3, f.col);
  else if (f.img && f.img.complete && f.img.naturalWidth) { x.save(); x.beginPath(); x.arc(h, h, h * .8, 0, 7); x.clip(); x.drawImage(f.img, -n * .1, -n * .1, n * 1.2, n * 1.2); x.restore(); }
  else { ok = !f.img; x.fillStyle = col; x.font = '800 ' + Math.round(n * .42) + 'px system-ui,sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(f.name || '?').charAt(0), h, h * 1.04); }
  if (f.shiny) { x.font = Math.round(n * .22) + 'px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✨', n * .8, n * .2); }
  return ok;
}
function lumEggDraw(x, cx, cy, r, col){
  x.save(); x.translate(cx, cy); x.beginPath(); x.ellipse(0, 0, r * .78, r, 0, 0, 7); x.fillStyle = '#f6efdc'; x.fill(); x.lineWidth = r * .08; x.strokeStyle = '#3a2c1e'; x.stroke(); x.clip();
  x.fillStyle = col; [[-.35, -.45, .22], [.3, -.2, .18], [-.15, .25, .26], [.4, .5, .2], [-.5, .55, .16]].forEach(([a, b, c]) => { x.beginPath(); x.arc(a * r, b * r, c * r, 0, 7); x.fill(); });
  x.fillStyle = 'rgba(255,255,255,.55)'; x.beginPath(); x.ellipse(-r * .3, -r * .5, r * .14, r * .24, -.4, 0, 7); x.fill(); x.restore();
}
/* texture 3D de la médaille (05_flipper3d.js, faceTex) */
function lumFaceTex(T3, ic, col){
  const f = LUMF[ic]; if (!f) return null;
  const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'), t = new T3.CanvasTexture(c); t.encoding = T3.sRGBEncoding;
  if (!lumDraw(x, 128, f, col) && f.img) f.img.addEventListener('load', () => { lumDraw(x, 128, f, col); t.needsUpdate = true; }, { once: true });
  return t;
}
/* image de la médaille pour le repli 2D (02_pinball.js) */
const LUMC = {};
function lumImg(ic){ const f = LUMF[ic]; if (!f) return null; let c = LUMC[ic];
  if (!c || !c._ok) { c = c || (LUMC[ic] = document.createElement('canvas')); c.width = c.height = 96; c._ok = lumDraw(c.getContext('2d'), 96, f, f.col); }
  return c; }
/* la bille Lumisphère */
function lumiBallTex(T3){
  const c = document.createElement('canvas'); c.width = 256; c.height = 128; const x = c.getContext('2d');
  x.fillStyle = '#2a1450'; x.fillRect(0, 0, 256, 64); x.fillStyle = '#ff3b5c'; x.fillRect(0, 64, 256, 64);
  { const g = x.createLinearGradient(0, 0, 0, 128); g.addColorStop(0, 'rgba(255,255,255,.18)'); g.addColorStop(.5, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(0,0,0,.18)'); x.fillStyle = g; x.fillRect(0, 0, 256, 128); }
  x.fillStyle = '#f6c80f'; x.fillRect(0, 58, 256, 12);
  [64, 192].forEach(cx => { x.fillStyle = '#1d1626'; x.beginPath(); x.arc(cx, 64, 17, 0, 7); x.fill(); x.fillStyle = '#d8232a'; x.beginPath(); x.arc(cx, 64, 13, 0, 7); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(cx - 4, 59, 4, 0, 7); x.fill(); });
  const t = new T3.CanvasTexture(c); t.encoding = T3.sRGBEncoding; return t;
}
/* le grand œuf exposé en haut de la tour (à la place de la Rolls-Royce) */
function lumEgg3d(T3){
  const c = document.createElement('canvas'); c.width = 256; c.height = 128; const x = c.getContext('2d');
  x.fillStyle = '#f6efdc'; x.fillRect(0, 0, 256, 128);
  for (let k = 0; k < 26; k++) { const u = (k * 97) % 256, v = 14 + (k * 53) % 100, r = 8 + (k * 7) % 10; x.fillStyle = k % 3 ? '#d9962a' : '#8a3cf0'; x.beginPath(); x.ellipse(u, v, r, r * .8, 0, 0, 7); x.fill(); }
  const tx = new T3.CanvasTexture(c); tx.encoding = T3.sRGBEncoding;
  const g = new T3.Group(), m = new T3.Mesh(new T3.SphereGeometry(9, 28, 18), new T3.MeshStandardMaterial({ color: 0xffffff, map: tx, roughness: .35, metalness: .1, emissive: 0x3a2a08, emissiveIntensity: .35 }));
  m.scale.set(1, 1.32, 1); m.position.y = 11.5; m.rotation.x = -.5; m.castShadow = true; g.add(m); return g;
}
