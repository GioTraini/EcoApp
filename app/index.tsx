import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';  // Importa LinearGradient di Expo
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

const HomeScreen: React.FC = () => {
  return (
    <LinearGradient
      colors={['#4CAF50', '#2196F3']} // Gradiente verde → blu
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to EcoTrack</Text>
        <Text style={styles.subtitle}>
          Track your ecological footprint and make a difference!
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            icon="login"
            onPress={() => router.navigate("/login")}
            style={[styles.button, styles.loginButton]}
            labelStyle={styles.buttonText}
          >
            Login
          </Button>
          <Button
            mode="contained"
            icon="account-plus"
            onPress={() => router.navigate("/registration")}
            style={[styles.button, styles.registerButton]}
            labelStyle={styles.buttonText}
          >
            Register
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Overlay per migliorare la leggibilità
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    marginVertical: 12,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 5,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
  },
  registerButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
