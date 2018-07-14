import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react';
import LinearGradient from 'react-native-linear-gradient';
import CircleImage from '@bam.tech/react-native-component-circle-image';

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
  ))
  .add('with custom content container component', () => (
    <CircleImage
      source={exampleImage}
      size={200}
      ContentContainerComponent={props => (
        <LinearGradient
          colors={['red', 'blue']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          {...props}
        />
      )}
    />
  ));
