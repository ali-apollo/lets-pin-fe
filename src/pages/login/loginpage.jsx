import React, {useState, useEffect} from 'react';
import {
  BottomText,
  Content,
  UserIdInputBox,
  PwdInputBox,
  RememberMeBox,
  InputName,
  LoginBtn,
  LoginWrapper,
  Prompt,
  Title,
  MainPicture,
  SecondPicture,
  BtnBox
} from './style'
import {connect} from 'react-redux'
import {actionCreator} from './store'
import {Link, Redirect} from 'react-router-dom'

function LoginPage({userId, password, message, status, remember, onChangeUserId, onChangePassword, login, setRemember}) {
  const [height, setHeight] = useState(document.documentElement.clientHeight);

  return (
    <LoginWrapper style={{height: `${height}px`}}>
      <MainPicture/>
      <SecondPicture/>
      <Content>
        <Title>
          许多人可以一起玩的拼图游戏
        </Title>
        <UserIdInputBox>
          <InputName>账号</InputName>
          <input
            placeholder="请输入您的账号"
            value={userId}
            onChange={e => onChangeUserId(e)}
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
        <RememberMeBox>
          <InputName>记住我</InputName>
          <input
            type="checkbox"
            checked={JSON.parse(remember)}
            onChange={e => setRemember(e)}
          />
        </RememberMeBox>
        <Prompt active={message}>{message}</Prompt>
        <BtnBox>
          <LoginBtn><Link to="/signup/">注册</Link></LoginBtn>
          <LoginBtn onClick={() => login(userId, password)}>登录</LoginBtn>
        </BtnBox>
      </Content>
      {status === 1 ? <Redirect to={"/home/"}/> : null}
    </LoginWrapper>
  );
}

const mapStateToProps = state => {
  console.log(state)
  return {
    userId: state.login.userId,
    password: state.login.password,
    message: state.login.message,
    status: state.login.status,
    remember: state.login.remember,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeUserId(e) {
      dispatch(actionCreator.onUserIdChangeAction(e.target.value))
    },
    onChangePassword(e) {
      dispatch(actionCreator.onPasswordChangeAction(e.target.value))
    },
    login(userId, password) {
      dispatch(actionCreator.loginAsyncAction(userId, password))
    },
    setRemember(e) {
      dispatch(actionCreator.setRemember(e.target.checked))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
