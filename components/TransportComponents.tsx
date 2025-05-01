import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import MapView, { Marker, Polyline, MapPressEvent } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';

export const TransportComponent = () => {
  const [startLocation, setStartLocation] = useState<any>(null);
  const [endLocation, setEndLocation] = useState<any>(null);
  const [routeType, setRouteType] = useState<'one-way' | 'round-trip'>('one-way');
  const [transportType, setTransportType] = useState('car');

  const handleMapPress = (e: MapPressEvent) => {
    const { coordinate } = e.nativeEvent;
    if (!startLocation) {
      setStartLocation(coordinate);
    } else if (!endLocation) {
      setEndLocation(coordinate);
    } else {
      Alert.alert("Errore", "Hai già selezionato sia il punto di partenza che di arrivo.");
    }
  };

  const handleRouteTypeChange = (type: 'one-way' | 'round-trip') => {
    setRouteType(type);
  };

  const getRouteCoordinates = () => {
    if (startLocation && endLocation) {
      return [startLocation, endLocation];
    }
    return [];
  };

  return (

    <View style={styles.container}>

    <View style={styles.buttonContainer}>
            <Button
              title="Sola Andata"
              onPress={() => handleRouteTypeChange('one-way')}
              color={routeType === 'one-way' ? 'blue' : 'gray'}
            />
            <Button
              title="Andata/Ritorno"
              onPress={() => handleRouteTypeChange('round-trip')}
              color={routeType === 'round-trip' ? 'blue' : 'gray'}
            />
    </View>

      <MapView
        style={styles.map}
        onPress={handleMapPress}
      >
        {startLocation && (
          <Marker coordinate={startLocation} title="Punto A (Partenza)" />
        )}

        {endLocation && (
          <Marker coordinate={endLocation} title="Punto B (Arrivo)" />
        )}

        {startLocation && endLocation && (
          <Polyline
            coordinates={getRouteCoordinates()}
            strokeColor="#000"
            strokeWidth={3}
          />
        )}
      </MapView>

      

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Scegli il Tipo di Trasporto:</Text>
        <Picker
          selectedValue={transportType}
          onValueChange={(itemValue) => setTransportType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Auto" value="car" />
          <Picker.Item label="Bicicletta" value="bike" />
          <Picker.Item label="Camminare" value="walk" />
          <Picker.Item label="Trasporto Pubblico" value="public" />
        </Picker>
      </View>

      <Text style={styles.transportText}>
        Tipo di trasporto selezionato: {transportType === 'car' ? 'Auto' : transportType === 'bike' ? 'Bicicletta' : transportType === 'walk' ? 'Camminare' : 'Trasporto Pubblico'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  map: { width: '100%', height: 400 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  routeText: { fontSize: 18, marginTop: 10 },
  pickerContainer: { marginTop: 20, width: '80%' },
  pickerLabel: { fontSize: 16, marginBottom: 10 },
  picker: { height: 50, width: '100%', backgroundColor: '#f0f0f0', borderRadius: 5 },
  transportText: { fontSize: 18, marginTop: 20, fontWeight: 'bold' },
});

export default TransportComponent;
