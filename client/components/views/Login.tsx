import React from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { ThemedView } from '../ThemedView';

const Login = () => {
  return (
    <ThemedView lightColor='#FFFFFF' darkColor='#FFFFFF' style={styles.page}>
      <Text>Hello Welcome Back</Text>
      <Text>Welcome back please sign in</Text>
      <View style={styles.inputContainer}>
        <Image source={require("@/assets/images/email.png")} style={styles.icon} />
        <TextInput placeholder="Email" style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require("@/assets/images/lock.png")} style={styles.icon} />
        <TextInput placeholder="Password" style={styles.input} />
      </View>
      <Text>Don't have an account? Register</Text>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default Login;