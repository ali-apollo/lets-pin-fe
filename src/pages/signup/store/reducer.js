import {
  ON_CHANGE_SIGNUSERNAME,
  ON_CHANGE_SIGNPASSWORD,
  ON_CHANGE_COMFIRMPWD,
  UPDATE_MSG,
  SET_STATUS,
} from './constants'

const defaultState = {
  signUsername: '',
  signPassword: '',
  comfirmPwd: '',
  message: '',
  status: -2,
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch(action.type) {
    case ON_CHANGE_SIGNUSERNAME:
      newState.signUsername = action.value
      return newState
    case ON_CHANGE_SIGNPASSWORD:
      newState.signPassword = action.value
      return newState
    case ON_CHANGE_COMFIRMPWD:
      newState.comfirmPwd = action.value
      return newState
    case SET_STATUS:
      newState.status = action.value
      return newState
    case UPDATE_MSG:
      newState.message = action.value
      return newState
    default:
      return newState
  }
}
