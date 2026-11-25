# PROMPT – LUMONS, LOT 2 : histoire, confort et tout ce qui reste à faire

Tu reprends Lumons, dans le dépôt local `C:\Users\teddy\Claude\Lumon`, sur la branche `lot2-histoire-et-confort` (créée depuis `refonte-decoupage`). Réponds en français, en puces courtes, sans gros blocs de code.

## Méthode
- Lis d'abord `docs/STRUCTURE.md`, puis seulement les fichiers concernés (grep plutôt que de tout lire).
- Avance par lots. Après chaque lot : `node --check`, `python tools/build.py`, `python tools/test.py`, une capture avec le vrai Three.js sur PC, `python tools/structure.py`, une ligne dans `docs/CHANGELOG.md`, puis un commit sur la branche, sans pousser.
- Les sauvegardes `lumons_save` (version 5) doivent continuer à marcher. Toute nouvelle quête utilise de nouveaux drapeaux, et une ancienne partie déjà plus loin ne doit pas rester bloquée.
- Une décision de design qui change le jeu : donner ton avis et attendre le feu vert de Ted.
- Dis clairement ce qui n'a pas pu être vérifié à l'écran et demande des captures.

## Lot 1 – corrections rapides et confort
1. **Panneaux** : sur tous les panneaux, la planche passe devant le poteau en bois (aujourd'hui, on dirait qu'ils sont à l'envers).
2. **Charleroc** : la maison qui cache le podium de Snow (« SNOW – KÉTO TOUR ») est supprimée si elle ne sert ni au jeu ni à l'histoire. Le podium doit se voir.
3. **Luciole** est une fille : yeux verts, cheveux noirs, pas de barbe.
4. **Alex** est un gros monsieur, toujours en chemise blanche et pantalon noir. Son garage s'appelle le **Garage Wagner**.
5. **Mon équipe** : une option pour changer l'ordre des attaques d'un Lumon.
6. **Manette** (Bluetooth ou USB, sur navigateur PC, sur Android et dans l'interface Claude) : jouable entièrement à la manette, en gardant le tactile et le clavier.
7. **Mode test uniquement** : toucher une ville sur la carte du monde propose de s'y téléporter, avec confirmation.
8. **Nour et Amin** : vérifier les dialogues. Nour est le PETIT frère, mais il fait croire qu'il est le grand frère d'Amin. Quand on transmet le message, c'est Amin qui éclate de rire. Corriger la réplique fautive « le petit frère lui passe le bonjour ».
9. **Musique d'ascenseur** dans tous les Night White.
10. **Menu de personnalisation** : la plupart des coiffures se ressemblent dans l'aperçu, et les nouveautés récentes (coiffures, tenues, accessoires) ne s'y voient pas. Corriger l'aperçu.
11. **Sons** : séparer le volume de la météo (pluie, vent, ambiances) de celui des bruitages. Par défaut : bruitages à 50 %, météo à 15 %.

## Lot 2 – Charleroc, Luciole, Route 2, Bruxellia
1. **MC Sambre, 1re rencontre (sans combat)** :
   - il est sur scène avec 2 ou 3 danseurs, et une petite scène de 5 à 6 secondes le montre en train de rapper ;
   - il explique ce que les Kétosaures font là : blanchir leur argent sale ;
   - pour passer à la suite, il pose une énigme où il faut compléter des rimes de rap sur la Belgique.
2. **Luciole** :
   - rencontres scénarisées, jamais aléatoires ;
   - on ne se bat pas à chaque fois : on peut simplement la croiser en ville, dans une maison ou chez quelqu'un ;
   - son humour évolue au fil des rencontres.
3. **Route 2, première arrivée** :
   - cinématique épique de 9 à 15 secondes max sur le scénario des Kétosaures, dans le style de celle du Night White ;
   - on y voit les hommes ET les Lumons se battre entre eux.
4. **Entretien d'embauche chez Nour** : nettement plus difficile qu'aujourd'hui.
5. **Défaite** : on se réveille au centre (Maison des Lumons) le plus proche **déjà découvert**. Une défaite sur la Route 1 renvoie chez maman à Ixellette, une défaite sur la Route 2 renvoie à Bruxellia si on l'a déjà découverte, et ainsi de suite.
6. **Icône du colis de Nour** : elle est cassée (image d'erreur). Il faut une vraie icône de caisse ou de colis.

## Lot 2 bis – Ouverture du jeu et voix
1. **Cinématique d'ouverture** (premier lancement) :
   - musique dramatique et triste, nouvelle composition ;
   - quand la lumière du Night White apparaît, elle bascule en musique céleste et épique ;
   - scène : sous un pont, le héros (défoncé, à la rue) trouve Laïka en train de se faire frapper par des Kétosaures ;
   - il se bat contre eux pour la sauver : c'est comme ça qu'il récupère Laïka.
2. **Voix des personnages, façon Animal Crossing** : une petite vocalise synthétisée pendant que le texte défile, avec une hauteur et un timbre propres à chaque personnage (Fifi, Younes, Nour, Amin, Luciole, Snow…). Volume réglé par le curseur des bruitages, et une option pour la couper.

## Lot 3 – Jourdanfritte et la période d'essai chez Amin
1. **Smile and Eat** :
   - un vrai gros restaurant de fast-food luxueux, sur le thème des frites, collé à la friterie de la place ;
   - Danny y traîne, toujours dans la dèche, toujours en train de gratter tout le monde.
2. **Danny crie dans la ville** : à Jourdanfritte, il hurle aléatoirement, à tue-tête. Ce sont des bulles qui ne bloquent pas le jeu et qu'on n'a pas besoin de valider : tout le monde s'en fiche.
3. **Période d'essai** :
   - après le 1er service, Amin nous envoie chercher à manger au Smile and Eat, où l'on rencontre Jalal ;
   - après le 2e service, Amin nous trouve lent et nous envoie à la pharmacie chercher de « l'huile de coude ». Une des deux maisons de Jourdanfritte devient la pharmacie ;
   - l'huile de coude n'existe pas : c'est une blague des frères. Tous les habitants jouent le jeu en ricanant et nous renvoient de l'un à l'autre ;
   - quand on a parlé à tout le monde, on revient dire à Amin qu'il se fait tard et qu'on n'a rien trouvé. Il rigole, arrête là (pas de 3e service) et la quête est validée.
4. **Canette de Six Oies** :
   - Alex découvre que notre colis contient des Six Oies, sa boisson préférée ;
   - il nous en demande une en échange de la mitraillette : on a le choix ;
   - Amin remarque, ou pas, qu'il manque une canette selon notre choix.
5. **Appel visio « Night White Family »** : un téléphone à l'écran avec les quatre gars en selfie qui discutent, façon petite cinématique.
6. **Younes en congé maladie** : quand on retourne voir Nour à Bruxellia, Younes est au Night White en train de l'aider, le crâne rasé.
   - il est tout gêné, et on se moque de lui ;
   - vexé, il se met en congé maladie et quitte le magasin : « Je t'envoie mon certificat dans 2 heures… enfin, dans le bus » ;
   - en réalité, il part jouer à GTA 6.

## Lot 4 – Véhicules
- Les Rolls-Royce d'Alex sont noires. On s'inspire du modèle 3D `rollsroyce_phantom.glb`, trop lourd (15 Mo) pour le jeu : on reprend sa silhouette en low-poly, dans le style du jeu et luxueuse, pas une boîte carrée.
- La troisième voiture est une Audi A6 Break (S-Line).

## Lot 5 – Combats
1. **Combats en duo (2 contre 2)**, comme dans les Pokémon récents :
   - uniquement lors de moments scénarisés de l'histoire ;
   - équilibrés : ciblage, attaques de zone, IA, XP.
2. **Snow** :
   - on ne l'affronte jamais au hasard, seulement dans l'histoire ;
   - chaque combat contre Snow est un 3 contre 3, avec ses deux bras droits.
3. **Musiques des combats contre les Kétosaures** : techno, underground, un peu psy et trance.
4. **Lumons uniques des personnages** : leurs Lumons évoluent au fil de l'histoire, pour ne pas toujours affronter le même.

## Lot 6 – Reste de « État du projet »
1. **Stade des fusions** : la fusion hérite du stade le plus bas de ses parents.
   - deux bases → 3 formes ;
   - deux évoluées → naît en 2e forme ;
   - deux finales → naît en forme ultime.
2. **À proposer à Ted** :
   - caméra à boussole ;
   - une conséquence au Jour 200.
3. **Suite** :
   - fin du chapitre 3, puis chapitre 4 et suivants : retour de Snow et Luciole, secret de Luciole chez les Pirates ;
   - nouvelles villes, arènes, Ligue ;
   - APK Android ;
   - PDF de présentation et feuille de suivi à remettre à jour.
