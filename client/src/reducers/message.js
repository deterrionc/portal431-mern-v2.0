import {
  ADMIN_UNREAD_MESSAGES_LOADED,
  CLIENT_UNREAD_MESSAGES_LOADED,
  MESSAGES_LOADED,
} from '../actions/types'

const initialState = {
  messages: [],
  adminUnreadMessages: [],
  clientUnreadMessages: 0
}

const messageReducer = (state = initialState, action) => {
  const {type, payload} = action

  switch (type) {
    case MESSAGES_LOADED: 
      return {
        ...state,
        messages: payload,
      }
    case ADMIN_UNREAD_MESSAGES_LOADED:
      return {
        ...state,
        adminUnreadMessages: payload
      }
    case CLIENT_UNREAD_MESSAGES_LOADED: 
      return {
        ...state,
        clientUnreadMessages: payload
      }
    default:
      return state
  }
}

export default messageReducer