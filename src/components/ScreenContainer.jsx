// src/components/ScreenContainer.jsx
import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../design/ThemeProvider';

/**
 * Wrap screen contents in this to get themed background, padding, etc.
 */
export default function ScreenContainer({ children, style }) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: theme.colors.background,
          padding: theme.spacing.md,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
