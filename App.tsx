import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
} 