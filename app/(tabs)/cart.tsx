import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useCartStore } from "../../store/cartStore";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
}

export default function CartScreen() {
  const { items, updateQuantity, getTotalPrice, loadCart, removeFromCart } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    loadCart();
  }, []);

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <TouchableOpacity 
      onPress={() => router.push({ pathname: '/productDetail', params: { product: JSON.stringify(item) } })}
      className="flex-row items-center p-4 bg-white mb-2 rounded-lg"
    >
      <Image source={{ uri: item.image }} className="w-20 h-20 rounded-lg" />
      <View className="flex-1 ml-4">
        <Text className="text-base font-bold">{item.name}</Text>
        <Text className="text-sm text-gray-600">${item.price}</Text>
      </View>
      <View className="flex-row items-center">
        <TouchableOpacity 
          className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Text className="text-lg font-bold">-</Text>
        </TouchableOpacity>
        <Text className="mx-4 text-lg">{item.quantity}</Text>
        <TouchableOpacity 
          className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Text className="text-lg font-bold">+</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="ml-4"
          onPress={() => removeFromCart(item.id)}
        >
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100">
      {items.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-500">Your cart is empty</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
        />
      )}
      {items.length > 0 && (
        <View className="p-4 bg-white border-t border-gray-200">
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-bold">
              Total: ${getTotalPrice().toFixed(2)}
            </Text>
            <TouchableOpacity className="bg-[#1e57ff] px-6 py-2 rounded-lg">
              <Text className="text-white font-bold">Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}