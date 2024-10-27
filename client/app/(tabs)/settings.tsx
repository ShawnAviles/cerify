import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Switch, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Href, router } from 'expo-router';
import { ThemedButton } from 'react-native-really-awesome-button';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function AccountSettings() {
  const [isPushEnabled, setIsPushEnabled] = React.useState(false);

  const toggleSwitch = () => setIsPushEnabled(previousState => !previousState);

  const handleSave = () => {
    // TODO: Update with MongoDB call
    // Save changes
    router.push('/settings' as Href);
  }

  const handleLogout = () => {
    // TODO: Update with MongoDB call
    // Save changes
    router.push('/settings' as Href);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.header}>Account Settings</Text>
      </SafeAreaView>
      
      <TouchableOpacity onPress={() => router.push('/editProfile' as Href)} style={styles.optionContainer}>
        <Text style={styles.link}>Edit profile</Text>
        <FontAwesome5 name={"chevron-right"} size={24} color={Colors.black} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/changePassword' as Href)} style={styles.optionContainer}>
        <Text style={styles.link}>Change password</Text>
        <FontAwesome5 name={"chevron-right"} size={24} color={Colors.black} />
      </TouchableOpacity>

      <View style={styles.switchContainer}>
        <Text style={styles.link}>Push notifications</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={isPushEnabled}
          trackColor={{ false: Colors.gray, true: Colors.primary }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <ThemedButton
          name="bruce"
          type="primary"
          borderRadius={50}
          backgroundColor={Colors.primary}
          backgroundDarker={Colors.shadow}
          borderColor={Colors.shadow}
          onPress={handleSave}
        >
          <Text>Save Changes</Text>
        </ThemedButton>
        <ThemedButton
          name="bruce"
          type="secondary"
          borderRadius={50}
          backgroundColor={Colors.white}
          backgroundDarker={Colors.shadow}
          borderColor={Colors.shadow}
          onPress={handleLogout}
        >
          <Text>Log Out</Text>
        </ThemedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  link: {
    fontSize: 24,
    color: '#000',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderColor: '#ddd',
  },
  logoutButton: {
    backgroundColor: '#5CA3FA',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  logoutText: {
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