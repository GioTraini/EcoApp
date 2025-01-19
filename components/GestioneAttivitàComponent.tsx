import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface GestioneAttivitaProps {
  onCategorySelect: (category: string) => void; // Funzione per gestire la selezione della categoria
}

const GestioneAttivitaComponent: React.FC<GestioneAttivitaProps> = ({ onCategorySelect }) => {
  const categories = [
    { name: 'Trasporti', icon: 'bus' },
    { name: 'Casa', icon: 'home' },
    { name: 'Alimentazione', icon: 'food' },
    { name: 'Altro', icon: 'dots-horizontal' },
  ];

  return (
    <LinearGradient
      colors={['#4CAF50', '#2196F3']} 
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Gestione Attività</Text>

        <View style={styles.gridContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.name}
              style={styles.button}
              onPress={() => onCategorySelect(category.name)}
            >
              <Icon name={category.icon} size={60} color="#fff" />
              <Text style={styles.buttonText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 145,
    height: 145,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    elevation: 5,
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default GestioneAttivitaComponent;
