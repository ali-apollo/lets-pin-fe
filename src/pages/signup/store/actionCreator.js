import {
  ON_CHANGE_SIGNUSERNAME,
  ON_CHANGE_SIGNPASSWORD,
  ON_CHANGE_COMFIRMPWD,
  SET_STATUS,
  UPDATE_MSG
} from "./constants";
import post from '../../../lib/post'
import get from "../../../lib/get";

export const setStatusAction = (value) => ({
  type: SET_STATUS,
  value
});

export const onUsernameChangeAction = (value) => ({
  type: ON_CHANGE_SIGNUSERNAME,
  value
});

export const onPasswordChangeAction = (value) => ({
  type: ON_CHANGE_SIGNPASSWORD,
  value
});

export const onComfirmPwdChangeAction = (value) => ({
  type: ON_CHANGE_COMFIRMPWD,
  value
});

const updateStatusMessage = value => ({
  type: UPDATE_MSG,
  value
});

export const signupAsyncAction = (username, password, comfirmPwd) => {
  console.log(username, password, comfirmPwd)
  return dispatch => {
    if (!username || !password || !comfirmPwd) {
      dispatch(updateStatusMessage('请输入用户名和密码'));
      return setTimeout(() => {
        dispatch(updateStatusMessage(''));
      }, 1000)
    }
    if (password !== comfirmPwd) {
      dispatch(updateStatusMessage('两次输入密码不一致'));
      return setTimeout(() => {
        dispatch(updateStatusMessage(''));
      }, 1000)
    }

    let data = {
      username,
      password
    };
    new Promise(resolve => {
      let ret = post('http://localhost:7001/users/signup', data, '');
      resolve(ret)
    })
      .then(ret => {
        console.log(ret)
        dispatch(setStatusAction(ret.status));
        if (ret.status === 2) {
          dispatch(setStatusAction(0));
          // 清空表单信息
          dispatch(onUsernameChangeAction(''))
          dispatch(onPasswordChangeAction(''))
          dispatch(onComfirmPwdChangeAction(''))
          dispatch(updateStatusMessage(ret.message));
          setTimeout(() => {
            dispatch(updateStatusMessage(''));
          }, 1000)
        } else {
          dispatch(updateStatusMessage(ret.message));
        }
      })
      .catch(err => {
        throw new Error(err)
      })
  }
};