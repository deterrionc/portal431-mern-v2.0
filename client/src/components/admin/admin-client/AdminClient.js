import React from 'react'
import { connect } from 'react-redux'
import { getClient, setClientCurrentPage } from '../../../actions/admin'
import { documenetsPendingCheck } from '../../../utils/clientDocuments'
import Spinner from '../../layout/Spinner'
import AdminClientDocuments from './AdminClientDocuments'
import AdminClientStore from './AdminClientStore'
import AdminClientEdit from './AdminClientEdit'

const AdminClient = ({ match, getClient, client, setClientCurrentPage, currentPage }) => {

  React.useEffect(() => {
    getClient(match.params.id)
  }, [match, getClient])
  
  return (
    <div className='container admin-client'>
      {client ?
        <>
          <div className='h4 pt-2'>
            <span className='mr-1'>{client.firstName} {client.lastName}</span>
            <span>
              <i onClick={() => setClientCurrentPage('store')} className={'fa fa-shopping-cart p-2 mr-1 ' + (currentPage === 'store' ? 'client-current-page' : '')}></i>
              <i onClick={() => setClientCurrentPage('document')} className={'fa fa-address-book-o p-2 mr-1 ' + (currentPage === 'document' ? 'client-current-page' : '')}></i>
              <i onClick={() => setClientCurrentPage('setting')} className={'fa fa-gear p-2 ' + (currentPage === 'setting' ? 'client-current-page' : '')}></i>
            </span>
          </div>
          <div>
            <span className={'text-white badge ' + (documenetsPendingCheck(client) === 'All Documents Approved' ? 'badge-info' : 'badge-pending')}><i className='fa fa-exclamation-triangle'></i> {documenetsPendingCheck(client)}</span>
          </div>
          {currentPage === 'store' ? <AdminClientStore clientID={match.params.id} /> : null}
          {currentPage === 'document' ? <AdminClientDocuments /> : null}
          {currentPage === 'setting' ? <AdminClientEdit /> : null}
        </>
        : <Spinner />
      }
    </div>
  )
}

const mapStateToProps = state => ({
  client: state.admin.adminClient,
  currentPage: state.admin.adminClientCurrentPage
})

export default connect(mapStateToProps, { getClient, setClientCurrentPage })(AdminClient)