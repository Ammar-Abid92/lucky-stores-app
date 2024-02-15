import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity';
import ItemRow from '../components/itemRow';
import BasketIcon from '../components/basketIcon';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, setCategory } from '../slices/categorySlice';
import { emptyBasket, selectBasketItems } from '../slices/basketSlice';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import useGetCollectionData from '../hooks/useGetCollectionData';
import useGetCollectionDataById from '../hooks/useGetCollectionDataById';
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated';
import { DefaultTheme } from '@react-navigation/native';


export default function CategoryScreen() {

    const navigation = useNavigation();
    const categoryInRedux = useSelector(selectCategory);
    const navTheme = DefaultTheme;
    const basketItems = useSelector(selectBasketItems);


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

    const { data, error, loading } = useGetCollectionDataById('items', 'category_name', title.toLowerCase())

    useEffect(() => {

        dispatch(setCategory({
            id,
            title,
            imgUrl,
            items: data,
            description
        }))
    }, [data])

    const renderItem = ({ item, index }) => {
        const delay = 200 + index * 100;

        return (
            <ItemRow
                entering={FadeInLeft.duration(300).delay(delay)}
                id={item?.id}
                name={item?.name}
                description={item?.description}
                price={item?.discounted_price > 0 ? item?.discounted_price : item?.selling_price}
                image={item?.images[0]}
                itemData={item}
            />
        );
    };

    return (
        <View style={{ flex: 1 }} >

            <View className="relative">
                {imgUrl.length &&
                    <Animated.Image className="w-full h-72"
                        sharedTransitionTag={`image-${id}`}
                        source={{ uri: imgUrl }} />}
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow">
                    <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
                </TouchableOpacity>
            </View>

            <View
                style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: navTheme.colors.background ? navTheme.colors.background : 'aliceblue', marginTop: "-12%", paddingTop: "6%" }} >
                <View className="px-5">
                    <Text className="text-3xl font-bold">{title}</Text>
                    <Animated.Text entering={FadeInLeft.duration(400).delay(300)} className="text-gray-500 mt-2">{description}</Animated.Text>
                </View>
            </View>

            {data.length ? (

                <Animated.View style={{ flex: basketItems.length ? 0.8 : 1 }} >
                    <Animated.Text entering={FadeInLeft.duration(300).delay(200)} className="px-4 py-4 text-2xl font-bold">Items</Animated.Text>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item?.id.toString()}
                        renderItem={renderItem}
                    />

                </Animated.View>
            ) : loading ? (
                <View style={{ height: "45%", justifyContent: 'center', backgroundColor: (navTheme.colors.background || 'aliceblue') }} >
                    <ActivityIndicator size="large" color="orange" />
                </View>
            ) : error.length ? (
                <View style={{ height: "45%", justifyContent: 'center', backgroundColor: (navTheme.colors.background || 'aliceblue') }}>
                    <Text className="px-4 py-4 text-2xl font-bold text-center mt-20" >
                        {"No item \n found inside this category"}
                    </Text>
                </View>
            ) : null}


            {basketItems.length ? (
                <BasketIcon />
            ) : null
            }

        </View>

    )
}