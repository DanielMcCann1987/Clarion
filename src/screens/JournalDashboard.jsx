// src/screens/JournalDashboard.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useNavigationContainerRef } from '@react-navigation/native';

export default function JournalDashboard() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#0f111a' }}>
      <Text style={{ color: '#f5f5fa', fontSize: 24, fontWeight: '600', marginBottom: 12 }}>
        Hey Daniel
      </Text>

      <View
        style={{
          backgroundColor: '#7c4dff',
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>
          “I’m choosing clarity over the old nicotine story.”
        </Text>
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 16, justifyContent: 'space-between' }}>
        <View>
          <Text style={{ color: '#fff', marginBottom: 4 }}>Streak: 3 days</Text>
          <Text style={{ color: '#fff', marginBottom: 4 }}>
            Top belief: “I need nicotine to cope”
          </Text>
          <Text style={{ color: '#fff' }}>Last entry: Aug 1</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Entry')}
        style={{
          backgroundColor: '#22d3ee',
          padding: 14,
          borderRadius: 8,
          marginBottom: 12,
          alignItems: 'center',
        }}
        accessibilityLabel="Write and analyze new journal entry"
      >
        <Text style={{ color: '#000', fontWeight: '600' }}>Write & Analyze</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', marginBottom: 4 }}>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: '#1f2233',
            borderRadius: 6,
            marginRight: 12,
          }}
          onPress={() => {
            /* stub: save affirmation */
          }}
        >
          <Text style={{ color: '#fff' }}>Save affirmation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: '#1f2233',
            borderRadius: 6,
          }}
          onPress={() => navigation.getParent()?.navigate('History')}
        >
          <Text style={{ color: '#fff' }}>Review history</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
