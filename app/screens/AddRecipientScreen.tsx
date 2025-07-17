import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Stepper from '../components/Stepper';

const InputField = ({ label, placeholder }: { label: string; placeholder: string }) => (
  <View className="mb-4">
    <Text className="text-[#1A1A1A] text-sm mb-2">{label}</Text>
    <TextInput
      placeholder={placeholder}
      className="bg-[#F5F5F5] rounded-lg px-4 py-3 text-[#1A1A1A]"
      placeholderTextColor="#757575"
    />
  </View>
);

const AddRecipientScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-2">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-3" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-xl font-semibold text-[#1A1A1A]">E-Signing</Text>
            <Text className="text-[#757575]">Master Service Agreement</Text>
          </View>
        </View>
      </View>

      <Stepper currentStep={2} />

      {/* Form */}
      <ScrollView className="flex-1 px-4 mt-6">
        <InputField 
          label="Full Name"
          placeholder="Type full name of recipient"
        />
        <InputField 
          label="Email Address"
          placeholder="Type recipient's email address"
        />
        <View className="mb-4">
          <Text className="text-[#1A1A1A] text-sm mb-2">Role</Text>
          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-200">
            <View className="w-6 h-6 rounded-full border-2 border-[#1A1A1A] items-center justify-center">
              <View className="w-3 h-3 rounded-full bg-[#1A1A1A]" />
            </View>
            <Text className="text-[#1A1A1A] ml-3">Signer</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center py-3">
            <View className="w-6 h-6 rounded-full border-2 border-[#757575] items-center justify-center" />
            <Text className="text-[#757575] ml-3">Viewer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View className="p-4 border-t border-gray-200">
        <TouchableOpacity 
          className="bg-[#1A1A1A] rounded-lg py-4 items-center"
          onPress={() => {
            // TODO: Handle form submission
            router.back();
          }}
        >
          <Text className="text-white font-medium">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddRecipientScreen; 