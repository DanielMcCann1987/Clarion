// src/navigation/JournalStack.jsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JournalDashboard from '../screens/JournalDashboard';
import JournalEntryScreen from '../screens/JournalEntryScreen';
import AnalysisDetail from '../screens/AnalysisDetail';
import HistoryEntryDetailScreen from '../screens/HistoryEntryDetailScreen';

const Stack = createNativeStackNavigator();

export default function JournalStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="JournalDashboard" component={JournalDashboard} />
      <Stack.Screen name="Entry" component={JournalEntryScreen} />
      <Stack.Screen name="AnalysisDetail" component={AnalysisDetail} />
      <Stack.Screen name="HistoryDetail" component={HistoryEntryDetailScreen} />
    </Stack.Navigator>
  );
}
