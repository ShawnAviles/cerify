import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export default function AuthTabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: 'white',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 20,
            marginBottom: insets.bottom,
            paddingVertical: 5,
            alignItems: 'center',
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
        }}
      >
        <Tabs.Screen
          name="login"
          options={{
            title: 'Login',
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="log-in" iconFamily="Ionicons" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="signup"
          options={{
            title: 'Sign Up',
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="person-add" iconFamily="Ionicons" color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
