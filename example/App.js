/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '@bam.tech/react-native-component-text';
import GoogleSignIn from '@bam.tech/react-native-component-google-signin';

const IOS_CLIENT_ID = '603475410669-u1l97qhp1b5inu4v3md82no7cpb12mpb.apps.googleusercontent.com';

export default class App extends Component<> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to our components collection!</Text>
        <GoogleSignIn
          googleSignInConfig={{
            iosClientId: IOS_CLIENT_ID,
          }}
          onAuthSuccess={({ givenName }) => {
            console.warn(`Welcome ${givenName}!`);
          }}
          onAuthFailure={error => console.warn('Oups an error occured..', error)}
        />
      </View>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
