import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, Platform } from 'react-native';

// Dynamically import react-native-maps based on platform
let MapView: any;
let Marker: any;

if (Platform.OS !== 'web') {
  MapView = require('react-native-maps').default;
  Marker = require('react-native-maps').Marker;
}

interface TransportModalProps {
  visible: boolean;
  onClose: () => void;
}

const TransportModal: React.FC<TransportModalProps> = ({ visible, onClose }) => {
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleMapPress = (e: any) => {
    const { coordinate } = e.nativeEvent;
    setSelectedLocation(coordinate);
  };

  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Map not available on Web. Please try on mobile.</Text>
      </View>
    );
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Add Transport Activity</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.7749,
              longitude: -122.4194,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}
          >
            {selectedLocation && <Marker coordinate={selectedLocation} title="Selected Location" />}
          </MapView>
        {/* Additional modal content */}
        <View style={styles.footer}>
          <Text>Select a transport activity:</Text>
          {/* Transport selection logic */}
        </View>
        <View style={styles.buttons}>
          <Text onPress={onClose}>Close</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: 400,
  },
  footer: {
    marginTop: 20,
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default TransportModal;
