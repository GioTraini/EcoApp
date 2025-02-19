import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TransportComponent } from '../TransportComponents';
import { HomeComponent } from '../HomeComponent';
import { FoodComponent } from '../FoodComponent';
import { OtherComponent } from '../OtherComponent';


interface CategoryModalProps {
  visible: boolean;
  category: 'transport' | 'home' | 'food' | 'other';
  onClose: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ visible, category, onClose }) => {
  const renderCategoryContent = () => {
    switch (category) {
      case 'transport':
        return <TransportComponent />;
      case 'home':
        return <HomeComponent />;
      case 'food':
        return <FoodComponent />;
      case 'other':
        return <OtherComponent />;
      default:
        return <Text>Unknown category</Text>;
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.header}>{category.toUpperCase()}</Text>
          {renderCategoryContent()}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
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
