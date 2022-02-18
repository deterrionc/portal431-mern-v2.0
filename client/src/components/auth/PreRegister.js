import React from 'react'
import { connect } from 'react-redux'
import Vimeo from '@u-wave/react-vimeo'
import { Link } from 'react-router-dom'

const PreRegister = () => {

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12 m-5'>
          <div className="text-center mb-4">
            <Vimeo
              video='354682480'
              responsive={true}
            />
          </div>
          <div className='text-right'>
            <Link className='btn btn-info btn-sm' to={'/register'}>continue</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(PreRegister)