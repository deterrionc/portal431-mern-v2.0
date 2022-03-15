import api from '../utils/api'
import { setAlert } from './alert'
import { loadUser } from './auth'
import { getAdminClients, getClient, setCurrentPage } from './admin'
import {
  CLIENT_NOTIFICATIONS_LOADED,
  CLIENT_ADMIN_LOADED
} from './types'

export const getNotifications = clientID => async dispatch => {
  const res = await api.get(`/client/getNotifications/${clientID}`)

  if (res.data.success) {
    dispatch({
      type: CLIENT_NOTIFICATIONS_LOADED,
      payload: res.data.notifications
    })
  }
}

export const deleteNotification = (clientID, notificationID) => async dispatch => {
  const res = await api.delete(`/client/deleteNotification/${notificationID}`)

  if (res.data.success) {
    dispatch(setAlert('Notification Deleted!', 'success'))
    dispatch(getNotifications(clientID))
  }
}

export const getAdmin = () => async dispatch => {
  const res = await api.get('/client/getAdmin')

  if (res.data.success) {
    dispatch({
      type: CLIENT_ADMIN_LOADED,
      payload: res.data.admin
    })
  }
}

export const updateAccount = (clientID, formData, history) => async dispatch => {
  const res = await api.post(`/client/updateAccount/${clientID}`, formData)

  if (res.data.success) {
    dispatch(setAlert('Your account is updated', 'success'))
    dispatch(loadUser())
    history.push('/')
  }
}

export const updateClient = (clientID, formData, history) => async dispatch => {
  const res = await api.post(`/client/updateClient/${clientID}`, formData)

  if (res.data.success) {
    dispatch(getClient(clientID))
    dispatch(setCurrentPage('document'))
    history.push('/clients')
  }
}

export const deleteClient = clientID => async dispatch => {
  const res = await api.delete(`/client/deleteClient/${clientID}`)

  if (res.data.success) {
    dispatch(getAdminClients())
  }
}