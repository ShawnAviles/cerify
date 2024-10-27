import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, Button } from 'react-native';
import { ThemedView } from '../ThemedView';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  return (
    <ThemedView lightColor='#FFFFFF' darkColor='#FFFFFF' style={styles.page}>
      <Text>Hello Welcome Back</Text>
      <Text>Welcome back please sign in</Text>
      
      <Formik
        initialValues={{ email: '', password: '' }}
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
                placeholder="Email"
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
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
              />
            </View>
            {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}
            
            <Button onPress={handleSubmit} title="Sign In" />
          </>
        )}
      </Formik>
      
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default Login;
