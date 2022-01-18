import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import { useHistory } from 'react-router-dom'
import { setCurrentPage } from '../../actions/admin'
import logoImage from '../../img/common/logo.png'

const AdminSidebar = ({ logout, setCurrentPage, currentPage }) => {
  let history = useHistory()

  const goPage = async location => {
    setCurrentPage(location)
    await history.push(`/`)
    await history.push(`/dashboard`)

    if (location === 'dashboard') {
      await history.push(`/dashboard/`)
      return
    }
    await history.push(`/dashboard/${location}`)
  }

  return (
    <div className='col-lg-2 col-md-4 p-2 pt-3 sidebar'>
      <div className='container-fluid'>
        <img className='img-fluid rounded mt-4' src={logoImage} alt='logo' />
        <div className='row mx-1 pt-4 h5'>
          Menu
        </div>
        <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'dashboard' ? 'selected' : '')} onClick={() => goPage('dashboard')}>
          <div className='d-flex align-items-center'>
            <div><i className='fa fa-database mr-2 h6'></i></div>
            <div>Dashboard</div>
          </div>
        </div>
        <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'clients' ? 'selected' : '')} onClick={() => goPage('clients')}>
          <div className='d-flex align-items-center'>
            <div><i className='fa fa-database mr-2 h6'></i></div>
            <div>Clients</div>
          </div>
        </div>
        <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'messages' ? 'selected' : '')} onClick={() => goPage('messages')}>
          <div className='d-flex align-items-center'>
            <div><i className='fa fa-wechat mr-2 h6'></i></div>
            <div>Messages</div>
          </div>
        </div>
        <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'education' ? 'selected' : '')} onClick={() => goPage('education')}>
          <div className='d-flex align-items-center'>
            <div><i className='fa fa-file-video-o mr-2 h6'></i></div>
            <div>Education</div>
          </div>
        </div>
        {/* <div className={'row mx-1 h5 menuItem rounded p-1 ' + (currentPage === 'settings' ? 'selected' : '')} onClick={() => goPage('settings')}>
          <div className='d-flex align-items-center'>
            <div><i className='fa fa-clock-o mr-2 h6'></i></div>
            <div>Settings</div>
          </div>
        </div> */}
        <div className='row mx-1 h5 menuItem rounded p-1 signoutLink' onClick={() => {
          setCurrentPage('dashboard')
          logout()
        }}>
          <div className='d-flex align-items-center'>
            <div><i className='fa fa-sign-out mr-2 h6'></i></div>
            <div>Sign Out</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  currentPage: state.admin.currentPage
})

export default connect(mapStateToProps, { logout, setCurrentPage })(AdminSidebar)
