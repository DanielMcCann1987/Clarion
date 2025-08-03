import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../design/ThemeProvider';

export default function HistoryListItem({ entry, onPress }) {
  const { theme } = useTheme();
  const isFavorited = entry.favorite;
  const backgroundColor = isFavorited ? '#008080' : theme.colors.card;
  const textColor = isFavorited ? '#fff' : theme.colors.text;
  const mutedColor = isFavorited ? 'rgba(255,255,255,0.7)' : theme.colors.muted;

  return (
    <TouchableOpacity
      onPress={() => onPress(entry)}
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[styles.identitySentence, { color: textColor }]}
          numberOfLines={1}
        >
          {entry.identity_sentence || 'No identity sentence'}
        </Text>
        <Text style={[styles.date, { color: mutedColor }]}>
          {new Date(entry.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>
      </View>
      <Text style={[styles.snippet, { color: textColor }]} numberOfLines={2}>
        {entry.entry_text?.slice(0, 100) || 'No entry text'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  identitySentence: {
    flex: 1,
    fontWeight: '600',
    marginRight: 8,
  },
  date: {
    fontSize: 12,
  },
  snippet: {
    fontSize: 14,
    marginTop: 2,
  },
});
