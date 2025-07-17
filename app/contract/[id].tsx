import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ContractDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-12 pb-4">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="chevron-back" size={24} color="#00212C" />
          </TouchableOpacity>
          <View>
            <Text className="text-xl font-semibold text-[#00212C]">Master Service Agreement</Text>
            <Text className="text-[#757575]">Agrimitra Solutions</Text>
          </View>
        </View>
      </View>

      {/* Contract Content */}
      <ScrollView className="flex-1 px-4 pb-24">
        <View className="space-y-6">
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

            <View>
              <Text className="text-base text-[#00212C] leading-relaxed font-medium">2. SCOPE OF SERVICES</Text>
              <Text className="text-base text-[#00212C] leading-relaxed pl-4 mt-2">
                2.1 The Service Provider shall implement and maintain agricultural technology solutions across Client's 12 farming locations in California's Central Valley, including installation of IoT sensors, development of customized dashboards, and provision of 24/7 technical support.
              </Text>
            </View>

            <View>
              <Text className="text-base text-[#00212C] leading-relaxed font-medium">3. TERM AND TERMINATION</Text>
              <Text className="text-base text-[#00212C] leading-relaxed pl-4 mt-2">
                3.1 This Agreement shall commence on May 15, 2023 and continue for the Term unless terminated earlier in accordance with Section 3.2. The Agreement may be renewed for subsequent 12-month periods upon mutual written agreement of the parties.
              </Text>
            </View>

            <View>
              <Text className="text-base text-[#00212C] leading-relaxed font-medium">4. FEES AND PAYMENT</Text>
              <Text className="text-base text-[#00212C] leading-relaxed pl-4 mt-2">
                4.1 In consideration of the Services, the Client shall pay the Service Fee quarterly in advance, with the first payment due within 15 days of the Effective Date. All payments shall be made by wire transfer to the Service Provider's designated bank account.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating E-Sign Button */}
      <View className="absolute bottom-6 left-4 right-4">
        <TouchableOpacity 
          className="bg-[#00212C] rounded-lg py-4 flex-row items-center justify-center shadow-lg"
          onPress={() => router.push('/contract/sign')}
        >
          <Text className="text-white font-medium mr-2">Add Recipient</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
} 