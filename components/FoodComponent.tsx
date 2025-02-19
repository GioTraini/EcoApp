import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput } from 'react-native';

export const FoodComponent = () => (
    <View style={styles.container}>
      <Text style={styles.header}>Food Input</Text>
      <TextInput style={styles.input} placeholder="Enter food details" />
    </View>
  );

  const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    input: { width: '80%', padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
    map: { width: '100%', height: 200 },
  });
