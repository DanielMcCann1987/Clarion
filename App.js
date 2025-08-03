import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/design/ThemeProvider';
import MainNavigator from './src/navigation/MainNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { EntriesProvider } from './src/context/EntriesContext';

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
        <AuthProvider>
          <EntriesProvider>
            <AppContainer />
          </EntriesProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
