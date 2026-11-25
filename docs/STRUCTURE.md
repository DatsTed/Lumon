# Structure du projet Lumons

À lire en premier à chaque demande, puis n'ouvrir que les fichiers concernés.

## Principes
- Scripts classiques (pas de modules ES) : toutes les variables de premier niveau sont globales et partagées.
- **L'ordre des balises `<script>` de `game/index.html` remplace les imports.** Un fichier peut utiliser à son chargement
  ce que déclarent les fichiers *précédents* ; dans le corps d'une fonction, il peut utiliser n'importe quoi.
- Nouveau fichier JS : l'ajouter dans `game/index.html`, puis `python tools/build.py` (met à jour `sw.js`), puis `python tools/structure.py`.
- `tools/build.py` → `dist/index.html` (fichier unique, pour un artefact ou une comparaison).
- `tools/test_confort.py` (manette, ordre des attaques, téléport) et `tools/test_histoire.py` (scènes du lot 2, défaites, test de Nour).
- `tools/test.py` → test automatique (Playwright, faux Three.js). `--ancien git:<commit>` compare avec une ancienne version.
- Sauvegarde : localStorage `lumons_save` (version 5), options `lumons_opt`. Ne pas casser la compatibilité.
- Publication : push sur `main` → GitHub Actions publie `game/` sur GitHub Pages (cache du service worker renouvelé).

## Arborescence
```
game/            le jeu publié tel quel (index.html, css/, js/, manifest, icônes, sw.js)
  js/core/       moteur, audio, entrées, interface, sauvegarde, menus, boucle
  js/data/       données pures : types, attaques, espèces, objets, personnages, musiques, succès, icônes
  js/models/     modèles 3D et portraits 2D
  js/world/      terrain, une carte par fichier, entités, interactions, carte du monde
  js/combat/     combat, IA, effets visuels
  js/systemes/   fusion, évolution, œufs, Night White, monture, jour/nuit, embuscades, cinéma, Lumidex, mode test
  js/histoire/   objectifs, prologue, chapitres 1 à 3, cinématiques
tools/           build.py, test.py, structure.py
docs/            STRUCTURE.md (ce fichier), CHANGELOG.md, ETAT-DU-PROJET.md
```

## Fichiers (dans l'ordre de chargement)

| Fichier | Ko | Rôle | Déclare |
| --- | --- | --- | --- |
| `css/style.css` | 20.6 | Toute la mise en page (HUD, dialogues, menus, overlays, combat). |  |
| `js/core/base.js` | 0.7 | Raccourcis globaux ($, sleep, V, PI, rnd), état de partie `S`, drapeaux `F()`, options `OPT` (clé lumons_opt). | `$`, `sleep`, `V`, `S`, `F`, `OPT`, `saveOpt` |
| `js/data/musiques.js` | 2.5 | Partitions `SONGS` (une entrée par musique). | `SONGS` |
| `js/core/audio.js` | 4.3 | Synthé WebAudio : musiques, ambiances, bruitages, volumes, fanfare, bouton muet. | `AC`, `song`, `mf`, `audioInit`, `applyVol`, `tone`, `NOISE`, `noiseBuf`, `drum`, `sched`, `AMB`, `ambInit`, `ambUpdate`, `fanfare`, `setSong`, `sfx`, `blip` |
| `js/data/personnages.js` | 4.4 | `CH` : apparences de tous les personnages (peau, cheveux, tenues…). | `CH` |
| `js/models/portraits2d.js` | 9.0 | Portraits 2D en SVG (chibi) pour l'intro et les menus, `STARTER_SVG`. | `svgURI`, `chibi`, `STARTER_SVG` |
| `js/data/types.js` | 1.1 | 12 types, table d'efficacité `CHART`, `effOf`. | `TC`, `CHART`, `effOf` |
| `js/data/attaques.js` | 2.3 | `MV` : toutes les capacités. | `MV` |
| `js/data/especes.js` | 12.0 | `SP` : espèces de Lumons (stats, évolutions, lore), `ETY` étymologies, `DEX`, `STARTERS`, `CRY`. | `L_LAIKA`, `L_CHIC`, `L_CHAR`, `L_MOUL`, `SP`, `DEX_UNIQ`, `DEX`, `ETY`, `STARTERS`, `CRY` |
| `js/data/objets.js` | 3.7 | `ITEMS` (objets) + utilisation : `healAll`, `canUse`, `applyItem`. | `ITEMS`, `healAll`, `canUse`, `applyItem` |
| `js/data/icones.js` | 12.3 | Icônes dessinées à la main (`ICON`, `ico`). | `ICON`, `gem`, `ico` |
| `js/systemes/lumons.js` | 3.4 | Création et stats des Lumons : `mkMon`, `calc`, natures, sexe, gènes, soins (`healMachine`). | `critRate`, `NAT`, `STATN`, `genderOf`, `GSYM`, `ensureGenes`, `calc`, `calcOld`, `mkMon`, `nm`, `alive`, `healJingle`, `healFx`, `healMachine` |
| `js/data/succes.js` | 1.7 | 20 succès `ACH`, `unlock`, `checkAch`. | `ACH`, `unlock`, `checkAch` |
| `js/systemes/journal.js` | 2.4 | Astuces (`hintT`) et journal. | `hintT`, `tip`, `journal` |
| `js/core/moteur.js` | 7.3 | Three.js : renderer, scène, caméra, soleil, matériaux toon, aides `add`/`box`/`plane`, `ANIMS`. | `renderer`, `scene`, `SKYD`, `camera`, `OFF`, `sun`, `resize`, `GRAD`, `TM`, `shade`, `SURF`, `surfTex`, `tmat`, `OUTM`, `SPH`, `tp`, `olMesh`, `add`, `box`, `labelTex`, `plane`, `ANIMS` |
| `js/models/humains.js` | 9.0 | `human()` : modèle 3D des humains (coiffures, tenues, accessoires). | `human` |
| `js/models/lumons3d.js` | 16.5 | `MODELS` : modèles 3D des Lumons, `MSCALE`, `monModel`. | `eyes`, `leaf`, `MODELS`, `MSCALE`, `monModel`, `disposeModel` |
| `js/world/entites.js` | 4.9 | Classe des personnages (`Char`), joueur, PNJ (`npc`), déplacements, `gotoMap`, compagnon. | `YAW`, `GEO_SH`, `MAT_SH`, `Char`, `player`, `TRAIL`, `trailPush`, `blockedAt`, `camTarget`, `DV`, `NPC`, `npc`, `walkable`, `dirTo`, `moveTo`, `gotoMap`, `refreshFollower`, `_refreshFollower` |
| `js/world/terrain.js` | 12.5 | `makeMap`, grilles, textures de sol, `terrain`, panneaux/objets au sol, aides `centreRoom`, `wildNight`, `treesRim`. | `makeMap`, `MAPS`, `setSolid`, `solidRect`, `grid`, `rect`, `pathLine`, `ellipse`, `TILEG`, `TEXC`, `hsh`, `groundTex`, `GTEX`, `GCOL`, `terrain`, `sg`, `item`, `centreRoom`, `wildNight`, `treesRim` |
| `js/models/decor.js` | 8.3 | Décor 3D : maisons, bâtiments, labo, beffroi, fontaine, friterie, terril, arche, pièces (`room`). | `house`, `bigBuilding`, `labExt`, `belfry`, `fountain`, `friterie`, `lamp`, `signPost`, `arch`, `arrows`, `terril`, `headframe`, `room` |
| `js/systemes/cinema.js` | 1.9 | Caméra cinéma : `CINE`, `cineOn`/`cineOff`, `camShot`, `track`. | `CINE`, `cineShell`, `cineOn`, `cineOff`, `camShot`, `track` |
| `js/systemes/nightwhite.js` | 20.2 | Night White : façade, boutique, personnel, salle (`nwRoom`), service/mini-jeux (`nwJob`), test d'embauche + entretien (`nwInterview`, `NW_ITW`). | `nwLogoTex`, `NWLOGO`, `nwLogo`, `nightWhiteExt`, `NWSHOP`, `YOUNES_POST`, `talkColinNW`, `talkFifi`, `NWSTAFF`, `nwShopMenu`, `nwRoom`, `nwJob`, `NW_ITW`, `nwInterview` |
| `js/histoire/cinematiques.js` | 10.9 | Cinématiques Night White : Younes et Fifi (`nwIxCine`), Younes rasé, révélation d'Amin. | `nwIxCine`, `nwIxCineOld`, `younesBaldScene`, `amineReveal` |
| `js/world/ixellette.js` | 6.7 | Carte d'Ixellette (`buildIxellette`) et ses PNJ (`placePNJIxellette`). | `buildIxellette`, `placePNJIxellette` |
| `js/world/interieurs.js` | 6.8 | Intérieurs : labo (`buildLabo`), centres/boutique de Charleroc, Night White, boutique, arène de Ginette. | `buildLabo`, `buildInterieursCharleroc`, `buildInterieursFin` |
| `js/world/route1.js` | 5.2 | Carte de la Route 1. | `buildRoute1` |
| `js/world/charleroc.js` | 7.5 | Carte de Charleroc. | `buildCharleroc` |
| `js/world/route2.js` | 2.9 | Carte de la Route 2. | `buildRoute2` |
| `js/world/bruxellia.js` | 2.9 | Carte de Bruxellia. | `buildBruxellia` |
| `js/world/route3.js` | 4.8 | Carte de la Route 3 (+ garage d'Alex). | `buildRoute3` |
| `js/world/jourdanfritte.js` | 1.8 | Carte de Jourdanfritte. | `buildJourdanfritte` |
| `js/world/arene.js` | 4.0 | Arène de combat et galerie 3D (`ARENA`, `GAL`). | `buildArene` |
| `js/world/monde.js` | 3.0 | Variables des cartes (TOWN, LAB…), `buildWorld` (appelle chaque carte dans l'ordre), `goMap`, `refreshNPCs`, centre de soin après défaite (`RESPAWN`, `respawnCentre`). | `TOWN`, `buildWorld`, `goMap`, `refreshNPCs`, `RESPAWN`, `respawnCentre` |
| `js/core/ui.js` | 4.9 | Dialogues (`say`, `choose`, `msg`), overlays (`show`/`hide`), fondus, bannière, listes, icônes d'équipe, `toast`, `give`. | `dlgResolve`, `TSPD`, `fmt`, `say`, `msg`, `advance`, `choose`, `show`, `fadeOut`, `banner`, `setCtrl`, `dayNum`, `typH`, `hpCol`, `pickList`, `iconR`, `ICONC`, `monIcon`, `iconHTML`, `partyRow`, `toast`, `give` |
| `js/histoire/objectifs.js` | 2.0 | `objText` : la chaîne d'objectifs affichée, `setObj`. | `objText`, `setObj` |
| `js/core/save.js` | 3.2 | Sauvegarde `saveGame`/`loadGame` (lumons_save, version 5), `newGame`, `continueGame`. | `saveGame`, `loadGame`, `newGame`, `continueGame` |
| `js/core/menus.js` | 16.9 | Menu du monde, sac par poches, options/volumes, soins, boutiques, fiche de Lumon (`statScreen`). | `FOOD`, `POCKETS`, `pocketOf`, `bagTab`, `bagScreen`, `openMenu`, `volumePanel`, `optionsMenu`, `nurseHeal`, `shopMenu`, `ivGrade`, `statScreen` |
| `js/systemes/lumidex.js` | 3.8 | Galerie/visionneuse 3D, Lumidex et sa voix (synthèse vocale). | `galModel`, `galOpen`, `mscale`, `viewSpecies`, `closeView`, `galList`, `dexVoice`, `frVoices`, `voiceLabel`, `pickVoice`, `hushDex`, `speakDex`, `etyOf`, `gallery` |
| `js/core/input.js` | 3.0 | Clavier, croix, joystick, bouton A, `runScript`. | `held`, `lastDir`, `KM`, `joyVec`, `kRun`, `inputVec`, `inputDir`, `pressA`, `runScript` |
| `js/core/manette.js` | 4.2 | Manette (Gamepad API) : déplacement, A/B, Start = menu, Select = carte, navigation dans les menus. | `padVec` |
| `js/systemes/monture.js` | 2.4 | Monture (Laïka) : `toggleRide`, `rideTick`, caresser Laïka. | `riding`, `SEAT`, `canRide`, `toggleRide`, `rideTick`, `petLaika` |
| `js/world/interactions.js` | 4.1 | Compagnon, `interact`, pas (`onStepped`), dresseurs, rencontres sauvages, PNJ temporaires. | `laika`, `FOLD`, `addFr`, `interact`, `onStepped`, `trainerSpot`, `shinyfy`, `wildEncounter`, `TEMPS`, `tempChar`, `killTemp`, `freeNear` |
| `js/combat/combat.js` | 23.1 | Combat : état `B`, HUD, menu, `useMove`, statuts, XP, captures, `battle`. | `B`, `tween`, `ease`, `stg`, `foeM`, `label`, `STN`, `chips`, `hud`, `camL`, `layoutArena`, `setVO`, `placeFoeHud`, `placeMon`, `popIn`, `lunge`, `shot`, `burst`, `hitFx`, `ringFx`, `faintFx`, `bMenu`, `act`, `useMove`, `applyStatus`, `endTurn`, `gainXP`, `learn` … (+6) |
| `js/combat/ia.js` | 0.6 | Choix de l'adversaire (`foeChoice`). | `foeChoice` |
| `js/combat/effets.js` | 17.0 | Effets visuels des attaques (textures, rayons, éclairs, pluie…), `sparkAt`. | `VFXT`, `vfxTex`, `TFX`, `spr`, `burstAt`, `trainerOutro`, `SHK`, `camShake`, `camGo`, `camHome`, `frontShot`, `cineAttack`, `beam`, `beamOld`, `RINGG`, `shock`, `flashScr`, `rain`, `fountainFx`, `vines`, `bolt`, `projectile`, `vfxAttack`, `hitNum`, `statusFx`, `sparkAt` |
| `js/systemes/evolution.js` | 4.2 | `checkEvos`, `evolve`, cinématique d'évolution. | `checkEvos`, `evolve`, `evolveRun` |
| `js/systemes/fusion.js` | 27.2 | Génération procédurale (`GENES`, `genModel`), `fuse`, formes/Éclats, Fusionneur, cinématique de fusion. | `GENES`, `GOPT`, `BODY`, `genModel`, `hexMix`, `geneOf`, `seedRng`, `LORE`, `ensureLore`, `fuseName`, `sanitizeSpecies`, `registerSpecies`, `fuse`, `EVO_SUF`, `evoName`, `EPIC_PRE`, `epicName`, `evolveFusionSpecies`, `FORMS`, `typesOf`, `addAura`, `fusionMachine`, `darkStage`, `fusionCine` |
| `js/systemes/apparence.js` | 6.7 | Personnalisation du héros : `LOOKS`, palettes, `pickLook`, `pickGender`, aperçu 3D `lookPreview`. | `LOOKS`, `PAL`, `lookDefaults`, `outfitOpts`, `heroLook`, `pickLook`, `rebuildHero`, `pickGender`, `lookR`, `lookPreview` |
| `js/histoire/prologue.js` | 26.6 | Prologue : narration d'ouverture, nom, Prof (`talkProf`, `profIntro`), famille, Danny, labo, starter, duel Dolba. | `talkProf`, `NARR`, `narrIdx`, `RAIN`, `silh`, `dogS`, `narrLoop`, `narrType`, `narration`, `askName`, `profIntro`, `camFly`, `flyover`, `momScene`, `talkMom`, `talkDoudoune`, `talkCat`, `talkJack`, `petModel`, `DANNY`, `talkDanny`, `talkFernand`, `talkNilsTown`, `nilsDuel`, `enterLab`, `labScene`, `exitLab`, `starterCard` … (+1) |
| `js/histoire/chapitre1.js` | 19.2 | Chapitre 1 : barrières, Kétosaures, Luciole (combat du terril), concert de MC Sambre (`sambreConcert`, `SAMBRE_RIMES`) puis battle, friterie, Rudy, Gérard (Lumisphère), Ginette. | `gerardSphere`, `gateTalk`, `ketoApproach`, `KETO_LINES`, `ketoBattle`, `ketoFirst`, `ketoRandom`, `lucioleScene`, `rapEvent`, `friteJosette`, `talkRudy`, `ginetteTalk`, `SAMBRE_RIMES`, `sambreConcert` |
| `js/histoire/chapitre2.js` | 8.6 | Chapitre 2 : Route 2 (cinématique de bagarre `r2Fight`, enveloppe, Lemaire), Alias, Smile and Eat. | `r2Scene`, `talkCop`, `aliasScene`, `aliasTalk`, `smileEat`, `r2Fight` |
| `js/histoire/chapitre3.js` | 5.0 | Chapitre 3 : Pigeolet royal, Captain. | `pigeonModel`, `pigeonSync`, `pigeonHeist`, `pigeonFight`, `captainScene` |
| `js/histoire/luciole.js` | 3.9 | Rencontres scénarisées de Luciole sans combat (`LUC_RDV` : Ixellette, Bruxellia), `placePNJLuciole`, `lucRefresh`. | `lucFree`, `LUC_RDV`, `placePNJLuciole`, `lucRefresh`, `lucLeave`, `lucFace`, `lucioleIxellette`, `lucioleBruxellia` |
| `js/systemes/oeufs.js` | 6.4 | Œufs, Pension, compatibilité, éclosion au pas. | `baseOf`, `eggSteps`, `eggHint`, `mkEgg`, `giveEgg`, `eggStory`, `talkPension`, `compat`, `compatTxt`, `breedTick`, `eggTick`, `hatch` |
| `js/systemes/embuscades.js` | 2.9 | Embuscades cachées Kétosaures / Pirates. | `AMBUSH`, `PIRATE_LINES`, `KETO_HIDE`, `ambushAt`, `ambushDecor`, `ambush` |
| `js/systemes/mode-test.js` | 1.3 | Mode test (Options). | `testMode` |
| `js/systemes/jour-nuit.js` | 3.9 | Ciel, heure (journée de 40 min), météo, `updateEnv`. | `HEMIL`, `ENV`, `SKY`, `skyAt`, `DAYLEN`, `gameT`, `dayWeather`, `updateEnv`, `envTick` |
| `js/world/carte-monde.js` | 10.2 | Mini-carte et carte du monde (+ téléportation en mode test, `WMTP`). | `MMC`, `drawMinimap`, `WMN`, `WML`, `WMTP`, `worldMap` |
| `js/world/monde-vivant.js` | 3.6 | Poussière de course, PNJ qui se baladent, bulle d'action. | `runDustT`, `DUSTM`, `runDust`, `wand`, `patrolStep`, `wanderTick`, `ACTB`, `actTex`, `actTarget`, `updActBubble` |
| `js/core/boucle.js` | 4.7 | Boucle de rendu `loop`, garde-fou anti-écran noir. | `last`, `loop`, `fgT`, `fadeGuard`, `loopB` |
| `js/main.js` | 0.8 | Démarrage : construit le monde, écran titre, boutons Nouvelle partie / Continuer / Galerie. |  |
