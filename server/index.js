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

// MongoDB Connection Options
const mongoOptions = {
  retryWrites: true,
  w: 'majority'
};

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, mongoOptions)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Error handling middleware
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

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