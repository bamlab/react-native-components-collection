import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import DefaultProgressBar from './components/ProgressBar';
import computeStrength from './lib/computeStrength';

class PasswordStrengthIndicator extends PureComponent {
  static defaultProps = {
    maxSuggestions: 2,
  };

  constructor(props) {
    super(props);
    this.compute(props.password);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.password !== this.props.password) {
      this.compute(nextProps.password);
    }
  }

  compute = password => {
    this.strength = computeStrength(password);
    if (this.props.onStrengthChange) {
      this.props.onStrengthChange(this.strength ? this.strength.score : null);
    }
  };

  defaultDeriveColorFromStrength = score => {
    const colorsByFlooredStrength = {
      0: 'red',
      1: 'orange',
      2: 'yellow',
      3: 'yellowgreen',
      4: 'green',
    };

    return colorsByFlooredStrength[Math.floor(score)];
  };

  render() {
    if (!this.strength) return null;

    const {
      ProgressBarComponent,
      withoutProgressBar,
      withoutWarning,
      withoutSuggestions,
      maxSuggestions,
      deriveColorFromStrength,
    } = this.props;
    const { score, warning, suggestions } = this.strength;

    const color = deriveColorFromStrength
      ? deriveColorFromStrength(score)
      : this.defaultDeriveColorFromStrength(score);

    const progress = score === 0 && !this.props.password ? 0 : (score + 1) / 5;

    const ProgressBar = ProgressBarComponent || DefaultProgressBar;

    return (
      <View>
        {!withoutProgressBar && <ProgressBar progress={progress} color={color} />}
        {!withoutWarning &&
          !!warning && (
            <Text style={this.props.warningStyle}>
              {this.props.translate ? this.props.translate(warning) : warning}
            </Text>
          )}
        {!withoutSuggestions &&
          !!suggestions.length && (
            <View style={this.props.suggestionsContainerStyle}>
              {suggestions
                .filter((_, i) => i < maxSuggestions || maxSuggestions == null)
                .map(suggestion => (
                  <Text key={suggestion} style={this.props.suggestionStyle}>
                    • {this.props.translate ? this.props.translate(suggestion) : suggestion}
                  </Text>
                ))}
            </View>
          )}
      </View>
    );
  }
}

export default PasswordStrengthIndicator;
