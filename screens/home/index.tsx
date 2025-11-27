import React from 'react';
import {ScrollView, StyleSheet, Text, View, Pressable, useColorScheme} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {RootStackParamList} from '../types';

const demos = [
  {name: 'Reanimated', screen: 'Reanimated', description: 'Animations library', icon: '🎬'},
  {name: 'Navigation', screen: 'Navigation', description: 'React Navigation stack', icon: '🧭'},
  {name: 'SVG', screen: 'SVG', description: 'Vector graphics', icon: '🎨'},
  {name: 'WebView', screen: 'WebView', description: 'Web content display', icon: '🌐'},
  {name: 'Lottie', screen: 'Lottie', description: 'Lottie animations', icon: '✨'},
  {name: 'Keychain', screen: 'Keychain', description: 'Secure storage', icon: '🔐'},
  {name: 'NetInfo', screen: 'NetInfo', description: 'Network information', icon: '📡'},
  {name: 'AsyncStorage', screen: 'AsyncStorage', description: 'Persistent storage', icon: '💾'},
  {name: 'Localize', screen: 'Localize', description: 'Localization info', icon: '🌍'},
  {name: 'Document Picker', screen: 'DocumentPicker', description: 'File picker', icon: '📂'},
  {name: 'Device Info', screen: 'DeviceInfo', description: 'System information', icon: '💻'},
];

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({navigation}: HomeScreenProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = {
    background: isDarkMode ? '#1c1c1e' : '#f2f2f7',
    cardBackground: isDarkMode ? '#2c2c2e' : '#ffffff',
    primaryText: isDarkMode ? '#ffffff' : '#000000',
    secondaryText: isDarkMode ? '#8e8e93' : '#6e6e73',
    separator: isDarkMode ? '#38383a' : '#c6c6c8',
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={[styles.title, {color: colors.primaryText}]}>
          React Native macOS
        </Text>
        <Text style={[styles.subtitle, {color: colors.secondaryText}]}>
          Starter Kit with Example Integrations
        </Text>
      </View>

      <View style={styles.grid}>
        {demos.map(demo => (
          <Pressable
            key={demo.name}
            style={({pressed}) => [
              styles.card,
              {
                backgroundColor: colors.cardBackground,
                opacity: pressed ? 0.7 : 1,
                transform: [{scale: pressed ? 0.98 : 1}],
              },
            ]}
            onPress={() => navigation.navigate(demo.screen as keyof RootStackParamList)}>
            <Text style={styles.cardIcon}>{demo.icon}</Text>
            <Text style={[styles.cardTitle, {color: colors.primaryText}]}>
              {demo.name}
            </Text>
            <Text style={[styles.cardDescription, {color: colors.secondaryText}]}>
              {demo.description}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={[styles.footer, {borderTopColor: colors.separator}]}>
        <Text style={[styles.footerText, {color: colors.secondaryText}]}>
          All packages above have been tested and verified to work on macOS
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0.37,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: -0.41,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  card: {
    width: 160,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cardIcon: {
    fontSize: 36,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.41,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: -0.08,
  },
  footer: {
    marginTop: 32,
    paddingTop: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: -0.08,
  },
});
