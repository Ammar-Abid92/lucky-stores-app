import { View, Text, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../slices/basketSlice'
import { useNavigation } from '@react-navigation/native';
import { selectCategory } from '../slices/categorySlice';
import { themeColors } from '../theme';
import useGetUserFromAsync from '../hooks/useGetUserFromAsync';

export default function BasketIcon() {
  const basketItems = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const navigation = useNavigation();
  if (!basketItems.length) return null;
  const { customerData } = useGetUserFromAsync();

  return (
    <View className="absolute bottom-5 w-full z-50">
      <TouchableOpacity
        style={{ backgroundColor: themeColors.bgColor(1) }}
        onPress={() => customerData ? navigation.navigate('Cart') : navigation.navigate('Login')}
        className="flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg">
        <View className="p-2 px-4 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}>
          <Text className="font-extrabold text-white text-lg">{basketItems.length}</Text>
        </View>

        <Text className="flex-1 text-center font-extrabold text-white text-lg">View Cart</Text>
        <Text className="font-extrabold text-white text-lg">Rs. {basketTotal}</Text>

      </TouchableOpacity>

    </View>
  )
}