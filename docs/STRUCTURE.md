# Structure du projet Lumons

À lire en premier à chaque demande, puis n'ouvrir que les fichiers concernés.

## Principes
- Scripts classiques (pas de modules ES) : toutes les variables de premier niveau sont globales et partagées.
- **L'ordre des balises `<script>` de `game/index.html` remplace les imports.** Un fichier peut utiliser à son chargement
  ce que déclarent les fichiers *précédents* ; dans le corps d'une fonction, il peut utiliser n'importe quoi.
- Nouveau fichier JS : l'ajouter dans `game/index.html`, puis `python tools/build.py` (met à jour `sw.js`), puis `python tools/structure.py`.
- `tools/build.py` → `dist/index.html` (fichier unique, pour un artefact ou une comparaison).
- `tools/test_confort.py` (manette, ordre des attaques, téléport) et `tools/test_histoire.py` (scènes, essai chez Amin, défaites, test de Nour), `tools/test_combats.py` (duo, Snow, fusions), `tools/test_chapitre4.py` (lot 3 et chapitre 4).
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
| `css/style.css` | 25.2 | Toute la mise en page (HUD, dialogues, menus, overlays, combat). |  |
| `js/core/base.js` | 0.8 | Raccourcis globaux ($, sleep, V, PI, rnd), état de partie `S`, drapeaux `F()`, options `OPT` (clé lumons_opt). | `$`, `sleep`, `V`, `S`, `F`, `OPT`, `saveOpt` |
| `js/data/musiques.js` | 3.6 | Partitions `SONGS` (une entrée par musique) : dont `drame`/`celeste` (ouverture), `keto`/`ketoboss` (techno psy des Kétosaures), `lift` (ascenseur des Night White). | `SONGS` |
| `js/core/audio.js` | 5.5 | Synthé WebAudio : musiques (mélodie, basse, batterie, nappes `padTone`, basse acide `acidTone`), ambiances météo (volume à part), bruitages, fanfare, bouton muet. | `AC`, `song`, `mf`, `audioInit`, `applyVol`, `tone`, `NOISE`, `noiseBuf`, `drum`, `sched`, `padTone`, `acidTone`, `AMB`, `ambInit`, `ambUpdate`, `fanfare`, `setSong`, `sfx`, `blip` |
| `js/data/personnages.js` | 4.4 | `CH` : apparences de tous les personnages (peau, cheveux, tenues…). | `CH` |
| `js/models/portraits2d.js` | 9.0 | Portraits 2D en SVG (chibi) pour l'intro et les menus, `STARTER_SVG`. | `svgURI`, `chibi`, `STARTER_SVG` |
| `js/data/types.js` | 1.1 | 12 types, table d'efficacité `CHART`, `effOf`. | `TC`, `CHART`, `effOf` |
| `js/data/attaques.js` | 2.3 | `MV` : toutes les capacités. | `MV` |
| `js/data/especes.js` | 12.0 | `SP` : espèces de Lumons (stats, évolutions, lore), `ETY` étymologies, `DEX`, `STARTERS`, `CRY`. | `L_LAIKA`, `L_CHIC`, `L_CHAR`, `L_MOUL`, `SP`, `DEX_UNIQ`, `DEX`, `ETY`, `STARTERS`, `CRY` |
| `js/data/objets.js` | 3.8 | `ITEMS` (objets) + utilisation : `healAll`, `canUse`, `applyItem`. | `ITEMS`, `healAll`, `canUse`, `applyItem` |
| `js/data/icones.js` | 12.3 | Icônes dessinées à la main (`ICON`, `ico`). | `ICON`, `gem`, `ico` |
| `js/data/economie.js` | 5.2 | Économie réaliste (`PRIX`), Lumisphères (`BALLS`, paliers `BALL_UNLOCK`/`ballsDispo`, `ballMult`), clopes et alcool du Night White (`bst`, `useBattleBoost`). | `PRIX`, `BALLS`, `BALL_UNLOCK`, `ballsDispo`, `ballMult`, `useBattleBoost`, `eur` |
| `js/systemes/lumons.js` | 3.4 | Création et stats des Lumons : `mkMon`, `calc`, natures, sexe, gènes, soins (`healMachine`). | `critRate`, `NAT`, `STATN`, `genderOf`, `GSYM`, `ensureGenes`, `calc`, `calcOld`, `mkMon`, `nm`, `alive`, `healJingle`, `healFx`, `healMachine` |
| `js/data/succes.js` | 1.7 | 20 succès `ACH`, `unlock`, `checkAch`. | `ACH`, `unlock`, `checkAch` |
| `js/systemes/journal.js` | 2.6 | Astuces (`hintT`) et journal. | `hintT`, `tip`, `journal` |
| `js/core/moteur.js` | 7.3 | Three.js : renderer, scène, caméra, soleil, matériaux toon, aides `add`/`box`/`plane`, `ANIMS`. | `renderer`, `scene`, `SKYD`, `camera`, `OFF`, `sun`, `resize`, `GRAD`, `TM`, `shade`, `SURF`, `surfTex`, `tmat`, `OUTM`, `SPH`, `tp`, `olMesh`, `add`, `box`, `labelTex`, `plane`, `ANIMS` |
| `js/models/humains.js` | 9.0 | `human()` : modèle 3D des humains (coiffures, tenues, accessoires). | `human` |
| `js/models/lumons3d.js` | 16.5 | `MODELS` : modèles 3D des Lumons, `MSCALE`, `monModel`. | `eyes`, `leaf`, `MODELS`, `MSCALE`, `monModel`, `disposeModel` |
| `js/world/entites.js` | 4.9 | Classe des personnages (`Char`), joueur, PNJ (`npc`), déplacements, `gotoMap`, compagnon. | `YAW`, `GEO_SH`, `MAT_SH`, `Char`, `player`, `TRAIL`, `trailPush`, `blockedAt`, `camTarget`, `DV`, `NPC`, `npc`, `walkable`, `dirTo`, `moveTo`, `gotoMap`, `refreshFollower`, `_refreshFollower` |
| `js/world/terrain.js` | 12.6 | `makeMap`, grilles, textures de sol, `terrain`, panneaux/objets au sol, aides `centreRoom`, `wildNight`, `treesRim`. | `makeMap`, `MAPS`, `setSolid`, `solidRect`, `grid`, `rect`, `pathLine`, `ellipse`, `TILEG`, `TEXC`, `hsh`, `groundTex`, `GTEX`, `GCOL`, `terrain`, `sg`, `item`, `centreRoom`, `wildNight`, `treesRim` |
| `js/models/decor.js` | 9.2 | Décor 3D : maisons, bâtiments, labo, beffroi, fontaine, friterie, terril, arche, pièces (`room`). | `house`, `bigBuilding`, `labExt`, `belfry`, `fountain`, `friterie`, `lamp`, `signPost`, `arch`, `arrows`, `terril`, `headframe`, `room`, `pcTerminal` |
| `js/models/vehicules.js` | 4.2 | Voitures du garage Wagner (`CARS`, `carModel`) : Rolls-Royce d'après le modèle GLB (silhouette relevée), Audi A6 Avant S-line. | `CARS`, `carModel` |
| `js/systemes/nuit.js` | 6.1 | Lumière la nuit (`glowAt`, `nightApply`), lanternes des routes, buissons à objets (`itemBushes`), Lumons compagnons des persos (`PETS`, `addPet`), `nightSetup`. | `NIGHTG`, `glowTex`, `glowAt`, `nightApply`, `lantern`, `roadLanterns`, `BUSH_LOOT`, `itemBushes`, `PETS`, `addPet`, `nightSetup`, `INDOOR_IDS`, `INLIGHT`, `indoorLight`, `wallLamps` |
| `js/systemes/cinema.js` | 1.9 | Caméra cinéma : `CINE`, `cineOn`/`cineOff`, `camShot`, `track`. | `CINE`, `cineShell`, `cineOn`, `cineOff`, `camShot`, `track` |
| `js/systemes/nightwhite.js` | 19.2 | Night White : façade, boutique, personnel, salle (`nwRoom`), service/mini-jeux (`nwJob`), test d'embauche + entretien (`nwInterview`, `NW_ITW`). | `nwLogoTex`, `NWLOGO`, `nwLogo`, `nightWhiteExt`, `NWSHOP`, `YOUNES_POST`, `talkColinNW`, `talkFifi`, `NWSTAFF`, `nwShopMenu`, `nwRoom`, `nwJob`, `NW_ITW`, `nwInterview` |
| `js/histoire/cinematiques.js` | 13.1 | Cinématiques Night White : Younes et Fifi (`nwIxCine`), Younes rasé, révélation d'Amin + appel visio, Younes en congé maladie (`younesSickScene`). | `nwIxCine`, `nwIxCineOld`, `younesBaldScene`, `amineReveal`, `younesSickScene` |
| `js/world/ixellette.js` | 6.7 | Carte d'Ixellette (`buildIxellette`) et ses PNJ (`placePNJIxellette`). | `buildIxellette`, `placePNJIxellette` |
| `js/world/interieurs.js` | 6.8 | Intérieurs : labo (`buildLabo`), centres/boutique de Charleroc, Night White, boutique, arène de Ginette. | `buildLabo`, `buildInterieursCharleroc`, `buildInterieursFin` |
| `js/world/route1.js` | 5.2 | Carte de la Route 1. | `buildRoute1` |
| `js/world/charleroc.js` | 7.5 | Carte de Charleroc. | `buildCharleroc` |
| `js/world/route2.js` | 2.9 | Carte de la Route 2. | `buildRoute2` |
| `js/world/bruxellia.js` | 3.1 | Carte de Bruxellia. | `buildBruxellia` |
| `js/world/route3.js` | 4.3 | Carte de la Route 3 (+ garage d'Alex). | `buildRoute3` |
| `js/world/jourdanfritte.js` | 4.0 | Carte de Jourdanfritte. | `buildJourdanfritte` |
| `js/world/route4.js` | 3.5 | Route 4 (Bruxellia ↔ Anversaille) : canal, pont-levis de l'éclusier, dresseurs. | `ROUTE4`, `buildRoute4` |
| `js/world/anversaille.js` | 3.9 | Anversaille : port, containers, grue, Maison des Lumons (`CENTREA`), arène de Marieke (`GYMA`). | `ANV`, `buildAnversaille` |
| `js/world/route5.js` | 4.0 | Route 5 (Jourdanfritte ↔ Liègenoir) : cheminées, dresseurs Kétosaures, chemin du sud vers le Ranch. | `ROUTE5`, `chimney`, `buildRoute5` |
| `js/world/liegenoir.js` | 9.5 | Liègenoir (smog) : Perron, club du Baron, Cokerie, Montagne de Bueren, rue des Vitrines, Maison des Lumons, arène de Lambert. | `LIE`, `DARK_MAPS`, `buildLiegenoir` |
| `js/world/arene.js` | 4.0 | Arène de combat et galerie 3D (`ARENA`, `GAL`). | `buildArene` |
| `js/world/monde.js` | 3.4 | Variables des cartes (TOWN, LAB…), `buildWorld` (appelle chaque carte dans l'ordre), `goMap`, `refreshNPCs`, centre de soin après défaite (`RESPAWN`, `respawnCentre`). | `TOWN`, `buildWorld`, `goMap`, `refreshNPCs`, `RESPAWN`, `respawnCentre` |
| `js/core/ui.js` | 4.9 | Dialogues (`say`, `choose`, `msg`), overlays (`show`/`hide`), fondus, bannière, listes, icônes d'équipe, `toast`, `give`. | `dlgResolve`, `TSPD`, `fmt`, `say`, `msg`, `advance`, `choose`, `show`, `fadeOut`, `banner`, `setCtrl`, `dayNum`, `typH`, `hpCol`, `pickList`, `iconR`, `ICONC`, `monIcon`, `iconHTML`, `partyRow`, `toast`, `give` |
| `js/core/voix.js` | 3.8 | Voix des personnages façon Animal Crossing (`VOIX`, `voiceBlip`), une voix par personnage, option `OPT.vx`. | `VOIX`, `VXS`, `voixRnd`, `VOYF`, `VOIX_F`, `voixDe`, `voixDe0`, `voiceBlip` |
| `js/histoire/objectifs.js` | 2.9 | `objText` : la chaîne d'objectifs affichée, `setObj`. | `objText`, `setObj` |
| `js/core/save.js` | 3.3 | Sauvegarde `saveGame`/`loadGame` (lumons_save, version 5), `newGame`, `continueGame`. | `saveGame`, `loadGame`, `newGame`, `continueGame` |
| `js/core/menus.js` | 17.5 | Menu du monde, sac par poches, options/volumes, soins, boutiques, fiche de Lumon (`statScreen`). | `FOOD`, `POCKETS`, `pocketOf`, `bagTab`, `bagScreen`, `openMenu`, `volumePanel`, `optionsMenu`, `nurseHeal`, `shopMenu`, `ivGrade`, `statScreen` |
| `js/systemes/lumidex.js` | 3.8 | Galerie/visionneuse 3D, Lumidex et sa voix (synthèse vocale). | `galModel`, `galOpen`, `mscale`, `viewSpecies`, `closeView`, `galList`, `dexVoice`, `frVoices`, `voiceLabel`, `pickVoice`, `hushDex`, `speakDex`, `etyOf`, `gallery` |
| `js/core/input.js` | 3.0 | Clavier, croix, joystick, bouton A, `runScript`. | `held`, `lastDir`, `KM`, `joyVec`, `kRun`, `inputVec`, `inputDir`, `pressA`, `runScript` |
| `js/core/manette.js` | 4.2 | Manette (Gamepad API) : déplacement, A/B, Start = menu, Select = carte, navigation dans les menus. | `padVec` |
| `js/systemes/monture.js` | 2.4 | Monture (Laïka) : `toggleRide`, `rideTick`, caresser Laïka. | `riding`, `SEAT`, `canRide`, `toggleRide`, `rideTick`, `petLaika` |
| `js/world/interactions.js` | 4.1 | Compagnon, `interact`, pas (`onStepped`), dresseurs, rencontres sauvages, PNJ temporaires. | `laika`, `FOLD`, `addFr`, `interact`, `onStepped`, `trainerSpot`, `shinyfy`, `wildEncounter`, `TEMPS`, `tempChar`, `killTemp`, `freeNear` |
| `js/combat/combat.js` | 23.4 | Combat : état `B`, HUD, menu, `useMove`, statuts, XP, captures, `battle`. | `B`, `tween`, `ease`, `stg`, `foeM`, `label`, `STN`, `chips`, `hud`, `camL`, `layoutArena`, `setVO`, `placeFoeHud`, `placeMon`, `popIn`, `lunge`, `shot`, `burst`, `hitFx`, `ringFx`, `faintFx`, `bMenu`, `act`, `useMove`, `applyStatus`, `endTurn`, `gainXP`, `learn` … (+6) |
| `js/combat/ia.js` | 0.6 | Choix de l'adversaire (`foeChoice`). | `foeChoice` |
| `js/combat/effets.js` | 17.0 | Effets visuels des attaques (textures, rayons, éclairs, pluie…), `sparkAt`. | `VFXT`, `vfxTex`, `TFX`, `spr`, `burstAt`, `trainerOutro`, `SHK`, `camShake`, `camGo`, `camHome`, `frontShot`, `cineAttack`, `beam`, `beamOld`, `RINGG`, `shock`, `flashScr`, `rain`, `fountainFx`, `vines`, `bolt`, `projectile`, `vfxAttack`, `hitNum`, `statusFx`, `sparkAt` |
| `js/combat/techniques.js` | 18.6 | Un effet visuel propre à chaque technique (`MOVEFX`, dessins `MTEX`). | `MTEX`, `OPAQ`, `rm`, `popFx`, `orbitFx`, `slashFx`, `jawsFx`, `waveFx`, `streamFx`, `A_`, `MOVEFX` |
| `js/combat/duo.js` | 8.4 | Combats en duo (2 contre 2) : `duoLoop`, placement face à face `duoPlace`/`duoGround`, barres de vie `duoHud` — `battle({duo:2,…})`. | `DUO_W`, `duoCam`, `duoGround`, `duoPlace`, `duoDispose`, `duoMark`, `duoHud`, `duoEndSide`, `duoLoop` |
| `js/systemes/evolution.js` | 4.2 | `checkEvos`, `evolve`, cinématique d'évolution. | `checkEvos`, `evolve`, `evolveRun` |
| `js/systemes/adn.js` | 2.2 | Mini-jeu ADN de la fusion (`dnaGame` : raté / bien / parfait). | `ADN_C`, `dnaGame` |
| `js/systemes/fusion.js` | 28.3 | Génération procédurale (`GENES`, `genModel`), `fuse` (naît au stade le plus bas des parents, `stageOf`), formes/Éclats, Fusionneur, cinématique de fusion. | `GENES`, `GOPT`, `BODY`, `genModel`, `hexMix`, `geneOf`, `seedRng`, `LORE`, `ensureLore`, `fuseName`, `sanitizeSpecies`, `registerSpecies`, `fuse`, `stageOf`, `STAGE_N`, `EVO_SUF`, `evoName`, `EPIC_PRE`, `epicName`, `evolveFusionSpecies`, `FORMS`, `typesOf`, `addAura`, `fusionMachine`, `darkStage`, `fusionCine` |
| `js/systemes/formes.js` | 12.7 | Silhouettes des Lumons générés (`planOf` : quadrupède, bipède, serpent, volant, flottant, boule). | `genBoule`, `PLAN_N`, `planOf`, `torso`, `headDeco`, `bodyPattern`, `backDeco`, `LIMB` |
| `js/data/especes-liegenoir.js` | 3.3 | Lumons de Liègenoir (Ratoir, Perronrat, Tchantchou, Smogule, Lucinelle, Cokelin). | `LIE_SP` |
| `js/systemes/boss.js` | 2.6 | Évolutions des Lumons uniques des boss (`BOSS_EVO`, `bossMon`), combat de Snow et MC Sambre en 2 contre 2 (`snowBattle`), combats du mode test (`testCombats`). | `BOSS_EVO`, `bossMon`, `snowBattle`, `testCombats` |
| `js/systemes/pc.js` | 4.4 | PC de stockage Wagner (`S.box`, `pcMenu`, `receiveMon`), colis de la Prof (`profColis`). | `boxOf`, `receiveMon`, `pcMenu`, `profColis` |
| `js/systemes/apparence.js` | 6.7 | Personnalisation du héros : `LOOKS`, palettes, `pickLook`, `pickGender`, aperçu 3D `lookPreview`. | `LOOKS`, `PAL`, `lookDefaults`, `outfitOpts`, `heroLook`, `pickLook`, `rebuildHero`, `pickGender`, `lookR`, `lookPreview` |
| `js/histoire/prologue.js` | 28.9 | Prologue : ouverture (Laïka sauvée des Kétosaures sous le pont, `NARR`, `narrLoop`), nom, Prof (`talkProf`, `profIntro`), famille, Danny, labo, starter, duel Dolba. | `talkProf`, `NARR`, `narrIdx`, `RAIN`, `silh`, `dogS`, `narrLoop`, `narrType`, `narrSfx`, `narration`, `askName`, `profIntro`, `camFly`, `flyover`, `momScene`, `talkMom`, `talkDoudoune`, `talkCat`, `talkJack`, `petModel`, `DANNY`, `talkDanny`, `talkFernand`, `talkNilsTown`, `nilsDuel`, `enterLab`, `labScene`, `exitLab` … (+2) |
| `js/histoire/chapitre1.js` | 19.2 | Chapitre 1 : barrières, Kétosaures, Luciole (combat du terril), concert de MC Sambre (`sambreConcert`, `SAMBRE_RIMES`) puis battle, friterie, Rudy, Gérard (Lumisphère), Ginette. | `gerardSphere`, `gateTalk`, `ketoApproach`, `KETO_LINES`, `ketoBattle`, `ketoFirst`, `ketoRandom`, `lucioleScene`, `rapEvent`, `friteJosette`, `talkRudy`, `ginetteTalk`, `SAMBRE_RIMES`, `sambreConcert` |
| `js/histoire/chapitre2.js` | 9.0 | Chapitre 2 : Route 2 (cinématique de bagarre `r2Fight`, enveloppe, Lemaire), Alias, Smile and Eat. | `r2Scene`, `talkCop`, `aliasScene`, `aliasTalk`, `smileEat`, `r2Fight` |
| `js/histoire/chapitre3.js` | 6.2 | Chapitre 3 : Pigeolet royal, deal Cisoa d'Alex, Captain et Pirate Bob (2 contre 2). | `pigeonModel`, `pigeonSync`, `pigeonHeist`, `pigeonFight`, `captainScene` |
| `js/histoire/luciole.js` | 4.0 | Rencontres scénarisées de Luciole sans combat (`LUC_RDV` : Ixellette, Bruxellia), `placePNJLuciole`, `lucRefresh`. | `lucFree`, `LUC_RDV`, `placePNJLuciole`, `lucRefresh`, `lucLeave`, `lucFace`, `lucioleIxellette`, `lucioleBruxellia` |
| `js/histoire/essai.js` | 12.4 | Période d'essai chez Amin : repas au Smile and Eat, quête de l'huile de coude (`HUILE`, `huile()`), `aminTrial`, Danny qui crie (`dannyShout`), pharmacie, Smile and Eat (`SMILE`). | `SMILE`, `HUILE`, `huileVus`, `huile`, `foodStart`, `huileStart`, `huileFin`, `aminTrial`, `smileEat2`, `talkDannyJF`, `talkPharma`, `friteJF`, `DANNY_CRIS`, `shoutBubble`, `dannyShout`, `dannyPiece`, `jour25Event`, `trameHistoire` |
| `js/histoire/chapitre4.js` | 12.7 | Chapitre 4 : PC d'Alex (`alexPCScene`), Nour, énigme de l'éclusier, secret de Luciole, arène de Marieke, grue du port (`craneGame`), Snow au port, fin du chapitre. | `alexPCScene`, `nourCh4`, `ECLUSE`, `ecluseEnigme`, `lucioleSecret`, `mariekeTalk`, `craneGame`, `portGrue`, `snowPort` |
| `js/histoire/chapitre5.js` | 26.3 | Chapitre 5 : Route 5, Poudre d'Éclat, Samira (œuf), Lambert, énigme des fours (œuf de Cokelin), escalier et battle de rap, le Baron, choix avec Luciole. | `COKE_T`, `ch5Obj`, `r5Entree`, `poudreScene`, `lieArrivee`, `samiraTalk`, `gaminsRap`, `maigreTalk`, `jadeTalk`, `lambertTalk`, `cokeriePorte`, `cokeOrder`, `vanne`, `escalierJeu`, `buerenEscalier`, `RAP`, `rapJeu`, `rapBattle`, `clubPorte`, `baronScene` |
| `js/systemes/telephone.js` | 1.5 | Appel vidéo de groupe à l'écran (`phoneOn`, `phoneSpeak`, `phoneOff`). | `PHONE`, `phoneOn`, `phoneSpeak`, `phoneOff` |
| `js/systemes/oeufs.js` | 6.4 | Œufs, Pension, compatibilité, éclosion au pas. | `baseOf`, `eggSteps`, `eggHint`, `mkEgg`, `giveEgg`, `eggStory`, `talkPension`, `compat`, `compatTxt`, `breedTick`, `eggTick`, `hatch` |
| `js/systemes/liens.js` | 25.7 | Liens avec Luciole et Alex (`lienChoix`, `lienCheck`, voies et cadeaux `LIEN_REW`), écran `liensScreen`, discussion du jour au garage (`alexTalk`, `ALEX_SUJETS`), Marché gris, Alex en panne sur la Route 5 (`alexR5`), balades de Luciole au Ranch (`lucBalade`). | `LIENS`, `PALIERS`, `icoB`, `lien`, `lienAdd`, `lienRetro`, `lienVoie`, `coeurs`, `lienChoix`, `lienCheck`, `lienEgg`, `LIEN_REW`, `lucFroid`, `liensScreen`, `LIEN_TXT`, `LIEN_AIDE`, `ALEX_SUJETS`, `alexTalk`, `marcheGris`, `alexR5`, `LUC_BALADES`, `lucBalade` |
| `js/world/ranch.js` | 23.4 | Ranch du Pays de Herve (`RANCH`) : enclos A/B avec Lumons en 3D, couveuse, nid du jour, boutique, Grand Livre ; ferme (`FERME`) ; appart d'Alex (`COLOC`) ; éclosion ×2 au Ranch, Couverture, Fromage de Herve. | `RANCH`, `EGG_POOL`, `oeufSurprise`, `ranchS`, `ranchGiveEgg`, `ranchEgg`, `ranchTick`, `buildRanch`, `ranchPenSync`, `ranchPenAnim`, `ranchRefresh`, `ranchArrivee`, `marietteTalk`, `enclos`, `couveuse`, `nidDuJour`, `arnaudTalk`, `huguetteTalk`, `grandLivre`, `colocLit`, `colocPanier`, `colocFrigo` |
| `js/systemes/embuscades.js` | 3.0 | Embuscades cachées Kétosaures / Pirates. | `AMBUSH`, `PIRATE_LINES`, `KETO_HIDE`, `ambushAt`, `ambushDecor`, `ambush` |
| `js/systemes/mode-test.js` | 2.3 | Mode test (Options), combat 2 contre 2 aléatoire (`testDuo`). | `testMode`, `DUO_NOMS`, `testDuo` |
| `js/systemes/jour-nuit.js` | 3.9 | Ciel, heure (journée de 40 min), météo, `updateEnv`. | `HEMIL`, `ENV`, `SKY`, `skyAt`, `DAYLEN`, `gameT`, `dayWeather`, `updateEnv`, `envTick` |
| `js/world/carte-monde.js` | 11.1 | Mini-carte et carte du monde (+ téléportation en mode test, `WMTP`). | `MMC`, `drawMinimap`, `WMN`, `WML`, `WMTP`, `ruberOK`, `worldMap` |
| `js/world/monde-vivant.js` | 3.6 | Poussière de course, PNJ qui se baladent, bulle d'action. | `runDustT`, `DUSTM`, `runDust`, `wand`, `patrolStep`, `wanderTick`, `ACTB`, `actTex`, `actTarget`, `updActBubble` |
| `js/core/boucle.js` | 4.7 | Boucle de rendu `loop`, garde-fou anti-écran noir. | `last`, `loop`, `fgT`, `fadeGuard`, `loopB` |
| `js/main.js` | 0.8 | Démarrage : construit le monde, écran titre, boutons Nouvelle partie / Continuer / Galerie. |  |
