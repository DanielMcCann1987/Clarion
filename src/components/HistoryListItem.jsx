// src/components/HistoryListItem.jsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../design/ThemeProvider';

export default function HistoryListItem({
  title,
  snippet,
  createdAt, // JS Date object or ISO string
  onPress,
  favorite = false,
}) {
  const { theme } = useTheme();
  const dateObj = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
  const dateStr = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }); // e.g., "Aug 1"
  const timeStr = dateObj.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  }); // e.g., "09:30 AM"

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderRadius: 10,
          padding: theme.spacing.md,
          marginBottom: theme.spacing.sm,
          flexDirection: 'row',
          alignItems: 'flex-start',
        },
      ]}
      accessibilityLabel={`Entry titled ${title}, ${dateStr} at ${timeStr}`}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: theme.typography.subheading.fontSize,
              fontWeight: '600',
              flexShrink: 1,
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
          <View style={{ marginLeft: 8, alignItems: 'flex-end' }}>
            <Text style={{ color: theme.colors.muted, fontSize: 12 }}>{dateStr}</Text>
            <Text style={{ color: theme.colors.muted, fontSize: 12 }}>{timeStr}</Text>
          </View>
        </View>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: theme.typography.body.fontSize,
            marginBottom: 4,
          }}
          numberOfLines={2}
        >
          {snippet}
        </Text>
      </View>
      {favorite && (
        <Text style={{ marginLeft: 8, color: theme.colors.accent, fontSize: 16 }}>★</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // styles via theme in usage
  },
});
