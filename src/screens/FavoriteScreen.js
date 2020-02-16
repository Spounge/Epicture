import React, { Component } from 'react';
import {
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import {
  ActivityIndicator,
  FAB,
  Portal,
  Provider as PaperProvider,
} from 'react-native-paper';

import { getUserFavorites } from 'common/networking/imgur';
import Header from 'components/FavoriteScreen/Header';
import AlbumList from 'components/HomeScreen/AlbumList';

export default class FavoriteScreen extends Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.state = { fabOpen: false, loading: true };
  }

  componentDidMount() {
    getUserFavorites(this.props.navigation.getParam("loginfo"))
    .then((albums) => {
      this.setState({ albums: albums });
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <>
        <PaperProvider>
          <Portal.Host style={{ width: "100%" }}>
            <Header loginfo={ this.props.navigation.getParam("loginfo") } navigation={ this.props.navigation } />
            <ActivityIndicator animating={ this.state.loading } style={{ alignSelf: "center", marginTop: "25%", position: "absolute" }} />
            <AlbumList items={ this.state.albums } loginfo={ this.props.navigation.getParam("loginfo") } navigation={ this.props.navigation } />
            <Portal>
              <FAB.Group
                open={ this.state.fabOpen }
                icon={ 'dots-vertical' }
                actions={[
                  { icon: 'filter', onPress: () => console.log('Pressed filter') },
                  { icon: 'settings', onPress: () => console.log('Pressed settings') }
                ]}
                onStateChange={ ({ open }) => this.setState({ fabOpen: open }) }
                />
            </Portal>
          </Portal.Host>
        </PaperProvider>
      </>
      );
    }
};
