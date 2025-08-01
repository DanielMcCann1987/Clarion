// src/screens/HistoryScreen.jsx
import React from 'react';
import { Text, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';

export default function HistoryScreen() {
  return (
    <ScreenContainer>
      <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600', marginBottom: 8 }}>
        History
      </Text>
      <Text style={{ color: '#aaa' }}>List of past entries will go here.</Text>
    </ScreenContainer>
  );
}
