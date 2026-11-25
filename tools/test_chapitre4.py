"""Test du lot 3 : chapitre 4 (PC d'Alex, Nour, éclusier, Luciole, Marieke, grue, Snow en duo), PC de stockage,
colis de la Prof, mini-jeu ADN, Lumisphères et économie, alcool en combat, Jour 25, capture avec équipe pleine.
Usage : python tools/test_chapitre4.py"""
import os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); sys.stdout.reconfigure(encoding='utf-8')
import test as T
from test_histoire import partie, verif, OK
from playwright.sync_api import sync_playwright

# bot : résout les mini-jeux ADN (bases complémentaires) et grue (containers dans l'ordre)
BOT = r"""()=>{window.__mb&&clearInterval(window.__mb);window.__mb=setInterval(()=>{
 const d=document.getElementById('dna');if(d&&d.classList.contains('show')){const cur=d.querySelector('.dnab.cur b');if(cur){const k=d.querySelector('.dnk[data-b="'+ADN_C[cur.textContent]+'"]');k&&k.click()}}
 const c=document.getElementById('crane');if(c&&c.classList.contains('show')){const bs=[...c.querySelectorAll('.crc:not(.ok)')];const n=Math.min(...bs.map(b=>+b.dataset.n));const b=bs.find(x=>+x.dataset.n===n);b&&b.click()}},400)}"""

def main():
    srv = T.serveur(os.path.join(T.RACINE, 'game'))
    url = 'http://127.0.0.1:%d/index.html' % srv.server_address[1]
    with sync_playwright() as pw:
        b = pw.chromium.launch(); ctx = b.new_context(viewport={'width': 400, 'height': 800}, service_workers='block')
        g = partie(ctx, url); g.js(BOT)
        g.js('()=>{for(const sp of ["moulefrit","hautfourno","terrillon","witloof"]){const m=mkMon(sp,30);S.party.push(m)}S.party.forEach(m=>{if(m.lv<30)m.lv=30;calc(m);m.hp=m.mhp})}')
        # --- économie et Lumisphères
        verif('prix réalistes (Lumisphère 8 €, chips 2 €, mitraillette 9 €)', g.js('()=>ITEMS.lumisphere.price===8&&ITEMS.chips.price===2&&ITEMS.mitraillette.price===9'))
        verif('Lumisphères par paliers (début : seulement la normale)', g.js('()=>ballsDispo().join()==="lumisphere"'), g.js('()=>ballsDispo().join()'))
        verif('Master jamais en boutique', g.js('()=>{Object.assign(F(),{badge1:1,brux:1,ch3:1,anv:1});return !ballsDispo().includes("masterlumi")&&ballsDispo().length===7}'))
        verif('Aqua ×3 sur un Lumon Eau', g.js('()=>ballMult("aqualumi",mkMon("moulinet",5))===3&&ballMult("aqualumi",mkMon("pigeolet",5))===1'))
        # --- colis de la Prof
        g.js('()=>{Object.assign(F(),{badge1:0,brux:0,ch3:0,anv:0});const f=F();delete f.starter2;f.badge1=1;runScript(async()=>{await goMap(CENTRE,4,4,"up");await nurseHeal()})}')
        verif('infirmière : un colis, pas le Lumon', g.attendre('S.bag.colisprof>0&&' + g.libre(), 120) and g.js('()=>F().starter2==null'))
        g.js('()=>{window.__choix=[1];runScript(async()=>{await goMap(LAB,4,4,"up");await talkProf()})}')
        verif('la Prof ouvre le colis : 2e starter (au PC si équipe pleine)', g.attendre('F().starter2!=null&&' + g.libre(), 200), g.js('()=>S.party.length+" en équipe, "+(S.box||[]).length+" au PC"'))
        # --- capture avec équipe pleine -> PC
        g.js('()=>{while(S.party.length<6)S.party.push(mkMon("gaufrelin",5));S.bag.masterlumi=1;window.__n=(S.box||[]).length;window.__res=null;runScript(async()=>{window.__res=await battle({wild:mkMon("pigeolet",3)})})}')
        g.js('''()=>{window.__auto=false;window.__cap=setInterval(()=>{const d=document.getElementById('dlg');if(d.style.display==='block'){d.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));return}
            if(document.getElementById('pick').classList.contains('show')){const r=[...document.querySelectorAll('#pList .prow')].find(x=>x.textContent.includes('Master'));(r||document.querySelector('#pList .prow')).click();return}
            const s=document.getElementById('a2');if(s)s.click()},200)}''')
        ok = g.attendre('window.__res&&' + g.libre(), 200)
        g.js('()=>{clearInterval(window.__cap);window.__auto=true}')
        verif('capture avec équipe pleine -> rangé au PC', ok and g.js('()=>window.__res==="caught"&&S.box.length===window.__n+1'), g.js('()=>window.__res'))
        # --- alcool en combat
        verif('Pèkèt : Attaque +2, Défense −1, Précision −1 en combat', g.js('''()=>{B={st:{p:{atk:0,def:0,acc:0},f:{}},me:S.party[0]};const hud0=hud;hud=()=>{};S.bag.peket=1;applyItem("peket",S.party[0]);const r=JSON.stringify(B.st.p);B=null;hud=hud0;return r==='{"atk":2,"def":-1,"acc":-1}'}'''))
        # --- mini-jeu ADN
        g.js('()=>{window.__q=null;dnaGame().then(q=>window.__q=q)}')
        verif('mini-jeu ADN : séquence parfaite', g.attendre('window.__q!==null', 60) and g.js('()=>window.__q===2'))
        # --- Jour 25
        g.js('()=>{S.day=24;F().chapterDone=1;F().amb_route0=1}')
        verif('Jour 25 : la Nuit Mauve (appel de Younes, embuscades de retour)', g.attendre('F().jour25&&' + g.libre(), 120) and g.js('()=>!F().amb_route0&&S.bag.nuitlumi>=3'))
        # --- chapitre 4
        g.js('()=>{S.party=S.party.slice(0,6);S.party.forEach(m=>{m.hp=m.mhp;m.status=null;m.moves.forEach(x=>x.pp=MV[x.id].pp)});Object.assign(F(),{brux:1,ch3:1,trialDone:1,hired:1,prank:1,younesSick:1,nourMet:1,captain:1});refreshNPCs();runScript(async()=>{await goMap(CENTREB,4,5,"up")})}')
        g.attendre(g.libre(), 30)
        g.js('()=>{const h=CENTREB.hook(4,4);if(h)runScript(h)}')
        verif('Bruxellia : Alex installe le PC Wagner', g.attendre('F().pcWagner&&' + g.libre(), 120), g.js('()=>objText()'))
        g.js('()=>{runScript(async()=>{await goMap(NWB,5,6,"up");await nwShopMenu("brux")()})}')
        verif('Nour lance le chapitre 4', g.attendre('F().ch4&&' + g.libre(), 120), g.js('()=>objText()'))
        g.js('()=>{runScript(async()=>{await goMap(BRUX,8,1,"up");await BRUX.steps["8,0"]()})}')
        verif('sortie nord de Bruxellia -> Route 4', g.attendre('cur===ROUTE4&&' + g.libre(), 60))
        g.js('()=>{runScript(async()=>{await goMap(ROUTE4,14,26,"up");await ecluseEnigme()})}')
        verif('énigme de l’éclusier : pont baissé', g.attendre('F().pont4&&' + g.libre(), 300) and g.js('()=>!ROUTE4.solid[24*ROUTE4.W+16]'))
        g.js('()=>{runScript(async()=>{await goMap(ROUTE4,11,12,"up");const h=ROUTE4.hook(11,12);if(h)await h()})}')
        verif('Luciole révèle son secret (Captain est son père)', g.attendre('F().lucR4&&' + g.libre(), 200))
        g.js('()=>{runScript(async()=>{await goMap(ANV,14,23,"up");const h=ANV.hook(14,23);if(h)await h()})}')
        verif('arrivée à Anversaille', g.attendre('F().anv&&' + g.libre(), 120), g.js('()=>objText()'))
        g.js('()=>{S.party.forEach(m=>{m.hp=m.mhp});runScript(async()=>{await goMap(GYMA,5,5,"up");await mariekeTalk()})}')
        verif('arène de Marieke : Médaille Diamant', g.attendre('F().badge2&&' + g.libre(), 400), g.js('()=>objText()'))
        g.js('()=>{S.party.forEach(m=>{m.hp=m.mhp;m.moves.forEach(x=>x.pp=MV[x.id].pp)});window.__slots=0;const o=duoPlace;duoPlace=(...a)=>{window.__slots++;return o(...a)};runScript(async()=>{await goMap(ANV,20,6,"up");await portGrue()})}')
        ok = g.attendre('F().ch4done&&' + g.libre(), 900)
        verif('grue du port + Snow et MC Sambre en 2 contre 2 -> fin du chapitre 4', ok and g.js('()=>F().grue&&window.__slots>=4&&S.bag.masterlumi>=1'), g.js('()=>objText()+" | duo:"+window.__slots'))
        verif('défaite à Anversaille -> Maison des Lumons d’Anversaille', g.js('()=>respawnCentre(ROUTE4)===CENTREA&&respawnCentre(ANV)===CENTREA'))
        # --- PC Wagner : déposer / retirer
        g.js('()=>{window.__b0=S.box.length;window.__p0=S.party.length;window.__choix=[];runScript(async()=>{await goMap(CENTREA,4,4,"up");await pcMenu()})}')
        g.p.clock.run_for(3000)
        g.js('''()=>{window.__auto=false;let step=0;window.__pcb=setInterval(()=>{const d=document.getElementById('dlg');if(d.style.display==='block'){d.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));return}
          if(!document.getElementById('pick').classList.contains('show'))return;const rows=[...document.querySelectorAll('#pList .prow:not(.dis)')];
          if(step===0){rows[1].click();step=1}else if(step===1){rows[rows.length-1].click();step=2}else{document.getElementById('pBack').click()}},250)}''')
        ok = g.attendre(g.libre() + '&&S.box.length===window.__b0+1', 120)
        g.js('()=>{clearInterval(window.__pcb);window.__auto=true}')
        verif('PC Wagner : déposer un Lumon', ok, g.js('()=>S.party.length+" / "+S.box.length'))
        errs = g.console + g.js('()=>__errs')
        verif('aucune erreur console', not errs, '; '.join(e[:160] for e in errs[:3]))
        b.close()
    print('%d/%d vérifications OK' % (sum(OK), len(OK)))
    sys.exit(0 if all(OK) else 1)

if __name__ == '__main__':
    main()
