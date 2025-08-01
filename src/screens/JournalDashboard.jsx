// src/screens/JournalDashboard.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ThemedButton from '../components/ThemedButton';
import { useTheme } from '../design/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

export default function JournalDashboard() {
  const { theme, toggle, mode } = useTheme();
  const navigation = useNavigation();

  return (
    <ScreenContainer>
      <Header
        title="Hey Daniel"
        rightElement={
          <TouchableOpacity
            onPress={toggle}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor: theme.colors.secondary,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: theme.colors.surface, fontWeight: '600', fontSize: 12 }}>
              {mode === 'dark' ? 'Light' : 'Dark'}
            </Text>
          </TouchableOpacity>
        }
      />

      {/* Identity sentence banner */}
      <View
        style={{
          backgroundColor: theme.colors.primary,
          padding: theme.spacing.sm,
          borderRadius: 10,
          marginBottom: theme.spacing.md,
        }}
      >
        <Text
          style={{
            color: theme.colors.surface,
            fontWeight: '600',
            fontSize: theme.typography.body.fontSize + 1,
          }}
        >
          “I’m choosing clarity over the old nicotine story.”
        </Text>
      </View>

      {/* Stats row */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: theme.spacing.md,
          gap: theme.spacing.md,
        }}
      >
        <View style={{ flex: 1, marginRight: 6 }}>
          <Text style={{ color: theme.colors.text, marginBottom: 4 }}>
            Streak:{' '}
            <Text style={{ fontWeight: '700', color: theme.colors.surface }}>
              3 days
            </Text>
          </Text>
          <Text style={{ color: theme.colors.text, marginBottom: 4 }}>
            Top belief:{' '}
            <Text style={{ fontWeight: '700', color: theme.colors.surface }}>
              “I need nicotine to cope”
            </Text>
          </Text>
          <Text style={{ color: theme.colors.text }}>
            Last entry:{' '}
            <Text style={{ fontWeight: '700', color: theme.colors.surface }}>
              Aug 1
            </Text>
          </Text>
        </View>
      </View>

      {/* Primary action */}
      <ThemedButton
        title="Write & Analyze"
        onPress={() => navigation.navigate('Entry')}
        style={{ marginBottom: theme.spacing.md }}
      />

      {/* Quick actions row */}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 12,
            backgroundColor: theme.colors.card,
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={() => {
            // stub: save affirmation
          }}
        >
          <Text style={{ color: theme.colors.text, fontWeight: '600' }}>
            Save affirmation
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 12,
            backgroundColor: theme.colors.card,
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={() => navigation.getParent()?.navigate('History')}
        >
          <Text style={{ color: theme.colors.text, fontWeight: '600' }}>
            Review history
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
