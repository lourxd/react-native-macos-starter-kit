import React from 'react';
import {ScrollView, StyleSheet, Text, View, useColorScheme} from 'react-native';
import Svg, {Circle, Rect, Path, G, Defs, LinearGradient, Stop} from 'react-native-svg';

export function SVGScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = {
    background: isDarkMode ? '#1c1c1e' : '#f2f2f7',
    cardBackground: isDarkMode ? '#2c2c2e' : '#ffffff',
    primaryText: isDarkMode ? '#ffffff' : '#000000',
    secondaryText: isDarkMode ? '#8e8e93' : '#6e6e73',
    accent: '#007aff',
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.content}>
        <Text style={[styles.title, {color: colors.primaryText}]}>
          SVG Graphics
        </Text>
        <Text style={[styles.description, {color: colors.secondaryText}]}>
          react-native-svg provides SVG support for React Native, including shapes, paths, gradients, and more.
        </Text>

        <View style={[styles.section, {backgroundColor: colors.cardBackground}]}>
          <Text style={[styles.sectionTitle, {color: colors.primaryText}]}>Basic Shapes</Text>
          <View style={styles.svgContainer}>
            <Svg height="120" width="300" viewBox="0 0 300 120">
              <Circle cx="60" cy="60" r="50" fill={colors.accent} />
              <Rect x="130" y="10" width="100" height="100" rx="15" fill={isDarkMode ? '#48484a' : '#e5e5ea'} />
            </Svg>
          </View>
        </View>

        <View style={[styles.section, {backgroundColor: colors.cardBackground}]}>
          <Text style={[styles.sectionTitle, {color: colors.primaryText}]}>Gradient Fill</Text>
          <View style={styles.svgContainer}>
            <Svg height="120" width="300" viewBox="0 0 300 120">
              <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                  <Stop offset="0" stopColor="#007aff" />
                  <Stop offset="1" stopColor="#5856d6" />
                </LinearGradient>
              </Defs>
              <Rect x="50" y="10" width="200" height="100" rx="20" fill="url(#grad)" />
            </Svg>
          </View>
        </View>

        <View style={[styles.section, {backgroundColor: colors.cardBackground}]}>
          <Text style={[styles.sectionTitle, {color: colors.primaryText}]}>Custom Path (Star)</Text>
          <View style={styles.svgContainer}>
            <Svg height="120" width="300" viewBox="0 0 300 120">
              <G transform="translate(150, 60)">
                <Path
                  d="M0,-50 L11,-16 L47,-16 L18,6 L29,40 L0,20 L-29,40 L-18,6 L-47,-16 L-11,-16 Z"
                  fill="#ff9f0a"
                  stroke={isDarkMode ? '#48484a' : '#e5e5ea'}
                  strokeWidth="2"
                />
              </G>
            </Svg>
          </View>
        </View>

        <View style={[styles.codeHint, {backgroundColor: colors.cardBackground}]}>
          <Text style={[styles.codeHintLabel, {color: colors.secondaryText}]}>APIs Used</Text>
          <Text style={[styles.codeHintText, {color: colors.primaryText}]}>
            Svg, Circle, Rect, Path, G, Defs, LinearGradient, Stop
          </Text>
        </View>
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
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.41,
    marginBottom: 16,
  },
  svgContainer: {
    alignItems: 'center',
  },
  codeHint: {
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
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
