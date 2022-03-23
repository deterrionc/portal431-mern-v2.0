const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  passwordForUpdate: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  // FOR CLIENT
  phoneNumber: {
    type: String
  },
  dateOfBirth: {
    type: String
  },
  billingAddress: {
    type: String
  },
  nameOfLLC: {
    type: String
  },
  einOfLLC: {
    type: String
  },
  addressOfLLC: {
    type: String
  },
  nameOfStore: {
    type: String
  },
  bankAccount: {
    type: String
  },
  bankRouting: {
    type: String
  },
  emailOfFacebook: {
    type: String
  },
  passwordOfFacebook: {
    type: String
  },
  amazonLogin: {
    type: String
  },
  amazonPassword: {
    type: String
  },
  amazonPrime: {
    type: String
  },
  frontCardLink: {
    type: String
  },
  frontCardLinkStatus: {
    type: String,
    default: 'Pending'
  },
  backCardLink: {
    type: String
  },
  backCardLinkStatus: {
    type: String,
    default: 'Pending'
  },
  // FOR MESSAGE
  toAdminMessages: {
    type: Number,
    default: 0
  },
  toClientMessages: {
    type: Number,
    default: 0
  },
  toAdminUnread: {
    type: Number,
    default: 0
  },
  toClientUnread: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('user', UserSchema)
