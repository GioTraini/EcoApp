import HomePageComponent from '@/components/HomePageComponent';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const router = useRouter();
  const userStats = {
    week: [10, 20, 30, 40, 50, 60, 70], // Dati settimanali
    month: [150, 200, 180, 220], // Dati mensili
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <HomePageComponent
        userName="Vincent Gottem"
        avatar="https://example.com/avatar.jpg"
        statistics={userStats}
      />
    </SafeAreaView>
  );
};


export default DashboardScreen;
