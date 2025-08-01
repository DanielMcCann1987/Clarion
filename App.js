// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/design/ThemeProvider';
import MainNavigator from './src/navigation/MainNavigator';

function AppContainer() {
  const { theme, mode } = useTheme();
  return (
    <>
      <StatusBar
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <MainNavigator />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider initial="dark">
        <AppContainer />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
