// src/screens/JournalEntryScreen.jsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import AnalysisCard from '../components/AnalysisCard';

const TAG_OPTIONS = ['anxiety', 'smoking', 'clarity', 'stress', 'gratitude'];

export default function JournalEntryScreen({ navigation }) {
  const [entry, setEntry] = useState('');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [favorited, setFavorited] = useState(false);
  const [affirmationSaved, setAffirmationSaved] = useState(false);

  const toggleTag = (tag) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const submit = async () => {
    if (!entry.trim()) return;
    setLoading(true);
    setAnalysisResult(null);

    // Simulate delay and dummy analysis (replace with real backend call later)
    setTimeout(() => {
      setLoading(false);
      setAnalysisResult({
        identitySentence: "I'm choosing clarity over the old nicotine story.",
        reframe: 'You are reclaiming your nervous system and trading illusion for truth.',
        deepStructure: 'A shift from seeking relief to seeking awareness; addiction was a story, now replaced by empowerment.',
      });
    }, 1000);
  };

  const handleFavorite = () => {
    setFavorited((f) => !f);
    Alert.alert(favorited ? 'Unfavorited' : 'Favorited');
  };

  const handleSaveAffirmation = () => {
    setAffirmationSaved(true);
    Alert.alert('Affirmation saved');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>New Journal Entry</Text>

      <View style={styles.section}>
        <Text style={styles.label}>What’s going on inside?</Text>
        <TextInput
          multiline
          placeholder="Describe what you’re feeling, thinking, reacting to…"
          placeholderTextColor="#aaa"
          value={entry}
          onChangeText={setEntry}
          style={styles.textInput}
        />
      </View>

      <View style={styles.tagsRow}>
        {TAG_OPTIONS.map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => toggleTag(t)}
            style={[
              styles.tag,
              tags.includes(t) ? styles.tagSelected : styles.tagUnselected,
            ]}
          >
            <Text style={tags.includes(t) ? styles.tagTextSelected : styles.tagText}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Analyze with Milton Model"
          onPress={submit}
          disabled={!entry.trim() || loading}
          color="#7c4dff"
        />
      </View>

      {loading && (
        <View style={styles.statusRow}>
          <ActivityIndicator />
          <Text style={styles.statusText}>Analyzing...</Text>
        </View>
      )}

      {analysisResult && (
        <View style={{ marginTop: 16 }}>
          <AnalysisCard
            identitySentence={analysisResult.identitySentence}
            reframe={analysisResult.reframe}
            favorited={favorited}
            onFavorite={handleFavorite}
            onSaveAffirmation={handleSaveAffirmation}
            onCopyContract={() => Alert.alert('Contract copied')}
            onSaveScript={() => Alert.alert('Script saved')}
            onCreateReminder={() => Alert.alert('Reminder created')}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#0f111a',
    flexGrow: 1,
  },
  heading: {
    color: '#f5f5fa',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  section: {
    marginBottom: 12,
  },
  label: {
    color: '#f5f5fa',
    marginBottom: 6,
    fontWeight: '600',
  },
  textInput: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    backgroundColor: '#1f2233',
    textAlignVertical: 'top',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    marginTop: 4,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  tagSelected: {
    backgroundColor: '#9f7cff',
    borderColor: '#9f7cff',
  },
  tagUnselected: {
    borderColor: '#555',
    backgroundColor: 'transparent',
  },
  tagText: {
    color: '#ccc',
    fontSize: 12,
  },
  tagTextSelected: {
    color: '#fff',
    fontSize: 12,
  },
  buttonWrapper: {
    marginTop: 8,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  statusText: {
    color: '#f5f5fa',
    marginLeft: 8,
  },
});
