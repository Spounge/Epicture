import React, { Component } from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

import {
  Button,
  TextInput
} from 'react-native-paper';

import { login } from 'common/networking/imgur';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMsg: "",
      loginIn: false,
    };
  }

  _submit () {
    this.setState({ loginIn: true });
    login()
    .then((loginfo) => {
      if (loginfo.error) {
        this.setState({ error: true, errorMsg: loginfo.error, loginIn: false })
      } else {
        this.props.navigate("Home", { "loginfo": loginfo });
      }
    });
  }

  render () {
    return (
      <>
        <Button
          icon="login"
          loading={ this.state.loginIn }
          mode="contained"
          onPress={ () => this._submit() }
          style={ style.button }>
          Log In with Imgur
        </Button>
        <Text
          style={[
            style.errMsgLogIn,
            { opacity: this.state.error ? 1 : 0 }
          ]}>
          { this.state.errorMsg }
        </Text>
      </>
    );
  }
};

const style = StyleSheet.create({
  button: {
    marginTop: 70
  },
  inputField: {
    marginBottom: 10,
    width: "90%"
  },
  errMsgEmail: {
    color: "red",
    // cuts text in half on One Plus 6
    // fontWeight: "bold",
    marginBottom: 10
  },
  errMsgLogIn: {
    color: "red",
    // cuts text in half on One Plus 6
    // fontWeight: "bold",
    marginTop: 10
  }
});
