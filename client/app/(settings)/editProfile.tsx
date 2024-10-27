// EditProfile.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { ThemedButton } from 'react-native-really-awesome-button';
import { Href, router } from 'expo-router';

export default function EditProfile() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
			<SafeAreaView style={styles.headerContainer}>
				<Text style={styles.header}>Enter New Name and Username</Text>
			</SafeAreaView>

			<View style={styles.inputContainer}>
				<TextInput style={styles.input} placeholder="First Name" />
				<TextInput style={styles.input} placeholder="Last Name" />
				<TextInput style={styles.input} placeholder="Username" />
			</View>
      
      <View style={styles.buttonContainer}>
        <ThemedButton
          name="bruce"
          type="primary"
          borderRadius={50}
          backgroundColor={Colors.primary}
          backgroundDarker={Colors.shadow}
          borderColor={Colors.shadow}
          onPress={() => router.push('/settings' as Href)}
        >
          <Text>Update</Text>
        </ThemedButton>
				<ThemedButton
          name="bruce"
          type="secondary"
          borderRadius={50}
          backgroundColor={Colors.white}
          backgroundDarker={Colors.shadow}
          borderColor={Colors.shadow}
          onPress={() => router.push('/settings' as Href)}
        >
          <Text>Go back</Text>
        </ThemedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
	headerContainer: {
		marginTop: 40,
		paddingHorizontal: 40,
	},
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
	inputContainer:{
		paddingHorizontal: 40,
		width: '100%',
	},
  updateButton: {
    backgroundColor: '#5CA3FA',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  updateText: {
    color: '#FFF',
    fontSize: 18,
  },
	buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
    gap: 20,
  },
});
