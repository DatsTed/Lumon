"""Captures en VRAI rendu 3D (Three.js depuis le CDN, WebGL logiciel SwiftShader).
Usage : python tools/vrai3d.py <scenario> [dossier_sortie]
Scénarios : duo (combat 2 contre 2), interieur (maison la nuit), fusions (galerie de fusions), attaques (une capture par technique), liege (Liègenoir), ranch (Ranch du Pays de Herve)."""
import os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); sys.stdout.reconfigure(encoding='utf-8')
import test as T
from playwright.sync_api import sync_playwright

class Vrai(T.Partie):
    def _route(self, r):
        u = r.request.url
        if u.startswith('http://127.0.0.1') or 'cdnjs.cloudflare.com' in u:
            return r.continue_()
        return r.abort()

def lancer(pw, url):
    b = pw.chromium.launch(args=['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'])
    ctx = b.new_context(viewport={'width': 400, 'height': 800}, service_workers='block')
    g = Vrai(ctx, url, 'vrai3d')
    import time
    for _ in range(300):  # le CDN charge en temps réel
        if g.js('()=>typeof THREE!=="undefined"&&document.getElementById("bNew").style.display==="inline-block"'): break
        time.sleep(.2); g.p.clock.run_for(100)
    g.js('()=>{__seed(777);document.getElementById("bNew").click()}')
    g.attendre(g.libre() + '&&F().introDone', 300)
    g.js('()=>{F().starter=0;S.party.length||S.party.push(mkMon("laika",20))}')
    return b, g

def snap(g, path, ms=0):
    if ms: g.p.clock.run_for(ms)
    g.p.screenshot(path=path); print('capture', path)

def duo(g, out):
    g.js('()=>{S.party.length=0;for(const sp of["chicorin","charbonnet","moulinet","gaufrelin"]){const m=mkMon(sp,20);S.party.push(m)}refreshFollower();window.__auto=false;runScript(async()=>{await testDuo()})}')
    for i in range(40):
        g.p.clock.run_for(400)
        g.js("()=>{const d=document.getElementById('dlg');if(d.style.display==='block')d.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))}")
        if g.js('()=>!!document.querySelector("#bMenu button:not([disabled])")'): break
    snap(g, out + '/duo_1_menu.png')
    g.js('()=>{window.__auto=true}')
    for k in range(2, 6): snap(g, out + '/duo_%d.png' % k, 2500)

def interieur(g, out):
    for nom, carte, x, z in (('centre', 'CENTREB', 4, 4), ('labo', 'LAB', 4, 4), ('nightwhite', 'MAPS.nw_brux', 5, 5), ('route_nuit', 'ROUTE4', 11, 14)):
        g.js('()=>{S.clock=23*60;runScript(async()=>{await goMap(%s,%d,%d,"up")})}' % (carte, x, z))
        g.p.clock.run_for(1500); g.js('()=>updateEnv()'); snap(g, out + '/int_%s.png' % nom, 800)

GAL = r"""(seed)=>{const plans=GOPT.plan,grp=new THREE.Group();ARENA.group.add(grp);if(B.pm)B.pm.g.visible=false;if(B.fm)B.fm.g.visible=false;document.getElementById('bhud').style.display='none';document.getElementById('bMenu').style.display='none';
  const ks=Object.keys(GENES);for(let row=0;row<3;row++)for(let col=0;col<4;col++){const i=row*4+col,A=GENES[ks[(i*5+seed)%ks.length]],Bg=GENES[ks[(i*7+3+seed)%ks.length]];
   const G=Object.assign({},A);for(const k of['top','side','back','eyes','body'])G[k]=(i+k.length+seed)%2?A[k]:Bg[k];G.ears=GOPT.ears[(i+seed)%6];G.pattern=GOPT.pattern[(i+seed)%5];G.plan=plans[i%6];G.c1=hexMix(A.c1,Bg.c1,.5);G.size=1;
   const r={g:new THREE.Group(),inner:new THREE.Group()};r.g.add(r.inner);const ex=genModel(r.inner,sanitizeSpecies({G}).G);if(ex.fx){r.fx=ex.fx;ANIMS.add(r)}
   r.g.position.set(297.6+col*1.6,.12,-1+row*1.9);r.g.scale.setScalar(1.25);r.g.rotation.y=.45;grp.add(r.g)}
  B.camP=new V(300,3.6,7.4);B.camLk=new V(300,.6,.6);camera.clearViewOffset();camera.position.copy(B.camP);camL.copy(B.camLk);camera.lookAt(camL)}"""

def fusions(g, out):
    """Galerie : 12 fusions (2 par silhouette), dans l'arène de combat, en plein jour."""
    g.js('()=>{S.clock=12*60;updateEnv();window.__auto=false;runScript(async()=>{await battle({wild:mkMon("pigeolet",3)})})}')
    for i in range(60):
        g.p.clock.run_for(400)
        g.js("()=>{const d=document.getElementById('dlg');if(d.style.display==='block')d.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))}")
        if g.js('()=>!!document.querySelector("#bMenu button:not([disabled])")'): break
    g.p.set_viewport_size({'width': 1000, 'height': 700}); g.p.clock.run_for(500)
    for seed in (0, 5):
        g.p.evaluate('(s)=>{(%s)(s)}' % GAL, seed); snap(g, out + '/fusions_%d.png' % seed, 900)
        g.js('()=>{ARENA.group.remove(ARENA.group.children.slice(-1)[0])}')

def attaques(g, out):
    """Une capture par technique (au milieu de l'animation), assemblées en planche."""
    g.js('()=>{S.clock=12*60;updateEnv();window.__auto=false;runScript(async()=>{await battle({wild:mkMon("chicorin",3)})})}')
    for i in range(60):
        g.p.clock.run_for(400)
        g.js("()=>{const d=document.getElementById('dlg');if(d.style.display==='block')d.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))}")
        if g.js('()=>!!document.querySelector("#bMenu button:not([disabled])")'): break
    g.js("()=>{document.getElementById('bhud').style.display='none';document.getElementById('bMenu').style.display='none';document.querySelectorAll('.tip,#tip').forEach(e=>e.remove())}")
    ids = g.js('()=>Object.keys(MV)')
    a, b = map(int, os.environ.get('FX_RANGE', '0,99').split(','))
    manque = [i for i in ids if not g.js('(i)=>!!MOVEFX[i]'.replace('(i)', '()').replace('MOVEFX[i]', 'MOVEFX["%s"]' % i))]
    print('techniques sans effet propre :', manque)
    from PIL import Image
    tiles = []
    for i in ids[a:b]:
        if os.path.exists(out + '/fx_%s.png' % i): continue
        # plusieurs images pendant l'animation : on garde celle qui diffère le plus de l'image de départ
        from PIL import ImageChops
        base = out + '/fx__base.png'; g.p.screenshot(path=base); im0 = Image.open(base).convert('RGB')
        g.p.evaluate('(i)=>{window.__fx=MOVEFX[i](B.pm,B.fm,1)}', i)
        best, bestv = None, -1
        for k in range(7):
            g.p.clock.run_for(160); tmp = out + '/fx__%d.png' % k; g.p.screenshot(path=tmp)
            v = sum(1 for px in ImageChops.difference(im0, Image.open(tmp).convert('RGB')).crop((0, 0, 400, 500)).resize((100, 125)).getdata() if max(px) > 40)
            if v > bestv: best, bestv = tmp, v
        p = out + '/fx_%s.png' % i; os.replace(best, p)
        g.p.clock.run_for(2500); continue
        im = Image.open(p).convert('RGB'); w, h = im.size
        im = im.crop((0, int(h*.2), w, int(h*.75))).resize((200, int(h*.55/2)))
        from PIL import ImageDraw
        ImageDraw.Draw(im).text((6, 4), g.p.evaluate('(i)=>MV[i].n', i).encode('latin-1', 'replace').decode('latin-1'), fill=(255, 255, 0))
        tiles.append(im)

def planche(g, out):
    from PIL import Image, ImageDraw
    tiles = []
    for i in g.js('()=>Object.keys(MV)'):
        im = Image.open(out + '/fx_%s.png' % i).convert('RGB'); w, h = im.size
        im = im.crop((0, int(h*.2), w, int(h*.75))).resize((200, int(h*.55/2)))
        ImageDraw.Draw(im).text((6, 4), g.p.evaluate('(i)=>MV[i].n', i).encode('latin-1', 'replace').decode('latin-1'), fill=(255, 255, 0))
        tiles.append(im)
    cols = 7; W, H = tiles[0].size; rows = (len(tiles) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * W, rows * H))
    for k, t in enumerate(tiles): sheet.paste(t, ((k % cols) * W, (k // cols) * H))
    sheet.save(out + '/fx_planche.png'); print('planche', out + '/fx_planche.png')

def liege(g, out):
    """Liègenoir (smog), Route 5, Cokerie, club, Bueren."""
    g.js('()=>{Object.assign(F(),{brux:1,ch3:1,ch4done:1,r5:1,poudre:1,lie:1,samira:1,badge3:1});S.clock=12*60;refreshNPCs()}')
    for nom, carte, x, z, d in (('route5', 'ROUTE5', 20, 6, 'right'), ('place', 'LIE', 16, 19, 'up'), ('vitrines', 'LIE', 23, 19, 'right'), ('cokerie_ext', 'LIE', 4, 10, 'up'),
                                ('cokerie', 'COKERIE', 6, 6, 'up'), ('club', 'CLUB', 6, 8, 'up'), ('bueren', 'BUEREN', 5, 6, 'up'), ('arene', 'GYML', 5, 8, 'up')):
        g.js('()=>{runScript(async()=>{await goMap(%s,%d,%d,"%s")})}' % (carte, x, z, d)); g.p.clock.run_for(1500); g.js('()=>updateEnv()'); snap(g, out + '/lie_%s.png' % nom, 600)
    g.js('()=>{F().ch5done=1;runScript(async()=>{await goMap(LIE,16,19,"up")})}'); g.p.clock.run_for(1500); g.js('()=>updateEnv()'); snap(g, out + '/lie_place_apres.png', 600)

def ranch(g, out):
    """Ranch du Pays de Herve (enclos peuplés, Luciole), ferme, coloc d'Alex."""
    g.js('()=>{Object.assign(F(),{brux:1,ch3:1,ch4done:1,r5:1,ranch:1,lie:1,alex:1});S.clock=11*60;const R=ranchS();R.pens[0].mons=[mkMon("ratoir",20),mkMon("tchantchou",20)];R.pens[1].mons=[mkMon("moulinet",20),mkMon("chicorin",20)];R.couv=[mkEgg("pigeolet"),mkEgg("cokelin")];refreshNPCs()}')
    for nom, carte, x, z, d in (('entree', 'RANCH', 14, 3, 'down'), ('enclos', 'RANCH', 14, 11, 'down'), ('grange', 'RANCH', 21, 8, 'up'), ('mare', 'RANCH', 12, 20, 'up'),
                                ('ferme', 'FERME', 5, 6, 'up'), ('coloc', 'COLOC', 4, 4, 'up'), ('route5_sud', 'ROUTE5', 24, 12, 'down')):
        g.js('()=>{runScript(async()=>{await goMap(%s,%d,%d,"%s")})}' % (carte, x, z, d)); g.p.clock.run_for(1800); g.js('()=>updateEnv()'); snap(g, out + '/ranch_%s.png' % nom, 900)
    g.js('()=>{S.clock=22*60;runScript(async()=>{await goMap(RANCH,14,11,"down")})}'); g.p.clock.run_for(1500); g.js('()=>updateEnv()'); snap(g, out + '/ranch_nuit.png', 800)

if __name__ == '__main__':
    sc = sys.argv[1]; out = sys.argv[2] if len(sys.argv) > 2 else os.environ.get('TEMP', '.')
    os.makedirs(out, exist_ok=True)
    srv = T.serveur(os.path.join(T.RACINE, 'game'))
    with sync_playwright() as pw:
        b, g = lancer(pw, 'http://127.0.0.1:%d/index.html' % srv.server_address[1])
        globals()[sc](g, out)
        print('erreurs :', (g.console + g.js('()=>__errs'))[:5]); b.close()
