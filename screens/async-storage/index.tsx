import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Pressable, TextInput, useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function AsyncStorageScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [key, setKey] = useState('myKey');
  const [value, setValue] = useState('Hello, AsyncStorage!');
  const [status, setStatus] = useState('Ready');
  const [storedValue, setStoredValue] = useState<string | null>(null);

  const colors = {
    background: isDarkMode ? '#1c1c1e' : '#f2f2f7',
    cardBackground: isDarkMode ? '#2c2c2e' : '#ffffff',
    primaryText: isDarkMode ? '#ffffff' : '#000000',
    secondaryText: isDarkMode ? '#8e8e93' : '#6e6e73',
    accent: '#007aff',
    destructive: '#ff3b30',
    success: '#34c759',
    inputBackground: isDarkMode ? '#3a3a3c' : '#ffffff',
    inputBorder: isDarkMode ? '#48484a' : '#c6c6c8',
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(key, value);
      setStatus('Data saved!');
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  const loadData = async () => {
    try {
      const result = await AsyncStorage.getItem(key);
      setStoredValue(result);
      setStatus(result ? 'Data loaded!' : 'No data found');
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setStoredValue(null);
      setStatus('Data deleted!');
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      setStoredValue(null);
      setStatus('All data cleared!');
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.content}>
        <Text style={[styles.title, {color: colors.primaryText}]}>
          AsyncStorage
        </Text>
        <Text style={[styles.description, {color: colors.secondaryText}]}>
          Simple, unencrypted, persistent key-value storage. Good for preferences and non-sensitive data.
        </Text>

        <View style={[styles.form, {backgroundColor: colors.cardBackground}]}>
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, {color: colors.secondaryText}]}>Key</Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.primaryText,
                  backgroundColor: colors.inputBackground,
                  borderColor: colors.inputBorder,
                },
              ]}
              value={key}
              onChangeText={setKey}
              placeholder="Enter key"
              placeholderTextColor={colors.secondaryText}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, {color: colors.secondaryText}]}>Value</Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.primaryText,
                  backgroundColor: colors.inputBackground,
                  borderColor: colors.inputBorder,
                },
              ]}
              value={value}
              onChangeText={setValue}
              placeholder="Enter value"
              placeholderTextColor={colors.secondaryText}
            />
          </View>
        </View>

        <View style={[styles.statusCard, {backgroundColor: colors.cardBackground}]}>
          <Text style={[styles.statusLabel, {color: colors.secondaryText}]}>Status</Text>
          <Text style={[styles.statusText, {color: colors.primaryText}]}>{status}</Text>
          {storedValue && (
            <Text style={[styles.storedValueText, {color: colors.success}]}>
              Stored: {storedValue}
            </Text>
          )}
        </View>

        <View style={styles.buttonGroup}>
          <Pressable
            style={({pressed}) => [
              styles.button,
              {backgroundColor: colors.accent, opacity: pressed ? 0.7 : 1},
            ]}
            onPress={saveData}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              styles.button,
              {backgroundColor: colors.accent, opacity: pressed ? 0.7 : 1},
            ]}
            onPress={loadData}>
            <Text style={styles.buttonText}>Load</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              styles.button,
              {backgroundColor: colors.destructive, opacity: pressed ? 0.7 : 1},
            ]}
            onPress={deleteData}>
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        </View>

        <Pressable
          style={({pressed}) => [
            styles.fullButton,
            {backgroundColor: colors.destructive, opacity: pressed ? 0.7 : 1},
          ]}
          onPress={clearAll}>
          <Text style={styles.buttonText}>Clear All Storage</Text>
        </Pressable>

        <View style={[styles.codeHint, {backgroundColor: colors.cardBackground}]}>
          <Text style={[styles.codeHintLabel, {color: colors.secondaryText}]}>APIs Used</Text>
          <Text style={[styles.codeHintText, {color: colors.primaryText}]}>
            setItem, getItem, removeItem, clear
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
  form: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.08,
    marginBottom: 8,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    padding: 14,
    fontSize: 17,
    letterSpacing: -0.41,
  },
  statusCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  statusLabel: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.08,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: -0.24,
  },
  storedValueText: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: -0.24,
    marginTop: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  fullButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
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
