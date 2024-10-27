import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
      <Button title="Next" onPress={() => navigation.navigate('Name')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;