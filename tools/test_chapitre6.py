"""Test des chapitres 6 et 7 : Route 6, Givrâle sous le viaduc, Namuroc (appel d'Alex), joute d'échasses et arène de Théo,
téléphérique, Snow à la Citadelle, herses des souterrains, Hector Grognon ; Route 7 (Captain, le piège), Bastognac,
arène d'Hélène, code de la Fondation, la Directrice et Prismalis. Nouveaux Lumons, attaques, carte du monde, défaites.
Usage : python tools/test_chapitre6.py"""
import os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); sys.stdout.reconfigure(encoding='utf-8', errors='replace')
import test as T
from test_histoire import partie, verif, OK
from playwright.sync_api import sync_playwright

# bot de la joute : penche du côté opposé au curseur
BOT = r"""()=>{window.__mb6&&clearInterval(window.__mb6);window.__mb6=setInterval(()=>{
 const o=document.getElementById('joute');if(!o||!o.classList.contains('show'))return;const i=o.querySelector('i');if(!i)return;
 const m=/calc\(([-\d.]+)%/.exec(i.style.left);if(!m)return;const x=+m[1];if(Math.abs(x-50)<4)return;
 const b=o.querySelector('.jtb[data-p="'+(x>50?'g':'d')+'"]');b&&b.click()},90)}"""

CH5 = "{chapterDone:1,nilsBattle:1,gate1:1,charl:1,badge1:1,luciole:1,rap1:1,profBadge:1,north:1,brux:1,nourMet:1,captain:1,hired:1,trialDone:1,ch3:1,alex:1,pcWagner:1,ch4:1,pont4:1,lucR4:1,anv:1,badge2:1,grue:1,ch4done:1,r5:1,lie:1,samira:1,ranch:1,badge3:1,cokerie:1,rap:1,ch5done:1}"


def main():
    srv = T.serveur(os.path.join(T.RACINE, 'game'))
    url = 'http://127.0.0.1:%d/index.html' % srv.server_address[1]
    with sync_playwright() as pw:
        b = pw.chromium.launch(); ctx = b.new_context(viewport={'width': 400, 'height': 800}, service_workers='block')
        g = partie(ctx, url); g.js(BOT)
        g.js('()=>{for(const sp of ["moulefrit","hautfourno","terrillon","witloof"]){S.party.push(mkMon(sp,52))}S.party.forEach(m=>{if(m.lv<52)m.lv=52;calc(m);m.hp=m.mhp});S.party.push(S.party.shift())}')
        heal = '()=>{S.party.forEach(m=>{m.hp=m.mhp;m.status=null;m.moves.forEach(x=>x.pp=MV[x.id].pp)})}'
        # --- contenu
        verif('8 Lumons de la Meuse et des Ardennes + Prismalis', g.js('()=>["escargolin","citadescar","echassor","anguimeuse","marcassor","sanglardenne","fagnelin","cervolt","prismalis"].every(k=>SP[k]&&DEX.includes(k)&&ETY[k])'))
        verif('attaques Vol, Électrik, Sol : un effet chacune', g.js('()=>["rafale","pique","etincelle","foudre","boutoir"].every(k=>MV[k]&&typeof MOVEFX[k]==="function")'))
        verif('évolutions : Escargolin -> Citadescar, Marcassor -> Sanglardenne', g.js('()=>SP.escargolin.evo[1]==="citadescar"&&SP.marcassor.evo[1]==="sanglardenne"'))
        # --- chapitre 6
        g.js('()=>{Object.assign(F(),%s);S.bag.spa=1;refreshNPCs();runScript(async()=>{await goMap(LIE,15,26,"down")})}' % CH5)
        g.attendre(g.libre(), 30)
        verif('objectif après le Baron : la Route 6', g.js('()=>objText().includes("Route 6")'), g.js('()=>objText()'))
        g.js('()=>{runScript(async()=>{await LIE.steps["15,27"]()})}')
        verif('Liègenoir : sortie sud -> Route 6', g.attendre('cur===ROUTE6&&' + g.libre(), 60))
        g.js('()=>{const h=ROUTE6.hook(10,2);if(h)runScript(h)}')
        verif('Route 6 : l’agent Verhaegen et Luciole', g.attendre('F().r6&&' + g.libre(), 200), g.js('()=>objText()'))
        g.js('()=>{window.__choix=[1];runScript(async()=>{await goMap(ROUTE6,7,13,"down");const h=ROUTE6.hook(7,14);if(h)await h()})}')
        verif('sous le viaduc : Givrâle aidé (Eau de Spa)', g.attendre('F().givrale&&' + g.libre(), 120) and g.js('()=>F().givAide===1&&!S.bag.spa'))
        g.js('()=>{runScript(async()=>{await goMap(ROUTE6,10,26,"down");await dylanTalk()})}')
        verif('Dylan, l’ancien Kétosaure', g.attendre('F().dylan&&' + g.libre(), 60))
        g.js('()=>{runScript(async()=>{await ROUTE6.steps["10,33"]();const h=NAMU.hook(17,1);if(h)await h()})}')
        verif('Namuroc : arrivée et appel d’Alex (factures)', g.attendre('F().namu&&cur===NAMU&&' + g.libre(), 200) and g.js('()=>S.bag.factures===1'), g.js('()=>objText()'))
        g.js('()=>{runScript(telepherique)}'); g.attendre(g.libre(), 60)
        verif('téléphérique fermé sans médaille', g.js('()=>cur===NAMU'))
        g.js(heal); g.js('()=>{runScript(async()=>{await goMap(GYMN,5,5,"up");await theoTalk()})}')
        verif('joute d’échasses gagnée puis Théo : Médaille Citadelle', g.attendre('F().badge4&&' + g.libre(), 500) and g.js('()=>F().joute===1&&S.badges.includes("citadelle")'), g.js('()=>objText()'))
        g.js('()=>{runScript(async()=>{await goMap(NAMU,6,18,"up");await telepherique()})}')
        verif('téléphérique -> Citadelle', g.attendre('cur===CITA&&' + g.libre(), 120))
        g.js('()=>{window.__choix=[0];const h=CITA.hook(8,8);if(h)runScript(h)}')
        verif('Snow à la Citadelle : il arrête la Poudre (Givrâle aidé)', g.attendre('F().cita&&' + g.libre(), 200) and g.js('()=>F().snowClean===1'), g.js('()=>objText()'))
        g.js('()=>{runScript(async()=>{await goMap(CITA,12,5,"up");await souterrainsPorte()})}')
        verif('Terra Nova -> souterrains', g.attendre('cur===SOUT&&' + g.libre(), 120))
        g.js(heal); g.js('()=>{runScript(async()=>{await goMap(SOUT,6,10,"up");await herse(0)})}'); g.attendre(g.libre(), 60)
        verif('herses : mauvais ordre -> tout retombe', g.js('()=>!F().herseOK&&F().herses===0&&SOUT.solid[9*SOUT.W+3]===1'))
        g.js('()=>{runScript(async()=>{await herse(1);await herse(2);await herse(0)})}')
        verif('herses : 1542, 1631, 1816 -> ouvert', g.attendre('F().herseOK&&' + g.libre(), 120) and g.js('()=>SOUT.solid[9*SOUT.W+3]===0'))
        n0 = g.js('()=>S.party.length+boxOf().length')
        g.js(heal); g.js('()=>{const h=SOUT.hook(6,6);if(h)runScript(h)}')
        ok = g.attendre('F().ch6done&&' + g.libre(), 900)
        verif('Hector Grognon arrêté -> fin du chapitre 6', ok and g.js('()=>objText().includes("pont de Jambes")'), g.js('()=>objText()'))
        verif('un Escargolin rejoint l’équipe', g.js('()=>S.party.length+boxOf().length') == n0 + 1)
        verif('défaite près de Namuroc -> Maison des Lumons de Namuroc', g.js('()=>respawnCentre(ROUTE6)===CENTREN&&respawnCentre(SOUT)===CENTREN'))
        # --- chapitre 7
        g.js('()=>{runScript(async()=>{await goMap(NAMU,27,28,"down");await pontJambes()})}')
        verif('pont de Jambes -> Route 7', g.attendre('cur===ROUTE7&&' + g.libre(), 60))
        g.js('()=>{const h=ROUTE7.hook(10,2);if(h)runScript(h)}')
        verif('Route 7 : Captain (2 Méga Lumisphères)', g.attendre('F().r7&&' + g.libre(), 200) and g.js('()=>S.bag.megalumi>=2'))
        g.js('()=>{S.eggs=[];window.__choix=[0];runScript(async()=>{await goMap(ROUTE7,8,17,"down");const h=ROUTE7.hook(8,18);if(h)await h()})}')
        verif('le piège : marcassin libéré, sa mère laisse un œuf', g.attendre('F().piege&&' + g.libre(), 120) and g.js('()=>F().piegeLibre===1&&S.eggs.some(e=>e.sp==="marcassor")'))
        g.js('()=>{runScript(async()=>{await ROUTE7.steps["10,35"]();const h=BAST.hook(15,1);if(h)await h()})}')
        verif('Bastognac : arrivée', g.attendre('F().bast&&cur===BAST&&' + g.libre(), 120), g.js('()=>objText()'))
        g.js('()=>{runScript(async()=>{await goMap(BAST,28,4,"right");await fondationPorte()})}'); g.attendre(g.libre(), 60)
        verif('Fondation fermée sans laissez-passer', g.js('()=>cur===BAST'))
        m0 = g.js('()=>S.money')
        g.js('()=>{window.__choix=[0];runScript(noixShop)}'); g.attendre(g.libre(), 60)
        verif('Noix & Jambon : achat', g.js('()=>S.money') < m0)
        g.js(heal); g.js('()=>{runScript(async()=>{await goMap(GYMBA,5,5,"up");await heleneTalk()})}')
        verif('arène d’Hélène : Médaille Sapin + laissez-passer', g.attendre('F().badge5&&' + g.libre(), 500) and g.js('()=>S.badges.includes("sapin")&&S.bag.laissezpasser===1'))
        g.js('()=>{runScript(async()=>{await goMap(BAST,28,4,"right");await fondationPorte()})}')
        verif('Fondation : entrée', g.attendre('cur===FOND&&' + g.libre(), 120))
        g.js('()=>{window.__choix=[0];runScript(async()=>{await goMap(FOND,7,9,"up");await fondCode()})}'); g.attendre(g.libre(), 60)
        verif('code faux : la porte reste fermée', g.js('()=>!F().fondCode&&FOND.solid[8*FOND.W+7]===1'))
        g.js('()=>{window.__choix=[1];runScript(fondCode)}')
        verif('code 1407 (expérience 14, juillet) : porte ouverte', g.attendre('F().fondCode&&' + g.libre(), 60) and g.js('()=>FOND.solid[8*FOND.W+7]===0'))
        g.js(heal); g.js('()=>{window.__choix=[0];const h=FOND.hook(7,6);if(h)runScript(h)}')
        ok = g.attendre('F().ch7done&&' + g.libre(), 900)
        if not ok:  # le pilote automatique joue toujours la 1re attaque : s'il perd, il retente une fois, comme un joueur
            print('     1er essai perdu :', g.js('()=>cur.id'))
            g.attendre(g.libre(), 120); g.js(heal)
            g.js('()=>{window.__choix=[0];runScript(async()=>{await goMap(FOND,7,7,"up");const h=FOND.hook(7,6);if(h)await h()})}')
            ok = g.attendre('F().ch7done&&' + g.libre(), 900)
        verif('la Directrice tombe -> fin du chapitre 7 (objectif : la Route 8)', ok and g.js('()=>objText().includes("Route 8")'), g.js('()=>objText()'))
        verif('Prismalis rejoint l’équipe', g.js('()=>S.party.concat(boxOf()).some(m=>m.sp==="prismalis")'))
        verif('défaite près de Bastognac -> Maison des Lumons de Bastognac', g.js('()=>respawnCentre(ROUTE7)===CENTREBA&&respawnCentre(FOND)===CENTREBA'))
        verif('carte du monde : Namuroc, Bastognac, Routes 6 et 7', g.js('()=>["r6","na","r7","ba"].every(k=>{const n=WMN.find(n=>n.k===k);return n&&!n.wip&&WMTP[k]})&&ruberOK("na")===!!S.bag.ruber'))
        verif('sauvegarde : rechargement après le chapitre 7', g.js('()=>{saveGame();const s=loadGame();return !!s&&s.S.flags.ch7done===1}'))
        errs = g.console + g.js('()=>__errs')
        verif('aucune erreur console', not errs, '; '.join(e[:200] for e in errs[:3]))
        b.close()
    print('%d/%d vérifications OK' % (sum(OK), len(OK)))
    sys.exit(0 if all(OK) else 1)


if __name__ == '__main__':
    main()
