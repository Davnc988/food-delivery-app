import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Permet à Express de lire le JSON envoyé par React

// Connexion / Création de la base de données SQLite (fichier 'database.sqlite')
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Erreur lors de la création de la BDD :', err.message);
    } else {
        console.log('Connecté à la base de données SQLite.');

        // Création de la table "date" si elle n'existe pas
        db.run(`
      CREATE TABLE IF NOT EXISTS date (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT DEFAULT NULL,
        time TEXT DEFAULT NULL,
        food TEXT DEFAULT NULL
      )
    `);
    }
});

// --- LES ROUTES API ---

// 1. POST : Crée un enregistrement avec les champs à NULL
app.post('/api/date', (req, res) => {
    const query = `INSERT INTO date (date, time, food) VALUES (NULL, NULL, NULL)`;

    db.run(query, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Renvoie l'ID de la ligne créée
        res.status(201).json({ message: 'Date initialisé avec succès', id: this.lastID });
    });
});

// 2. GET : Récupère le tout premier enregistrement trouvé
app.get('/api/date', (req, res) => {
    // LIMIT 1 permet de ne récupérer que la première ligne
    const query = `SELECT * FROM date LIMIT 1`;

    db.get(query, [], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Aucun rendez-vous trouvé.' });
        }
        res.json(row);
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});