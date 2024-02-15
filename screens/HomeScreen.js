import { View, Text, StatusBar, Image, TextInput, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Categories from '../components/categories'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme'
import useGetCollectionData from '../hooks/useGetCollectionData'
import CategoryCard from '../components/categoryCard'
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated';

export default function HomeScreen() {

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [])
    const navigation = useNavigation();
    const { data, loading, error } = useGetCollectionData('categories')
    const [searchData, setSearchData] = useState([])

    const handleSearch = (val) => {
        if (data.length) {
            let res = data.filter(x => x.name.includes(val))
            setSearchData(res)
        }
    }

    return (
        <View style={{ flex: 1 }} >
            <StatusBar
                setNetworkActivityIndicatorVisible
            />

            {/* search bar */}
            <View className="flex-row items-center space-x-2 px-4 pb-2 mt-2 ">
                <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300 " >
                    <Icon.Search height="25" width="25" stroke="gray" />
                    <TextInput placeholder='Search categories' className="ml-2 flex-1" keyboardType='default' onChangeText={handleSearch} />
                    <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
                        <Icon.MapPin height="20" width="20" stroke="gray" />
                        <Text className="text-gray-600">Karachi, Pak</Text>
                    </View>
                </View>
                <View className=" rounded-full">
                    <Image style={{ width: 50, height: 50 }} source={require('../assets/lucky-store-logo-1.png')} />
                </View>
            </View>

            <View className="flex-row justify-between items-center px-4 mt-5">
                <Animated.Text entering={FadeInLeft.duration(300).delay(200)} className="font-bold text-lg">
                    Hot Selling categories
                </Animated.Text>
            </View>

            {loading ? (
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <ActivityIndicator size="large" color="orange" />
                </View>
            ) : (
                <Categories />
            )}

            <View className="flex-row justify-between items-center px-4 mt-5">
                <Animated.Text entering={FadeInLeft.duration(300).delay(100)} className="font-bold text-lg">
                    All categories
                </Animated.Text>
            </View>

            {loading ? (
                <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="orange" />
                </View>
            ) : data.length ? (
                <>
                    <View style={{ flex: 1.5 }} >

                        <FlatList
                            data={searchData.length ? searchData : data}
                            keyExtractor={(item) => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            numColumns={2}
                            contentContainerStyle={{
                                justifyContent: 'center',
                                paddingHorizontal: 10, // Adjust horizontal padding
                                paddingTop: 5, // Add padding to match the py-5 style
                            }}
                            renderItem={({ item, index }) => (

                                <CategoryCard
                                    entering={FadeInLeft.duration(300).delay(200 + index * 200)}
                                    id={item.id}
                                    imgUrl={item?.image}
                                    title={item?.name}
                                    rating={item?.rating}
                                    type={item?.type?.name}
                                    address="123 main street"
                                    description={item?.description}
                                    dishes={item?.dishes}
                                />
                            )}
                        />
                    </View>
                </>

            ) : error.length ? (
                <View style={{ height: "45%", justifyContent: 'center', backgroundColor: 'white' }}>
                    <Text className="px-4 py-4 text-2xl font-bold text-center mt-20" >
                        {"No category \n \n found"}
                    </Text>
                </View>
            ) : null}


            <View style={{ flex: 0.15, marginBottom: 10, marginTop: 10 }} >

                <TouchableOpacity
                    style={{ backgroundColor: themeColors.bgColor(1) }}
                    onPress={() => navigation.navigate('OrderHistory')}
                    className="flex-1 p-3 rounded-full ml-5 mr-5">
                    <Text className="text-white text-center font-bold text-lg">Your Orders</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}
