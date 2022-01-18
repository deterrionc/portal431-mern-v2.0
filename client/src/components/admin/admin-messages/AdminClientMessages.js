import React from 'react'
import { connect } from 'react-redux'
import AdminMessagesSidebar from './AdminMessagesSidebar'
import { getClient, setChatClient } from '../../../actions/admin'
import { addNewMessage, getMessages, deleteMessage } from '../../../actions/message'
import { formatDateTime } from '../../../utils/formatDate1'

const AdminClientMessages = ({ match, getClient, admin, adminID, setChatClient, addNewMessage, deleteMessage, getMessages, messages }) => {
  const clientID = match.params.id

  React.useEffect(() => {
    getClient(clientID)
  }, [getClient, clientID])

  React.useEffect(() => {
    setChatClient(clientID)
  }, [setChatClient, clientID])

  React.useEffect(() => {
    getMessages(clientID)
  }, [getMessages, clientID])

  const messagesEndRef = React.useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(scrollToBottom, [messages])

  const [content, setContent] = React.useState('')

  const onSubmit = e => {
    e.preventDefault()
    var formData = {
      content,
      client: clientID,
      writer: admin._id,
      writtenBy: 'admin'
    }
    addNewMessage(formData)
    setContent('')
  }

  return (
    <div className='admin-client-messages'>
      <div className='h4 pt-2 pl-1'>
        Messages
      </div>
      <div className='row'>
        <div className='col-lg-3'>
          <AdminMessagesSidebar />
        </div>
        <div className='col-lg-9'>
          <div className='bg-white m-1 rounded-lg p-3 overflow'>
            <div style={{ marginBottom: '70px' }}>
              {messages.map((item, index) =>
                <div key={index} className='mt-2'>
                  <div className={'font-13 ' + (item.writer._id === adminID ? 'text-right' : '')}>
                    <b>{item.writer._id === adminID ? 'Admin' : `${item.writer.firstName} ${item.writer.lastName}`}, {formatDateTime(item.date)}</b>
                    {item.writer._id === adminID ? <i onClick={() => window.confirm('Are you sure?') ? deleteMessage(clientID, item._id, 'admin') : null} className='fa fa-trash-o cursor-pointer pl-2'></i> : null}
                  </div>
                  <div className={'p-1 message-item rounded ' + (item.writer._id === adminID ? 'ml-auto' : '')}>
                    {item.content}
                  </div>
                </div>
              )}
            </div>

            <div style={{ position: 'absolute', bottom: '10px', width: 'calc(100% - 85px)' }}>
              <form onSubmit={onSubmit} className='form'>
                <div className='input-group'>
                  <textarea
                    type='text'
                    placeholder={`Send a message to ${admin.firstName}`}
                    name='content'
                    className='form-control'
                    value={content}
                    row={1}
                    onChange={e => setContent(e.target.value)}
                    required
                  />
                  <div className="input-group-append">
                    <button className="btn badge-pending" type="submit"><i className='fa fa-paper-plane-o'></i></button>
                  </div>
                </div>
              </form>
            </div>

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div >
  )
}

const mapStateToProps = state => ({
  client: state.admin.adminClient,
  admin: state.auth.user,
  adminID: state.auth.user._id,
  messages: state.message.messages
})

export default connect(mapStateToProps, { getClient, setChatClient, addNewMessage, deleteMessage, getMessages })(AdminClientMessages)