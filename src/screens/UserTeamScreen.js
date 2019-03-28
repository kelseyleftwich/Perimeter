import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, Content, Spinner, Text} from 'native-base';
import {main, darkTan} from '../styles/colors';
import {Alert} from 'react-native';
import * as firebase from 'firebase';
import { Row, Col, Grid } from 'react-native-easy-grid';
import HikesList from '../components/HikesList';
import TeamStats from '../components/TeamStats';
import TeamPicker from '../components/TeamPicker';
import TeamInput from '../components/TeamInput';
import Filter from 'bad-words';

export default class UserTeamScreen extends Component {
  static navigationOptions = () => {
    return({
      title: 'Team Hikes',
      headerTitleStyle: {
        fontFamily: 'American Typewriter',
        letterSpacing: 3,
        fontWeight: 'normal'
      },
      headerStyle: {
        backgroundColor: main,
      },
      headerTintColor: 'black',
    });
  };

  constructor(props){
    super(props);

    this.state ={
      loading: true,
      hikes: [],
      teams: [],
      team: props.navigation.state.params.team,
      teamInput: '',
      uid: firebase.auth().currentUser.uid,
    };

    this.loadTeamHikes = this.loadTeamHikes.bind(this);
    this.onSelectedTeam = this.onSelectedTeam.bind(this);
    this.updateTeamInputState = this.updateTeamInputState.bind(this);
    this.submitTeam = this.submitTeam.bind(this);
  }

  componentDidMount(){

    const {team} = this.state;
    const self = this;

    if(team != null){
      this.loadTeamHikes();
    } else {
      let teams = [];
      firebase.database().ref('/teams').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          let entry = childSnapshot.val();
          entry.key = childSnapshot.key;
          teams.push(entry);
          self.setState({teams: teams});
        });
        self.setState({loading: false});
      });
    }
  }

  loadTeamHikes(value) {
    const {team} = this.state;
    const self = this;

    self.setState({loading: true});

    const teamArg = team == null ? value : team;


    let hikes = [];
    firebase.database().ref('/team-hikes/' + teamArg).orderByChild('date').once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        let entry = childSnapshot.val();
        entry.key = childSnapshot.key;
        hikes.push(entry);
        self.setState({hikes: hikes});
      });
      self.setState({loading: false});
    });
  }

  saveTeam(){
    const {uid, team} = this.state;
    const self = this;

    if(team == null) { return; }
    const entryKey = firebase.database().ref().child('user-teams').push().key;
    let updates = {};
    updates['/user-teams/' + uid + '/' + entryKey] = team;
    updates['/team-users/' + team + "/" + entryKey] = uid;

    return firebase.database().ref().update(updates, function(error) {
        if (error) {
          Alert.alert('Error!', error.toString());
        } else {
          Alert.alert('Success!', 'Team joined!');
          self.loadTeamHikes(team);
        }
      });
  }

  onSelectedTeam(value) {
    Alert.alert(
      'Join Team?',
      'Are you sure you want to join ' + value + '?',
      [
        {text: 'Maybe not...', onPress: () => {}, style: 'cancel'},
        {
          text: 'Yes!',
          onPress: () => {
            this.setState(
              {team: value},
              this.saveTeam
            )
          },
        },
      ],
      { cancelable: true }
    )
  }

  updateTeamInputState(text) {
    const filter = new Filter({ placeHolder: '😡'});
    if(filter.isProfane(text) || filter.isProfaneLike(text)){
      Alert.alert('Yo, profanity isn\'t allowed. Be cool, friend.');
    }
    this.setState({teamInput: filter.clean(text)});
  }

  submitTeam(){
    const {teams, teamInput} = this.state;
    const self = this;

    if(teams.indexOf(teamInput.trim()) != -1){
      Alert.alert('That name is already taken!', 'Select the team from the drop-down to join it!');
    } else {
      let updates = {};
      updates['/teams/' + teamInput] = teamInput;
      return firebase.database().ref().update(updates, function(error) {
        if (error) {
          Alert.alert('Error!', error.toString());
        } else {
          Alert.alert('Success!', 'Team created!');
          self.setState(
            {team: teamInput},
            self.saveTeam
          );
        }
      });
    }

  }

  render(){
    const {hikes, team, teams, teamInput} = this.state;

    const rowStyle = (index) => {
      return (
        {
          paddingTop: 20,
          paddingBottom: 0,
          backgroundColor: index % 2 == 0 ? main : darkTan
        }
      )
    };

    return(
      <Container style={{ backgroundColor: darkTan }}>
        <Content>
          {
            team != null ?
            <React.Fragment>
            <TeamStats hikes={hikes} team={team}/>
            {
              this.state.loading ?
              <React.Fragment>
                <Spinner/>
                <Text style={{textAlign: 'center', padding: 20, fontFamily: 'American Typewriter'}}>Loading team hikes...</Text> :
              </React.Fragment>
              :
              hikes.length == 0 ?
              <Text style={{textAlign: 'center', padding: 20, fontFamily: 'American Typewriter'}}>Nothing to display yet!</Text> :
              <HikesList hikes={hikes}/>
            }
            </React.Fragment> :
            <Grid>
              <Row style={rowStyle(0)}>
                <Col>
                  <TeamPicker teams={teams} onSelectedValue={this.onSelectedTeam} style={{flex: 1, alignSelf: 'center'}}/>
                </Col>
              </Row>
              <Row style={rowStyle(1)}>
                <Col>
                  <Text style={{textAlign: 'center', paddingBottom: 20, fontSize: 20, fontFamily: 'American Typewriter'}}>{'Create a team:'}</Text>
                  <TeamInput inputText={teamInput} onValueChange={this.updateTeamInputState} onSubmit={this.submitTeam}/>
                </Col>
              </Row>
            </Grid>
        }
        </Content>
      </Container>
    );
  }
}

UserTeamScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
