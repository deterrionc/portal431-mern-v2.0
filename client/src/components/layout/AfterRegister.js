import React from 'react'
import { Link } from 'react-router-dom'

const AfterRegister = () => {

  return (
    <div className='container-fluid bg-Client bg-admin'>
      <div className='row'>
        <div className='col-lg-2 p-2 sidebar'>
          <div className='container-fluid'>
            <div className='row m-1 p-2 h5 bg-white rounded-lg'>
              <div className='d-flex justify-content-between align-items-center w-100'>
                <div>
                  <i className='fa fa-heart-o pt-2 mr-2 h6' style={{ color: '#A78BE2' }}></i>
                  <span>ProtoType</span>
                </div>
                <i className='fa fa-align-justify pt-2 mr-2 h6' style={{ color: '#A78BE2' }}></i>
              </div>
            </div>
            <div className='row mx-1 pt-4 h5'>
              Menu
            </div>
            <div className='row mx-1 h5 menuItem'>
              <div className='d-flex align-items-center'>
                <i className='fa fa-database pt-2 mr-2 h6'></i>
                <span>
                  <Link to='/register'>Registration</Link>
                </span>
              </div>
            </div>
            <div className='row mx-1 h5 menuItem signoutLink'>
              <div className='d-flex align-items-center'>
                <i className='fa fa-sign-out pt-2 mr-2 h6'></i>
                <span>
                  <Link to='/'>Login</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-10 col-md-8 p-3'>
          <div className='admin-header d-flex flex-row-reverse align-items-center pr-3'>
            <i className='fa fa-github-alt ml-2'></i>
            <i className='fa fa-bell ml-2'></i>
            <i className='fa fa-question-circle ml-2'></i>
            <div className='mr-1'>
              Feedback?
            </div>
          </div>
          <div>
            <div className='h4 py-2'>
              Registration
            </div>
            <div className='bg-white rounded-lg p-3'>
              <div className='text-center' style={{ paddingTop: '20%', paddingBottom: '20%' }}>
                <h3>
                  Your documents are currently being reviewed.
                </h3>
                <h3>
                  Please stay tuned for an update!
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AfterRegister