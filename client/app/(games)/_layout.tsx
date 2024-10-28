import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            display: "none"
          },
        }}
      >
        <Tabs.Screen
          name="matching"
          options={{
            title: 'Matching',
          }}
        />
        <Tabs.Screen
          name="whack"
          options={{
            title: 'Whack-a-Mole',
          }}
        />
        <Tabs.Screen
          name="matching2"
          options={{
            title: 'Matching 2',
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Background behind navbar
  },
});
