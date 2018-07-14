import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { storiesOf } from '@storybook/react';
import TextInput from '@bam.tech/react-native-component-text-input';

class TextInputWithFocusButton extends Component {
  setRef = c => {
    this.textInput = c;
  };

  focus = () => {
    this.textInput.focus();
  };

  render() {
    return (
      <View>
        <TextInput ref={this.setRef} />
        <Button title="Focus" onPress={this.focus} />
      </View>
    );
  }
}

storiesOf('TextInput', module)
  .add('default', () => <TextInput />)
  .add('with focus button', () => <TextInputWithFocusButton />)
  .add('with custom TextInputComponent', () => (
    <TextInput label="Name" placeholder="Toto" TextInputComponent={PaperTextInput} />
  ));

storiesOf('TextInput/secureTextEntry', module)
  .add('default', () => <TextInput secureTextEntry />)
  .add('with style', () => <TextInput style={{ height: 200 }} secureTextEntry />)
  .add('with custom TextInputComponent', () => (
    <TextInput
      secureTextEntry
      label="Name"
      placeholder="Toto"
      TextInputComponent={PaperTextInput}
    />
  ))
  .add('with password visibility button', () => (
    <TextInput
      secureTextEntry
      renderSecureTextEntryVisibilityButtonContent={isHidden =>
        isHidden ? <Text>show</Text> : <Text>hide</Text>
      }
    />
  ))
  .add('with password visibility button and style', () => (
    <TextInput
      style={{ height: 200 }}
      secureTextEntry
      renderSecureTextEntryVisibilityButtonContent={isHidden =>
        isHidden ? <Text>show</Text> : <Text>hide</Text>
      }
    />
  ));

storiesOf('TextInput/email-address', module).add('default', () => (
  <TextInput keyboardType="email-address" />
));
