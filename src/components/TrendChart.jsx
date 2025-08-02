// src/components/TrendChart.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../design/ThemeProvider';

export default function TrendChart({ label }) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        height: 120,
        backgroundColor: theme.colors.highlight,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: theme.colors.text }}>{label}</Text>
    </View>
  );
}
