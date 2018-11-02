import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View, Alert, NativeModules, DeviceEventEmitter,AsyncStorage
} from 'react-native';
import {RNHyperTrack as RNHyperTrackImport} from 'react-native-hypertrack';


if (NativeModules.RNHyperTrack != undefined) {
  // Import for iOS setup
  var RNHyperTrack = NativeModules.RNHyperTrack;
} else {
  // Import for Android setup
  var RNHyperTrack = RNHyperTrackImport;
}

export default class HyperTrackOnboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Tracking',
      phone: 'Phone number',
      isTracking: true,
      actionId:""
    };

    // Initialize HyperTrack with publishable token
      RNHyperTrack.initialize('pk_06f18a899893ad7588a9294fe2ead708946c16c0');
  }

  //Location and Activity Changed Events 
  //For now only works in Android
  componentWillMount() {
    DeviceEventEmitter.addListener('location.changed', function(e) {
      // handle event.
      console.log(e)
    });
    DeviceEventEmitter.addListener('activity.changed', function(e) {
      // handle event.
      console.log(e)
    });

   /*  AsyncStorage.getItem('isLogin').then((data) =>{
       
          this.setState({isLogin: JSON.parse(data)})
        
    });
    AsyncStorage.getItem('actionId').then((data) =>{
       
      this.setState({actionId: data}) 
    });
   
    RNHyperTrack.requestAlwaysLocationAuthorization('Location Permission','Please enable location') */
  }

/*   createUser(successCallback, errorCallback) {
    console.log(successCallback)

    RNHyperTrack.getOrCreateUser(this.state.name, this.state.phone, this.state.phone).then((success) => {
      successCallback(success);
    }, (error) => {
      console.log("Error Occured while fetching user details.")
      errorCallback(error)
    })
  }
 */
/*   onLoginSuccess(userObject) {
    console.log('Successful login: ', userObject);
    this.setState({isLogin: true});
  } */

/*   logIn() {
    this.createUser((userObject) => this.onLoginSuccess(userObject), (error) => { Alert.alert('Error', error); })
  }
 */
  resumeTracking(){
    RNHyperTrack.resumeTracking();
  }

  pauseTracking(){
    RNHyperTrack.pauseTracking();
  }
/* 
  logOut() {
    // Stop tracking on HyperTrack
  
    AsyncStorage.removeItem(
      'isLogin'
    );
    this.setState({isLogin: false});
  } */

/*   createAction(){
    var params = {
      'type' : 'VISIT',
      'expected_place': {
          'name':'Instawork HQ',
          'address':'340 Brannan Street',
          'city':'San Francisco',
          'state':'CA',
          'zip_code':'94107',
          'country':'USA',
          'location':{
              'type':'Point',
              'coordinates':[
                 77.619274,12.946016
              ]
          }
      },
    }
    console.log(params);
    RNHyperTrack.createAction(params).then((success) => {
      console.log('Action Create',success)
      this.state.actionId = JSON.parse(success).id;
      AsyncStorage.setItem(
        'actionId',this.state.actionId
      );

      Alert.alert('Action Created');

    }, (error) => {
      // Raise an alert if there's an error
      Alert.alert('Error', error.message);
    });
  } */

/*   completeAction(){
    RNHyperTrack.completeAction(this.state.actionId)
    Alert.alert('Action Completed');
  }
 */
  showResumeTracking() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />
        <Button
          style={styles.buttonBox}
          onPress={() => this.showPauseTracking()}
          title='Pause Tracking'
          accessibilityLabel='Pause Tracking'
        />
      </View>
    );
  }

  showPauseTracking() {
    return (
      <View style={styles.container}>

         <Button
          style={styles.buttonBox}
          onPress={() => this.resumeTracking()}
          title='Resume Tracking'
          accessibilityLabel='Resume Tracking'
        />
      </View>
    );
  }

  render() {
    let view = this.state.isTracking?  this.showPauseTracking:this.showResumeTracking();
    return (
      view
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  inputBox: {
    margin: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 300
  },

  buttonBox: {
    textAlign: 'center',
    margin: 10,
    width: 200
  }
});