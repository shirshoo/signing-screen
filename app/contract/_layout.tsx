import { Stack } from 'expo-router';

export default function ContractLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[id]" />
      <Stack.Screen name="sign" />
      <Stack.Screen name="new-recipient" />
      <Stack.Screen name="review" />
    </Stack>
  );
} 