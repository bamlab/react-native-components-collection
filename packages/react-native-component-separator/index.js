import React, { PureComponent } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';

class Separator extends PureComponent {
  render() {
    const { color, TextComponent } = this.props;
    const Text = TextComponent || RNText;

    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={[styles.line, !!color && { backgroundColor: color }, this.props.lineStyle]} />
        {this.props.text && (
          <Text style={[styles.text, !!color && { color }, this.props.textStyle]}>
            {this.props.text}
          </Text>
        )}
        {this.props.text && (
          <View
            style={[styles.line, !!color && { backgroundColor: color }, this.props.lineStyle]}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  text: {
    textAlign: 'center',
    color: 'black',
    marginHorizontal: 20,
  },
});

export default Separator;
