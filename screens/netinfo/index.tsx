import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, useColorScheme} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export function NetInfoScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [netInfo, setNetInfo] = useState<any>(null);

  const colors = {
    background: isDarkMode ? '#1c1c1e' : '#f2f2f7',
    cardBackground: isDarkMode ? '#2c2c2e' : '#ffffff',
    primaryText: isDarkMode ? '#ffffff' : '#000000',
    secondaryText: isDarkMode ? '#8e8e93' : '#6e6e73',
    separator: isDarkMode ? '#38383a' : '#c6c6c8',
    success: '#34c759',
    error: '#ff3b30',
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state);
    });
    return () => unsubscribe();
  }, []);

  const InfoRow = ({label, value, isBoolean}: {label: string; value: string | boolean; isBoolean?: boolean}) => (
    <View style={[styles.infoRow, {borderBottomColor: colors.separator}]}>
      <Text style={[styles.infoLabel, {color: colors.secondaryText}]}>{label}</Text>
      <Text
        style={[
          styles.infoValue,
          {
            color: isBoolean
              ? value === true || value === 'Yes'
                ? colors.success
                : colors.error
              : colors.primaryText,
          },
        ]}>
        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
      </Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.content}>
        <Text style={[styles.title, {color: colors.primaryText}]}>
          Network Info
        </Text>
        <Text style={[styles.description, {color: colors.secondaryText}]}>
          Real-time network connection information. Updates automatically when connection changes.
        </Text>

        {netInfo && (
          <View style={[styles.card, {backgroundColor: colors.cardBackground}]}>
            <InfoRow label="Connection Type" value={netInfo.type} />
            <InfoRow label="Connected" value={netInfo.isConnected} isBoolean />
            <InfoRow label="Internet Reachable" value={netInfo.isInternetReachable} isBoolean />
            {netInfo.details && (
              <InfoRow
                label="Connection Expensive"
                value={netInfo.details.isConnectionExpensive}
                isBoolean
              />
            )}
          </View>
        )}

        <View style={[styles.codeHint, {backgroundColor: colors.cardBackground}]}>
          <Text style={[styles.codeHintLabel, {color: colors.secondaryText}]}>APIs Used</Text>
          <Text style={[styles.codeHintText, {color: colors.primaryText}]}>
            NetInfo.addEventListener for real-time updates
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
