/* global require */
import React from 'react';
import PropTypes from 'prop-types';
import {Text, Dimensions } from 'react-native';
import { Row, Col, Grid } from 'react-native-easy-grid';
import {Container, Content, Icon, Button, Badge} from 'native-base';
import {Header} from 'react-navigation';
import SvgUri from 'react-native-svg-uri';
import {main, darkTan, forestGreen} from '../styles/colors';
import {trailDetailCell} from '../styles/styles';
import TrailheadMap from '../components/common/TrailheadMap';


class TrailDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
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
      },
      headerRight: (
        <Button transparent
          onPress={() => navigation.navigate('LogHike', {trail: navigation.state.params.trail, addHike: navigation.state.params.addHike, team: navigation.state.params.team})}
          >
          <Text style={{
              fontFamily: 'American Typewriter',
              color: 'black',
              marginRight: 10
            }}>
            Log Hike
          </Text>
      </Button>
      )
    });
  };

  constructor(props){
    super(props);

    this.state = {
      trail: props.navigation.state.params.trail,
      userHikes: props.navigation.state.params.userHikes
    }
    this.addHike = this.addHike.bind(this);
  }

  componentDidMount(){
    const {navigation} = this.props;
    navigation.setParams({addHike: this.addHike});
  }

  addHike(hike){
    const {navigation} = this.props;
    let userHikes = [...this.state.userHikes];
    userHikes.push(hike);
    this.setState({userHikes: userHikes});
    navigation.state.params.updateHikes(hike);
  }

  render(){
    const {trail, userHikes} = this.state;
    const {height} = Dimensions.get('window');
    const titleHeight = (height - Header.HEIGHT) / 12;
    const cellHeight = (height - Header.HEIGHT - titleHeight) / 3;

    return(
      <Container style={{backgroundColor: darkTan}}>
        <Content>
          <Grid>
            <Row style={{minHeight: titleHeight}}>
              <Col style={trailDetailCell(0)}>
                <Text style={{fontFamily: 'American Typewriter', fontSize: 20, margin: 10}}>{trail.name}</Text>
                {
                  userHikes.length > 0 &&
                  <Badge style={{backgroundColor: forestGreen, alignSelf: 'center', marginBottom: 10}}>
                    <Text style={{color: 'white'}}>{'You\'ve hiked this trail '}{userHikes.length} {userHikes.length > 1 ? 'times' : 'time'}.</Text>
                  </Badge>
                }
              </Col>
            </Row>
            <Row style={{height: cellHeight}}>
              <Col style={trailDetailCell(0)}>
                <SvgUri width="80" height="80" style={{ marginBottom: 5 }} source={require('../../assets/adventure/svg/047-map.svg')} />
                <Text>{trail.length} miles</Text>
              </Col>
              <Col style={trailDetailCell(1)}>
                <SvgUri width="80" height="80" style={{ marginBottom: 5 }} source={require('../../assets/individual/cycle.svg')} />
                <Text>{trail.perimeter_trail ? 'Perimeter Trail' : 'OFF-Perimeter'}</Text>
              </Col>
            </Row>
          </Grid>
          {
            (trail.longitude && trail.latitude) &&
            <TrailheadMap trail={trail} height={cellHeight}/>
          }
          <Grid>
            <Row style={{height: cellHeight}}>
              <Col style={trailDetailCell(1)}>
                <SvgUri width="80" height="80" style={{ marginBottom: 5 }} source={require('../../assets/individual/sign-post.svg')} />
                <Text>Trailheads: </Text>
                {
                  trail.trailheads &&
                  trail.trailheads.map((trailhead, index) => {
                    return <Text key={index}>{trailhead.name}</Text>
                  })
                }
              </Col>
              <Col style={trailDetailCell(0)}>
                <SvgUri width="80" height="80" style={{ marginBottom: 5 }} source={require('../../assets/individual/boot.svg')} />
                <Text>{trail.foot_travel_only ? 'Foot travel only: Yes' : 'Foot travel only: No'}</Text>
              </Col>
            </Row>
          </Grid>
        </Content>
        {

      }
      </Container>
    );
  }
}

TrailDetailScreen.propTypes = {
    navigation: PropTypes.object.isRequired
}

export default TrailDetailScreen;
