import { Alert} from 'react-native';

import GestioneAttivitaComponent from '@/components/GestioneAttivitàComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import AddActivityModal from '@/components/AddActivityModal';
import TransportationModal from '@/components/TransportModal';

export default function TabThirdScreen() {
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
    setModalVisible(true);
    if (category == "Trasporti") {
      setModalVisible(false);
      setIsModalVisible(true);
    }
    setCategory(category);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestioneAttivitaComponent onCategorySelect={handleCategorySelect} />
      <AddActivityModal
        category={category}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddActivity}
      />
      {/* Transportation Modal */}
      <TransportationModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
}