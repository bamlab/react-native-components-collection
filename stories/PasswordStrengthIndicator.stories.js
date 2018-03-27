import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { storiesOf } from '@storybook/react';
import PasswordStrengthIndicator from '../packages/react-native-component-password-strength-indicator';

class WithTextInput extends Component {
  state = { password: '' };

  onChangeText = password => this.setState({ password });

  render() {
    return (
      <View>
        <TextInput onChangeText={this.onChangeText} value={this.state.password} secureTextEntry />
        <PasswordStrengthIndicator password={this.state.password} />
      </View>
    );
  }
}

storiesOf('PasswordStrengthIndicator', module)
  .add('default', () => <PasswordStrengthIndicator />)
  .add('score 1', () => <PasswordStrengthIndicator password="totot" />)
  .add('score 2', () => <PasswordStrengthIndicator password="toto des" />)
  .add('score 3', () => <PasswordStrengthIndicator password="bonj0Ur world" />)
  .add('score 4', () => <PasswordStrengthIndicator password="hdksahjdhsajhdsakdsad jakda" />)
  .add('with translation', () => (
    <PasswordStrengthIndicator
      password="toto des"
      translate={text => `Translate '${text}' with i18n`}
    />
  ))
  .add('with TextInput', () => <WithTextInput />);
