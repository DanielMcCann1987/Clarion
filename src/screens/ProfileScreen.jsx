// src/screens/ProfileScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
  Switch,
  ActivityIndicator,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { useTheme } from '../design/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { Feather, MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import * as SecureStore from 'expo-secure-store'; // for PIN storage; prefer this over AsyncStorage
import { useAuth } from '../context/AuthContext'; // assuming you have AuthContext

export default function ProfileScreen() {
  const { theme, mode, toggleMode, setMode } = useTheme();
  const navigation = useNavigation();
  const { user, logout, deleteAccount } = useAuth(); // adapt to your context
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  const [pinEnabled, setPinEnabled] = useState(false);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [settingPin, setSettingPin] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);

  // password visibility toggles
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await SecureStore.getItemAsync('user_pin_enabled');
      setPinEnabled(stored === 'true');
    })();
  }, []);

  const handleToggleTheme = () => {
    if (typeof toggleMode === 'function') {
      toggleMode();
    } else if (typeof setMode === 'function') {
      setMode(mode === 'dark' ? 'light' : 'dark');
    } else {
      console.warn('No theme toggler available.');
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert('Error', 'Please fill out both fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }
    setChangingPassword(true);
    try {
      // TODO: call your backend endpoint to change password
      Alert.alert('Success', 'Password changed (mock).');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordSection(false);
    } catch (e) {
      Alert.alert('Failed', e.message || 'Could not change password.');
    } finally {
      setChangingPassword(false);
    }
  };

  const togglePin = async (enabled) => {
    if (enabled) {
      setSettingPin(true);
    } else {
      await SecureStore.deleteItemAsync('user_pin');
      await SecureStore.setItemAsync('user_pin_enabled', 'false');
      setPinEnabled(false);
      Alert.alert('Disabled', 'PIN lock disabled.');
    }
  };

  const handleSetPin = async () => {
    if (!pin || !confirmPin) {
      Alert.alert('Error', 'Enter and confirm PIN.');
      return;
    }
    if (pin !== confirmPin) {
      Alert.alert('Error', 'PINs do not match.');
      return;
    }
    await SecureStore.setItemAsync('user_pin', pin);
    await SecureStore.setItemAsync('user_pin_enabled', 'true');
    setPinEnabled(true);
    setPin('');
    setConfirmPin('');
    setSettingPin(false);
    Alert.alert('Success', 'PIN lock enabled.');
  };

  const handleExportPDF = async () => {
    setLoadingExport(true);
    try {
      const html = `
        <html>
          <body style="font-family: -apple-system, system-ui; padding: 20px;">
            <h1>User Export</h1>
            <p>Name: ${user?.name || 'Unknown'}</p>
            <p>Email: ${user?.email || 'Unknown'}</p>
            <hr/>
            <h2>Journal Entries (mock)</h2>
            <p>This is a preview export. Replace with real content.</p>
          </body>
        </html>
      `;
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Exported Data' });
      } else {
        Alert.alert('Exported', `PDF saved to: ${uri}`);
      }
    } catch (e) {
      Alert.alert('Export Failed', e.message || 'Could not export PDF.');
    } finally {
      setLoadingExport(false);
    }
  };

  const handleManageSubscription = () => {
    navigation.navigate('Subscription'); // adapt route name
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This is permanent. Are you sure you want to delete your account and all data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAccount(); // adapt
              Alert.alert('Deleted', 'Your account has been deleted.');
            } catch (e) {
              Alert.alert('Error', e.message || 'Could not delete account.');
            }
          },
        },
      ]
    );
  };

  const handleContactUs = () => {
    Alert.alert('Contact Us', 'Email: support@example.com\nPhone: +1 (555) 123-4567');
  };

  return (
    <ScreenContainer>
      <Header title="Profile" />
      <ScrollView
        contentContainerStyle={{ padding: theme.spacing.md, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Section */}
        <Section title="Account">
          {/* Appearance / Dark Mode */}
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Appearance</Text>
              <Text style={[styles.subText, { color: theme.colors.muted }]}>
                Toggle dark / light mode.
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: theme.colors.text, marginRight: 6 }}>
                {mode === 'dark' ? 'Dark' : 'Light'}
              </Text>
              <Switch
                value={mode === 'dark'}
                onValueChange={handleToggleTheme}
                trackColor={{ true: theme.colors.primary, false: theme.colors.muted }}
                thumbColor={mode === 'dark' ? theme.colors.surface : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Change Password */}
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Change Password</Text>
              <Text style={[styles.subText, { color: theme.colors.muted }]}>
                Update your login password.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowPasswordSection((s) => !s)}
              style={styles.actionButton}
              accessibilityLabel="Change password"
            >
              <Feather
                name={showPasswordSection ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
          {showPasswordSection && (
            <View style={styles.innerBox}>
              <View style={styles.passwordWrapper}>
                <TextInput
                  placeholder="Current password"
                  placeholderTextColor={theme.colors.muted}
                  secureTextEntry={!showOldPassword}
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowOldPassword((v) => !v)}
                  accessibilityLabel="Toggle current password visibility"
                >
                  <Feather name={showOldPassword ? 'eye' : 'eye-off'} size={18} color={theme.colors.muted} />
                </TouchableOpacity>
              </View>
              <View style={styles.passwordWrapper}>
                <TextInput
                  placeholder="New password"
                  placeholderTextColor={theme.colors.muted}
                  secureTextEntry={!showNewPassword}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowNewPassword((v) => !v)}
                  accessibilityLabel="Toggle new password visibility"
                >
                  <Feather name={showNewPassword ? 'eye' : 'eye-off'} size={18} color={theme.colors.muted} />
                </TouchableOpacity>
              </View>
              <View style={styles.passwordWrapper}>
                <TextInput
                  placeholder="Confirm new password"
                  placeholderTextColor={theme.colors.muted}
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword((v) => !v)}
                  accessibilityLabel="Toggle confirm password visibility"
                >
                  <Feather name={showConfirmPassword ? 'eye' : 'eye-off'} size={18} color={theme.colors.muted} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={handleChangePassword}
                style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
                disabled={changingPassword}
              >
                {changingPassword ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.primaryButtonText}>Update Password</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* PIN Lock */}
          <View style={[styles.row, { marginTop: 12 }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: theme.colors.text }]}>PIN Lock</Text>
              <Text style={[styles.subText, { color: theme.colors.muted }]}>
                Require a PIN to unlock the app.
              </Text>
            </View>
            <Switch
              value={pinEnabled}
              onValueChange={(v) => togglePin(v)}
              trackColor={{ true: theme.colors.primary, false: theme.colors.muted }}
              thumbColor={pinEnabled ? theme.colors.surface : '#f4f3f4'}
            />
          </View>
          {settingPin && (
            <View style={styles.innerBox}>
              <TextInput
                placeholder="Enter 4-digit PIN"
                placeholderTextColor={theme.colors.muted}
                keyboardType="number-pad"
                secureTextEntry
                value={pin}
                onChangeText={setPin}
                style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
                maxLength={6}
              />
              <TextInput
                placeholder="Confirm PIN"
                placeholderTextColor={theme.colors.muted}
                keyboardType="number-pad"
                secureTextEntry
                value={confirmPin}
                onChangeText={setConfirmPin}
                style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
                maxLength={6}
              />
              <TouchableOpacity
                onPress={handleSetPin}
                style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
              >
                <Text style={styles.primaryButtonText}>Set PIN</Text>
              </TouchableOpacity>
            </View>
          )}
        </Section>

        {/* Support / Contact */}
        <Section title="Support">
          <TouchableOpacity style={styles.linkRow} onPress={handleContactUs}>
            <View style={styles.iconWrapper}>
              <Entypo name="phone" size={20} color={theme.colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Contact Us</Text>
              <Text style={[styles.subText, { color: theme.colors.muted }]}>
                support@example.com
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>
        </Section>

        {/* Data / Export */}
        <Section title="Data">
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Export Data</Text>
              <Text style={[styles.subText, { color: theme.colors.muted }]}>
                Download your journal history as PDF.
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleExportPDF}
              style={[styles.iconButton, { backgroundColor: theme.colors.primary }]}
              disabled={loadingExport}
              accessibilityLabel="Export data as PDF"
            >
              {loadingExport ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Feather name="download" size={20} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
        </Section>

        {/* Subscription */}
        <Section title="Subscription">
          <TouchableOpacity style={styles.linkRow} onPress={handleManageSubscription}>
            <View style={styles.iconWrapper}>
              <Ionicons name="card-outline" size={20} color={theme.colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Manage Subscription</Text>
              <Text style={[styles.subText, { color: theme.colors.muted }]}>
                Change plan, billing info, or cancel.
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>
        </Section>

        {/* Dangerous / Account Deletion */}
        <Section title="Danger Zone">
          <TouchableOpacity style={styles.dangerRow} onPress={handleDeleteAccount}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: theme.colors.error }]}>Delete Account</Text>
              <Text style={[styles.subText, { color: theme.colors.muted }]}>
                Permanently remove your account and all data.
              </Text>
            </View>
            <MaterialIcons name="delete-outline" size={24} color={theme.colors.error} />
          </TouchableOpacity>
        </Section>

        {/* Sign out */}
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            onPress={() => {
              logout();
            }}
            style={[
              styles.primaryButton,
              {
                backgroundColor: theme.colors.background,
                borderWidth: 1,
                borderColor: theme.colors.primary,
              },
            ]}
          >
            <Text style={[styles.primaryButtonText, { color: theme.colors.primary }]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function Section({ title, children }) {
  const { theme } = useTheme();
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{title}</Text>
      <View>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  subText: {
    fontSize: 12,
    marginTop: 2,
  },
  actionButton: {
    padding: 8,
  },
  innerBox: {
    marginTop: 8,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'transparent',
  },
  input: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    fontSize: 14,
  },
  primaryButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  iconWrapper: {
    width: 32,
    marginRight: 12,
    alignItems: 'center',
  },
  dangerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: 'rgba(255,0,0,0.03)',
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  passwordWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -9 }],
    padding: 4,
  },
  iconButton: {
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
