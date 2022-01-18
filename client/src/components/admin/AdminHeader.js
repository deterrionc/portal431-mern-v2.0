import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { messagesRead, getAdminUnreadMessages } from '../../actions/message'
import bell from '../../img/common/bell.png'

const AdminHeader = ({ messagesRead, adminUnreadMessages, getAdminUnreadMessages }) => {
  const history = useHistory()

  React.useEffect(() => {
    getAdminUnreadMessages()
  }, [getAdminUnreadMessages])

  return (
    <div className='admin-header d-flex flex-row-reverse align-items-center pr-3'>
      {adminUnreadMessages.length > 0 ?
        <div>
          <img src={bell} className='ml-2 cursor-pointer dropdown-toggle' data-toggle="dropdown" alt='BELL' height='20px' />
          <div className="dropdown-menu" style={{ maxWidth: '300px' }}>
            {adminUnreadMessages.map((item, index) =>
              <div className="dropdown-item" key={index} onClick={e => {
                e.stopPropagation()
                messagesRead(item.clientID, 'admin')
                history.push(`/dashboard/messages/${item.clientID}`)
              }}>
                There are {item.unreadMessages} new message(s) from {item.name}.
              </div>
            )}
          </div>
        </div>
        : <i className='fa fa-bell ml-2 cursor-pointer'></i>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  adminUnreadMessages: state.message.adminUnreadMessages
})

export default connect(mapStateToProps, { messagesRead, getAdminUnreadMessages })(AdminHeader)