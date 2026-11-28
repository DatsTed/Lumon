"""Régénère docs/STRUCTURE.md : chaque fichier, son rôle, sa taille et ce qu'il déclare.
Usage : python tools/structure.py   (à relancer après chaque modification qui ajoute/déplace des fonctions)"""
import os, re

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GAME = os.path.join(RACINE, 'game')

ROLE = {
 'css/style.css': "Toute la mise en page (HUD, dialogues, menus, overlays, combat).",
 'js/core/base.js': "Raccourcis globaux ($, sleep, V, PI, rnd), état de partie `S`, drapeaux `F()`, options `OPT` (clé lumons_opt).",
 'js/data/musiques.js': "Partitions `SONGS` (une entrée par musique) : dont `drame`/`celeste` (ouverture), `keto`/`ketoboss` (techno psy des Kétosaures), `lift` (ascenseur des Night White).",
 'js/core/audio.js': "Synthé WebAudio : musiques (mélodie, basse, batterie, nappes `padTone`, basse acide `acidTone`), ambiances météo (volume à part), bruitages, fanfare, bouton muet.",
 'js/data/personnages.js': "`CH` : apparences de tous les personnages (peau, cheveux, tenues…).",
 'js/models/portraits2d.js': "Portraits 2D en SVG (chibi) pour l'intro et les menus, `STARTER_SVG`.",
 'js/data/types.js': "12 types, table d'efficacité `CHART`, `effOf`.",
 'js/data/attaques.js': "`MV` : toutes les capacités.",
 'js/data/especes.js': "`SP` : espèces de Lumons (stats, évolutions, lore), `ETY` étymologies, `DEX`, `STARTERS`, `CRY`.",
 'js/data/objets.js': "`ITEMS` (objets) + utilisation : `healAll`, `canUse`, `applyItem`.",
 'js/data/icones.js': "Icônes dessinées à la main (`ICON`, `ico`).",
 'js/data/economie.js': "Économie réaliste (`PRIX`), Lumisphères (`BALLS`, paliers `BALL_UNLOCK`/`ballsDispo`, `ballMult`), clopes et alcool du Night White (`bst`, `useBattleBoost`).",
 'js/systemes/lumons.js': "Création et stats des Lumons : `mkMon`, `calc`, natures, sexe, gènes, soins (`healMachine`).",
 'js/data/succes.js': "21 succès `ACH`, `unlock`, `checkAch`.",
 'js/systemes/journal.js': "Astuces (`hintT`) et journal.",
 'js/core/moteur.js': "Three.js : renderer, scène, caméra, soleil, matériaux toon, aides `add`/`box`/`plane`, `ANIMS`.",
 'js/models/humains.js': "`human()` : modèle 3D des humains (coiffures, tenues, accessoires).",
 'js/models/lumons3d.js': "`MODELS` : modèles 3D des Lumons, `MSCALE`, `monModel`.",
 'js/models/vehicules.js': "Voitures du garage Wagner (`CARS`, `carModel`) : Rolls-Royce d'après le modèle GLB (silhouette relevée), Audi A6 Avant S-line.",
 'js/systemes/nuit.js': "Lumière la nuit (`glowAt`, `nightApply`), lanternes des routes, buissons à objets (`itemBushes`), Lumons compagnons des persos (`PETS`, `addPet`), `nightSetup`.",
 'js/world/entites.js': "Classe des personnages (`Char`), joueur, PNJ (`npc`), déplacements, `gotoMap`, compagnon.",
 'js/world/terrain.js': "`makeMap`, grilles, textures de sol, `terrain`, panneaux/objets au sol, aides `centreRoom`, `wildNight`, `treesRim`.",
 'js/models/decor.js': "Décor 3D : maisons, bâtiments, labo, beffroi, fontaine, friterie, terril, arche, pièces (`room`).",
 'js/systemes/cinema.js': "Caméra cinéma : `CINE`, `cineOn`/`cineOff`, `camShot`, `track`.",
 'js/systemes/nightwhite.js': "Night White : façade, boutique, personnel, salle (`nwRoom`), service/mini-jeux (`nwJob`), test d'embauche + entretien (`nwInterview`, `NW_ITW`).",
 'js/histoire/cinematiques.js': "Cinématiques Night White : Younes et Fifi (`nwIxCine`), Younes rasé, révélation d'Amin + appel visio, Younes en congé maladie (`younesSickScene`).",
 'js/world/ixellette.js': "Carte d'Ixellette (`buildIxellette`) et ses PNJ (`placePNJIxellette`).",
 'js/world/interieurs.js': "Intérieurs : labo (`buildLabo`), centres/boutique de Charleroc, Night White, boutique, arène de Ginette.",
 'js/world/route1.js': "Carte de la Route 1.",
 'js/world/charleroc.js': "Carte de Charleroc.",
 'js/world/route2.js': "Carte de la Route 2.",
 'js/world/bruxellia.js': "Carte de Bruxellia.",
 'js/world/route3.js': "Carte de la Route 3 (+ garage d'Alex).",
 'js/world/jourdanfritte.js': "Carte de Jourdanfritte.",
 'js/world/arene.js': "Arène de combat et galerie 3D (`ARENA`, `GAL`).",
 'js/world/route4.js': "Route 4 (Bruxellia ↔ Anversaille) : canal, pont-levis de l'éclusier, dresseurs.",
 'js/world/anversaille.js': "Anversaille : port, containers, grue, Maison des Lumons (`CENTREA`), arène de Marieke (`GYMA`).",
 'js/world/monde.js': "Variables des cartes (TOWN, LAB…), `buildWorld` (appelle chaque carte dans l'ordre), `goMap`, `refreshNPCs`, centre de soin après défaite (`RESPAWN`, `respawnCentre`).",
 'js/core/ui.js': "Dialogues (`say`, `choose`, `msg`), overlays (`show`/`hide`), fondus, bannière, listes, icônes d'équipe, `toast`, `give`.",
 'js/histoire/objectifs.js': "`objText` : la chaîne d'objectifs affichée, `setObj`.",
 'js/core/save.js': "Sauvegarde `saveGame`/`loadGame` (lumons_save, version 5), `newGame`, `continueGame`.",
 'js/core/menus.js': "Menu du monde, sac par poches, options/volumes, soins, boutiques, fiche de Lumon (`statScreen`).",
 'js/systemes/lumidex.js': "Galerie/visionneuse 3D, Lumidex et sa voix (synthèse vocale).",
 'js/core/manette.js': "Manette (Gamepad API) : déplacement, A/B, Start = menu, Select = carte, navigation dans les menus.",
 'js/core/voix.js': "Voix des personnages façon Animal Crossing (`VOIX`, `voiceBlip`), une voix par personnage, option `OPT.vx`.",
 'js/core/input.js': "Clavier, croix, joystick, bouton A, `runScript`.",
 'js/systemes/monture.js': "Monture (Laïka) : `toggleRide`, `rideTick`, caresser Laïka.",
 'js/world/interactions.js': "Compagnon, `interact`, pas (`onStepped`), dresseurs, rencontres sauvages, PNJ temporaires.",
 'js/combat/combat.js': "Combat : état `B`, HUD, menu, `useMove`, statuts, XP, captures, `battle`.",
 'js/combat/ia.js': "Choix de l'adversaire (`foeChoice`).",
 'js/combat/effets.js': "Effets visuels des attaques (textures, rayons, éclairs, pluie…), `sparkAt`.",
 'js/combat/duo.js': "Combats en duo (2 contre 2) : `duoLoop`, placement face à face `duoPlace`/`duoGround`, barres de vie `duoHud` — `battle({duo:2,…})`.",
 'js/systemes/evolution.js': "`checkEvos`, `evolve`, cinématique d'évolution.",
 'js/systemes/adn.js': "Mini-jeu ADN de la fusion (`dnaGame` : raté / bien / parfait).",
 'js/systemes/fusion.js': "Génération procédurale (`GENES`, `genModel`), `fuse` (naît au stade le plus bas des parents, `stageOf`), formes/Éclats, Fusionneur, cinématique de fusion.",
 'js/systemes/boss.js': "Évolutions des Lumons uniques des boss (`BOSS_EVO`, `bossMon`), combat de Snow et MC Sambre en 2 contre 2 (`snowBattle`), combats du mode test (`testCombats`).",
 'js/systemes/apparence.js': "Personnalisation du héros : `LOOKS`, palettes, `pickLook`, `pickGender`, aperçu 3D `lookPreview`.",
 'js/histoire/prologue.js': "Prologue : ouverture (Laïka sauvée des Kétosaures sous le pont, `NARR`, `narrLoop`), nom, Prof (`talkProf`, `profIntro`), famille, Danny, labo, starter, duel Dolba.",
 'js/histoire/chapitre1.js': "Chapitre 1 : barrières, Kétosaures, Luciole (combat du terril), concert de MC Sambre (`sambreConcert`, `SAMBRE_RIMES`) puis battle, friterie, Rudy, Gérard (Lumisphère), Ginette.",
 'js/histoire/chapitre2.js': "Chapitre 2 : Route 2 (cinématique de bagarre `r2Fight`, enveloppe, Lemaire), Alias, Smile and Eat.",
 'js/histoire/chapitre3.js': "Chapitre 3 : Pigeolet royal, deal Cisoa d'Alex, Captain et Pirate Bob (2 contre 2).",
 'js/histoire/luciole.js': "Rencontres scénarisées de Luciole sans combat (`LUC_RDV` : Ixellette, Bruxellia), `placePNJLuciole`, `lucRefresh`.",
 'js/histoire/essai.js': "Période d'essai chez Amin : repas au Smile and Eat, quête de l'huile de coude (`HUILE`, `huile()`), `aminTrial`, Danny qui crie (`dannyShout`), pharmacie, Smile and Eat (`SMILE`).",
 'js/systemes/telephone.js': "Appel vidéo de groupe à l'écran (`phoneOn`, `phoneSpeak`, `phoneOff`).",
 'js/histoire/chapitre4.js': "Chapitre 4 : PC d'Alex (`alexPCScene`), Nour, énigme de l'éclusier, secret de Luciole, arène de Marieke, grue du port (`craneGame`), Snow au port, fin du chapitre.",
 'js/systemes/pc.js': "PC de stockage Wagner (`S.box`, `pcMenu`, `receiveMon`), colis de la Prof (`profColis`).",
 'js/systemes/oeufs.js': "Œufs, Pension, compatibilité, éclosion au pas.",
 'js/systemes/embuscades.js': "Embuscades cachées Kétosaures / Pirates.",
 'js/systemes/mode-test.js': "Mode test (Options), combat 2 contre 2 aléatoire (`testDuo`).",
 'js/systemes/liens.js': "Liens avec Luciole et Alex (`lienChoix`, `lienCheck`, voies et cadeaux `LIEN_REW`), écran `liensScreen`, discussion du jour au garage (`alexTalk`, `ALEX_SUJETS`), Marché gris, Alex en panne sur la Route 5 (`alexR5`), balades de Luciole au Ranch (`lucBalade`).",
 'js/systemes/flipper.js': "Flipper Lumons du Smile and Eat : borne (`buildFlipper`, `flipBorne`), iframe `game/flipper/` (`flipperOpen`), passerelle `LUMPIN` (Lumisphères, captures `flipEspece`, œufs `flipOeuf`, paliers, tickets), pause du jeu.",
 'js/world/ranch.js': "Ranch du Pays de Herve (`RANCH`) : enclos A/B avec Lumons en 3D, couveuse, nid du jour, boutique, Grand Livre ; ferme (`FERME`) ; appart d'Alex (`COLOC`) ; éclosion ×2 au Ranch, Couverture, Fromage de Herve.",
 'js/world/route5.js': "Route 5 (Jourdanfritte ↔ Liègenoir) : cheminées, dresseurs Kétosaures, chemin du sud vers le Ranch.",
 'js/world/liegenoir.js': "Liègenoir (smog) : Perron, club du Baron, Cokerie, Montagne de Bueren, rue des Vitrines, Maison des Lumons, arène de Lambert.",
 'js/histoire/chapitre5.js': "Chapitre 5 : Route 5, Poudre d'Éclat, Samira (œuf), Lambert, énigme des fours (œuf de Cokelin), escalier et battle de rap, le Baron, choix avec Luciole.",
 'js/combat/techniques.js': "Un effet visuel propre à chaque technique (`MOVEFX`, dessins `MTEX`).",
 'js/systemes/formes.js': "Silhouettes des Lumons générés (`planOf` : quadrupède, bipède, serpent, volant, flottant, boule).",
 'js/data/especes-liegenoir.js': "Lumons de Liègenoir (Ratoir, Perronrat, Tchantchou, Smogule, Lucinelle, Cokelin).",
 'js/data/especes-ardennes.js': "Lumons des chapitres 6 et 7 (Escargolin, Citadescar, Échassor, Anguimeuse, Marcassor, Sanglardenne, Fagnelin, Cervolt, Prismalis) + attaques Vol, Électrik, Sol et leurs effets.",
 'js/histoire/chapitre6.js': "Chapitre 6 : Route 6 (agent Verhaegen, Luciole selon la voie), Givrâle sous le viaduc, Namuroc (appel d'Alex selon la voie), joute d'échasses (`jouteJeu`) et Théo, téléphérique, Snow à la Citadelle, herses des souterrains, Hector Grognon.",
 'js/histoire/chapitre7.js': "Chapitre 7 : Route 7 (Captain, le piège du marcassin), Bastognac, Noix & Jambon, arène d'Hélène, code de la Fondation Ardenne, la Directrice et Prismalis, fin (Snow, Luciole, la Prof).",
 'js/world/namuroc.js': "Cartes du chapitre 6 : Route 6, Namuroc (Parlement, Halle des Échasseurs, téléphérique), Citadelle, souterrains de la Compagnie Grognon.",
 'js/world/bastognac.js': "Cartes du chapitre 7 : Route 7 enneigée, Bastognac (la Noix, arène d'Hélène), laboratoire de la Fondation Ardenne.",
 'js/data/especes-flandre.js': "Lumons des chapitres 8 et 9 (Moulivent, Canardin, Gravenfant, Gravenspectre, Agnelys, Crevetin, Crevettor, Mouettor, Éolys, Dunelle) + attaques Écume, Tempête de sable, Carillon.",
 'js/histoire/chapitre8.js': "Chapitre 8 : Route 8 (invitation d'Alex selon la voie), Gandoux, la Comtesse (Spectre), le Gala chez Gravenholding, les tableaux et le coffre du Président, Brutus, le panneau des Juges intègres (Agnelys).",
 'js/histoire/chapitre9.js': "Chapitre 9 : Route 9 (Luciole rentre au port), Côte du Nord, pêche à la crevette à cheval (`crevetteJeu`), Jef (Électrik), Captain et Luciole, le cargo « Northern Star » et Visser.",
 'js/histoire/chapitre10.js': "Chapitre 10 (fin) : Nour maître de l'arène de Bruxellia (Feu), l'entrée de la Ligue et Dolba, le Conseil des Quatre (`CONSEIL`, grilles), le Président-Champion, l'épilogue et le générique (`credits`), l'objectif d'après-jeu.",
 'js/world/flandre.js': "Cartes des chapitres 8 à 10 : Route 8 (polders, moulin), Gandoux (château, cathédrale, canal, Gravenholding, Gala), Route 9 (dunes), Côte du Nord (digue, estacade, cargo), arènes, la Ligue d'Ardenval.",
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
      "- `tools/test_confort.py` (manette, ordre des attaques, téléport) et `tools/test_histoire.py` (scènes, essai chez Amin, défaites, test de Nour), `tools/test_combats.py` (duo, Snow, fusions), `tools/test_chapitre4.py` (lot 3 et chapitre 4), `tools/test_chapitre5.py`, `tools/test_lot5.py` (liens, Ranch), `tools/test_flipper.py`, `tools/test_ranch.py` (Laïka protégée, couveuses reliées), `tools/test_chapitre6.py` (chapitres 6 et 7), `tools/test_fin.py` (chapitres 8 à 10 jusqu'au générique).",
      "- `tools/test_audit.py` (données, dresseurs, arrivées de cartes) et `tools/test_bavard.py` (parle à tous les PNJ à 3 moments de l'histoire) : à lancer avant chaque version. `tools/vrai3d.py tour` : toutes les villes en vrai 3D. Journal des bugs trouvés : `docs/JOURNAL-VERIFICATION.md`.",
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
      "  js/histoire/   objectifs, prologue, chapitres 1 à 10, cinématiques",
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
