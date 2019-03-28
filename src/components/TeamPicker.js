import React from 'react';
import PropTypes from 'prop-types';
import {Item, Picker, Icon, List, ListItem, Text} from 'native-base';
import {darkTan} from '../styles/colors';

const TeamPicker = ({teams, onSelectedValue}) => {
  /*return(
    <Item picker style={{alignSelf: 'center', borderBottomWidth: 0}}>
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="ios-arrow-down-outline" color={forestGreen} />}
        style={{ width: undefined, alignSelf: 'center', borderBottomWidth: 0 }}
        placeholder="Join a Team"
        placeholderStyle={{ color: 'black', fontFamily: 'American Typewriter' }}
        placeholderIconColor='black'
        onValueChange={onSelectedValue}
        >
        {
          teams.map((team, index) => {
            return(
              <Picker.Item key={index} label={team} value={team}/>
            )
          })
        }
      </Picker>
    </Item>
  )*/
  return(
    <React.Fragment>
    <Text style={{textAlign: 'center', paddingBottom: 20, fontSize: 20, fontFamily: 'American Typewriter'}}>{'Join a team:'}</Text>
    <List>
      {
        teams.map((team, index) => {
          return(
            <ListItem noIndent key={index} onPress={() => onSelectedValue(team)} style={{backgroundColor: index%2==0? darkTan : null, borderBottomColor: darkTan}}>
              <Text style={{fontFamily: 'American Typewriter', padding: 20}}>{team}</Text>
            </ListItem>
          )
        })
      }
    </List>
  </React.Fragment>
  )

};

TeamPicker.propTypes = {
  teams: PropTypes.array.isRequired,
  onSelectedValue: PropTypes.func.isRequired
};

export default TeamPicker;
