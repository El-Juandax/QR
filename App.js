import { StatusBar } from 'expo-status-bar';
import Navigation from './Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView>
    <Navigation/>  
    </GestureHandlerRootView>
  );
}


