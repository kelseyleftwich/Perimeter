import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DatePickerIOS, Dimensions, Alert} from 'react-native';
import {Header} from 'react-navigation';
import {Container, Content, Text, Button} from 'native-base';
import { Row, Col, Grid } from 'react-native-easy-grid';
import {main, darkTan, forestGreen} from '../styles/colors';
import {trailDetailCell} from '../styles/styles';
import * as firebase from 'firebase';



export default class LogHikeScreen extends Component {
  static navigationOptions = () => {
    return({
      title: '',
      headerTitleStyle: {
        fontFamily: 'American Typewriter',
        letterSpacing: 3,
        fontWeight: 'normal'
      },
      headerStyle: {
        backgroundColor: main,
      },
      headerTintColor: 'black',
      headerBackTitleStyle: {
        fontFamily: 'American Typewriter',
        color: 'black',
      }
    });
  };

  constructor(props){
    super(props);

    this.state = {
      trail: props.navigation.state.params.trail,
      chosenDate: new Date(),
      uid: firebase.auth().currentUser.uid
    }

    this.setDate = this.setDate.bind(this);
    this.saveHike = this.saveHike.bind(this);
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate})
  }

  saveHike(){
    const {navigation} = this.props;

    const hike = {
      trailKey: this.state.trail.key,
      trail: this.state.trail.name,
      date: this.state.chosenDate,
      user: this.state.uid,
      team: navigation.state.params.team
    };

    const entryKey = firebase.database().ref().child('hikes').push().key;
    let updates = {};
    updates['/hikes/' + entryKey] = hike;
    updates['/user-hikes/' + this.state.uid + '/' + entryKey] = hike;
    if(navigation.state.params.team != null){
      updates['/team-hikes/' + navigation.state.params.team + '/' + entryKey] = hike;
    }

    return firebase.database().ref().update(updates, function(error) {
        if (error) {
          Alert.alert('Error!', error.toString());
        } else {
          Alert.alert('Success!', 'Hike logged!');
          navigation.state.params.addHike(hike);
          navigation.goBack();
        }
      });
  }

  render(){
    const {trail} = this.state;
    const {height} = Dimensions.get('window');
    const titleHeight = (height - Header.HEIGHT) / 12;
    const maxDate = new Date();
    return(
      <Container style={{backgroundColor: darkTan}}>
        <Content>
        <Grid>
          <Row style={{height: titleHeight}}>
            <Col style={trailDetailCell(0)}>
              <Text style={{fontFamily: 'American Typewriter', fontSize: 20, margin: 10}}>{trail.name}</Text>
            </Col>
          </Row>
          <Row>
          <Col>
          <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={this.setDate}
            maximumDate={maxDate}
            mode="date"
          />
          </Col>
          </Row>
          <Row>
          <Col>
            <Button full
              style={{backgroundColor: forestGreen}}
              onPress={this.saveHike}>
              <Text style={{fontFamily: 'American Typewriter', fontSize: 20}}>Log Hike</Text>
            </Button>
          </Col>
          </Row>
          </Grid>
        </Content>
      </Container>

    );
  }
}

LogHikeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
