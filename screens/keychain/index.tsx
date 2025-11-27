import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Pressable, TextInput, useColorScheme} from 'react-native';
import * as Keychain from 'react-native-keychain';

export function KeychainScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [status, setStatus] = useState<string>('Ready to test');
  const [username, setUsername] = useState('testUser');
  const [password, setPassword] = useState('secretPassword123');

  const colors = {
    background: isDarkMode ? '#1c1c1e' : '#f2f2f7',
    cardBackground: isDarkMode ? '#2c2c2e' : '#ffffff',
    primaryText: isDarkMode ? '#ffffff' : '#000000',
    secondaryText: isDarkMode ? '#8e8e93' : '#6e6e73',
    accent: '#007aff',
    destructive: '#ff3b30',
    inputBackground: isDarkMode ? '#3a3a3c' : '#ffffff',
    inputBorder: isDarkMode ? '#48484a' : '#c6c6c8',
  };

  const saveCredentials = async () => {
    try {
      await Keychain.setGenericPassword(username, password);
      setStatus('Credentials saved securely!');
    } catch (error) {
      setStatus(`Error saving: ${error}`);
    }
  };

  const loadCredentials = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        setStatus(`Loaded: ${credentials.username} / ${credentials.password}`);
      } else {
        setStatus('No credentials stored');
      }
    } catch (error) {
      setStatus(`Error loading: ${error}`);
    }
  };

  const deleteCredentials = async () => {
    try {
      await Keychain.resetGenericPassword();
      setStatus('Credentials deleted');
    } catch (error) {
      setStatus(`Error deleting: ${error}`);
    }
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.content}>
        <Text style={[styles.title, {color: colors.primaryText}]}>
          Keychain
        </Text>
        <Text style={[styles.description, {color: colors.secondaryText}]}>
          Securely store credentials using the macOS Keychain. Data is encrypted and persists across app restarts.
        </Text>

        <View style={[styles.form, {backgroundColor: colors.cardBackground}]}>
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, {color: colors.secondaryText}]}>Username</Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.primaryText,
                  backgroundColor: colors.inputBackground,
                  borderColor: colors.inputBorder,
                },
              ]}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
              placeholderTextColor={colors.secondaryText}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, {color: colors.secondaryText}]}>Password</Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.primaryText,
                  backgroundColor: colors.inputBackground,
                  borderColor: colors.inputBorder,
                },
              ]}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              placeholderTextColor={colors.secondaryText}
              secureTextEntry
            />
          </View>
        </View>

        <View style={[styles.statusCard, {backgroundColor: colors.cardBackground}]}>
          <Text style={[styles.statusLabel, {color: colors.secondaryText}]}>Status</Text>
          <Text style={[styles.statusText, {color: colors.primaryText}]}>{status}</Text>
        </View>

        <View style={styles.buttonGroup}>
          <Pressable
            style={({pressed}) => [
              styles.button,
              {backgroundColor: colors.accent, opacity: pressed ? 0.7 : 1},
            ]}
            onPress={saveCredentials}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              styles.button,
              {backgroundColor: colors.accent, opacity: pressed ? 0.7 : 1},
            ]}
            onPress={loadCredentials}>
            <Text style={styles.buttonText}>Load</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              styles.button,
              {backgroundColor: colors.destructive, opacity: pressed ? 0.7 : 1},
            ]}
            onPress={deleteCredentials}>
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        </View>

        <View style={[styles.codeHint, {backgroundColor: colors.cardBackground}]}>
          <Text style={[styles.codeHintLabel, {color: colors.secondaryText}]}>APIs Used</Text>
          <Text style={[styles.codeHintText, {color: colors.primaryText}]}>
            setGenericPassword, getGenericPassword, resetGenericPassword
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
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
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
