import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Navbar } from '../../components/ui/Navbar';
import { Stepper } from '../../components/ui/Stepper';

const steps = ['Details', 'Review', 'Sign', 'Complete'];

export default function ContractEditScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    partyOne: '',
    partyTwo: '',
    effectiveDate: '',
  });

  const handleSave = async () => {
    setLoading(true);
    // Simulate saving process
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    router.push({
      pathname: '/contract/[id]',
      params: { id: 'new' }
    });
  };

  const InputField = ({ label, value, onChange, placeholder }: { 
    label: string; 
    value: string; 
    onChange: (text: string) => void;
    placeholder?: string;
  }) => (
    <View className="mb-6">
      <Text className="text-sm font-medium text-gray-700 mb-2">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        placeholderTextColor="#9CA3AF"
        className="bg-gray-50 text-gray-900 text-base rounded-xl px-4 py-3.5"
      />
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <Navbar title="New Contract" />
      
      <View className="bg-white">
        <Stepper steps={steps} currentStep={0} />
      </View>
      
      <ScrollView 
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
          <Text className="text-xl font-semibold text-gray-900 mb-6">
            Contract Details
          </Text>
          
          <InputField
            label="Contract Title"
            value={form.title}
            onChange={(text) => setForm(prev => ({ ...prev, title: text }))}
            placeholder="e.g. Software License Agreement"
          />
          
          <InputField
            label="First Party"
            value={form.partyOne}
            onChange={(text) => setForm(prev => ({ ...prev, partyOne: text }))}
            placeholder="Enter company or individual name"
          />
          
          <InputField
            label="Second Party"
            value={form.partyTwo}
            onChange={(text) => setForm(prev => ({ ...prev, partyTwo: text }))}
            placeholder="Enter company or individual name"
          />
          
          <InputField
            label="Effective Date"
            value={form.effectiveDate}
            onChange={(text) => setForm(prev => ({ ...prev, effectiveDate: text }))}
            placeholder="YYYY-MM-DD"
          />
        </View>
      </ScrollView>

      <View className="px-4 py-4 bg-white border-t border-gray-100 flex-row gap-3">
        <View className="flex-1">
          <Button
            variant="outline"
            onPress={() => router.back()}
          >
            Cancel
          </Button>
        </View>
        <View className="flex-1">
          <Button
            onPress={handleSave}
            loading={loading}
            disabled={!form.title || !form.partyOne || !form.partyTwo || !form.effectiveDate}
          >
            Continue
          </Button>
        </View>
      </View>
    </View>
  );
} 