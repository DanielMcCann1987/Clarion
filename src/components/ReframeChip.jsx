// src/components/ReframeChip.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../design/ThemeProvider';

export default function ReframeChip({ text, onPress, selected = false, style }) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: selected ? theme.colors.primary : theme.colors.highlight,
          paddingVertical: 8,
          paddingHorizontal: 14,
          borderRadius: 8,
          marginBottom: theme.spacing.sm,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: selected ? theme.colors.surface : theme.colors.text,
          fontSize: theme.typography.body.fontSize - 1,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
