# Lumons – État du projet et suite (28 novembre 2026, version 2.0 : le jeu complet)

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
5. Retour à Ixellette : la Prof reçoit médaille + Lumisphère et débloque le Fusionneur ; la brume se lève, Route 2 ouverte. Objectif : Bruxellia avant le Jour 25 (le soir du Jour 25, « Nuit Mauve » : les embuscades reviennent).
6. Night White d'Ixellette (1re entrée) : cinématique Younes et Fifi ; blague « Nour est le grand frère, appelle-le Monsieur Nour ».
7. Route 2 : bagarre Kétosaures contre Pirates ; enveloppe d'argent sale pour le Commissaire Lemaire.
8. Bruxellia : Alias l'avocat ; test d'embauche chez Nour (« Monsieur Nour ») ; colis de Cisoa pour Amin.
9. Route 3 : un Pigeolet royal vole le colis et se pose sur la Rolls Ghost d'Alex (combat) ; Captain, chef des Pirates.
10. Jourdanfritte : Amin révèle qu'il est le GRAND frère ; appel vidéo « Night White Family » ; pari perdu, Younes rasé par Fifi ; période d'essai (3 services), fin du chapitre 3.
11. Chapitre 4 : PC Wagner d'Alex, Route 4 et l'éclusier, secret de Luciole (Captain est son père), Anversaille, arène de Marieke, grue du port, Snow s'enfuit vers Liègenoir.
12. Chapitre 5 : Liègenoir dans le smog, Samira, arène de Lambert, Cokerie, Montagne de Bueren et Lil Perron, le Baron arrêté. Snow donne rendez-vous à Namuroc.
13. Chapitre 6 (`histoire/chapitre6.js`) : Route 6 le long de la Meuse (agent Verhaegen, comptes du Baron -> Compagnie Grognon), Givrâle en manque sous le viaduc (l'aider change tout), Namuroc (appel d'Alex : factures si réglo, carnet de livraisons si combines), joute d'échasses + arène de Théo (Vol, Médaille Citadelle), téléphérique, Snow à la Citadelle (il arrête la Poudre si Givrâle a été aidé, sinon combat), herses des souterrains, Hector Grognon arrêté. Révélation : la Prof a travaillé à la Fondation Ardenne.
14. Chapitre 7 (`histoire/chapitre7.js`) : Route 7 enneigée (Captain selon la voie de Luciole, marcassin piégé par la Fondation), Bastognac (la Noix, « Nuts ! »), arène d'Hélène Noiset (Plante, Médaille Sapin, laissez-passer), Fondation Ardenne (code 1407, cages), la Docteure Isaure Delcourt et le Prototype zéro (Prismalis rejoint l'équipe). Snow vient aider s'il est clean, déclaration de Luciole si ♥10. Teaser : les actionnaires sont à Gandoux, pour la Ligue.
15. Chapitre 8 (`histoire/chapitre8.js`) : Route 8 (l'agent : Gravenholding appartient au Président de la Ligue ; Alex donne une invitation au Gala, vraie si réglo, fausse si combines -> le portier se méfie), Gandoux, la Comtesse Mathilde (Spectre, Médaille Gravensteen), le Gala, le coffre derrière un tableau, Brutus, le Registre et le panneau volé des « Juges intègres » (rendu à la cathédrale : Agnelys). Le Président ne peut tomber que battu à la Ligue (article premier).
16. Chapitre 9 (`histoire/chapitre9.js`) : Route 9 (Luciole rentre au port de son père), Côte du Nord, pêche à la crevette à cheval (mini-jeu, Crevetin), Jef (Électrik, Médaille Éolienne), Captain et Luciole réconciliés, le cargo « Northern Star » (Lumons traités à l'Éclat pour l'équipe du Champion), Visser, les bons de livraison.
17. Chapitre 10 (`histoire/chapitre10.js`) : Nour est le maître de l'arène de Bruxellia (Feu, Médaille Manneken), Dolba tient sa promesse de la Route 2, le Conseil des Quatre (Sœur Godelieve, Ronny le mari de Ginette, Madame Ingrid, le Masque neveu de Lambert), le Président-Champion et ses Lumons traités, son arrestation, le titre de Champion, l'épilogue à Ixellette, le générique. Ensuite : objectif Lumidex.

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
- Couveuses reliées : une dans chaque Maison des Lumons et au labo, partagées avec celle du Ranch (`buildCouveuses`, `couveuseMaison` dans `world/ranch.js`).
- Œufs, sexes, Pension de Mamie Rose ; Ranch du Pays de Herve (Route 5, sud : 2 enclos, couveuse, nid du jour, boutique, éclosion ×2) ; œufs donnés dans le chapitre 5 (Samira, Cokerie).
- Liens (`systemes/liens.js`) : Luciole (tendre / complice / froide) et Alex (réglo / combines). Cadeaux différents selon la voie à ♥3, ♥6, ♥10 ; menu « Liens ». Luciole peut finir en couple ou meilleure amie, ou partir si on est trop froid. Sources : choix des chapitres 2 à 5, discussion du jour au garage, balades au Ranch.
- Flipper Lumons au Smile and Eat (`systemes/flipper.js` + dossier `game/flipper/`, voir `game/flipper/LISEZMOI.md`) : le flipper de High & Rouillé, billes Lumisphères, captures de Lumons et d'œufs, Tour du Légendaire.
- Monde : jour/nuit (40 min), météo, ciel nuageux, textures, monture, carte du monde, embuscades cachées.
- Night White (test, essai, 3 mini-jeux), friteries, boutiques, quêtes Danny, Rudy, enveloppe.
- Sac par poches, relâcher un Lumon, volumes musique/bruitages (bruitages 15 % par défaut), journal, 21 succès, mode test.
- Caméra cinéma (`cine`), plafond/murs pendant les cinématiques. Garde-fous anti-écran noir.

## Reste à faire
Fait (novembre 2026) : lots 1 à 6 (`docs/PROMPT-LOT2.md`) et lot 3 + chapitre 4 (`docs/PROMPT-LOT3.md`). Voir `docs/CHANGELOG.md` Lot 4 (chapitre 5), lot 5 (liens, Ranch) et lot 6 (flipper) le 26 novembre.

**Les 10 villes** : Ixellette, Charleroc, Bruxellia, Jourdanfritte, Anversaille, Liègenoir, Namuroc, Bastognac, Gandoux, Côte du Nord : toutes faites.
Entre chaque route et chaque ville : petit scénario, énigmes, quêtes, mini-jeux.

À vérifier avec de vraies mains : flipper au doigt (vitesse sur téléphone, 3 Lumisphères la partie, fréquence des captures), équilibrage (test de Nour 18 pts, Snow en duo, économie, Smogule de Lambert immunisé aux attaques Normal de Laïka), son, manette Bluetooth, lisibilité du duo sur téléphone (bouton « Combat 2 contre 2 aléatoire » du mode test), mini-jeux de l'escalier et du rap au doigt. Lot 5 : rythme des cœurs (assez de choix pour atteindre ♥10 ?), lisibilité du Ranch et des Lumons des enclos, puissance des cadeaux (Ruber, Fromage, Pendentif).

Chapitres 6 et 7 (v1.1), à vérifier avec de vraies mains : la joute d'échasses au doigt (15 s, assez dure ?), la lisibilité de la neige, les niveaux (dresseurs 32-40, Théo 35-37, Grognon 38-40, Hélène 39-42, la Directrice 43-45), le code de la Fondation (assez d'indices ?).

Chapitres 8 à 10 (v2.0), à vérifier avec de vraies mains : la difficulté de la Ligue (Conseil 53-57, Champion 56-58 avec Lumons traités), la pêche à la crevette au doigt, la lisibilité du générique, le rythme de la fin (épilogue).

À préparer / à jouer plus tard :
- [x] Chapitre 5 : Liègenoir (lot 4). Fin : Snow, libéré du Baron, donne rendez-vous à Namuroc (chapitre 6).
- [x] Chapitres 6 et 7 (v1.1) : l'histoire réagit aux liens (voie d'Alex : factures / carnet ; Luciole : couple, cœur, complice, distante ; Captain).
- [x] Chapitres 8 à 10 (v2.0) : Gandoux, la Côte du Nord, la Ligue d'Ardenval, la fin. `trameHistoire()` est toujours inutilisée (remplacée par `lienVoie('alex')`).
- [x] Les 8 médailles (Terril, Diamant, Perron, Citadelle, Sapin, Gravensteen, Éolienne, Manneken) et la Ligue d'Ardenval.
- [ ] Idées pour la suite : revanches de la Ligue après le titre, Lumons légendaires de l'après-jeu, combats en ligne avec des amis.
- [ ] APK Android, PDF de présentation et feuille de suivi.
