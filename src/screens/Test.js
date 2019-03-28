import React from 'react';
import {View } from 'react-native';
import {Text} from 'native-base';

export default class TestScreen extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   return({
  //     title: <Text style={{ fontFamily: 'American Typewriter', fontSize: 24}}>Trails</Text>
  //   });
  // };

  render() {
    return(
      <View>
        <Text>Test Screen</Text>
      </View>
    )
  }
}
