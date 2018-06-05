import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import VerificationCodeInput from '../packages/react-native-component-verification-code-input';

class WithStateHandling extends Component {
  state = { code: '' };

  onChangeText = code => this.setState({ code });

  render() {
    return (
      <VerificationCodeInput value={this.state.code} length={5} onChangeText={this.onChangeText} />
    );
  }
}

storiesOf('VerificationCodeInput', module).add('default', () => <WithStateHandling />);

storiesOf('VerificationCodeInput', module).add('with custom input style', () => (
  <VerificationCodeInput
    value="123"
    length={6}
    inputStyle={{
      borderColor: 'purple',
      width: 50,
      height: 50,
      borderRadius: 25,
    }}
    textStyle={{ color: 'purple', fontSize: 14 }}
  />
));
