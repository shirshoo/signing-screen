import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          display: 'none' // This hides the tab bar
        }
      }}
    >
      <Tabs.Screen 
        name="contracts" 
        options={{ 
          title: 'Contracts',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          )
        }} 
      />
    </Tabs>
  );
} 