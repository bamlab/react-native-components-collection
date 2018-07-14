import React from 'react';
import { Text } from 'react-native';
import { storiesOf } from '@storybook/react';
import Separator from '@bam.tech/react-native-component-separator';

storiesOf('Separator', module)
  .add('default', () => <Separator />)
  .add('with color', () => <Separator color="red" />)
  .add('with text', () => <Separator text="OR" />)
  .add('with text and color', () => <Separator text="OR" color="red" />)
  .add('with custom text style', () => <Separator text="OR" textStyle={{ marginHorizontal: 10 }} />)
  .add('with custom line style', () => <Separator text="OR" lineStyle={{ height: 4 }} />);
