import React, { useState } from 'react';
import { Button, SafeAreaView, TextInput, View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import ProfilePage from '@/components/ProfilePage';
import { useAuthContext } from '@/utils/authContext';
import CustomModal from '@/components/modals/ReusableModal';

interface FormState {
  fullname: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}


export default function TabTwoScreen() {
  const { user } = useAuthContext();
  const [formdData, setFormdData] = useState<FormState>({
    fullname: user?.fullName || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (name: keyof FormState, value: string) => {
    setFormdData({
      ...formdData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const { fullname, email, currentPassword, newPassword, confirmPassword } = formdData;
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long.");
      return;
    }

    // Simulating API call to change password
    setTimeout(() => {
      Alert.alert("Success", "Password changed successfully!");
      setModalVisible(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProfilePage
        fullName={user!.fullName}
        email={user!.email}
        profilePicture={user?.avatar}
        onEditProfile={handleSubmit}
      />
      {/* Modal per la modifica del profilo */}
      <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <Text style={styles.modalTitle}>Edit Profile</Text>

        <TextInput
          style={styles.input}
          value={formdData.fullname}
          onChangeText={(text) => handleChange('fullname', text)}
          placeholder="Name"
        />

        <TextInput
          style={styles.input}
          value={formdData.email}
          onChangeText={(text) => handleChange('email', text)}
          placeholder="Email"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry
          value={formdData.currentPassword}
          onChangeText={(text) => handleChange('currentPassword', text)}
        />
        
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={formdData.newPassword}
          onChangeText={(text) => handleChange('newPassword', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry
          value={formdData.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
        />

        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSubmit} />
          <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
        </View>
      </CustomModal>
    </SafeAreaView>
  );
}



// Styles
const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});