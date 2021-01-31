import {
  ON_CHANGE_USERID,
  ON_CHANGE_PASSWORD,
  SET_TOKEN,
  UPDATE_MSG,
  SET_STATUS,
  SET_NAME,
  SET_REMEMBER
} from './constants'

const defaultState = {
  username: window.localStorage.getItem('username'),
  token: window.localStorage.getItem('token'),
  userId: window.localStorage.getItem('username') || '',
  password: '',
  message: '',
  status: window.localStorage.getItem('status'),
  remember: window.localStorage.getItem('remember'),
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch(action.type) {
    case SET_NAME:
      newState.username = action.value;
      return newState
    case ON_CHANGE_USERID:
      newState.userId = action.value
      return newState
    case ON_CHANGE_PASSWORD:
      newState.password = action.value
      return newState
    case SET_STATUS:
      newState.status = action.value
      return newState
    case SET_TOKEN:
      newState.token = action.value
      return newState
    case UPDATE_MSG:
      newState.message = action.value
      return newState
    case SET_REMEMBER:
      newState.remember = action.value
      window.localStorage.setItem('remember', action.value)
      return newState
    default:
      return newState
  }
}
