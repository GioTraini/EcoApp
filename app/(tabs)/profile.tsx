import { StyleSheet, Image, Platform, SafeAreaView } from 'react-native';
import React from 'react';
import ProfilePage from '@/components/ProfilePage';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/hooks/useAuth';
import { useAuthContext } from '@/utils/authContext';

export default function TabTwoScreen() {

  const user = useAuthContext()
  const handleEditProfile = () => {
    console.log("Edit profile clicked!");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProfilePage
        name={user.user?.name || "Traini Giovanni"}
        email={user.user?.email || "ciaociao@gmail.com"}
        bio="DevOps Engineer & Streamer"
        profilePicture="https://static.zerochan.net/Changli.full.4234752.jpg"
        onEditProfile={handleEditProfile}
      />
    </SafeAreaView>
  
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
})
