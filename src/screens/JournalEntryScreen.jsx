// src/screens/JournalEntryScreen.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function JournalEntryScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#0f111a', padding: 16 }}>
      <Text style={{ color: '#f5f5fa', fontSize: 22, fontWeight: '600', marginBottom: 12 }}>
        Journal Entry
      </Text>
      <Text style={{ color: '#aaa', marginBottom: 20 }}>
        Multiline input placeholder goes here.
      </Text>
      <Button
        title="Analyze with Milton Model"
        onPress={() => navigation.navigate('AnalysisDetail')}
        color="#7c4dff"
      />
    </View>
  );
}
