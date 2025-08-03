// src/screens/SignupScreen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import { useTheme } from '../design/ThemeProvider';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SignupScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isNameValid = name.trim().length > 0;
  const isValidEmail = email.trim().length > 0;
  const passwordsMatch = password === confirm && password.length >= 6;
  const canSubmit = isNameValid && isValidEmail && passwordsMatch;

  const handleSignup = () => {
    setTouched({ name: true, email: true, password: true, confirm: true });
    if (!canSubmit) {
      Alert.alert('Fix issues', 'Make sure all fields are valid and passwords match (min 6 chars).');
      return;
    }
    // mock success for style phase
    Alert.alert('Success', 'Signup would proceed (mock).');
    navigation.replace('Journal'); // navigation mock
  };

  return (
    <ScreenContainer>
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={Platform.OS === 'ios' ? 10 : 20}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.outerWrapper}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Create account</Text>
          <Text style={[styles.subtitle, { color: theme.colors.muted }]}>
            Write. Reflect. Transform with the Milton Model.
          </Text>

          <View style={styles.form}>
            {/* Name */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Name</Text>
              <TextInput
                placeholder="Your name"
                placeholderTextColor={theme.colors.muted}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                onFocus={() => setFocusedField('name')}
                onBlur={() => {
                  setFocusedField(null);
                  setTouched((t) => ({ ...t, name: true }));
                }}
                style={[
                  styles.input(theme),
                  focusedField === 'name' && { borderColor: theme.colors.accent },
                  touched.name && !isNameValid && { borderColor: '#ff6b6b' },
                ]}
                selectionColor={theme.colors.accent}
              />
              {touched.name && !isNameValid && (
                <Text style={styles.errorText}>Please enter your name.</Text>
              )}
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Email</Text>
              <TextInput
                placeholder="you@example.com"
                placeholderTextColor={theme.colors.muted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={() => setFocusedField('email')}
                onBlur={() => {
                  setFocusedField(null);
                  setTouched((t) => ({ ...t, email: true }));
                }}
                style={[
                  styles.input(theme),
                  focusedField === 'email' && { borderColor: theme.colors.accent },
                  touched.email && !isValidEmail && { borderColor: '#ff6b6b' },
                ]}
                selectionColor={theme.colors.accent}
              />
              {touched.email && !isValidEmail && (
                <Text style={styles.errorText}>Please enter a valid email.</Text>
              )}
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Password</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  placeholder="At least 6 characters"
                  placeholderTextColor={theme.colors.muted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => {
                    setFocusedField(null);
                    setTouched((t) => ({ ...t, password: true }));
                  }}
                  style={[
                    styles.input(theme),
                    focusedField === 'password' && { borderColor: theme.colors.accent },
                    touched.password && password.length < 6 && { borderColor: '#ff6b6b' },
                    { flex: 1, paddingRight: 42, marginBottom: 0 },
                  ]}
                  selectionColor={theme.colors.accent}
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
              {touched.password && password.length < 6 && (
                <Text style={styles.errorText}>Password must be at least 6 characters.</Text>
              )}
            </View>

            {/* Confirm */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Confirm Password</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  placeholder="Repeat password"
                  placeholderTextColor={theme.colors.muted}
                  value={confirm}
                  onChangeText={setConfirm}
                  secureTextEntry={!showConfirm}
                  autoCapitalize="none"
                  onFocus={() => setFocusedField('confirm')}
                  onBlur={() => {
                    setFocusedField(null);
                    setTouched((t) => ({ ...t, confirm: true }));
                  }}
                  style={[
                    styles.input(theme),
                    focusedField === 'confirm' && { borderColor: theme.colors.accent },
                    touched.confirm && !passwordsMatch && { borderColor: '#ff6b6b' },
                    { flex: 1, paddingRight: 42, marginBottom: 0 },
                  ]}
                  selectionColor={theme.colors.accent}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirm((v) => !v)}
                  style={styles.eyeContainer}
                  accessibilityLabel={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                >
                  <Feather
                    name={showConfirm ? 'eye' : 'eye-off'}
                    size={20}
                    color={theme.colors.muted}
                  />
                </TouchableOpacity>
              </View>
              {touched.confirm && !passwordsMatch && (
                <Text style={styles.errorText}>Passwords do not match.</Text>
              )}
            </View>

            {/* Primary action */}
            <TouchableOpacity
              style={[
                styles.primaryButton(theme),
                !canSubmit && { opacity: 0.5 },
              ]}
              onPress={handleSignup}
              disabled={!canSubmit}
            >
              <Text style={styles.primaryButtonText}>Sign up</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.bottomRow}>
              <Text style={{ color: theme.colors.muted, marginRight: 4 }}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: theme.colors.accent, fontWeight: '600' }}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 14,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  form: {
    marginTop: 4,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: (theme) => ({
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#2b2f4d',
    fontSize: 16,
  }),
  passwordWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
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
  errorText: {
    color: '#ff6b6b',
    marginTop: 4,
    fontSize: 12,
  },
  primaryButton: (theme) => ({
    backgroundColor: theme.colors.accent,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  }),
  primaryButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
});
