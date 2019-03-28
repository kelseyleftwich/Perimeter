/* global require */
import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Text, Dimensions} from 'react-native';
import {Container, Content} from 'native-base';
import SvgUri from 'react-native-svg-uri';
import { Row, Col, Grid } from 'react-native-easy-grid';
import {shadowTan} from '../../styles/colors';
import {trailDetailCell} from '../../styles/styles';



const NavigationModal = ({visible, setModalVisible, goToMyHikes, goToMyTeam, goToLeaderboard}) => {
  const {height, width} = Dimensions.get('window');



  return(
    visible ?
      <Modal
        transparent={false}

        >
        <Container style={{backgroundColor: shadowTan}}>
        <Container style={{
          top: (height - width) / 2
        }}>
          <Content>
            <Grid>
              <Row style={{height: width / 2}}>
                <Col style={trailDetailCell(1)}  onPress={goToMyHikes}>
                  <SvgUri width="80" height="80" style={{marginBottom: 5}} source={require('../../../assets/adventure/svg/049-backpack.svg')}/>
                  <Text>My Hikes</Text>
                </Col>
                <Col style={trailDetailCell(0)} onPress={goToMyTeam}>
                  <SvgUri width="80" height="80" style={{marginBottom: 5}} source={require('../../../assets/adventure/svg/002-tent.svg')}/>
                  <Text>My Team</Text>
                </Col>
              </Row>
              <Row style={{height: width / 2}}>
                <Col style={trailDetailCell(0)} onPress={goToLeaderboard}>
                  <SvgUri width="80" height="80" style={{marginBottom: 5}} source={require('../../../assets/individual/victory.svg')}/>
                  <Text>Leaderboard</Text>
                </Col>
                <Col style={trailDetailCell(1)} onPress={setModalVisible}><Text>Close</Text></Col>
              </Row>
            </Grid>
          </Content>
        </Container>
        </Container>
      </Modal>

    : null
  );
}

NavigationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  goToMyHikes: PropTypes.func.isRequired,
  goToMyTeam: PropTypes.func.isRequired,
  goToLeaderboard: PropTypes.func.isRequired
}

export default NavigationModal;
