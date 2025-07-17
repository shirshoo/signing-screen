import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <View className="px-4 py-6">
      <View className="flex-row items-center justify-between relative">
        {steps.map((step, index) => (
          <View key={step} className="flex-1 items-center">
            <View className="flex-row items-center w-full">
              <View 
                className={`w-7 h-7 rounded-full items-center justify-center
                  ${index < currentStep ? 'bg-green-500' : 
                    index === currentStep ? 'bg-blue-500' : 'bg-gray-200'}`}
              >
                {index < currentStep ? (
                  <Ionicons name="checkmark" size={16} color="white" />
                ) : (
                  <Text className="text-white text-xs font-medium">{index + 1}</Text>
                )}
              </View>
              
              {index < steps.length - 1 && (
                <View className={`flex-1 h-[2px] mx-1
                  ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} 
                />
              )}
            </View>
            
            <Text className={`text-[10px] mt-2 font-medium
              ${index <= currentStep ? 'text-blue-500' : 'text-gray-400'}`}>
              {step}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
} 