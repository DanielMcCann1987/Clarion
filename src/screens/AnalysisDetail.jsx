import React, { useState } from 'react';
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

  const [expanded, setExpanded] = useState({
    surface: true,
    breakdown: false,
    deep: false,
    beliefs: false,
    reframe: false,
    final: false,
    extensions: false,
  });

  const toggle = (key) => {
    setExpanded((e) => ({ ...e, [key]: !e[key] }));
  };

  const {
    surface_structure: surface,
    deep_structure: deep,
    implied_beliefs: impliedBeliefs = [],
    patterns = [],
    reframe = '',
    final_thought: finalThought = '',
    identity_sentence: identitySentence = '',
  } = analysis;

  const handleSave = () => Alert.alert('Saved', 'Analysis saved to journal (mock).');
  const handleFavorite = () => Alert.alert('Favorited', 'Marked as favorite (mock).');
  const handleShare = () => Alert.alert('Share', 'Would open share sheet (mock).');
  const handleNewEntry = () => navigation.navigate('Entry', { prefill: reframe });

  const Section = ({ title, children, id, bgColor }) => (
    <View style={[styles.section, { borderColor: theme.colors.border, backgroundColor: bgColor || 'transparent' }]}>      
      <TouchableOpacity onPress={() => toggle(id)} style={styles.headerRow}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>{title}</Text>
        <Feather name={expanded[id] ? 'chevron-up' : 'chevron-down'} size={16} color={theme.colors.primary} />
      </TouchableOpacity>
      {expanded[id] && <View style={styles.content}>{children}</View>}
    </View>
  );

  return (
    <ScreenContainer>
      <Header title="Analysis Summary" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing.lg }}>
        {identitySentence ? (
          <View style={[styles.section, { backgroundColor: theme.colors.primary }]}>            
            <Text style={[styles.sectionTitle, { color: theme.colors.surface }]}>Identity Sentence</Text>
            <Text style={[styles.bodyText, { color: theme.colors.surface }]}>{identitySentence}</Text>
          </View>
        ) : null}

        <Section title="1. Surface Structure" id="surface">
          <Text style={[styles.bodyText, { color: theme.colors.text }]}>{surface || 'No surface structure provided.'}</Text>
        </Section>

        <Section title="2. Milton Model Breakdown" id="breakdown">
          {patterns.length ? patterns.map((p, i) => (
            <View key={i} style={styles.patternRow}>
              <Text style={[styles.patternLabel, { color: theme.colors.accent }]}>{p.type}:</Text>
              <Text style={[styles.patternExplanation, { color: theme.colors.text }]}>
                <Text style={{ fontWeight: '600' }}>{p.example}</Text> — {p.explanation}
              </Text>
            </View>
          )) : (
            <Text style={[styles.bodyText, { color: theme.colors.muted }]}>No pattern breakdown available.</Text>
          )}
        </Section>

        <Section title="3. Deep Structure" id="deep">
          <Text style={[styles.bodyText, { color: theme.colors.text }]}>{deep || 'No deep structure provided.'}</Text>
        </Section>

        <Section title="4. Implied Beliefs & Inner Shifts" id="beliefs">
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {impliedBeliefs.map((b, i) => {
              const isShift = b.type?.toLowerCase() === 'shift';
              return (
                <View key={i} style={[styles.badge, isShift ? { backgroundColor: theme.colors.accent } : { backgroundColor: theme.colors.muted }]}>
                  <Text style={{ color: isShift ? '#000' : theme.colors.text, fontSize: 12, fontWeight: '600' }}>
                    {isShift ? 'Shift:' : 'Old:'} {b.text}
                  </Text>
                </View>
              );
            })}
          </View>
        </Section>

        <Section title="5. Reframe" id="reframe">
          <View style={[styles.reframeBox, { borderColor: theme.colors.primary, backgroundColor: theme.colors.card }]}>
            <Text style={[styles.bodyText, { color: theme.colors.text }]}>{reframe}</Text>
          </View>
        </Section>

        <Section title="6. What They’re Really Saying" id="final">
          <Text style={[styles.bodyText, { color: theme.colors.text }]}>{finalThought}</Text>
        </Section>

        <Section title="7. Extensions" id="extensions">
          <TouchableOpacity style={[extensionStyles.button, { borderColor: theme.colors.accent, backgroundColor: theme.colors.card }]}>
            <Text style={{ color: theme.colors.text }}>View Self-Hypnosis Script</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[extensionStyles.button, { borderColor: theme.colors.accent, backgroundColor: theme.colors.card }]}>
            <Text style={{ color: theme.colors.text }}>View Contract Statement</Text>
          </TouchableOpacity>
        </Section>

        <View style={styles.iconFooter}>
          <TouchableOpacity onPress={handleSave}><Feather name="bookmark" size={26} color={theme.colors.primary} /></TouchableOpacity>
          <TouchableOpacity onPress={handleFavorite}><Feather name="star" size={26} color={theme.colors.accent} /></TouchableOpacity>
          <TouchableOpacity onPress={handleShare}><Feather name="share" size={26} color={theme.colors.text} /></TouchableOpacity>
          <TouchableOpacity onPress={handleNewEntry}><Feather name="edit-3" size={26} color={theme.colors.text} /></TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 18,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  content: {
    paddingLeft: 4,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 22,
  },
  patternRow: { marginBottom: 10 },
  patternLabel: { fontWeight: '600', fontSize: 14 },
  patternExplanation: { marginLeft: 4, fontSize: 14 },
  badge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, marginRight: 8, marginBottom: 6 },
  reframeBox: { padding: 8, borderRadius: 8, borderWidth: 1 },
  iconFooter: { flexDirection: 'row', justifyContent: 'space-around', padding: 12, marginTop: 20 },
});

const extensionStyles = StyleSheet.create({
  button: { padding: 10, borderRadius: 6, marginBottom: 8, borderWidth: 1 },
});
