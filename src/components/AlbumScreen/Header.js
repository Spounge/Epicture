import React, { Component } from 'react';

import {
  Appbar,
  Divider,
  Menu
} from 'react-native-paper';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  _back() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={ () => this._back() } />
        <Appbar.Content title={ this.props.albumTitle } />
      </Appbar.Header>
    );
  }
};
