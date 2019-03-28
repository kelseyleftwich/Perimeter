import React from 'react';
import PropTypes from 'prop-types';
import {Container, Text, Item, Label, Input, Button, Tabs, Tab, Content} from 'native-base';
import * as firebase from 'firebase';
import {Alert, Linking, View} from 'react-native';
import commonStyles from '../styles/styles';
import {main, darkTan} from '../styles/colors';

const disclaimerText = 'Disclaimer: The information contained on Perimeter mobile app (the "Service") is for general information purposes only. It\'s for fun! Make sure you use your common sense when hiking. Consult an expert if you are an unexperienced hiker. Developer assumes no responsibility for errors or omissions in the contents on the Service. In no event shall be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. Developer reserves the right to make additions, deletions, or modification to the contents on the Service at any time without prior notice.';

export default class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return({
      tintColor: darkTan});
    }

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: ''
    }

    this.signup = this.signup.bind(this);
    this.login  = this.login.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
  }

  componentDidMount() {
    if(firebase.auth().currentUser) {
      return this.props.navigation.navigate('Trails');
    }
  }

  formIsValid(){
    const {email, password} = this.state;
    if(email == '' || password == ''){
      Alert.alert('Error','Email and password must be provided.');
      return false;
    }
    return true;
  }

  async signup() {
    if(!this.formIsValid) return;
    const {email, password} = this.state;

    try {
      await firebase.auth()
      .createUserWithEmailAndPassword(email, password);
      Alert.alert('Success!','Your account has been created!');
      this.setState({password: ''});
      // Navigate to the Home page, the user is auto logged in
      this.props.navigation.navigate('Trails');
    } catch (error) {
      Alert.alert('Error!',error.toString());
    }
  }

  async login() {
    if(!this.formIsValid) return;
    const {email, password} = this.state;

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.setState({password: ''});
      this.props.navigation.navigate('Trails');
    } catch (error) {
      Alert.alert('Error!',error.toString());
    }
  }

  render() {
    return (
      <Container style={{backgroundColor: darkTan}}>
        <Tabs initialPage={0} tabBarUnderlineStyle={{backgroundColor: darkTan}} >
          <Tab heading="Sign In" activeTextStyle={commonStyles.loginTextStyleActive} textStyle={commonStyles.loginTextStyle}>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input name="email" value={this.state.email} onChangeText={(text) => {this.setState({email: text})}} />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input secureTextEntry={true} name="password" value={this.state.password} onChangeText={(text) => {this.setState({password: text})}} />
            </Item>
            <Button full style={commonStyles.tanButton}  onPress={this.login}><Text style={commonStyles.loginTextStyleActive}>Sign In</Text></Button>

          </Tab>
          <Tab heading="Sign Up" activeTextStyle={commonStyles.loginTextStyleActive} textStyle={commonStyles.loginTextStyle}>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input name="email" value={this.state.email} onChangeText={(text) => {this.setState({email: text})}} />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input secureTextEntry={true} name="password" value={this.state.password} onChangeText={(text) => {this.setState({password: text})}} />
            </Item>
            <Button full style={commonStyles.tanButton} onPress={this.signup}><Text style={commonStyles.loginTextStyleActive}>Sign Up</Text></Button>
            <Text style={{ padding: 10, fontSize: 10, bottom: 0 }} >{disclaimerText}</Text>

          </Tab>
        </Tabs>
        <Text style={{ padding: 10, fontSize: 10, bottom: 0, textDecorationLine: 'underline' }} onPress={() => {Alert.alert('Disclaimer',disclaimerText)}}>
          Read Disclaimer
        </Text>
        <Text style={{ padding: 10, fontSize: 10 }} onPress={() => Linking.openURL('http://www.freepik.com')}>
          {'Icons made by Freepik from www.flaticon.com is licensed by Creative Commons BY 3.0.  (http://creativecommons.org/licenses/by/3.0/)'}
        </Text>
      </Container>
    );
  }
}

LoginScreen.propTypes={
  navigation: PropTypes.object.isRequired
}
