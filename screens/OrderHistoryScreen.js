import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import useGetCollectionData from '../hooks/useGetCollectionData';
import OrderList from '../components/orderList'
import { FadeInLeft } from 'react-native-reanimated';


const OrderHistoryScreen = () => {
  const navigation = useNavigation();

  const { data: orderData, loading, error } = useGetCollectionData('orders')

  const renderItem = ({ item, index }) => {

    const delay = 200 + index * 100;

    return (

      <OrderList
        entering={FadeInLeft.duration(200).delay(delay)}
        key={item?.id}
        id={item?.id}
        name={item?.name}
        orderTotal={item?.order_total}
        orderStatus={item?.order_status}
        itemCount={item?.order_items}
        createdAt={item?.createdAt}
        orderData={item}
      />
    )

  }



  return (
    <View style={{ flex: 1 }} >
      <View className="relative py-6 shadow-sm">
        <TouchableOpacity
          style={{ backgroundColor: themeColors.bgColor(1) }}
          onPress={navigation.goBack}
          className="absolute z-10 rounded-full p-1 shadow top-5 left-2">
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-xl">Order History</Text>
        </View>
      </View>
      {
        loading ? (
          <View style={{ flex:1, justifyContent: 'center', }} >
            <ActivityIndicator size="large" color="orange" />
          </View>
        ) : orderData.length ? (
          <View>
            <FlatList
              data={orderData}
              keyExtractor={(order) => order.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 0 }}
            />
          </View>
        ) : error.length ? (
          <View style={{ height: "45%", justifyContent: 'center', backgroundColor: 'white' }}>
            <Text className="px-4 py-4 text-2xl font-bold text-center mt-20" >
              {"No item \n found inside this category"}
            </Text>
          </View>
        ) : null
      }
    </View>
  )
}

export default OrderHistoryScreen

const styles = StyleSheet.create({})