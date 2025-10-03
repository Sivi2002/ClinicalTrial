// ClinicalTrial model - loose schema because the dataset is varied
const mongoose = require('mongoose');

const ClinicalTrialSchema = new mongoose.Schema({
  facility: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  minimumAge: { type: String }, 
  maximumAge: { type: String },
  sex: { type: String },
  overallOfficials: { type: Array },
}, { strict: false });

module.exports = mongoose.model('ClinicalTrial', ClinicalTrialSchema, 'siro');
