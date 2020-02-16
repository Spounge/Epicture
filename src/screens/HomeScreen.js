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

import { getUserAlbums } from 'common/networking/imgur';
import Header from 'components/HomeScreen/Header';
import AlbumList from 'components/HomeScreen/AlbumList';

export default class HomeScreen extends Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.state = { fabOpen: false, loading: false };
  }

  componentDidMount() {
    this._fetchAlbums();
  }

  _fetchAlbums() {
    this.setState({ loading: true });
    getUserAlbums(this.props.navigation.getParam("loginfo"))
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

  _goToFavorite() {
    this.props.navigation.navigate(
      "Favorite",
      {
        "loginfo": this.props.navigation.getParam("loginfo")
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
            <AlbumList items={ this.state.albums } loginfo={ this.props.navigation.getParam("loginfo") } navigation={ this.props.navigation } refreshList={ this._fetchAlbums.bind(this) } />
            <Portal>
              <FAB.Group
                open={ this.state.fabOpen }
                icon={ 'dots-vertical' }
                actions={[
                  { icon: 'filter', onPress: () => console.log('Pressed filter') },
                  { icon: 'star', onPress: () => this._goToFavorite() },
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
