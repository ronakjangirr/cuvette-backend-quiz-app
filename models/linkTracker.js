const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  impressions: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Link', linkSchema);