"""Test des chapitres 8, 9 et 10 jusqu'à la fin du jeu : Route 8 (invitation d'Alex), Gandoux, la Comtesse, le Gala, le coffre,
Brutus, le panneau rendu à la cathédrale (Agnelys) ; Route 9, Côte du Nord, pêche à la crevette, Jef, Captain, le « Northern Star »,
Visser ; Nour (8e médaille), Dolba, le Conseil des Quatre, le Président-Champion, l'épilogue et le générique ; l'après-jeu.
Usage : python tools/test_fin.py"""
import os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); sys.stdout.reconfigure(encoding='utf-8', errors='replace')
import test as T
from test_histoire import partie, verif, OK
from playwright.sync_api import sync_playwright

# bot : la pêche à la crevette (lance le filet au bon moment) et le générique (bouton « Continuer »)
BOT = r"""()=>{window.__mbf&&clearInterval(window.__mbf);window.__mbf=setInterval(()=>{
 const o=document.getElementById('crevette');if(o&&o.classList.contains('show')){const i=o.querySelector('i'),bk=o.querySelector('b');if(i&&bk){const x=+(/calc\(([-\d.]+)%/.exec(i.style.left)||[0,0])[1],l=parseFloat(bk.style.left),w=parseFloat(bk.style.width);
  if(x>=l+1&&x<=l+w-1){const b=o.querySelector('.crv');b&&b.click()}}}
 const c=document.getElementById('credits');if(c&&c.classList.contains('show')){const b=document.getElementById('crOk');b&&b.click()}},25)}"""

CH7 = "{chapterDone:1,nilsBattle:1,gate1:1,charl:1,badge1:1,luciole:1,rap1:1,profBadge:1,north:1,brux:1,nourMet:1,captain:1,hired:1,trialDone:1,ch3:1,alex:1,pcWagner:1,ch4:1,pont4:1,lucR4:1,anv:1,badge2:1,grue:1,ch4done:1,r5:1,lie:1,samira:1,ranch:1,badge3:1,cokerie:1,rap:1,ch5done:1,r6:1,givrale:1,givAide:1,namu:1,joute:1,badge4:1,cita:1,snowClean:1,herseOK:1,ch6done:1,r7:1,piege:1,bast:1,badge5:1,fondCode:1,ch7done:1}"


def main():
    srv = T.serveur(os.path.join(T.RACINE, 'game'))
    url = 'http://127.0.0.1:%d/index.html' % srv.server_address[1]
    with sync_playwright() as pw:
        b = pw.chromium.launch(); ctx = b.new_context(viewport={'width': 400, 'height': 800}, service_workers='block')
        g = partie(ctx, url); g.js(BOT)
        g.js('()=>{S.party=S.party.slice(0,1);for(const sp of ["hautfourno","krakamoule","endivaure","gravenspectre","eolys"]){S.party.push(mkMon(sp,68))}S.party.forEach(m=>{if(m.lv<68)m.lv=68;calc(m);m.hp=m.mhp;m.moves.sort((x,y)=>(MV[y.id].p||0)-(MV[x.id].p||0))})}')  # le pilote joue la 1re attaque : on met la plus forte en premier
        heal = '()=>{S.party.forEach(m=>{m.hp=m.mhp;m.status=null;m.moves.forEach(x=>x.pp=MV[x.id].pp)})}'
        def combat(cond, appel, nom, max_s=900):
            """lance une scène de combat ; si le pilote automatique perd, il retente une fois"""
            g.js(heal); g.js(appel); ok = g.attendre(cond + '&&' + g.libre(), max_s)
            if not ok:
                print('     1er essai perdu (%s) :' % nom, g.js('()=>cur.id')); g.attendre(g.libre(), 120); g.js(heal); g.js(appel); ok = g.attendre(cond + '&&' + g.libre(), max_s)
            return ok
        verif('10 Lumons de Gandoux et de la Côte', g.js('()=>["moulivent","canardin","gravenfant","gravenspectre","agnelys","crevetin","crevettor","mouettor","eolys","dunelle"].every(k=>SP[k]&&DEX.includes(k)&&ETY[k])'))
        verif('3 attaques : Écume, Tempête de sable, Carillon', g.js('()=>["ecume","sable","carillon"].every(k=>MV[k]&&typeof MOVEFX[k]==="function")'))
        # --- chapitre 8
        g.js('()=>{Object.assign(F(),%s);refreshNPCs();runScript(async()=>{await goMap(BRUX,1,13,"left")})}' % CH7); g.attendre(g.libre(), 30)
        verif('objectif après la Fondation : la Route 8', g.js('()=>objText().includes("Route 8")'), g.js('()=>objText()'))
        g.js('()=>{runScript(async()=>{await BRUX.steps["0,13"]()})}')
        verif('Bruxellia : sortie ouest -> Route 8', g.attendre('cur===ROUTE8&&' + g.libre(), 60))
        g.js('()=>{window.__choix=[0];const h=ROUTE8.hook(34,8);if(h)runScript(h)}')
        verif('Route 8 : l’agent, Alex et l’invitation (réglo)', g.attendre('F().r8&&' + g.libre(), 200) and g.js('()=>S.bag.invitation===1&&!F().invitFausse'))
        g.js('()=>{runScript(async()=>{await ROUTE8.steps["0,8"]();const h=GAND.hook(30,13);if(h)await h()})}')
        verif('Gandoux : arrivée', g.attendre('F().gand&&cur===GAND&&' + g.libre(), 120), g.js('()=>objText()'))
        g.js('()=>{runScript(async()=>{await goMap(GAND,6,24,"up");await galaPorte()})}'); g.attendre(g.libre(), 60)
        verif('Gala fermé avant la médaille', g.js('()=>cur===GAND'))
        verif('arène du Château : Médaille Gravensteen', combat('F().badge6', '()=>{runScript(async()=>{await goMap(GYMG,5,5,"up");await comtesseTalk()})}', 'Comtesse') and g.js('()=>S.badges.includes("gravensteen")'))
        g.js('()=>{window.__choix=[2];runScript(async()=>{await goMap(GAND,6,24,"up");await galaPorte();const h=GALA.hook(6,10);if(h)await h()})}')
        verif('le Gala : le Président te reconnaît', g.attendre('F().galaVu&&F().presVu&&cur===GALA&&' + g.libre(), 200), g.js('()=>objText()'))
        g.js('()=>{runScript(async()=>{await goMap(GALA,4,1,"up");await tableau(1)})}'); g.attendre(g.libre(), 60)
        verif('mauvais tableau : rien derrière', g.js('()=>!F().coffre'))
        ok = combat('F().ch8done', '()=>{window.__choix=[0];runScript(async()=>{await goMap(GALA,8,1,"up");await tableau(2)})}', 'Brutus')
        verif('le coffre, Brutus -> registre, panneau, fin du chapitre 8', ok and g.js('()=>S.bag.registre===1&&S.bag.panneau===1&&objText().includes("Route 9")'), g.js('()=>objText()'))
        n0 = g.js('()=>S.party.length+boxOf().length')
        g.js('()=>{runScript(async()=>{await goMap(GAND,21,6,"up");await cathedrale()})}')
        verif('le panneau rendu à la cathédrale -> Agnelys', g.attendre('F().panneau&&' + g.libre(), 120) and g.js('()=>S.party.concat(boxOf()).some(m=>m.sp==="agnelys")') and g.js('()=>S.party.length+boxOf().length') == n0 + 1)
        # --- chapitre 9
        g.js('()=>{runScript(async()=>{await goMap(GAND,1,13,"left");await gandOuest();const h=ROUTE9.hook(34,8);if(h)await h()})}')
        verif('Route 9 : Luciole rentre au port', g.attendre('F().r9&&cur===ROUTE9&&' + g.libre(), 200))
        g.js('()=>{runScript(async()=>{await ROUTE9.steps["0,8"]();const h=COTE.hook(32,13);if(h)await h()})}')
        verif('Côte du Nord : arrivée', g.attendre('F().cote&&cur===COTE&&' + g.libre(), 120), g.js('()=>objText()'))
        g.js('()=>{window.__choix=[0];runScript(async()=>{await goMap(COTE,10,8,"up");await crevetteJeuTalk()})}')
        verif('pêche à la crevette à cheval : 5 bancs, un Crevetin', g.attendre('F().crevettes&&' + g.libre(), 200) and g.js('()=>S.party.concat(boxOf()).some(m=>m.sp==="crevetin")'))
        g.js('()=>{runScript(async()=>{await goMap(COTE,26,11,"up");await captainCote()})}'); g.attendre(g.libre(), 60)
        verif('Captain attend la médaille de Jef', g.js('()=>!F().capCote'))
        verif('arène des Éoliennes : Médaille Éolienne', combat('F().badge7', '()=>{runScript(async()=>{await goMap(GYMC,5,5,"up");await jefTalk()})}', 'Jef'))
        g.js('()=>{runScript(async()=>{await goMap(COTE,26,11,"up");await captainCote()})}')
        verif('Captain et Luciole : la réconciliation', g.attendre('F().capCote&&' + g.libre(), 200))
        g.js('()=>{runScript(async()=>{await goMap(COTE,26,2,"up");await naviPorte()})}')
        verif('l’estacade -> à bord du « Northern Star »', g.attendre('cur===NAVIRE&&' + g.libre(), 60))
        ok = combat('F().ch9done', '()=>{runScript(async()=>{await goMap(NAVIRE,6,3,"up");await visserScene()})}', 'Visser')
        verif('Visser -> bons de livraison, fin du chapitre 9', ok and g.js('()=>S.bag.preuves===1&&objText().includes("Nour")'), g.js('()=>objText()'))
        # --- chapitre 10
        g.js('()=>{runScript(async()=>{await goMap(BRUX,24,20,"up");await ligueEntree()})}'); g.attendre(g.libre(), 60)
        verif('Ligue fermée avec 7 médailles', g.js('()=>cur===BRUX&&nbMedailles()===7'))
        verif('Nour, maître de l’arène de Bruxellia : Médaille Manneken', combat('F().badge8', '()=>{runScript(async()=>{await goMap(NWB,5,4,"up");await nwShopMenu("brux")()})}', 'Nour') and g.js('()=>nbMedailles()===8'))
        ok = combat('F().ligue&&cur===LIGUE', '()=>{runScript(async()=>{await goMap(BRUX,24,20,"up");await ligueEntree()})}', 'Dolba')
        verif('Dolba tient sa promesse, puis la Ligue s’ouvre', ok and g.js('()=>F().dolbaFin===1'), g.js('()=>objText()'))
        g.js('()=>{S.party.forEach(m=>m.hp=1);runScript(ligueSoin)}'); g.attendre(g.libre(), 60)
        verif('Ligue : l’infirmière soigne', g.js('()=>S.party.every(m=>m.hp===m.mhp)'))
        verif('Ligue : les grilles sont fermées', g.js('()=>LIGUE.solid[19*LIGUE.W+5]===1&&LIGUE.solid[4*LIGUE.W+5]===1'))
        for k, z in ((0, 22), (1, 17), (2, 12), (3, 7)):
            ok = combat('(F().conseil||0)>=%d' % (k + 1), '()=>{runScript(async()=>{await goMap(LIGUE,5,%d,"up");await conseil(%d)})}' % (z, k), 'Conseil %d' % k)
            verif('Conseil des Quatre : membre %d battu, grille ouverte' % (k + 1), ok and g.js('()=>LIGUE.solid[%d*LIGUE.W+5]===0' % [19, 14, 9, 4][k]))
        ok = combat('F().fin', '()=>{window.__choix=[1];runScript(async()=>{await goMap(LIGUE,5,3,"up");await championScene()})}', 'Champion', 1500)
        verif('le Président-Champion tombe -> épilogue et générique', ok and g.js('()=>F().champion===1&&F().fin===1&&S.ach&&!!S.ach.champion'), g.js('()=>objText()'))
        verif('après-jeu : objectif Lumidex', g.js('()=>objText().includes("Champion")&&objText().includes("Lumidex")'), g.js('()=>objText()'))
        verif('le Champion a quitté l’estrade (rechargement)', g.js('()=>{refreshNPCs();return NPC.champion.hidden||!NPC.champion.g.visible}'))
        verif('défaites : Maisons des Lumons de Gandoux et de la Côte', g.js('()=>respawnCentre(ROUTE8)===CENTREG&&respawnCentre(NAVIRE)===CENTREC&&respawnCentre(LIGUE)===CENTREB'))
        verif('carte du monde : plus aucun lieu en construction', g.js('()=>WMN.every(n=>!n.wip)&&["r8","ga","r9","co"].every(k=>WMTP[k])'))
        verif('sauvegarde après la fin du jeu', g.js('()=>{saveGame();const s=loadGame();return !!s&&s.S.flags.fin===1}'))
        errs = g.console + g.js('()=>__errs')
        verif('aucune erreur console', not errs, '; '.join(e[:200] for e in errs[:3]))
        b.close()
    print('%d/%d vérifications OK' % (sum(OK), len(OK)))
    sys.exit(0 if all(OK) else 1)


if __name__ == '__main__':
    main()
