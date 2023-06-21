# Projet Treasure Map

Ce projet, un exercice de test technique pour Carbon IT, concerne une application de simulation pour une carte aux trésors. Le cadre de l'application est le département péruvien de la Madre de Dios, couvrant une superficie de 85 182 km², que des aventuriers ont l'autorisation d'explorer en quête de trésors. L'application doit permettre de suivre leurs déplacements et les collectes de trésors effectuées, tout en respectant les standards élevés de qualité, de lisibilité et de maintenabilité du code exigés par le gouvernement péruvien.

La carte, de forme rectangulaire, comprend des plaines, des montagnes infranchissables et des trésors. Chaque case de la carte a la même taille et peut accueillir plusieurs trésors. Les aventuriers se déplacent d'une case à la fois en fonction de leur orientation, en évitant les montagnes et en collectant les trésors sur leur chemin.

L'application doit être capable de lire un fichier d'entrée définissant les dimensions de la carte, la position des montagnes et des trésors, ainsi que la position, l'orientation et la séquence de mouvements des aventuriers. Elle doit ensuite simuler les mouvements des aventuriers, gérer la collecte des trésors et produire un fichier de sortie montrant le résultat final de la simulation.

## Organisation des composants

L'application est organisée en plusieurs composants :

-   `MapComponent` : Composant principal qui affiche la carte et gère les interactions avec l'utilisateur.
-   `InputFileComponent` : Composant qui permet de charger un fichier texte pour initialiser la carte, les montagnes, les trésors et les aventuriers.
-   `AdventurerComponent` : Composant qui affiche les informations sur les aventuriers et leur déplacement.
-   `MapService` : Service qui gère la logique métier liée à la carte, aux montagnes, aux trésors et aux aventuriers.
-   `AdventurerService` : Pour initialiser l'aventurier.

## Tests unitaires

Les tests unitaires sont implémentés pour les différents composants et services. Les tests utilisent le framework de test Jasmine et l'outil de test Karma pour l'exécution des tests.

Les tests sont organisés dans des fichiers séparés avec la convention suivante :

`<nom-du-composant>.component.spec.ts` : Tests unitaires pour les composants.
`<nom-du-service>.service.spec.ts` : Tests unitaires pour les services.

Pour lancer tout les tests du projets, veuillez entrer la commande `ng test`

## Commandes pour lancer le projet

Pour lancer le projet, suivez les étapes suivantes :

-   Assurez-vous d'avoir `Node.js` et `Angular CLI` installés sur votre machine.
-   Clonez le projet depuis le dépôt Git.
-   Accédez au répertoire du projet dans votre terminal.
-   Exécutez la commande `npm install` pour installer les dépendances du projet.
-   Exécutez la commande `ng serve` pour démarrer le serveur de développement.
-   Ouvrez votre navigateur et accédez à `http://localhost:4200à pour voir l'application en cours d'exécution.
