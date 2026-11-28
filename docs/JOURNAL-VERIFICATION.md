# Journal de vérification — versions 1.0, 1.1 et 2.0 (nuit du 28 novembre 2026)

Tout ce qui a été trouvé pendant le check-up complet du jeu (chapitres 1 à 5, flipper), et ce qui en a été fait.
Légende : **corrigé** · **réglé** (choix d'équilibrage) · **noté** (pas un bug, ou à voir avec de vraies mains).

## Comment le jeu a été passé au peigne fin
- **Tous les tests existants** relancés : partie complète, histoire, chapitres 4 et 5, combats, liens/Ranch, flipper, confort.
- **Nouvel audit des données** (`tools/test_audit.py`) :
  - les 31 espèces : types, stats, évolutions, attaques apprises, Lumidex, étymologies, modèles 3D ;
  - les 36 attaques : type, précision, PP, effet visuel ;
  - tous les objets : nom, description, icône, poche du sac ;
  - toutes les espèces et tous les objets écrits en dur dans le code ;
  - tous les dresseurs : équipe, récompense ;
  - les textes d'objectif à chaque étape de l'histoire ;
  - **les 65 arrivées sur une carte** : pas d'arrivée dans un mur, et une sortie toujours atteignable (anti-blocage).
- **Nouveau « bot bavard »** (`tools/test_bavard.py`) : il parle à **tous les PNJ** et lit **tous les panneaux** de toutes les cartes, à trois moments de l'histoire (début, fin du chapitre 3, fin du chapitre 5). Il a fait **774 interactions** et relève les erreurs JavaScript, les blocages et les textes cassés (« undefined », « NaN »…).
- **Tour en vrai rendu 3D** (`tools/vrai3d.py tour`) des 12 lieux de la carte du monde : aucune erreur.

## Bugs et incohérences trouvés

| # | Où | Problème | Gravité | Ce qui a été fait |
|---|---|---|---|---|
| 1 | Flipper | **Lucinelle se capturait au flipper**, alors que le Lumidex dit qu'elle « ne naît que d'un œuf confié par quelqu'un qui te fait vraiment confiance » (Luciole). L'œuf mythique des 100 000 points était aussi une Lucinelle chromatique. | Incohérence d'histoire | **Corrigé** : plus de Lucinelle au flipper. À la place : des starters (rareté 4-5) et un chromatique rare (rareté 6). |
| 2 | Flipper | **Trop généreux** : la rareté 4 (environ 1 chasse sur 15 à 20) donnait un **chromatique**. Les captures « d'arcade » avaient 3 stats parfaites et le Légendaire (chromatique, 4 stats parfaites) ressortait **à chaque fois** qu'on mettait 3 billes dans la tour. Aucune limite de captures. Le flipper devenait la meilleure façon d'avoir des chromatiques et des Lumons parfaits. | Équilibrage | **Réglé**, voir plus bas. |
| 3 | Lumidex | Les 6 Lumons de Liègenoir (Ratoir, Perronrat, Tchantchou, Smogule, Lucinelle, Cokelin) n'avaient **pas de « D'où vient son nom ? »** dans le Lumidex. Les 21 autres l'avaient. | Contenu manquant | **Corrigé** : 6 étymologies écrites (le Perron, Tchantchès, le smog, Luciole…). |
| 4 | Combat | Quand ton Lumon tombe K.O., le choix du suivant ne vérifiait pas la réponse. Une réponse vide (fermeture forcée de la liste) faisait **planter le combat** (écran figé). Un joueur ne peut normalement pas fermer cette liste. Le bot, lui, l'a fait. | Plantage possible | **Corrigé** : la liste se rouvre tant qu'aucun Lumon valide n'est choisi. |
| 5 | Outils | `tools/test.py` plantait sous Windows (caractère ★ dans la console). `tools/test_flipper.py` plantait quand un texte était coupé au milieu d'un emoji. | Outils de test | **Corrigé**. |
| 6 | Doc | `ETAT-DU-PROJET.md` disait « Bruxellia avant le Jour 200 ». Dans le jeu, c'est **le Jour 25** (Younes, la Prof et l'objectif sont d'accord entre eux). | Doc périmée | **Corrigé** (doc). |
| 7 | Code | `ketoRandom()` (Kétosaures qui surgissent au hasard sur la Route 1) n'est **plus jamais appelée** : les embuscades cachées l'ont remplacée. Idem `nwIxCineOld()` et `trameHistoire()`. | Code mort, sans effet | **Noté** (inoffensif). `trameHistoire` est remplacée par la voie d'Alex dans le chapitre 6. |
| 8 | Lumidex | Les formes évoluées des Lumons des boss (Noctilumière, Sambrazor, Givrâlpha, Krakamiral) ne sont pas dans le Lumidex. C'est voulu : on ne peut pas les capturer. | — | **Noté**. |
| 9 | Combat | Un Lumon qui ne connaît que des attaques Normal ne peut pas toucher Smogule (Spectre). Le bot y est resté coincé longtemps. Un joueur change d'attaque ou de Lumon. | — | **Noté** (déjà dans la liste « à vérifier » : Smogule de Lambert). |

**Ce que le bot n'a pas trouvé** (bonne nouvelle) :
- aucune erreur JavaScript en parlant à tout le monde, à aucun moment de l'histoire (hors bug n° 4) ;
- aucun texte cassé (« undefined », « NaN ») ;
- aucune arrivée de carte dans un mur ou sans sortie ;
- aucune espèce, attaque ou objet manquant.

## Nouvel équilibrage du flipper
Le but : que le flipper reste **un plaisir à côté de l'aventure**, pas la meilleure façon de progresser.
- **3 vraies captures par jour de jeu**. Un jour de jeu dure 40 minutes. Ensuite, les Lumons tapés « retournent dans la machine » : on garde les points et les tickets, mais pas le Lumon. Le compteur « 🎯 Captures du jour : x/3 » est affiché en haut du flipper. Jalal l'explique.
- **Le Légendaire de la tour dort 5 jours** (environ 3 h 20 de jeu) après chaque sortie. Pendant ce temps, la tour libère un starter normal, avec 1 stat parfaite.
- **Les Lumons attrapés ont 5 à 8 niveaux de moins que ton meilleur Lumon** (avant : 1 à 4). Il faut les entraîner.
- **Les chromatiques** ne sortent plus qu'en Ultra rare (rareté 6, environ 1 chasse sur 300) et avec le Légendaire.
- Les captures « d'arcade » ont **2 stats parfaites** (avant : 3).
- Ce qui ne change pas :
  - la 1ʳᵉ partie est offerte, puis 3 Lumisphères (24 €) la partie ;
  - les tickets rapportent au plus 20 € par partie, donc le flipper ne fait **pas gagner d'argent**.

## À vérifier avec de vraies mains (pas vérifiable par les bots)
- Flipper au doigt sur téléphone : vitesse, taille des flippers, lisibilité du compteur de captures.
- Son et musique, manette Bluetooth.
- Rythme réel du jeu : 3 captures par jour au flipper, est-ce que ça donne encore envie d'y revenir ?

## Version 1.1 : chapitres 6 et 7
Écrits cette nuit, puis passés aux mêmes contrôles que le reste du jeu.
- **`tools/test_chapitre6.py`** joue les deux chapitres de bout en bout, en **35 vérifications** :
  - Route 6, Givrâle, Namuroc, l'appel d'Alex ;
  - la joute d'échasses (jouée par un bot), Théo, le téléphérique, Snow ;
  - les herses (mauvais ordre puis bon ordre), Grognon ;
  - Route 7, Captain, le piège, Bastognac, Hélène, le code de la Fondation (faux puis juste), la Directrice, Prismalis ;
  - les défaites (Maison des Lumons la plus proche), la carte du monde, la sauvegarde.
- **Audit** : 40 espèces, 41 attaques, 49 objets, 44 cartes, 21 dresseurs, **88 arrivées de cartes** vérifiées (aucune dans un mur, toujours une sortie).
- **Bot bavard** : il parle aussi à tous les PNJ à la fin du chapitre 7.
- **Captures en vrai 3D** des 17 nouveaux lieux (`tools/vrai3d.py ch67`) : aucune erreur.

| # | Où | Problème trouvé pendant l'écriture | Ce qui a été fait |
|---|---|---|---|
| 10 | Bastognac, Route 7 | Le sol « neige » réutilisait le carrelage des intérieurs : en vrai 3D, la neige ressemblait à un carrelage mauve. | **Corrigé** : nouvelle case de neige (`'S'`) avec sa propre texture blanche. |
| 11 | Namuroc, Citadelle, Bastognac | Panneaux (escargots, téléphérique, la Noix) posés une case à côté de l'objet : on ne pouvait pas les lire. | **Corrigé** avant publication (vérifié par le bot bavard). |
| 12 | Fondation | Les indices du code étaient derrière la porte qu'ils servent à ouvrir. | **Corrigé** : ils sont sur la cloison et le bureau de l'entrée. |
| 13 | Chapitre 5 | L'objectif de fin disait « La suite bientôt ». | **Corrigé** : il mène maintenant à la Route 6. |

## Ranch et couveuses (vérification demandée par Ted)
- Le Ranch était déjà couvert par `tools/test_lot5.py` (enclos, couveuse, nid du jour, boutique, éclosion ×2, 41 vérifications) et par le bot bavard (tous les panneaux et PNJ du Ranch et de la ferme). J'ai relu tout le code du Ranch en plus.

| # | Où | Problème | Gravité | Ce qui a été fait |
|---|---|---|---|---|
| 14 | Ranch (enclos) et Pension de Mamie Rose | **On pouvait confier Laïka** à un enclos ou à la Pension. Elle quittait alors l'équipe : plus de monture, plus de caresses, et elle disparaissait des scènes où elle compte. Le PC, lui, l'interdisait déjà. | Bug | **Corrigé** : Laïka est grisée dans les deux listes. Une ancienne sauvegarde où elle est restée dans un enclos ou à la Pension la ramène en tête d'équipe au chargement. |

**Nouveau : une couveuse partout.** Il y en a une dans chacune des 7 Maisons des Lumons et dans le labo de la Prof. Elles sont toutes **reliées à la couveuse du Ranch**, comme le PC : on dépose un œuf à Charleroc, on le reprend (ou on le fait éclore) à Bastognac. Il y a 4 places, les œufs avancent à chaque pas, et les œufs déposés se voient sous le dôme de chaque couveuse. À la première utilisation, l'infirmière (ou la Prof) explique le principe.
Test : `tools/test_ranch.py` (12 vérifications).

## Version 2.0 : chapitres 8 à 10, le jeu complet
- **`tools/test_fin.py`** joue la fin du jeu de bout en bout, en **36 vérifications** :
  - Route 8, Gandoux, la Comtesse, le Gala, le coffre, Brutus, le panneau rendu (Agnelys) ;
  - Route 9, la Côte, la pêche à la crevette (jouée par un bot), Jef, Captain, le cargo, Visser ;
  - Nour, Dolba, le Conseil des Quatre (grilles), le Président-Champion, l'épilogue, le générique, l'après-jeu, la sauvegarde.
- **Audit** : 50 espèces, 44 attaques, 53 objets, 55 cartes, 28 dresseurs, **114 arrivées de cartes** vérifiées.
- **Bot bavard** : il parle à tous les PNJ à la fin du chapitre 7 et après la Ligue.
- **Captures en vrai 3D** des 16 nouveaux lieux et du générique (`tools/vrai3d.py fin`).

| # | Où | Problème trouvé pendant l'écriture | Ce qui a été fait |
|---|---|---|---|
| 15 | Ligue, Champion | Le combat du Champion utilisait une fonction (`dope`) qui n'existe que dans la scène du Baron : **le combat final ne se lançait pas**. Le test de la fin l'a vu tout de suite. | **Corrigé** : le Champion a sa propre fonction (Lumons « traités à l'Éclat », un peu moins forts que ceux du Baron, pour rester juste). |
| 16 | Écran titre, succès | Une apostrophe mal échappée (« l'aventure », « d'Ardenval ») cassait le chargement du jeu. | **Corrigé** avant publication (vu par l'audit). |
| 17 | Arène de Jef | Les éoliennes de la salle étaient à la taille de celles de la mer : elles traversaient tout l'écran. | **Corrigé** : réduites (vu en vrai 3D). |
| 18 | Tests | Le pilote automatique des tests joue toujours la 1ʳᵉ attaque : il perdait contre le Masque (Spectre) et le Président, même avec une équipe niveau 68. | **Noté** : ce n'est pas un bug du jeu (un joueur choisit ses attaques). Les tests rangent les attaques de la plus forte à la plus faible et retentent une fois après une défaite. |
