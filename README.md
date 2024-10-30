# ORTHiN3D Project

Bienvenue dans le projet pour ORTHiN3D ! Ce projet est une application qui permet de gérer et consulter des enregistrements. Ce document explique comment configurer, installer et exécuter le frontend et le backend, ainsi que les extensions et dépendances nécessaires.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [Python](https://www.python.org/) (version 3.8 ou supérieure)
- [npm](https://www.npmjs.com/) (installé avec Node.js)
- [Django](https://www.djangoproject.com/) (version 3.2 ou supérieure)
- [Django REST Framework](https://www.django-rest-framework.org/) pour l'API backend
- [React](https://reactjs.org/) pour le frontend

## Structure du Projet

La structure du projet est la suivante :

```
.
├── Backend               # Dossier du backend Django
│   ├── manage.py         # Commande principale de gestion de Django
│   ├── db.sqlite3        # Base de données SQLite
│   ├── users             # Application pour la gestion des utilisateurs
│   ├── records           # Application pour la gestion des enregistrements
│   └── ...               # Autres fichiers de configuration Django
└── Frontend              # Dossier du frontend React
    ├── public            # Fichiers publics de React
    ├── src               # Code source React
    └── ...               # Autres fichiers de configuration React
```

## Installation

### Backend

1. **Naviguez dans le dossier `Backend`** :
   ```bash
   cd Backend
   ```

2. **Installer les dépendances Python** :
   ```bash
   pip install -r requirements.txt
   ```

   Le fichier `requirements.txt` doit contenir :
   ```plaintext
   Django==3.2
   djangorestframework
   djangorestframework-simplejwt
   ```

3. **Effectuer les migrations et initialiser la base de données** :
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Créer un super utilisateur pour Django** (optionnel) :
   ```bash
   python manage.py createsuperuser
   ```

5. **Lancer le serveur Django** :
   ```bash
   python manage.py runserver
   ```

   Le backend est maintenant accessible sur `http://127.0.0.1:8000/`.

### Frontend

1. **Naviguez dans le dossier `Frontend`** :
   ```bash
   cd ../Frontend
   ```

2. **Installer les dépendances JavaScript** :
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement** :
   Créez un fichier `.env` dans le dossier `Frontend` et ajoutez l'URL de l'API :
   ```env
   REACT_APP_API_URL=http://127.0.0.1:8000
   ```

4. **Lancer le serveur de développement React** :
   ```bash
   npm start
   ```

   Le frontend est maintenant accessible sur `http://localhost:3000/`.

## Fonctionnalités

- **Backend** :
  - API REST avec Django REST Framework pour gérer les utilisateurs et les enregistrements.
  - Authentification avec JWT (JSON Web Tokens) pour sécuriser les routes.
  - CRUD pour les enregistrements.

- **Frontend** :
  - Interface utilisateur en React permettant de créer, lire, modifier et supprimer des enregistrements.
  - Authentification et gestion de session avec JWT.
  - Affichage dynamique des enregistrements avec la possibilité d'édition et de suppression.

## Résolution des Problèmes

### Problèmes de migration dans Django

Si vous avez des erreurs lors des migrations, essayez les commandes suivantes pour réinitialiser les migrations :
```bash
python manage.py migrate --fake records zero
python manage.py makemigrations
python manage.py migrate
```

## Auteur

Développé par **Nathan** pour ORTHiN3D.

---

Pour toute question, n'hésitez pas à me contacter à mon adresse e-mail.
```