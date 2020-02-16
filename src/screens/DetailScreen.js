import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import {
  Button,
  Provider as PaperProvider
} from 'react-native-paper';

export default class DetailScreen extends Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.image = this.props.navigation.getParam("image");
  }

  render() {
    return (
      <>
        <PaperProvider>
          <Header image={ this.image } navigation={ this.props.navigation } />
          <TouchableOpacity activeOpacity={ .75 } style={[ style.imageContainer, { height: this.props.navigation.getParam("height") } ]}>
            <Image resizeMode="contain" source={{ uri: this.image.link }} style={ style.image } />
          </TouchableOpacity>
          <View style={ style.bottomContainer }>
            <Button icon="eye">
              { this.image.views || 0 }
            </Button>
            <Button icon="arrow-up-bold">
              { this.image.vote || 0 }
            </Button>
          </View>
          <Text>Description: { this.image.description || "N/A" }</Text>
        </PaperProvider>
      </>
      );
    }
};

const style = StyleSheet.create({
  bottomContainer: {
    borderTopColor: "black",
    borderTopWidth: .5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginLeft: "5%",
    marginRight: "5%",
    padding: 10
  },
  image: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
  },
  imageContainer: {
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: "90%"
  }
});
