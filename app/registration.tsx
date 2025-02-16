import SERVER from '@/constants/Api';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableWithoutFeedback, Keyboard, 
  StyleSheet, Alert, KeyboardAvoidingView, Platform, Modal, TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';

interface RegFormState {
  name: string;
  surname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const RegisterScreen = () => {
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
  const [error, setError] = useState('');

  const handleChange = (name: keyof RegFormState, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const { name, surname, email, password, passwordConfirm } = formData;
    if (!name || !surname || !email || !password || !passwordConfirm) {
      setError('All fields are required.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const response = await fetch(`${SERVER}/auth/send-otp?email=${email}`, { method: 'POST' });
      if (response.ok) {
        setModalVisible(true);
      } else {
        Alert.alert('Error', 'Failed to send OTP.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch(`${SERVER}/auth/verify-otp?otp=${otp}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error(await response.text());
      Alert.alert('Success', 'OTP Verified Successfully!');
      setModalVisible(false);
      setTimeout(() => router.navigate('/login'), 2000);
    } catch (error) {
      Alert.alert('Error');
    }
  };

  return (
    <LinearGradient colors={['#4CAF50', '#2196F3']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formContainer}>
            <Text style={styles.header}>Sign Up</Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TextInput placeholder="Name" style={styles.textInput} value={formData.name} onChangeText={(text) => handleChange('name', text)} placeholderTextColor="#aaa"/>
            <TextInput placeholder="Surname" style={styles.textInput} value={formData.surname} onChangeText={(text) => handleChange('surname', text)} placeholderTextColor="#aaa"/>
            <TextInput placeholder="Email" style={styles.textInput} keyboardType="email-address" autoCapitalize="none" value={formData.email} onChangeText={(text) => handleChange('email', text)} placeholderTextColor="#aaa"/>
            <TextInput placeholder="Password" style={styles.textInput} secureTextEntry value={formData.password} onChangeText={(text) => handleChange('password', text)} placeholderTextColor="#aaa"/>
            <TextInput placeholder="Confirm Password" style={styles.textInput} secureTextEntry value={formData.passwordConfirm} onChangeText={(text) => handleChange('passwordConfirm', text)} placeholderTextColor="#aaa"/>
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>Sign Up</Button>
            <TouchableOpacity onPress={() => router.navigate('/login')}>
              <Text style={styles.loginLink}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Enter OTP</Text>
            <TextInput style={styles.textInput} placeholder="Enter OTP" keyboardType="numeric" value={otp} onChangeText={setOtp} />
            <View style={styles.buttonContainer}>
              <Button mode="outlined" onPress={() => setModalVisible(false)} style={styles.backButton}>Back</Button>
              <Button mode="contained" onPress={verifyOtp} style={styles.button}>Verify</Button>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  inner: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', padding: 24 },
  formContainer: { 
    width: '100%',
    height: "95%",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: { fontSize: 36, color: '#fff', fontWeight: 'bold', marginBottom: 30 },
  textInput: {
    width: '100%',
    height: 50,
    borderColor: '#fff', // White border for text inputs
    borderBottomWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#fff', // White text color for inputs
  },
  errorText: { color: 'red', fontSize: 14, marginBottom: 10 },
  button: { width: '100%', backgroundColor: '#4CAF50', marginVertical: 10 },
  loginLink: { color: '#fff', fontSize: 16, marginTop: 20, textDecorationLine: 'underline' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  backButton: { flex: 1, marginRight: 5 },
  modalContainer: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: 300, padding: 20, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center' },
  modalHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 }
});

export default RegisterScreen;
