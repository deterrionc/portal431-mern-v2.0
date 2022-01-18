const express = require('express')
const router = express.Router()
const config = require('config')

const Message = require('../../models/Message')
const User = require('../../models/User')

// Schedule
const schedule = require('node-schedule')

// Mailgun Info
const mailgunApiKey = config.get('mailgun.mailgunApiKey')
const mailgunDomain = config.get('mailgun.domain')
var mailgun = require('mailgun-js')({ apiKey: mailgunApiKey, domain: mailgunDomain })

router.post('/addNewMessage', async (req, res) => {
  const newMessage = new Message({
    ...req.body
  })

  const client = await User.findById(req.body.client)
  const toClientMessages = client.toClientMessages
  const toAdminMessages = client.toAdminMessages
  const toClientUnread = client.toClientUnread
  const toAdminUnread = client.toAdminUnread

  if (req.body.writtenBy === 'admin') {
    await User.findByIdAndUpdate(req.body.client, { toClientMessages: toClientMessages + 1 }, { new: true })
    if (toClientUnread >= 0) {
      await User.findByIdAndUpdate(req.body.client, { toClientUnread: toClientUnread + 1 }, { new: true })
    }
  } else {
    await User.findByIdAndUpdate(req.body.client, { toAdminMessages: toAdminMessages + 1 }, { new: true })
    if (toAdminUnread >= 0) {
      await User.findByIdAndUpdate(req.body.client, { toAdminUnread: toAdminUnread + 1 }, { new: true })
    }
  }

  await newMessage.save()

  res.json({
    success: true
  })
})

router.get('/getMessages/:id', async (req, res) => {
  const messages = await Message.find({ client: req.params.id }).populate('writer')

  res.json({
    success: true,
    messages
  })
})

router.delete('/deleteMessage', async (req, res) => {
  var messageID = req.query['id']
  var writtenBy = req.query['written']
  var clientID = req.query['clientID']

  await Message.findByIdAndDelete(messageID)

  const client = await User.findById(clientID)
  const toClientMessages = client.toClientMessages
  const toAdminMessages = client.toAdminMessages
  const toClientUnread = client.toClientUnread
  const toAdminUnread = client.toAdminUnread

  if (writtenBy === 'admin') {
    await User.findByIdAndUpdate(clientID, { toClientMessages: toClientMessages - 1 }, { new: true })
    await User.findByIdAndUpdate(clientID, { toClientUnread: toClientUnread - 1 }, { new: true })
  } else {
    await User.findByIdAndUpdate(clientID, { toAdminMessages: toAdminMessages - 1 }, { new: true })
    await User.findByIdAndUpdate(clientID, { toAdminUnread: toAdminUnread - 1 }, { new: true })
  }

  res.json({
    success: true
  })
})

router.get('/messagesRead', async (req, res) => {
  var seenBy = req.query['seen']
  var clientID = req.query['clientID']
  if (seenBy === 'admin') {
    await User.findByIdAndUpdate(clientID, { toAdminUnread: 0 }, { new: true })
  } else {
    await User.findByIdAndUpdate(clientID, { toClientUnread: 0 }, { new: true })
  }

  res.json({
    success: true
  })
})

router.get('/getAdminUnreadMessages', async (req, res) => {
  const clients = await User.find({ type: 'client' })
  var adminUnreadMessages = []

  clients.forEach(client => {
    if (client.toAdminUnread > 0) {
      adminUnreadMessages.push({
        clientID: client._id,
        unreadMessages: client.toAdminUnread,
        name: client.firstName + ' ' + client.lastName
      })
    }
  })

  res.json({
    success: true,
    adminUnreadMessages
  })
})

router.get('/getClientUnreadMessages/:id', async (req, res) => {
  const client = await User.findById(req.params.id)
  var clientUnreadMessages = client.toClientUnread

  res.json({
    success: true,
    clientUnreadMessages
  })
})

router.get('/getClientsMessageNumbers', async (req, res) => {
  const clients = await User.find({ type: 'client' })
  let clientsMessageNumbers = []
  clients.forEach(client => {
    clientsMessageNumbers.push({
      clientID: client._id,
      clientFirstName: client.firstName,
      clientLastName: client.lastName,
      messageNumber: client.toAdminMessages
    })
  })

  res.json({
    success: true,
    clientsMessageNumbers
  })
})

router.get('/getAdminMessageNumbers/:id', async (req, res) => {
  const client = await User.findById(req.params.id)

  let adminMessageNumbers = {
    messageNumber: client.toClientMessages
  }

  res.json({
    success: true,
    adminMessageNumbers
  })
})

const ruleForEmail = new schedule.RecurrenceRule()
ruleForEmail.second = 1

const scheduleForSendEmail = schedule.scheduleJob(ruleForEmail, async () => {
  const clients = await User.find({ type: 'client' })

  clients.forEach(async (client) => {
    if (client.toClientUnread > 0) {
      await User.findByIdAndUpdate(client._id, { toClientUnread: 0 }, { new: true })
      await sendEmailToCustomer(client)
    }
  })
})

const sendEmailToCustomer = async (client) => {
  var emailContentToCustomer = {
    from: 'PORTAL <info@portal.431performance.com>',
    to: client.email,
    subject: 'There are new message(s) from Admin',
    text: `Hi, ${client.firstName} ${client.lastName}. There are new message(s) from Admin. Please check https://portal.431performance.com/dashboard/messages`
  }

  mailgun.messages().send(emailContentToCustomer, function (error, body) {
    console.log(body)
  })
}

module.exports = router