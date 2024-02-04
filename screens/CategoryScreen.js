import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity';
import ItemRow from '../components/itemRow';
import BasketIcon from '../components/basketIcon';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, setCategory } from '../slices/categorySlice';
import { emptyBasket } from '../slices/basketSlice';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import useGetCollectionData from '../hooks/useGetCollectionData';
import useGetCollectionDataById from '../hooks/useGetCollectionDataById';

export default function CategoryScreen() {
    const navigation = useNavigation();
    const categoryInRedux = useSelector(selectCategory);

    console.log("INITIALLY---->", categoryInRedux)
    let dispatch = useDispatch();

    const { params: {
        id,
        title,
        imgUrl,
        description,
    } } = useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [])

    const { data } = useGetCollectionDataById('items', 'category_id', id)
    useEffect(() => {

        if (categoryInRedux && categoryInRedux.id != id) {
            dispatch(emptyBasket());
        }
        dispatch(setCategory({
            id,
            title,
            imgUrl,
            items: data,
            description
        }))
    }, [data])

    return (
        <>
            <BasketIcon />
            <ScrollView  >
                <View className="relative">
                   {imgUrl.length && <Image className="w-full h-72" source={{ uri: imgUrl }} /> } 
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow">
                        <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
                    </TouchableOpacity>
                </View>
                <View
                    style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
                    className="bg-white -mt-12 pt-6">
                    <View className="px-5">
                        <Text className="text-3xl font-bold">{title}</Text>
                        {/* copy this code from restaurant card */}
                        <View className="flex-row space-x-2 my-1">
                            <View className="flex-row items-center space-x-1">
                                <Image
                                    source={require('../assets/images/fullStar.png')}
                                    className="h-4 w-4" />
                                {/* <Text className="text-xs">
                                    <Text className="text-green-700">{rating}</Text>
                                    <Text className="text-gray-700"> (4.6k review)</Text> · <Text className="font-semibold text-gray-700">{type}</Text>
                                </Text> */}
                            </View>
                            {/* <View className="flex-row items-center space-x-1">
                                <Icon.MapPin color="gray" width={15} height={15} />
                                <Text className="text-gray-800 text-xs"> Nearby · {address}</Text>
                            </View> */}
                        </View>
                        <Text className="text-gray-500 mt-2">{description}</Text>


                    </View>

                </View>
                {data.length ? (

                <View className="pb-36 bg-white">
                    <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
                    {/* items here  */}
                    {
                        data.map(item => {
                            return (
                                <ItemRow
                                    key={item?.id}
                                    id={item?.id}
                                    name={item?.name}
                                    description={item?.description}
                                    price={ item?.discounted_price > 0 ? item?.discounted_price :  item?.selling_price}
                                    image={item?.image[0]}
                                    itemData={item}
                                />
                            )
                        })
                    }
                </View>
                ) : (
                    <View className="pb-36 bg-white" >
                        <Text className="px-4 py-4 text-2xl font-bold text-center mt-20" >
                            No item found inside this category
                        </Text>
                    </View>
                )}

            </ScrollView>
        </>

    )
}