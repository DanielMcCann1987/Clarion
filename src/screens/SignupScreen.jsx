// src/screens/SignupScreen.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { useTheme } from '../design/ThemeProvider';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScreenContainer>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: theme.typography.heading.fontSize,
          fontWeight: theme.typography.heading.fontWeight,
          marginBottom: theme.spacing.md,
        }}
      >
        Sign Up
      </Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={theme.colors.muted}
        value={email}
        onChangeText={setEmail}
        style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={theme.colors.muted}
        value={password}
        onChangeText={setPassword}
        style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
        secureTextEntry
      />
      <TouchableOpacity
        style={{
          backgroundColor: theme.colors.primary,
          paddingVertical: 14,
          borderRadius: 10,
          alignItems: 'center',
          marginTop: theme.spacing.md,
        }}
        onPress={() => {
          // stub: pretend to sign up and go back to login
          navigation.goBack();
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>Create Account</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
});
