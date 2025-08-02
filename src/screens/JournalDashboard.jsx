// src/JournalDashboard.jsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ThemedButton from '../components/ThemedButton';
import Header from '../components/Header';
import { useTheme } from '../design/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

// Helpers
function formatYMD(date) {
  return date.toISOString().split('T')[0];
}
function formatDisplay(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const INITIAL_GOALS = {
  // prepopulated sample goals
  [formatYMD(new Date())]: ['Write morning entry', 'Review last reframes', 'Go for a run'],
  [formatYMD(
    (() => {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      return d;
    })()
  )]: ['Practice mindfulness', 'Read 10 pages'],
};

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
  const [goalsByDate, setGoalsByDate] = useState(INITIAL_GOALS);

  const goals = goalsByDate[selectedDate] || ['No goals set for this day.'];

  // modal state
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoalText, setNewGoalText] = useState('');
  const [newGoalDate, setNewGoalDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const addGoal = () => {
    if (!newGoalText.trim()) return;
    const dateKey = formatYMD(newGoalDate);
    setGoalsByDate((prev) => {
      const existing = prev[dateKey] || [];
      return { ...prev, [dateKey]: [...existing, newGoalText.trim()] };
    });
    setSelectedDate(dateKey);
    setNewGoalText('');
    setShowGoalModal(false);
  };

  const onChangeDate = (event, selected) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selected) {
      setNewGoalDate(selected);
    }
  };

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

          {/* Calendar Strip + Goals */}
          <View style={{ marginBottom: theme.spacing.lg }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: theme.spacing.sm,
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  color: theme.colors.text,
                  fontWeight: '600',
                  fontSize: 16,
                }}
              >
                Goals
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setNewGoalDate(new Date(selectedDate));
                  setNewGoalText('');
                  setShowGoalModal(true);
                }}
                style={{
                  padding: 6,
                  backgroundColor: theme.colors.accent,
                  borderRadius: 6,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                accessibilityLabel="Add goal"
              >
                <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>＋</Text>
              </TouchableOpacity>
            </View>

            {/* Date selector strip */}
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

      {/* Add Goal Modal */}
      <Modal visible={showGoalModal} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000080',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.card,
              borderRadius: 12,
              padding: 16,
            }}
          >
            <Text style={{ color: theme.colors.text, fontWeight: '600', marginBottom: 8, fontSize: 16 }}>
              New Goal
            </Text>

            <Text style={{ color: theme.colors.muted, marginBottom: 4 }}>Goal</Text>
            <TextInput
              placeholder="Describe the goal"
              placeholderTextColor={theme.colors.muted}
              value={newGoalText}
              onChangeText={setNewGoalText}
              style={{
                backgroundColor: '#1f2233',
                color: theme.colors.text,
                padding: 12,
                borderRadius: 8,
                marginBottom: 12,
              }}
            />

            <Text style={{ color: theme.colors.muted, marginBottom: 4 }}>Date</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={{
                backgroundColor: theme.colors.secondary,
                padding: 12,
                borderRadius: 8,
                marginBottom: 12,
              }}
            >
              <Text style={{ color: theme.colors.surface }}>
                {formatDisplay(newGoalDate)}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={newGoalDate}
                mode="date"
                display="default"
                onChange={(e, d) => {
                  onChangeDate(e, d);
                }}
                maximumDate={new Date(2100, 0, 1)}
              />
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
              <TouchableOpacity
                onPress={() => setShowGoalModal(false)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  backgroundColor: '#555',
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: '#fff' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addGoal}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  backgroundColor: theme.colors.accent,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: '#000', fontWeight: '600' }}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
