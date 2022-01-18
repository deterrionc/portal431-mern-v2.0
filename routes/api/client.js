const express = require('express')
const router = express.Router()

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

module.exports = router