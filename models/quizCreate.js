const mongoose = require('mongoose');
// const linkSchema = require('./linkTracker'); // Adjust the path as needed

const quizSchema = new mongoose.Schema({

  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },

  quizName: {
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

  totalTime:{
    type: Number,
  },







  // Fields for additional data
  textQuestionAttempted: {
    type: String,
  },
  imageQuestionAttempted: {
    type: String,
  },
  textAndImageQuestionAttempted: {
    type: String,
  },
  textCorrectAns: {
    type: Number,
  },
  textInCorrectAns: {
    type: Number,
  },
  imgCorrectAns: {
    type: Number,
  },
  imgInCorrectAns: {
    type: Number,
  },
  textImgCorrectAns: {
    type: Number,
  },
  textImgInCorrectAns: {
    type: Number,
  },

  // link: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Link',
  // },
  
});

module.exports = mongoose.model("Quizs", quizSchema);  