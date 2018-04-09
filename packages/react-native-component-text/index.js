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
    const {
      children,
      autoEmphasize,
      emphasisSeparator,
      style,
      emphasisStyle,
      ...rest
    } = this.props;

    if (autoEmphasize) {
      const splitted = children.split(emphasisSeparator);
      return (
        <RNText {...rest} style={style}>
          {splitted.map((portion, index) => {
            if (index % 2 === 0) {
              return portion;
            }

            return (
              <RNText {...rest} style={emphasisStyle} key={index}>
                {portion}
              </RNText>
            );
          })}
        </RNText>
      );
    }

    return <RNText {...this.props} />;
  }
}

export default Text;
