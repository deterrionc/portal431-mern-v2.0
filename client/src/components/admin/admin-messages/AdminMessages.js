import React from 'react'
import { connect } from 'react-redux'
import AdminMessagesSidebar from './AdminMessagesSidebar'
import { Redirect } from 'react-router'

const AdminMessages = ({chatClientID}) => {
  if (chatClientID !== null) {
    return <Redirect to={`/messages/${chatClientID}`} />
  }

  return (
    <div className='admin-messages'>
      <div className='h4 pt-2 pl-1'>
        Messages
      </div>
      <div className='row'>
        <div className='col-lg-3'>
          <AdminMessagesSidebar />
        </div>
        <div className='col-lg-9'>
          <div className='bg-white m-1 rounded-lg' style={{ height: '85vh' }}>
            <div className='text-center'>
              <div style={{height: '40vh'}}></div>
              <h1>Select A Client You Want Chat.</h1>
              <div style={{height: '40vh'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  chatClientID: state.admin.clientIDForChat
})

export default connect(mapStateToProps, {})(AdminMessages)