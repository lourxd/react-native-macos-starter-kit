import React from 'react';
import {StyleSheet, Text, View, Pressable, useColorScheme} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {RootStackParamList} from '../types';

type NavigationScreenProps = StackScreenProps<RootStackParamList, 'Navigation'>;

export function NavigationScreen({navigation}: NavigationScreenProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = {
    background: isDarkMode ? '#1c1c1e' : '#f2f2f7',
    cardBackground: isDarkMode ? '#2c2c2e' : '#ffffff',
    primaryText: isDarkMode ? '#ffffff' : '#000000',
    secondaryText: isDarkMode ? '#8e8e93' : '#6e6e73',
    accent: '#007aff',
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.content}>
        <Text style={[styles.title, {color: colors.primaryText}]}>
          React Navigation
        </Text>
        <Text style={[styles.description, {color: colors.secondaryText}]}>
          This app uses @react-navigation/stack for JS-based navigation. The native-stack navigator requires react-native-screens which doesn't support macOS yet.
        </Text>

        <View style={styles.buttonGroup}>
          <Pressable
            style={({pressed}) => [
              styles.button,
              {backgroundColor: colors.accent, opacity: pressed ? 0.7 : 1},
            ]}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              styles.button,
              {backgroundColor: colors.accent, opacity: pressed ? 0.7 : 1},
            ]}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Go to Home</Text>
          </Pressable>
        </View>

        <View style={[styles.codeHint, {backgroundColor: colors.cardBackground}]}>
          <Text style={[styles.codeHintLabel, {color: colors.secondaryText}]}>APIs Used</Text>
          <Text style={[styles.codeHintText, {color: colors.primaryText}]}>
            @react-navigation/native, @react-navigation/stack
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0.37,
    marginBottom: 8,
  },
  description: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: -0.41,
    marginBottom: 24,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.41,
  },
  codeHint: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  codeHintLabel: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.08,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  codeHintText: {
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: -0.24,
  },
});
