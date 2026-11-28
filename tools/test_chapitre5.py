"""Test du lot 4 : chapitre 5 (Route 5, Liègenoir, Lambert, Cokerie, Bueren, rap, Baron), Lumons de Liègenoir,
silhouettes des fusions, effets des techniques, combat 2 contre 2 aléatoire du mode test, éclairage des intérieurs.
Usage : python tools/test_chapitre5.py"""
import os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); sys.stdout.reconfigure(encoding='utf-8')
import test as T
from test_histoire import partie, verif, OK
from playwright.sync_api import sync_playwright

# bot : monte l'escalier (pieds en alternance) et choisit la bonne réplique au rap
BOT = r"""()=>{window.__mb5&&clearInterval(window.__mb5);let p=0;window.__mb5=setInterval(()=>{
 const s=document.getElementById('stairs');if(s&&s.classList.contains('show')){const b=s.querySelectorAll('.stf');if(b.length){b[p%2].click();p++}}
 const r=document.getElementById('rap');if(r&&r.classList.contains('show')){const b=r.querySelector('.rpo[data-ok="1"]:not(.ok)');if(b&&!r.querySelector('.rpo.ok,.rpo.bad'))b.click()}},150)}"""

def main():
    srv = T.serveur(os.path.join(T.RACINE, 'game'))
    url = 'http://127.0.0.1:%d/index.html' % srv.server_address[1]
    with sync_playwright() as pw:
        b = pw.chromium.launch(); ctx = b.new_context(viewport={'width': 400, 'height': 800}, service_workers='block')
        g = partie(ctx, url); g.js(BOT)
        g.js('()=>{for(const sp of ["moulefrit","hautfourno","terrillon","witloof"]){S.party.push(mkMon(sp,42))}S.party.forEach(m=>{if(m.lv<42)m.lv=42;calc(m);m.hp=m.mhp});S.party.push(S.party.shift())}')
        heal = '()=>{S.party.forEach(m=>{m.hp=m.mhp;m.status=null;m.moves.forEach(x=>x.pp=MV[x.id].pp)})}'
        # --- contenu ajouté
        verif('5 Lumons de Liègenoir au Lumidex', g.js('()=>["ratoir","perronrat","tchantchou","smogule","cokelin"].every(k=>SP[k]&&DEX.includes(k))'))
        verif('chaque technique a son effet propre', g.js('()=>Object.keys(MV).every(k=>typeof MOVEFX[k]==="function")'), g.js('()=>Object.keys(MV).filter(k=>!MOVEFX[k]).join()'))
        verif('fusion : gène de silhouette hérité', g.js('()=>{const m=fuse(mkMon("chicorin",10),mkMon("pigeolet",10),1);const G=SP[m.sp].G;monModel(m.sp);return GOPT.plan.includes(G.plan)}'))
        verif('anciennes fusions : silhouette déduite', g.js('()=>planOf({feet:"four",side:"none"})==="quadrupede"&&planOf({side:"wings"})==="volant"&&planOf({feet:"tentacles"})==="flottant"'))
        verif('intérieurs éclairés', g.js('()=>isIndoor(CENTREB)&&isIndoor(LAB)&&!isIndoor(BRUX)'))
        # --- combat 2 contre 2 aléatoire (mode test)
        g.js('()=>{S.testMode=1;window.__res5=null;runScript(async()=>{await testDuo();window.__res5="fini"})}')
        verif('mode test : combat 2 contre 2 aléatoire', g.attendre('window.__res5&&' + g.libre(), 400))
        # --- chapitre 5
        g.js('()=>{Object.assign(F(),{brux:1,ch3:1,trialDone:1,hired:1,prank:1,younesSick:1,nourMet:1,captain:1,pcWagner:1,ch4:1,pont4:1,lucR4:1,anv:1,badge2:1,grue:1,ch4done:1});refreshNPCs();runScript(async()=>{await goMap(JF,24,13,"right")})}')
        g.attendre(g.libre(), 30)
        g.js('()=>{runScript(async()=>{await JF.steps["25,13"]()})}')
        verif('Jourdanfritte : sortie est -> Route 5', g.attendre('cur===ROUTE5&&' + g.libre(), 60) and g.js('()=>!JF.solid[13*JF.W+23]'))
        g.js('()=>{const h=ROUTE5.hook(1,8);if(h)runScript(h)}')
        verif('Route 5 : Luciole te rejoint', g.attendre('F().r5&&' + g.libre(), 120))
        g.js(heal); g.js('()=>{runScript(async()=>{await goMap(ROUTE5,14,4,"right");const h=ROUTE5.hook(14,4);if(h)await h()})}')
        verif('Route 5 : le Pigeolet drogué à la Poudre', g.attendre('F().poudre&&' + g.libre(), 300))
        g.js('()=>{runScript(async()=>{await ROUTE5.steps["35,11"]();const h=LIE.hook(1,14);if(h)await h()})}')
        verif('arrivée à Liègenoir (smog)', g.attendre('F().lie&&cur===LIE&&' + g.libre(), 120) and g.js('()=>{updateEnv();return document.getElementById("clock").innerHTML.includes("Smog")}'), g.js('()=>objText()'))
        g.js('()=>{window.__choix=[0];runScript(samiraTalk)}')
        verif('Samira explique la ville', g.attendre('F().samira&&' + g.libre(), 120), g.js('()=>objText()'))
        g.js('()=>{runScript(async()=>{await goMap(LIE,26,21,"up");await jadeTalk()})}')
        verif('Jade (rue des Vitrines)', g.attendre('F().jade&&' + g.libre(), 120))
        g.js(heal); g.js('()=>{runScript(async()=>{await goMap(GYML,5,5,"up");await lambertTalk()})}')
        verif('arène de Lambert : Médaille Perron', g.attendre('F().badge3&&' + g.libre(), 400) and g.js('()=>S.badges.includes("perron")'), g.js('()=>objText()'))
        g.js('()=>{runScript(async()=>{await goMap(LIE,4,7,"up");await cokeriePorte()})}')
        verif('la Cokerie s’ouvre avec la médaille', g.attendre('cur===COKERIE&&' + g.libre(), 120))
        g.js('()=>{Object.assign(F(),{rudi:1,vanessa:1});const o=cokeOrder();runScript(async()=>{await vanne(o[1])})}')
        g.attendre(g.libre(), 60)
        verif('Cokerie : une mauvaise vanne rallume tout', g.js('()=>(COKERIE.seq||[]).length===0&&!F().cokerie'))
        g.js('()=>{const o=cokeOrder();runScript(async()=>{for(const k of o)await vanne(k)})}')
        verif('Cokerie : fours coupés dans l’ordre', g.attendre('F().cokerie&&' + g.libre(), 200), g.js('()=>objText()'))
        g.js('()=>{runScript(async()=>{await goMap(LIE,27,9,"up");await buerenEscalier()})}')
        verif('Montagne de Bueren : 374 marches', g.attendre('cur===BUEREN&&' + g.libre(), 200))
        g.js('()=>{runScript(rapBattle)}')
        verif('battle de rap : mot de passe du club', g.attendre('F().rap&&' + g.libre(), 200), g.js('()=>objText()'))
        g.js('()=>{window.__choix=[0];runScript(async()=>{await goMap(LIE,14,7,"up");await clubPorte()})}')
        g.attendre(g.libre(), 60)
        verif('videur : mauvais mot de passe refusé', g.js('()=>cur===LIE'))
        g.js(heal); g.js('()=>{window.__choix=[1];runScript(clubPorte)}')
        verif('videur : « Tchantchès » ouvre le club', g.attendre('cur===CLUB&&' + g.libre(), 60))
        g.js('()=>{const h=CLUB.hook(6,5);if(h)runScript(h)}')
        ok = g.attendre('F().ch5done&&' + g.libre(), 900)
        verif('le Baron tombe -> fin du chapitre 5 (objectif : la Route 6)', ok and g.js('()=>cur===LIE&&objText().includes("Route 6")'), g.js('()=>objText()'))
        verif('après le Baron : plus de smog', g.js('()=>{updateEnv();return !document.getElementById("clock").innerHTML.includes("Smog")}'))
        verif('défaite près de Liègenoir -> Maison des Lumons de Liègenoir', g.js('()=>respawnCentre(ROUTE5)===CENTREL&&respawnCentre(COKERIE)===CENTREL'))
        verif('carte du monde : Route 5 et Liègenoir', g.js('()=>WMN.some(n=>n.k==="r5")&&!WMN.find(n=>n.k==="li").wip&&WMTP.li'))
        errs = g.console + g.js('()=>__errs')
        verif('aucune erreur console', not errs, '; '.join(e[:160] for e in errs[:3]))
        b.close()
    print('%d/%d vérifications OK' % (sum(OK), len(OK)))
    sys.exit(0 if all(OK) else 1)

if __name__ == '__main__':
    main()
