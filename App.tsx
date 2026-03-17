import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { RootNavigator } from './src/navigation/RootNavigator';

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider style={{ backgroundColor: '#000' }}>
      <StatusBar style="light" backgroundColor="#000" />
      <RootNavigator />
    </SafeAreaProvider>
  );
}
