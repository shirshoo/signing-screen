import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export const StepDot = ({ active, completed }: { active?: boolean; completed?: boolean }) => (
  <View className={`w-8 h-8 rounded-full flex items-center justify-center
    ${completed ? 'bg-[#00A37D]' : active ? 'bg-[#1A1A1A]' : 'bg-[#E5E5E5]'}`}>
    {completed ? (
      <Ionicons name="checkmark" size={16} color="white" />
    ) : (
      <Text className={`${active ? 'text-white' : 'text-[#757575]'}`}>
        {completed ? '✓' : '1'}
      </Text>
    )}
  </View>
);

export const StepConnector = ({ active }: { active?: boolean }) => (
  <View className={`h-[2px] flex-1 ${active ? 'bg-[#1A1A1A]' : 'bg-[#E5E5E5]'}`} />
);

interface StepperProps {
  currentStep: number;
}

const Stepper = ({ currentStep }: StepperProps) => (
  <View className="px-8 mt-6">
    <View className="flex-row items-center justify-between">
      <StepDot active completed={currentStep > 1} />
      <StepConnector active={currentStep > 1} />
      <StepDot active={currentStep >= 2} completed={currentStep > 2} />
      <StepConnector active={currentStep > 2} />
      <StepDot active={currentStep >= 3} completed={currentStep > 3} />
      <StepConnector active={currentStep > 3} />
      <StepDot active={currentStep >= 4} />
    </View>
    <View className="flex-row justify-between mt-2">
      <Text className="text-xs text-[#757575] -ml-2">Review</Text>
      <Text className="text-xs text-[#757575] -ml-2">Sign</Text>
      <Text className="text-xs text-[#757575] -ml-1">Status</Text>
      <Text className="text-xs text-[#757575] -ml-2">Complete</Text>
    </View>
  </View>
);

export default Stepper; 