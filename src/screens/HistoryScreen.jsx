// src/screens/HistoryScreen.jsx
import React from 'react';
import { Text } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';
import { useTheme } from '../design/ThemeProvider';

export default function HistoryScreen() {
  const { theme } = useTheme();

  return (
    <ScreenContainer>
      <Header title="History" />
      <Text
        style={{
          color: theme.colors.muted,
          marginTop: theme.spacing.sm,
          fontSize: theme.typography.body.fontSize,
        }}
      >
        Search / filter bar placeholder
      </Text>
      <Text style={{ color: theme.colors.text, marginTop: theme.spacing.md }}>
        List of past entries will appear here.
      </Text>
    </ScreenContainer>
  );
}
