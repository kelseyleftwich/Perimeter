import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, List, Spinner, Button, Icon, Text } from 'native-base';
import firebase from 'firebase';
import {main, darkTan} from '../styles/colors';
import trails from '../models/trails';
import TrailsList from '../components/trailsList';
import NavigationModal from '../components/common/NavigationModal';

export default class TrailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return({
      title: 'TRAILS',
      headerTitleStyle: {
        fontFamily: 'American Typewriter',
        fontSize: 24,
        letterSpacing: 3,
        fontWeight: 'normal'
      },
      headerStyle: {
        backgroundColor: main,
      },
      headerTintColor: 'black',
      headerBackTitle: ' ',
      headerRight: (
        navigation.state.params && navigation.state.params.setModalVisible ?
        <Button transparent
          onPress={navigation.state.params.setModalVisible}
          ><Icon name="menu" style={{color: 'black'}} /></Button>
        :
        <Button transparent
          onPress={()=> {}}
          ><Icon name="menu" style={{color: 'black'}} /></Button>
      )
    });
  };

  constructor(props){
    super(props);

    this.state = {
      loadingHikes: true,
      loadingTeam: true,
      uid: firebase.auth().currentUser.uid,
      hikes: [],
      modalVisible: false,
      team: null
    }

    this.onTrailRowPress = this.onTrailRowPress.bind(this);
    this.updateHikes = this.updateHikes.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.navigateToUserHikes = this.navigateToUserHikes.bind(this);
    this.navigateToUserTeam = this.navigateToUserTeam.bind(this);
    this.navigateToLeaderboard = this.navigateToLeaderboard.bind(this);
  }

  componentDidMount() {
    const self = this;
    const {navigation} = this.props;
    navigation.setParams({setModalVisible: self.setModalVisible});

    let hikes = [];
    firebase.database().ref('/user-hikes/' + this.state.uid).orderByChild('date').once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        let entry = childSnapshot.val();
        entry.key = childSnapshot.key;
        hikes.push(entry);
        self.setState({hikes: hikes});
      });
      self.setState({loadingHikes: false});
    });
    firebase.database().ref('/user-teams/' + this.state.uid).orderByChild('date').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          let team = childSnapshot.val();
          self.setState({team: team});
        });
      self.setState({loadingTeam: false});
    });



  }

  onTrailRowPress(trail) {
    const {navigation} = this.props;
    const {team} = this.state;
    const hikes = this.state.hikes.filter(hike => hike.trail == trail.name);
    navigation.navigate('TrailDetail', {trail: trail, userHikes: hikes, updateHikes: this.updateHikes, team: team});
  }

  updateHikes(hike){
    let hikes = [...this.state.hikes];
    hikes.push(hike);
    this.setState({hikes: hikes});
  }

  setModalVisible(){
    const visible = this.state.modalVisible;
    this.setState({modalVisible: !visible});
  }

  navigateToUserHikes(){
    const {navigation} = this.props;
    const {hikes} = this.state;
    this.setModalVisible();
    navigation.navigate('UserHikes', {hikes: hikes});
  }

  navigateToUserTeam(){
    const {navigation} = this.props;
    const {team} = this.state;
    this.setModalVisible();
    navigation.navigate('UserTeam', {team: team});
  }

  navigateToLeaderboard() {
    const {navigation} = this.props;
    this.setModalVisible();
    navigation.navigate('Leaderboard');
  }

  render() {
    const {modalVisible} = this.state;
    return (
      <Container style={{backgroundColor: darkTan}}>
        <Content>
          <NavigationModal visible={modalVisible} setModalVisible={this.setModalVisible} goToLeaderboard={this.navigateToLeaderboard} goToMyHikes={this.navigateToUserHikes} goToMyTeam={this.navigateToUserTeam}/>
          {
            this.state.loadingHikes || this.state.loadingTeam ?
            <React.Fragment>
              <Spinner/>
              <Text style={{textAlign: 'center', fontFamily: 'American Typewriter', fontSize: 20, margin: 20}}>Loading hikes and trails...</Text>
            </React.Fragment>
            :
            <List style={{backgroundColor: darkTan}}>
              <TrailsList trails={trails} perimeter={true} onRowPress={this.onTrailRowPress} userHikes={this.state.hikes}/>
              <TrailsList trails={trails} perimeter={false} onRowPress={this.onTrailRowPress} userHikes={this.state.hikes}/>
            </List>

          }
        </Content>
      </Container>
    );
  }
}

TrailsScreen.propTypes= {
  navigation: PropTypes.object.isRequired
}
