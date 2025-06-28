const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import du modèle
const Reimbursement = require('./models/Reimbursement');

// Configuration
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/salomon-refund')
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Routes
app.post('/api/reimbursements', async (req, res) => {
  try {
    const reimbursement = new Reimbursement(req.body);
    await reimbursement.save();
    res.status(201).json(reimbursement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/reimbursements', async (req, res) => {
  try {
    const reimbursements = await Reimbursement.find().sort({ dateCreation: -1 });
    res.json(reimbursements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/reimbursements/:id', async (req, res) => {
  try {
    const reimbursement = await Reimbursement.findById(req.params.id);
    if (reimbursement) {
      res.json(reimbursement);
    } else {
      res.status(404).json({ message: 'Remboursement non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch('/api/reimbursements/:id', async (req, res) => {
  try {
    const reimbursement = await Reimbursement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(reimbursement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
}); 