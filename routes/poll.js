const express = require('express');
const router = express.Router();
const Poll = require('../models/pollCreate');

router.post('/poll', async (req, res) => {
    try {
        const {
            pollName,
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
        } = req.body;

        // Save the quiz data to the database
        const poll = new Poll({
            pollName,
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
        });

        const savedPoll = await poll.save();
        console.log("Backend Data to save", savedPoll);

        res.status(201).json({
            success: true,
            message: 'Poll saved successfully!',
            newPOLLDATA: savedPoll,
        });
    } catch (error) {
        console.error('Error saving quiz data:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});



//////////////////FETCH BY ID IN MOBILE VIEW UI 


router.get('/poll/:id', async (req, res) => {
    try {
      const pollId = req.params.id;
  
      // Use Mongoose to find the quiz by ID in the database
      const pollData = await Poll.findById(pollId);
  
      if (!pollData) {
        // If quiz with the given ID is not found, send an error response
        return res.status(404).json({ success: false, error: 'Poll not found' });
      }
  
      // Send the quiz data as a JSON response
      res.status(200).json( pollData );
    } catch (error) {
      console.error('Error fetching poll data:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });


module.exports = router;