import api from '../utils/api'
import { setAlert } from './alert'
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types'

// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/auth')

    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// Register User
export const register = (formData, history) => async dispatch => {
  const res = await api.post('/admin/addNewClient', formData)

  if (res.data.success) {
    dispatch(setAlert('Received your request!', 'success'))
  }
  history.push('after-register')
}

// Login User
export const login = (email, password) => async dispatch => {
  const body = { email, password }

  try {
    const res = await api.post('/auth', body)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Logout
export const logout = () => async dispatch => {
  dispatch({ type: LOGOUT })
}
