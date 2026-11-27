"""Test des scènes d'histoire du lot 2 (faux Three.js, horloge simulée).
Concert de MC Sambre + énigme + battle, rencontres de Luciole, cinématique de la Route 2,
test d'embauche de Nour (bot rapide / bot lent), retour au centre le plus proche après une défaite, icônes d'objets.
Usage : python tools/test_histoire.py"""
import os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); sys.stdout.reconfigure(encoding='utf-8')
import test as T
from playwright.sync_api import sync_playwright

OK = []
def verif(nom, cond, detail=''):
    OK.append(bool(cond)); print(('  %s %-46s %s' % ('OK ' if cond else 'KO ', nom, detail)).encode('utf-8', 'replace').decode('utf-8'))

# bot pour les mini-jeux du Night White : clique une bonne case toutes les `pas` ms
BOT = r"""(k,err,bon)=>{window.__auto=false;window.__bot&&clearInterval(window.__bot);let last=0;
 window.__bot=setInterval(()=>{const now=performance.now(),d=document.getElementById('dlg');
  if(d.style.display==='block'){const ch=[...document.querySelectorAll('#dch button')];if(!ch.length){d.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));return}
   if(now-last<1500)return;last=now;const good=ch.find(b=>NW_ITW.some(q=>q[1][0]===b.textContent));const c=good?(bon?good:ch[(Math.random()*ch.length)|0]):ch[0];c.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));return}
  if(!document.getElementById('job').classList.contains('show'))return;
  const t=document.getElementById('jobT').textContent,del=(t.includes('Monnaie')?3000:t.includes('Réassort')?600:900)*k;if(now-last<del)return;last=now;
  const sel=Math.random()<err?'#jobG .jb[data-good="0"]':'#jobG .jb[data-good="1"]';const b=document.querySelector(sel)||document.querySelector('#jobG .jb[data-good="1"]');if(b)b.click()},100)}"""

def partie(ctx, url):
    g = T.Partie(ctx, url, 'histoire')
    g.attendre('document.getElementById("bNew").style.display==="inline-block"', 60)
    g.js('()=>{__seed(777);document.getElementById("bNew").click()}')
    g.attendre(g.libre() + '&&F().introDone')
    g.action('()=>{runScript(async()=>{await goMap(LAB,4,5,"up");await labScene()})}', 101)
    g.attendre('S.party.length>0&&' + g.libre(), 300)
    g.js('()=>{const m=S.party[0];m.lv=40;calc(m);m.hp=m.mhp;S.party.push(mkMon("scorion",40));calc(S.party[1]);S.party[1].hp=S.party[1].mhp}')
    return g

def window_res_none(g):
    return g.js('()=>window.__res==null')

def main():
    srv = T.serveur(os.path.join(T.RACINE, 'game'))
    url = 'http://127.0.0.1:%d/index.html' % srv.server_address[1]
    with sync_playwright() as pw:
        b = pw.chromium.launch(); ctx = b.new_context(viewport={'width': 400, 'height': 800}, service_workers='block')
        g = partie(ctx, url)
        verif('icônes : tous les objets ont une icône', g.js('()=>Object.keys(ITEMS).filter(k=>!ICON[k]).length===0'), g.js('()=>Object.keys(ITEMS).filter(k=>!ICON[k]).join()'))
        # --- concert de MC Sambre
        g.js('()=>{Object.assign(F(),{charl:1,badge1:1,luciole:1});refreshNPCs();runScript(async()=>{await goMap(CHARL,25,16,"up");await rapEvent()})}')
        ok = g.attendre('F().rapMet&&' + g.libre(), 300)
        verif('concert : 1re rencontre sans combat, énigme réussie', ok and not g.js('()=>!!F().rap1'), g.js('()=>objText()'))
        g.js('()=>{runScript(rapEvent)}')
        verif('concert : 2e rencontre = battle puis Snow', g.attendre('F().rap1&&' + g.libre(), 400), g.js('()=>objText()'))
        # --- Luciole à Ixellette
        g.js('()=>{refreshNPCs();runScript(async()=>{await goMap(TOWN,12,20,"up")})}'); g.attendre(g.libre(), 30)
        vis = g.js('()=>{const r=LUC_RDV[0];return !!r.c&&!r.c.hidden}')
        g.js('()=>{const r=LUC_RDV[0];const h=TOWN.hook(r.c.x+1,r.c.z);window.__h=!!h;if(h)runScript(h)}')
        verif('Luciole Ixellette : visible puis scène au contact', vis and g.js('()=>window.__h') and g.attendre('F().lucIx&&' + g.libre(), 120))
        # --- Route 2 : cinématique à l'arrivée
        g.js('()=>{Object.assign(F(),{profBadge:1,north:1});refreshNPCs();runScript(async()=>{await goMap(ROUTE2,11,38,"up")})}'); g.attendre(g.libre(), 30)
        h = g.js('()=>{const h=ROUTE2.hook(11,37);if(h)runScript(h);return !!h}')
        verif('Route 2 : cinématique dès l\'arrivée, enveloppe', h and g.attendre('F().r2scene&&S.bag.enveloppe>0&&' + g.libre(), 200))
        # --- Bruxellia : Luciole + test de Nour
        g.js('()=>{runScript(async()=>{await goMap(BRUX,14,23,"up")})}'); g.attendre(g.libre(), 30)
        g.js('()=>{F().brux=1;refreshNPCs();const r=LUC_RDV[1];const h=BRUX.hook(r.c.x+1,r.c.z);if(h)runScript(h)}')
        verif('Luciole Bruxellia : scène au contact', g.attendre('F().lucBx&&' + g.libre(), 120))
        for nom, arg in (('efficace', '1,.05,true'), ('moyen', '1.5,.12,true'), ('brouillon', '2,.2,false')):
            g.js('()=>(' + BOT + ')(%s)' % arg)
            g.js('()=>{window.__nw=null;runScript(async()=>{window.__nw=await nwJob("test","Nour")})}')
            g.attendre('window.__nw&&' + g.libre(), 400)
            print('     test de Nour, joueur %s : %s points' % (nom, g.js('()=>window.__nw.score')))
        g.js('()=>{clearInterval(window.__bot);window.__auto=true}')
        # --- défaites : centre le plus proche découvert
        def defaite(carte, x, z, attendu):
            g.js('()=>{runScript(async()=>{await goMap(%s,%d,%d,"up")})}' % (carte, x, z)); g.attendre(g.libre(), 30)
            g.js('()=>{S.party.forEach(m=>m.hp=1);window.__res=null;runScript(async()=>{window.__res=await battle({wild:mkMon("scorion",60)})})}')
            g.attendre('!B&&' + g.libre(), 300)
            got = g.js('()=>cur.id') + ' (combat : %s)' % g.js('()=>window.__res')
            if window_res_none(g): print('     diag', g.js(T.DIAG), g.js('()=>[!!B, B&&B.me&&B.me.hp, window.__auto]'))
            verif('défaite sur %s -> %s' % (carte, attendu), got.split(' ')[0] == attendu, got)
        defaite('ROUTE', 11, 30, 'town')
        defaite('ROUTE2', 11, 20, 'centre_b')
        g.js('()=>{F().brux=0}'); defaite('ROUTE2', 11, 20, 'centre'); g.js('()=>{F().brux=1}')
        defaite('ROUTE3', 15, 9, 'centre_b')
        # --- lot 3 : Alex et le Cisoa, Amin + appel visio, période d'essai, huile de coude, Danny, Younes
        g.js('()=>{Object.assign(F(),{nourMet:1,nourBox:2});S.bag.colisnw=0;refreshNPCs();window.__choix=[0];runScript(async()=>{await goMap(ROUTE3,15,13,"up");await pigeonFight()})}')
        verif('Alex : deal Cisoa contre Mitraillette', g.attendre('F().nourBox===3&&' + g.libre(), 300) and g.js('()=>F().cisoaAlex===1&&S.bag.mitraillette>0'))
        g.js('()=>{window.__ph=0;const o=phoneOn;phoneOn=l=>{window.__ph=l.length;o(l)};runScript(async()=>{await goMap(NWJ,5,6,"up");await nwShopMenu("jf")()})}')
        verif('Amin : 11 canettes, appel visio à 4 selfies', g.attendre('F().hired&&' + g.libre(), 300) and g.js('()=>window.__ph===4&&!document.getElementById("phone")'))
        g.js('()=>(' + BOT + ')(1,0,true)')
        g.js('()=>{window.__choix=[0];runScript(nwShopMenu("jf"))}')
        verif('service 1 -> Amin a faim (Smile and Eat)', g.attendre('F().food===1&&' + g.libre(), 300), g.js('()=>objText()'))
        g.js('()=>{clearInterval(window.__bot);window.__auto=true;runScript(async()=>{await goMap(SMILE,5,6,"up");await smileEat2()})}')
        verif('Jalal prépare le repas', g.attendre('F().food===2&&S.bag.repas>0&&' + g.libre(), 120))
        g.js('()=>{runScript(async()=>{await goMap(NWJ,5,6,"up");await nwShopMenu("jf")()})}')
        g.attendre(g.libre(), 60)
        g.js('()=>(' + BOT + ')(1,0,true)'); g.js('()=>{window.__choix=[0];runScript(nwShopMenu("jf"))}')
        g.attendre('F().food===3&&F().trial>=2&&F().huile===1&&' + g.libre(), 300)
        g.js('()=>{clearInterval(window.__bot);window.__auto=true}')
        verif('service 2 -> quête de l huile de coude', g.js('()=>F().huile===1'), g.js('()=>objText()'))
        for k in ['pharma', 'roger', 'ines', 'jalal', 'danny', 'frite', 'sofiane']:
            g.js('()=>{runScript(()=>huile("%s"))}' % k); g.attendre(g.libre(), 60)
        verif('7 habitants interrogés', g.js('()=>huileVus()===HUILE.length'), g.js('()=>objText()'))
        g.js('()=>{runScript(nwShopMenu("jf"))}')
        verif('Amin éclate de rire : essai validé, chapitre 3 fini', g.attendre('F().trialDone&&F().ch3&&' + g.libre(), 200), g.js('()=>objText()'))
        g.js('()=>{runScript(async()=>{await goMap(JF,12,12,"down")})}'); g.attendre(g.libre(), 30)
        g.p.clock.run_for(32000)
        verif('Danny crie dans Jourdanfritte (sans bloquer)', g.js('()=>!!document.getElementById("shout")') and g.js('()=>!busy'))
        g.js('()=>{runScript(async()=>{await goMap(NWB,5,6,"up");await nwShopMenu("brux")()})}')
        verif('Younes en congé maladie (Bruxellia)', g.attendre('F().younesSick&&' + g.libre(), 200))
        errs = g.console + g.js('()=>__errs')
        verif('aucune erreur console', not errs, '; '.join(e[:120] for e in errs[:3]))
        b.close()
    print('%d/%d vérifications OK' % (sum(OK), len(OK)))
    sys.exit(0 if all(OK) else 1)

if __name__ == '__main__':
    main()
