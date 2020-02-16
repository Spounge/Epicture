import React, { Component } from 'react';

import {
  Appbar,
  Divider,
  Menu
} from 'react-native-paper';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { visibleMenu: false };
  }

  _back() {
    this.props.navigation.goBack();
  }

  _closeMenu() {
    this.setState({ visibleMenu: false });
  }

  _openMenu() {
    this.setState({ visibleMenu: true });
  }

  render() {
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={ () => this._back() } />
        <Appbar.Content title="Search" />
      </Appbar.Header>
    );
  }
};
