import React, { PureComponent } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator as RNActivityIndicator,
} from 'react-native';
import { GoogleSignIn } from 'react-native-google-signin';
import DefaultGoogleLogo from './lib/images/google_logo.png';

export default class GoogleAuthButton extends PureComponent {
  state = {
    isLoading: false,
  };

  _loginWithGoogle = () => {
    const { googleSignInConfig, onPress } = this.props;
    if (!GoogleSignIn) {
      console.warn('GoogleSignIn is not installed');
      return;
    }
    this.setState({ isLoading: true });
    GoogleSignIn.configure(googleSignInConfig)
      .then(() => GoogleSignIn.signIn())
      .then(token => onPress(token))
      .catch(e => console.warn(e))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const {
      buttonStyle,
      textStyle,
      text,
      activityIndicatorColor,
      CustomGoogleLogo,
      ActivityIndicatorComponent,
      ...rest
    } = this.props;
    const ActivityIndicator = ActivityIndicatorComponent || RNActivityIndicator;
    const GoogleLogo = CustomGoogleLogo || DefaultGoogleLogo;
    const isLoading = this.props.isLoading || this.state.isLoading;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.container, buttonStyle]}
        disabled={isLoading}
        onPress={this._loginWithGoogle}
        {...rest}>
        {!!GoogleLogo && <Image source={GoogleLogo} resizeMode="contain" style={styles.icon} />}
        <View style={styles.textContainer}>
          {isLoading ? (
            <ActivityIndicator color={activityIndicatorColor} />
          ) : (
            <Text style={textStyle}>{text}</Text>
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
