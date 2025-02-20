import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; // Importing the picker

export const HomeComponent = () => {
  const [billType, setBillType] = useState('');
  const [consumption, setConsumption] = useState('');

  // Map bill types to corresponding units
  const billTypeOptions = [
    { label: 'Luce (kWh)', value: 'electricity' },
    { label: 'Gas (m³)', value: 'gas' },
    { label: 'Acqua (m³)', value: 'water' },
  ];

  // Handle the calculate action
  const handleCalculate = async () => {
    if (!billType || !consumption || isNaN(parseFloat(consumption)) || parseFloat(consumption) <= 0) {
      Alert.alert("Errore", "Per favore inserisci un tipo di bolletta valido e un consumo.");
      return;
    }

    try {
      const response = await fetch('https://tuo-server-api.com/calculate-ecofootprint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          billType: billType.toLowerCase(),
          consumption: parseFloat(consumption),
        }),
      });

      const data = await response.json();

      if (!response.ok) Alert.alert("Errore", "Si è verificato un errore durante il calcolo.");
    } catch (error) {
      console.error(error);
      Alert.alert("Errore", "Impossibile raggiungere il server.");
    }
  };

  // Handle the reset action
  const handleReset = () => {
    setBillType('');
    setConsumption('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calcola EcoFootprint</Text>

      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={(value) => setBillType(value)}
        items={billTypeOptions}
        placeholder={{ label: 'Seleziona tipo di bolletta...', value: null }}
      />

      <TextInput
        style={styles.input}
        placeholder={billType ? `Consumo (${billType === 'electricity' ? 'kWh' : 'm³'})` : 'Consumo'}
        keyboardType="numeric"
        value={consumption}
        onChangeText={setConsumption}
      />

      <Button title="Calcola" onPress={handleCalculate} />
      <Button title="Reset" onPress={handleReset} color="gray" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  input: { width: '80%', padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 15 },
  result: { marginTop: 15, fontSize: 18, fontWeight: 'bold' },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  inputIOS: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
});

export default HomeComponent;
