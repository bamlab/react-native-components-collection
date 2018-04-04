import React, { PureComponent } from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  defaultEmphasis: {
    fontWeight: 'bold',
  },
});

class Text extends PureComponent {
  static defaultProps = {
    emphasisSeparator: '**',
    emphasisStyle: styles.defaultEmphasis,
  };

  render() {
    const { autoEmphasize, ...rest } = this.props;

    if (autoEmphasize) {
      const splitted = this.props.children.split(this.props.emphasisSeparator);
      return (
        <RNText style={this.props.style}>
          {splitted.map((portion, index) => {
            if (index % 2 === 0) {
              return portion;
            }

            return (
              <RNText style={this.props.emphasisStyle} key={index}>
                {portion}
              </RNText>
            );
          })}
        </RNText>
      );
    }

    return <RNText {...rest} />;
  }
}

export default Text;
