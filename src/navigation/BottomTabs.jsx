// src/navigation/BottomTabs.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JournalStack from './JournalStack';
import HistoryStack from './HistoryStack'; // <--- use stack here
import InsightsScreen from '../screens/InsightsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useTheme } from '../design/ThemeProvider';
import { Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const ICON_SIZE = 20;

export default function BottomTabs() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          flexDirection: 'row',
          paddingTop: 4,
          paddingBottom: Math.max(insets.bottom, 6),
          paddingHorizontal: 12,
          height: 52 + (insets.bottom > 0 ? insets.bottom : 0),
          elevation: 3,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Journal"
        component={JournalStack}
        options={{
          tabBarLabel: 'Journal',
          tabBarIcon: ({ color, focused }) => (
            <ViewWrapper focused={focused} theme={theme}>
              <MaterialCommunityIcons
                name="message-text-outline"
                size={ICON_SIZE}
                color={focused ? theme.colors.card : color}
              />
            </ViewWrapper>
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryStack} // <--- updated
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, focused }) => (
            <ViewWrapper focused={focused} theme={theme}>
              <MaterialCommunityIcons
                name="history"
                size={ICON_SIZE}
                color={focused ? theme.colors.card : color}
              />
            </ViewWrapper>
          ),
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarLabel: 'Insights',
          tabBarIcon: ({ color, focused }) => (
            <ViewWrapper focused={focused} theme={theme}>
              <MaterialCommunityIcons
                name="chart-line"
                size={ICON_SIZE}
                color={focused ? theme.colors.card : color}
              />
            </ViewWrapper>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <ViewWrapper focused={focused} theme={theme}>
              <MaterialCommunityIcons
                name="account-circle"
                size={ICON_SIZE}
                color={focused ? theme.colors.card : color}
              />
            </ViewWrapper>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function ViewWrapper({ children, focused, theme }) {
  return (
    <Text style={focused ? styles.activeWrapper(theme) : styles.inactiveWrapper()}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  activeWrapper: (theme) => ({
    backgroundColor: theme.colors.primary,
    padding: 4,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  inactiveWrapper: () => ({
    padding: 2,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  }),
});
