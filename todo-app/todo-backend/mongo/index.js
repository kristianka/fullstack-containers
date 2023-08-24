const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const { MONGO_URL } = require('../util/config')

if (MONGO_URL && !mongoose.connection.readyState)
  try {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  } catch (error) {
    console.log('error connecting to MongoDB:', error.message)
  }

module.exports = {
  Todo
}
