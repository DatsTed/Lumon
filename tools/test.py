"""Test automatique de Lumons (Playwright + Chrome, faux Three.js, horloge simulée).

Lance le même scénario sur une ou plusieurs versions du jeu et compare les résultats :
  nouvelle partie -> prologue -> starter -> combat -> fusion -> évolution -> sauvegarde -> rechargement.

Usage (depuis la racine du dépôt) :
  python tools/test.py                    # teste game/ (multi-fichiers) et dist/index.html
  python tools/test.py --ancien chemin/vers/index.html   # + compare avec une ancienne version
  python tools/test.py --ancien git:2c7dd80               # ancienne version prise dans lumons.zip du commit
Prérequis : pip install playwright ; python -m playwright install chromium
"""
import argparse, io, json, os, subprocess, sys, tempfile, threading, zipfile
import http.server, functools, socketserver
from playwright.sync_api import sync_playwright

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
THREE_URL = 'three.min.js'

# Faux Three.js : chaque propriété / appel / new renvoie un objet factice qui accepte tout.
FAKE_THREE = r"""
(function(){
 const H={
  get(t,p){
   if(p===Symbol.toPrimitive)return h=>h==='string'?'':0;
   if(p===Symbol.iterator)return function*(){};
   if(typeof p==='symbol')return undefined;
   if(p==='then'||p==='toJSON')return undefined;
   if(p==='length'||p==='count')return p in t?t[p]:0;
   if(p in t)return t[p];
   const v=mk();t[p]=v;return v},
  set(t,p,v){t[p]=v;return true},
  apply(){return mk()},
  construct(){return mk()}
 };
 function mk(){return new Proxy(function(){},H)}
 window.THREE=mk();
})();
"""

# Hasard reproductible + pilote automatique (clique sur ce qu'un joueur cliquerait).
INIT = r"""
(()=>{let s=12345;Math.random=()=>{s=(s*1103515245+12345)&0x7fffffff;return s/0x80000000};
window.__seed=v=>{s=v};
window.__errs=[];addEventListener('error',e=>__errs.push(String(e.message)));
addEventListener('unhandledrejection',e=>__errs.push('rejet: '+String(e.reason&&e.reason.stack||e.reason)));
window.__choix=[];   // réponses imposées aux prochains choix (index), sinon 0
window.__auto=true;
const shown=id=>{const e=document.getElementById(id);return e&&e.classList.contains('show')};
const clk=el=>{if(!el)return;el.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));el.click()};
setInterval(()=>{if(!window.__auto)return;try{
 if(shown('gender')){clk(document.querySelector('#gender .opt'));return}
 if(shown('nameOv')){const i=document.getElementById('nameIn');i.value='Testeur';i.dispatchEvent(new Event('input'));clk(document.getElementById('nameOk'));return}
 if(shown('look')){clk(document.getElementById('lkOk'));return}
 if(shown('card')){clk(document.getElementById('cYes'));return}
 if(shown('endc')){clk(document.getElementById('endOk'));return}
 if(shown('pick')){const r=document.querySelector('#pList .prow');clk(r||document.getElementById('pBack'));return}
 const d=document.getElementById('dlg');
 if(d&&d.style.display==='block'){const ch=document.querySelectorAll('#dch > *');
   if(ch.length){const k=__choix.length?__choix.shift():0;clk(ch[Math.min(k,ch.length-1)])}else clk(d);return}
 const bm=document.querySelector('#bMenu button:not([disabled])');if(bm){clk(bm);return}
 if(shown('narr')){const k=document.getElementById('skip');if(k.style.display!=='none')clk(k);else clk(document.getElementById('narr'));return}
}catch(e){}},120);
})();
"""

SNAP = r"""(()=>({
 obj:document.getElementById('obj').textContent,
 flags:JSON.stringify(Object.keys(S.flags||{}).sort().reduce((o,k)=>(o[k]=k==='nilsMon'?'(hasard)':S.flags[k],o),{})),
 nilsMon:(S.flags||{}).nilsMon,
 party:(S.party||[]).map(m=>m.sp+':'+m.lv).join(','),
 carte:(typeof cur!=='undefined'&&cur)?cur.id:null,
 joueur:typeof player!=='undefined'&&!!player,
 occupe:typeof busy!=='undefined'&&busy,
 combat:typeof B!=='undefined'&&!!B,
 argent:S.money, sac:JSON.stringify(S.bag), especes:Object.keys(SP).length,
 cartes:Object.keys(MAPS).join(','), err:__errs.slice()
}))()"""


DIAG = r"""(()=>({ov:[...document.querySelectorAll('.ov.show')].map(e=>e.id),
 dlg:document.getElementById('dlg').style.display==='block'?document.getElementById('dtx').textContent.slice(0,120):'',
 choix:[...document.querySelectorAll('#dch > *')].map(e=>e.textContent),bmenu:document.getElementById('bMenu').innerHTML.slice(0,150),
 busy:typeof busy!=='undefined'&&busy,player:typeof player!=='undefined'&&!!player,flags:JSON.stringify(S.flags),err:__errs.slice(0,5)}))()"""


def serveur(dossier):
    class Muet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    h = functools.partial(Muet, directory=dossier)
    socketserver.ThreadingTCPServer.request_queue_size = 256   # ~60 fichiers demandés d'un coup
    srv = socketserver.ThreadingTCPServer(('127.0.0.1', 0), h)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


class Partie:
    def __init__(self, ctx, url, nom):
        self.nom, self.log, self.console = nom, [], []
        self.p = ctx.new_page()
        # les requêtes externes (polices, CDN) sont bloquées exprès : on ignore ces erreurs-là
        self.p.on('console', lambda m: m.type == 'error' and 'Failed to load resource' not in m.text
                  and self.console.append(m.text))
        self.p.on('pageerror', lambda e: self.console.append('pageerror: ' + str(e)))
        self.p.route('**/*', self._route)
        self.p.clock.install()
        self.p.add_init_script(INIT)
        self.p.goto(url)

    def _route(self, r):
        u = r.request.url
        if u.endswith(THREE_URL):
            return r.fulfill(body=FAKE_THREE, content_type='application/javascript')
        if not u.startswith('http://127.0.0.1'):
            return r.abort()
        return r.continue_()

    def js(self, code):
        return self.p.evaluate(code)

    def action(self, code, graine):
        """Lance une action du scénario avec un hasard réinitialisé (comparaisons reproductibles)."""
        self.js('()=>__seed(%d)' % graine)
        return self.js(code)

    def attendre(self, cond, max_s=600, pas=250):
        """Fait avancer l'horloge simulée jusqu'à ce que cond (JS) soit vraie."""
        for _ in range(int(max_s * 1000 / pas)):
            if self.js('()=>{try{return !!(%s)}catch(e){return false}}' % cond):
                return True
            self.p.clock.run_for(pas)
        return False

    def etape(self, titre, ok=True):
        s = self.js(SNAP)
        s['etape'], s['ok'] = titre, bool(ok)
        self.log.append(s)
        print('  [%s] %-28s %s | obj=%s | équipe=%s' % (self.nom, titre, 'OK ' if ok else 'ÉCHEC', s['obj'][:60], s['party']))
        if not ok:
            print('     diagnostic :', self.js(DIAG))
        return s

    def libre(self):  # le joueur a la main
        return 'player&&!busy&&!B&&document.getElementById("dlg").style.display!=="block"'


def scenario(ctx, url, nom):
    g = Partie(ctx, url, nom)
    g.etape('chargement', g.attendre('document.getElementById("bNew").style.display==="inline-block"', 60))
    g.js('()=>{__seed(777);document.getElementById("bNew").click()}')
    g.etape('prologue (main au joueur)', g.attendre(g.libre() + '&&F().introDone'))
    # le labo : starter + duel contre Dolba
    g.action('()=>{runScript(async()=>{await goMap(LAB,4,5,"up");await labScene()})}', 101)
    ok = g.attendre('S.party.length>0&&' + g.libre(), 300)
    if not ok:  # choix du starter par la sphère si la scène l'attend
        g.js('()=>{try{pickSphere(0)}catch(e){__errs.push("pickSphere "+e)}}')
        ok = g.attendre('S.party.length>0&&' + g.libre(), 300)
    g.etape('labo + starter + Dolba', ok)
    # combat sauvage
    g.action('()=>{const m=S.party[0];m.lv=Math.max(m.lv,20);calc(m);m.hp=m.mhp;runScript(()=>battle({wild:mkMon("pigeolet",3)}))}', 102)
    g.etape('combat sauvage', g.attendre('!B&&' + g.libre(), 300))
    # fusion de deux Lumons
    g.action('''()=>{const a=mkMon("chicorin",10),b=mkMon("charbonnet",10);S.party.push(a,b);
      runScript(async()=>{const m=fuse(a,b);window.__fus=m&&(m.sp||m);if(m&&m.sp){await fusionCine(a,b,m)}})}''', 103)
    g.etape('fusion', g.attendre('window.__fus&&' + g.libre(), 300) and g.js('()=>!!SP[window.__fus]'))
    # évolution
    g.action('()=>{const m=mkMon("chicorin",30);S.party.push(m);window.__evo=m;runScript(()=>checkEvos())}', 104)
    g.etape('évolution', g.attendre('window.__evo.sp!=="chicorin"&&' + g.libre(), 300))
    # sauvegarde puis rechargement
    g.js('()=>saveGame()')
    avant = g.js(SNAP)
    g.save, g.avant = g.js('()=>localStorage.getItem("lumons_save")'), avant
    g.p.reload()
    g.attendre('document.getElementById("bCont").style.display==="inline-block"', 60)
    g.js('()=>document.getElementById("bCont").click()')
    ok = g.attendre(g.libre(), 120)
    apres = g.js(SNAP)
    g.etape('chargement sauvegarde', ok and apres['party'] == avant['party'] and apres['flags'] == avant['flags'])
    g.erreurs = g.console + apres['err']
    g.p.close()
    return g


def sauvegarde_ancienne(ctx, url, nom, ref):
    """Charge dans cette version la sauvegarde faite par l'ancienne version."""
    p = ctx.new_page()
    errs = []
    p.on('pageerror', lambda e: errs.append(str(e)))
    p.route('**/*', lambda r: r.fulfill(body=FAKE_THREE, content_type='application/javascript')
            if r.request.url.endswith(THREE_URL) else (r.continue_() if r.request.url.startswith('http://127.0.0.1') else r.abort()))
    p.clock.install()
    p.add_init_script(INIT + ';localStorage.setItem("lumons_save",%s)' % json.dumps(ref.save))
    p.goto(url)
    g = Partie.__new__(Partie); g.p, g.nom, g.log, g.console = p, nom, [], errs
    g.attendre('document.getElementById("bCont").style.display==="inline-block"', 60)
    g.js('()=>document.getElementById("bCont").click()')
    ok = g.attendre(g.libre(), 120)
    s = g.js(SNAP)
    ok = ok and all(s[k] == ref.avant[k] for k in ('party', 'flags', 'obj', 'carte', 'argent', 'sac')) and not errs
    print('  [%s] sauvegarde de la version ancienne : %s' % (nom, 'OK' if ok else 'ÉCHEC'))
    p.close()
    return ok


def ancien_depuis_git(ref, dest):
    r = subprocess.run(['git', '-C', RACINE, 'show', ref + ':lumons.zip'], capture_output=True)
    if r.returncode != 0:   # commit postérieur à la refonte : on prend le dossier game/ tel quel
        r = subprocess.run(['git', '-C', RACINE, 'archive', '--format=zip', ref, 'game'], capture_output=True, check=True)
    data = r.stdout
    with zipfile.ZipFile(io.BytesIO(data)) as z:
        for n in z.namelist():
            if n.startswith('game/'):
                z.extract(n, dest)
    return os.path.join(dest, 'game')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--ancien', help='index.html de référence, ou git:<commit>')
    ap.add_argument('--sans-dist', action='store_true')
    a = ap.parse_args()
    versions = [('nouveau', os.path.join(RACINE, 'game'), 'index.html')]
    if not a.sans_dist:
        versions.append(('dist', os.path.join(RACINE, 'dist'), 'index.html'))
    tmp = tempfile.mkdtemp(prefix='lumons_test_')
    if a.ancien:
        d = ancien_depuis_git(a.ancien[4:], tmp) if a.ancien.startswith('git:') else os.path.dirname(os.path.abspath(a.ancien))
        versions.insert(0, ('ancien', d, os.path.basename(a.ancien) if not a.ancien.startswith('git:') else 'index.html'))
    res = {}
    with sync_playwright() as pw:
        br = pw.chromium.launch()
        for nom, dossier, page in versions:
            srv = serveur(dossier)
            ctx = br.new_context(viewport={'width': 400, 'height': 800}, service_workers='block')
            print('== %s (%s)' % (nom, dossier))
            res[nom] = scenario(ctx, 'http://127.0.0.1:%d/%s' % (srv.server_address[1], page), nom)
            if nom != 'ancien' and 'ancien' in res:
                ctx2 = br.new_context(viewport={'width': 400, 'height': 800}, service_workers='block')
                if not sauvegarde_ancienne(ctx2, 'http://127.0.0.1:%d/%s' % (srv.server_address[1], page), nom, res['ancien']):
                    res[nom].erreurs_sauv = True
                ctx2.close()
            ctx.close(); srv.shutdown()
        br.close()
    echec = False
    for nom, g in res.items():
        ko = [s['etape'] for s in g.log if not s['ok']]
        print('%s : %d/%d étapes OK, %d erreur(s) console' % (nom, len(g.log) - len(ko), len(g.log), len(g.erreurs)))
        for e in g.erreurs[:10]: print('   !', e[:300])
        echec |= bool(ko) or bool(g.erreurs) or getattr(g, 'erreurs_sauv', False)
    ref = res.get('ancien')
    if ref:
        cles = ['etape', 'obj', 'flags', 'party', 'carte', 'argent', 'sac', 'especes', 'cartes']
        for nom, g in res.items():
            if g is ref: continue
            diff = [(s1['etape'], k, s1[k], s2[k]) for s1, s2 in zip(ref.log, g.log) for k in cles if s1[k] != s2[k]]
            print('comparaison ancien / %s : %s' % (nom, 'IDENTIQUE' if not diff else '%d différence(s)' % len(diff)))
            for d in diff[:15]: print('   ≠', d[0], d[1], str(d[2])[:120], '->', str(d[3])[:120])
            echec |= bool(diff)
    with open(os.path.join(tmp, 'resultats.json'), 'w', encoding='utf-8') as f:
        json.dump({k: v.log for k, v in res.items()}, f, ensure_ascii=False, indent=1)
    print('détails :', os.path.join(tmp, 'resultats.json'))
    sys.exit(1 if echec else 0)


if __name__ == '__main__':
    main()
