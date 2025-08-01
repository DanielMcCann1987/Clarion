// src/components/Header.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../design/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header({ title, rightElement }) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 4, // respect status bar but keep small
          paddingBottom: 4,
          paddingHorizontal: theme.spacing.md,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
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
      {rightElement ? <View style={styles.right}>{rightElement}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // no extra height, tight layout
  },
  title: {
    flex: 1,
  },
  right: {
    marginLeft: 12,
  },
});
