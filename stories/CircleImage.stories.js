import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react';
import CircleImage from '../packages/react-native-component-circle-image';

const exampleImage = {
  uri:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png',
};

storiesOf('CircleImage', module)
  .add('default', () => <CircleImage source={exampleImage} size={200} />)
  .add('with content container style', () => (
    <CircleImage
      source={exampleImage}
      size={200}
      contentContainerStyle={{
        backgroundColor: 'red',
      }}
    />
  ));
