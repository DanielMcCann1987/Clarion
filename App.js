// App.js
import React from 'react';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import JournalScreen from './src/JournalScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <JournalScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});
