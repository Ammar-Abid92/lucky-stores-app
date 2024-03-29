import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import CartScreen from './screens/CartScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="Login"  options={{ presentation: 'fullScreenModal', headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="Cart" options={{ presentation: 'modal', headerShown: false }} component={CartScreen} />
        <Stack.Screen name="Delivery" options={{ presentation: 'fullScreenModal', headerShown: false }} component={DeliveryScreen} />
        <Stack.Screen name="OrderPlaced" options={{ presentation: 'fullScreenModal', headerShown: false }} component={PreparingOrderScreen} />
        <Stack.Screen name="OrderHistory"  options={{ presentation: 'fullScreenModal', headerShown: false }} component={OrderHistoryScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
