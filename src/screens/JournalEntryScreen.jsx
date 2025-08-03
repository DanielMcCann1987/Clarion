// src/screens/JournalEntryScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Alert,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ThemedButton from '../components/ThemedButton';
import AnalysisCard from '../components/AnalysisCard';
import { useTheme } from '../design/ThemeProvider';
import Header from '../components/Header';

const TAG_OPTIONS = ['anxiety', 'smoking', 'clarity', 'stress', 'gratitude'];

// mock analyzer used for design/prototyping
function mockAnalyze(entryText) {
  return {
    identity_sentence: 'I step away from passive repetition and choose my own direction.',
    surface_structure: entryText,
    deep_structure:
      'I feel like I’ve been a passive observer—traveling along a shared path—witnessing repeated destructive cycles that continue even as I try to move away, suggesting unresolved emotional patterns following me.',
    implied_beliefs: [
      { type: 'Old', text: 'I’m stuck in cycles that keep repeating despite my attempts to move away.' },
      { type: 'Shift', text: 'I can choose my own trajectory without carrying the crash with me.' },
    ],
    patterns: [
      {
        type: 'Cause-Effect',
        example: 'Cars crashing into each other → even as I walk away',
        explanation:
          'Implies the chaos persists regardless of distancing, suggesting a residual tie to past impact.',
      },
      {
        type: 'Embedded Metaphor',
        example: 'Bus, car crashes, repeated impact',
        explanation:
          'The bus represents a collective or passive journey; the crashes symbolize recurring emotional damage.',
      },
      {
        type: 'Presupposition',
        example: 'As I walked from the bus',
        explanation: 'Assumes a conscious decision to leave a passive state, indicating agency.',
      },
      {
        type: 'Complex Equivalence',
        example: 'Watching impact = feeling responsible or emotionally activated',
        explanation:
          'Equates observation of destruction with internal emotional activation or guilt.',
      },
      {
        type: 'Deletion',
        example: 'No explicit emotion described',
        explanation:
          'Leaves emotion unnamed, increasing subconscious weight and allowing interpretation.',
      },
    ],
    reframe:
      'I no longer have to absorb the damage I witness; stepping away doesn’t mean abandoning—it means choosing clarity while witnessing without being consumed.',
    final_thought:
      'You are no longer inside the crash. You are no longer inside the loop. You are becoming the one who walks on.',
  };
}

export default function JournalEntryScreen({ navigation }) {
  const { theme } = useTheme();
  const [entry, setEntry] = useState('');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [favorited, setFavorited] = useState(false);
  const [affirmationSaved, setAffirmationSaved] = useState(false);

  const toggleTag = (tag) =>
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const submit = () => {
    if (!entry.trim()) {
      Alert.alert('Please write something before analyzing.');
      return;
    }
    setLoading(true);
    setAnalysisResult(null);
    setTimeout(() => {
      setLoading(false);
      setAnalysisResult(mockAnalyze(entry.trim()));
    }, 800);
  };

  // Navigate to AnalysisDetail once result is ready
  useEffect(() => {
    if (analysisResult) {
      navigation.navigate('AnalysisDetail', { analysis: analysisResult });
    }
  }, [analysisResult]);

  return (
    <ScreenContainer>
      <Header title="New Entry" showBack onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: theme.spacing.lg + 100 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              color: theme.colors.text,
              fontSize: theme.typography.subheading.fontSize,
              fontWeight: theme.typography.subheading.fontWeight,
              marginBottom: theme.spacing.sm,
            }}
          >
            What’s going on inside?
          </Text>

          <TextInput
            multiline
            placeholder="Describe what you're feeling, thinking, reacting to…"
            placeholderTextColor={theme.colors.muted}
            value={entry}
            onChangeText={setEntry}
            style={[
              styles.textInput,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
                color: theme.colors.text,
              },
            ]}
            textAlignVertical="top"
          />

          <Text
            style={{
              color: theme.colors.text,
              marginTop: theme.spacing.md,
              marginBottom: 6,
              fontWeight: '600',
            }}
          >
            Tags
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: theme.spacing.md }}>
            {TAG_OPTIONS.map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => toggleTag(t)}
                style={[
                  styles.tag,
                  {
                    borderColor: tags.includes(t) ? theme.colors.primary : theme.colors.muted,
                    backgroundColor: tags.includes(t) ? theme.colors.primary : 'transparent',
                  },
                ]}
              >
                <Text
                  style={{
                    color: tags.includes(t) ? theme.colors.surface : theme.colors.text,
                    fontSize: theme.typography.body.fontSize - 2,
                  }}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ThemedButton title="Analyze with Milton Model" onPress={submit} disabled={!entry.trim() || loading} />

          {loading && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: theme.spacing.sm }}>
              <ActivityIndicator color={theme.colors.accent} />
              <Text style={{ color: theme.colors.text, marginLeft: 8 }}>Analyzing...</Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  textInput: {
    minHeight: 120,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
});
