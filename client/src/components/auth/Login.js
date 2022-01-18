import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    login(email, password)
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <div className='container-fluid bg-admin'>
      <div className='row'>
        <div className='col-lg-3'></div>
        <div className='col-lg-6'>
          <div className='row'>
            <div className='col-1'></div>
            <div className='col-10'>
              <div className='row' style={{ height: '20%' }}></div>
              <div className='row bg-white height-center'>
                <div className='col p-5'>
                  <div className='h3 text-center text-bold' style={{ color: '#0071BD' }}>Login</div>
                  <form className='form' onSubmit={onSubmit}>
                    <div>email</div>
                    <div className='form-group'>
                      <input
                        type='email'
                        placeholder='email'
                        name='email'
                        className='form-control'
                        value={email}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div>Password</div>
                    <div className='form-group'>
                      <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        className='form-control'
                        value={password}
                        onChange={onChange}
                        minLength='6'
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='submit'
                        className='form-control btn'
                        style={{ backgroundColor: '#0071BD', color: 'white' }}
                        value='Login'
                      />
                    </div>
                    <div className='form-group'>
                      <Link
                        to='/register'
                        className='btn form-control'
                        style={{ backgroundColor: '#0071BD', color: 'white' }}
                      >
                        Register
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='col-1'></div>
          </div>
        </div>
        <div className='col-lg-3'></div>
      </div>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
