import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { linkTo } from '@storybook/addon-links';

import Welcome from './Welcome';
import GoogleSignIn from './GoogleSignIn';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
storiesOf('Google Sign In', module).add('to Storybook', () => <GoogleSignIn />);
