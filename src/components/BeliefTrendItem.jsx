// src/components/BeliefTrendItem.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../design/ThemeProvider';

export default function BeliefTrendItem({ belief, count }) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.sm,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: theme.colors.text,
          flex: 1,
          fontSize: theme.typography.body.fontSize,
        }}
        numberOfLines={1}
      >
        {belief}
      </Text>
      <View
        style={{
          backgroundColor: theme.colors.primary,
          borderRadius: 12,
          paddingHorizontal: 10,
          paddingVertical: 4,
          marginLeft: theme.spacing.sm,
        }}
      >
        <Text style={{ color: theme.colors.surface, fontWeight: '600' }}>{count}</Text>
      </View>
    </View>
  );
}
