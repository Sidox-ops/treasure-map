# Projet Treasure Map
Ce projet est une application de cartographie de trésors. Il permet de créer une carte, d'ajouter des montagnes, des trésors et des aventuriers, et de simuler leur déplacement pour récupérer les trésors.

## Organisation des composants
L'application est organisée en plusieurs composants :

- `MapComponent` : Composant principal qui affiche la carte et gère les interactions avec l'utilisateur.
- `InputFileComponent` : Composant qui permet de charger un fichier texte pour initialiser la carte, les montagnes, les trésors et les aventuriers.
- `AdventurerComponent` : Composant qui affiche les informations sur les aventuriers et leur déplacement.
- `MapService` : Service qui gère la logique métier liée à la carte, aux montagnes, aux trésors et aux aventuriers.
- `AdventurerService` : Pour initialiser l'aventurier. 
## Tests unitaires
Les tests unitaires sont implémentés pour les différents composants et services. Les tests utilisent le framework de test Jasmine et l'outil de test Karma pour l'exécution des tests.

Les tests sont organisés dans des fichiers séparés avec la convention suivante :

`<nom-du-composant>.component.spec.ts` : Tests unitaires pour les composants.
`<nom-du-service>.service.spec.ts` : Tests unitaires pour les services.

Pour lancer tout les tests du projets, veuillez entrer la commande `ng test`

## Commandes pour lancer le projet
Pour lancer le projet, suivez les étapes suivantes :

- Assurez-vous d'avoir `Node.js` et `Angular CLI` installés sur votre machine.
- Clonez le projet depuis le dépôt Git.
- Accédez au répertoire du projet dans votre terminal.
- Exécutez la commande `npm install` pour installer les dépendances du projet.
- Exécutez la commande `ng serve` pour démarrer le serveur de développement.
- Ouvrez votre navigateur et accédez à `http://localhost:4200à pour voir l'application en cours d'exécution.

