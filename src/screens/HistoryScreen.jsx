import React, { useState } from 'react';
import { View, FlatList, TextInput, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';
import HistoryListItem from '../components/HistoryListItem';
import { useTheme } from '../design/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import { useEntries } from '../context/EntriesContext';

export default function HistoryScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { entries } = useEntries();
  const [filter, setFilter] = useState('');

  const filtered = entries.filter((e) => {
    if (!filter) return true;
    const lower = filter.toLowerCase();
    return (
      (e.entry_text && e.entry_text.toLowerCase().includes(lower)) ||
      (e.identity_sentence && e.identity_sentence.toLowerCase().includes(lower))
    );
  });

  const handlePress = (entry) => {
    navigation.navigate('HistoryDetail', { entry });
  };

  return (
    <ScreenContainer>
      <Header title="History" />
      <View style={{ paddingHorizontal: theme.spacing.md, flex: 1 }}>
        <TextInput
          placeholder="Search by date, tag, insight..."
          placeholderTextColor={theme.colors.muted}
          value={filter}
          onChangeText={setFilter}
          style={[
            styles.search,
            {
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderRadius: 10,
              paddingHorizontal: 14,
              marginBottom: theme.spacing.md,
            },
          ]}
        />

        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: theme.spacing.lg }}
          renderItem={({ item }) => (
            <HistoryListItem entry={item} onPress={handlePress} />
          )}
          ListEmptyComponent={
            <Text style={{ color: theme.colors.muted, marginTop: 20, textAlign: 'center' }}>
              No entries match.
            </Text>
          }
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  search: {
    height: 44,
    fontSize: 14,
    marginTop: 8,
  },
});
