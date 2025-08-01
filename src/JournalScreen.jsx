// src/JournalScreen.jsx
import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Button, ScrollView, Text, StyleSheet } from 'react-native';
import { analyzeEntry } from './miltonModel';

export default function JournalScreen() {
  const [entry, setEntry] = useState('');
  const [insights, setInsights] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Clarion Journal</Text>
      <TextInput
        placeholder="Write your journal entry"
        value={entry}
        onChangeText={setEntry}
        multiline
        style={styles.input}
      />
      <Button title="Analyze" onPress={() => setInsights(analyzeEntry(entry))} />
      <ScrollView style={styles.results}>
        {insights.map((i, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.pattern}>{i.patternName}</Text>
            <Text style={styles.match}>Match: {i.exampleMatch}</Text>
            <Text style={styles.suggestion}>Suggestion: {i.suggestion}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  results: { marginTop: 16 },
  card: {
    marginBottom: 14,
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
  },
  pattern: { fontWeight: 'bold', marginBottom: 4 },
  match: { fontStyle: 'italic' },
  suggestion: { marginTop: 4 },
});
