import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Signer = {
  id: string;
  name: string;
  email: string;
  role: string;
  signingMethod: string;
  dateAdded: string;
};

type TimelineItem = {
  action: string;
  date: string;
  user: string;
};

const formatDate = (dateString: string, includeTime: boolean = false) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...(includeTime && {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  };
  return date.toLocaleString('en-US', options);
};

export default function SigningProgressScreen() {
  const router = useRouter();
  const { step } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const params = useLocalSearchParams();
  const [signers, setSigners] = useState<Signer[]>([]);
  const [showExpirationPicker, setShowExpirationPicker] = useState(false);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [timeline, setTimeline] = useState<TimelineItem[]>([
    {
      action: 'Document created',
      date: new Date().toISOString(),
      user: 'Michael Brown'
    }
  ]);

  // Determine if interactions should be disabled
  const isInteractionDisabled = currentStep >= 3;

  useEffect(() => {
    if (step) {
      setCurrentStep(Number(step));
    }
  }, [step]);

  useEffect(() => {
    if (params.signers) {
      const parsedSigners = JSON.parse(params.signers as string) as Signer[];
      setSigners(parsedSigners);
      
      // Add timeline items for each signer
      parsedSigners.forEach(signer => {
        if (!timeline.some(item => 
          item.action === `Recipient added: ${signer.name}` && 
          item.date === signer.dateAdded
        )) {
          addTimelineItem({
            action: `Recipient added: ${signer.name}`,
            date: signer.dateAdded,
            user: 'You'
          });
        }
      });
    }
  }, [params.signers]);

  const steps = [
    { number: 1, title: 'Prepare' },
    { number: 2, title: 'Send' },
    { number: 3, title: 'Status' },
    { number: 4, title: 'Complete' }
  ];

  const handleAddRecipient = () => {
    // Pass existing signers when navigating to add new recipient
    router.push({
      pathname: '/contract/new-recipient',
      params: {
        signers: JSON.stringify(signers)
      }
    });
    setCurrentStep(2);
  };

  const addTimelineItem = (item: TimelineItem) => {
    setTimeline(prev => [...prev, item].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
  };

  const handleExpirationChange = (event: any, selectedDate?: Date) => {
    setShowExpirationPicker(false);
    if (selectedDate) {
      setExpirationDate(selectedDate);
      addTimelineItem({
        action: `Expiration date set to ${formatDate(selectedDate.toISOString())}`,
        date: new Date().toISOString(),
        user: 'You'
      });
    }
  };

  const renderContent = () => {
    if (currentStep === 4) {
      return (
        <ScrollView className="flex-1">
          {/* Complete Status */}
          <View className="items-center pt-8 pb-12">
            <View className="w-20 h-20 rounded-full bg-[#00212C] items-center justify-center mb-4">
              <Ionicons name="checkmark" size={40} color="white" />
            </View>
            <Text className="text-[#00212C] text-xl font-semibold mb-2">
              Completed!
            </Text>
            <Text className="text-[#00212C] text-sm text-center mb-2">
              Master Service Agreement has been signed by all parties
            </Text>
            <Text className="text-[#00212C] text-sm mb-6">
              {formatDate(new Date().toISOString(), true)}
            </Text>
            <TouchableOpacity 
              className="bg-[#00212C] rounded-lg py-4 px-6 flex-row items-center justify-center space-x-2"
              onPress={() => {}}
            >
              <Ionicons name="download-outline" size={20} color="white" />
              <Text className="text-white font-medium">Download Signed Document</Text>
            </TouchableOpacity>
          </View>

          {/* Signers Section */}
          <View className="px-4 pb-6 border-b border-gray-200">
            <Text className="text-lg font-medium text-[#00212C] mb-4">Signers</Text>
            {signers.map((signer) => (
              <View 
                key={signer.id}
                className="bg-gray-50 rounded-lg p-4 mb-3 flex-row justify-between items-center"
              >
                <View className="flex-1">
                  <Text className="text-[#00212C] text-base font-medium">{signer.name}</Text>
                  <Text className="text-[#757575] text-sm mt-1">{signer.email}</Text>
                </View>
                <View className="bg-[#E6F7ED] rounded-lg px-4 py-2">
                  <Text className="text-[#00875A] text-xs font-medium">
                    {formatDate(signer.dateAdded)}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Activity Timeline */}
          <View className="p-4">
            <Text className="text-lg font-medium text-[#00212C] mb-4">Activity Timeline</Text>
            {timeline.map((item, index) => (
              <View key={index} className="mb-4 last:mb-0">
                <Text className="text-[#00212C] font-medium">{item.action}</Text>
                <Text className="text-[#757575] text-sm mt-1">{formatDate(item.date, true)}</Text>
                <Text className="text-[#757575] text-sm">{item.user}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      );
    }

    return (
      <>
        <ScrollView className="flex-1">
          {/* Original content for steps 1-3 */}
          {/* Signers Section */}
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-medium text-[#00212C] mb-4">Signers</Text>
            {signers.map((signer) => (
              <View 
                key={signer.id}
                className="bg-gray-50 rounded-lg p-4 mb-3 flex-row justify-between items-center"
              >
                <View className="flex-1">
                  <Text className="text-[#00212C] text-base font-medium">{signer.name}</Text>
                  <Text className="text-[#757575] text-sm mt-1">{signer.email}</Text>
                </View>
                <View className="bg-[#E6F7ED] rounded-lg px-4 py-2">
                  <Text className="text-[#00875A] text-xs font-medium">
                    {formatDate(signer.dateAdded)}
                  </Text>
                </View>
              </View>
            ))}
            {!isInteractionDisabled && (
              <TouchableOpacity 
                className="bg-[#00212C] rounded-lg p-6 flex-row items-center justify-center mt-4"
                onPress={handleAddRecipient}
              >
                <Ionicons name="add-circle-outline" size={24} color="white" />
                <Text className="text-white text-lg font-medium ml-2">Add Recipient</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Document Settings */}
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-medium text-[#00212C] mb-4">Document Settings</Text>
            <View className="flex-row items-center justify-between py-3">
              <View className="flex-row items-center flex-1">
                <Ionicons name="calendar-outline" size={24} color="#00212C" />
                <Text className="text-[#00212C] ml-3 flex-1">
                  {expirationDate 
                    ? `Expires on ${formatDate(expirationDate.toISOString())}` 
                    : 'No expiration date set'}
                </Text>
              </View>
              {!isInteractionDisabled && (
                <TouchableOpacity onPress={() => setShowExpirationPicker(true)}>
                  <Ionicons name="chevron-forward" size={20} color="#757575" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Activity Timeline */}
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-medium text-[#00212C] mb-4">Activity Timeline</Text>
            {timeline.map((item, index) => (
              <View key={index} className="mb-4 last:mb-0">
                <Text className="text-[#00212C] font-medium">{item.action}</Text>
                <Text className="text-[#757575] text-sm mt-1">{formatDate(item.date, true)}</Text>
                <Text className="text-[#757575] text-sm">{item.user}</Text>
              </View>
            ))}
          </View>

          {/* Message Box */}
          <View className="p-4">
            <Text className="text-lg font-medium text-[#00212C] mb-4">Message</Text>
            <View className="bg-gray-50 rounded-lg p-4">
              <TextInput
                multiline
                numberOfLines={4}
                value={message}
                onChangeText={setMessage}
                placeholder="Add a message for all recipients..."
                placeholderTextColor="#757575"
                className="text-[#00212C]"
                textAlignVertical="top"
                editable={!isInteractionDisabled}
              />
            </View>
          </View>
        </ScrollView>

        {/* Next Button - Only show when we have at least one signer and not in status/complete step */}
        {signers.length > 0 && currentStep < 3 && (
          <View className="p-4 border-t border-gray-200">
            <TouchableOpacity 
              className="bg-[#00212C] rounded-lg py-4 flex-row items-center justify-center space-x-2"
              onPress={() => {
                setCurrentStep(3);
                router.replace({
                  pathname: '/contract/sign',
                  params: { 
                    step: 3,
                    signers: JSON.stringify(signers)
                  }
                });
              }}
            >
              <Text className="text-white font-medium">Next</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-12 pb-4">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity 
            onPress={() => router.back()} 
            disabled={isInteractionDisabled}
            className={isInteractionDisabled ? "opacity-50 mr-3" : "mr-3"}
          >
            <Ionicons name="chevron-back" size={24} color="#00212C" />
          </TouchableOpacity>
          <View>
            <Text className="text-xl font-semibold text-[#00212C]">E-Signing</Text>
            <Text className="text-[#757575] mt-1">Master Service Agreement</Text>
          </View>
        </View>

        {/* Status Tag */}
        <View className={`self-start px-3 py-1 rounded-full ${
          currentStep >= 4 ? "bg-[#E6F7ED]" : "bg-[#FFF7E6]"
        }`}>
          <Text className={`font-medium ${
            currentStep >= 4 ? "text-[#00875A]" : "text-[#B25F00]"
          }`}>
            {currentStep >= 4 ? "Completed" : "In Progress"}
          </Text>
        </View>
      </View>

      {/* Steps */}
      <View className="px-4 py-6 border-b border-gray-200">
        <View className="flex-row justify-between relative">
          {/* Progress Lines */}
          <View className="absolute top-4 left-0 right-0 flex-row justify-between">
            {steps.slice(0, -1).map((_, index) => (
              <View key={index} className={`h-0.5 flex-1 ${index === 0 ? 'ml-4' : ''} ${index === steps.length - 2 ? 'mr-4' : ''} 
                ${index < currentStep - 1 ? 'bg-[#E6F7ED]' : 'bg-gray-100'}`} />
            ))}
          </View>
          
          {/* Step Circles */}
          {steps.map((step, index) => (
            <TouchableOpacity 
              key={index} 
              className="items-center z-10"
              onPress={() => {
                if (index === 3) { // Only allow clicking on step 4
                  setCurrentStep(4);
                  router.replace({
                    pathname: '/contract/sign',
                    params: { 
                      step: 4,
                      signers: JSON.stringify(signers)
                    }
                  });
                }
              }}
            >
              <View className={`w-8 h-8 rounded-full items-center justify-center mb-2 
                ${step.number === currentStep ? 'bg-[#00212C]' : 
                  step.number < currentStep ? 'bg-[#E6F7ED]' : 'bg-gray-100'}`}>
                <Text className={`font-medium 
                  ${step.number === currentStep ? 'text-white' : 
                    step.number < currentStep ? 'text-[#00875A]' : 'text-gray-400'}`}>
                  {step.number}
                </Text>
              </View>
              <Text className={`text-sm 
                ${step.number === currentStep ? 'text-[#00212C] font-medium' : 
                  step.number < currentStep ? 'text-[#00875A]' : 'text-gray-400'}`}>
                {step.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {renderContent()}

      {/* Expiration Date Picker Modal */}
      {showExpirationPicker && !isInteractionDisabled && (
        <DateTimePicker
          value={expirationDate || new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={handleExpirationChange}
        />
      )}
    </View>
  );
} 