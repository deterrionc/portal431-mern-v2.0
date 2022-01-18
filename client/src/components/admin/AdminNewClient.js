import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { addNewClient } from '../../actions/admin'
import Spinner from '../layout/Spinner'

const AddNewClient = ({ addNewClient }) => {
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
    frontCardLink: '',
    backCardLink: ''
  })

  const { firstName, lastName, email, password, phoneNumber, dateOfBirth, nameOfLLC, einOfLLC, addressOfLLC, nameOfStore, bankAccount, bankRouting, emailOfFacebook, passwordOfFacebook, frontCardLink, backCardLink } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    setIsUploading(true)
    addNewClient(formData, history)
  }

  return (
    <div className='admin-new-clients'>
      <div className='h4 py-2'>
        New Client
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
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { addNewClient })(AddNewClient)