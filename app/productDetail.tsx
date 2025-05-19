import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useCartStore } from '../store/cartStore';
import { useFavoriteStore } from '../store/favoriteStore';

export default function ProductDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const product = useMemo(() => params.product ? JSON.parse(params.product as string) : null, [params]);
  
  const items = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoriteStore();

  const handleAddToCart = () => {
    addToCart(product);
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Product added to cart',
    });
  };

  const handleIncreaseQuantity = () => {
    addToCart(product);
  };

  const handleDecreaseQuantity = () => {
    const currentQuantity = items.find(item => item.id === product.id)?.quantity || 0;
    if (currentQuantity > 1) {
      updateQuantity(product.id, currentQuantity - 1);
    } else if (currentQuantity === 1) {
      removeFromCart(product.id);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Product removed from cart',
      });
    }
  };

  const handleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Product removed from favorites',
      });
    } else {
      addToFavorites(product);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Product added to favorites',
      });
    }
  };

  if (!product) return <View className="flex-1 justify-center items-center"><Text>Product not found.</Text></View>;

  const quantity = items.find(item => item.id === product.id)?.quantity || 0;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#2563eb', padding: 16 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginLeft: 16, flex: 1 }} numberOfLines={1}>{product.name}</Text>
        </View>

        <ScrollView style={{ flex: 1 }}>
          <View className="m-4">
            <View className="relative">
              <Image source={{ uri: product.image }} className="w-full h-56 rounded-lg bg-gray-200" />
              <TouchableOpacity 
                onPress={handleFavorite} 
                className="absolute top-2 right-2 bg-white rounded-full p-1"
              >
                <MaterialCommunityIcons 
                  name={isFavorite(product.id) ? 'heart' : 'heart-outline'} 
                  size={24} 
                  color={isFavorite(product.id) ? "#FF0000" : "#000000"} 
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="px-4">
            <Text className="text-2xl font-bold mb-2">{product.name}</Text>
            <Text className="text-base text-gray-700 mb-4">{product.description}</Text>
          </View>
        </ScrollView>
        
        <View className="flex-row items-center justify-between px-4 py-4 border-t border-gray-200 bg-white">
          <View>
            <Text className="text-lg text-blue-600 font-semibold">Price:</Text>
            <Text className="text-2xl font-black">{product.price} $</Text>
          </View>
          {quantity > 0 ? (
            <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-2">
              <TouchableOpacity onPress={handleDecreaseQuantity} className="px-2">
                <MaterialCommunityIcons name="minus" size={24} color="#2563eb" />
              </TouchableOpacity>
              <Text className="text-lg font-bold mx-4">{quantity}</Text>
              <TouchableOpacity onPress={handleIncreaseQuantity} className="px-2">
                <MaterialCommunityIcons name="plus" size={24} color="#2563eb" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={handleAddToCart} className="bg-blue-600 px-8 py-3 rounded-lg">
              <Text className="text-white text-lg font-bold">Add to Cart</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </>
  );
} 