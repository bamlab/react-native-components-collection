import React, { PureComponent } from 'react';
import { GoogleSignin } from 'react-native-google-signin';
import { Image, StyleSheet, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';

export default class GoogleAuthButton extends PureComponent {
  state = {
    isLoading: false,
  };

  _loginWithGoogle = () => {
    const { googleSignInConfig, onPress } = this.props;
    this.setState({ isLoading: true });
    GoogleSignin.configure(googleSignInConfig)
      .then(() => GoogleSignin.signIn())
      .then(token => onPress(token))
      .catch(e => console.log(e))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { buttonStyle, textStyle, activityIndicatorColor, googleLogo, isLoading } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.container, buttonStyle]}
        disabled={this.state.isLoading}
        onPress={this._loginWithGoogle}>
        {!!googleLogo && (
          <Image source={this.props.googleLogo} resizeMode="contain" style={styles.icon} />
        )}
        <View style={styles.textContainer}>
          {this.state.isLoading || isLoading ? (
            <ActivityIndicator color={activityIndicatorColor} />
          ) : (
            <Text style={textStyle}>{this.props.text}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 20,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 38,
    left: 2,
    position: 'absolute',
  },
});
