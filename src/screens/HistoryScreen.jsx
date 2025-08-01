// src/screens/HistoryScreen.jsx
import React, { useState, useMemo } from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';
import { useTheme } from '../design/ThemeProvider';
import HistoryListItem from '../components/HistoryListItem';

const MOCK_ENTRIES = [
  {
    id: '1',
    title: 'Morning Reflection',
    entry: "I felt anxious about work, but realized practice helps.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2h ago
    favorite: false,
  },
  {
    id: '2',
    title: 'Nicotine Insight',
    entry: "The cravings were just a story; clarity feels better.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    favorite: true,
  },
  {
    id: '3',
    title: 'Streak Motivation',
    entry: "Three days in a row, feeling stronger and more present.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    favorite: false,
  },
];

export default function HistoryScreen({ navigation }) {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');

  // filter entries by title or snippet
  const filtered = useMemo(() => {
    if (!search.trim()) return MOCK_ENTRIES;
    const lower = search.toLowerCase();
    return MOCK_ENTRIES.filter(
      (e) =>
        e.title.toLowerCase().includes(lower) ||
        e.entry.toLowerCase().includes(lower)
    );
  }, [search]);

  const renderItem = ({ item }) => (
    <HistoryListItem
      title={item.title}
      snippet={item.entry}
      createdAt={item.createdAt}
      favorite={item.favorite}
      onPress={() => navigation.navigate('Analysis', { entryId: item.id })}
    />
  );

  return (
    <ScreenContainer>
      <Header title="History" />

      {/* Search bar */}
      <View style={{ marginTop: theme.spacing.md, marginBottom: theme.spacing.md }}>
        <TextInput
          placeholder="Search entries"
          placeholderTextColor={theme.colors.muted}
          value={search}
          onChangeText={setSearch}
          style={[
            styles.searchInput,
            {
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderColor: theme.colors.border,
              borderRadius: 10,
              padding: theme.spacing.sm,
            },
          ]}
        />
      </View>

      {/* Entry list */}
      {filtered.length === 0 ? (
        <View
          style={{
            padding: theme.spacing.md,
            backgroundColor: theme.colors.card,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: theme.colors.text }}>No entries match your search.</Text>
        </View>
      ) : (
        <FlatList
          data={filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: theme.spacing.lg }}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    fontSize: 14,
  },
});
