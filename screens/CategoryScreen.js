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

        // if (categoryInRedux && categoryInRedux.id != id) {
        //     dispatch(emptyBasket());
        // }
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
                        <Text className="text-gray-500 mt-2">{description}</Text>
                    </View>
                </View>

                {data.length ? (

                <View className="pb-36 bg-white">
                    <Text className="px-4 py-4 text-2xl font-bold">Items</Text>
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