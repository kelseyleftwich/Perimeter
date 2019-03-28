/* global require */
import React, {Component} from 'react';
import {Container, Text, Content, Badge } from 'native-base';
import firebase from 'firebase';
import { Row, Col, Grid } from 'react-native-easy-grid';
import {main, darkTan, forestGreen, shadowTan} from '../styles/colors';
import trails from '../models/trails';
import SvgUri from 'react-native-svg-uri';




export default class LeaderboardScreen extends Component {
  static navigationOptions = () => {
    return({
      title: 'TRAILS',
      headerTitleStyle: {
        fontFamily: 'American Typewriter',
        fontSize: 24,
        letterSpacing: 3,
        fontWeight: 'normal'
      },
      headerStyle: {
        backgroundColor: main,
      },
      headerTintColor: 'black',
      headerBackTitle: ' ',
    })
  };

  constructor(props) {
    super(props);

    this.state = {
      loadingHikes: true,
      teamHikes: []
    };
  }

  componentDidMount() {
    const self = this;
    let hikes = [];
    firebase.database().ref('/team-hikes/').once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        let teamHikesObject = childSnapshot.val();
        let teamHikesArray = [];
        Object.keys(teamHikesObject).map(key => {
          teamHikesArray.push(teamHikesObject[key]);
        })
        hikes.push(teamHikesArray);
        self.setState({teamHikes: hikes});
      });
      self.setState({loadingHikes: false});
    });
  }
  render() {
    const {teamHikes} = this.state;
    return (
      <Container style={{backgroundColor: shadowTan}}>
        <Content>
          <Grid>
        {
          teamHikes.map(team => {
            return (
              {
                team: team[0].team,
                mileage: team.reduce((mileage, hike) => {
                  return mileage + trails[hike.trailKey].length;
                }, 0),
                hikes: team.length
              }
            );
          })
          .sort((a, b) => {
            if(a.mileage > b.mileage){
              return -1;
            }
            if(a.mileage < b.mileage){
              return 1;
            }
            return 0;
          })
          .map((team, index) => {

            return(
              <Row key={index} style={{backgroundColor: index % 2 == 0 ? main : darkTan, padding: 20}} >
                <Col>

                    {
                      index == 0 ?
                      <Row style={{padding: 5, marginBottom: 10}}>
                      <Col style={{alignItems: 'flex-end', justifyContent: 'center'}} size={20}>
                        <SvgUri width="40" height="40" source={require('../../assets/individual/star.svg')} />
                      </Col>
                      <Col style={{alignItems: 'center', justifyContent: 'center'}} size={60}>
                        <Text style={{fontFamily: 'American Typewriter', fontSize: 20, textAlign: 'center'}}>{team.team}</Text>
                      </Col>
                      <Col style={{alignItems: 'flex-start', justifyContent: 'center'}} size={20}>
                        <SvgUri width="40" height="40" source={require('../../assets/individual/star.svg')} />
                      </Col>
                      </Row>:
                      <Row style={{padding: 5, marginBottom: 10}}>
                        <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                          <Text style={{fontFamily: 'American Typewriter', fontSize: 20, textAlign: 'center'}}>{team.team}</Text>
                        </Col>
                      </Row>
                    }
                  <Row style={{padding: 5}}>
                    <Col>
                      <Badge style={{backgroundColor: forestGreen, marginLeft: 10, marginTop: 10}}>
                        <Text style={{fontFamily: 'American Typewriter'}}>{team.mileage} miles / {team.hikes} hikes</Text>
                      </Badge>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          })
        }
      </Grid>
      </Content>
      </Container>
    )
  }
}

LeaderboardScreen.propTypes = {

};
