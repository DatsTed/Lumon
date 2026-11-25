"""Test des fonctions de confort : ordre des attaques, teleportation du mode test, manette simulee.
Usage : python tools/test_confort.py"""
import os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); sys.stdout.reconfigure(encoding="utf-8")
import test as T
from playwright.sync_api import sync_playwright
PAD = r"""(()=>{const mk=()=>({connected:true,axes:[0,0,0,0],buttons:Array.from({length:17},()=>({pressed:false,value:0}))});
window.__pad=mk();navigator.getGamepads=()=>[window.__pad];})();"""
srv = T.serveur(os.path.join(T.RACINE, 'game'))
url = 'http://127.0.0.1:%d/index.html' % srv.server_address[1]
with sync_playwright() as pw:
    b = pw.chromium.launch(); ctx = b.new_context(viewport={'width':400,'height':800}, service_workers='block')
    ctx.add_init_script(PAD)
    g = T.Partie(ctx, url, 'lot1')
    g.attendre('document.getElementById("bNew").style.display==="inline-block"', 60)
    g.js('()=>{__seed(777);document.getElementById("bNew").click()}')
    print('prologue', g.attendre(g.libre() + '&&F().introDone'))
    g.js('()=>{runScript(async()=>{await goMap(LAB,4,5,"up");await labScene()})}'); g.attendre('S.party.length>0&&'+g.libre(),300)
    # 1. ordre des attaques via la fiche
    g.js('()=>{const m=S.party[0];m.lv=20;calc(m);while(m.moves.length<3)m.moves.push({id:Object.keys(MV)[m.moves.length+5],pp:5});window.__mv0=m.moves.map(x=>x.id).join()}')
    g.js('()=>{window.__auto=false;runScript(openMenu)}'); g.p.clock.run_for(800)
    def clic(sel): g.js('()=>{const e=document.querySelector(%r);e&&e.click()}' % sel); g.p.clock.run_for(500)
    clic('#pList .prow'); clic('#pList .prow')   # Lumons -> 1er Lumon
    print('bouton ordre présent', g.js('()=>!!document.getElementById("stMov")'))
    clic('#stMov'); clic('#pList .prow:nth-child(1)'); clic('#pList .prow:nth-child(3)')
    print('avant', g.js('()=>window.__mv0'), '| après', g.js('()=>S.party[0].moves.map(x=>x.id).join()'))
    clic('#pBack'); clic('#pBack'); clic('#pBack'); g.p.clock.run_for(1500)
    g.js('()=>{window.__auto=true}'); print('libre', g.attendre(g.libre(), 30))
    # 2. téléportation en mode test (carte du monde)
    g.js('()=>{S.testMode=1;window.__auto=false;runScript(worldMap)}'); g.p.clock.run_for(800)
    g.js('''()=>{const r=document.querySelector('#wmSvg [data-i="4"]');const b=r.getBoundingClientRect();const o={bubbles:true,clientX:b.left+b.width/2,clientY:b.top+b.height/2,pointerId:1};
       const svg=document.querySelector('#wmSvg svg');svg.dispatchEvent(new PointerEvent('pointerdown',o));svg.dispatchEvent(new PointerEvent('pointerup',o))}''')
    g.p.clock.run_for(800); print('diag', g.js('''()=>{const r=document.querySelector('#wmSvg [data-i="4"]');if(!r)return 'pas de noeud, wmap='+document.getElementById('wmap').className;const b=r.getBoundingClientRect();const t=document.elementFromPoint(b.left+b.width/2,b.top+b.height/2);return [b.left,b.top,b.width,t&&t.tagName,t&&t.dataset&&t.dataset.i]}'''))
    print('question', g.js('()=>document.getElementById("dtx").textContent'))
    g.js('()=>{document.querySelector("#dch button").dispatchEvent(new PointerEvent("pointerdown",{bubbles:true}))}')
    g.js('()=>{window.__auto=true}'); g.attendre(g.libre(), 30)
    print('carte après téléport', g.js('()=>cur.id'), g.js('()=>[player.x,player.z,walkable(cur,player.x,player.z)]'))
    # 3. manette : Start ouvre le menu, croix bas + A, B ferme
    g.js('()=>{window.__auto=false}')
    def bt(i, ms=120): g.js('()=>{__pad.buttons[%d].pressed=true}' % i); g.p.clock.run_for(ms); g.js('()=>{__pad.buttons[%d].pressed=false}' % i); g.p.clock.run_for(300)
    print('menuBtn', g.js('()=>[document.getElementById("menuBtn").style.display, !!document.getElementById("menuBtn").offsetParent, busy, player.moving, document.getElementById("dlg").style.display]'))
    bt(9); print('menu ouvert (Start)', g.js('()=>document.getElementById("pick").classList.contains("show")'), '| focus:', g.js('()=>{const e=document.querySelector(".padf");return e&&e.textContent.slice(0,30)}'))
    bt(13); print('focus après bas:', g.js('()=>{const e=document.querySelector(".padf");return e&&e.textContent.slice(0,30)}'))
    bt(1); print('menu fermé (B)', not g.js('()=>document.getElementById("pick").classList.contains("show")'))
    g.attendre(g.libre(), 20); p0 = g.js('()=>[player.x,player.z]')
    g.js('()=>{__pad.axes[0]=1}'); g.p.clock.run_for(1500); g.js('()=>{__pad.axes[0]=0}'); g.p.clock.run_for(500)
    print('déplacement stick', p0, '->', g.js('()=>[player.x,player.z]'))
    print('erreurs', g.console + g.js('()=>__errs'))
    b.close()
