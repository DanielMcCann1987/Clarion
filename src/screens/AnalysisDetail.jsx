import React from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { useTheme } from '../design/ThemeProvider';
import Header from '../components/Header';
import { Feather } from '@expo/vector-icons';

export default function AnalysisDetail({ navigation, route }) {
  const { theme } = useTheme();
  const analysis = route.params?.analysis || {};

  const surface = analysis.surface_structure || 'No surface structure provided.';
  const deep = analysis.deep_structure || 'No deep structure provided.';
  const impliedBeliefs = analysis.implied_beliefs || [];
  const patterns = analysis.patterns || [];
  const reframe = analysis.reframe || '';
  const finalThought = analysis.final_thought || '';
  const identitySentence = analysis.identity_sentence || '';

  const handleSave = () => {
    Alert.alert('Saved', 'Analysis saved to journal (mock).');
  };
  const handleFavorite = () => {
    Alert.alert('Favorited', 'Marked as favorite (mock).');
  };
  const handleShare = () => {
    Alert.alert('Share', 'Would open share sheet (mock).');
  };
  const handleNewEntry = () => {
    navigation.navigate('Entry', { prefill: reframe });
  };

  return (
    <ScreenContainer>
      <Header title="Analysis Summary" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing.lg }}>
        {identitySentence ? (
          <View style={[styles.section, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.surface }]}>
              Identity Sentence
            </Text>
            <Text style={[styles.bodyText, { color: theme.colors.surface }]}>
              {identitySentence}
            </Text>
          </View>
        ) : null}

        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            1. Surface Structure
          </Text>
          <Text style={[styles.bodyText, { color: theme.colors.text }]}>{surface}</Text>
        </View>

        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            2. Milton Model Breakdown
          </Text>
          {patterns.length ? (
            patterns.map((p, idx) => (
              <View key={idx} style={styles.patternRow}>
                <Text style={[styles.patternLabel, { color: theme.colors.accent }]}>
                  {p.type}:
                </Text>
                <Text
                  style={[
                    styles.patternExplanation,
                    { color: theme.colors.text },
                  ]}
                >
                  <Text style={{ fontWeight: '600' }}>{p.example}</Text> — {p.explanation}
                </Text>
              </View>
            ))
          ) : (
            <Text style={[styles.bodyText, { color: theme.colors.muted }]}>
              No pattern breakdown available.
            </Text>
          )}
        </View>

        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            3. Deep Structure
          </Text>
          <Text style={[styles.bodyText, { color: theme.colors.text }]}>{deep}</Text>
        </View>

        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            4. Implied Beliefs & Inner Shifts
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {impliedBeliefs.map((b, i) => {
              const isShift = b.type?.toLowerCase() === 'shift';
              return (
                <View
                  key={i}
                  style={[
                    styles.badge,
                    isShift
                      ? { backgroundColor: theme.colors.accent }
                      : { backgroundColor: theme.colors.muted },
                  ]}
                >
                  <Text
                    style={{
                      color: isShift ? '#000' : theme.colors.text,
                      fontSize: 12,
                      fontWeight: '600',
                    }}
                  >
                    {isShift ? 'Shift:' : 'Old:'} {b.text}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            5. Reframe
          </Text>
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
              {reframe}
            </Text>
          </View>
        </View>

        {finalThought ? (
          <View style={[styles.section, { borderColor: theme.colors.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
              6. What They’re Really Saying
            </Text>
            <Text style={[styles.bodyText, { color: theme.colors.text }]}>
              {finalThought}
            </Text>
          </View>
        ) : null}

        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            7. Extensions
          </Text>
          <TouchableOpacity
            style={[
              extensionStyles.button,
              { backgroundColor: theme.colors.card, borderColor: theme.colors.accent },
            ]}
          >
            <Text style={{ color: theme.colors.text }}>View Self-Hypnosis Script</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              extensionStyles.button,
              { backgroundColor: theme.colors.card, borderColor: theme.colors.accent },
            ]}
          >
            <Text style={{ color: theme.colors.text }}>View Contract Statement</Text>
          </TouchableOpacity>
        </View>

        {/* Replaced Button Footer with Icons */}
        <View style={styles.iconFooter}>
          <TouchableOpacity onPress={handleSave}>
            <Feather name="bookmark" size={26} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFavorite}>
            <Feather name="star" size={26} color={theme.colors.accent} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <Feather name="share" size={26} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNewEntry}>
            <Feather name="edit-3" size={26} color={theme.colors.text} />
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
    paddingHorizontal: 12,
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
    fontSize: 14,
  },
  patternExplanation: {
    marginLeft: 4,
    fontSize: 14,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 6,
  },
  iconFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 12,
    marginTop: 20,
  },
});

const extensionStyles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
  },
});
