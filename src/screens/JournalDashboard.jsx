// src/JournalDashboard.jsx
import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Platform,
  Animated,
  Easing,
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

// MarqueeText: continuous right-to-left scroll; falls back to static if content fits
function MarqueeText({ text, speed = 50, textStyle, style }) {
  const animated = useRef(new Animated.Value(0)).current;
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!contentWidth || !containerWidth) return;

    if (contentWidth <= containerWidth) {
      animated.setValue(0);
      return;
    }

    const duration = (contentWidth / speed) * 1000;

    animated.setValue(0);
    const animation = Animated.loop(
      Animated.timing(animated, {
        toValue: -contentWidth,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();

    return () => animation.stop();
  }, [contentWidth, containerWidth, speed, animated]);

  return (
    <View
      style={[{ overflow: 'hidden', flexDirection: 'row' }, style]}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      accessible
      accessibilityRole="text"
      accessibilityLabel={text}
    >
      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [{ translateX: animated }],
        }}
      >
        <Text
          numberOfLines={1}
          onLayout={(e) => setContentWidth(e.nativeEvent.layout.width)}
          style={[textStyle, { includeFontPadding: false }]}
        >
          {text}
        </Text>
        {/* Duplicate for seamless looping */}
        <Text numberOfLines={1} style={[textStyle, { marginLeft: 40, includeFontPadding: false }]}>
          {text}
        </Text>
      </Animated.View>
    </View>
  );
}

const INITIAL_GOALS = {
  [formatYMD(new Date())]: ['Write morning entry', 'Review last reframes', 'Go for a run'],
  [formatYMD(
    (() => {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      return d;
    })()
  )]: ['Practice mindfulness', 'Read 10 pages'],
};

const DEFAULT_TAGS = ['anxiety', 'smoking', 'clarity', 'stress', 'gratitude'];

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
  const [dashboardTags, setDashboardTags] = useState(DEFAULT_TAGS);

  const goals = goalsByDate[selectedDate] || ['No goals set for this day.'];

  // goal modal state
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoalText, setNewGoalText] = useState('');
  const [newGoalDate, setNewGoalDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // tag modal state
  const [showTagModal, setShowTagModal] = useState(false);
  const [newTagText, setNewTagText] = useState('');

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

  const toggleDashboardTag = (tag) => {
    setDashboardTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const addTag = () => {
    const t = newTagText.trim().toLowerCase();
    if (!t) return;
    setDashboardTags((prev) => (prev.includes(t) ? prev : [...prev, t]));
    setNewTagText('');
    setShowTagModal(false);
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
          {/* Reframe Sentence Banner with Marquee */}
          <View
            style={{
              backgroundColor: theme.colors.primary,
              padding: theme.spacing.md,
              borderRadius: 10,
              marginBottom: theme.spacing.lg,
              overflow: 'hidden',
            }}
          >
            <MarqueeText
              text="“There is no such thing as failure, only feedback!.”"
              speed={80}
              textStyle={{
                color: theme.colors.surface,
                fontWeight: '700',
                fontSize: theme.typography.subheading.fontSize,
                lineHeight: 24,
              }}
              style={{ flex: 1 }}
            />
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
                marginBottom: theme.spacing.md,
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

            {/* Tags section placed directly under goals */}
            <View
              style={{
                marginBottom: theme.spacing.lg,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: theme.spacing.sm,
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ color: theme.colors.text, fontWeight: '600', fontSize: 16 }}>
                  Tags
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setNewTagText('');
                    setShowTagModal(true);
                  }}
                  style={{
                    padding: 6,
                    backgroundColor: theme.colors.accent,
                    borderRadius: 6,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  accessibilityLabel="Add tag"
                >
                  <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>＋</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: 'row', gap: theme.spacing.sm, paddingHorizontal: 4 }}
                style={{ marginBottom: theme.spacing.sm }}
              >
                {dashboardTags.map((tag) => {
                  const selected = dashboardTags.includes(tag);
                  return (
                    <TouchableOpacity
                      key={tag}
                      onPress={() => toggleDashboardTag(tag)}
                      style={{
                        backgroundColor: selected ? theme.colors.primary : theme.colors.card,
                        borderRadius: 16,
                        paddingVertical: 8,
                        paddingHorizontal: 14,
                        borderWidth: 1,
                        borderColor: selected ? theme.colors.primary : theme.colors.muted,
                      }}
                    >
                      <Text
                        style={{
                          color: selected ? theme.colors.surface : theme.colors.text,
                          fontSize: 12,
                          fontWeight: '600',
                        }}
                      >
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons Block - Pinned above bottom bar */}
        <View
          style={{
            paddingTop: theme.spacing.sm,
            paddingBottom: theme.spacing.sm, // matched top
            gap: theme.spacing.xs,
          }}
        >
          <ThemedButton
            title="Write & Analyze"
            onPress={() => navigation.navigate('Entry')}
            style={{ marginBottom: theme.spacing.xs }}
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

      {/* Add Tag Modal */}
      <Modal visible={showTagModal} transparent animationType="slide">
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
              New Tag
            </Text>

            <Text style={{ color: theme.colors.muted, marginBottom: 4 }}>Tag</Text>
            <TextInput
              placeholder="e.g. resilience"
              placeholderTextColor={theme.colors.muted}
              value={newTagText}
              onChangeText={setNewTagText}
              style={{
                backgroundColor: '#1f2233',
                color: theme.colors.text,
                padding: 12,
                borderRadius: 8,
                marginBottom: 12,
              }}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
              <TouchableOpacity
                onPress={() => setShowTagModal(false)}
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
                onPress={addTag}
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
