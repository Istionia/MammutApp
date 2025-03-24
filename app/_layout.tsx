import React, { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useSelector } from 'react-redux';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AppProvider } from '@/providers/AppProvider';
import { RootState } from '@/store/store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AppProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootLayoutNav />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AppProvider>
  );
}

function RootLayoutNav() {
  // Get authentication state from Redux store
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="settings/theme" options={{ headerShown: true, title: 'Theme Settings' }} />
          <Stack.Screen name="+not-found" />
        </>
      ) : (
        <>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          {/* Redirect to auth flow if not authenticated */}
          <Stack.Screen name="(tabs)" redirect />
          <Stack.Screen name="settings/theme" redirect />
          <Stack.Screen name="+not-found" />
        </>
      )}
    </Stack>
  );
}
