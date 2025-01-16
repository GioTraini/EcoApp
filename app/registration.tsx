import SERVER from '@/constants/Api';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import for linear gradient
import { Button } from 'react-native-paper';

interface RegFormState {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const RegisterScreen: React.FC = () => {
  const [formData, setFormData] = useState<RegFormState>({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (name: keyof RegFormState, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReg = async () => {
    try {
      const response = await fetch(`${SERVER}/auth/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Errore nei dati.");

      const token = await response.text();
      console.log(token);
      router.navigate("/(tabs)");
    } catch (error) {
      Alert.alert('Registration Failed', (error as Error).message);
    }
  };

  return (
    <LinearGradient
      colors={['#4CAF50', '#2196F3']} // Green to Blue gradient
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formContainer}>
            <Text style={styles.header}>Sign Up</Text>

            <TextInput
              placeholder="Name"
              placeholderTextColor="#aaa"
              style={styles.textInput}
              value={formData.name}
              onChangeText={(text) => handleChange('name', text)} // Update name
            />
            <TextInput
              placeholder="Surname"
              placeholderTextColor="#aaa"
              style={styles.textInput}
              value={formData.surname}
              onChangeText={(text) => handleChange('surname', text)} // Update surname
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#aaa"
              style={styles.textInput}
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)} // Update email
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              style={styles.textInput}
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => handleChange('password', text)} // Update password
            />
            <TextInput
              placeholder="Password Confirmation"
              placeholderTextColor="#aaa"
              style={styles.textInput}
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => handleChange('password', text)} // Update confirmation
            />

            <View style={styles.btnContainer}>
              <Button onPress={handleReg} >Submit</Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Overlay background for the form
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 36,
    marginBottom: 24,
    color: '#fff', // White header text
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    width: '100%', // Ensure inputs take full width
    height: 50,
    borderColor: '#fff', // White border for text inputs
    borderBottomWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#fff', // White text color for inputs
  },
  btnContainer: {
    width: '80%',
    marginTop: 20,
    backgroundColor: '#4caf50', // Green button color
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default RegisterScreen;
