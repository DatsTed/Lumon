"""Assemble le jeu en UN seul fichier : dist/index.html (CSS et JS recollés dans l'ordre des balises).
Met aussi à jour la liste des fichiers mis en cache par game/sw.js (CORE).

Usage (depuis la racine du dépôt) :
  python tools/build.py                       # produit dist/index.html + met à jour sw.js
  python tools/build.py --comparer ancien.html   # vérifie que le JS recollé contient les mêmes lignes
"""
import argparse, collections, os, re, sys

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GAME = os.path.join(RACINE, 'game')
RE_JS = re.compile(r'^<script src="(js/[^"]+)"></script>$')
RE_CSS = re.compile(r'^<link rel="stylesheet" href="(css/[^"]+)">$')


def lire(p):
    with open(p, encoding='utf-8', newline='') as f:
        return f.read()


def fichiers_locaux(html):
    js, css = [], []
    for l in html.split('\n'):
        m = RE_JS.match(l)
        if m: js.append(m.group(1))
        m = RE_CSS.match(l)
        if m: css.append(m.group(1))
    return js, css


def assembler():
    html = lire(os.path.join(GAME, 'index.html'))
    js, css = fichiers_locaux(html)
    out, script_fait = [], False
    for l in html.split('\n'):
        m = RE_CSS.match(l)
        if m:
            out += ['<style>', lire(os.path.join(GAME, m.group(1))).rstrip('\n'), '</style>']
            continue
        m = RE_JS.match(l)
        if m:
            if not script_fait:   # un seul <script> : même comportement (hoisting) que l'ancien fichier unique
                out.append('<script>')
                out += [lire(os.path.join(GAME, f)).rstrip('\n') for f in js]
                out.append('</script>')
                script_fait = True
            continue
        out.append(l)
    return '\n'.join(out), js, css


def flipper():
    """Le flipper du Smile and Eat (game/flipper/, ouvert dans une iframe) : aussi mis en cache pour jouer hors ligne."""
    d = os.path.join(GAME, 'flipper')
    if not os.path.isdir(d): return []
    out = ['./flipper/index.html', './flipper/pinball.css']
    out += ['./flipper/js/' + f for f in sorted(os.listdir(os.path.join(d, 'js'))) if f.endswith('.js')]
    return out


def maj_sw(js, css):
    p = os.path.join(GAME, 'sw.js')
    sw = lire(p)
    core = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'] + \
           ['./' + f for f in css + js] + flipper() + ['https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js']
    ligne = 'const CORE=[' + ','.join("'%s'" % u for u in core) + '];'
    neuf, n = re.subn(r'^const CORE=\[.*\];$', lambda m: ligne, sw, flags=re.M)
    assert n == 1, 'ligne CORE introuvable dans sw.js'
    if neuf != sw:
        with open(p, 'w', encoding='utf-8', newline='') as f:
            f.write(neuf)
        print('sw.js : liste CORE mise à jour (%d fichiers)' % len(core))


def lignes_script(html):
    """Lignes du code JS (hors balises) d'un fichier unique."""
    a = html.index('<script>\n', html.index('three.min.js')) + len('<script>\n')
    b = html.rindex('</script>')
    return html[a:b].split('\n')


def comparer(dist, ancien):
    c1 = collections.Counter(l for l in lignes_script(lire(ancien)) if l.strip())
    c2 = collections.Counter(l for l in lignes_script(dist) if l.strip())
    en_moins, en_plus = c1 - c2, c2 - c1
    print('comparaison des lignes JS : %d en moins, %d en plus' % (sum(en_moins.values()), sum(en_plus.values())))
    for l, n in list(en_moins.items())[:20]: print('  - %s' % l[:110])
    for l, n in list(en_plus.items())[:40]: print('  + %s' % l[:110])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--comparer', help='ancien index.html (fichier unique) à comparer')
    a = ap.parse_args()
    html, js, css = assembler()
    os.makedirs(os.path.join(RACINE, 'dist'), exist_ok=True)
    with open(os.path.join(RACINE, 'dist', 'index.html'), 'w', encoding='utf-8', newline='') as f:
        f.write(html)
    print('dist/index.html : %d Ko, %d fichiers JS, %d CSS' % (len(html.encode()) // 1024, len(js), len(css)))
    maj_sw(js, css)
    if a.comparer:
        comparer(html, a.comparer)


if __name__ == '__main__':
    sys.exit(main())
