import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';

export default function SearchScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Search</Text>
      </View>

      <View style={[styles.searchBarContainer, { backgroundColor: theme.colors.card }]}>
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search Mastodon"
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
        />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.placeholderContainer}>
          <Text style={[styles.placeholderText, { color: theme.colors.textSecondary }]}>
            Search for accounts, hashtags, or content
          </Text>
        </View>
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
  searchBarContainer: {
    margin: 15,
    borderRadius: 10,
    padding: 10,
  },
  searchInput: {
    fontSize: 16,
    height: 40,
  },
  content: {
    flex: 1,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    marginTop: 50,
  },
  placeholderText: {
    fontSize: 16,
    textAlign: 'center',
  },
}); 