/* global require */
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {Font} from 'expo';
import * as firebase from 'firebase';

import TrailsScreen from './src/screens/TrailsScreen'
import LoginScreen from './src/screens/LoginScreen';
import LogHikeScreen from './src/screens/LogHike';
import TrailDetailScreen from './src/screens/TrailDetailScreen';
import UserHikesScreen from './src/screens/UserHikesScreen';
import UserTeamScreen from './src/screens/UserTeamScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import { config } from './config';

const RootStack = createStackNavigator(
  {
    TrailDetail: TrailDetailScreen,
    Trails: TrailsScreen,
    Login: LoginScreen,
    LogHike: LogHikeScreen,
    UserHikes: UserHikesScreen,
    UserTeam: UserTeamScreen,
    Leaderboard: LeaderboardScreen
  },
  {
    initialRouteName: 'Login',
  }
);

export default class App extends React.Component {
  state = {
      firebaseInitialized: false,
      fontLoaded: false
    }

  async componentDidMount(){
    await firebase.initializeApp(config);
    this.setState({firebaseInitialized: true});
    await Font.loadAsync({
      'News Cycle': require('./assets/fonts/NewsCycle-Regular.ttf'),
      'News Cycle Bold': require('./assets/fonts/NewsCycle-Bold.ttf'),
      'Poppins': require('./assets/fonts/Poppins-Regular.ttf')
    });
    this.setState({fontLoaded: true})
  }

  render() {
    return (
        (this.state.firebaseInitialized && this.state.fontLoaded) ?
        <RootStack/> :
          null
    );
  }
}
