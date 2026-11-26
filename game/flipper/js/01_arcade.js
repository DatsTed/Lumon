/* ===== 01_arcade.js : cadre d'arcade : écran d'accueil, partie, fin, tickets, record (arcOpen / arcStart / arcEnd / arcQuit)
   Repris de High & Rouillé et adapté à Lumons (voir game/flipper/LISEZMOI.md), src-jeu/new22.js (ne pas modifier ici : adapter 00_shim.js ou 09_hooks.js). ===== */
/* ===== v0.43 : SALLE D'ARCADE — pinball + mini-jeux, tickets, comptoir de prix, map 3D ===== */
const ARC={
 pin:{n:'Flipper Lumons',ic:'🎰',cost:100,cap:100,col:0xff2bd6,tk:s=>s/600,d:'3 billes. Maintiens LANCER pour armer le plongeur, puis flippers gauche / droite. Allume les 3 cibles pour monter le multiplicateur.'},
 drift:{n:'Reflex Drift',ic:'🚗',cost:40,col:0x00e5ff,tk:s=>s/45,d:'Touche la moitié gauche ou droite de l’écran pour changer de voie. Évite les obstacles, attrape les éclairs.'},
 drag:{n:'Drag Start',ic:'🏁',cost:40,col:0xffd400,tk:s=>s/60,d:'Démarre pile au vert (pas avant !), puis passe 3 vitesses en tapant quand l’aiguille est dans la zone verte.'},
 pit:{n:'Pit Stop Express',ic:'🔧',cost:40,col:0x3cff9e,tk:s=>s/80,d:'Touche vite la roue qui s’allume. Enchaîne sans faute pour un bonus de combo.'},
 nitro:{n:'Pousse-Nitro',ic:'⚡',cost:40,col:0xff9a1a,tk:s=>s/45,d:'Stoppe le curseur dans la zone verte. Elle rétrécit et le curseur accélère à chaque manche.'}
};
const ARCR={pin:[['Nakai',16800],['Vega',10400],['Quill',6900],['Ibarra',3800],['Brandt',1500]],drift:[['Dumas',620],['Okoye',480],['Vega',350],['Brandt',220],['Lindqvist',120]],drag:[['Quill',980],['Nakai',860],['Ibarra',700],['Okoye',540],['Dumas',380]],pit:[['Vega',1500],['Dumas',1200],['Okoye',950],['Nakai',700],['Brandt',450]],nitro:[['Okoye',760],['Quill',640],['Vega',520],['Ibarra',380],['Dumas',240]]};
function arcS(){ return S.arc||(S.arc={tk:0,best:{},plays:0,trophy:0}); }
function arcTone(f,d,type,v){ try{ if(!AU||!AU.ok) return; const c=AU.ctx, t=c.currentTime, o=c.createOscillator(), g=c.createGain(); o.type=type||'square'; o.frequency.setValueAtTime(f,t); g.gain.setValueAtTime(v||.07,t); g.gain.exponentialRampToValueAtTime(.0005,t+d); o.connect(g); g.connect(AU.b.ui); o.start(t); o.stop(t+d+.02); }catch(_){} }
let AOV=null;
function arcRot(on){ try{ if(on){ if(view==='hub'&&document.body.classList.contains('hubmode')&&!HUB.rot){ HUB.rot=true; document.body.classList.add('menuport'); rotNow(false); } } else { if(HUB.rot&&!sheet){ HUB.rot=false; document.body.classList.remove('menuport'); if(view==='hub') rotNow(true); } } }catch(_){} }
const ARC_LV={nitro:3,pit:4,drag:5,drift:6,pin:7};
function arcOpen(id){
  if(AOV||!ARC[id]) return; if(S.lvl<(ARC_LV[id]||0)) return toast('🔒 '+ARC[id].n+' : niveau '+ARC_LV[id]+' requis'); const G=ARC[id]; arcRot(true);
  const o=document.createElement('div'); o.id='arcov'; o.innerHTML=`<div class="arc-top"><div class="arc-t"><b>${G.ic} ${G.n}</b><small>Record : <span id="arcbest">${fmt(arcS().best[id]||0)}</span> · <span id="arctk">${lumHud()}</span></small></div><div class="arc-sc" id="arcsc">0</div><button class="arc-x" data-a="arcquit" aria-label="Quitter">✕</button></div><div class="arc-st" id="arcst"></div><div class="arc-bar" id="arcbar"></div>`;
  document.body.appendChild(o); AOV={id,el:o,stop:null,over:false}; arcIntro(id);
}
function arcIntro(id){ const G=ARC[id], st=document.getElementById('arcst'), bar=document.getElementById('arcbar'); st.innerHTML=''; bar.innerHTML=''; const sc=document.getElementById('arcsc'); sc.textContent='0';
  const c=document.createElement('div'); c.className='arc-card'; c.innerHTML=`<div class="arc-big">${G.ic}</div><h3>${G.n}</h3><p>${G.d}</p><button class="btn wide" data-a="arcstart">▶ Jouer · ${G.cost} cr</button><button class="btn alt wide" data-a="arcquit">Retour</button>`; st.appendChild(c); }
function arcStart(){ if(!AOV) return; const id=AOV.id, G=ARC[id]; if(S.cr<G.cost) return toast('Pas assez de crédits'); S.cr-=G.cost; save(); render&&0;
  const st=document.getElementById('arcst'), bar=document.getElementById('arcbar'); st.innerHTML=''; bar.innerHTML=''; AOV.over=false;
  const api={st,bar,score:(n,t)=>{ const e=document.getElementById('arcsc'); if(e) e.innerHTML=fmt(Math.round(n))+(t?`<small>${t}</small>`:''); },end:(score,note)=>arcEnd(score,note)};
  try{ AOV.stop=GAMES[id](api)||null; }catch(e){ console.error(e); } }
function arcEnd(score,note){ if(!AOV||AOV.over) return; AOV.over=true; const id=AOV.id, G=ARC[id], A=arcS(); score=Math.max(0,Math.round(score)); if(AOV.stop){ try{ AOV.stop(); }catch(_){} AOV.stop=null; }
  const prev=A.best[id]||0, rec=score>prev; if(rec) A.best[id]=score; const tk=Math.max(0,Math.min(G.cap||60,Math.round(G.tk(score)))); A.tk+=tk; A.plays++; if(tk>0) addXP(Math.ceil(tk/4)); save();
  const riv=ARCR[id], rank=1+riv.filter(r=>r[1]>(A.best[id]||0)).length; const st=document.getElementById('arcst'), bar=document.getElementById('arcbar'); bar.innerHTML='';
  const dim=document.createElement('div'); dim.className='arc-dim'; st.appendChild(dim);
  const c=document.createElement('div'); c.className='arc-card res'; c.innerHTML=`<div class="arc-big">${rec&&score>0?'🏆':G.ic}</div><h3>${rec&&score>0?'Nouveau record !':'Partie terminée'}</h3><div class="arc-fin">${fmt(score)}</div>${note?`<p>${note}</p>`:''}<div class="arc-tk">💶 +${fmt(lumEur(tk))} € <small>(${tk} ticket${tk>1?'s':''} rachetés par Jalal)</small></div><p class="sm">Classement : <b>#${rank}</b> sur 6 · record ${fmt(A.best[id]||0)}</p><button class="btn wide" data-a="arcstart">↻ Rejouer · ${G.cost} cr</button><button class="btn alt wide" data-a="arcquit">Quitter</button>`;
  st.appendChild(c); const b=document.getElementById('arcbest'); if(b) b.textContent=fmt(A.best[id]||0); const tt=document.getElementById('arctk'); if(tt) tt.textContent=lumHud(); auTry(()=>ui(tk>0?'coins':'close')); if(rec&&score>0) auTry(()=>ui('up')); }
function arcQuit(){ if(!AOV) return; try{ AOV.stop&&AOV.stop(); }catch(_){} AOV.el.remove(); AOV=null; arcRot(false); try{ renderSheet&&sheet&&sheet.t==='arcprix'&&renderSheet(); }catch(_){} }
const GAMES={};
