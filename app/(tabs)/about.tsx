import { Alert} from 'react-native';

import GestioneAttivitaComponent from '@/components/GestioneAttivitàComponent';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabThirdScreen() {

  const handleCategorySelect = (category: string) => {
    Alert.alert('Selezione categoria', `Hai selezionato la categoria: ${category}`);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestioneAttivitaComponent onCategorySelect={handleCategorySelect} />
    </SafeAreaView>
  );
}