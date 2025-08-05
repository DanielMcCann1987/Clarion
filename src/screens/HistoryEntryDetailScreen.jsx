import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Share,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { useTheme } from '../design/ThemeProvider';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useEntries } from '../context/EntriesContext';

// helpers for determining light/dark from hex background
function hexToRgb(hex) {
  let cleaned = hex.replace('#', '');
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const int = parseInt(cleaned, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}
function isDarkColor(hex) {
  try {
    const { r, g, b } = hexToRgb(hex);
    const [R, G, B] = [r, g, b].map((v) => {
      const srgb = v / 255;
      return srgb <= 0.03928
        ? srgb / 12.92
        : Math.pow((srgb + 0.055) / 1.055, 2.4);
    });
    const lum = 0.2126 * R + 0.7152 * G + 0.0722 * B;
    return lum < 0.5;
  } catch {
    return false;
  }
}

// TEMP: Copy or import this from shared location
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
          'Implies a residual tie to past impact; chaos persists despite distancing.',
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

export default function HistoryEntryDetailScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { entries, toggleFavorite, upsertEntry } = useEntries();

  const routeEntry = route.params?.entry || {};
  const contextEntry = routeEntry.id ? entries.find((e) => e.id === routeEntry.id) : null;
  const [entry, setEntry] = useState(contextEntry || routeEntry);
  const [editing, setEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // keep in sync if context updated externally (favorite toggle etc.)
  useEffect(() => {
    if (contextEntry) {
      setEntry(contextEntry);
    }
  }, [contextEntry]);

  // Determine if entry has any analysis-ish data
  const hasRawMarkdown = !!entry.analysis_markdown;
  const hasStructured = !!entry.analysis;
  // Choose displayAnalysis: prefer real structured, else if only markdown exists, mock it
  const displayAnalysis = hasStructured
    ? entry.analysis
    : hasRawMarkdown
    ? mockAnalyze(entry.entry_text || '')
    : null;

  // Identity sentence fallback: entry or mock
  const identitySentence = entry.identity_sentence || (displayAnalysis ? displayAnalysis.identity_sentence : '');

  // icon color logic
  const bg = theme?.colors?.background || '#ffffff';
  const darkMode = typeof bg === 'string' && isDarkColor(bg);
  const iconColor = darkMode ? '#fff' : '#008080';

  const handleEditToggle = () => {
    if (editing && entry.id) {
      upsertEntry(entry);
    }
    setEditing((e) => !e);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${identitySentence}\n\n${entry.entry_text || ''}`,
        title: 'Journal Entry',
      });
    } catch (e) {
      Alert.alert('Share failed', e.message);
    } finally {
      setMenuOpen(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Deleted', 'Entry has been deleted (mock).');
            navigation.goBack();
          },
        },
      ]
    );
    setMenuOpen(false);
  };

  const handleAnalyze = () => {
    const mockResult = mockAnalyze(entry.entry_text || '');
    const updated = {
      ...entry,
      analysis: mockResult,
      identity_sentence: mockResult.identity_sentence || entry.identity_sentence,
      analyzed: true,
      analysis_markdown: `${mockResult.reframe}\n\nFinal thought: ${mockResult.final_thought}`,
    };
    upsertEntry(updated);
    setEntry(updated);
    navigation.navigate('AnalysisDetail', { analysis: mockResult });
    setMenuOpen(false);
  };

  const handleReanalyze = () => {
    if (displayAnalysis) {
      navigation.navigate('AnalysisDetail', { analysis: displayAnalysis });
    } else {
      handleAnalyze();
    }
    setMenuOpen(false);
  };

  const handleNewEntry = () => {
    const prefill = (displayAnalysis && displayAnalysis.reframe) || entry.entry_text || '';
    navigation.navigate('Journal', { screen: 'Entry', params: { prefill } });
    setMenuOpen(false);
  };

  const toggleFavoriteLocal = () => {
    if (entry.id) {
      toggleFavorite(entry.id);
    } else {
      const newEntry = { ...entry, id: Date.now().toString(), favorite: !entry.favorite };
      upsertEntry(newEntry);
      setEntry(newEntry);
    }
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={20} color={iconColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Entry Detail</Text>
        <View style={{ position: 'relative' }}>
          <TouchableOpacity onPress={() => setMenuOpen((o) => !o)} style={styles.menuTrigger}>
            <Feather name="more-vertical" size={22} color={iconColor} />
          </TouchableOpacity>
          {menuOpen && (
            <View style={[styles.dropdown, { backgroundColor: theme.colors.card }]}>
              <TouchableOpacity onPress={handleShare} style={styles.dropdownItem}>
                <Entypo name="share" size={20} color={iconColor} />
                <Text style={[styles.dropdownLabel, { color: iconColor }]}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleReanalyze} style={styles.dropdownItem}>
                <Feather name="refresh-cw" size={20} color={iconColor} />
                <Text style={[styles.dropdownLabel, { color: iconColor }]}>Re-analyze</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNewEntry} style={styles.dropdownItem}>
                <Feather name="plus-square" size={20} color={iconColor} />
                <Text style={[styles.dropdownLabel, { color: iconColor }]}>New Entry</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} style={styles.dropdownItem}>
                <MaterialIcons name="delete-outline" size={20} color={iconColor} />
                <Text style={[styles.dropdownLabel, { color: iconColor }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Content */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          contentContainerStyle={{ padding: theme.spacing.md, paddingBottom: 160 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Identity Sentence Banner */}
          {identitySentence ? (
            <View style={[detailStyles.banner, { backgroundColor: theme.colors.primary }]}>
              <Text style={[detailStyles.bannerTitle, { color: theme.colors.surface }]}>
                Identity Sentence
              </Text>
              {editing ? (
                <TextInput
                  value={identitySentence}
                  onChangeText={(v) => setEntry((e) => ({ ...e, identity_sentence: v }))}
                  style={[
                    detailStyles.editableBannerInput,
                    { backgroundColor: theme.colors.primary, color: theme.colors.surface },
                  ]}
                  multiline
                  textAlignVertical="top"
                />
              ) : (
                <Text style={[detailStyles.bannerText, { color: theme.colors.surface }]}>
                  {identitySentence}
                </Text>
              )}
            </View>
          ) : null}

          {/* Journal Entry + Metadata */}
          <View
            style={[
              detailStyles.section,
              { backgroundColor: theme.colors.card, position: 'relative' },
            ]}
          >
            {/* edit icon in top-right of entry block */}
            <TouchableOpacity
              onPress={handleEditToggle}
              style={detailStyles.editIcon}
              accessibilityLabel={editing ? 'Save entry' : 'Edit entry'}
            >
              <Feather name={editing ? 'check' : 'edit-3'} size={20} color={iconColor} />
            </TouchableOpacity>

            <Text style={[detailStyles.sectionTitle, { color: theme.colors.text }]}>
              Journal Entry
            </Text>
            {editing ? (
              <TextInput
                value={entry.entry_text}
                onChangeText={(v) => setEntry((e) => ({ ...e, entry_text: v }))}
                style={[
                  detailStyles.editableInput,
                  {
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                    minHeight: 120,
                  },
                ]}
                multiline
                textAlignVertical="top"
              />
            ) : (
              <Text style={[detailStyles.content, { color: theme.colors.text }]}>
                {entry.entry_text || 'No content.'}
              </Text>
            )}

            {/* Metadata */}
            <View style={{ marginTop: 10, flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
              <Text style={[detailStyles.metaText, { color: theme.colors.muted }]}>
                {entry.created_at
                  ? `Created: ${new Date(entry.created_at).toLocaleString()}`
                  : 'Date unknown'}
              </Text>
              {entry.favorite && (
                <Text style={[detailStyles.metaText, { color: theme.colors.primary }]}>
                  ★ Favorited
                </Text>
              )}
            </View>

            {/* favorite bottom-right */}
            <TouchableOpacity
              onPress={toggleFavoriteLocal}
              style={detailStyles.favoriteIcon}
              accessibilityLabel="Toggle favorite"
            >
              <Feather
                name="star"
                size={24}
                color={entry.favorite ? '#D4AF37' : iconColor}
                style={entry.favorite ? {} : { opacity: 0.6 }}
              />
            </TouchableOpacity>
          </View>

          {/* Structured Analysis or Analyze CTA */}
          {displayAnalysis ? (
            <>
              {/* Surface Structure */}
              <View style={[detailStyles.section, { backgroundColor: theme.colors.card }]}>
                <Text style={[detailStyles.numberedTitle, { color: theme.colors.primary }]}>
                  1. Surface Structure
                </Text>
                <Text style={[detailStyles.content, { color: theme.colors.text }]}>
                  {displayAnalysis.surface_structure}
                </Text>
              </View>

              {/* Milton Model Breakdown */}
              <View style={[detailStyles.section, { backgroundColor: theme.colors.card }]}>
                <Text style={[detailStyles.numberedTitle, { color: theme.colors.primary }]}>
                  2. Milton Model Breakdown
                </Text>
                {displayAnalysis.patterns && displayAnalysis.patterns.length ? (
                  displayAnalysis.patterns.map((p, i) => (
                    <View key={i} style={detailStyles.patternRow}>
                      <Text style={[detailStyles.patternLabel, { color: theme.colors.accent }]}>
                        {p.type}:
                      </Text>
                      <Text style={[detailStyles.patternExplanation, { color: theme.colors.text }]}>
                        <Text style={{ fontWeight: '600' }}>{p.example}</Text> — {p.explanation}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={[detailStyles.bodyText, { color: theme.colors.muted }]}>
                    No pattern breakdown available.
                  </Text>
                )}
              </View>

              {/* Deep Structure */}
              <View style={[detailStyles.section, { backgroundColor: theme.colors.card }]}>
                <Text style={[detailStyles.numberedTitle, { color: theme.colors.primary }]}>
                  3. Deep Structure
                </Text>
                <Text style={[detailStyles.content, { color: theme.colors.text }]}>
                  {displayAnalysis.deep_structure}
                </Text>
              </View>

              {/* Implied Beliefs & Inner Shifts */}
              <View style={[detailStyles.section, { backgroundColor: theme.colors.card }]}>
                <Text style={[detailStyles.numberedTitle, { color: theme.colors.primary }]}>
                  4. Implied Beliefs & Inner Shifts
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {(displayAnalysis.implied_beliefs || []).map((b, i) => {
                    const isShift = b.type?.toLowerCase() === 'shift';
                    return (
                      <View
                        key={i}
                        style={[
                          detailStyles.badge,
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

              {/* Reframe */}
              <View style={[detailStyles.section, { backgroundColor: theme.colors.card }]}>
                <Text style={[detailStyles.numberedTitle, { color: theme.colors.primary }]}>
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
                  <Text style={[detailStyles.content, { color: theme.colors.text }]}>
                    {displayAnalysis.reframe}
                  </Text>
                </View>
              </View>

              {/* Final Thought */}
              {displayAnalysis.final_thought ? (
                <View style={[detailStyles.section, { backgroundColor: theme.colors.card }]}>
                  <Text style={[detailStyles.numberedTitle, { color: theme.colors.primary }]}>
                    6. What They’re Really Saying
                  </Text>
                  <Text style={[detailStyles.content, { color: theme.colors.text }]}>
                    {displayAnalysis.final_thought}
                  </Text>
                </View>
              ) : null}
            </>
          ) : (
            <TouchableOpacity
              onPress={handleAnalyze}
              style={[detailStyles.ctaButton, { backgroundColor: theme.colors.primary }]}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>
                Analyze This Entry
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const detailStyles = StyleSheet.create({
  banner: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  bannerTitle: {
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  bannerText: {
    fontSize: 16,
    lineHeight: 22,
  },
  editableBannerInput: {
    fontSize: 16,
    padding: 8,
    borderRadius: 6,
    marginTop: 4,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 6,
  },
  numberedTitle: {
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 22,
  },
  editableInput: {
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
  },
  metaText: {
    fontSize: 12,
    marginTop: 4,
  },
  patternRow: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  patternLabel: {
    fontWeight: '600',
    marginBottom: 4,
    fontSize: 14,
    width: 120,
  },
  patternExplanation: {
    marginLeft: 4,
    fontSize: 14,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 6,
  },
  ctaButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  editIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 6,
    zIndex: 2,
  },
  favoriteIcon: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    padding: 6,
    zIndex: 2,
  },
});

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 24,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  menuTrigger: {
    padding: 8,
  },
  dropdown: {
    position: 'absolute',
    top: 36,
    right: 0,
    borderRadius: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    minWidth: 160,
    zIndex: 10,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 8,
  },
  dropdownLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
