// src/JournalScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';

export default function JournalScreen() {
  const [entry, setEntry] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tags, setTags] = useState([]);
  const [lastIdentity, setLastIdentity] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [affirmationSaved, setAffirmationSaved] = useState(false);

  const TAG_OPTIONS = ['anxiety', 'smoking', 'clarity', 'stress', 'gratitude'];

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;
      const userId = session.user.id;

      const { data, error: fetchErr } = await supabase
        .from('journal_entries')
        .select('identity_sentence, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!fetchErr && data?.identity_sentence) {
        setLastIdentity(data.identity_sentence);
      }
    })();
  }, []);

  const toggleTag = (tag) =>
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const submit = async () => {
    if (!entry.trim()) {
      Alert.alert('Please write something before analyzing.');
      return;
    }
    setLoading(true);
    setError('');
    setAnalysis(null);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');
      const userId = session.user.id;

      const res = await fetch(
        `https://<your-project-ref>.functions.supabase.co/analyzeEntry`, // replace with your deployed function URL
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entry, user_id: userId }),
        }
      );
      const json = await res.json();
      if (json.error) {
        setError(json.error);
      } else if (json.analysis) {
        setAnalysis(json.analysis);
      } else {
        setError('No analysis returned');
      }
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const saveAffirmation = () => {
    if (!analysis) return;
    setAffirmationSaved(true);
    Alert.alert('Affirmation saved');
  };

  const toggleFavorite = () => {
    setFavorite((v) => !v);
    Alert.alert(favorite ? 'Unfavorited' : 'Favorited');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Hey Daniel</Text>

      {lastIdentity ? (
        <View style={styles.identityBanner}>
          <Text style={styles.identityText}>{lastIdentity}</Text>
          <TouchableOpacity onPress={() => Alert.alert('Edit identity')}>
            <Text style={styles.editLink}>Edit</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={styles.section}>
        <Text style={styles.label}>New Journal Entry</Text>
        <TextInput
          multiline
          placeholder="What’s going on inside? Describe what you’re feeling, thinking, reacting to…"
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
        <Button title="Analyze with Milton Model" onPress={submit} disabled={loading || !entry.trim()} />
      </View>

      {loading && (
        <View style={styles.statusRow}>
          <ActivityIndicator />
          <Text style={styles.statusText}>Analyzing...</Text>
        </View>
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {analysis ? (
        <View style={styles.analysisCard}>
          <View style={styles.analysisHeader}>
            <Text style={styles.analysisTitle}>Analysis</Text>
            <View style={styles.actionRow}>
              <TouchableOpacity onPress={saveAffirmation}>
                <Text style={styles.actionText}>Save Affirmation</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleFavorite}>
                <Text style={[styles.actionText, favorite && styles.favorited]}>
                  {favorite ? '★ Favorited' : '☆ Favorite'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={{ maxHeight: 300 }}>
            <Text>{analysis}</Text>
          </ScrollView>
        </View>
      ) : null}
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
    marginBottom: 8,
  },
  identityBanner: {
    backgroundColor: '#7c4dff',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  identityText: {
    color: '#fff',
    fontWeight: '600',
    flex: 1,
  },
  editLink: {
    color: '#d0e8ff',
    marginLeft: 8,
    fontSize: 12,
  },
  section: {
    marginBottom: 12,
  },
  label: {
    color: '#f5f5fa',
    marginBottom: 4,
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
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 6,
    marginBottom: 6,
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
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusText: {
    color: '#f5f5fa',
    marginLeft: 8,
  },
  error: {
    color: '#ff6b6b',
    marginTop: 8,
  },
  analysisCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  analysisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  analysisTitle: {
    fontWeight: '700',
    fontSize: 18,
  },
  actionRow: {
    flexDirection: 'row',
  },
  actionText: {
    marginLeft: 12,
    color: '#3366cc',
    fontWeight: '600',
  },
  favorited: {
    color: '#d4af37',
  },
});
