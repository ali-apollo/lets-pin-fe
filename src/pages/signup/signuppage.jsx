import React, {useState, useEffect} from 'react';
import {
  Content,
  UserIdInputBox,
  PwdInputBox,
  InputName,
  LoginBtn,
  LoginWrapper,
  Title,
  MainPicture,
  SecondPicture,
  Prompt,
  BtnBox
} from './style'
import {connect} from 'react-redux'
import {actionCreator} from './store'
import { Redirect, Link } from 'react-router-dom'

function SignupPage({username, password, comfirmPwd, message, status, onChangeUsername, onChangePassword, onChangeComfirmPwd, signup}) {
  const [height, setHeight] = useState(document.documentElement.clientHeight);

  return (
    <LoginWrapper style={{height: `${height}px`}}>
      <MainPicture/>
      <SecondPicture/>
      <Content>
        <Title>
          注册页
        </Title>
        <UserIdInputBox>
          <InputName>账号</InputName>
          <input
            placeholder="请输入您的账号"
            value={username}
            onChange={e => onChangeUsername(e)}
          />
        </UserIdInputBox>
        <PwdInputBox>
          <InputName>密码</InputName>
          <input
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={e => onChangePassword(e)}
          />
        </PwdInputBox>
        <PwdInputBox>
          <InputName>确认密码</InputName>
          <input
            type="password"
            placeholder="请再次输入密码"
            value={comfirmPwd}
            onChange={e => onChangeComfirmPwd(e)}
          />
        </PwdInputBox>
        <Prompt active={message}>{message}</Prompt>
        <BtnBox>
          <LoginBtn onClick={() => signup(username, password, comfirmPwd)}>注册</LoginBtn>
          <LoginBtn><Link to="/login/">返回</Link></LoginBtn>
        </BtnBox>
      </Content>
      {status === 2 ? <Redirect to={"/login/"}/> : null}
    </LoginWrapper>
  );
}

const mapStateToProps = state => {
  // console.log(state)
  return {
    username: state.signup.signUsername,
    password: state.signup.signPassword,
    comfirmPwd: state.signup.comfirmPwd,
    status: state.signup.status,
    message: state.signup.message
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeUsername(e) {
      dispatch(actionCreator.onUsernameChangeAction(e.target.value))
    },
    onChangePassword(e) {
      dispatch(actionCreator.onPasswordChangeAction(e.target.value))
    },
    onChangeComfirmPwd(e) {
      dispatch(actionCreator.onComfirmPwdChangeAction(e.target.value))
    },
    signup(username, password, comfirmPwd) {
      dispatch(actionCreator.signupAsyncAction(username, password, comfirmPwd))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
