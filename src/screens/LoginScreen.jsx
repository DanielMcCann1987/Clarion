// src/screens/LoginScreen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import { useTheme } from '../design/ThemeProvider';
import { useAuth } from '../context/AuthContext';
import { Feather } from '@expo/vector-icons';
import logo from '../../assets/clarionlogo.png';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { login } = useAuth();
  const { width: windowWidth } = useWindowDimensions();
  const styles = getStyles(theme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // responsive logo size
  const logoSize = Math.min(320, windowWidth * 0.8);

  const handleLogin = () => {
    login(); // mock/login
  };

  return (
    <ScreenContainer>
      {/* Top block: logo above title */}
      <View style={styles.topSection}>
        <Image
          source={logo}
          style={{
            width: logoSize,
            height: logoSize,
            tintColor: theme.colors.primary,
            marginBottom: 2,
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
        <Text style={styles.title} includeFontPadding={false}>
          Context is Everything
        </Text>
      </View>

      {/* Form */}
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

        {/* Password field with inline icon inside input */}
        <View style={styles.passwordWrapper}>
          <TextInput
            style={[styles.input, { paddingRight: 42, marginBottom: 0 }]}
            placeholder="Password"
            placeholderTextColor={theme.colors.muted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowPassword((v) => !v)}
            style={styles.eyeContainer}
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          >
            <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color={theme.colors.muted}
            />
          </TouchableOpacity>
        </View>

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
    topSection: {
      alignItems: 'center',
      marginTop: 32,
      marginBottom: 4,
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text,
      lineHeight: 20,
      marginTop: 0,
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
    passwordWrapper: {
      position: 'relative',
      marginBottom: theme.spacing.md,
    },
    eyeContainer: {
      position: 'absolute',
      right: 12,
      top: '50%',
      transform: [{ translateY: -10 }],
      padding: 4,
      justifyContent: 'center',
      alignItems: 'center',
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
