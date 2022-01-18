import {
  CLIENT_NOTIFICATIONS_LOADED,
  CLIENT_ADMIN_LOADED
} from '../actions/types'

const initialState = {
  notifications: [],
  clientAdmin: {
    _id: '',
    firstName: '',
    lastName: ''
  }
}

const clientReducer = (state = initialState, action) => {
  const {type, payload} = action

  switch (type) {
    case CLIENT_NOTIFICATIONS_LOADED: 
      return {
        ...state,
        notifications: payload,
      }
    case CLIENT_ADMIN_LOADED:
      return {
        ...state,
        clientAdmin: payload
      }
    default:
      return state
  }
}

export default clientReducer