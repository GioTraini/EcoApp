import React from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FoodComponent } from '../FoodComponent';
import { HomeComponent } from '../HomeComponent';
import { OtherComponent } from '../OtherComponent';
import { TransportComponent } from '../TransportComponents';


interface CategoryModalProps {
  visible: boolean;
  category: string;
  onClose: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ visible, category, onClose }) => {
  const renderCategoryContent = () => {
    switch (category) {
      case 'Trasporti':
        return <TransportComponent />;
      case 'Casa':
        return <HomeComponent />;
      case 'Alimentazione':
        return <FoodComponent />;
      case 'Altro':
        return <OtherComponent />;
      default:
        return <Text>Unknown category</Text>;
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <SafeAreaView style={styles.overlay}>
        <ScrollView style={styles.modalContent}>
          <Text style={styles.header}>{category?.toUpperCase()}</Text>
          {renderCategoryContent()}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '95%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  closeText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CategoryModal;
