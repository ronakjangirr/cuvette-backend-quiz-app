const express = require('express');
const router = express.Router();
const Quiz = require('../models/quizCreate');

// Post(Create) Api for Quiz create.

router.post('/quiz', async (req, res) => {
    try {
        const {
            quizName,
            typeText,
            questionText,
            optionsText,
            correctOptionText,
            typeImg,
            questionImg,
            optionsImg,
            correctOptionImg,
            typeTxtImg,
            questionTxtImg,
            optionsTxtImg,
            optionsImageTxtImg,
            correctOptionTxtImg,
            currentDateAndTime,
            totalTime,

            textQuestionAttempted,
            imageQuestionAttempted,
            textAndImageQuestionAttempted,

            textCorrectAns,
            textInCorrectAns,
            
            imgCorrectAns,
            imgInCorrectAns,
            
            textImgCorrectAns,
            textImgInCorrectAns,
        } = req.body;

        // Set the currentDateAndTime field to the current date and time
        // const currentDateAndTime = new Date();

        // Save the quiz data to the database
        const quiz = new Quiz({
            quizName,
            typeText,
            questionText,
            optionsText,
            correctOptionText,
            typeImg,
            questionImg,
            optionsImg,
            correctOptionImg,
            typeTxtImg,
            questionTxtImg,
            optionsTxtImg,
            optionsImageTxtImg,
            correctOptionTxtImg,
            currentDateAndTime,
            totalTime,

            textQuestionAttempted,
            imageQuestionAttempted,
            textAndImageQuestionAttempted,

            textCorrectAns,
            textInCorrectAns,
            
            imgCorrectAns,
            imgInCorrectAns,
            
            textImgCorrectAns,
            textImgInCorrectAns,
        });

        const savedQuiz = await quiz.save();
        console.log("Backend Data to save", savedQuiz);

        res.status(201).json({
            success: true,
            message: 'Quiz saved successfully!',
            newQuizDATA: savedQuiz,
        });
    } catch (error) {
        console.error('Error saving quiz data:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


// Get(Fetching) Api for showing all created quiz in dashboard page

router.get('/quiz', async (req, res) => {           // This api is used in Analytics Component to show data in table
    try {
        const quizData = await Quiz.find();
        res.status(200).json(quizData);       // ALWAYS REMEMBER ON GET API ALWAYS SEND quizData OTHERWISE IT SHOW DATA IN OBJECT 

    } catch (error) {
        console.error('Error fetching quiz data:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error. Failed to fetch quiz data.' });
    }
});


// Delete a quiz by ID
router.delete('/quiz/:id', async (req, res) => {
    const quizId = req.params.id;
    
    try {
        // Use the Quiz model to find and remove the quiz by ID
        const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

        if (!deletedQuiz) {
            return res.status(404).json({ success: false, error: 'Invalid quiz ID. Unable to delete requested quiz.' });
        }

        res.status(200).json({ success: true, message: 'Quiz deleted successfully', deletedQuiz });
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error. Failed to delete quiz.' });
    }
});


//////////////////FETCH BY ID IN MOBILE VIEW UI 


router.get('/quiz/:id', async (req, res) => {
    try {
      const quizId = req.params.id;
  
      // Use Mongoose to find the quiz by ID in the database
      const quizData = await Quiz.findById(quizId);
  
      if (!quizData) {
        // If quiz with the given ID is not found, send an error response
        return res.status(404).json({ success: false, error: 'Quiz not found' });
      }
  
      // Send the quiz data as a JSON response
      res.status(200).json( quizData );
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });





////////////////////////////    FOR ADDING THE DATA FOR ANALYSIS


router.post('/quiz/:id', async (req, res) => {
    try {
        const quizId = req.params.id;

        const {
            textQuestionAttempted,
            imageQuestionAttempted,
            textAndImageQuestionAttempted,

            textCorrectAns,
            textInCorrectAns,
            
            imgCorrectAns,
            imgInCorrectAns,
            
            textImgCorrectAns,
            textImgInCorrectAns,
        } = req.body;

        // Find the existing quiz by ID
        const existingQuiz = await Quiz.findById(quizId);
        console.log("Final DATA",existingQuiz);
        if (!existingQuiz) {
            return res.status(404).json({
                success: false,
                error: 'Quiz not found',
            });
        }

        // Update additional fields
        existingQuiz.textQuestionAttempted = textQuestionAttempted;
        existingQuiz.imageQuestionAttempted = imageQuestionAttempted;
        existingQuiz.textAndImageQuestionAttempted = textAndImageQuestionAttempted;

        existingQuiz.textCorrectAns = textCorrectAns;
        existingQuiz.textInCorrectAns = textInCorrectAns;
        
        existingQuiz.imgCorrectAns = imgCorrectAns;
        existingQuiz.imgInCorrectAns = imgInCorrectAns;
        
        existingQuiz.textImgCorrectAns = textImgCorrectAns;
        existingQuiz.textImgInCorrectAns = textImgInCorrectAns;

        // Save the updated quiz data
        const updatedQuiz = await existingQuiz.save();

        res.status(200).json({
            success: true,
            message: 'Quiz updated successfully!',
            updatedQuizData: updatedQuiz,
        });
    } catch (error) {
        console.error('Error updating quiz data:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


module.exports = router;










//Notes
// Why we use find() method?
// Ans - Quiz.find() is used to retrieve all documents (records) from the Quiz collection in a MongoDB database. This is a common use case in a Node.js application using a MongoDB database.
// Quiz.find() is a method provided by Mongoose to query documents in the associated MongoDB collection.
// Quiz.find() with no arguments fetches all documents from the Quiz collection.
// It returns a query object that can be further customized (e.g., filtering, sorting) before executing the query.
// The route handler is using async/await syntax to handle the promise returned by Quiz.find().
// It waits for the Quiz.find() operation to complete before moving on to the next steps.