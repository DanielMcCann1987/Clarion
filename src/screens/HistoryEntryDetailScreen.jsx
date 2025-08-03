// src/screens/HistoryEntryDetailScreen.jsx
import React, { useState } from 'react';
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

export default function HistoryEntryDetailScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const entryParam = route.params?.entry || {};
  const [entry, setEntry] = useState(entryParam);
  const [editing, setEditing] = useState(false);

  const handleEditToggle = () => setEditing((e) => !e);
  const handleShare = async () => {
    try {
      await Share.share({
        message: `${entry.identity_sentence || ''}\n\n${entry.entry_text || ''}`,
        title: 'Journal Entry',
      });
    } catch (e) {
      Alert.alert('Share failed', e.message);
    }
  };
  const handleDuplicate = () => {
    Alert.alert('Duplicate', 'This would duplicate the entry and open a new draft.');
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
  };

  return (
    <ScreenContainer>
      {/* Header with back and delete on right */}
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={20} color={theme.colors.surface} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Entry Detail</Text>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <MaterialIcons name="delete-outline" size={22} color={theme.colors.surface} />
        </TouchableOpacity>
      </View>

      {/* Keyboard avoiding + scrollable content */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // adjust if you have a custom header height
      >
        <ScrollView
          contentContainerStyle={{ padding: theme.spacing.md, paddingBottom: 140 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Identity Sentence */}
          {entry.identity_sentence ? (
            <View style={[detailStyles.section, { backgroundColor: theme.colors.primary }]}>
              <Text style={[detailStyles.sectionTitle, { color: theme.colors.surface }]}>
                Identity Sentence
              </Text>
              {editing ? (
                <TextInput
                  value={entry.identity_sentence}
                  onChangeText={(v) => setEntry((e) => ({ ...e, identity_sentence: v }))}
                  style={[
                    detailStyles.editableInput,
                    { backgroundColor: theme.colors.card, color: theme.colors.text },
                  ]}
                  multiline
                  textAlignVertical="top"
                />
              ) : (
                <Text style={[detailStyles.content, { color: theme.colors.surface }]}>
                  {entry.identity_sentence}
                </Text>
              )}
            </View>
          ) : null}

          {/* Journal Entry Text */}
          <View style={[detailStyles.section, { backgroundColor: theme.colors.card }]}>
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
          </View>

          {/* Metadata / Flags */}
          <View style={[detailStyles.section, { backgroundColor: theme.colors.card }]}>
            <Text style={[detailStyles.sectionTitle, { color: theme.colors.text }]}>Details</Text>
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

          {/* Action icons bar below Details (Edit / Share / Duplicate) */}
          <View style={styles.actionBarWrapper}>
            <View style={styles.actionBar}>
              <IconOnlyAction
                label={editing ? 'Save' : 'Edit'}
                onPress={handleEditToggle}
                iconName={editing ? 'check' : 'edit-3'}
                IconComponent={Feather}
              />
              <IconOnlyAction label="Share" onPress={handleShare} iconName="share" IconComponent={Entypo} />
              <IconOnlyAction
                label="Duplicate"
                onPress={handleDuplicate}
                iconName="copy"
                IconComponent={Feather}
              />
            </View>
          </View>

          {/* Full Analysis (if present) */}
          {entry.analysis_markdown ? (
            <View style={[detailStyles.section, { backgroundColor: theme.colors.card }]}>
              <Text style={[detailStyles.sectionTitle, { color: theme.colors.text }]}>
                Full Analysis
              </Text>
              <Text style={[detailStyles.content, { color: theme.colors.text }]}>
                {entry.analysis_markdown}
              </Text>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

function IconOnlyAction({ label, iconName, IconComponent, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={actionStyles.container}>
      <IconComponent name={iconName} size={24} color="#fff" style={{ marginBottom: 4 }} />
      <Text style={actionStyles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const detailStyles = StyleSheet.create({
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
  content: {
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
});

const actionStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    minWidth: 80,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
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
  deleteButton: {
    padding: 8,
  },
  actionBarWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
