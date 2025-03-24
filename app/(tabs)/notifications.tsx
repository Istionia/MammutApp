import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';

// Mock data for notifications
const MOCK_NOTIFICATIONS = [
  { id: '1', type: 'follow', username: '@user1', content: 'followed you' },
  { id: '2', type: 'favorite', username: '@user2', content: 'favorited your post' },
  { id: '3', type: 'mention', username: '@user3', content: 'mentioned you' },
  { id: '4', type: 'reblog', username: '@user4', content: 'boosted your post' },
];

export default function NotificationsScreen() {
  const { theme } = useTheme();

  const renderNotificationItem = ({ item }: { item: typeof MOCK_NOTIFICATIONS[0] }) => (
    <View style={[styles.notificationItem, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.username, { color: theme.colors.text }]}>{item.username}</Text>
      <Text style={[styles.content, { color: theme.colors.textSecondary }]}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Notifications</Text>
      </View>

      <FlatList
        data={MOCK_NOTIFICATIONS}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No notifications yet
            </Text>
          </View>
        }
      />
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
  notificationsList: {
    padding: 15,
    gap: 10,
  },
  notificationItem: {
    padding: 15,
    borderRadius: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
  },
  emptyContainer: {
    padding: 50,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
}); 