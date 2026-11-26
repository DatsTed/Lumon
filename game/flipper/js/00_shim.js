/* ===== 00_shim.js : le flipper dans Lumons =====
   Le flipper tourne dans sa propre page (game/flipper/index.html), ouverte dans une iframe par le jeu
   (game/js/systemes/flipper.js). Ses noms globaux (S, save, toast…) restent donc séparés de ceux du jeu.
   HOST = l'objet LUMPIN du jeu (même origine) : Lumisphères, Lumons, œufs, sauvegarde, argent.
   Ouvert seul (sans le jeu), le flipper utilise un hôte de démonstration (Lumons fictifs, billes illimitées). */
var $ = id => document.getElementById(id);

const DEMO_HOST = {
  demo: true,
  load(){ try { return JSON.parse(localStorage.getItem('lumons_flipper_demo') || 'null'); } catch (e) { return null; } },
  save(arc){ try { localStorage.setItem('lumons_flipper_demo', JSON.stringify(arc)); } catch (e) {} },
  balls(){ return 99; }, costTxt(){ return 'gratuit (démo)'; }, pay(){ return true; },
  pick(r, arc, tower){ const N = ['Gaufrelin', 'Terrilou', 'Smogule', 'Chicorin', 'Smogule ✨', 'Lucinelle', 'Lucinelle ✨'], egg = !tower && Math.random() < .25;
    return { key: 'demo' + r + (egg ? 'e' : ''), name: egg ? 'Œuf' : (tower ? 'Charbonnet ✨' : N[Math.min(6, r)]), egg, col: '#7ad1ff', img: null, r }; },
  capture(p){ return { name: p.name }; }, palier(r){ return { name: 'Œuf démo (rareté ' + r + ')' }; },
  money(){}, audio(){ return { music: true, sfx: true }; }, close(){ location.reload(); }, end(){}
};
const HOST = (() => { try { return (window.parent !== window && window.parent.LUMPIN) || null; } catch (e) { return null; } })() || DEMO_HOST;

/* ---- sauvegarde : seul S.arc (records, progression du flipper) est gardé, dans la sauvegarde du jeu ---- */
function fresh(){ return { cr: 1e9, lvl: 99, mods: [], alb: {}, scrap: 0, cars: [], nuid: 1, audio: { master: .9, music: .7 } }; }
let S = fresh();
{ const a = HOST.load(); if (a) S.arc = a; const o = HOST.audio() || {}; S.audio = { master: .9, music: o.music ? .7 : 0, mute: !o.music && !o.sfx }; }
function save(){ try { HOST.save(S.arc); } catch (e) {} }
let view = 'pinball', sheet = null;

/* ---- petits utilitaires ---- */
const fmt = n => Math.round(n).toLocaleString('fr-FR');
const rnd = (a, b) => a + Math.random() * (b - a);
const rint = (a, b) => Math.floor(rnd(a, b + 1));
let toastT = 0;
function toast(msg){ let t = $('toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2600); }

/* ---- son : AU sert aux bips d'arcade (arcTone) ; la musique et les bruitages ont leur propre console (PM) ---- */
const AU = { ctx: null, ok: false, b: {} };
function auInit(){ if (AU.ok) { if (AU.ctx.state === 'suspended') AU.ctx.resume(); return; }
  try { const AC = window.AudioContext || window.webkitAudioContext; AU.ctx = new AC(); const g = AU.ctx.createGain(); g.gain.value = (HOST.audio() || {}).sfx ? .8 : 0; g.connect(AU.ctx.destination); AU.b.ui = g; AU.ok = true; } catch (e) {} }
addEventListener('pointerdown', auInit, true);
addEventListener('keydown', auInit, true);
function auTry(f){ try { f(); } catch (e) {} }
function ui(kind){}
function ambMute(on){}
const WM = { on: false };

/* ---- interface du jeu d'origine : sans objet ici ---- */
const HUB = {}; function rotNow(){} function render(){} function renderSheet(){} function openSheet(){} function closeSheet(){}
function addXP(n){}

/* ---- boutons data-a="…" ---- */
const ACT = {};
document.addEventListener('click', e => { const b = e.target.closest('[data-a]'); if (!b || b.disabled) return; const f = ACT[b.dataset.a]; if (f) f(b.dataset); });

/* ---- objets du jeu d'origine (pièces de voiture) que le code du flipper touche au chargement : neutres ici ---- */
const RAR = [{n:'Commun',c:'#9aa3ad',p:60,pow:2,sc:1},{n:'Peu commun',c:'#3ccf7a',p:25,pow:4,sc:3},{n:'Rare',c:'#3d8bff',p:10,pow:7,sc:8},{n:'Épique',c:'#b05cff',p:3.8,pow:11,sc:25},
  {n:'Légendaire',c:'#ffb020',p:1,pow:16,sc:80},{n:'Mythique',c:'#ff3d6e',p:.18,pow:22,sc:250},{n:'Ultra rare',c:'#00e5ff',p:.02,pow:30,sc:1000}];
const UNIQ = [], SLOTS = [], MODI = {}, M = {}, MODELS = {};
let muid = 1;
function newMod(r){ return { u: muid++, r: r || 0, t: 'x' }; }
function invMax(){ return 1e9; }
function modName(m){ return (m && m.name) || 'Lumon'; }
