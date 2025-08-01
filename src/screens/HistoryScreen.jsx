// src/screens/HistoryScreen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';
import { useTheme } from '../design/ThemeProvider';

// Sample placeholder data
const sampleEntries = [
  {
    id: 1,
    title: 'Morning Clarity',
    date: 'Aug 1, 2025',
    time: '06:34 AM',
    content: 'Today I felt clear-headed and made the decision to stay focused...',
  },
  {
    id: 2,
    title: 'Evening Reflection',
    date: 'Jul 31, 2025',
    time: '09:10 PM',
    content: 'I noticed the habit creeping in again but I paused and chose stillness...',
  },
  {
    id: 3,
    title: 'Afternoon Walk',
    date: 'Jul 30, 2025',
    time: '03:47 PM',
    content: 'Walked in the park and let thoughts pass. Felt more grounded afterwards...',
  },
];

export default function HistoryScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntries = sampleEntries.filter((entry) =>
    entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const styles = getStyles(theme);

  return (
    <ScreenContainer>
      <Header title="History" />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search entries..."
          placeholderTextColor={theme.colors.muted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingTop: theme.spacing.md,
          paddingBottom: theme.spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {filteredEntries.map((entry) => (
          <View key={entry.id} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>{entry.title}</Text>
              <Text style={styles.entryDateTime}>
                {entry.date} — {entry.time}
              </Text>
            </View>
            <Text style={styles.entryContent}>{entry.content}</Text>
          </View>
        ))}

        {filteredEntries.length === 0 && (
          <Text style={styles.noResults}>No entries found.</Text>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    searchContainer: {
      marginTop: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
    },
    searchInput: {
      backgroundColor: theme.colors.card,
      color: theme.colors.text,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 16,
      fontSize: theme.typography.body.fontSize,
      borderWidth: 1,
      borderColor: theme.colors.highlight,
    },
    entryCard: {
      backgroundColor: theme.colors.card,
      marginTop: theme.spacing.md,
      marginHorizontal: theme.spacing.md,
      borderRadius: 10,
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.highlight,
    },
    entryHeader: {
      marginBottom: 4,
    },
    entryTitle: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: '700',
    },
    entryDateTime: {
      color: theme.colors.muted,
      fontSize: 12,
      marginTop: 2,
    },
    entryContent: {
      color: theme.colors.text,
      fontSize: 14,
      marginTop: 6,
      lineHeight: 20,
    },
    noResults: {
      color: theme.colors.muted,
      fontSize: 14,
      textAlign: 'center',
      marginTop: theme.spacing.xl,
    },
  });
