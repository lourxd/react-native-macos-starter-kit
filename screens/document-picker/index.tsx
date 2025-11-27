import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Pressable, useColorScheme} from 'react-native';
import {pickFile, pickDirectory} from 'react-native-document-picker-macos';

interface PickedItem {
  name: string;
  uri: string;
  size: number | null;
  isDirectory?: boolean;
}

export function DocumentPickerScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [status, setStatus] = useState<string>('No file selected');
  const [pickedFiles, setPickedFiles] = useState<PickedItem[]>([]);

  const colors = {
    background: isDarkMode ? '#1c1c1e' : '#f2f2f7',
    cardBackground: isDarkMode ? '#2c2c2e' : '#ffffff',
    primaryText: isDarkMode ? '#ffffff' : '#000000',
    secondaryText: isDarkMode ? '#8e8e93' : '#6e6e73',
    accent: '#007aff',
    separator: isDarkMode ? '#38383a' : '#c6c6c8',
  };

  const pickSingleFile = async () => {
    try {
      const result = await pickFile({
        multiple: true
      });

      if (result && result.length > 0) {
        setPickedFiles(result.map(f => ({name: f.name, uri: f.uri, size: f.size})));
        setStatus('File selected');
      }
    } catch (error: any) {
      if (error.message?.includes('cancel')) {
        setStatus('Selection cancelled');
      } else {
        setStatus(`Error: ${error.message}`);
      }
    }
  };

  const pickMultipleFiles = async () => {
    try {
      const result = await pickFile({
        multiple: true,
      });

      if (result && result.length > 0) {
        setPickedFiles(result.map(f => ({name: f.name, uri: f.uri, size: f.size})));
        setStatus(`${result.length} file(s) selected`);
      }
    } catch (error: any) {
      if (error.message?.includes('cancel')) {
        setStatus('Selection cancelled');
      } else {
        setStatus(`Error: ${error.message}`);
      }
    }
  };

  const pickFolder = async () => {
    try {
      const result = await pickDirectory();

      if (result && result.length > 0) {
        setPickedFiles(result.map(d => ({
          name: d.uri.split('/').pop() || 'Directory',
          uri: d.uri,
          size: null,
          isDirectory: true,
        })));
        setStatus('Directory selected');
      }
    } catch (error: any) {
      if (error.message?.includes('cancel')) {
        setStatus('Selection cancelled');
      } else {
        setStatus(`Error: ${error.message}`);
      }
    }
  };

  const formatFileSize = (bytes: number | null): string => {
    if (bytes === null) return 'N/A';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.content}>
        <Text style={[styles.title, {color: colors.primaryText}]}>
          Document Picker
        </Text>
        <Text style={[styles.description, {color: colors.secondaryText}]}>
          Pick files and directories from the macOS file system using native dialogs.
        </Text>

        <View style={styles.buttonGroup}>
          <Pressable
            style={({pressed}) => [
              styles.button,
              {backgroundColor: colors.accent, opacity: pressed ? 0.7 : 1},
            ]}
            onPress={pickSingleFile}>
            <Text style={styles.buttonText}>Pick File</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              styles.button,
              {backgroundColor: colors.accent, opacity: pressed ? 0.7 : 1},
            ]}
            onPress={pickMultipleFiles}>
            <Text style={styles.buttonText}>Pick Multiple</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              styles.button,
              {backgroundColor: colors.accent, opacity: pressed ? 0.7 : 1},
            ]}
            onPress={pickFolder}>
            <Text style={styles.buttonText}>Pick Directory</Text>
          </Pressable>
        </View>

        <View style={[styles.statusCard, {backgroundColor: colors.cardBackground}]}>
          <Text style={[styles.statusLabel, {color: colors.secondaryText}]}>Status</Text>
          <Text style={[styles.statusText, {color: colors.primaryText}]}>{status}</Text>
        </View>

        {pickedFiles.length > 0 && (
          <View style={[styles.filesCard, {backgroundColor: colors.cardBackground}]}>
            <Text style={[styles.filesLabel, {color: colors.secondaryText}]}>Selected Files</Text>
            {pickedFiles.map((file, index) => (
              <View
                key={index}
                style={[
                  styles.fileRow,
                  index < pickedFiles.length - 1 && {borderBottomColor: colors.separator, borderBottomWidth: StyleSheet.hairlineWidth},
                ]}>
                <View style={styles.fileInfo}>
                  <Text style={[styles.fileName, {color: colors.primaryText}]} numberOfLines={1}>
                    {file.name}
                  </Text>
                  <Text style={[styles.fileDetails, {color: colors.secondaryText}]}>
                    {file.isDirectory ? 'Directory' : 'File'} • {formatFileSize(file.size)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={[styles.codeHint, {backgroundColor: colors.cardBackground}]}>
          <Text style={[styles.codeHintLabel, {color: colors.secondaryText}]}>APIs Used</Text>
          <Text style={[styles.codeHintText, {color: colors.primaryText}]}>
            pick, pickDirectory, allowMultiSelection
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
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.24,
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
  filesCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  filesLabel: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.08,
    marginBottom: 12,
  },
  fileRow: {
    paddingVertical: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.41,
    marginBottom: 4,
  },
  fileDetails: {
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: -0.08,
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
