import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from "react";
import { Modal, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  sortOptions: { label: string; value: string }[];
  selectedSort: string;
  setSelectedSort: (value: string) => void;
  brands: string[];
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  brandSearch: string;
  setBrandSearch: (value: string) => void;
  models: string[];
  selectedModels: string[];
  setSelectedModels: (models: string[]) => void;
  modelSearch: string;
  setModelSearch: (value: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  sortOptions,
  selectedSort,
  setSelectedSort,
  brands,
  selectedBrands,
  setSelectedBrands,
  brandSearch,
  setBrandSearch,
  models,
  selectedModels,
  setSelectedModels,
  modelSearch,
  setModelSearch,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
          <TouchableOpacity onPress={onClose} testID="close-button">
            <MaterialCommunityIcons name="close" size={32} color="#000" />
          </TouchableOpacity>
          <Text className="text-2xl font-light">Filter</Text>
          <View style={{ width: 32 }} />
        </View>
        <ScrollView className="flex-1 px-4">
          <Text className="text-gray-500 mt-4 mb-2">Sort By</Text>
          {sortOptions.map(option => (
            <TouchableOpacity
              key={option.value}
              className="flex-row items-center mb-2"
              onPress={() => setSelectedSort(option.value)}
            >
              <MaterialCommunityIcons
                name={selectedSort === option.value ? "radiobox-marked" : "radiobox-blank"}
                size={22}
                color="#2563eb"
              />
              <Text className="ml-2 text-base" style={{ color: '#222' }}>{option.label}</Text>
            </TouchableOpacity>
          ))}
          <View className="my-4 border-t border-gray-300" />
          <Text className="text-gray-500 mb-2">Brand</Text>
          <View className="flex-row items-center bg-gray-100 p-2 rounded mb-2">
            <MaterialCommunityIcons name="magnify" size={20} color="#888" />
            <TextInput
              className="flex-1 ml-2"
              placeholder="Search"
              value={brandSearch}
              onChangeText={setBrandSearch}
            />
          </View>
          {(brands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()))).map(brand => (
            <TouchableOpacity
              key={brand}
              className="flex-row items-center mb-2"
              onPress={() => setSelectedBrands(selectedBrands.includes(brand) ? selectedBrands.filter(b => b !== brand) : [...selectedBrands, brand])}
            >
              <MaterialCommunityIcons
                name={selectedBrands.includes(brand) ? "checkbox-marked-outline" : "checkbox-blank-outline"}
                size={22}
                color="#2563eb"
              />
              <Text className="ml-2 text-base" style={{ color: '#222' }}>{brand}</Text>
            </TouchableOpacity>
          ))}
          <View className="my-4 border-t border-gray-300" />
          <Text className="text-gray-500 mb-2">Model</Text>
          <View className="flex-row items-center bg-gray-100 p-2 rounded mb-2">
            <MaterialCommunityIcons name="magnify" size={20} color="#888" />
            <TextInput
              className="flex-1 ml-2"
              placeholder="Search"
              value={modelSearch}
              onChangeText={setModelSearch}
            />
          </View>
          {(models.filter(m => m.toLowerCase().includes(modelSearch.toLowerCase()))).map(model => (
            <TouchableOpacity
              key={model}
              className="flex-row items-center mb-2"
              onPress={() => setSelectedModels(selectedModels.includes(model) ? selectedModels.filter(m => m !== model) : [...selectedModels, model])}
            >
              <MaterialCommunityIcons
                name={selectedModels.includes(model) ? "checkbox-marked-outline" : "checkbox-blank-outline"}
                size={22}
                color="#2563eb"
              />
              <Text className="ml-2 text-base" style={{ color: '#222' }}>{model}</Text>
            </TouchableOpacity>
          ))}
          <View className="my-4" />
          <TouchableOpacity
            className="bg-blue-600 p-4 rounded-lg items-center mb-8"
            onPress={onClose}
          >
            <Text className="text-white text-lg font-bold">Primary</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default FilterModal; 