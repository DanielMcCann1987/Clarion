// src/components/IdentityBanner.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../design/ThemeProvider';

export default function IdentityBanner({ identitySentence, confidence, style }) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.primary,
          padding: theme.spacing.md,
          borderRadius: 12,
          marginBottom: theme.spacing.lg,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: theme.colors.surface,
          fontSize: theme.typography.subheading.fontSize,
          fontWeight: '600',
          marginBottom: 4,
        }}
      >
        Current Identity
      </Text>
      <Text
        style={{
          color: theme.colors.surface,
          fontSize: theme.typography.body.fontSize + 1,
          fontWeight: '700',
        }}
      >
        {identitySentence}
      </Text>
      {typeof confidence !== 'undefined' && (
        <Text
          style={{
            color: theme.colors.surface,
            marginTop: 4,
            fontSize: theme.typography.caption.fontSize,
          }}
        >
          Confidence: {confidence}%
        </Text>
      )}
    </View>
  );
}
