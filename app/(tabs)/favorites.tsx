import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';
import { useFavoriteStore } from "../../store/favoriteStore";

export default function FavoriteScreen() {
  const { favorites, removeFromFavorites, loadFavorites } = useFavoriteStore();
  const router = useRouter();

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemoveFavorite = (item: any) => {
    removeFromFavorites(item.id);
    Toast.show({
      type: 'info',
      text1: 'Removed from Favorites',
      text2: `${item.name} has been removed from your favorites`,
      position: 'top',
      visibilityTime: 2000,
    });
  };

  const renderFavorite = ({ item }: { item: any }) => (
    <TouchableOpacity 
      onPress={() => router.push({ pathname: '/productDetail', params: { product: JSON.stringify(item) } })}
      className="flex-1 m-2 p-2.5 bg-white rounded-lg shadow-md"
    >
      <View className="relative">
        <Image source={{ uri: item.image }} className="w-full h-36 rounded-lg mb-2" />
        <TouchableOpacity 
          className="absolute top-2 right-2 bg-white rounded-full p-1"
          onPress={() => handleRemoveFavorite(item)}
        >
          <MaterialCommunityIcons name="heart" size={24} color="#FF0000" />
        </TouchableOpacity>
      </View>
      <Text className="text-base font-bold mb-1">{item.name}</Text>
      <Text className="text-sm text-gray-600 mb-2">${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-2.5 bg-gray-100">
      {favorites.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-500">No favorite products yet.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavorite}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      )}
    </View>
  );
}