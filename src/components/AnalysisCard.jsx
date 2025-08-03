// src/components/AnalysisCard.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../design/ThemeProvider';
import { Feather } from '@expo/vector-icons';

// Expected shape of `analysis` prop:
// {
//   identity_sentence,
//   surface_structure,
//   deep_structure,
//   implied_beliefs: [{ type: 'Old'|'Shift', text }],
//   patterns: [...],
//   reframe,
//   final_thought,
// }

export default function AnalysisCard({
  analysis,
  onFavorite,
  favorited,
  onSaveAffirmation,
  onCopyContract,
  onSaveScript,
  onCreateReminder,
  onViewDetails, // callback to navigate to detail
}) {
  const { theme } = useTheme();
  if (!analysis) return null;

  const firstOld = analysis.implied_beliefs?.find((b) => b.type === 'Old');
  const firstShift = analysis.implied_beliefs?.find((b) => b.type === 'Shift');

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
      ]}
    >
      {/* Identity Sentence Banner */}
      {analysis.identity_sentence && (
        <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.bannerText, { color: theme.colors.surface }]}>
            {analysis.identity_sentence}
          </Text>
        </View>
      )}

      {/* Quick Reframe */}
      {analysis.reframe && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.accent }]}>
            Quick Reframe
          </Text>
          <Text
            style={[styles.sectionText, { color: theme.colors.text }]}
            numberOfLines={2}
          >
            {analysis.reframe}
          </Text>
        </View>
      )}

      {/* Implied Beliefs */}
      {(firstOld || firstShift) && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Implied Beliefs
          </Text>
          <View style={styles.badgeRow}>
            {firstOld && (
              <View style={[styles.badge, { backgroundColor: theme.colors.muted }]}>
                <Text style={[styles.badgeText, { color: theme.colors.text }]}>
                  Old: {firstOld.text}
                </Text>
              </View>
            )}
            {firstShift && (
              <View style={[styles.badge, { backgroundColor: theme.colors.accent }]}>
                <Text style={[styles.badgeText, { color: '#000' }]}>
                  Shift: {firstShift.text}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Footer row with actions + detail link */}
      <View style={styles.footerRow}>
        <View style={styles.actionGroup}>
          <TouchableOpacity onPress={onSaveAffirmation} style={styles.smallButton}>
            <Text style={[styles.smallText, { color: theme.colors.text }]}>
              Save Affirmation
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onFavorite} style={styles.smallButton}>
            <Text
              style={[
                styles.smallText,
                { color: favorited ? '#D4AF37' : theme.colors.text },
              ]}
            >
              {favorited ? '★ Favorited' : '☆ Favorite'}
            </Text>
          </TouchableOpacity>
        </View>

        {onViewDetails && (
          <TouchableOpacity onPress={onViewDetails} style={styles.viewMore}>
            <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>
              View full analysis
            </Text>
            <Feather
              name="chevron-right"
              size={16}
              color={theme.colors.primary}
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
    borderWidth: 1,
  },
  banner: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  bannerText: {
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  actionGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginRight: 4,
  },
  smallText: {
    fontSize: 12,
    fontWeight: '600',
  },
  viewMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
