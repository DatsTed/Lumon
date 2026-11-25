"""Régénère docs/STRUCTURE.md : chaque fichier, son rôle, sa taille et ce qu'il déclare.
Usage : python tools/structure.py   (à relancer après chaque modification qui ajoute/déplace des fonctions)"""
import os, re

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GAME = os.path.join(RACINE, 'game')

ROLE = {
 'css/style.css': "Toute la mise en page (HUD, dialogues, menus, overlays, combat).",
 'js/core/base.js': "Raccourcis globaux ($, sleep, V, PI, rnd), état de partie `S`, drapeaux `F()`, options `OPT` (clé lumons_opt).",
 'js/data/musiques.js': "Partitions `SONGS` (une entrée par musique).",
 'js/core/audio.js': "Synthé WebAudio : musiques, ambiances, bruitages, volumes, fanfare, bouton muet.",
 'js/data/personnages.js': "`CH` : apparences de tous les personnages (peau, cheveux, tenues…).",
 'js/models/portraits2d.js': "Portraits 2D en SVG (chibi) pour l'intro et les menus, `STARTER_SVG`.",
 'js/data/types.js': "12 types, table d'efficacité `CHART`, `effOf`.",
 'js/data/attaques.js': "`MV` : toutes les capacités.",
 'js/data/especes.js': "`SP` : espèces de Lumons (stats, évolutions, lore), `ETY` étymologies, `DEX`, `STARTERS`, `CRY`.",
 'js/data/objets.js': "`ITEMS` (objets) + utilisation : `healAll`, `canUse`, `applyItem`.",
 'js/data/icones.js': "Icônes dessinées à la main (`ICON`, `ico`).",
 'js/systemes/lumons.js': "Création et stats des Lumons : `mkMon`, `calc`, natures, sexe, gènes, soins (`healMachine`).",
 'js/data/succes.js': "20 succès `ACH`, `unlock`, `checkAch`.",
 'js/systemes/journal.js': "Astuces (`hintT`) et journal.",
 'js/core/moteur.js': "Three.js : renderer, scène, caméra, soleil, matériaux toon, aides `add`/`box`/`plane`, `ANIMS`.",
 'js/models/humains.js': "`human()` : modèle 3D des humains (coiffures, tenues, accessoires).",
 'js/models/lumons3d.js': "`MODELS` : modèles 3D des Lumons, `MSCALE`, `monModel`.",
 'js/world/entites.js': "Classe des personnages (`Char`), joueur, PNJ (`npc`), déplacements, `gotoMap`, compagnon.",
 'js/world/terrain.js': "`makeMap`, grilles, textures de sol, `terrain`, panneaux/objets au sol, aides `centreRoom`, `wildNight`, `treesRim`.",
 'js/models/decor.js': "Décor 3D : maisons, bâtiments, labo, beffroi, fontaine, friterie, terril, arche, pièces (`room`).",
 'js/systemes/cinema.js': "Caméra cinéma : `CINE`, `cineOn`/`cineOff`, `camShot`, `track`.",
 'js/systemes/nightwhite.js': "Night White : façade, boutique, personnel, salle (`nwRoom`), service/mini-jeux (`nwJob`), test d'embauche + entretien (`nwInterview`, `NW_ITW`).",
 'js/histoire/cinematiques.js': "Cinématiques Night White : Younes et Fifi (`nwIxCine`), Younes rasé, révélation d'Amin.",
 'js/world/ixellette.js': "Carte d'Ixellette (`buildIxellette`) et ses PNJ (`placePNJIxellette`).",
 'js/world/interieurs.js': "Intérieurs : labo (`buildLabo`), centres/boutique de Charleroc, Night White, boutique, arène de Ginette.",
 'js/world/route1.js': "Carte de la Route 1.",
 'js/world/charleroc.js': "Carte de Charleroc.",
 'js/world/route2.js': "Carte de la Route 2.",
 'js/world/bruxellia.js': "Carte de Bruxellia.",
 'js/world/route3.js': "Carte de la Route 3 (+ garage d'Alex).",
 'js/world/jourdanfritte.js': "Carte de Jourdanfritte.",
 'js/world/arene.js': "Arène de combat et galerie 3D (`ARENA`, `GAL`).",
 'js/world/monde.js': "Variables des cartes (TOWN, LAB…), `buildWorld` (appelle chaque carte dans l'ordre), `goMap`, `refreshNPCs`, centre de soin après défaite (`RESPAWN`, `respawnCentre`).",
 'js/core/ui.js': "Dialogues (`say`, `choose`, `msg`), overlays (`show`/`hide`), fondus, bannière, listes, icônes d'équipe, `toast`, `give`.",
 'js/histoire/objectifs.js': "`objText` : la chaîne d'objectifs affichée, `setObj`.",
 'js/core/save.js': "Sauvegarde `saveGame`/`loadGame` (lumons_save, version 5), `newGame`, `continueGame`.",
 'js/core/menus.js': "Menu du monde, sac par poches, options/volumes, soins, boutiques, fiche de Lumon (`statScreen`).",
 'js/systemes/lumidex.js': "Galerie/visionneuse 3D, Lumidex et sa voix (synthèse vocale).",
 'js/core/manette.js': "Manette (Gamepad API) : déplacement, A/B, Start = menu, Select = carte, navigation dans les menus.",
 'js/core/input.js': "Clavier, croix, joystick, bouton A, `runScript`.",
 'js/systemes/monture.js': "Monture (Laïka) : `toggleRide`, `rideTick`, caresser Laïka.",
 'js/world/interactions.js': "Compagnon, `interact`, pas (`onStepped`), dresseurs, rencontres sauvages, PNJ temporaires.",
 'js/combat/combat.js': "Combat : état `B`, HUD, menu, `useMove`, statuts, XP, captures, `battle`.",
 'js/combat/ia.js': "Choix de l'adversaire (`foeChoice`).",
 'js/combat/effets.js': "Effets visuels des attaques (textures, rayons, éclairs, pluie…), `sparkAt`.",
 'js/systemes/evolution.js': "`checkEvos`, `evolve`, cinématique d'évolution.",
 'js/systemes/fusion.js': "Génération procédurale (`GENES`, `genModel`), `fuse`, formes/Éclats, Fusionneur, cinématique de fusion.",
 'js/systemes/apparence.js': "Personnalisation du héros : `LOOKS`, palettes, `pickLook`, `pickGender`, aperçu 3D `lookPreview`.",
 'js/histoire/prologue.js': "Prologue : narration d'ouverture, nom, Prof (`talkProf`, `profIntro`), famille, Danny, labo, starter, duel Dolba.",
 'js/histoire/chapitre1.js': "Chapitre 1 : barrières, Kétosaures, Luciole (combat du terril), concert de MC Sambre (`sambreConcert`, `SAMBRE_RIMES`) puis battle, friterie, Rudy, Gérard (Lumisphère), Ginette.",
 'js/histoire/chapitre2.js': "Chapitre 2 : Route 2 (cinématique de bagarre `r2Fight`, enveloppe, Lemaire), Alias, Smile and Eat.",
 'js/histoire/chapitre3.js': "Chapitre 3 : Pigeolet royal, Captain.",
 'js/histoire/luciole.js': "Rencontres scénarisées de Luciole sans combat (`LUC_RDV` : Ixellette, Bruxellia), `placePNJLuciole`, `lucRefresh`.",
 'js/systemes/oeufs.js': "Œufs, Pension, compatibilité, éclosion au pas.",
 'js/systemes/embuscades.js': "Embuscades cachées Kétosaures / Pirates.",
 'js/systemes/mode-test.js': "Mode test (Options).",
 'js/systemes/jour-nuit.js': "Ciel, heure (journée de 40 min), météo, `updateEnv`.",
 'js/world/carte-monde.js': "Mini-carte et carte du monde (+ téléportation en mode test, `WMTP`).",
 'js/world/monde-vivant.js': "Poussière de course, PNJ qui se baladent, bulle d'action.",
 'js/core/boucle.js': "Boucle de rendu `loop`, garde-fou anti-écran noir.",
 'js/main.js': "Démarrage : construit le monde, écran titre, boutons Nouvelle partie / Continuer / Galerie.",
}

import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from jstok import line_states


def noms(txt):
    """Noms déclarés au premier niveau (function, class, const, let, var)."""
    out = []
    def cb(li, d, mot, apres):
        if d == 0 and mot in ('function', 'class', 'const', 'let', 'var'):
            m = re.match(r'\s*\*?\s*([A-Za-z_$][\w$]*)', apres)
            if m and m.group(1) not in out: out.append(m.group(1))
    line_states(txt, cb)
    return out


def main():
    html = open(os.path.join(GAME, 'index.html'), encoding='utf-8').read()
    fichiers = re.findall(r'href="(css/[^"]+)"', html) + re.findall(r'<script src="(js/[^"]+)"', html)
    lignes = ["# Structure du projet Lumons", "",
      "À lire en premier à chaque demande, puis n'ouvrir que les fichiers concernés.", "",
      "## Principes",
      "- Scripts classiques (pas de modules ES) : toutes les variables de premier niveau sont globales et partagées.",
      "- **L'ordre des balises `<script>` de `game/index.html` remplace les imports.** Un fichier peut utiliser à son chargement",
      "  ce que déclarent les fichiers *précédents* ; dans le corps d'une fonction, il peut utiliser n'importe quoi.",
      "- Nouveau fichier JS : l'ajouter dans `game/index.html`, puis `python tools/build.py` (met à jour `sw.js`), puis `python tools/structure.py`.",
      "- `tools/build.py` → `dist/index.html` (fichier unique, pour un artefact ou une comparaison).",
      "- `tools/test_confort.py` (manette, ordre des attaques, téléport) et `tools/test_histoire.py` (scènes du lot 2, défaites, test de Nour).",
      "- `tools/test.py` → test automatique (Playwright, faux Three.js). `--ancien git:<commit>` compare avec une ancienne version.",
      "- Sauvegarde : localStorage `lumons_save` (version 5), options `lumons_opt`. Ne pas casser la compatibilité.",
      "- Publication : push sur `main` → GitHub Actions publie `game/` sur GitHub Pages (cache du service worker renouvelé).", "",
      "## Arborescence", "```",
      "game/            le jeu publié tel quel (index.html, css/, js/, manifest, icônes, sw.js)",
      "  js/core/       moteur, audio, entrées, interface, sauvegarde, menus, boucle",
      "  js/data/       données pures : types, attaques, espèces, objets, personnages, musiques, succès, icônes",
      "  js/models/     modèles 3D et portraits 2D",
      "  js/world/      terrain, une carte par fichier, entités, interactions, carte du monde",
      "  js/combat/     combat, IA, effets visuels",
      "  js/systemes/   fusion, évolution, œufs, Night White, monture, jour/nuit, embuscades, cinéma, Lumidex, mode test",
      "  js/histoire/   objectifs, prologue, chapitres 1 à 3, cinématiques",
      "tools/           build.py, test.py, structure.py",
      "docs/            STRUCTURE.md (ce fichier), CHANGELOG.md, ETAT-DU-PROJET.md", "```", "",
      "## Fichiers (dans l'ordre de chargement)", "",
      "| Fichier | Ko | Rôle | Déclare |", "| --- | --- | --- | --- |"]
    for f in fichiers:
        txt = open(os.path.join(GAME, f), encoding='utf-8').read()
        n = noms(txt) if f.endswith('.js') else []
        d = ', '.join('`%s`' % x for x in n[:28]) + (' … (+%d)' % (len(n) - 28) if len(n) > 28 else '')
        lignes.append('| `%s` | %.1f | %s | %s |' % (f, len(txt.encode()) / 1024, ROLE.get(f, '?'), d))
    open(os.path.join(RACINE, 'docs', 'STRUCTURE.md'), 'w', encoding='utf-8').write('\n'.join(lignes) + '\n')
    print('docs/STRUCTURE.md : %d fichiers' % len(fichiers))


if __name__ == '__main__':
    main()
