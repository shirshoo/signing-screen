import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

interface NavbarProps {
  title: string;
  showBack?: boolean;
}

export function Navbar({ title, showBack = true }: NavbarProps) {
  const router = useRouter();

  return (
    <View className="flex-row items-center px-4 py-4 bg-white border-b border-gray-100">
      {showBack && (
        <TouchableOpacity 
          onPress={() => router.back()}
          className="mr-3"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
      )}
      <Text className="text-lg font-semibold text-gray-900 flex-1">{title}</Text>
    </View>
  );
} 