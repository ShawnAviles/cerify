import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function Signup () {
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  return (
    <ThemedView lightColor='#FFFFFF' darkColor='#FFFFFF' style={styles.page}>
      <Text style={styles.header}>Create Account</Text>
      <Text style={styles.subHeader}>Sign up to get started</Text>
      
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={styles.inputContainer}>
              <Image source={require("@/assets/images/email.png")} style={styles.icon} />
              <TextInput
                placeholder="Username"
                style={styles.input}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                placeholderTextColor="#aaa"
              />
            </View>
            {errors.username && touched.username && <Text style={styles.errorText}>{errors.username}</Text>}
            
            <View style={styles.inputContainer}>
              <Image source={require("@/assets/images/email.png")} style={styles.icon} />
              <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholderTextColor="#aaa"
              />
            </View>
            {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}
            
            <View style={styles.inputContainer}>
              <Image source={require("@/assets/images/lock.png")} style={styles.icon} />
              <TextInput
                placeholder="Password"
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
                placeholderTextColor="#aaa"
              />
            </View>
            {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}
            
            <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      
      <Text style={styles.footerText}>
        Already have an account? <Text style={styles.registerText}>Login</Text>
        {/* TODO: Login should navigate to "Login Page" */}
      </Text>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 60,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
    paddingBottom: 5,
    width: '100%',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#888',
    marginTop: 20,
  },
  registerText: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
});
