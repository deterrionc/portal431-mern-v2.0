import api from '../utils/api'
// import { setAlert } from './alert'
import {
  ADMIN_UNREAD_MESSAGES_LOADED,
  CLIENT_UNREAD_MESSAGES_LOADED,
  MESSAGES_LOADED,
} from './types'

export const addNewMessage = (formData) => async dispatch => {
  const res = await api.post('/message/addNewMessage', formData)

  if (res.data.success) {
    dispatch(getMessages(formData.client))
  }
}

export const getMessages = clientID => async dispatch => {
  const res = await api.get(`/message/getMessages/${clientID}`)

  if (res.data.success) {
    dispatch({
      type: MESSAGES_LOADED,
      payload: res.data.messages
    })
  }
}

export const deleteMessage = (clientID, messageID, written = 'client') => async dispatch => {
  const res = await api.delete(`/message/deleteMessage/?clientID=${clientID}&id=${messageID}&written=${written}`)

  if (res.data.success) {
    dispatch(getMessages(clientID))
  }
}

export const getClientsMessageNumbers = async () => {
  const res = await api.get('/message/getClientsMessageNumbers')
  
  if (res.data.success) {
    return res.data.clientsMessageNumbers
  }
}

export const getAdminMessageNumbers = async (clientID) => {
  const res = await api.get(`/message/getAdminMessageNumbers/${clientID}`)

  if (res.data.success) {
    return res.data.adminMessageNumbers
  }
}

export const messagesRead = (clientID, seen = 'client') => async dispatch => {
  const res = await api.get(`/message/messagesRead/?clientID=${clientID}&seen=${seen}`)

  if (res.data.success) {
    if (seen === 'admin') {
      dispatch(getAdminUnreadMessages())
    } else {
      dispatch(getClientUnreadMessages(clientID))
    }
  }
}

export const getAdminUnreadMessages = () => async dispatch => {
  const res = await api.get('/message/getAdminUnreadMessages')

  if (res.data.success) {
    dispatch({
      type: ADMIN_UNREAD_MESSAGES_LOADED,
      payload: res.data.adminUnreadMessages
    })
  }
}

export const getClientUnreadMessages = (clientID) => async dispatch => {
  const res = await api.get(`/message/getClientUnreadMessages/${clientID}`)

  if (res.data.success) {
    dispatch({
      type: CLIENT_UNREAD_MESSAGES_LOADED,
      payload: res.data.clientUnreadMessages
    })
  }
}