import { StyleSheet, Image, Platform, SafeAreaView } from 'react-native';
import React from 'react';
import ProfilePage from '@/components/ProfilePage';

export default function TabTwoScreen() {


  const handleEditProfile = () => {
    console.log("Edit profile clicked!");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProfilePage
        name="Vincent Gottem"
        email="maxpopovschii@gmail.com"
        bio="DevOps Engineer & Streamer"
        profilePicture="https://example.com/your-profile-picture.jpg"
        onEditProfile={handleEditProfile}
      />
    </SafeAreaView>
  );
}

