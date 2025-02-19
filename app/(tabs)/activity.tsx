import { StyleSheet } from 'react-native';

import GestioneAttivitaComponent from '@/components/GestioneAttivitàComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function TabThirdScreen() {
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activities, setActivities] = useState<
    { name: string; consumption: string; date: Date }[]
  >([]);
  const [category, setCategory] = useState<string>("");

  const handleAddActivity = (activity: {
    name: string;
    consumption: string;
    date: Date;
  }) => {
    setActivities([...activities, activity]);
  };

  const handleCategorySelect = (category: string) => {
    setCategory(category);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestioneAttivitaComponent onCategorySelect={handleCategorySelect} />
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: 400,
  },
  footer: {
    marginTop: 20,
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});