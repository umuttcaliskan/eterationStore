import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from "react";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';
import FilterModal from "../../components/FilterModal";
import { useCartStore } from "../../store/cartStore";
import { useFavoriteStore } from "../../store/favoriteStore";
import { useProductStore } from "../../store/productStore";

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  brand: string;
  model: string;
}

const sortOptions = [
  { label: "Old to new", value: "oldToNew" },
  { label: "New to old", value: "newToOld" },
  { label: "Price hight to low", value: "priceHighToLow" },
  { label: "Price low to High", value: "priceLowToHigh" },
];

export default function HomeScreen() {
  const { products, loading, hasMore, fetchProducts } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const { addToFavorites, removeFromFavorites, isFavorite, loadFavorites } = useFavoriteStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>('oldToNew');
  const [brandSearch, setBrandSearch] = useState('');
  const [modelSearch, setModelSearch] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
    loadFavorites();
  }, []);

  let filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      selectedBrands.some(brand => product.name.toLowerCase().includes(brand.toLowerCase()))
    );
  }
  if (selectedModels.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      selectedModels.some(model => product.name.toLowerCase().includes(model.toLowerCase()))
    );
  }
  if (selectedSort === 'oldToNew') {
    filteredProducts = filteredProducts.slice().sort((a, b) => a.id.localeCompare(b.id));
  } else if (selectedSort === 'newToOld') {
    filteredProducts = filteredProducts.slice().sort((a, b) => b.id.localeCompare(a.id));
  } else if (selectedSort === 'priceHighToLow') {
    filteredProducts = filteredProducts.slice().sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (selectedSort === 'priceLowToHigh') {
    filteredProducts = filteredProducts.slice().sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  }

  const handleAddToCart = (item: Product) => {
    addToCart(item);
    Toast.show({
      type: 'success',
      text1: 'Added to Cart',
      text2: `${item.name} has been added to your shopping cart`,
      position: 'top',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 50,
      props: {
        style: {
          backgroundColor: '#4CAF50',
          borderRadius: 8,
          padding: 16,
          marginHorizontal: 16,
          marginTop: 16,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        text1Style: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#FFFFFF',
          marginBottom: 4,
        },
        text2Style: {
          fontSize: 14,
          color: '#FFFFFF',
        },
      },
    });
  };

  const handleFavorite = (item: Product) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
      Toast.show({
        type: 'info',
        text1: 'Removed from Favorites',
        text2: `${item.name} has been removed from your favorites`,
        position: 'top',
        visibilityTime: 2000,
      });
    } else {
      addToFavorites(item);
      Toast.show({
        type: 'success',
        text1: 'Added to Favorites',
        text2: `${item.name} has been added to your favorites`,
        position: 'top',
        visibilityTime: 2000,
      });
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => router.push({ pathname: '/productDetail', params: { product: JSON.stringify(item) } })} className="flex-1 m-2 p-2.5 bg-white rounded-lg shadow-md">
      <View className="flex-1">
        <View className="relative">
          <Image source={{ uri: item.image }} className="w-full h-36 rounded-lg mb-2" />
          <TouchableOpacity 
            className="absolute top-2 right-2 bg-white rounded-full p-1"
            onPress={() => handleFavorite(item)}
          >
            <MaterialCommunityIcons 
              name={isFavorite(item.id) ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite(item.id) ? "#FF0000" : "#000000"} 
            />
          </TouchableOpacity>
        </View>
        <Text className="text-base font-bold mb-1">{item.name}</Text>
        <Text className="text-sm text-gray-600 mb-2">${item.price}</Text>
      </View>
      <TouchableOpacity 
        className="bg-[#1e57ff] p-2 rounded items-center mt-auto"
        onPress={() => handleAddToCart(item)}
      >
        <Text className="text-white font-bold">Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const brandList = Array.from(new Set(products.map(p => p.brand))).filter(Boolean);
  const modelList = selectedBrands.length > 0
    ? Array.from(new Set(products.filter(p => selectedBrands.includes(p.brand)).map(p => p.model))).filter(Boolean)
    : Array.from(new Set(products.map(p => p.model))).filter(Boolean);

  return (
    <View className="flex-1 p-2.5 bg-gray-100">
      <View className="mb-4">
        <View className="flex-row items-center bg-white p-3 rounded-lg shadow-sm">
          <MaterialCommunityIcons name="magnify" size={24} color="#666" />
          <TextInput
            className="flex-1 ml-2 text-black"
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
            <MaterialCommunityIcons name="filter-variant" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        sortOptions={sortOptions}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        brands={brandList}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        brandSearch={brandSearch}
        setBrandSearch={setBrandSearch}
        models={modelList}
        selectedModels={selectedModels}
        setSelectedModels={setSelectedModels}
        modelSearch={modelSearch}
        setModelSearch={setModelSearch}
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        onEndReached={fetchProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => (
          <View className="items-center p-2.5">
            {loading ? (
              <Text className="text-gray-600">Loading...</Text>
            ) : !hasMore ? (
              <View className="items-center">
                <Text className="text-gray-600 mb-2">All products loaded</Text>

                <TouchableOpacity 
                  className="bg-[#1e57ff] px-4 py-2 rounded-lg"
                  onPress={() => {
                    // Scroll to top
                    if (flatListRef.current) {
                      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
                    }
                  }}
                >
                  <Text className="text-white font-bold">Back to Top</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}
        ref={flatListRef}
      />
    </View>
  );
}

