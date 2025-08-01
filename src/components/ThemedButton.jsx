// src/components/ThemedButton.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../design/ThemeProvider';

export default function ThemedButton({ title, onPress, variant = 'primary', style }) {
  const { theme } = useTheme();
  const backgroundColor =
    variant === 'primary' ? theme.colors.primary : theme.colors.secondary;
  const textColor = theme.colors.surface;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor,
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 16,
        },
        style,
      ]}
      accessibilityLabel={title}
    >
      <Text style={{ color: textColor, fontWeight: '600' }}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
