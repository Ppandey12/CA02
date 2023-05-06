/*
  todo.js -- Router for the ToDoList
*/
const express = require('express');
const router = express.Router();
const gpt_Item = require('../models/chat_item')
const User = require('../models/User')

const axios = require('axios');


isLoggedIn = (req, res, next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

// get the value associated to the key
router.get('/gpt/',
  isLoggedIn,
  async (req, res, next) => {
    const show = req.query.show
    const completed = show == 'completed'
    let items = []
    if (show) { // show is completed or todo, so just show some items
      items =
        await gpt_Item.find({ userId: req.user._id, completed })
          .sort({ completed: 1, priority: 1, createdAt: 1 })
    } else {  // show is null, so show all of the items
      items =
        await gpt_Item.find({ userId: req.user._id })
          .sort({ completed: 1, priority: 1, createdAt: 1 })

    }
    res.render('chatgpt', { items, show, completed });
  });



/* add the value in the body to the list associated to the key */
router.post('/gpt',
  isLoggedIn,
  async (req, res, next) => {

    response =
      await axios.post('http://gracehopper.cs-i.brandeis.edu:3500/openai',
        { prompt: req.body.question })

    const newQuestion = new gpt_Item(
      {
        question: req.body.question,
        answer: response.data.choices[0].message.content,
        userId: req.user._id
      })
    await newQuestion.save();
    res.redirect('/gpt')
  });




router.get('/gpt/remove/:itemId',
  isLoggedIn,
  async (req, res, next) => {
    console.log("inside /todo/remove/:itemId")
    await gpt_Item.deleteOne({ _id: req.params.itemId });
    res.redirect('/gpt')
  });




module.exports = router;



