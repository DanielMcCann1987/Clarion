// src/screens/InsightsScreen.jsx
import React, { useMemo } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';
import { useTheme } from '../design/ThemeProvider';

/**
 * Lightweight placeholder for a chart until you integrate a real one.
 * You can replace this with your TrendChart component.
 */
function TrendChartPlaceholder({ label }) {
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

const MOCK_ANALYSIS = [
  {
    id: 'a1',
    impliedBeliefs: ['Awareness > Addiction', 'Clarity over avoidance'],
    reframe: 'I choose clarity over old stories.',
    identitySentence: "I'm choosing clarity over the old nicotine story.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 'a2',
    impliedBeliefs: ['Discomfort is information', 'Self-trust grows with practice'],
    reframe: 'Discomfort guides me, not stops me.',
    identitySentence: "I’m reclaiming my nervous system.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 'a3',
    impliedBeliefs: ['Action creates feedback', 'Consistency builds identity'],
    reframe: 'Every entry is a step toward clarity.',
    identitySentence: "I am someone who practices and adjusts.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
];

export default function InsightsScreen() {
  const { theme } = useTheme();

  // Compute current identity (most recent non-empty identity sentence)
  const currentIdentity = useMemo(() => {
    if (MOCK_ANALYSIS.length === 0) return '';
    return MOCK_ANALYSIS[0].identitySentence;
  }, []);

  // Aggregate belief trends
  const beliefCounts = useMemo(() => {
    const map = {};
    MOCK_ANALYSIS.forEach((a) => {
      a.impliedBeliefs.forEach((b) => {
        map[b] = (map[b] || 0) + 1;
      });
    });
    // to array of {belief, count}
    return Object.entries(map)
      .map(([belief, count]) => ({ belief, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // Reframe library
  const reframes = useMemo(() => {
    return MOCK_ANALYSIS.map((a) => a.reframe);
  }, []);

  // Streak (mocked) and consistency
  const streakDays = 5;
  const consistencyPercent = 80;

  return (
    <ScreenContainer>
      <Header title="Insights" />

      <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing.lg }}>
        {/* Identity Summary */}
        <View
          style={{
            backgroundColor: theme.colors.card,
            padding: theme.spacing.md,
            borderRadius: 12,
            marginBottom: theme.spacing.lg,
          }}
        >
          <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: 4 }}>
            Current Identity
          </Text>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: theme.typography.subheading.fontSize,
              fontWeight: '600',
            }}
          >
            {currentIdentity}
          </Text>
          <Text style={{ color: theme.colors.muted, marginTop: 4 }}>
            Confidence: 72%
          </Text>
        </View>

        {/* Language Shift */}
        <View
          style={{
            backgroundColor: theme.colors.card,
            padding: theme.spacing.md,
            borderRadius: 12,
            marginBottom: theme.spacing.lg,
          }}
        >
          <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: 6 }}>
            Language Shift
          </Text>
          <TrendChartPlaceholder label="Generalisation vs Ownership over time" />
        </View>

        {/* Belief Trends */}
        <View
          style={{
            backgroundColor: theme.colors.card,
            padding: theme.spacing.md,
            borderRadius: 12,
            marginBottom: theme.spacing.lg,
          }}
        >
          <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: 6 }}>
            Belief Trends
          </Text>
          {beliefCounts.map((b) => (
            <View
              key={b.belief}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: theme.spacing.sm,
              }}
            >
              <Text style={{ color: theme.colors.text }}>{b.belief}</Text>
              <View
                style={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: 12,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                }}
              >
                <Text style={{ color: theme.colors.surface, fontWeight: '600' }}>{b.count}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Reframe Library */}
        <View
          style={{
            backgroundColor: theme.colors.card,
            padding: theme.spacing.md,
            borderRadius: 12,
            marginBottom: theme.spacing.lg,
          }}
        >
          <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: 6 }}>
            Reframe Library
          </Text>
          {reframes.map((r, i) => (
            <View
              key={i}
              style={{
                backgroundColor: theme.colors.highlight,
                padding: theme.spacing.sm,
                borderRadius: 8,
                marginBottom: theme.spacing.sm,
              }}
            >
              <Text style={{ color: theme.colors.text }}>{r}</Text>
            </View>
          ))}
        </View>

        {/* Streak / Consistency */}
        <View
          style={{
            flexDirection: 'row',
            gap: theme.spacing.md,
            marginBottom: theme.spacing.lg,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.card,
              padding: theme.spacing.md,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: theme.colors.muted, fontSize: 12 }}>Streak</Text>
            <Text style={{ color: theme.colors.text, fontWeight: '700', marginTop: 4 }}>
              {streakDays} days
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.card,
              padding: theme.spacing.md,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: theme.colors.muted, fontSize: 12 }}>Consistency</Text>
            <Text style={{ color: theme.colors.text, fontWeight: '700', marginTop: 4 }}>
              {consistencyPercent}%
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
