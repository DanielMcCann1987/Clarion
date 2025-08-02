// src/screens/InsightsScreen.jsx
import React, { useMemo } from 'react';
import { View, ScrollView, Text } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';
import { useTheme } from '../design/ThemeProvider';
import IdentityBanner from '../components/IdentityBanner';
import InsightCard from '../components/InsightCard';
import BeliefTrendItem from '../components/BeliefTrendItem';
import ReframeChip from '../components/ReframeChip';
import MetricCard from '../components/MetricCard';
import TrendChart from '../components/TrendChart'; // fallback to placeholder version if you have that

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

  return (
    <ScreenContainer>
      <Header title="Insights" />
      <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing.lg }}>
        {/* Identity Banner */}
        <IdentityBanner identitySentence={currentIdentity} confidence={72} />

        {/* Language Shift */}
        <InsightCard title="Language Shift">
          <TrendChart label="Generalisation vs Ownership over time" />
        </InsightCard>

        {/* Belief Trends */}
        <InsightCard title="Belief Trends">
          {beliefCounts.map((b) => (
            <BeliefTrendItem key={b.belief} belief={b.belief} count={b.count} />
          ))}
        </InsightCard>

        {/* Reframe Library */}
        <InsightCard title="Reframe Library">
          {reframes.map((r, i) => (
            <ReframeChip key={i} text={r} />
          ))}
        </InsightCard>

        {/* Metrics row */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: theme.spacing.sm,
            gap: theme.spacing.md, // if unsupported, replace with marginRight on first
          }}
        >
          <MetricCard label="Streak" value={`${streakDays} days`} style={{ marginRight: theme.spacing.md / 2 }} />
          <MetricCard label="Consistency" value={`${consistencyPercent}%`} style={{ marginLeft: theme.spacing.md / 2 }} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
