// src/screens/InsightsScreen.jsx
import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { useTheme } from '../design/ThemeProvider';

export default function InsightsScreen() {
  const { theme } = useTheme();

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing.lg }}>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: theme.typography.heading.fontSize,
            fontWeight: theme.typography.heading.fontWeight,
            marginBottom: theme.spacing.md,
          }}
        >
          Insights
        </Text>

        <View
          style={{
            backgroundColor: theme.colors.card,
            padding: theme.spacing.md,
            borderRadius: 10,
            marginBottom: theme.spacing.md,
          }}
        >
          <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: 6 }}>
            Current Identity
          </Text>
          <Text style={{ color: theme.colors.text }}>
            “I’m choosing clarity over the old nicotine story.” Confidence: 72%
          </Text>
        </View>

        <View
          style={{
            backgroundColor: theme.colors.card,
            padding: theme.spacing.md,
            borderRadius: 10,
            marginBottom: theme.spacing.md,
          }}
        >
          <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: 6 }}>
            Language Shift
          </Text>
          <View
            style={{
              height: 120,
              backgroundColor: theme.colors.highlight,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: theme.colors.text }}>[TrendChart placeholder]</Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: theme.colors.card,
            padding: theme.spacing.md,
            borderRadius: 10,
            marginBottom: theme.spacing.md,
          }}
        >
          <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: 6 }}>
            Belief Trends
          </Text>
          <Text style={{ color: theme.colors.text }}>
            Top implied beliefs: Awareness over Addiction, Clarity over avoidance.
          </Text>
        </View>

        <View
          style={{
            backgroundColor: theme.colors.card,
            padding: theme.spacing.md,
            borderRadius: 10,
            marginBottom: theme.spacing.md,
          }}
        >
          <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: 6 }}>
            Reframe Library
          </Text>
          <Text style={{ color: theme.colors.text }}>“I choose clarity.” “Discomfort is information.”</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: theme.spacing.md,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.card,
              padding: theme.spacing.md,
              borderRadius: 10,
              marginRight: theme.spacing.sm,
            }}
          >
            <Text style={{ color: theme.colors.text, fontWeight: '600' }}>Streak</Text>
            <Text style={{ color: theme.colors.text }}>5 days journaled</Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.card,
              padding: theme.spacing.md,
              borderRadius: 10,
              marginLeft: theme.spacing.sm,
            }}
          >
            <Text style={{ color: theme.colors.text, fontWeight: '600' }}>Consistency</Text>
            <Text style={{ color: theme.colors.text }}>80%</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
