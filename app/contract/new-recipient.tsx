import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function NewRecipientScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const existingSigners = params.signers ? JSON.parse(params.signers as string) : [];
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'Signer',
    signingMethod: 'eSign'
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false
  });
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const roles = ['Signer', 'Viewer', 'Approver', 'Manager'];
  const signingMethods = [
    { 
      id: 'eSign', 
      title: 'LeXi eSign', 
      description: '2FA Authentication'
    },
    { 
      id: 'eMohar', 
      title: 'LeXi eMohar', 
      description: 'Aadhar Card'
    }
  ];

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = () => {
    const newErrors = {
      name: !form.name.trim(),
      email: !validateEmail(form.email)
    };
    setErrors(newErrors);

    if (newErrors.name || newErrors.email) {
      Alert.alert('Required Fields', 'Please fill in all required fields correctly.');
      return;
    }

    // Create new recipient with current date
    const now = new Date();
    const recipientData = {
      ...form,
      id: Date.now().toString(),
      dateAdded: now.toISOString()
    };
    
    // Combine with existing signers
    const updatedSigners = [...existingSigners, recipientData];
    
    // Navigate back to review screen
    router.push({
      pathname: '/contract/review',
      params: { 
        signers: JSON.stringify(updatedSigners)
      }
    });
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-12 pb-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="chevron-back" size={24} color="#00212C" />
          </TouchableOpacity>
          <View>
            <Text className="text-xl font-semibold text-[#00212C]">Add New Recipient</Text>
          </View>
        </View>
      </View>

      {/* Form */}
      <ScrollView className="flex-1 p-4 space-y-6">
        <View>
          <Text className="text-[#00212C] font-medium mb-2">
            Name <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            value={form.name}
            onChangeText={(text) => {
              setForm(prev => ({ ...prev, name: text }));
              setErrors(prev => ({ ...prev, name: false }));
            }}
            placeholder="Enter recipient's name"
            placeholderTextColor="#757575"
            className={`bg-gray-50 rounded-lg p-4 text-[#00212C] ${errors.name ? 'border border-red-500' : ''}`}
          />
          {errors.name && (
            <Text className="text-red-500 text-sm mt-1">Name is required</Text>
          )}
        </View>

        <View>
          <Text className="text-[#00212C] font-medium mb-2">
            Email <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            value={form.email}
            onChangeText={(text) => {
              setForm(prev => ({ ...prev, email: text }));
              setErrors(prev => ({ ...prev, email: false }));
            }}
            placeholder="Enter recipient's email"
            placeholderTextColor="#757575"
            className={`bg-gray-50 rounded-lg p-4 text-[#00212C] ${errors.email ? 'border border-red-500' : ''}`}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1">Please enter a valid email</Text>
          )}
        </View>

        <View>
          <Text className="text-[#00212C] font-medium mb-2">Role</Text>
          <TouchableOpacity 
            onPress={() => setShowRoleDropdown(true)}
            className="bg-gray-50 rounded-lg p-4 flex-row justify-between items-center"
          >
            <Text className="text-[#00212C]">{form.role}</Text>
            <Ionicons name="chevron-down" size={20} color="#757575" />
          </TouchableOpacity>
        </View>

        <View>
          <Text className="text-[#00212C] font-medium mb-4">Signing Method</Text>
          <View className="space-y-3">
            {signingMethods.map((method) => (
              <TouchableOpacity 
                key={method.id}
                className="flex-row items-center p-4 bg-gray-50 rounded-lg"
                onPress={() => setForm(prev => ({ ...prev, signingMethod: method.id }))}
              >
                <View className="w-6 h-6 rounded-full border-2 border-[#00212C] items-center justify-center mr-3">
                  {form.signingMethod === method.id && (
                    <View className="w-3 h-3 rounded-full bg-[#00212C]" />
                  )}
                </View>
                <View>
                  <Text className="text-[#00212C] font-medium">{method.title}</Text>
                  <Text className="text-[#757575] text-sm mt-1">{method.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Add Button */}
      <View className="p-4 border-t border-gray-200">
        <TouchableOpacity 
          className="bg-[#00212C] rounded-lg py-4 items-center"
          onPress={handleSubmit}
        >
          <Text className="text-white font-medium">Add Signature Field</Text>
        </TouchableOpacity>
      </View>

      {/* Role Selection Modal */}
      <Modal
        visible={showRoleDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRoleDropdown(false)}
      >
        <TouchableOpacity 
          className="flex-1 bg-black/30"
          activeOpacity={1} 
          onPress={() => setShowRoleDropdown(false)}
        >
          <View className="flex-1 justify-center px-4">
            <View className="bg-white rounded-xl overflow-hidden">
              {roles.map((role) => (
                <TouchableOpacity
                  key={role}
                  className="p-4 border-b border-gray-100 flex-row justify-between items-center"
                  onPress={() => {
                    setForm(prev => ({ ...prev, role }));
                    setShowRoleDropdown(false);
                  }}
                >
                  <Text className="text-[#00212C] text-lg">{role}</Text>
                  {form.role === role && (
                    <Ionicons name="checkmark" size={24} color="#00212C" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
} 