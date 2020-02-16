import React, { Component } from 'react';

import {
  Appbar,
  Divider,
  Menu
} from 'react-native-paper';

import { revokeToken } from 'common/networking/imgur';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  _disconnect() {
    this.props.navigation.navigate("Log");
  }

  _search() {
    this.props.navigation.navigate(
      "Search",
      {
        "loginfo": this.props.loginfo
      }
      );
  }

  render() {
    return (
      <Appbar.Header>
        <Appbar.Action icon="logout" onPress={ () => this._disconnect() } />
        <Appbar.Content title="My Albums" />
        <Appbar.Action icon="magnify" onPress={ () => this._search() } />
      </Appbar.Header>
    );
  }
};
