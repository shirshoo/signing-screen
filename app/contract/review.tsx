import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ContractReviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const signers = params.signers ? JSON.parse(params.signers as string) : [];

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-12 pb-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="chevron-back" size={24} color="#00212C" />
          </TouchableOpacity>
          <View>
            <Text className="text-xl font-semibold text-[#00212C]">Review Agreement</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="space-y-6 py-6">
          <Text className="text-base text-[#00212C] leading-relaxed font-medium">
            THIS MASTER SERVICE AGREEMENT (this "Agreement") is made and entered into as of May 15, 2023 (the "Effective Date") by and between:
          </Text>

          <View className="space-y-4 pl-4">
            <Text className="text-base text-[#00212C] leading-relaxed">
              Agrimitra Solutions, a company incorporated under the laws of Delaware, United States, having its registered office at 2001 Market Street, Suite 1500, Philadelphia, PA 19103 (hereinafter referred to as "Service Provider"); and
            </Text>
            <Text className="text-base text-[#00212C] leading-relaxed">
              TechCorp Innovations Inc., a company incorporated under the laws of California, United States, having its registered office at 525 University Avenue, Palo Alto, CA 94301 (hereinafter referred to as "Client").
            </Text>
          </View>

          <View className="space-y-3">
            <Text className="text-base text-[#00212C] leading-relaxed font-medium">WHEREAS:</Text>
            <View className="space-y-2 pl-4">
              <Text className="text-base text-[#00212C] leading-relaxed">
                A. The Service Provider is in the business of providing cutting-edge agricultural technology solutions and data analytics services for farm management;
              </Text>
              <Text className="text-base text-[#00212C] leading-relaxed">
                B. The Client wishes to engage the Service Provider to implement their smart farming solutions across multiple agricultural sites;
              </Text>
              <Text className="text-base text-[#00212C] leading-relaxed">
                C. The Service Provider has agreed to provide comprehensive agricultural technology services to the Client on the terms and conditions set out in this Agreement.
              </Text>
            </View>
          </View>

          <Text className="text-base text-[#00212C] leading-relaxed font-medium">
            NOW THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:
          </Text>

          <View className="space-y-4">
            <View>
              <Text className="text-base text-[#00212C] leading-relaxed font-medium">1. DEFINITIONS AND INTERPRETATION</Text>
              <Text className="text-base text-[#00212C] leading-relaxed pl-4 mt-2">
                1.1 In this Agreement, unless the context otherwise requires:
                "Services" means the agricultural technology services including but not limited to soil monitoring systems, automated irrigation controls, crop analysis tools, and related consulting services as detailed in Schedule A;
                "Service Fee" means the sum of $75,000 per quarter, payable in accordance with Section 4;
                "Term" means an initial period of 36 months from the Effective Date.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Add Signature Button */}
      <View className="absolute bottom-24 right-4">
        <TouchableOpacity 
          className="bg-[#00212C] rounded-lg py-3 px-6"
          onPress={() => router.push({
            pathname: '/contract/new-recipient',
            params: { signers: JSON.stringify(signers) }
          })}
        >
          <Text className="text-white font-medium">Add Signature</Text>
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <View className="p-4 border-t border-gray-200">
        <TouchableOpacity 
          className="bg-[#00212C] rounded-lg py-4 flex-row items-center justify-center space-x-2"
          onPress={() => router.push({
            pathname: '/contract/sign',
            params: { 
              step: 2,
              signers: JSON.stringify(signers)
            }
          })}
        >
          <Text className="text-white font-medium">Next</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
} 