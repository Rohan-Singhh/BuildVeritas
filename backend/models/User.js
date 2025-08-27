const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email:      { type: String, required: true, unique: true, index: true },
  password:   { type: String, required: true },
  name:       { type: String, required: true },
  role:       { type: String, enum: ['Firm', 'Vendor', 'Client', 'Admin'], required: true },
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
