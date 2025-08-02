// src/components/InsightCard.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../design/ThemeProvider';

export default function InsightCard({ title, children, style }) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.card,
          padding: theme.spacing.md,
          borderRadius: 12,
          marginBottom: theme.spacing.lg,
        },
        style,
      ]}
    >
      {title && (
        <Text
          style={{
            color: theme.colors.secondary,
            fontWeight: '600',
            marginBottom: theme.spacing.sm,
          }}
        >
          {title}
        </Text>
      )}
      {children}
    </View>
  );
}
