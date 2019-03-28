/* global Set, require */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid } from 'react-native-easy-grid';
import {Text, Badge} from 'native-base';
import {Dimensions} from 'react-native';
import trails, {perimeterCompleted} from '../models/trails';
import {trailDetailCell} from '../styles/styles';
import SvgUri from 'react-native-svg-uri';
import {main, forestGreen} from '../styles/colors';


const UserStats = ({hikes}) => {
  const miles = hikes.reduce((total, hike) => {
    return trails[hike.trailKey].length + total;
  }, 0);

  const trailCount = [...new Set(hikes.map(hike => hike.trail))].length;

  const {width} = Dimensions.get('window');
  return (
    <Grid>
      {
        perimeterCompleted() &&
        <Row style={{padding: 10, backgroundColor: main}}>
          <Col style={{alignItems: 'flex-end', justifyContent: 'center'}} size={20}>
            <SvgUri width="40" height="40" source={require('../../assets/individual/star.svg')} />
          </Col>
          <Col style={{alignItems: 'center', justifyContent: 'center'}} size={60}>
            <Badge style={{backgroundColor: forestGreen, alignSelf: 'center'}}>
              <Text>Perimeter Trail Completed</Text>
            </Badge>
          </Col>
          <Col style={{alignItems: 'flex-start', justifyContent: 'center'}} size={20}>
            <SvgUri width="40" height="40" source={require('../../assets/individual/star.svg')} />
          </Col>
        </Row>
      }
      <Row style={{height: width / 3}}>
        <Col style={trailDetailCell(0)}>
          <SvgUri width="80" height="80" style={{ marginBottom: 5 }} source={require('../../assets/adventure/svg/047-map.svg')} />
          <Text>{miles} {miles == 1 ? 'mile' : 'miles'}</Text>
        </Col>
        <Col style={trailDetailCell(1)}>
          <SvgUri width="80" height="80" style={{ marginBottom: 5 }} source={require('../../assets/individual/boot.svg')} />
          <Text>{hikes.length} {hikes.length == 1 ? 'hike' : 'hikes'}</Text>
        </Col>
        <Col style={trailDetailCell(0)}>
          <SvgUri width="80" height="80" style={{ marginBottom: 5 }} source={require('../../assets/adventure/svg/024-notebook.svg')} />
          <Text>{trailCount} {trailCount == 1 ? 'trail': 'trails'}</Text>
        </Col>
      </Row>
    </Grid>
  )
};

UserStats.propTypes = {
  hikes: PropTypes.array.isRequired
}

export default UserStats;
