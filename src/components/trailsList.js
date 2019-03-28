import React from 'react';
import PropTypes from 'prop-types';
import {ListItem, Text} from 'native-base';
import TrailsListRow from './trailsListRow';
import {main} from '../styles/colors';

const TrailsList = ({trails, perimeter, onRowPress, userHikes}) => {
  return(
    <React.Fragment>
    <ListItem itemDivider style={{backgroundColor: main}}>
      <Text style={{ fontFamily: 'American Typewriter', fontSize: 20, letterSpacing: 3}}>{perimeter == true ? 'Perimeter' : 'OFF-Perimeter'}</Text>
    </ListItem>
    {
      Object.keys(trails)
      .map(key => {
        if(trails[key].perimeter_trail == perimeter){
          return <TrailsListRow key={key} trail={trails[key]} onRowPress={onRowPress} userHikes={userHikes.filter(hike => hike.trail == trails[key].name)}/>
        }
        return null;
      })
    }
    </React.Fragment>
  );
};

TrailsList.propTypes = {
  trails: PropTypes.object.isRequired,
  perimeter: PropTypes.bool.isRequired,
  onRowPress: PropTypes.func.isRequired,
  userHikes: PropTypes.array.isRequired
};

export default TrailsList;
