// src/navigation/HistoryStack.jsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HistoryScreen from '../screens/HistoryScreen';
import HistoryEntryDetailScreen from '../screens/HistoryEntryDetailScreen';
import AnalysisDetail from '../screens/AnalysisDetail'; // ✅ ADD THIS

const Stack = createNativeStackNavigator();

export default function HistoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HistoryList" component={HistoryScreen} />
      <Stack.Screen name="HistoryDetail" component={HistoryEntryDetailScreen} />
      <Stack.Screen name="AnalysisDetail" component={AnalysisDetail} /> 
    </Stack.Navigator>
  );
}
