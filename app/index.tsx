import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const router = useRouter();
  return (
    <ImageBackground
      source={{ uri: 'https://www.example.com/eco-background.jpg' }} // Cambia con una tua immagine di sfondo
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to EcoTrack</Text>
        <Text style={styles.subtitle}>Track your ecological footprint effortlessly</Text>

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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Aggiungi un overlay scuro per migliorare la leggibilità
    borderRadius: 10,
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
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
    fontWeight: '600',
  },
});

export default HomeScreen;
