import React from 'react';
import { storiesOf } from '@storybook/react';
import ProgressBar from '../packages/react-native-component-progress-bar';

storiesOf('ProgressBar', module)
  .add('default', () => <ProgressBar />)
  .add('with color', () => <ProgressBar progress={0.5} color="blue" />)
  .add('with backgroundColor', () => (
    <ProgressBar progress={0.5} backgroundColor="red" color="blue" />
  ))
  .add('with height', () => <ProgressBar progress={0.6} color="blue" height={8} />)
  .add('with initial progress', () => (
    <ProgressBar progress={0.6} initialProgress={0} color="blue" />
  ));
