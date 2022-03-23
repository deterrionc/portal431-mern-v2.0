import React from 'react'
import { connect } from 'react-redux'
import { documenetsPendingCheck } from '../../utils/clientDocuments'
import Spinner from '../layout/Spinner'
import { updateAccount } from '../../actions/client'
import { useHistory } from 'react-router-dom'

const ClientAccount = ({ client, updateAccount }) => {

  const history = useHistory()

  const [formData, setFormData] = React.useState({ firstName: '', lastName: '', email: '', password: '', phoneNumber: '', dateOfBirth: '', billingAddress: '', nameOfLLC: '', einOfLLC: '', addressOfLLC: '', nameOfStore: '', bankAccount: '', bankRouting: '', emailOfFacebook: '', passwordOfFacebook: '', amazonLogin: '', amazonPassword: '', amazonPrime: '', frontCardLink: '', backCardLink: '' })

  const { firstName, lastName, email, password, phoneNumber, dateOfBirth, billingAddress, nameOfLLC, einOfLLC, addressOfLLC, nameOfStore, bankAccount, bankRouting, emailOfFacebook, passwordOfFacebook, amazonLogin, amazonPassword, amazonPrime, frontCardLink, backCardLink } = formData

  React.useEffect(() => {
    let _formData = { ...client }
    _formData.dateOfBirth = client.dateOfBirth.slice(0, 10)
    _formData.password = client.passwordForUpdate
    setFormData(_formData)
  }, [client])

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [isUploading, setIsUploading] = React.useState(false)

  const onSubmit = e => {
    e.preventDefault()
    updateAccount(client._id, formData, history)
    setIsUploading(true)
  }

  return (
    <div className='admin-client client-account admin-new-clients'>
      <div className='h4 pt-2'>
        My Account
      </div>
      <div>
        <span className={'text-white badge ' + (documenetsPendingCheck(client) === 'All Documents Approved' ? 'badge-info' : 'badge-pending')}><i className='fa fa-exclamation-triangle'></i> {documenetsPendingCheck(client)}</span>
      </div>
      <div className='bg-white rounded-lg p-3 mt-3'>
        {isUploading
          ?
          <Spinner />
          :
          <form className='form' onSubmit={onSubmit}>
            <div className='row'>
              <div className='col-md-6'>First Name:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='firstName'
                    value={firstName}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>Last Name:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='lastName'
                    value={lastName}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>Email Address:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='email'
                    value={email}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>Password:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
                  <input
                    type='password'
                    className='form-control'
                    name='password'
                    value={password}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>Phone Number:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='phoneNumber'
                    value={phoneNumber}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>D.O.B:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
                  <input
                    type='date'
                    className='form-control'
                    name='dateOfBirth'
                    value={dateOfBirth}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>Billing Address:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
                  <input
                    className='form-control'
                    name='billingAddress'
                    value={billingAddress}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>Name of Facebook Shop LLC:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='nameOfLLC'
                    value={nameOfLLC}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>EIN of LLC:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='einOfLLC'
                    value={einOfLLC}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>Address on file of LLC:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='addressOfLLC'
                    value={addressOfLLC}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>Name Of Store:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='nameOfStore'
                    value={nameOfStore}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>Bank Account Number for Sales Revenue:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='bankAccount'
                    value={bankAccount}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>Bank Routing Number for Sales Revenue:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
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
              <div className='col-md-6'>Facebook Login Email:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='emailOfFacebook'
                    value={emailOfFacebook}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>Facebook Login Password:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='passwordOfFacebook'
                    value={passwordOfFacebook}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>Amazon Store Login:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='amazonLogin'
                    value={amazonLogin}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>Amazon Store Password:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='amazonPassword'
                    value={amazonPassword}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>Amazon Prime:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='amazonPrime'
                    value={amazonPrime}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>Picture of Front of the Card:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
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
              </div>
              <div className='col-md-6'>Picture of Back of the Card:</div>
              <div className='col-md-6 pl-4'>
                <div className='form-group'>
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
              <div className='col-md-12 text-right mt-5'>
                <button className='btn badge-pending'>Submit</button>
              </div>
            </div>
          </form>
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  client: state.auth.user,
})

export default connect(mapStateToProps, { updateAccount })(ClientAccount)