import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from '../routing/PrivateRoute'
import AdminSidebar from './AdminSidebar'
import AdminDashboard from './AdminDashboard'
import AdminClients from './AdminClients'
import AdminClient from './admin-client/AdminClient'
import AdminNewClient from './AdminNewClient'
import AdminSettings from './AdminSettings'
import AdminHeader from './AdminHeader'
import AdminEducation from './AdminEducation'
import AdminEducationCreate from './AdminEducationCreate'
import AdminEducationEdit from './AdminEducationEdit'
import AdminMessages from './admin-messages/AdminMessages'
import AdminClientMessages from './admin-messages/AdminClientMessages'
import { getClientsMessageNumbers, getMessages, getAdminUnreadMessages } from '../../actions/message'
import { setAlert } from '../../actions/alert'

const checkArraysSame = (array1, array2) => {
  var isSame = (array1.length === array2.length) && array1.every(function (element, index) {
    return JSON.stringify(element) === JSON.stringify(array2[index])
  })
  return isSame
}

var firstIntervalID = -1

const Admin = ({ setAlert, getMessages, getAdminUnreadMessages }) => {
  React.useEffect(() => {
    var intervalID = setInterval(async function () {
      let messageNumbersFromDB = await getClientsMessageNumbers()

      if (localStorage.getItem('messageNumbers') === 'undefined' || localStorage.getItem('messageNumbers') === null || localStorage.getItem('messageNumbers') === '[]') {
        localStorage.setItem('messageNumbers', JSON.stringify(messageNumbersFromDB))
      }

      var clientIDForChat = localStorage.getItem('chatClient')
      let messageNumbersFromLocalStorage = JSON.parse(localStorage.getItem('messageNumbers'))

      if (messageNumbersFromDB === null || messageNumbersFromLocalStorage === null || messageNumbersFromDB === undefined || messageNumbersFromLocalStorage === undefined) return false

      if (messageNumbersFromDB.length !== messageNumbersFromLocalStorage.length) {
        localStorage.setItem('messageNumbers', JSON.stringify(messageNumbersFromDB))
        return false
      }

      if (checkArraysSame(messageNumbersFromLocalStorage, messageNumbersFromDB)) {

      } else {
        messageNumbersFromDB.forEach(element => {
          var elementFromLocal = messageNumbersFromLocalStorage.find(el => el.clientID === element.clientID)

          if (element.messageNumber > elementFromLocal.messageNumber) {
            setAlert(`There are ${element.messageNumber - elementFromLocal.messageNumber} new messages from ${element.clientFirstName} ${element.clientLastName}`, 'success')
          }

          if (element.clientID === clientIDForChat) {
            getMessages(element.clientID)
            getAdminUnreadMessages()
          }
        })

        localStorage.setItem('messageNumbers', JSON.stringify(messageNumbersFromDB))
      }
    }, 5000)

    if (firstIntervalID < 0) {
      firstIntervalID = intervalID
    } else {
      clearInterval(intervalID)
    }
  }, [getMessages, setAlert, getAdminUnreadMessages])

  return (
    <div className='container-fluid bg-admin'>
      <div className='row'>
        <AdminSidebar />
        <div className='col-lg-10 col-md-8 p-3'>
          <AdminHeader />
          <Router basename="/dashboard">
            <PrivateRoute exact path="/" component={AdminDashboard} />
            <PrivateRoute exact path="/clients" component={AdminClients} />
            <PrivateRoute exact path="/client/:id" component={AdminClient} />
            <PrivateRoute exact path="/addClient" component={AdminNewClient} />
            <PrivateRoute exact path="/messages" component={AdminMessages} />
            <PrivateRoute exact path="/messages/:id" component={AdminClientMessages} />
            <PrivateRoute exact path="/education" component={AdminEducation} />
            <PrivateRoute exact path="/education/create" component={AdminEducationCreate} />
            <PrivateRoute exact path="/education/edit/:id" component={AdminEducationEdit} />
            <PrivateRoute exact path="/settings" component={AdminSettings} />
          </Router>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { setAlert, getMessages, getAdminUnreadMessages })(Admin)