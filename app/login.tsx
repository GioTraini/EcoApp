import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Button } from 'react-native';


interface LoginFormState {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormState>({
    email: 'maxpopovschii@gmail.com',
    password: 'Dom200598!',
  });
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://172.20.10.6:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( formData ),
      });

      if (!response.ok) throw new Error("Errore nei dati.");

      const token = await response.text();
      console.log(token)
      router.navigate("/(tabs)");
    } catch (error) {
      alert((error as Error).message);
    }
  };
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inner}>
        <Text style={styles.header}>Sign In</Text>
        <TextInput 
          placeholder="Email" 
          placeholderTextColor="#aaa" 
          style={styles.textInput} 
          keyboardType="email-address" 
          autoCapitalize="none"
          onChange={() => handleChange} 
        />
        <TextInput 
          placeholder="Password" 
          placeholderTextColor="#aaa" 
          style={styles.textInput} 
          secureTextEntry
          onChange={() => handleChange}
        />
        <View style={styles.btnContainer}>
          <Button title="Submit" color="#000" onPress={() => handleLogin} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Sfondo scuro
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 36,
    marginBottom: 24,
    color: '#4caf50', // Colore verde per il contrasto
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    height: 50,
    borderColor: '#4caf50', // Bordo verde per il tema scuro
    borderBottomWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#fff', // Testo bianco per leggibilità
  },
  btnContainer: {
    marginTop: 20,
    backgroundColor: '#4caf50', // Colore verde per il pulsante
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default LoginScreen;
