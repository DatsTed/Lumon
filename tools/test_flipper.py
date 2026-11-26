"""Test du flipper du Smile and Eat (game/flipper/ dans une iframe, js/systemes/flipper.js) :
borne dans le snack de Jalal, partie offerte puis payée en Lumisphères, chasse d'un Lumon -> vraie capture dans l'équipe,
chasse d'un œuf -> sac, Légendaire de la tour (chromatique, stats parfaites), paliers -> œufs, tickets -> euros, fermeture.
Le rendu 3D du flipper est coupé ici (__pin3dOff) : il est vérifié à part avec tools/vrai3d.py flipper.
Usage : python tools/test_flipper.py"""
import os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); sys.stdout.reconfigure(encoding='utf-8')
import test as T
from test_histoire import partie, verif, OK
from playwright.sync_api import sync_playwright


def cadre(g):
    for f in g.p.frames:
        if '/flipper/' in f.url:
            return f
    return None


def main():
    srv = T.serveur(os.path.join(T.RACINE, 'game'))
    url = 'http://127.0.0.1:%d/index.html' % srv.server_address[1]
    with sync_playwright() as pw:
        b = pw.chromium.launch(); ctx = b.new_context(viewport={'width': 400, 'height': 800}, service_workers='block')
        g = partie(ctx, url)
        g.p.add_init_script("if(location.pathname.indexOf('/flipper/')>=0)window.__pin3dOff=true")
        lib = g.libre()
        verif('borne : dans le Smile and Eat, case (9,1) pleine', g.js('()=>typeof SMILE.signs["9,1"]==="function"&&!!SMILE.solid[1*SMILE.W+9]'))
        g.js('()=>{S.bag.lumisphere=4;runScript(async()=>{await goMap(SMILE,9,2,"up");await flipBorne()})}')
        ok = g.attendre('!!document.getElementById("flipov")', 60)
        verif('Jalal présente le flipper, l’iframe s’ouvre', ok and g.js('()=>flipS().vu===1&&FLIP.on'))
        f = None
        for _ in range(80):
            f = cadre(g)
            if f and f.evaluate('()=>typeof PINBALL!=="undefined"&&!!document.querySelector("#arcov [data-a=arcstart]")'): break
            g.p.clock.run_for(250)
        verif('flipper chargé (écran d’accueil)', f is not None and f.evaluate('()=>!!document.querySelector("#arcov")'))
        verif('bouton Jouer : 1ʳᵉ partie offerte', f.evaluate('()=>document.querySelector("#arcov [data-a=arcstart]").textContent.includes("offerte")'),
              f.evaluate('()=>document.querySelector("#arcov [data-a=arcstart]").textContent'))
        verif('le jeu est en pause pendant le flipper', g.js('()=>FLIP.on&&FLIP.wrapped'))
        f.evaluate('()=>{PINBALL.setLevel(18);document.querySelector("#arcov [data-a=arcstart]").click()}')
        g.p.clock.run_for(500)
        verif('partie lancée sans payer (offerte)', f.evaluate('()=>!!window.__pin') and g.js('()=>S.bag.lumisphere===4&&flipS().free===0'))
        # chasse d'un Lumon : on force une chasse non-œuf, puis on frappe la médaille avec la bille
        n0 = g.js('()=>S.party.length+boxOf().length')
        r = f.evaluate('''()=>{const P=window.__pin;let k=0;do{P.startChasse();k++}while(P.part.lum.egg&&k<50);
          const L=P.part.lum;return {ok:P.part.on&&!!L&&!L.egg&&!!L.sp,sp:L.sp,img:!!L.img,ic:P.part.ic}}''')
        verif('chasse : un Lumon du jeu sur la médaille (image du Lumidex)', r['ok'] and (r['img'] or g.js('()=>monIcon("chicorin")===null')) and g.js('()=>!!SP["%s"]' % r['sp']), r)
        f.evaluate('''()=>{const P=window.__pin,b=P.balls[0];b.st='play';for(let k=0;k<120&&P.part.on;k++){const pp=P.part;b.x=pp.x-pp.r-4;b.y=pp.y;b.vx=520;b.vy=0;pp.cool=0;for(let j=0;j<2;j++)P.sim(1/60)}}''')
        verif('capture : le Lumon rejoint vraiment l’équipe ou le PC', g.js('()=>S.party.length+boxOf().length') == n0 + 1 and g.js('()=>S.dex.caught["%s"]===1' % r['sp']),
              g.js('()=>FLIP.sess.caps.join()'))
        # chasse d'un œuf
        g.js('()=>{S.eggs=[]}')
        f.evaluate('''()=>{const P=window.__pin;let k=0;do{P.startChasse();k++}while(!P.part.lum.egg&&k<80);const b=P.balls[0];b.st='play';
          for(let k=0;k<120&&P.part.on;k++){const pp=P.part;b.x=pp.x-pp.r-4;b.y=pp.y;b.vx=520;b.vy=0;pp.cool=0;for(let j=0;j<2;j++)P.sim(1/60)}}''')
        verif('œuf capturé : dans le sac', g.js('()=>S.eggs.length===1'), g.js('()=>JSON.stringify(S.eggs)'))
        # Légendaire de la tour (table 9)
        n1 = g.js('()=>S.party.length+boxOf().length')
        f.evaluate('''()=>{const P=window.__pin;P.loadTable(8);P.towerEnter();P.towerEnter();P.towerEnter();const b=P.balls[0];b.st='play';
          for(let k=0;k<160&&P.part.on;k++){const pp=P.part;b.x=pp.x-pp.r-4;b.y=pp.y;b.vx=520;b.vy=0;pp.cool=0;for(let j=0;j<2;j++)P.sim(1/60)}}''')
        verif('tour : le Légendaire (starter chromatique, 4 stats parfaites)', g.js('''()=>{const L=S.party.concat(boxOf());const m=L[L.length-1];return L.length===%d&&m.shiny===1&&["chicorin","charbonnet","moulinet"].includes(m.sp)&&m.iv.filter(v=>v===31).length===4}''' % (n1 + 1)),
              g.js('()=>{const L=S.party.concat(boxOf());const m=L[L.length-1];return m.sp+" "+m.shiny+" "+m.iv}'))
        verif('noms dans le flipper : plus de Rolls ni de garage', f.evaluate('()=>window.__pin.TBL.every(t=>!/ROLLS|GARAGE|CASSE|DRAG/.test(t.n))&&window.__pin.TBL[8].n==="TOUR DU LÉGENDAIRE"'))
        # fin de partie : score haut -> paliers (œufs) et tickets -> euros
        m0 = g.js('()=>{S.eggs=[];return S.money}')
        f.evaluate('''()=>{const P=window.__pin;P.sim(1/60)}''')
        f.evaluate('''()=>{const P=window.__pin;for(let i=0;i<20&&!P.over;i++){P.balls.length=0;P.balls.push({x:180,y:700,vx:0,vy:300,st:'play',trail:[],la:false,ht:0,stuck:0});for(let k=0;k<30;k++)P.sim(1/60)}}''')
        g.p.clock.run_for(1500)
        verif('fin de partie : écran de fin, tickets rachetés en euros', f.evaluate('()=>!!document.querySelector("#arcst .arc-card.res")') and g.js('()=>S.money') >= m0,
              f.evaluate('()=>{const c=document.querySelector("#arcst .arc-card.res");return c?c.innerText.slice(0,300):"pas d’écran"}'))
        verif('paliers de score : des œufs (score de la partie > 40 000)', g.js('()=>S.eggs.length>=2&&flipS().arc.pb.pal[12000]===1'),
              g.js('()=>JSON.stringify(flipS().arc&&flipS().arc.pb)+" œufs="+S.eggs.length'))
        verif('rejouer : bouton payant (3 Lumisphères)', f.evaluate('()=>document.querySelector("#arcst [data-a=arcstart]").textContent.includes("3 Lumisphères")'))
        f.evaluate('()=>document.querySelector("#arcst [data-a=arcstart]").click()')
        g.p.clock.run_for(300)
        verif('rejouer : 3 Lumisphères payées', g.js('()=>S.bag.lumisphere===1&&flipS().parties===2'))
        f.evaluate('()=>arcQuit()')
        ok = g.attendre('!document.getElementById("flipov")&&' + lib, 60)
        verif('quitter : l’iframe se ferme, Jalal fait le bilan, le jeu reprend', ok and g.js('()=>!FLIP.on&&FLIP.sess.caps.length>=3'))
        verif('progression du flipper gardée dans la sauvegarde', g.js('()=>!!(S.flipper.arc&&S.flipper.arc.pb&&S.flipper.arc.pb.caps>=3)'))
        # plus de Lumisphères : Jalal refuse
        g.js('()=>{delete S.bag.lumisphere;runScript(async()=>{await flipBorne()})}')
        ok = g.attendre(lib, 60)
        verif('sans Lumisphères : pas de partie', ok and g.js('()=>!document.getElementById("flipov")'))
        # œufs en attente chez Jalal (sac plein, couveuse pleine)
        g.js('()=>{S.eggs=[mkEgg("pigeolet"),mkEgg("pigeolet"),mkEgg("pigeolet")];ranchS().couv=[1,2,3,4].map(()=>mkEgg("pigeolet"));window.__w=flipOeuf("ratoir",0,false)}')
        verif('sac et couveuse pleins : Jalal garde l’œuf au frigo', g.js('()=>__w==="jalal"&&flipS().attente.length===1'))
        g.js('()=>{S.eggs.pop();S.bag.lumisphere=0;runScript(async()=>{await flipBorne()})}')
        ok = g.attendre(lib, 60)
        verif('Jalal rend l’œuf quand il y a de la place', ok and g.js('()=>flipS().attente.length===0&&S.eggs.length===3'))
        print('erreurs console :', g.console or 'aucune')
        b.close()
    print('%d/%d vérifications OK' % (sum(OK), len(OK)))
    sys.exit(0 if all(OK) and not g.console else 1)


if __name__ == '__main__':
    main()
