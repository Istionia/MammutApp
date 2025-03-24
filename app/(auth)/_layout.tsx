import React from 'react';
import { Stack } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';

export default function AuthLayout() {
  const { theme } = useTheme();
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          headerTitle: 'Welcome to Mammut',
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ 
          headerTitle: 'Login',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="instance-selection" 
        options={{ 
          headerTitle: 'Select Instance',
          headerShown: true,
        }} 
      />
    </Stack>
  );
} 