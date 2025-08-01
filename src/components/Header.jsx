// src/components/Header.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../design/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header({ title, rightElement, showBack = false, onBack }) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 4,
          paddingBottom: 4,
          paddingHorizontal: theme.spacing.md,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <View style={styles.leftRow}>
        {showBack && (
          <TouchableOpacity onPress={onBack} style={{ marginRight: 12 }}>
            <Text style={{ color: theme.colors.text, fontSize: 18 }}>←</Text>
          </TouchableOpacity>
        )}
        <Text
          numberOfLines={1}
          style={[
            styles.title,
            {
              color: theme.colors.text,
              ...theme.typography.heading,
            },
          ]}
        >
          {title}
        </Text>
      </View>
      {rightElement ? <View style={styles.right}>{rightElement}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    flexShrink: 1,
  },
  right: {
    marginLeft: 12,
  },
});
