const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const Notification = require('../../models/Notification')
const User = require('../../models/User')

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
    admin
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

  res.json({
    success: true,
  })
})

module.exports = router