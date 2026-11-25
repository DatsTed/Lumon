PROMPT – REFONTE TECHNIQUE DE LUMONS (découpage en vrai projet de jeu)

Tu es développeur de jeux vidéo senior. Tu reprends mon jeu « Lumons – Les Éclats d'Ardenval » (jeu de créatures façon Pokémon, 100 % belge, 3D Three.js r128, joué sur téléphone). Réponds-moi en français.

Aujourd'hui, tout le jeu tient dans UN seul fichier index.html d'environ 400 Ko. Chaque modification oblige à manipuler ce gros fichier, ce qui coûte très cher en crédits. Ta mission : découper le projet comme un vrai jeu vidéo, pour que chaque future modification ne touche qu'un petit fichier.

OÙ TROUVER LE CODE
- Tu travailles dans Claude Code, sur mon dépôt GitHub DatsTed/Lumon.
- Tout est dans lumons.zip à la racine : game/ (index.html = le jeu complet, manifeste, icônes, service worker) et docs/ (ce prompt et ETAT-DU-PROJET.md).
- Première étape : décompresse lumons.zip dans le dépôt, lis docs/ETAT-DU-PROJET.md (histoire, personnages, systèmes, liste à faire), puis supprime le zip une fois le découpage en place.
- Ne lis jamais game/index.html en entier dans la conversation : travaille avec grep, sed et des scripts.

RÈGLE D'OR : ZÉRO CHANGEMENT DE COMPORTEMENT
Cette refonte ne change rien au jeu : mêmes dialogues, mêmes cartes, même sauvegarde (clé localStorage lumons_save, version 5). Les sauvegardes existantes doivent continuer à marcher. Aucune nouvelle fonctionnalité pendant la refonte.

MÉTHODE (pour coûter le moins possible)
1. Ne lis jamais le fichier en entier. Repère les sections avec grep et des scripts Python, et découpe-les par script, pas à la main.
2. Garde des scripts classiques qui partagent leurs variables globales (pas d'import/export ES modules pour l'instant). L'ordre des balises <script> remplace les imports. Ça évite de réécrire 400 Ko de références croisées.
3. Avance par lots, et après chaque lot : vérification de syntaxe (node --check sur chaque fichier), puis test automatique (Playwright + Chrome avec un faux Three.js) qui lance une partie, fait un combat, une fusion, une évolution et charge une sauvegarde.
4. Compare toujours l'ancienne et la nouvelle version : mêmes objectifs affichés, mêmes drapeaux d'histoire, aucune erreur console.

ARBORESCENCE CIBLE (adapte si le code le demande)
lumons/
  index.html            → seulement le squelette HTML et les balises <script>/<link>
  css/style.css
  js/core/              → moteur.js (renderer, scène, caméra, boucle), audio.js (musiques, bruitages, volumes), input.js (joystick, boutons), ui.js (dialogues, listes, menus, overlays), save.js
  js/data/              → types.js, attaques.js, especes.js (Lumons, lore, étymologie), objets.js, personnages.js (apparences), musiques.js, succes.js
  js/models/            → humains.js (human, coiffures, tenues), lumons3d.js (modèles, génération procédurale), decor.js (maisons, textures, ciel)
  js/world/             → terrain.js, carte-monde.js, une carte par fichier : ixellette.js, route1.js, charleroc.js, route2.js, bruxellia.js, route3.js, jourdanfritte.js, interieurs.js (labo, Night White, Maison des Lumons…)
  js/combat/            → combat.js, ia.js, effets.js
  js/systemes/          → fusion.js, evolution.js, oeufs.js, nightwhite.js (mini-jeux), monture.js, jour-nuit.js, embuscades.js, cinema.js (caméra cinéma), mode-test.js
  js/histoire/          → objectifs.js, prologue.js, chapitre1.js, chapitre2.js, chapitre3.js
  tools/build.py        → recolle tout en UN fichier dist/index.html (pour l'artefact et pour comparer avec l'ancienne version)
  tools/test.py         → le test automatique
  docs/STRUCTURE.md     → la carte du projet : chaque fichier, ce qu'il contient, ses fonctions principales
  docs/CHANGELOG.md     → une ligne par mise à jour

POURQUOI docs/STRUCTURE.md EST ESSENTIEL
À chaque future demande, tu commenceras par lire STRUCTURE.md (petit), puis uniquement le ou les fichiers concernés. C'est ça qui fera baisser le coût. Tiens-le à jour à chaque modification.

PUBLICATION
- tools/build.py produit dist/index.html, un fichier unique, utile pour comparer avec l'ancienne version et pour une publication en artefact si je la demande.
- GitHub : adapte .github/workflows/build.yml pour publier le dossier du jeu tel quel sur GitHub Pages (datsted.github.io/Lumon), sans zip, en gardant manifeste, icônes et service worker (le cache du service worker doit changer à chaque version).
- Travaille sur une branche, puis demande-moi mon accord avant de fusionner dans main : c'est main qui met le jeu en ligne.

RÈGLES DE TRAVAIL AVEC MOI
- Avance étape par étape ; commence par me présenter le plan de découpage en quelques lignes, puis enchaîne.
- Réponses courtes, en puces. Ne colle jamais de gros blocs de code dans le chat.
- Dis-moi clairement ce que tu n'as pas pu vérifier à l'écran et demande-moi des captures.

QUAND C'EST FINI
Donne-moi : l'arborescence finale, la taille du plus gros fichier, le résultat des tests, et la liste des choses qui restent à faire (reprise du document « État du projet et suite »). Ensuite seulement, on reprendra les nouvelles fonctionnalités, en commençant par le stade des fusions.
