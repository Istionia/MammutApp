import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';

export default function ProfileScreen() {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.profileHeader, { backgroundColor: theme.colors.card }]}>
          <Image
            source={{ uri: 'https://picsum.photos/200' }}
            style={styles.headerImage}
          />
          <Image
            source={{ uri: 'https://picsum.photos/100' }}
            style={[styles.avatar, { borderColor: theme.colors.background }]}
          />

          <View style={styles.profileInfo}>
            <Text style={[styles.displayName, { color: theme.colors.text }]}>
              Display Name
            </Text>
            <Text style={[styles.username, { color: theme.colors.textSecondary }]}>
              @username@instance.social
            </Text>
            <Text style={[styles.bio, { color: theme.colors.text }]}>
              This is a placeholder bio for the profile screen. In a real app, this would show the user's actual bio.
            </Text>
          </View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={[styles.statCount, { color: theme.colors.text }]}>120</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statCount, { color: theme.colors.text }]}>530</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statCount, { color: theme.colors.text }]}>489</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Followers</Text>
            </View>
          </View>
        </View>

        <Pressable
          style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
          onPress={handleLogout}
        >
          <Text style={[styles.logoutButtonText, { color: '#FFFFFF' }]}>
            Logout
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
    paddingBottom: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    overflow: 'hidden',
  },
  headerImage: {
    height: 150,
    width: '100%',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    marginTop: -40,
    marginLeft: 15,
  },
  profileInfo: {
    padding: 15,
  },
  displayName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  username: {
    fontSize: 16,
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    lineHeight: 22,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  statItem: {
    alignItems: 'center',
  },
  statCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
  },
  logoutButton: {
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 