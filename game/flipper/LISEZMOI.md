# Flipper Lumons (Smile and Eat de Jalal, Jourdanfritte)

C'est le flipper de *High & Rouillé* (9 tables, ponts, rampes, radar, chasses, tour, multibille, écran à points, musique), repris de l'export `flipper-high-rouille.zip` puis adapté à Lumons.

## Comment il s'ouvre
- La borne est dans le coin en haut à droite du Smile and Eat (case 9,1). Elle est construite par `buildFlipper()` dans `js/systemes/flipper.js`.
- `flipBorne()` fait parler Jalal, puis `flipperOpen()` ouvre `flipper/index.html` dans une iframe en plein écran.
- Pendant la partie, la boucle du jeu est en pause (`FLIP.on`) et la musique de la ville est coupée.
- Le flipper parle au jeu par `window.parent.LUMPIN` (même origine), c'est-à-dire `HOST` dans `js/00_shim.js`. Ouvert seul, il tourne en démo.
- La progression du flipper (`S.arc` dans l'iframe) est rangée dans la sauvegarde du jeu, dans `S.flipper.arc`.

## Ce qui change par rapport à High & Rouillé
- **Billes** : ce sont des Lumisphères (`lumiBallTex`), elles roulent. Une partie coûte 3 Lumisphères. La première est offerte.
- **Chasses** : la médaille montre un Lumon sauvage (image du Lumidex, `monIcon`) ou un œuf (1 chance sur 4). Frappé assez de fois, il est vraiment capturé :
  - le Lumon va dans l'équipe ou au PC ;
  - l'œuf va dans le sac, sinon dans la couveuse du Ranch, sinon chez Jalal (`S.flipper.attente`, rendu à la prochaine visite).
- **Raretés** (`flipEspece`) :

  | Rareté | Ce qu'on attrape |
  |---|---|
  | 0 | Gaufrelin, Pigeolet, Hannetonne |
  | 1 | Terrilou, Scorion, Ratoir |
  | 2 | Smogule, Cokelin, Tchantchou |
  | 3 | Chicorin, Charbonnet, Moulinet |
  | 4 | un starter |
  | 5 | un starter, 1 stat parfaite |
  | 6 | un rare ou un starter, chromatique, 1 stat parfaite |

  - Une chasse « d'arcade » donne 2 stats parfaites.
  - Le niveau est celui du meilleur Lumon de l'équipe, moins 5 à 8.
  - Jamais de Lucinelle : elle ne naît que de l'œuf de Luciole.
- **Équilibrage (v1.0)** : 3 vraies captures par jour de jeu (`FLIP_JOUR`). Ensuite, le Lumon est relâché et on garde les points. Le compteur est affiché en haut du flipper (`HOST.quota`).
- **Tour du Légendaire** (table 9, l'ancienne Rolls-Royce) : un grand œuf trône sur la tour. Avec 3 billes dans la tour, le Légendaire sort : un starter chromatique avec 4 stats parfaites. Il dort ensuite 5 jours de jeu (`FLIP_LEG_J`) ; pendant ce temps, la tour libère un starter normal.
- **Paliers de score** : 12 000 points donnent un œuf rare, 40 000 un œuf épique, 100 000 un œuf mythique (starter chromatique, 3 stats parfaites). Chaque palier ne se gagne qu'une fois.
- **Tickets** : Jalal les rachète, 1 € les 5.
- **Noms** :
  - tables : Smile and Eat, Night White, Sources de Spa, Terrils, Métro Bruxellia, Cosmos, Route 5, Anneau Néon, Tour du Légendaire ;
  - la soucoupe GARAGE s'appelle maintenant NID ;
  - les rivaux sont Jalal, Alex, Luciole, Amin et Danny.

## Fichiers
| Fichier | Rôle |
|---|---|
| `index.html`, `pinball.css` | Page du flipper (iframe) |
| `js/00_shim.js` | Remplace le reste de High & Rouillé ; `HOST` = le jeu (ou l'hôte de démo) |
| `js/01_arcade.js` … `js/07_xp.js` | Code du flipper de High & Rouillé. Les modifications Lumons sont marquées par `lumPick`, `lumFaceTex`, `lumImg`, `lumiBallTex`, `lumEgg3d`, `lumHud`, `lumEur` et par les nouveaux textes |
| `js/08_lumons.js` | Habillage Lumons : médailles, bille Lumisphère, œuf de la tour |
| `js/09_hooks.js` | Paiement en Lumisphères, captures, paliers, tickets, fermeture |

Tests : `python tools/test_flipper.py` (logique, sans 3D) et `python tools/vrai3d.py flipper <dossier>` (captures en vrai rendu 3D).
