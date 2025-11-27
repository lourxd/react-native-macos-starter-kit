import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Platform,
  Dimensions,
  PixelRatio,
  AccessibilityInfo,
  useWindowDimensions,
} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import Constants from 'expo-constants';

interface DeviceData {
  label: string;
  value: string;
}

export function DeviceInfoScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const colorScheme = useColorScheme();
  const windowDimensions = useWindowDimensions();
  const screen = Dimensions.get('screen');

  const [accessibilityInfo, setAccessibilityInfo] = useState({
    screenReaderEnabled: false,
    reduceMotionEnabled: false,
    reduceTransparencyEnabled: false,
    boldTextEnabled: false,
    grayscaleEnabled: false,
    invertColorsEnabled: false,
  });

  const colors = {
    background: isDarkMode ? '#1c1c1e' : '#f2f2f7',
    cardBackground: isDarkMode ? '#2c2c2e' : '#ffffff',
    primaryText: isDarkMode ? '#ffffff' : '#000000',
    secondaryText: isDarkMode ? '#8e8e93' : '#6e6e73',
    separator: isDarkMode ? '#38383a' : '#c6c6c8',
  };

  useEffect(() => {
    const fetchAccessibilityInfo = async () => {
      try {
        const [
          screenReader,
          reduceMotion,
          reduceTransparency,
          boldText,
          grayscale,
          invertColors,
        ] = await Promise.all([
          AccessibilityInfo.isScreenReaderEnabled(),
          AccessibilityInfo.isReduceMotionEnabled(),
          AccessibilityInfo.isReduceTransparencyEnabled(),
          AccessibilityInfo.isBoldTextEnabled(),
          AccessibilityInfo.isGrayscaleEnabled(),
          AccessibilityInfo.isInvertColorsEnabled(),
        ]);

        setAccessibilityInfo({
          screenReaderEnabled: screenReader,
          reduceMotionEnabled: reduceMotion,
          reduceTransparencyEnabled: reduceTransparency,
          boldTextEnabled: boldText,
          grayscaleEnabled: grayscale,
          invertColorsEnabled: invertColors,
        });
      } catch (e) {
        // Some methods may not be available on macOS
      }
    };

    fetchAccessibilityInfo();
  }, []);

  // Platform info
  const platformInfo: DeviceData[] = [
    {label: 'Platform', value: Platform.OS},
    {label: 'OS Version', value: String(Platform.Version)},
    {label: 'Appearance', value: colorScheme || 'unknown'},
    {label: 'Is TV', value: Platform.isTV ? 'Yes' : 'No'},
    {label: 'Is Testing', value: Platform.isTesting ? 'Yes' : 'No'},
  ];

  // Platform constants
  const platformConstants = Platform.constants as any;
  const constantsInfo: DeviceData[] = [];
  if (platformConstants) {
    if (platformConstants.osVersion) {
      constantsInfo.push({label: 'OS Version (constants)', value: String(platformConstants.osVersion)});
    }
    if (platformConstants.systemName) {
      constantsInfo.push({label: 'System Name', value: platformConstants.systemName});
    }
    if (platformConstants.interfaceIdiom) {
      constantsInfo.push({label: 'Interface Idiom', value: platformConstants.interfaceIdiom});
    }
    if (platformConstants.isMacCatalyst !== undefined) {
      constantsInfo.push({label: 'Is Mac Catalyst', value: platformConstants.isMacCatalyst ? 'Yes' : 'No'});
    }
    if (platformConstants.reactNativeVersion) {
      const v = platformConstants.reactNativeVersion;
      constantsInfo.push({
        label: 'React Native Version',
        value: `${v.major}.${v.minor}.${v.patch}${v.prerelease ? `-${v.prerelease}` : ''}`,
      });
    }
  }

  // Display info (useWindowDimensions - reactive)
  const displayInfo: DeviceData[] = [
    {label: 'Window Width', value: `${windowDimensions.width.toFixed(0)} px`},
    {label: 'Window Height', value: `${windowDimensions.height.toFixed(0)} px`},
    {label: 'Screen Width', value: `${screen.width.toFixed(0)} px`},
    {label: 'Screen Height', value: `${screen.height.toFixed(0)} px`},
    {label: 'Screen Scale', value: `${screen.scale}x`},
    {label: 'Font Scale', value: `${screen.fontScale}x`},
  ];

  // PixelRatio info
  const pixelRatioInfo: DeviceData[] = [
    {label: 'Pixel Ratio', value: `${PixelRatio.get()}x`},
    {label: 'Font Scale (PixelRatio)', value: `${PixelRatio.getFontScale()}x`},
    {label: '100dp in pixels', value: `${PixelRatio.getPixelSizeForLayoutSize(100)} px`},
    {label: 'Rounded 8.4dp', value: `${PixelRatio.roundToNearestPixel(8.4)} dp`},
  ];

  // Accessibility info
  const accessibilityData: DeviceData[] = [
    {label: 'Screen Reader', value: accessibilityInfo.screenReaderEnabled ? 'Enabled' : 'Disabled'},
    {label: 'Reduce Motion', value: accessibilityInfo.reduceMotionEnabled ? 'Enabled' : 'Disabled'},
    {label: 'Reduce Transparency', value: accessibilityInfo.reduceTransparencyEnabled ? 'Enabled' : 'Disabled'},
    {label: 'Bold Text', value: accessibilityInfo.boldTextEnabled ? 'Enabled' : 'Disabled'},
    {label: 'Grayscale', value: accessibilityInfo.grayscaleEnabled ? 'Enabled' : 'Disabled'},
    {label: 'Invert Colors', value: accessibilityInfo.invertColorsEnabled ? 'Enabled' : 'Disabled'},
  ];

  // Expo Constants
  const expoInfo: DeviceData[] = [];
  if (Constants.expoVersion) {
    expoInfo.push({label: 'Expo Version', value: Constants.expoVersion});
  }
  if (Constants.sessionId) {
    expoInfo.push({label: 'Session ID', value: Constants.sessionId.substring(0, 16) + '...'});
  }
  if (Constants.isDevice !== undefined) {
    expoInfo.push({label: 'Is Physical Device', value: Constants.isDevice ? 'Yes' : 'No'});
  }
  if (Constants.executionEnvironment) {
    expoInfo.push({label: 'Execution Environment', value: Constants.executionEnvironment});
  }
  if (Constants.statusBarHeight !== undefined) {
    expoInfo.push({label: 'Status Bar Height', value: `${Constants.statusBarHeight} px`});
  }
  if (Constants.systemFonts && Constants.systemFonts.length > 0) {
    expoInfo.push({label: 'System Fonts Count', value: `${Constants.systemFonts.length} fonts`});
  }
  const manifest = Constants.expoConfig || Constants.manifest;
  if (manifest) {
    if (manifest.name) {
      expoInfo.push({label: 'App Name', value: manifest.name});
    }
    if (manifest.version) {
      expoInfo.push({label: 'App Version', value: manifest.version});
    }
    if (manifest.slug) {
      expoInfo.push({label: 'App Slug', value: manifest.slug});
    }
  }

  // Localization info
  const localeInfo: DeviceData[] = [
    {label: 'Country', value: RNLocalize.getCountry()},
    {label: 'Timezone', value: RNLocalize.getTimeZone()},
    {label: 'Calendar', value: RNLocalize.getCalendar()},
    {label: '24-Hour Clock', value: RNLocalize.uses24HourClock() ? 'Yes' : 'No'},
    {label: 'Metric System', value: RNLocalize.usesMetricSystem() ? 'Yes' : 'No'},
    {label: 'Currencies', value: RNLocalize.getCurrencies().join(', ')},
    {label: 'Temperature Unit', value: RNLocalize.getTemperatureUnit()},
  ];

  // Locales
  const locales = RNLocalize.getLocales();
  const localeDetails: DeviceData[] = locales.map((locale, index) => ({
    label: index === 0 ? 'Primary Locale' : `Locale ${index + 1}`,
    value: `${locale.languageTag}`,
  }));

  // Add locale details
  if (locales.length > 0) {
    const primary = locales[0];
    localeDetails.push({label: 'Language Code', value: primary.languageCode});
    if (primary.countryCode) {
      localeDetails.push({label: 'Country Code', value: primary.countryCode});
    }
    if (primary.scriptCode) {
      localeDetails.push({label: 'Script Code', value: primary.scriptCode});
    }
    if (primary.isRTL !== undefined) {
      localeDetails.push({label: 'Is RTL', value: primary.isRTL ? 'Yes' : 'No'});
    }
  }

  const InfoSection = ({title, data}: {title: string; data: DeviceData[]}) => {
    if (data.length === 0) return null;
    return (
      <>
        <Text style={[styles.sectionTitle, {color: colors.primaryText}]}>{title}</Text>
        <View style={[styles.card, {backgroundColor: colors.cardBackground}]}>
          {data.map((item, index) => (
            <View
              key={index}
              style={[
                styles.infoRow,
                index < data.length - 1 && {borderBottomColor: colors.separator, borderBottomWidth: StyleSheet.hairlineWidth},
              ]}>
              <Text style={[styles.infoLabel, {color: colors.secondaryText}]}>{item.label}</Text>
              <Text style={[styles.infoValue, {color: colors.primaryText}]} numberOfLines={1}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </>
    );
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.content}>
        <Text style={[styles.title, {color: colors.primaryText}]}>
          Device Info
        </Text>
        <Text style={[styles.description, {color: colors.secondaryText}]}>
          Comprehensive system information using React Native built-in APIs, Expo Constants, and react-native-localize.
        </Text>

        <InfoSection title="Platform" data={platformInfo} />
        {constantsInfo.length > 0 && <InfoSection title="Platform Constants" data={constantsInfo} />}
        <InfoSection title="Display" data={displayInfo} />
        <InfoSection title="Pixel Ratio" data={pixelRatioInfo} />
        <InfoSection title="Accessibility" data={accessibilityData} />
        {expoInfo.length > 0 && <InfoSection title="Expo / App" data={expoInfo} />}
        <InfoSection title="Localization" data={localeInfo} />
        <InfoSection title="Locales" data={localeDetails} />

        <View style={[styles.codeHint, {backgroundColor: colors.cardBackground}]}>
          <Text style={[styles.codeHintLabel, {color: colors.secondaryText}]}>APIs Used</Text>
          <Text style={[styles.codeHintText, {color: colors.primaryText}]}>
            Platform, Dimensions, useWindowDimensions, PixelRatio, AccessibilityInfo, expo-constants, react-native-localize
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.35,
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  infoLabel: {
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: -0.41,
    flex: 1,
  },
  infoValue: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.41,
    flex: 1,
    textAlign: 'right',
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
