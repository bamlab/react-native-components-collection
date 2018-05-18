import React, { PureComponent } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';

export default class ProgressBar extends PureComponent {
  state = {
    width: 0,
    progress: new Animated.Value(this.props.initialProgress || 0),
  };

  static defaultProps = {
    easing: Easing.inOut(Easing.ease),
    easingDuration: 500,
  };

  componentDidMount() {
    if (this.props.progress >= 0) {
      this.updateProgress();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (this.props.progress >= 0 && this.props.progress !== prevProps.progress) ||
      (this.state.width > 0 && this.state.width !== prevState.width)
    ) {
      this.updateProgress();
    }
  }

  updateProgress = () => {
    Animated.timing(this.state.progress, {
      easing: this.props.easing,
      duration: this.props.easingDuration,
      toValue: this.props.progress,
    }).start();
  };

  setProgressWidth = event => this.setState({ width: event.nativeEvent.layout.width });

  render() {
    const { height, color, backgroundColor } = this.props;
    const width = this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.state.width],
    });

    return (
      <View
        style={[
          styles.background,
          height && { height },
          backgroundColor && { backgroundColor },
          this.props.backgroundStyle,
        ]}
        onLayout={this.setProgressWidth}>
        <Animated.View
          style={[
            styles.fill,
            color && { backgroundColor: color },
            height && { height },
            this.props.fillStyle,
            { width },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'lightgrey',
    height: 4,
  },
  fill: {
    height: 4,
  },
});
