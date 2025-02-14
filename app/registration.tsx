import SERVER from '@/constants/Api';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet, Alert, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';

interface RegFormState {
  name: string;
  surname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const RegisterScreen: React.FC = () => {
  const [formData, setFormData] = useState<RegFormState>({
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [otp, setOtp] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleChange = (name: keyof RegFormState, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReg = async () => {
    try {
      const response = await fetch(`${SERVER}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Errore nei dati.");
      
      setModalVisible(true); // Show OTP modal
    } catch (error) {
      Alert.alert('Registration Failed', (error as Error).message);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch(`${SERVER}/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      
      if (!response.ok) throw new Error("Invalid OTP.");
      
      Alert.alert('Success', 'OTP Verified Successfully!');
      setModalVisible(false);
      router.navigate("/login");
    } catch (error) {
      Alert.alert('OTP Verification Failed', (error as Error).message);
    }
  };

  return (
    <LinearGradient colors={['#4CAF50', '#2196F3']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formContainer}>
            <Text style={styles.header}>Sign Up</Text>

            <TextInput placeholder="Name" style={styles.textInput} value={formData.name} onChangeText={(text) => handleChange('name', text)} />
            <TextInput placeholder="Surname" style={styles.textInput} value={formData.surname} onChangeText={(text) => handleChange('surname', text)} />
            <TextInput placeholder="Email" style={styles.textInput} keyboardType="email-address" autoCapitalize="none" value={formData.email} onChangeText={(text) => handleChange('email', text)} />
            <TextInput placeholder="Password" style={styles.textInput} secureTextEntry value={formData.password} onChangeText={(text) => handleChange('password', text)} />
            <TextInput placeholder="Password Confirmation" style={styles.textInput} secureTextEntry value={formData.passwordConfirm} onChangeText={(text) => handleChange('passwordConfirm', text)} />

            <View style={styles.btnContainer}>
              <Button onPress={handleReg}>Submit</Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* OTP Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Enter OTP</Text>
            <TextInput style={styles.textInput} placeholder="Enter OTP" keyboardType="numeric" value={otp} onChangeText={setOtp} />
            <Button onPress={verifyOtp}>Verify</Button>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  inner: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', padding: 24 },
  formContainer: { width: '100%', height: "95%", backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 10, padding: 20, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 36, marginBottom: 24, color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  textInput: { width: '100%', height: 50, borderColor: '#fff', borderBottomWidth: 2, marginBottom: 20, paddingHorizontal: 8, fontSize: 16, color: '#fff' },
  btnContainer: { width: '80%', marginTop: 20, backgroundColor: '#4caf50', borderRadius: 8, paddingVertical: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '80%', padding: 20, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center' },
  modalHeader: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});

export default RegisterScreen;
