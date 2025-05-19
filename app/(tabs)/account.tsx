import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function AccountScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <View className="w-full max-w-sm space-y-6">
        <View className="space-y-2">
          <Text className="text-2xl font-bold text-center text-gray-900">
            Sign In to Your Account
          </Text>
          <Text className="text-center text-gray-600">
            Sign in to track your purchases and get a personalized experience
          </Text>
        </View>

        <View className="space-y-4">
          <Link href="/" asChild>
            <TouchableOpacity className="w-full bg-blue-600 py-3 rounded-lg">
              <Text className="text-white text-center font-semibold text-lg">
                Sign In
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/" asChild>
            <TouchableOpacity className="w-full bg-white border border-gray-300 py-3 rounded-lg">
              <Text className="text-gray-900 text-center font-semibold text-lg">
                Sign Up
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <Text className="text-center text-gray-500 text-sm">
          By signing in, you agree to our Terms of Use and Privacy Policy
        </Text>
      </View>
    </View>
  );
}