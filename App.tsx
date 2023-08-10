import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import Cart from './src/screens/Cart';
import Home from './src/screens/Home';
import Product from './src/screens/Product';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="cart"
        component={Cart}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="shoppingcart" color={color} size={size} />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="main" component={MainTabs} />
          <Stack.Screen name="product" component={Product} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
