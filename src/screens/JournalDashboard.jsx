import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ThemedButton from '../components/ThemedButton';
import Header from '../components/Header';
import { useTheme } from '../design/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Helpers
function formatYMD(date) {
  return date.toISOString().split('T')[0];
}
function formatDisplay(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function JournalDashboard() {
  const { theme, toggle, mode } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const today = new Date();
  const days = useMemo(() => {
    const arr = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      arr.push(d);
    }
    return arr;
  }, [today]);

  const [selectedDate, setSelectedDate] = useState(formatYMD(today));

  const goalsMap = {
    [formatYMD(today)]: ['Write morning entry', 'Review last reframes', 'Go for a run'],
    [formatYMD(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1))]: [
      'Practice mindfulness',
      'Read 10 pages',
    ],
  };
  const goals = goalsMap[selectedDate] || ['No goals set for this day.'];

  return (
    <ScreenContainer>
      <Header
        title="Let’s Journal"
        rightElement={
          <TouchableOpacity
            onPress={toggle}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor: theme.colors.secondary,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: theme.colors.surface, fontWeight: '600', fontSize: 12 }}>
              {mode === 'dark' ? 'Light' : 'Dark'}
            </Text>
          </TouchableOpacity>
        }
      />

      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: theme.spacing.sm,
            paddingBottom: theme.spacing.lg,
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Reframe Sentence Banner */}
          <View
            style={{
              backgroundColor: theme.colors.primary,
              padding: theme.spacing.md,
              borderRadius: 10,
              marginBottom: theme.spacing.lg,
            }}
          >
            <Text
              style={{
                color: theme.colors.surface,
                fontWeight: '700',
                fontSize: theme.typography.subheading.fontSize,
                lineHeight: 24,
              }}
            >
              “There is no such thing as failure, only feedback!.”
            </Text>
          </View>

          {/* Calendar Strip */}
          <View style={{ marginBottom: theme.spacing.lg }}>
            <Text
              style={{
                color: theme.colors.text,
                fontWeight: '600',
                fontSize: 16,
                marginBottom: theme.spacing.sm,
              }}
            >
              Today’s Goals
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: theme.spacing.sm }}
            >
              {days.map((d) => {
                const ymd = formatYMD(d);
                const isSelected = ymd === selectedDate;
                return (
                  <TouchableOpacity
                    key={ymd}
                    onPress={() => setSelectedDate(ymd)}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 14,
                      backgroundColor: isSelected ? theme.colors.secondary : theme.colors.card,
                      borderRadius: 10,
                      marginRight: theme.spacing.sm,
                      minWidth: 72,
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: isSelected ? theme.colors.surface : theme.colors.text,
                        fontWeight: isSelected ? '700' : '500',
                        fontSize: 14,
                      }}
                    >
                      {formatDisplay(d)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Goals */}
            <View
              style={{
                backgroundColor: theme.colors.card,
                padding: theme.spacing.md,
                borderRadius: 10,
                marginBottom: theme.spacing.lg,
              }}
            >
              {goals.map((g, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginBottom: i === goals.length - 1 ? 0 : 10,
                  }}
                >
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: theme.colors.accent,
                      marginTop: 8,
                      marginRight: 12,
                    }}
                  />
                  <Text style={{ color: theme.colors.text, flex: 1 }}>{g}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons Block - Pinned above bottom bar */}
        <View
          style={{
            paddingTop: theme.spacing.sm,
            paddingBottom: insets.bottom + theme.spacing.sm,
            gap: theme.spacing.sm,
          }}
        >
          <ThemedButton
            title="Write & Analyze"
            onPress={() => navigation.navigate('Entry')}
            style={{ marginBottom: theme.spacing.sm }}
          />

          <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
            <TouchableOpacity
              onPress={() => {
                /* stub: save affirmation */
              }}
              style={{
                flex: 1,
                backgroundColor: theme.colors.card,
                paddingVertical: 14,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: theme.colors.text, fontWeight: '600' }}>Save affirmation</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.getParent()?.navigate('History')}
              style={{
                flex: 1,
                backgroundColor: theme.colors.card,
                paddingVertical: 14,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: theme.colors.text, fontWeight: '600' }}>Review history</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}
