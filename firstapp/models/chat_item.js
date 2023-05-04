
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var gptSchema = Schema({
  question: String,
  answer: String,
  // completed: Boolean,
  // createdAt: Date,
  // priority: Number,
  userId: { type: ObjectId, ref: 'user' }
});

module.exports = mongoose.model('chat_item', gptSchema);
