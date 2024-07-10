import React, {useContext} from 'react';
import {Input, Modal} from "@iqueue/ui-kit";
import {tokenContext} from "../provider/tokenProvider";

function Login(props) {
  const {login, setLogin,handleLogin} = useContext(tokenContext);
  return (
    <Modal
    title="Login"
    isOpened={login}
    onClose={() => setLogin(false)}
    footerActions={[
      {
        title: "Close",
        danger: true
      },
      {
        title: "Submit",
        submit: true,
        primary: true
      }]}
    onApply={val => handleLogin(val.username, val.password)}
    >
      <Input
        placeholder={'Username'}
        // type={'text'}
        name={'username'}
        required
      />
      <Input
        placeholder={'Password'}
        type={'password'}
        name={'password'}
        required
      />
    </Modal>
  );
}

export default Login;