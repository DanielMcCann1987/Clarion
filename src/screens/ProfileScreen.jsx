// src/screens/ProfileScreen.jsx
import React from 'react';
import { Text, TouchableOpacity, View, Switch } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { useTheme } from '../design/ThemeProvider';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { theme, mode, toggle } = useTheme();
  const { logout } = useAuth();

  return (
    <ScreenContainer>
      <Header title="Profile & Settings" />

      <View style={{ marginBottom: theme.spacing.md }}>
        <Text style={{ color: theme.colors.text, fontWeight: '600' }}>Account</Text>
        <Text style={{ color: theme.colors.muted, marginTop: 4 }}>daniel@example.com</Text>
        <TouchableOpacity
          style={{
            marginTop: 8,
            padding: 10,
            backgroundColor: theme.colors.primary,
            borderRadius: 6,
            width: 120,
            alignItems: 'center',
          }}
          onPress={() => {
            logout();
          }}
        >
          <Text style={{ color: theme.colors.surface, fontWeight: '600' }}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: theme.spacing.md }}>
        <Text style={{ color: theme.colors.text, fontWeight: '600' }}>Theme</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 12 }}>
          <Text style={{ color: theme.colors.text, marginRight: 8 }}>
            {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <Switch
            value={mode === 'dark'}
            onValueChange={toggle}
            thumbColor={theme.colors.surface}
            trackColor={{ false: theme.colors.muted, true: theme.colors.primary }}
          />
        </View>
      </View>

      <View style={{ marginBottom: theme.spacing.md }}>
        <Text style={{ color: theme.colors.text, fontWeight: '600' }}>Export</Text>
        <TouchableOpacity
          style={{
            marginTop: 6,
            padding: 10,
            backgroundColor: theme.colors.secondary,
            borderRadius: 6,
            width: 150,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: theme.colors.surface }}>Export CSV / Markdown</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: theme.spacing.md }}>
        <Text style={{ color: theme.colors.text, fontWeight: '600' }}>Privacy</Text>
        <TouchableOpacity
          style={{
            marginTop: 6,
            padding: 10,
            backgroundColor: theme.colors.card,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: theme.colors.error,
            width: 180,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: theme.colors.error }}>Delete All Data</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
