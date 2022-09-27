const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')

const Notification = require('../../models/Notification')
const User = require('../../models/User')

// Mailgun Info
const mailgunApiKey = config.get('mailgun.mailgunApiKey')
const mailgunDomain = config.get('mailgun.domain')
var mailgun = require('mailgun-js')({ apiKey: mailgunApiKey, domain: mailgunDomain })

router.get('/getNotifications/:id', async (req, res) => {
  const clientID = req.params.id
  const notifications = await Notification.find({ client: clientID })

  res.json({
    success: true,
    notifications
  })
})

router.delete('/deleteNotification/:id', async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id)

  res.json({
    success: true
  })
})

router.get('/getAdmin', async (req, res) => {
  const adminFromDB = await User.findOne({ type: 'admin' })
  const admin = {
    _id: adminFromDB._id,
    firstName: adminFromDB.firstName,
    lastName: adminFromDB.lastName
  }

  res.json({
    success: true,
    adminFromDB
  })
})

router.post('/updateAccount/:clientID', async (req, res) => {
  const clientID = req.params.clientID

  let update = { ...req.body }
  update.password = bcrypt.hashSync(req.body.password, 10)
  update.passwordForUpdate = req.body.password
  update.frontCardLinkStatus = 'pending'
  update.backCardLinkStatus = 'pending'

  await User.findByIdAndUpdate(clientID, update, { new: true })

  const admin = await User.findOne({ type: 'admin' })

  var emailContentToCustomer = {
    from: 'PORTAL <info@portal.431performance.com>',
    to: 'info@431performance.com',
    subject: 'A user updated his / her account profile.',
    text: `Hi, ${admin.firstName} ${admin.lastName}. ${update.firstName} ${update.lastName} changed his account profile and documents. Please check https://portal.431performance.com`
  }

  mailgun.messages().send(emailContentToCustomer, function (error, body) {
    console.log(body)
  })

  res.json({
    success: true,
  })
})

router.delete('/deleteClient/:clientID', async (req, res) => {
  const clientID = req.params.clientID

  const client = await User.findById(clientID)

  var emailContentToCustomer = {
    from: 'PORTAL <info@portal.431performance.com>',
    to: client.email,
    subject: 'Your account has been deleted by admin.',
    text: `Hi, ${client.firstName} ${client.lastName}. We are sorry to confirm you this information. If you have questions, point them to email info@431perfomance.com`
  }

  mailgun.messages().send(emailContentToCustomer, function (error, body) {
    console.log(body)
  })

  await User.findByIdAndDelete(clientID)

  res.json({
    success: true
  })
})

router.post('/updateClient/:clientID', async (req, res) => {
  const clientID = req.params.clientID

  const client = await User.findById(clientID)

  let update = { ...req.body }
  update.password = bcrypt.hashSync(req.body.password, 10)
  update.passwordForUpdate = req.body.password
  update.frontCardLinkStatus = 'pending'
  update.backCardLinkStatus = 'pending'

  await User.findByIdAndUpdate(clientID, update, { new: true })

  if (client.passwordForUpdate === update.passwordForUpdate && client.email === update.email) {
    var emailContentToCustomer = {
      from: 'PORTAL <info@portal.431performance.com>',
      to: client.email,
      subject: 'Your account profile in portal.431performance.com is updated by admin',
      text: `Hi, ${client.firstName} ${client.lastName}. Admin changed your account profile and documents. Your login email is ${update.email} and password is ${update.passwordForUpdate}. Please check https://portal.431performance.com/dashboard`
    }

    mailgun.messages().send(emailContentToCustomer, function (error, body) {
      console.log(body)
    })
  } else {
    var emailContentToCustomer = {
      from: 'PORTAL <info@portal.431performance.com>',
      to: client.email,
      subject: 'Your login credentials to portal.431performance.com are updated',
      text: `Hi, ${client.firstName} ${client.lastName}. Admin changed your login credentials. Your login email is ${update.email} and password is ${update.passwordForUpdate}. Please check https://portal.431performance.com/dashboard`
    }

    mailgun.messages().send(emailContentToCustomer, function (error, body) {
      console.log(body)
    })
  }

  res.json({
    success: true,
  })
})

module.exports = router