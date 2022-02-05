import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { register } from '../../actions/auth'
import { Link } from 'react-router-dom'
import logoImage from '../../img/common/logo.png'
import Spinner from '../layout/Spinner'

const Register = ({ register }) => {
  const history = useHistory()
  const [isUploading, setIsUploading] = React.useState(false)

  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    dateOfBirth: '',
    nameOfLLC: '',
    einOfLLC: '',
    addressOfLLC: '',
    nameOfStore: '',
    bankAccount: '',
    bankRouting: '',
    emailOfFacebook: '',
    passwordOfFacebook: '',
    amazonLogin: '',
    amazonPassword: '',
    amazonPrime: '',
    frontCardLink: '',
    backCardLink: ''
  })

  const { firstName, lastName, email, password, phoneNumber, dateOfBirth, nameOfLLC, einOfLLC, addressOfLLC, nameOfStore, bankAccount, bankRouting, emailOfFacebook, passwordOfFacebook, amazonLogin, amazonPassword, amazonPrime, frontCardLink, backCardLink } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    register(formData, history)
    setIsUploading(true)
  }

  return (
    <div className='container-fluid bg-Client bg-admin'>
      <div className='row'>
        <div className='col-lg-2 p-2 sidebar'>
          <div className='container-fluid'>
            <img className='img-fluid rounded mt-4' src={logoImage} alt='logo' />
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
          <div className='admin-new-clients'>
            <div className='h4 py-2'>
              Registration
            </div>
            <div className='bg-white rounded-lg p-3'>
              {isUploading
                ?
                <Spinner />
                :
                <form className='form' onSubmit={onSubmit}>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label>First Name</label>
                        <input
                          type='text'
                          className='form-control'
                          name='firstName'
                          value={firstName}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>Last Name</label>
                        <input
                          type='text'
                          className='form-control'
                          name='lastName'
                          value={lastName}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>Email Address</label>
                        <input
                          type='text'
                          className='form-control'
                          name='email'
                          value={email}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>Password For This Website</label>
                        <input
                          type='password'
                          className='form-control'
                          name='password'
                          value={password}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>Phone Number</label>
                        <input
                          type='text'
                          className='form-control'
                          name='phoneNumber'
                          value={phoneNumber}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>Date of Birth</label>
                        <input
                          type='date'
                          className='form-control'
                          name='dateOfBirth'
                          value={dateOfBirth}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>Name of Your LLC to be used for the Facebook Shop</label>
                        <input
                          type='text'
                          className='form-control'
                          name='nameOfLLC'
                          value={nameOfLLC}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>What is the EIN of this LLC?</label>
                        <input
                          type='text'
                          className='form-control'
                          name='einOfLLC'
                          value={einOfLLC}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>What is the addresss on file of this LLC?</label>
                        <input
                          type='text'
                          className='form-control'
                          name='addressOfLLC'
                          value={addressOfLLC}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>What would you like the name of your store to be? (If you'd like us to choose, write "You Choose")</label>
                        <input
                          type='text'
                          className='form-control'
                          name='nameOfStore'
                          value={nameOfStore}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>Bank Account Number for Sales Revenue</label>
                        <input
                          type='text'
                          className='form-control'
                          name='bankAccount'
                          value={bankAccount}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>Bank Routing Number for Sales Revenue</label>
                        <input
                          type='text'
                          className='form-control'
                          name='bankRouting'
                          value={bankRouting}
                          onChange={onChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label>Facebook Login EMAIL. (If you created your Facebook with a phone number, please go into settings and find the email associated, please associate one with your Facebook and provide that email to us below)</label>
                        <input
                          type='text'
                          className='form-control'
                          name='emailOfFacebook'
                          value={emailOfFacebook}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>Facebook login PASSWORD</label>
                        <input
                          type='text'
                          className='form-control'
                          name='passwordOfFacebook'
                          value={passwordOfFacebook}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>Amazon Store Login</label>
                        <input
                          type='text'
                          className='form-control'
                          name='amazonLogin'
                          value={amazonLogin}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>Amazon Store Password</label>
                        <input
                          type='text'
                          className='form-control'
                          name='amazonPassword'
                          value={amazonPassword}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>Do you have Amazon Prime? If so, how long have you had it?</label>
                        <input
                          type='text'
                          className='form-control'
                          name='amazonPrime'
                          value={amazonPrime}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className='form-group mt-3'>
                        <b>Credit Card for Cost of Goods</b>
                      </div>
                      <div className='form-group'>
                        <label>Picture of Front of the Card</label>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Upload DropBox / Google Drive Link'
                          name='frontCardLink'
                          value={frontCardLink}
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>Picture of Back of the Card</label>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Upload DropBox / Google Drive Link'
                          name='backCardLink'
                          value={backCardLink}
                          onChange={onChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='col-md-12'>
                      <div className="form-check my-2">
                        <label className="form-check-label">
                          <input type="checkbox" className="form-check-input" value="" required />
                          <div>Schedule a call with the onboarding manager. (Click on the Calendly link and schedule a call at your convenience.)</div>
                        </label>
                        <a rel="noreferrer" href='https://calendly.com/metamarketplacestores/onboarding' target='_blank'>https://calendly.com/metamarketplacestores/onboarding</a>
                      </div>
                      <div className="form-check my-2">
                        <label className="form-check-label">
                          <input type="checkbox" className="form-check-input" value="" required />
                          <div>Give us all the Facebook info and let us take care of everything for you.</div>
                        </label>
                        <p>2 Factor Authentication will need to be turned off)</p>
                      </div>
                    </div>
                  </div>
                  <div className='form-group pt-3'>
                    <input
                      type='submit'
                      className='form-control'
                      style={{ backgroundColor: '#A78BE2' }}
                      value='Submit'
                    />
                  </div>
                </form>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { register })(Register)