import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import {Container, Content, Text} from 'native-base';
import {darkTan, main} from '../styles/colors';
import HikesList from '../components/HikesList';
import UserStats from '../components/UserStats';


export default class UserHikesScreen extends Component {
  static navigationOptions = () => {
    return({
      title: 'My Hikes',
      headerTitleStyle: {
        fontFamily: 'American Typewriter',
        letterSpacing: 3,
        fontWeight: 'normal'
      },
      headerTintColor: 'black',
      headerStyle: {
        backgroundColor: main,
      },
    });
  };

  constructor(props){
    super(props);

    this.state = {
      uid: firebase.auth().currentUser.uid,
      hikes: props.navigation.state.params.hikes
    }
  }

  render() {
    const {hikes} = this.state;
    return(
      <Container style={{backgroundColor: darkTan}}>
        <Content>
          {
            hikes.length == 0 ?
            <Text style={{textAlign: 'center', padding: 20, fontFamily: 'American Typewriter'}}>Nothing to display yet!</Text> :
              <React.Fragment>
                <UserStats hikes={hikes}/>
                <HikesList hikes={hikes}/>
              </React.Fragment>
          }
        </Content>
      </Container>

    );
  }
}

UserHikesScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
