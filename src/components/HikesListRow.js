import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Text, Body, Badge } from 'native-base';
import SvgUri from 'react-native-svg-uri';
import {forestGreen} from '../styles/colors';
import trails from '../models/trails';

const HikesListRow = ({hike}) => {
  const trail = trails[hike.trailKey];

  return(
      <ListItem style={{backgroundColor: '#ebd5b3'}}>
        {
          trail.icon ?
          <SvgUri width="80" height="80" source={trail.icon} /> :
          <SvgUri width="80" height="80" style={{ opacity: 0.5 }} source={require('../../assets/outdoors/compass-3.svg')} /> // eslint-disable-line
        }
        <Body>
          <Text>{trail.name}</Text>
          <Badge style={{backgroundColor: forestGreen, marginLeft: 10, marginTop: 10}}>
            <Text>{new Date(hike.date).toDateString()}</Text>
          </Badge>
        </Body>
      </ListItem>
  );
}

HikesListRow.propTypes = {
  hike: PropTypes.object.isRequired
};

export default HikesListRow;
