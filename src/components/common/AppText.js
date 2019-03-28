import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'native-base';

const AppText = ({text}) => {
  return(
    <Text style={{fontFamily: 'American Typewriter'}}>
      {text}
    </Text>
  )
};

AppText.propTypes = {
   text: PropTypes.string
}
export default AppText;
