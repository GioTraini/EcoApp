import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddActivityModalProps {
    category: string;
    visible: boolean;
    onClose: () => void;
    onSave: (activity: { name: string; consumption: string; date: Date }) => void;
}

const AddActivityModal: React.FC<AddActivityModalProps> = ({
    category,
    visible,
    onClose,
    onSave,
}) => {
  const [name, setName] = useState('');
  const [consumption, setConsumption] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (name && consumption) {
      onSave({ name, consumption, date });
      setName('');
      setConsumption('');
      setDate(new Date());
      onClose();
    } else {
      alert('Please fill all fields!');
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };
  if (category == "Casa") {
    return (
        <Modal visible={visible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Add Activity</Text>
              <TextInput
                style={styles.input}
                placeholder="Activity Name (e.g., Electricity)"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Consumption (e.g., 50 kWh)"
                value={consumption}
                onChangeText={setConsumption}
                keyboardType="numeric"
              />
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.dateButton}
              >
                <Text style={styles.dateButtonText}>
                  {`Date: ${date.toLocaleDateString()}`}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'inline' : 'default'}
                  onChange={handleDateChange}
                />
              )}
              <View style={styles.buttonRow}>
                <Button title="Cancel" onPress={onClose} color="#ff4d4d" />
                <Button title="Save" onPress={handleSave} color="#4caf50" />
              </View>
            </View>
          </View>
        </Modal>
      );
  }
  if (category == "Trasporti") {
    
  }
 
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  dateButton: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#555',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddActivityModal;
