// src/navigation/MainNavigator.jsx
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import BottomTabs from './BottomTabs';

export default function MainNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // mock login state

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <BottomTabs />
      ) : (
        <AuthStack onLogin={() => setIsLoggedIn(true)} />
      )}
    </NavigationContainer>
  );
}
