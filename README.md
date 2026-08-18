# Énergie 2027 V2

Application statique, sans dépendance, pour cartographier les positions et réseaux énergie associés à l’élection présidentielle de 2027.

## Publication sur GitHub Pages

1. Copiez les fichiers à la racine de votre dépôt.
2. Dans **Settings > Pages**, choisissez **Deploy from a branch**.
3. Sélectionnez la branche `main` et le dossier `/root`.

Aucune compilation n’est nécessaire.

## Fichiers

- `index.html` : structure sémantique de l’interface
- `app.css` : présentation responsive
- `config.js` : critères, niveaux de preuve et types de relations
- `data.js` : corpus normalisé
- `app.js` : DataStore, validation, recherche, filtres, rendus et exports
- `validate-data.mjs` : contrôle des identifiants et références

## Modèle de données

Les entités principales sont `organizations`, `actors`, `relations`, `claims`, `positions`, `sources`, `assessments` et `timelines`. Les acteurs n’ont pas de camp codé en dur. Leur rattachement passe par `relations`.

## Mise à jour

Ajoutez les données dans `data.js` en conservant des identifiants stables. Une nouvelle catégorie métier doit être ajoutée à `config.js`, pas dans le moteur de rendu.

## Validation

Avec Node.js installé :

```bash
node validate-data.mjs
```

## Avertissement méthodologique

Le corpus reprend les données et appréciations fournies dans le prototype source. Les scores sont des indices analytiques internes. Vérifiez régulièrement les liens, dates, candidatures, rôles et affirmations avant publication.
