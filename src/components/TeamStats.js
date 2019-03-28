import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid } from 'react-native-easy-grid';
import {Text} from 'native-base';
import {Dimensions} from 'react-native';
import trails from '../models/trails';
import {trailDetailCell} from '../styles/styles';
import SvgUri from 'react-native-svg-uri';
import {main} from '../styles/colors';


const TeamStats = ({hikes, team})=>{
  const miles = hikes.reduce((total, hike) => {
    return trails[hike.trailKey].length + total;
  }, 0);
  const members = [...new Set(hikes.map(hike => hike.user))];

  const {width} = Dimensions.get('window');
  return (
    <Grid>
      <Row>
        <Col style={{alignItems: 'center', paddingTop: 20, paddingBottom: 20, backgroundColor: main}}>
          <Text style={{ fontFamily: 'American Typewriter', fontSize: 14, letterSpacing: 3, textAlign: 'center'}}>{team != null ? 'Your team: ' + team : 'You have not joined a team!'}</Text>
        </Col>
      </Row>
      <Row style={{height: width / 3}}>
        <Col style={trailDetailCell(0)}>
          <SvgUri width="80" height="80" style={{ marginBottom: 5 }} source={require('../../assets/adventure/svg/047-map.svg')} />
          <Text>{miles} miles</Text>
        </Col>
        <Col style={trailDetailCell(1)}>
          <SvgUri width="80" height="80" style={{ marginBottom: 5 }} source={require('../../assets/individual/boot.svg')} />
          <Text>{hikes.length} hikes</Text>
        </Col>
        <Col style={trailDetailCell(0)}>
        <SvgUri width="80" height="80" style={{ marginBottom: 5 }} source={require('../../assets/adventure/svg/002-tent.svg')} />

          <Text>{members.length} members</Text>
        </Col>
      </Row>
    </Grid>
  )
};

TeamStats.propTypes = {
  hikes: PropTypes.array.isRequired,
  team: PropTypes.string
}

TeamStats.defaultProps ={
  team: null
}

export default TeamStats;
