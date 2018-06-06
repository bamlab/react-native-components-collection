import React, { PureComponent } from 'react';
import { View, Image, StyleSheet } from 'react-native';

class CircleImage extends PureComponent {
  static defaultProps = {
    ImageComponent: Image,
    ContentContainerComponent: View,
  };

  render() {
    const { ImageComponent, ContentContainerComponent, size, ...rest } = this.props;
    const sizeStyle = { width: size, height: size, borderRadius: size / 2 };

    return (
      <ContentContainerComponent
        style={[styles.container, this.props.contentContainerStyle, sizeStyle]}>
        <ImageComponent {...rest} style={[styles.image, sizeStyle]} resizeMode="cover" />
      </ContentContainerComponent>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
  },
});

export default CircleImage;
