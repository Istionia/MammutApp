import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';

export default function WelcomeScreen() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/mammut-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.title, { color: theme.colors.text }]}>Mammut</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          A beautiful Mastodon client
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Link href="/instance-selection" asChild>
          <Pressable
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
          >
            <Text style={[styles.buttonText, { color: theme.colors.text }]}>
              Get Started
            </Text>
          </Pressable>
        </Link>

        <Link href="/login" asChild>
          <Pressable
            style={[styles.button, { backgroundColor: theme.colors.secondary }]}
          >
            <Text style={[styles.buttonText, { color: theme.colors.text }]}>
              I already have an account
            </Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
          Connect to the decentralized social web
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    gap: 15,
  },
  button: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginBottom: 30,
  },
  footerText: {
    fontSize: 14,
  },
}); 