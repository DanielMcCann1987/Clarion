// src/screens/ProfileScreen.jsx
import React from 'react';
import { Text, TouchableOpacity, View, Switch, ScrollView } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { useTheme } from '../design/ThemeProvider';
import Header from '../components/Header';

export default function ProfileScreen() {
  const { theme, mode, toggle } = useTheme();

  // Keep original style but add a bit of vertical gap after header
  return (
    <ScreenContainer>
      <Header title="Profile & Settings" />
      <ScrollView contentContainerStyle={{ paddingTop: theme.spacing.md, paddingBottom: theme.spacing.lg }}>
        {/* Account */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ color: theme.colors.text, fontWeight: '600', fontSize: 16, marginBottom: 4 }}>
            Account
          </Text>
          <Text style={{ color: theme.colors.muted, marginBottom: 8 }}>daniel@example.com</Text>
          <TouchableOpacity
            style={{
              paddingVertical: 12,
              paddingHorizontal: 20,
              backgroundColor: theme.colors.primary,
              borderRadius: 8,
              alignSelf: 'flex-start',
              marginTop: 4,
            }}
          >
            <Text style={{ color: theme.colors.surface, fontWeight: '600' }}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Theme */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ color: theme.colors.text, fontWeight: '600', fontSize: 16, marginBottom: 4 }}>
            Theme
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ color: theme.colors.text, marginBottom: 4 }}>
                {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </Text>
              <Text style={{ color: theme.colors.muted, fontSize: 12 }}>Toggle appearance</Text>
            </View>
            <Switch
              value={mode === 'dark'}
              onValueChange={toggle}
              thumbColor={theme.colors.surface}
              trackColor={{ false: theme.colors.muted, true: theme.colors.primary }}
            />
          </View>
        </View>

        {/* Export */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ color: theme.colors.text, fontWeight: '600', fontSize: 16, marginBottom: 4 }}>
            Export
          </Text>
          <TouchableOpacity
            style={{
              paddingVertical: 14,
              paddingHorizontal: 20,
              backgroundColor: theme.colors.secondary,
              borderRadius: 8,
              alignSelf: 'flex-start',
            }}
          >
            <Text style={{ color: theme.colors.surface, fontWeight: '600' }}>Export CSV / Markdown</Text>
          </TouchableOpacity>
        </View>

        {/* Privacy */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ color: theme.colors.text, fontWeight: '600', fontSize: 16, marginBottom: 4 }}>
            Privacy
          </Text>
          <TouchableOpacity
            style={{
              paddingVertical: 14,
              paddingHorizontal: 20,
              backgroundColor: 'transparent',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.colors.error,
              alignSelf: 'flex-start',
            }}
          >
            <Text style={{ color: theme.colors.error, fontWeight: '600' }}>Delete All Data</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
