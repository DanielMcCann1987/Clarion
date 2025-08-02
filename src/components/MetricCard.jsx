// src/components/MetricCard.jsx
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../design/ThemeProvider';

export default function MetricCard({ label, value, style }) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: theme.colors.card,
          padding: theme.spacing.md,
          borderRadius: 12,
        },
        style,
      ]}
    >
      <Text style={{ color: theme.colors.muted, fontSize: 12 }}>{label}</Text>
      <Text style={{ color: theme.colors.text, fontWeight: '700', marginTop: 4 }}>
        {value}
      </Text>
    </View>
  );
}
