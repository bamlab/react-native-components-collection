import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput as RNTextInput } from 'react-native';

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    if (props.secureTextEntry) {
      this.state = {
        password: 'hidden',
      };
    }
  }

  toggleSecureTextEntryVisibility = () =>
    this.setState(state => ({
      password: state.password === 'hidden' ? 'visible' : 'hidden',
    }));

  render() {
    const {
      style,
      TextInputComponent,
      secureTextEntry,
      containerStyle,
      renderSecureTextEntryVisibilityButtonContent,
      PasswordVisibilityTouchable,
      passwordVisibilityButtonStyle,
      ...rest
    } = this.props;

    const TextInput = TextInputComponent || RNTextInput;

    if (secureTextEntry) {
      const passwordProps = {
        autoCorrect: false,
        autoCapitalize: 'none',
        secureTextEntry: this.state.password === 'hidden',
      };

      const Touchable = PasswordVisibilityTouchable || TouchableOpacity;
      return (
        <View style={[styles.textInputContainer, containerStyle]}>
          <TextInput style={[styles.textInput, style]} {...passwordProps} {...rest} />
          {!!renderSecureTextEntryVisibilityButtonContent && (
            <Touchable
              style={[styles.secureTextEntryVisibilityButton, passwordVisibilityButtonStyle]}
              onPress={this.toggleSecureTextEntryVisibility}>
              {renderSecureTextEntryVisibilityButtonContent(this.state.password === 'hidden')}
            </Touchable>
          )}
        </View>
      );
    }

    if (this.props.keyboardType === 'email-address') {
      rest.autoCorrect = false;
      rest.autoCapitalize = 'none';
    }

    return (
      <View style={[styles.textInputContainer, containerStyle]}>
        <TextInput style={[styles.textInput, style]} {...rest} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  secureTextEntryVisibilityButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
  },
});
