import { View, Text, StatusBar, TouchableOpacity, Image, Linking, ActivityIndicator, Alert, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../slices/categorySlice';
import { themeColors } from '../theme';
import * as Icon from "react-native-feather";
import { emptyBasket, selectBasketItems, selectBasketTotal } from '../slices/basketSlice';
import OrangeCheckbox from '../components/customCheckBox';
import { PHONE_REGEX } from '../constants';
import { addDataToCollection } from '../config/methods';
import useGetCollectionData from '../hooks/useGetCollectionData';
import useGetUserFromAsync from '../hooks/useGetUserFromAsync';


function DeliveryScreen() {
  const navigation = useNavigation();
  const category = useSelector(selectCategory);
  const dispatch = useDispatch();
  const basketItems = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const { data, loading, error } = useGetCollectionData('orders')
  const { customerData } = useGetUserFromAsync()

  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [disable, setDisable] = useState(true)
  const [localLoading, setLocalLoading] = useState(false)


  useEffect(() => {
    checkValidity()
  }, [phone, address])


  const checkValidity = () => {
    if (PHONE_REGEX.test(phone) && address.length > 0) {
      setDisable(false)
    }
  }

  const confirmOrder = () => {

    console.log("CUSTOMER DATA------>", customerData)

    setLocalLoading(true)

    if (PHONE_REGEX.test(phone) && address.length > 0) {

      setDisable(false)
      let orderData = {

        delivery_address: address,
        delivery_phone: phone,
        order_total: Number(basketTotal),
        order_items: basketItems.length,
        order_status: "pending",
        ordered_by: "dPwJEwgY3DO6wypfuP45",
        products: basketItems,
        name: `Order # ${data?.length ? data?.length + 1 : 1}`,
        createdAt: new Date(),
        placed_by: customerData?.uid

      }
      addDataToCollection('orders', orderData).then(res => {
        if (res != 'error') {

          console.log("ORDER DATA", orderData)
          setLocalLoading(false)
          navigation.replace('OrderPlaced')
          dispatch(emptyBasket());
        } else {
          throw new Error("Order not placed! Kindly Connect with Support team")
        }
      }).catch(e => {
        setLocalLoading(false)
        Alert.alert("Order not placed! Kindly Connect with Support team")
      })
    } else {
      setLocalLoading(false)
      Alert.alert("Address or phone number is not correct")
    }

  }

  return (
    <View className="flex-1" >

      <View className="relative py-6 shadow-sm">
        <TouchableOpacity
          style={{ backgroundColor: themeColors.bgColor(1) }}
          onPress={navigation.goBack}
          className="absolute z-10 rounded-full p-1 shadow top-5 left-2">
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-xl">Confirm address</Text>
        </View>
      </View>

      {/* delivery time */}
      <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className="flex-row px-4 items-center">
        <Image source={require('../assets/images/bikeGuy.png')} className="w-20 h-20 rounded-full" />
        <Text className="flex-1 pl-4">Smooth and safe delivery with lucky stores</Text>
      </View>

      {data ? (

        <View className="mt-10 " >
          <Text className="text-2xl font-extrabold text-gray-700 ml-5" >Where to deliver the order ?</Text>

          <TextInput
            placeholder="Address"
            onChangeText={(text) => setAddress(text)}
            keyboardType="default"
            style={styles.textInput}
            className="ml-5 mr-5 mt-5"
          />

          <TextInput
            placeholder="03xxxxxxxx"
            onChangeText={(text) => setPhone(text)}
            keyboardType="numeric"
            maxLength={11}
            style={styles.textInput}
            className="ml-5 mr-5 mt-5"

          />

        </View>
      ) : loading ? (
        <View className="mt-10 flex-1 justify-center">
          <ActivityIndicator size="large" color="orange" />
        </View>
      ) : error.length ? (
        <View className="mt-10 flex-1 justify-center">
          <Text className="px-4 py-4 text-2xl font-bold text-center mt-20" >
            {"No item \n found inside this category"}
          </Text>
        </View>
      ) : null}

      <View className="flex-row justify-center items-center mt-5" >
        <OrangeCheckbox />
        <Text className="ml-2" >Cash on delivery</Text>
      </View>

      {!localLoading ? (

        <TouchableOpacity
          disabled={disable}
          style={disable ? { backgroundColor: themeColors.bgColor(0.4) } : { backgroundColor: themeColors.bgColor(1) }}
          onPress={confirmOrder}
          className="p-3 rounded-full mt-5 ml-5 mr-5">
          <Text className="text-white text-center font-bold text-lg">Confirm</Text>
        </TouchableOpacity>
      ) : (
        <View className="mt-5" >
          <ActivityIndicator size="large" color="orange" />
        </View>

      )}

      <View className="flex-row justify-between px-5 pt-10">
        <View>
          <Text className="text-lg text-gray-700 font-semibold">Estimated Delivery</Text>
          <Text className="text-3xl font-extrabold text-gray-700">3-4 Working Days</Text>
        </View>
        <Image className="h-24 w-24" source={require('../assets/images/bikeGuy2.gif')} />
      </View>

      <View
        style={{ backgroundColor: themeColors.bgColor(0.8) }}

        className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2">
        <View style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} className="p-1 rounded-full">
          <Image style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} className="w-16 h-16 rounded-full" source={require('../assets/lucky-store-logo-1.png')} />
        </View>

        <View>
          <Text className="text-lg font-bold text-white text-center">Delivery Support</Text>
        </View>
        <View className="flex-row items-center space-x-3 mr-3">
          <TouchableOpacity className="bg-white p-2 rounded-full" onPress={() => Linking.openURL('tel:+923110319633')} >
            <Icon.Phone fill={themeColors.bgColor(1)} stroke={themeColors.bgColor(1)} strokeWidth="1" />
          </TouchableOpacity>

        </View>

      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  textInput: {
    height: 60,
    borderColor: 'orange', // Border color
    borderWidth: 1,
    borderRadius: 8, // Border radius for rounded corners
    paddingHorizontal: 10, // Horizontal padding for text inside TextInput
    shadowColor: 'orange', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Elevation for Android shadow
    backgroundColor: 'white', // Background color
    marginBottom: 10, // Bottom margin for spacing
  },
});

export default DeliveryScreen;