import React from 'react'
import { connect } from 'react-redux'
import bell from '../../img/common/bell.png'
import { getNotifications } from '../../actions/client'
import { useHistory } from 'react-router'
import { getClientUnreadMessages, messagesRead } from '../../actions/message'

const ClientHeader = ({ getNotifications, notifications, clientID, getClientUnreadMessages, clientUnreadMessages, messagesRead }) => {
  const history = useHistory()

  React.useEffect(() => {
    getNotifications(clientID)
    getClientUnreadMessages(clientID)
  }, [getNotifications, getClientUnreadMessages, clientID])

  return (
    <div className='admin-header d-flex flex-row-reverse align-items-center pr-3'>
      {(notifications.length > 0 || clientUnreadMessages > 0) ?
        <div>
          <img src={bell} className='ml-2 cursor-pointer dropdown-toggle' data-toggle="dropdown" alt='BELL' height='20px' />
          <div className="dropdown-menu" style={{ maxWidth: '300px' }}>
            {notifications.length ?
              <>
                <h5 class="dropdown-header">Notifications</h5>
                <div className="dropdown-item" onClick={e => {
                  e.stopPropagation()
                  history.push('/dashboard')
                }}>
                  There are {notifications.length} new notification(s).
                </div>
              </>
              : null
            }
            {clientUnreadMessages > 0 ?
              <>
                <h5 class="dropdown-header">Messages</h5>
                <div className="dropdown-item" onClick={e => {
                  e.stopPropagation()
                  messagesRead(clientID)
                  history.push('dashboard/messages')
                }}>
                  There are {clientUnreadMessages} new message(s).
                </div>
              </>
              : null
            }
          </div>
        </div>
        :
        <i className='fa fa-bell ml-2 cursor-pointer'></i>
      }
      <i onClick={() => history.push('/dashboard/messages')} className='fa fa-question-circle ml-2 cursor-pointer'></i>
    </div>
  )
}

const mapStateToProps = state => ({
  clientID: state.auth.user._id,
  notifications: state.client.notifications,
  clientUnreadMessages: state.message.clientUnreadMessages
})

export default connect(mapStateToProps, { getNotifications, getClientUnreadMessages, messagesRead })(ClientHeader)