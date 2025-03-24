import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Pressable } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for popular instances
const POPULAR_INSTANCES = [
  { id: '1', name: 'mastodon.social', description: 'The original Mastodon server' },
  { id: '2', name: 'fosstodon.org', description: 'For open source enthusiasts' },
  { id: '3', name: 'hachyderm.io', description: 'Tech-focused community' },
  { id: '4', name: 'mstdn.social', description: 'General purpose instance' },
];

export default function InstanceSelectionScreen() {
  const { theme } = useTheme();
  const [instanceUrl, setInstanceUrl] = React.useState('');

  const handleInstanceSelect = (instance: string) => {
    // In a real implementation, this would validate the instance and store it
    console.log(`Selected instance: ${instance}`);
    
    // Navigate to the login screen
    router.push('/login');
  };

  const renderInstanceItem = ({ item }: { item: typeof POPULAR_INSTANCES[0] }) => (
    <Pressable
      style={[styles.instanceItem, { backgroundColor: theme.colors.card }]}
      onPress={() => handleInstanceSelect(item.name)}
    >
      <Text style={[styles.instanceName, { color: theme.colors.text }]}>{item.name}</Text>
      <Text style={[styles.instanceDescription, { color: theme.colors.textSecondary }]}>
        {item.description}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Enter Mastodon Server
        </Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              { 
                color: theme.colors.text,
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border
              }
            ]}
            placeholder="example.social"
            placeholderTextColor={theme.colors.textSecondary}
            value={instanceUrl}
            onChangeText={setInstanceUrl}
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <Pressable
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={() => instanceUrl && handleInstanceSelect(instanceUrl)}
            disabled={!instanceUrl}
          >
            <Text style={[styles.buttonText, { color: theme.colors.text }]}>
              Next
            </Text>
          </Pressable>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Popular Instances
        </Text>
        
        <FlatList
          data={POPULAR_INSTANCES}
          renderItem={renderInstanceItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.instancesList}
        />
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
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  instancesList: {
    gap: 10,
  },
  instanceItem: {
    padding: 15,
    borderRadius: 8,
  },
  instanceName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  instanceDescription: {
    fontSize: 14,
  },
}); 