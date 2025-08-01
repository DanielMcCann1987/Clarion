// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/navigation/BottomTabs';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0f111a' }}>
        <BottomTabs />
      </SafeAreaView>
    </NavigationContainer>
  );
}
