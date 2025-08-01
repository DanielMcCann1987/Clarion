// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/navigation/BottomTabs';
import { ThemeProvider, useTheme } from './src/design/ThemeProvider';
import { View } from 'react-native';

function InnerApp() {
  const { theme, mode } = useTheme();
  return (
    <>
      <StatusBar
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <BottomTabs />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider initial="dark">
        <NavigationContainer>
          <InnerApp />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
