const mongoose = require('mongoose');

const reimbursementSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  motif: {
    type: String,
    required: true
  },
  montant: {
    type: Number,
    required: true,
    min: 0
  },
  lieu: {
    type: String,
    required: true
  },
  justificatif: {
    type: String,
    required: true
  },
  statut: {
    type: String,
    enum: ['en_attente', 'validé', 'refusé'],
    default: 'en_attente'
  },
  dateCreation: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reimbursement', reimbursementSchema); 