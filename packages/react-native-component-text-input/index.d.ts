declare module "@bam.tech/react-native-component-text-input" {
  import { Component } from "react";
  import {
    TextInputProps as RNTextInputProps,
    TouchableWithoutFeedbackProps,
    TouchableOpacityProps,
    StyleProp,
    TextStyle,
    ViewStyle
  } from "react-native";
  interface TextInputProps<
    T extends RNTextInputProps = RNTextInputProps,
    U extends TouchableWithoutFeedbackProps = TouchableOpacityProps
  > extends RNTextInputProps {
    renderSecureTextEntryVisibilityButtonContent?: (
      isHidden: boolean
    ) => JSX.Element;
    TextInputComponent?: Component<T>;
    PasswordVisibilityTouchable?: Component<U>;
    style?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    passwordVisibilityButtonStyle?: StyleProp<ViewStyle>;
  }

  class TextInput extends Component<TextInputProps> {
    public clear: () => void;
    public focus: () => void;
    public blur: () => void;
    public isFocused: () => boolean;
  }

  export default TextInput;
}
