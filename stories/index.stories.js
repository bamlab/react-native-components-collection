import React from 'react';
import { Text } from 'react-native';
import { storiesOf } from '@storybook/react';

storiesOf('Welcome', module)
.add('basic', () =>
  <Text>Hello World</Text>
);
