import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export const TransportComponent = () => (
    <View style={styles.container}>
      <Text style={styles.header}>Transport Navigation</Text>
      <MapView style={styles.map}>
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} title="Your Location" />
      </MapView>
    </View>
  );


  const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    input: { width: '80%', padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
    map: { width: '100%', height: 200 },
  });