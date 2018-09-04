import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import GoogleSignIn from '@bam.tech/react-native-component-google-signin';

const IOS_CLIENT_ID = '603475410669-u1l97qhp1b5inu4v3md82no7cpb12mpb.apps.googleusercontent.com';

export default class GoogleSignInButton extends Component<> {
  render() {
    return (
      <View style={styles.container}>
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
});
