import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Provider as PaperProvider } from 'react-native-paper';

import LoginForm from 'components/LogScreen/LoginForm'
import images from 'res/images';

export default class LogScreen extends Component {
  static navigationOptions = {
    headerShown: false
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <>
        <PaperProvider>
          <View style={ style.container }>
            <Image source={ images.logo } />
            <LoginForm navigate={ navigate } />
          </View>
        </PaperProvider>
      </>
    );
  }
};

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-evenly"
  }
});
