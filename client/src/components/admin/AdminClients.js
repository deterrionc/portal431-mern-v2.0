import React from 'react'
import { connect } from 'react-redux'
import { getAdminClients, goPage } from '../../actions/admin'
import { useHistory } from 'react-router'
import { formatDate } from '../../utils/formatDate1'
import { documenetsPendingCheck } from '../../utils/clientDocuments'
import { deleteClient } from '../../actions/client'

const AdminClients = ({ getAdminClients, clients, goPage, deleteClient }) => {
  const history = useHistory()

  React.useEffect(() => {
    getAdminClients()
  }, [getAdminClients])

  return (
    <div className='container admin-clients'>
      <div className='h4 pt-2'>
        Clients
      </div>
      <div className='d-flex flex-row-reverse search'>
        <div className='p-2'>
          <div className='h-auto border rounded-lg'>
            <span>
              <i className='fa fa-search mx-2'></i>
              <input placeholder='Search' className='border border-0' style={{ outline: 'none', width: '70%' }} />
            </span>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='bg-white rounded-lg p-3 w-100'>
          <button className='btn btn-info' onClick={() => goPage(history, 'addClient')}>+ Add Client</button>
          <div className='table-responsive'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>D.O.B</th>
                  <th>Business Email</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((item, index) =>
                  <tr key={index} onClick={() => goPage(history, `client/${item._id}`)}>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.dateOfBirth}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td><span className={'badge ' + (documenetsPendingCheck(item) === 'All Documents Approved' ? 'badge-info' : 'badge-pending')}>{documenetsPendingCheck(item)}</span></td>
                    <td>
                      <button
                        className='btn btn-sm btn-info'
                        onClick={e => {
                          e.stopPropagation()
                          if (window.confirm('Are you sure?')) {
                            deleteClient(item._id)
                          }
                        }}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  clients: state.admin.clients
})

export default connect(mapStateToProps, { getAdminClients, goPage, deleteClient })(AdminClients)