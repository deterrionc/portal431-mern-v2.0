import React from 'react'
import { connect } from 'react-redux'
import { getAdminClients, setChatClient } from '../../../actions/admin'
import { goPage } from '../../../actions/admin'
import { useHistory } from 'react-router'

const AdminMessagesSidebar = ({ getAdminClients, clients, goPage, setChatClient, clientID }) => {
  const history = useHistory()

  React.useEffect(() => {
    getAdminClients()
  }, [getAdminClients])

  const [searchKey, setSearchKey] = React.useState('')
  const [showClients, setShowClients] = React.useState([])

  React.useEffect(() => {
    setShowClients(clients.filter(client => client.firstName.toLowerCase().includes(searchKey.toLowerCase()) || client.lastName.toLowerCase().includes(searchKey.toLowerCase())))
  }, [clients, searchKey])

  return (
    <div className='bg-white m-1 mb-4 rounded-lg'>
      <div className='p-2'>
        <div className='h-auto border rounded-lg'>
          <span>
            <i className='fa fa-search mx-2'></i>
            <input
              placeholder='Search'
              className='border border-0'
              style={{ outline: 'none', width: '70%' }}
              value={searchKey}
              onChange={e => setSearchKey(e.target.value)}
            />
          </span>
        </div>
      </div>
      <div className='px-2 h5'>
        Client List
      </div>
      <div className='p-2'>
        {showClients.map((item, index) =>
          <div key={index} onClick={() => {
            goPage(history, `messages/${item._id}`)
            setChatClient(item._id)
          }} className={'d-flex align-items-center p-1 rounded mb-1 link-item ' + (clientID === item._id ? 'selected' : '')}>
            <img src={item.avatar} alt='userAvatar' className='rounded-circle mr-2' width='40px' />
            <div style={{ lineHeight: '1' }}>
              <div>{`${item.firstName} ${item.lastName}`}</div>
              <small className='text-muted text-break'>{item.email}</small>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  clients: state.admin.clients,
  clientID: state.admin.clientIDForChat
})

export default connect(mapStateToProps, { getAdminClients, goPage, setChatClient })(AdminMessagesSidebar)