import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import {
  FAB,
  Portal,
  Provider as PaperProvider,
  Searchbar,
  ActivityIndicator
} from 'react-native-paper';

import Header from 'components/SearchScreen/Header';
import { searchGallery } from 'common/networking/imgur';
import AlbumList from 'components/HomeScreen/AlbumList';

export default class SearchScreen extends Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  _search(query) {
    this.setState({ loading: true });
    searchGallery(this.props.navigation.getParam("loginfo"), query)
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
    return (
      <>
        <PaperProvider>
          <Portal.Host style={{ width: "100%" }}>
            <Header navigation={ this.props.navigation } />
            <Searchbar onSubmitEditing={ (event) => this._search(event.nativeEvent.text) } placeholder="search" />
            <ActivityIndicator animating={ this.state.loading } style={{ alignSelf: "center", marginTop: "25%", position: "absolute" }} />
            <AlbumList items={ this.state.albums } loginfo={ this.props.navigation.getParam("loginfo") } navigation={ this.props.navigation } refreshList={ console.log } />
            <Portal>
              <FAB.Group
                open={ this.state.fabOpen }
                icon={ 'dots-vertical' }
                actions={[
                  { icon: 'filter', onPress: () => console.log('Pressed filter') }
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
