import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface ProfileProps {
  name: string;
  email: string;
  bio?: string;
  profilePicture?: string;
  onEditProfile: () => void;
}

const ProfilePage: React.FC<ProfileProps> = ({
  name,
  email,
  bio = "No bio available",
  profilePicture = "https://via.placeholder.com/150",
  onEditProfile,
}) => {
  return (
    <LinearGradient
              colors={['#4CAF50', '#2196F3']} 
              style={styles.gradientBackground}
    >
      <View style={styles.container}>
        <Image source={{ uri: profilePicture }} style={styles.profileImage} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.bio}>{bio}</Text>
        <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
  </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  editButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfilePage;
