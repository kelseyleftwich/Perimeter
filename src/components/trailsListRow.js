import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Text, Icon, Body, Badge, Right } from 'native-base';
import SvgUri from 'react-native-svg-uri';
import {forestGreen} from '../styles/colors';

const TrailsListRow = ({trail, onRowPress, userHikes}) => {
  
  const mostRecentHike = userHikes.length > 0 ?
    userHikes.reduce((latest, hike) => {
      if(latest == null){
        return hike.date;
      }
      if(hike.date > latest){
        return hike.date;
      }
      return latest;
    }, null) :
    null;

  return(
      <ListItem style={{backgroundColor: '#ebd5b3'}} onPress={() => { onRowPress(trail); }}>
        {
          trail.icon ?
          <SvgUri width="80" height="80" source={trail.icon} /> :
          <SvgUri width="80" height="80" style={{ opacity: 0.5 }} source={require('../../assets/outdoors/compass-3.svg')} /> // eslint-disable-line
        }
        <Body>

          <Text>{trail.name}</Text>
          {
            userHikes.length > 0 &&
            <Badge style={{backgroundColor: forestGreen, marginLeft: 10, marginTop: 10}}>
              <Text>{new Date(mostRecentHike).toDateString()}</Text>
            </Badge>
          }
        </Body>
        <Right>
          <Icon name="arrow-forward"/>
        </Right>
      </ListItem>
  );
}

TrailsListRow.propTypes = {
  trail: PropTypes.object.isRequired,
  onRowPress: PropTypes.func.isRequired,
  userHikes: PropTypes.array.isRequired
};

export default TrailsListRow;
