import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import { emptyBasket } from '../slices/basketSlice';
import { useDispatch } from 'react-redux';


export default function PreparingOrderScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const clickOk = () => {
    dispatch(emptyBasket());
    navigation.navigate('Home');
  }

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Image source={require('../assets/images/delivery.gif')} className="h-80 w-80" />
      <Text className="font-bold text-md text-center mt-10 ml-5 mr-5" >Order has been placed. You will be informed about delivery from our support team. Thank you</Text>
      <TouchableOpacity
        style={{ backgroundColor: themeColors.bgColor(1) }}
        onPress={clickOk}
        className="p-3 rounded-full pl-20 pr-20 mt-20">
        <Text className="text-white text-center font-bold text-lg">Okay</Text>
      </TouchableOpacity>
    </View>
  )
}