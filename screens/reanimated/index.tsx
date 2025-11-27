import React, {useEffect} from 'react';
import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

export function ReanimatedScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);

  const colors = {
    background: isDarkMode ? '#1c1c1e' : '#f2f2f7',
    cardBackground: isDarkMode ? '#2c2c2e' : '#ffffff',
    primaryText: isDarkMode ? '#ffffff' : '#000000',
    secondaryText: isDarkMode ? '#8e8e93' : '#6e6e73',
    accent: '#007aff',
  };

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {duration: 2500, easing: Easing.linear}),
      -1,
      false,
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(1.3, {duration: 800, easing: Easing.out(Easing.ease)}),
        withTiming(1, {duration: 800, easing: Easing.in(Easing.ease)}),
      ),
      -1,
      true,
    );
    translateX.value = withRepeat(
      withSequence(
        withTiming(80, {duration: 600, easing: Easing.inOut(Easing.ease)}),
        withTiming(-80, {duration: 1200, easing: Easing.inOut(Easing.ease)}),
        withTiming(0, {duration: 600, easing: Easing.inOut(Easing.ease)}),
      ),
      -1,
      true,
    );
  }, []);

  const boxStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {rotate: `${rotation.value}deg`},
      {scale: scale.value},
    ],
  }));

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.content}>
        <Text style={[styles.title, {color: colors.primaryText}]}>
          Reanimated
        </Text>
        <Text style={[styles.description, {color: colors.secondaryText}]}>
          This box demonstrates multiple simultaneous animations: rotation, scaling, and horizontal translation.
        </Text>

        <View style={[styles.demoArea, {backgroundColor: colors.cardBackground}]}>
          <Animated.View style={[styles.animatedBox, boxStyle, {backgroundColor: colors.accent}]} />
        </View>

        <View style={[styles.codeHint, {backgroundColor: colors.cardBackground}]}>
          <Text style={[styles.codeHintLabel, {color: colors.secondaryText}]}>APIs Used</Text>
          <Text style={[styles.codeHintText, {color: colors.primaryText}]}>
            useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence
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
  demoArea: {
    height: 220,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  animatedBox: {
    width: 80,
    height: 80,
    borderRadius: 16,
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
