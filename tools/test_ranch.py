"""Test du Ranch et des couveuses : Laïka ne peut aller ni dans un enclos ni à la Pension (et une ancienne sauvegarde où elle y
est restée la ramène dans l'équipe), couveuse dans chaque Maison des Lumons, reliée à celle du Ranch (déposer à Charleroc,
reprendre à Bastognac), œufs qui avancent à chaque pas, éclosion depuis une Maison des Lumons, œuf d'enclos au fil des pas.
Usage : python tools/test_ranch.py"""
import os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); sys.stdout.reconfigure(encoding='utf-8', errors='replace')
import test as T
from test_histoire import partie, verif, OK
from playwright.sync_api import sync_playwright


def main():
    srv = T.serveur(os.path.join(T.RACINE, 'game'))
    url = 'http://127.0.0.1:%d/index.html' % srv.server_address[1]
    with sync_playwright() as pw:
        b = pw.chromium.launch(); ctx = b.new_context(viewport={'width': 400, 'height': 800}, service_workers='block')
        g = partie(ctx, url)
        g.js('()=>{Object.assign(F(),{charl:1,brux:1,anv:1,lie:1,ranch:1,namu:1,bast:1,egg1:1});S.party.push(mkMon("pigeolet",20),mkMon("pigeolet",20));refreshNPCs()}')
        # --- Laïka protégée
        g.js('()=>{window.__auto=false;window.__dis=null;runScript(async()=>{await goMap(RANCH,7,12,"down");await enclos(0)})}')
        g.attendre('document.getElementById("dlg").style.display==="block"&&document.querySelectorAll("#dch > *").length', 30)
        g.js('()=>{const b=document.querySelector("#dch > *");b.dispatchEvent(new PointerEvent("pointerdown",{bubbles:true}));b.click()}')
        g.attendre('document.getElementById("pick").classList.contains("show")', 30)
        verif('enclos : Laïka ne peut pas être confiée', g.js('()=>{const r=[...document.querySelectorAll("#pList .prow")];const i=S.party.findIndex(m=>m.sp.startsWith("laik"));return i>=0&&r[i]&&r[i].classList.contains("dis")}'))
        g.js('()=>{document.getElementById("pBack").click();window.__auto=true}'); g.attendre(g.libre(), 30)
        g.js('()=>{window.__auto=false;runScript(async()=>{await goMap(CENTRE,4,4,"up");await talkPension()})}')
        ok = False
        for _ in range(60):
            if g.js('()=>document.getElementById("pick").classList.contains("show")'): ok = True; break
            if g.js('()=>document.getElementById("dlg").style.display==="block"'):
                g.js('()=>{const ch=document.querySelectorAll("#dch > *");const d=document.getElementById("dlg");const b=ch.length?ch[0]:d;b.dispatchEvent(new PointerEvent("pointerdown",{bubbles:true}));b.click()}')
            g.p.clock.run_for(300)
        verif('Pension : Laïka ne peut pas être confiée', ok and g.js('()=>{const r=[...document.querySelectorAll("#pList .prow")];const i=S.party.findIndex(m=>m.sp.startsWith("laik"));return i>=0&&r[i]&&r[i].classList.contains("dis")}'))
        g.js('()=>{document.getElementById("pBack").click();window.__auto=true}'); g.attendre(g.libre(), 60)
        # --- ancienne sauvegarde : Laïka coincée dans un enclos
        verif('ancienne sauvegarde : Laïka revient dans l’équipe', g.js('''()=>{const L=laika();S.party=S.party.filter(m=>m!==L);ranchS().pens[1].mons=[L,mkMon("chicorin",10)];
          laikaRetour();return !!laika()&&S.party[0]===laika()&&ranchS().pens[1].mons.length===1}'''))
        # --- couveuses des Maisons des Lumons
        cent = g.js('()=>Object.values(MAPS).filter(m=>(m.nurseN&&m!==FERME)||m===LAB).map(m=>m.id+":"+Object.keys(m.signs).filter(k=>m.signs[k]===couveuseMaison).length)')
        verif('une couveuse dans chaque Maison des Lumons (et au labo)', len(cent) >= 8 and all(c.endswith(':1') for c in cent), ', '.join(cent))
        g.js('()=>{const R=ranchS();R.couv=[];S.eggs=[mkEgg("ratoir"),mkEgg("cokelin")];window.__choix=[];window.__auto=false;runScript(async()=>{await goMap(CENTRE,4,4,"up");await couveuseMaison()})}')
        def clique(sel):
            g.js('(s)=>{const e=document.querySelector(s);if(e){e.dispatchEvent(new PointerEvent("pointerdown",{bubbles:true}));e.click()}}', sel)
        for _ in range(40):  # l'infirmière présente la couveuse
            if g.js('()=>document.getElementById("pick").classList.contains("show")'): break
            clique('#dlg'); g.p.clock.run_for(300)
        verif('Charleroc : l’infirmière présente la couveuse reliée', g.js('()=>F().couvIntro===1&&document.getElementById("pTitle").textContent.includes("reliée au Ranch")'))
        # déposer un œuf (ligne « Déposer » = juste après les œufs déjà dedans, ici la 1re)
        clique('#pList .prow:not(.dis)'); g.p.clock.run_for(400); clique('#pList .prow:not(.dis)'); g.p.clock.run_for(400)
        verif('Charleroc : œuf déposé dans la couveuse', g.js('()=>ranchS().couv.length===1&&S.eggs.length===1'))
        g.js('()=>{document.getElementById("pBack").click();window.__auto=true}'); g.attendre(g.libre(), 30)
        verif('l’œuf est visible dans toutes les couveuses', g.js('()=>COUV_EGGS.every(L=>L[0].visible&&!L[1].visible)&&FERME.couvEggs[0].visible'))
        g.js('()=>{const e=ranchS().couv[0];e.left=3;for(let i=0;i<3;i++)ranchTick()}')
        verif('la couveuse avance à chaque pas, où que tu sois', g.js('()=>ranchS().couv[0].left===0'))
        n0 = g.js('()=>S.party.length')
        g.js('()=>{window.__auto=false;if(S.party.length>=6)S.party.pop();window.__n0=S.party.length;runScript(async()=>{await goMap(CENTREBA,4,4,"up");await couveuseMaison()})}')
        g.attendre('document.getElementById("pick").classList.contains("show")', 30)
        verif('Bastognac : le même œuf, prêt à éclore', g.js('()=>document.getElementById("pList").textContent.includes("Prêt à éclore")'))
        clique('#pList .prow:not(.dis)')
        for _ in range(60):
            if g.js('()=>S.party.length===window.__n0+1&&document.getElementById("pick").classList.contains("show")'): break
            clique('#dlg'); g.p.clock.run_for(300)
        g.js('()=>{document.getElementById("pBack").click();window.__auto=true}')
        ok = g.attendre(g.libre() + '&&S.party.length===window.__n0+1', 120)
        verif('éclosion depuis la Maison des Lumons de Bastognac', ok and g.js('()=>S.party[S.party.length-1].sp==="ratoir"&&ranchS().couv.length===0'))
        # --- enclos : un œuf au fil des pas
        g.js('()=>{const R=ranchS();const a=mkMon("pigeolet",20),c=mkMon("pigeolet",20);a.gender="m";c.gender="f";R.pens[0].mons=[a,c];R.pens[0].steps=0;R.pens[0].egg=null;__seed(5);for(let i=0;i<2000&&!R.pens[0].egg;i++)ranchTick()}')
        verif('enclos : un mâle et une femelle font un œuf en marchant', g.js('()=>!!ranchS().pens[0].egg&&ranchS().pens[0].egg.sp==="pigeolet"'))
        errs = g.console + g.js('()=>__errs')
        verif('aucune erreur console', not errs, '; '.join(e[:200] for e in errs[:3]))
        b.close()
    print('%d/%d vérifications OK' % (sum(OK), len(OK)))
    sys.exit(0 if all(OK) else 1)


if __name__ == '__main__':
    main()
