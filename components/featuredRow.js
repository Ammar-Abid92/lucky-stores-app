import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import CategoryCard from './categoryCard'
import { getFeaturedResturantById } from '../api'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme'

export default function FeatureRow({ categories }) {

  return (
    <View>
      <View className="flex-row justify-between items-center px-4">
        <View>
          <Text className="font-bold text-lg"></Text>
          <Text className="font-bold text-lg">
            Hot selling categories
          </Text>
        </View>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{
          justifyContent: 'center',
          paddingHorizontal: 10, // Adjust horizontal padding
          paddingTop: 5, // Add padding to match the py-5 style
        }}
        renderItem={({ item }) => (
          <CategoryCard
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

      {/* <ScrollView
        vertical
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent:'center',
          alignItems:'center'
        }}
        className="overflow-visible py-5"
      >
        {
          categories?.map(category => {
            return (
              <CategoryCard
                key={category?.id}
                id={category?.id}
                imgUrl={category?.image}
                title={category?.name}
                rating={category?.rating}
                type={category?.type?.name}
                address="123 main street"
                description={category?.description}
                dishes={category?.dishes}

              />
            )
          })
        }
      </ScrollView> */}

    </View>
  )
}