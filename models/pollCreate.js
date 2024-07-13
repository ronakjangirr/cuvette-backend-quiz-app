const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({

  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },

  pollName: {
    type: String,
  },
  typeText: {
    type: String,
  },
  questionText: {
    type: String,
  },
  optionsText: {
    type: [String],
  },
  correctOptionText: {
    type: String,
  },

  typeImg: {
    type: String,
  },
  questionImg: {
    type: String,
  },
  optionsImg: {
    type: [String],
  },
  correctOptionImg: {
    type: String,
  },

  typeTxtImg: {
    type: String,
  },
  questionTxtImg: {
    type: String,
  },
  optionsTxtImg: {
    type: [String],
  },
  optionsImageTxtImg: {
    type: [String],
  },
  correctOptionTxtImg: {
    type: String,
  },

  currentDateAndTime: {
    type: Date, // Use Date type for storing date and time
    default: Date.now, // Set default value to current date and time
  },


});

module.exports = mongoose.model("Polls", pollSchema);  