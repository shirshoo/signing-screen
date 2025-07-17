import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ContractItem = ({ 
  title, 
  company, 
  date,
  users = [],
  onPress 
}: { 
  title: string; 
  company: string; 
  date: string;
  users?: string[];
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress} className="bg-white p-4 border-b border-gray-200">
    <View className="flex-row justify-between items-start">
      <View className="flex-1">
        <Text className="text-[#1A1A1A] text-lg font-medium">{title}</Text>
        <Text className="text-[#757575] mt-1">{company}</Text>
        <View className="flex-row items-center mt-2">
          <Ionicons name="calendar-outline" size={16} color="#757575" />
          <Text className="text-[#757575] ml-2">{date}</Text>
        </View>
        <View className="flex-row mt-4">
          {users.map((initials, index) => (
            <View 
              key={index} 
              className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center -ml-2 first:ml-0"
            >
              <Text className="text-[#1A1A1A] text-xs">{initials}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="ellipsis-vertical" size={20} color="#1A1A1A" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const ContractsScreen = () => {
  const [selectedContract, setSelectedContract] = useState<string | null>(null);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [signOptionVisible, setSignOptionVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const router = useRouter();

  useEffect(() => {
    if (actionSheetVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 100,
          duration: 400,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [actionSheetVisible]);

  const contracts = [
    {
      id: '1',
      title: 'Master Service Agreement',
      company: 'Agrimitra Solutions',
      date: 'May 2, 2025',
      users: ['AS', 'BK']
    },
    {
      id: '2',
      title: 'Software License Agreement',
      company: 'Agrimitra Solutions',
      date: 'May 2, 2025',
      users: ['AS']
    },
    {
      id: '3',
      title: 'Enterprise Software Agreement',
      company: 'TechCorp Solutions',
      date: 'June 10, 2025',
      users: ['TC', 'AS']
    },
    {
      id: '4',
      title: 'Cloud Services Agreement',
      company: 'CloudTech Inc',
      date: 'July 1, 2025',
      users: ['CT', 'MK']
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Header with Back Button */}
      <View className="px-4 pt-2 flex-row items-center">
        <TouchableOpacity className="mr-2">
          <Ionicons name="chevron-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <View>
          <Text className="text-xl font-semibold text-[#1A1A1A]">Johnson & Partners Merger</Text>
          <Text className="text-[#757575]">Johnson & Partners</Text>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row mt-4 px-4 border-b border-gray-200">
        <TouchableOpacity className="mr-8 flex-row items-center">
          <Ionicons name="pencil" size={20} color="#757575" />
          <Text className="text-[#757575] font-medium ml-2 pb-3">Contracts</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mr-8 flex-row items-center">
          <Ionicons name="document-text" size={20} color="#1A1A1A" />
          <Text className="text-[#1A1A1A] font-medium ml-2 pb-3">Sign Contracts</Text>
          <View className="h-0.5 bg-[#1A1A1A] absolute bottom-0 left-0 right-0" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="pencil" size={20} color="#757575" />
          <Text className="text-[#757575] font-medium ml-2 pb-3">Active Contracts</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="px-4 mt-4">
        <View className="flex-row items-center bg-[#F5F5F5] rounded-lg px-4 py-2">
          <Ionicons name="search-outline" size={20} color="#757575" />
          <TextInput 
            placeholder="Search..."
            className="flex-1 ml-2 text-[#1A1A1A]"
            placeholderTextColor="#757575"
          />
        </View>
      </View>

      {/* Contract List */}
      <ScrollView className="flex-1 mt-4">
        {contracts.map((contract) => (
          <ContractItem
            key={contract.id}
            title={contract.title}
            company={contract.company}
            date={contract.date}
            users={contract.users}
            onPress={() => {
              setSelectedContract(contract.id);
              setActionSheetVisible(true);
            }}
          />
        ))}
      </ScrollView>

      {/* Bottom Action Sheet */}
      <Modal
        visible={actionSheetVisible}
        transparent
        animationType="none"
        onRequestClose={() => setActionSheetVisible(false)}
      >
        <Animated.View 
          style={[
            { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
            { opacity: fadeAnim }
          ]}
        >
          <TouchableOpacity 
            style={{ flex: 1 }}
            activeOpacity={1} 
            onPress={() => setActionSheetVisible(false)}
          >
            <Animated.View 
              style={[
                {
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'white',
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                },
                {
                  transform: [{ 
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: [0, 1000]
                    })
                  }]
                }
              ]}
            >
              <View className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3" />
              <TouchableOpacity className="p-4 flex-row items-center border-b border-gray-200">
                <Ionicons name="create-outline" size={24} color="#1A1A1A" />
                <Text className="ml-3 text-[#1A1A1A] text-lg">Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="p-4 flex-row items-center border-b border-gray-200"
                onPress={() => {
                  setActionSheetVisible(false);
                  setSignOptionVisible(true);
                }}
              >
                <Ionicons name="pencil-outline" size={24} color="#1A1A1A" />
                <Text className="ml-3 text-[#1A1A1A] text-lg">E-Sign</Text>
              </TouchableOpacity>
              <TouchableOpacity className="p-4 flex-row items-center mb-6">
                <Ionicons name="trash-outline" size={24} color="#FF3B30" />
                <Text className="ml-3 text-[#FF3B30] text-lg">Delete</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </Modal>

      {/* Centered E-Sign Options Modal */}
      <Modal
        visible={signOptionVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSignOptionVisible(false)}
      >
        <View className="flex-1 bg-[#00212C]/30 justify-center items-center">
          <View className="bg-white rounded-2xl w-[80%] p-6">
            <TouchableOpacity 
              className="absolute right-4 top-4" 
              onPress={() => setSignOptionVisible(false)}
            >
              <Ionicons name="close" size={24} color="#00212C" />
            </TouchableOpacity>
            
            <View className="items-center mb-4">
              <Ionicons name="document-text-outline" size={40} color="#00212C" />
              <Text className="text-xl font-semibold mt-4 text-center">
                Master Service Agreement
              </Text>
              <Text className="text-[#757575] mt-2 text-center">
                Please select your user type to see the appropriate e-signature interface
              </Text>
            </View>

            <View className="flex-row justify-between mt-4 gap-4">
              <TouchableOpacity 
                className="flex-1 bg-[#00212C] rounded-lg py-3 px-6"
                onPress={() => {
                  if (selectedContract) {
                    setSignOptionVisible(false);
                    router.push({
                      pathname: '/contract/[id]',
                      params: { id: selectedContract }
                    });
                  }
                }}
              >
                <Text className="text-white font-medium text-center">Lawyer</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="flex-1 border border-[#00212C] rounded-lg py-3 px-6 active:bg-[#00212C]"
                onPress={() => setSignOptionVisible(false)}
              >
                <Text className="text-[#00212C] font-medium text-center active:text-white">Business User</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ContractsScreen; 