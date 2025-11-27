import React from 'react';
import {ScrollView, StyleSheet, Text, View, useColorScheme} from 'react-native';
import * as RNLocalize from 'react-native-localize';

export function LocalizeScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const locales = RNLocalize.getLocales();
  const currencies = RNLocalize.getCurrencies();
  const country = RNLocalize.getCountry();
  const calendar = RNLocalize.getCalendar();
  const timezone = RNLocalize.getTimeZone();
  const uses24Hour = RNLocalize.uses24HourClock();
  const usesMetric = RNLocalize.usesMetricSystem();

  const colors = {
    background: isDarkMode ? '#1c1c1e' : '#f2f2f7',
    cardBackground: isDarkMode ? '#2c2c2e' : '#ffffff',
    primaryText: isDarkMode ? '#ffffff' : '#000000',
    secondaryText: isDarkMode ? '#8e8e93' : '#6e6e73',
    separator: isDarkMode ? '#38383a' : '#c6c6c8',
  };

  const InfoRow = ({label, value}: {label: string; value: string}) => (
    <View style={[styles.infoRow, {borderBottomColor: colors.separator}]}>
      <Text style={[styles.infoLabel, {color: colors.secondaryText}]}>{label}</Text>
      <Text style={[styles.infoValue, {color: colors.primaryText}]}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.content}>
        <Text style={[styles.title, {color: colors.primaryText}]}>
          Localization
        </Text>
        <Text style={[styles.description, {color: colors.secondaryText}]}>
          Access device localization settings including language, region, timezone, and format preferences.
        </Text>

        <Text style={[styles.sectionTitle, {color: colors.primaryText}]}>Device Settings</Text>
        <View style={[styles.card, {backgroundColor: colors.cardBackground}]}>
          <InfoRow label="Country" value={country} />
          <InfoRow label="Timezone" value={timezone} />
          <InfoRow label="Calendar" value={calendar} />
          <InfoRow label="24-Hour Clock" value={uses24Hour ? 'Yes' : 'No'} />
          <InfoRow label="Metric System" value={usesMetric ? 'Yes' : 'No'} />
        </View>

        <Text style={[styles.sectionTitle, {color: colors.primaryText}]}>Locales</Text>
        <View style={[styles.card, {backgroundColor: colors.cardBackground}]}>
          {locales.map((locale, index) => (
            <InfoRow
              key={index}
              label={locale.languageTag}
              value={`${locale.languageCode} / ${locale.countryCode}`}
            />
          ))}
        </View>

        <Text style={[styles.sectionTitle, {color: colors.primaryText}]}>Currencies</Text>
        <View style={[styles.card, {backgroundColor: colors.cardBackground}]}>
          <View style={styles.currencyRow}>
            <Text style={[styles.currencyText, {color: colors.primaryText}]}>
              {currencies.join(', ')}
            </Text>
          </View>
        </View>

        <View style={[styles.codeHint, {backgroundColor: colors.cardBackground}]}>
          <Text style={[styles.codeHintLabel, {color: colors.secondaryText}]}>APIs Used</Text>
          <Text style={[styles.codeHintText, {color: colors.primaryText}]}>
            getLocales, getCurrencies, getCountry, getTimeZone, uses24HourClock, usesMetricSystem
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
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  infoLabel: {
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: -0.41,
  },
  infoValue: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.41,
  },
  currencyRow: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  currencyText: {
    fontSize: 17,
    fontWeight: '500',
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
