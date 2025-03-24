import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/slices/authSlice';

export default function LoginScreen() {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  // Simulates the OAuth flow that would normally happen with Mastodon
  const handleLogin = () => {
    // In a real app, this would involve OAuth with Mastodon
    // For now, we'll just set a mock token to authenticate the user
    dispatch(
      setToken({
        accessToken: 'mock-token-123',
        refreshToken: 'mock-refresh-token-123',
        createdAt: Date.now(),
        expiresIn: 3600,
        scope: 'read write follow',
        tokenType: 'Bearer',
      })
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Image
            source={require('@/assets/images/mammut-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Log in to Mastodon
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Login with your Mastodon account
          </Text>
        </View>

        <View style={styles.loginContainer}>
          <Text style={[styles.instanceText, { color: theme.colors.text }]}>
            Server: mastodon.social
          </Text>
          
          <Pressable
            style={[styles.loginButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleLogin}
          >
            <Text style={[styles.loginButtonText, { color: theme.colors.text }]}>
              Authorize with Mastodon
            </Text>
          </Pressable>
          
          <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
            You will be redirected to your Mastodon instance to authorize this app
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  loginContainer: {
    marginBottom: 50,
  },
  instanceText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  loginButton: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
  },
}); 