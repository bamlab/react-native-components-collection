import React from 'react';
import { Text } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { storiesOf } from '@storybook/react';
import TextInput from '../packages/react-native-component-text-input';

storiesOf('TextInput/secureTextEntry', module)
  .add('default', () => <TextInput secureTextEntry />)
  .add('with style', () => <TextInput style={{ height: 200 }} secureTextEntry />)
  .add('with custom TextInputComponent', () => (
    <TextInput label="Name" placeholder="Toto" TextInputComponent={PaperTextInput} />
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
