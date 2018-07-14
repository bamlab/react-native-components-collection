// @flow

import React, { PureComponent } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Keyboard,
} from 'react-native';

type PropsType = {
  value: string,
  length: number,
  style?: any,
  inputStyle?: any,
  textStyle?: any,
  keyboardType: string,
  HiddenTextInputComponent: React.Node,
  TouchableComponent: React.Node,
  onChangeText: (code: string) => any,
  onEndEditing?: () => any,
};

class VerificationCodeInput extends PureComponent<PropsType> {
  static defaultProps = {
    keyboardType: 'numeric',
    HiddenTextInputComponent: TextInput,
    TouchableComponent: props => <TouchableOpacity activeOpacity={0.7} {...props} />,
  };

  hiddenInput: ?TextInput = null;

  componentDidUpdate(prevProps) {
    if (
      prevProps.value.length < this.props.length &&
      this.props.value.length === this.props.length
    ) {
      this.props.onEndEditing && this.props.onEndEditing();
    }
  }

  renderInputs: Function = () => new Array(this.props.length).fill(0).map(this.renderInput);

  renderInput = (_, index: number) => {
    return (
      <View key={index} style={[styles.codeInput, this.props.inputStyle]}>
        <Text style={[styles.codeText, this.props.textStyle]}>{this.props.value[index]}</Text>
      </View>
    );
  };

  focus = () => {
    if (this.hiddenInput) this.hiddenInput.focus();
  };

  render() {
    const {
      style,
      TouchableComponent,
      HiddenTextInputComponent,
      keyboardType,
      length,
      value,
    } = this.props;
    return (
      <View style={style}>
        <TouchableComponent onPress={this.focus}>
          <View style={styles.codeRow}>{this.renderInputs()}</View>
        </TouchableComponent>
        <View style={styles.hiddenInput}>
          <HiddenTextInputComponent
            keyboardType={keyboardType}
            maxLength={length}
            ref={ref => {
              this.hiddenInput = ref;
            }}
            value={value}
            onChangeText={this.props.onChangeText}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hiddenInput: {
    height: 0,
    opacity: 0,
  },
  codeInput: {
    width: 35,
    height: 53,
    borderRadius: 2,
    borderWidth: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeText: {
    fontSize: 40,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VerificationCodeInput;
