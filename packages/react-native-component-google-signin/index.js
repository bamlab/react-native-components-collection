import React, { PureComponent } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text as RNText,
  ActivityIndicator as RNActivityIndicator,
} from 'react-native';
import { GoogleSignIn } from 'react-native-google-signin';
import DefaultLogoSource from './lib/images/google_logo.png';

export default class GoogleAuthButton extends PureComponent {
  state = {
    isLoading: false,
  };

  loginWithGoogle = () => {
    const { googleSignInConfig, onAuthSuccess, onAuthFailure } = this.props;
    if (!GoogleSignIn) {
      console.warn('GoogleSignIn is not installed');
      return;
    }
    this.setState({ isLoading: true });
    GoogleSignIn.configure(googleSignInConfig)
      .then(GoogleSignIn.signIn)
      .then(onAuthSuccess)
      .catch(onAuthFailure)
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
      LogoSource,
      logoStyle,
      ActivityIndicatorComponent,
      TouchableComponent,
      TextComponent,
      ...rest
    } = this.props;
    const ActivityIndicator = ActivityIndicatorComponent || RNActivityIndicator;
    const GoogleLogo = LogoSource || DefaultLogoSource;
    const isLoading = this.props.isLoading || this.state.isLoading;
    const Touchable = TouchableComponent || TouchableOpacity;
    const Text = TextComponent || RNText;
    return (
      <Touchable
        style={[styles.container, buttonStyle]}
        disabled={isLoading}
        onPress={this.loginWithGoogle}
        {...rest}>
        {!!GoogleLogo && (
          <Image source={GoogleLogo} resizeMode="contain" style={[styles.icon, logoStyle]} />
        )}
        <View style={styles.textContainer}>
          {isLoading ? (
            <ActivityIndicator color={activityIndicatorColor} />
          ) : (
            <Text style={textStyle}>{text || 'GOOGLE'}</Text>
          )}
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#4285F4',
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
