# Lumons – État du projet et suite (25 novembre 2026)

## Contexte
- Jeu de créatures façon Pokémon, 100 % belge, 3D Three.js r128, joué sur téléphone. Langue : français.
- Le jeu est découpé en ~60 petits fichiers dans `game/` (`css/`, `js/core|data|models|world|combat|systemes|histoire`) : **lire d'abord `docs/STRUCTURE.md`**. Personnages, Lumons, musiques et bruitages générés par le code. Voix du Lumidex = synthèse vocale du téléphone.
- `python tools/build.py` → `dist/index.html` (fichier unique) ; `python tools/test.py` → test automatique.
- En ligne : https://datsted.github.io/Lumon/ (appli installable : manifeste, icônes, service worker). Aussi publié en artefact Claude (slug `a60cad13-5ca4-4dfe-9692-d0087cdb8cae`).
- Sauvegarde : localStorage `lumons_save` (version 5), options : `lumons_opt`.
- Tests : `tools/test.py` (Playwright + Chrome avec un faux Three.js : partie, combat, fusion, évolution, sauvegarde ; `--ancien git:<commit>` compare avec une ancienne version). Le rendu 3D se vérifie avec les captures de Ted.

## Règles de travail avec Ted
1. Étape par étape, captures pour valider le rendu.
2. Économiser les crédits : lots groupés, réponses courtes en puces, pas de code complet dans le chat.
3. Après chaque lot : tester, mettre en ligne, résumer ce qui est fait et ce qui reste à vérifier.
4. Décision de design qui change le jeu : donner son avis et attendre son feu vert.

## Univers et géographie
Ardenval, Belgique imaginaire. Le héros est un adulte rockeur qui a connu la rue, le squat et la drogue ; il repart de zéro avec sa chienne Laïka, seule Lumon de son espèce. Humour belge, thèmes durs traités avec cœur, direction artistique de plus en plus mature.

On avance toujours vers le haut de l'écran : Ixellette (sud, départ) → Route 1 (nord) → Charleroc → Route 2 au nord de Charleroc (brume de Snow) → Bruxellia → Route 3 (est) → Jourdanfritte.

## Scénario (chaîne d'objectifs actuelle)
1. Prologue à Ixellette : Françoise (maman), Doudoune (tante), labo de la Prof Verhaegen, starter, Lumidex.
2. Duel contre Dolba sous l'arche « Route 1 » au nord du village ; la barrière de chantier s'ouvre.
3. Route 1 : premiers Kétosaures, code de la mine Sainte-Barbe (3 indices), barrière juste avant Charleroc.
4. Charleroc : Gérard confie la Lumisphère d'Éclat (objet de quête) dès l'arrivée ; arène de Ginette (Roche, Médaille Terril) ; colis de la Prof ; Luciole au vieux terril ; concert de Snow et battle contre MC Sambre.
5. Retour à Ixellette : la Prof reçoit médaille + Lumisphère et débloque le Fusionneur ; la brume se lève, Route 2 ouverte. Objectif : Bruxellia avant le Jour 200.
6. Night White d'Ixellette (1re entrée) : cinématique Younes et Fifi ; blague « Nour est le grand frère, appelle-le Monsieur Nour ».
7. Route 2 : bagarre Kétosaures contre Pirates ; enveloppe d'argent sale pour le Commissaire Lemaire.
8. Bruxellia : Alias l'avocat ; test d'embauche chez Nour (« Monsieur Nour ») ; colis de Cisoa pour Amin.
9. Route 3 : un Pigeolet royal vole le colis et se pose sur la Rolls Ghost d'Alex (combat) ; Captain, chef des Pirates.
10. Jourdanfritte : Amin révèle qu'il est le GRAND frère ; appel vidéo « Night White Family » ; pari perdu, Younes rasé par Fifi ; période d'essai (3 services), fin du chapitre 3.

## Personnages
| Personnage | Rôle | Notes |
| --- | --- | --- |
| Héros | joueur | personnalisable : coiffures adultes, tenues rock/punk/grunge/gothique, accessoires |
| Laïka | partenaire unique | Laïkamobile → Laïkador → Cerbiscuit, monture |
| Françoise, Doudoune, Pistache | famille | maison à Ixellette, chats, Jack Russell |
| Prof Lianne Verhaegen | labo Ixellette | Fusionneur |
| Dolba (ex-Nils) | rival | lunettes, calvitie, t-shirt « PHUB » |
| Younes | Night White Ixellette | ami du camp de Bouillon (formation d'animateur), coupe courte puis crâne rasé |
| Fifi le Firat | employé Ixellette | dit F à la place de P |
| Nour | Night White Bruxellia | le PETIT frère |
| Amin | Night White Jourdanfritte | le GRAND frère |
| Colin (ex-Hakim) | employé Bruxellia | blanc, crâne rasé, tatouage bras gauche, un peu con, gueule parfois |
| Snow, Luciole, MC Sambre | Kétosaures | Givrâle, Noctiluce, Sambrax |
| Captain, Alias | Pirates, avocat | Krakapitaine |
| Ginette, Gérard, Mamie Rose | Charleroc | arène, Lumisphère et premier œuf, Pension |
| Danny, Rudy, Lemaire, Alex, Jalal, Gaston | habitants | couronne, sortie de la drogue, police, garage de luxe, Smile and Eat, Boutique Lumi |

## Systèmes construits
- Combats tour par tour, 12 types, statuts, effets visuels, XP partagée, revanches, Lumons uniques des boss.
- 21 espèces, captures, shiny, évolutions épiques (musique, zoom, fanfare), geste « maintiens pour évoluer », Lumidex avec voix et étymologie.
- Fusions : Fusionneur verrouillé jusqu'à médaille + Lumisphère, cinématique, musique, décor sombre, fusions uniques, 3 formes dont une forme ultime avec aura ; deux identiques = amélioration des IV.
- Œufs, sexes, Pension, éclosion au pas.
- Monde : jour/nuit (40 min), météo, ciel nuageux, textures, monture, carte du monde, embuscades cachées.
- Night White (test, essai, 3 mini-jeux), friteries, boutiques, quêtes Danny, Rudy, enveloppe.
- Sac par poches, relâcher un Lumon, volumes musique/bruitages (bruitages 15 % par défaut), journal, 20 succès, mode test.
- Caméra cinéma (`cine`), plafond/murs pendant les cinématiques. Garde-fous anti-écran noir.

## Reste à faire
À valider avec Ted :
- [ ] Stade des fusions : la fusion hérite du stade le plus bas des parents (deux bases → 3 formes ; deux évoluées → naît en 2e forme ; deux finales → naît en forme ultime). Aujourd'hui toute fusion repart à la 1re forme.
- [ ] Caméra à boussole (N/S/E/O) : idée mise de côté.
- [ ] Jour 200 : aucune conséquence si dépassé.

À vérifier sur les captures :
- [ ] Cinématique Night White refaite, textures, coiffures, tenues, accessoires, visages, Dolba, Colin, Younes rasé, décor sombre, forme ultime, brume, Pigeolet.

Dettes connues :
- [ ] Aperçu 2D du menu de personnalisation sans les nouvelles coiffures.
- [ ] PDF de présentation dépassé ; feuille de suivi pas à jour.

Suite du jeu :
- [ ] Fin du chapitre 3 puis chapitre 4+ ; retour de Snow et Luciole (secret de Luciole chez les Pirates).
- [ ] Nouvelles villes (Liègenoir, Anversaille…), arènes, médailles, Ligue d'Ardenval, plus de Lumons sauvages.
- [ ] APK Android via GitHub Actions ; autres cinématiques ; DA encore plus mature.
