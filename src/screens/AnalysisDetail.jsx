// src/screens/AnalysisDetail.jsx
import React from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { useTheme } from '../design/ThemeProvider';
import Header from '../components/Header';

export default function AnalysisDetail({ navigation }) {
  const { theme } = useTheme();

  return (
    <ScreenContainer>
      <Header title="Analysis" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing.lg }}>
        {/* Surface Structure */}
        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>1. Surface Structure</Text>
          <Text style={[styles.bodyText, { color: theme.colors.text }]}>
            “I’m choosing clarity over the old nicotine story.” – example phrase pulled out.
          </Text>
        </View>

        {/* Milton Model Breakdown */}
        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            2. Milton Model Breakdown
          </Text>
          <View style={styles.patternRow}>
            <Text style={[styles.patternLabel, { color: theme.colors.accent }]}>Cause & Effect:</Text>
            <Text style={[styles.patternExplanation, { color: theme.colors.text }]}>
              “Nicotine calms me” presented as causality instead of context.
            </Text>
          </View>
          <View style={styles.patternRow}>
            <Text style={[styles.patternLabel, { color: theme.colors.accent }]}>Generalisation:</Text>
            <Text style={[styles.patternExplanation, { color: theme.colors.text }]}>
              “All cravings mean weakness” – sweeping rule applied.
            </Text>
          </View>
        </View>

        {/* Deep Structure */}
        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>3. Deep Structure</Text>
          <Text style={[styles.bodyText, { color: theme.colors.text }]}>
            Beneath the language is a desire for control and avoidance of discomfort; seeking relief was a
            misattributed coping mechanism.
          </Text>
        </View>

        {/* Implied Beliefs & Inner Shifts */}
        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            4. Implied Beliefs & Inner Shifts
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <View style={[styles.badgeOld, { backgroundColor: theme.colors.muted }]}>
              <Text style={{ color: theme.colors.text, fontSize: 12 }}>Old: Addiction = comfort</Text>
            </View>
            <View style={[styles.badgeShift, { backgroundColor: theme.colors.accent }]}>
              <Text style={{ color: '#000', fontSize: 12 }}>Shift: Awareness = real relief</Text>
            </View>
          </View>
        </View>

        {/* Reframe */}
        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>5. Reframe</Text>
          <View
            style={{
              backgroundColor: theme.colors.card,
              padding: theme.spacing.sm,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.colors.primary,
            }}
          >
            <Text style={[styles.bodyText, { color: theme.colors.text }]}>
              “I choose clarity over illusion; discomfort is information, not failure.”
            </Text>
          </View>
        </View>

        {/* What They're Really Saying */}
        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            6. What They’re Really Saying
          </Text>
          <Text style={[styles.bodyText, { color: theme.colors.text }]}>
            “I’m reclaiming my nervous system and replacing stories with truth.”
          </Text>
        </View>

        {/* Extensions */}
        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>7. Extensions</Text>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: theme.colors.card,
              borderRadius: 6,
              marginBottom: 8,
              borderWidth: 1,
              borderColor: theme.colors.accent,
            }}
          >
            <Text style={{ color: theme.colors.text }}>View Self-Hypnosis Script</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: theme.colors.card,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: theme.colors.accent,
            }}
          >
            <Text style={{ color: theme.colors.text }}>View Contract Statement</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.footerButton,
              { backgroundColor: theme.colors.primary, borderRadius: 6 },
            ]}
          >
            <Text style={{ color: theme.colors.surface, fontWeight: '600' }}>Save to Journal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footerButton, { borderColor: theme.colors.accent, borderWidth: 1 }]}>
            <Text style={{ color: theme.colors.text }}>Mark Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footerButton, { borderColor: theme.colors.accent, borderWidth: 1 }]}>
            <Text style={{ color: theme.colors.text }}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footerButton, { borderColor: theme.colors.accent, borderWidth: 1 }]}>
            <Text style={{ color: theme.colors.text }}>New Entry From Insight</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 18,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 22,
  },
  patternRow: {
    marginBottom: 10,
  },
  patternLabel: {
    fontWeight: '600',
    marginBottom: 4,
  },
  patternExplanation: {
    marginLeft: 4,
  },
  badgeOld: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 6,
  },
  badgeShift: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 6,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
    justifyContent: 'space-between',
  },
  footerButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
