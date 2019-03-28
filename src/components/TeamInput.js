import React from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native';
import {Button, Text} from 'native-base';
import {darkTan, forestGreen} from '../styles/colors';

const TeamInput = ({onValueChange, inputText, onSubmit}) => {
  return(
    <React.Fragment>
      <TextInput
        placeholder="Input Team Name (emojis allowed 😉)"
        value={inputText}
        onChangeText={onValueChange}
        style={{backgroundColor: 'white', padding: 10, margin: 10, borderRadius: 5, borderBottomWidth: 1, borderColor: darkTan}}/>
      <Button full
        style={{backgroundColor: forestGreen}}
        onPress={onSubmit}>
        <Text style={{fontFamily: 'American Typewriter', fontSize: 20}}>Submit</Text>
      </Button>
    </React.Fragment>
  )
}

TeamInput.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  inputText: PropTypes.string.isRequired
}

export default TeamInput;
