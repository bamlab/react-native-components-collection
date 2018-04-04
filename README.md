# Components

[Demo](https://bamlab.github.io/react-native-components-collection/)

* [Text](./packages/react-native-component-text)
* [TextInput](./packages/react-native-component-text-input)
* [PasswordStrengthIndicator](./packages/react-native-component-password-strength-indicator)
* [ProgressBar](./packages/react-native-component-progress-bar)
* [Separator](./packages/react-native-component-separator)

# Contributing
## Installation
```bash
git clone git@github.com:bamlab/react-native-components-collection.git
yarn
```

## Add examples
Add storybook stories in [stories](./stories).

## Add a new component
Init a new package in the [packages](./packages) folder.

# Publish

```bash
lerna -v || lerna yarn global add lerna
lerna publish
yarn deploy-storybook
```
