// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native';
import JournalScreen from './src/JournalScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f111a' }}>
      <JournalScreen />
    </SafeAreaView>
  );
}
