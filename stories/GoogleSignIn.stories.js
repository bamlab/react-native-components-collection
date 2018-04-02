import React from 'react';
import { storiesOf } from '@storybook/react';
import GoogleSignInButton from '../packages/react-native-component-google-signin';

storiesOf('GoogleSignIn', module).add('default', () => <GoogleSignInButton text="GOOGLE" />);
