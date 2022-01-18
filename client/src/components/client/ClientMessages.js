import React from 'react'
import { connect } from 'react-redux'
import { addNewMessage, getMessages, deleteMessage, messagesRead } from '../../actions/message'
import { getAdmin } from '../../actions/client'
import { formatDateTime } from '../../utils/formatDate1'

const ClientMessages = ({ clientID, addNewMessage, getMessages, deleteMessage, messages, getAdmin, admin, messagesRead }) => {
  React.useEffect(() => {
    getMessages(clientID)
  }, [getMessages, clientID])

  React.useEffect(() => {
    getAdmin()
  }, [getAdmin])

  React.useEffect(() => {
    messagesRead(clientID)
  }, [messagesRead, clientID])

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
      writer: clientID
    }
    addNewMessage(formData)
    setContent('')
  }

  return (
    <div className='admin-client-messages'>
      <div className='h4 pt-2 pl-1'>
        Messages
      </div>

      <div className='bg-white m-1 rounded-lg p-3 overflow'>
        <div style={{ marginBottom: '80px' }}>
          {messages.map((item, index) =>
            <div key={index} className='mt-2'>
              <div className={'font-13 ' + (item.writer._id === clientID ? 'text-right' : '')}>
                <b>{item.writer._id === clientID ? `${item.writer.firstName} ${item.writer.lastName}` : 'Admin'}, {formatDateTime(item.date)}</b>
                {item.writer._id === clientID ? <i onClick={() => window.confirm('Are you sure?') ? deleteMessage(clientID, item._id) : null} className='fa fa-trash-o cursor-pointer pl-2'></i> : null}
              </div>
              <div className={'p-1 message-item rounded ' + (item.writer._id === clientID ? 'ml-auto' : '')}>
                {item.content}
              </div>
            </div>
          )}
        </div>

        <div style={{ position: 'absolute', bottom: '40px', width: 'calc(100% - 85px)' }}>
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
    </div >
  )
}

const mapStateToProps = state => ({
  client: state.auth.user,
  messages: state.message.messages,
  clientID: state.auth.user._id,
  admin: state.client.clientAdmin
})

export default connect(mapStateToProps, { addNewMessage, getMessages, deleteMessage, getAdmin, messagesRead })(ClientMessages)