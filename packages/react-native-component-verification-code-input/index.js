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

type Props = {
  value: string,
  length: number,
  style?: any,
  inputStyle?: any,
  textStyle?: any,
  onChangeText: (code: string) => any,
  onEndEditing?: () => any,
};

class VerificationCodeInput extends PureComponent<Props> {
  hiddenInput: ?TextInput = null;

  componentDidUpdate(prevProps) {
    if (
      prevProps.value.length < this.props.length &&
      this.props.value.length === this.props.length
    ) {
      Keyboard.dismiss();
      this.props.onEndEditing && this.props.onEndEditing();
    }
  }

  renderInputs: Function = () => new Array(this.props.length).fill(0).map(this.renderInput);

  renderInput = (_, index: number) => {
    return (
      <View key={index} style={[styles.codeInput, this.props.inputStyle]}>
        <Text style={[styles.codeText, this.props.textStyle]}>
          {this.props.value.split('')[index] || ' '}
        </Text>
      </View>
    );
  };

  focus = () => {
    if (this.hiddenInput) this.hiddenInput.focus();
  };

  onChange = (code: string) => {
    this.props.onChangeText(code);
  };

  render() {
    return (
      <View style={this.props.style}>
        <TouchableOpacity onPress={this.focus}>
          <View style={styles.codeRow}>{this.renderInputs()}</View>
        </TouchableOpacity>
        <View style={styles.hiddenInput}>
          <TextInput
            keyboardType="numeric"
            maxLength={this.props.length}
            ref={ref => {
              this.hiddenInput = ref;
            }}
            onChangeText={this.onChange}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hiddenInput: Platform.select({
    ios: {
      display: 'none',
    },
    android: {
      // display:none disables removing characters with back key in keyboard...
      height: 0,
      opacity: 0,
    },
    web: {
      height: 0,
      opacity: 0,
    },
  }),
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
