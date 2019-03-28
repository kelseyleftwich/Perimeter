import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'native-base';
import HikesListRow from './HikesListRow';

const HikesList = ({hikes}) => {
  return(
    <List>
      {
        hikes
        .sort((a,b) => {
          if(a.date < b.date){
            return 1;
          }
          if(a.date > b.date){
            return -1;
          }
          return 0;
        })
        .map(hike => {
          return (
            <HikesListRow key={hike.date} hike={hike}/>
          );
        })
      }
    </List>
  );
}

HikesList.propTypes = {
  hikes: PropTypes.array.isRequired
}

export default HikesList;
