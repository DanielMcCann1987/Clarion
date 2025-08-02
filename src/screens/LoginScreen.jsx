// src/screens/LoginScreen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import { useTheme } from '../design/ThemeProvider';
import { useAuth } from '../context/AuthContext';
import logo from '../../assets/clarionlogo.png';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { login } = useAuth();
  const styles = getStyles(theme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // mock login
    login();
  };

  return (
    <ScreenContainer>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Context is Everything</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={theme.colors.muted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={theme.colors.muted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signupText}>Continue to Signup</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    logoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme.spacing.lg,
    },
    logo: {
      width: 160,
      height: 160,
      marginBottom: theme.spacing.md,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.colors.text,
    },
    form: {
      paddingHorizontal: theme.spacing.lg,
      marginTop: theme.spacing.md,
    },
    input: {
      backgroundColor: theme.colors.card,
      color: theme.colors.text,
      padding: 14,
      borderRadius: 10,
      marginBottom: theme.spacing.md,
    },
    loginButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    loginText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    signupButton: {
      backgroundColor: theme.colors.accent,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
    },
    signupText: {
      color: '#000',
      fontSize: 16,
      fontWeight: '600',
    },
  });
