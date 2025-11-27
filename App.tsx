/**
 * React Native macOS Starter Kit
 * Example integrations for macOS-compatible packages
 *
 * @format
 */

import React from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  HomeScreen,
  ReanimatedScreen,
  NavigationScreen,
  SVGScreen,
  WebViewScreen,
  LottieScreen,
  KeychainScreen,
  NetInfoScreen,
  AsyncStorageScreen,
  LocalizeScreen,
  DocumentPickerScreen,
  DeviceInfoScreen,
  RootStackParamList,
} from './screens';

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = {
    background: isDarkMode ? '#1c1c1e' : '#f2f2f7',
    cardBackground: isDarkMode ? '#2c2c2e' : '#ffffff',
    primaryText: isDarkMode ? '#ffffff' : '#000000',
    accent: '#007aff',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
            shadowColor: 'transparent',
            borderBottomWidth: 0,
          },
          headerTintColor: colors.accent,
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: '600',
            letterSpacing: -0.41,
            color: colors.primaryText,
          },
          headerBackTitleStyle: {
            fontSize: 17,
            letterSpacing: -0.41,
          },
          cardStyle: {
            backgroundColor: colors.background,
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Reanimated" component={ReanimatedScreen} />
        <Stack.Screen name="Navigation" component={NavigationScreen} />
        <Stack.Screen name="SVG" component={SVGScreen} />
        <Stack.Screen name="WebView" component={WebViewScreen} />
        <Stack.Screen name="Lottie" component={LottieScreen} />
        <Stack.Screen name="Keychain" component={KeychainScreen} />
        <Stack.Screen name="NetInfo" component={NetInfoScreen} />
        <Stack.Screen name="AsyncStorage" component={AsyncStorageScreen} />
        <Stack.Screen name="Localize" component={LocalizeScreen} />
        <Stack.Screen name="DocumentPicker" component={DocumentPickerScreen} options={{title: 'Document Picker'}} />
        <Stack.Screen name="DeviceInfo" component={DeviceInfoScreen} options={{title: 'Device Info'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
