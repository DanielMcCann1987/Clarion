// src/screens/ProfileScreen.jsx
import React from 'react';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0f111a', padding: 16 }}>
      <Text style={{ color: '#f5f5fa', fontSize: 20, fontWeight: '600' }}>
        Profile / Settings
      </Text>
    </View>
  );
}
