import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useCartStore } from "../../store/cartStore";

export default function TabsLayout(){
  const cartItems = useCartStore((state) => state.items);
  const loadCart = useCartStore((state) => state.loadCart);

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1e57ff',
          },
          headerTintColor: '#fff',
          tabBarShowLabel: false,
          tabBarStyle: {
            paddingBottom: 10,
            height: 60,
            backgroundColor: '#ffffff',
          },
        }}
      >
        <Tabs.Screen name="index" options={{
          title: "E-Market",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }} /> 
        <Tabs.Screen name="favorites" options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }} />
        <Tabs.Screen name="cart" options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
          tabBarBadge: cartItems.length > 0 ? cartItems.length : undefined,
        }} />
        <Tabs.Screen name="account" options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }} />
      </Tabs>
    </>
  )
}