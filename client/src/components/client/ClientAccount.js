import React from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../../utils/formatDate1'
import { getDocumentList } from '../../utils/clientDocuments'
import { documenetsPendingCheck } from '../../utils/clientDocuments'

const ClientAccount = ({ client }) => {

  return (
    <div className='admin-client client-account'>
      <div className='h4 pt-2'>
        My Account
      </div>
      <div>
        <span className={'text-white badge ' + (documenetsPendingCheck(client) === 'All Documents Approved' ? 'badge-info' : 'badge-pending')}><i className='fa fa-exclamation-triangle'></i> {documenetsPendingCheck(client)}</span>
      </div>
      <div className='bg-white rounded-lg p-3 mt-3'>
        <div className='row'>
          <div className='col-md-6'>First Name:</div>
          <div className='col-md-6 pl-4'>{client.firstName}</div>
          <div className='col-md-6'>Last Name:</div>
          <div className='col-md-6 pl-4'>{client.lastName}</div>
          <div className='col-md-6'>Email Address:</div>
          <div className='col-md-6 pl-4'>{client.email}</div>
          <div className='col-md-6'>Phone Number:</div>
          <div className='col-md-6 pl-4'>{client.phoneNumber}</div>
          <div className='col-md-6'>D.O.B:</div>
          <div className='col-md-6 pl-4'>{formatDate(client.dateOfBirth)}</div>
          <div className='col-md-6'>Name of Facebook Shop LLC:</div>
          <div className='col-md-6 pl-4'>{client.nameOfLLC}</div>
          <div className='col-md-6'>EIN of LLC:</div>
          <div className='col-md-6 pl-4'>{client.einOfLLC}</div>
          <div className='col-md-6'>Address on file of LLC:</div>
          <div className='col-md-6 pl-4'>{client.addressOfLLC}</div>
          <div className='col-md-6'>Name Of Store:</div>
          <div className='col-md-6 pl-4'>{client.nameOfStore}</div>
          <div className='col-md-6'>Bank Account Number for Sales Revenue:</div>
          <div className='col-md-6 pl-4'>{client.bankAccount}</div>
          <div className='col-md-6'>Bank Routing Number for Sales Revenue:</div>
          <div className='col-md-6 pl-4'>{client.bankRouting}</div>
          <div className='col-md-6'>Facebook Login Email:</div>
          <div className='col-md-6 pl-4'>{client.emailOfFacebook}</div>
          <div className='col-md-6'>Facebook Login Password:</div>
          <div className='col-md-6 pl-4'>{client.passwordOfFacebook}</div>
          <div className='col-md-6'>Amazon Store Login:</div>
          <div className='col-md-6 pl-4'>{client.amazonLogin}</div>
          <div className='col-md-6'>Amazon Store Password:</div>
          <div className='col-md-6 pl-4'>{client.amazonPassword}</div>
          <div className='col-md-6'>Amazon Prime:</div>
          <div className='col-md-6 pl-4'>{client.amazonPrime}</div>
        </div>

        <div className='table-responsive pt-4'>
          <table className='table'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Document</th>
                <th>Content</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {getDocumentList(client).map((item, index) =>
                <tr key={index}>
                  <td>{formatDate(client.date)}</td>
                  <td>{item.name}</td>
                  <td style={{
                    maxWidth: '200px',
                    wordBreak: 'break-all'
                  }}><a href={item.path} target='_blank' rel='noreferrer'>{item.path}</a></td>
                  <td><span className={item.status === 'Pending' ? 'text-danger' : 'text-secondary'}>{item.status}</span></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  client: state.auth.user,
})

export default connect(mapStateToProps, {})(ClientAccount)