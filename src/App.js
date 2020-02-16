import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

import AlbumScreen from 'screens/AlbumScreen';
import DetailScreen from 'screens/DetailScreen';
import FavoriteScreen from 'screens/FavoriteScreen';
import HomeScreen from 'screens/HomeScreen';
import LogScreen from 'screens/LogScreen';
import SearchScreen from 'screens/SearchScreen';

const AuthNavigator = createStackNavigator({ Log: { screen: LogScreen } });

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Album: { screen: AlbumScreen },
  Detail: { screen: DetailScreen },
  Favorite: { screen: FavoriteScreen },
  Search: { screen: SearchScreen }
});

const RootNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    Main: MainNavigator,
  },
  {
    initialRouteName: "Auth"
  }
);

const App = createAppContainer(RootNavigator);

export default App;
