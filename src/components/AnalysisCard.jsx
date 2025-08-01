// src/components/AnalysisCard.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AnalysisCard({
  identitySentence = '',
  reframe = '',
  favorited = false,
  onSaveAffirmation = () => {},
  onFavorite = () => {},
  onCopyContract = () => {},
  onSaveScript = () => {},
  onCreateReminder = () => {},
}) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Analysis Summary</Text>
        <TouchableOpacity onPress={onFavorite}>
          <Text style={[styles.favoriteText, favorited && styles.favorited]}>
            {favorited ? '★' : '☆'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Identity Sentence</Text>
        <Text style={styles.identity}>{identitySentence}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Reframe</Text>
        <View style={styles.reframeBox}>
          <Text style={styles.reframeText}>{reframe}</Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={onSaveAffirmation}>
          <Text style={styles.actionText}>Save Affirmation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={onCopyContract}>
          <Text style={styles.actionText}>Copy Contract</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={onSaveScript}>
          <Text style={styles.actionText}>Save Script</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={onCreateReminder}>
          <Text style={styles.actionText}>Reminder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1f2233',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2f3050',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    color: '#f5f5fa',
    fontSize: 18,
    fontWeight: '700',
  },
  favoriteText: {
    fontSize: 22,
    color: '#888',
  },
  favorited: {
    color: '#ffd700',
  },
  section: {
    marginBottom: 12,
  },
  sectionLabel: {
    color: '#a0a8c0',
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  identity: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  reframeBox: {
    backgroundColor: '#282b44',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#7c4dff',
  },
  reframeText: {
    color: '#fff',
    fontSize: 14,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#222644',
    borderRadius: 6,
    marginRight: 8,
  },
  actionText: {
    color: '#22d3ee',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
