// src/components/AnalysisCard.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../design/ThemeProvider';

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
  const { theme } = useTheme();

  const styles = getStyles(theme);

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

const getStyles = (theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.highlight,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    title: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: '700',
    },
    favoriteText: {
      fontSize: 22,
      color: theme.colors.muted,
    },
    favorited: {
      color: '#ffd700',
    },
    section: {
      marginBottom: 12,
    },
    sectionLabel: {
      color: theme.colors.muted,
      fontSize: 12,
      marginBottom: 4,
      textTransform: 'uppercase',
    },
    identity: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    reframeBox: {
      backgroundColor: theme.colors.card, // Changed from highlight to card
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border || theme.colors.surfaceVariant || theme.colors.card,
    },
    reframeText: {
      color: theme.colors.text,
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
      backgroundColor: theme.colors.card,
      borderRadius: 6,
    },
    actionText: {
      color: theme.colors.accent,
      fontSize: 12,
      fontWeight: '600',
      textAlign: 'center',
    },
  });
