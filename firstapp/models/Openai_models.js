
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const transSchema = Schema({
  description: String,
  category: String,
  amount: Number,
  date: String,
  userId: { type: ObjectId, ref: 'user' }
});

module.exports = mongoose.model('transactionItem', transSchema);
