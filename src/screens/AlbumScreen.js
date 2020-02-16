import React, { Component } from 'react';

import {
  ActivityIndicator,
  FAB,
  Portal,
  Provider as PaperProvider,
} from 'react-native-paper';

import ImagePicker from 'react-native-image-picker';

import { getAlbumImages, uploadImageToAlbum } from 'common/networking/imgur';
import Header from 'components/AlbumScreen/Header';
import ImageList from 'components/ImageList';

export default class AlbumScreen extends Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.state = { fabOpen: false, loading: true };
    this.album = this.props.navigation.getParam("album");
  }

  componentDidMount() {
    getAlbumImages(this.props.navigation.getParam("loginfo"), this.album.id)
    .then((images) => {
      this.setState({ images: images });
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      this.setState({ loading: false });
    });
  }

  _uploadImage() {
    console.log('upload');
    const options = {
      title: 'Upload to Imgur'
    };
    let image_uri;
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel || response.error)
        return ;
      uploadImageToAlbum(this.props.navigation.getParam("loginfo"), this.album.id, response);
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <>
        <PaperProvider>
          <Portal.Host style={{ width: "100%" }}>
            <Header albumTitle={ this.album.title } navigation={ this.props.navigation } />
            <ActivityIndicator animating={ this.state.loading } style={{ alignSelf: "center", marginTop: "25%", position: "absolute" }} />
            <ImageList header={ this.album.description } items={ this.state.images } loginfo={ this.props.navigation.getParam("loginfo") } navigation={ this.props.navigation } />
            <Portal>
              <FAB.Group
                actions={[
                  { icon: 'upload', onPress: () => this._uploadImage() }
                ]}
                icon={ 'dots-vertical' }
                onStateChange={ ({ open }) => this.setState({ fabOpen: open }) }
                open={ this.state.fabOpen }
                visible={ !this.album.in_gallery }
                />
            </Portal>
          </Portal.Host>
        </PaperProvider>
      </>
      );
    }
};
