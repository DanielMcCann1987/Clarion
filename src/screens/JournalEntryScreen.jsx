// src/screens/JournalEntryScreen.jsx
import React, { useState } from 'react';
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

export default function JournalEntryScreen({ navigation }) {
  const { theme } = useTheme();
  const [entry, setEntry] = useState('');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [favorited, setFavorited] = useState(false);
  const [affirmationSaved, setAffirmationSaved] = useState(false);

  const toggleTag = (tag) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const submit = () => {
    if (!entry.trim()) {
      Alert.alert('Please write something before analyzing.');
      return;
    }
    setLoading(true);
    setAnalysisResult(null);
    setTimeout(() => {
      setLoading(false);
      setAnalysisResult({
        identitySentence: "I'm choosing clarity over the old nicotine story.",
        reframe: 'You are reclaiming your nervous system and trading illusion for truth.',
        deepStructure:
          'A shift from seeking relief to seeking awareness; addiction was a story, now replaced by empowerment.',
      });
    }, 1000);
  };

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

          {analysisResult && (
            <AnalysisCard
              identitySentence={analysisResult.identitySentence}
              reframe={analysisResult.reframe}
              favorited={favorited}
              onFavorite={() => setFavorited((f) => !f)}
              onSaveAffirmation={() => {
                setAffirmationSaved(true);
                Alert.alert('Affirmation saved');
              }}
              onCopyContract={() => Alert.alert('Contract copied')}
              onSaveScript={() => Alert.alert('Script saved')}
              onCreateReminder={() => Alert.alert('Reminder created')}
            />
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
    textAlignVertical: 'top',
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
});
