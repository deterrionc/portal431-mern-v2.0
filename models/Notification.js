const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  content: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('notification', NotificationSchema)