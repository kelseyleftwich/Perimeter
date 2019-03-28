import {StyleSheet} from 'react-native';
import {main, lightGray, darkTan, shadowTan} from './colors';

export const colors = {
  blue: '#83b3be'
};

const commonStyles = StyleSheet.create({
  tanButton: {
    backgroundColor: main,
  },
  loginTextStyle: {
    fontFamily: 'American Typewriter',
    color: 'lightgray',
    fontWeight: 'normal'
  },
  loginTextStyleActive: {
    fontFamily: 'American Typewriter',
    color: 'black',
    fontWeight: 'normal'
  },
  trailDetailTable: {
    flex: 1, margin: 20
  },
  trailDetailCellTitle: {
    padding: 10,
    flexWrap: 'wrap',
    borderColor: 'navy',
    borderWidth: 1
  },

  trailDetailCellLast: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
    borderRightWidth: 0,
    padding: 10
  }
});

export const trailDetailCell = (index) => {
  return ({
    backgroundColor: index % 2 == 0 ? main : darkTan,
    alignItems: 'center',
    justifyContent: 'center'
  })
};

export default commonStyles;
