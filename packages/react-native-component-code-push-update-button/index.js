import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import CodePush from 'react-native-code-push';

class CodePushUpdateButton extends Component {
  static defaultProps = {
    appStoreName: 'AppCenter',
  };

  state = {
    info: null,
    status: null,
  };

  componentDidMount() {
    if (!CodePush) return;
    CodePush.getUpdateMetadata().then(update => {
      if (!update) return;
      let info = update.label;
      if (update.description) {
        info += ' (' + update.description + ')';
      }
      this.setState({
        info,
      });
    });
  }

  lookForUpdate = () => {
    CodePush.sync(
      {
        updateDialog: {
          appendReleaseDescription: true,
          descriptionPrefix: '\n\nChangelog:\n',
        },
        installMode: CodePush.InstallMode.IMMEDIATE,
      },
      SyncStatus => {
        switch (SyncStatus) {
          case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
            this.setState({ status: 'Checking for update' });
            break;
          case CodePush.SyncStatus.AWAITING_USER_ACTION:
            this.setState({ status: 'Awaiting action' });
            break;
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            this.setState({ status: 'Downloading' });
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            this.setState({ status: 'Installing' });
            break;
          default:
            this.setState({ status: 'No update found' });
        }
      },
      null,
      mismatch => mismatch && this.setState({ status: `New version on ${this.props.appStoreName}` })
    );
  };

  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]} onPress={this.lookForUpdate}>
        <Text style={[styles.check, this.props.checkStyle]}>
          {this.state.status || 'Check update'}
        </Text>
        {!!this.state.info && (
          <Text style={[styles.info, this.props.infoStyle]} numberOfLines={3}>
            {this.state.info}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#99999999',
  },
  info: {
    fontSize: 8,
    maxWidth: 150,
  },
  check: {
    fontSize: 12,
  },
});

export default CodePushUpdateButton;
