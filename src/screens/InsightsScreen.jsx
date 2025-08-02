// src/screens/InsightsScreen.jsx
import React, { useMemo } from 'react';
import { View, ScrollView, Text } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';
import { useTheme } from '../design/ThemeProvider';
import IdentityBanner from '../components/IdentityBanner';
import InsightCard from '../components/InsightCard';
import BeliefTrendItem from '../components/BeliefTrendItem';
import MetricCard from '../components/MetricCard';
// Note: not using imported TrendChart here for Language Shift to control background precisely
import TrendChart from '../components/TrendChart';

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

// Local replacement for the Language Shift chart so its panel background matches the card
function LanguageShiftChart({ label }) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.card, // same as card
        borderRadius: 6,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 100,
      }}
    >
      <Text style={{ color: theme.colors.text }}>{label}</Text>
    </View>
  );
}

export default function InsightsScreen() {
  const { theme } = useTheme();

  // Current identity from most recent
  const currentIdentity = useMemo(() => {
    if (!MOCK_ANALYSIS.length) return '';
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
    return Object.entries(map)
      .map(([belief, count]) => ({ belief, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // Reframes
  const reframes = useMemo(() => MOCK_ANALYSIS.map((a) => a.reframe), []);

  // Metrics (mocked)
  const streakDays = 5;
  const consistencyPercent = 80;

  // Color for Reframe Library heading/borders
  const reframeColor = '#2C6D6D';

  return (
    <ScreenContainer>
      <Header title="Insights" />
      <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing.lg }}>
        {/* Identity Banner */}
        <IdentityBanner identitySentence={currentIdentity} confidence={72} />

        {/* Language Shift (heading color matches Belief Trends, inner box now card-coloured) */}
        <InsightCard title={null}>
          <Text
            style={{
              color: theme.colors.secondary,
              fontWeight: '600',
              marginBottom: theme.spacing.sm,
              fontSize: 14,
            }}
          >
            Language Shift
          </Text>
          <View
            style={{
              borderRadius: 8,
              overflow: 'hidden',
              marginBottom: theme.spacing.sm,
            }}
          >
            <LanguageShiftChart label="Generalisation vs Ownership over time" />
          </View>
        </InsightCard>

        {/* Belief Trends (uses default title styling) */}
        <InsightCard title="Belief Trends">
          {beliefCounts.map((b) => (
            <BeliefTrendItem key={b.belief} belief={b.belief} count={b.count} />
          ))}
        </InsightCard>

        {/* Reframe Library */}
        <InsightCard title={null}>
          <Text
            style={{
              color: reframeColor, // changed to #2C6D6D
              fontWeight: '600',
              marginBottom: theme.spacing.sm,
              fontSize: 14,
            }}
          >
            Reframe Library
          </Text>
          <View style={{ flexDirection: 'column' }}>
            {reframes.map((r, i) => (
              <View
                key={i}
                style={{
                  backgroundColor: theme.colors.card,
                  borderRadius: 8,
                  padding: theme.spacing.sm,
                  marginBottom: theme.spacing.sm,
                  borderWidth: 1,
                  borderColor: reframeColor, // changed to #2C6D6D
                }}
              >
                <Text style={{ color: theme.colors.text }}>{r}</Text>
              </View>
            ))}
          </View>
        </InsightCard>

        {/* Metrics row */}
        <View style={{ flexDirection: 'row', marginTop: theme.spacing.sm, gap: theme.spacing.md }}>
          <MetricCard label="Streak" value={`${streakDays} days`} style={{ marginRight: theme.spacing.md / 2 }} />
          <MetricCard label="Consistency" value={`${consistencyPercent}%`} style={{ marginLeft: theme.spacing.md / 2 }} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
