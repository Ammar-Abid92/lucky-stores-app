import { View, Text, StatusBar, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { emptyBasket, removeFromBasket, selectBasketItems, selectBasketTotal } from '../slices/basketSlice';
import { check, selectCategory } from '../slices/categorySlice';
import { useNavigation } from '@react-navigation/native';
import { urlFor } from '../sanity';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import { useEffect } from 'react';

export default function BasketScreen() {
    const category = useSelector(selectCategory);
    const [groupedItems, setGroupedItems] = useState([])
    const basketItems = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const deliveryFee = 0;

    useMemo(() => {



        const gItems = basketItems.reduce((group, item) => {
            if (group[item.id]) {
                group[item.id].push(item);
            } else {
                group[item.id] = [item];
            }
            return group;
        }, {})
        setGroupedItems(gItems);

    }, [basketItems])

    return (
        <View className=" bg-[#f2f2f2] flex-1">
            {/* top button */}
            <View className="relative py-4 shadow-sm">
                <TouchableOpacity
                    style={{ backgroundColor: themeColors.bgColor(1) }}
                    onPress={navigation.goBack}
                    className="absolute z-10 rounded-full p-1 shadow top-5 left-2">
                    <Icon.ArrowLeft strokeWidth={3} stroke="white" />
                </TouchableOpacity>
                <View>
                    <Text className="text-center font-bold text-xl">Your cart</Text>
                    <Text className="text-center text-gray-500">{category?.title}</Text>
                </View>

            </View>

            {/* items */}

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="pt-5"
                contentContainerStyle={{
                    paddingBottom: 50
                }}

            >
                {
                    Object.entries(groupedItems).map(([key, items]) => {
                        return (
                            <View key={key}
                                className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md">
                                <Text style={{ color: themeColors.text }} className="font-bold">{items.length} x </Text>
                                <Image className="h-14 w-14 rounded-full" source={{ uri: items[0].image }} />
                                <Text className="flex-1 font-bold text-gray-700">{items[0]?.name}</Text>
                                <Text className="font-semibold text-base">Rs. {items[0]?.price}</Text>
                                <TouchableOpacity
                                    className="p-1 rounded-full"
                                    style={{ backgroundColor: themeColors.bgColor(1) }}
                                    onPress={() => {
                                        if (basketItems.length > 1){
                                            dispatch(removeFromBasket({ id: items[0]?.id }))
                                        } else {
                                            dispatch(emptyBasket())
                                            navigation.goBack()
                                        }

                                    }}>
                                    <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }

            </ScrollView>
            {/* totals */}

            {Object.entries(groupedItems).length ? (

                <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className=" p-6 px-8 rounded-t-3xl space-y-4">
                    <View className="flex-row justify-between">
                        <Text className="text-gray-700">Subtotal</Text>
                        <Text className="text-gray-700">Rs. {basketTotal}</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-gray-700">Delivery Fee</Text>
                        <Text className="text-gray-700">Rs. {deliveryFee}</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="font-extrabold">Order Total</Text>
                        <Text className="font-extrabold">Rs. {basketTotal + deliveryFee}</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{ backgroundColor: themeColors.bgColor(1) }}
                            onPress={() => navigation.navigate('Delivery')}
                            className="p-3 rounded-full">
                            <Text className="text-white text-center font-bold text-lg">Place Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : null}
        </View>
    )
}
