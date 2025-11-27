import React from 'react';
import {StyleSheet, View, useColorScheme} from 'react-native';
import {WebView} from 'react-native-webview';

export function WebViewScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = {
    background: isDarkMode ? '#1c1c1e' : '#f2f2f7',
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <WebView
        source={{uri: 'https://reactnative.dev'}}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
