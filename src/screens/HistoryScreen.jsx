// src/screens/HistoryScreen.jsx
import React from 'react';
import { View, Text } from 'react-native';

export default function HistoryScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0f111a', padding: 16 }}>
      <Text style={{ color: '#f5f5fa', fontSize: 20, fontWeight: '600' }}>
        History Screen
      </Text>
      <Text style={{ color: '#a0a8c0', marginTop: 8 }}>
        Placeholder for list of past entries.
      </Text>
    </View>
  );
}
