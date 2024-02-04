import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';

const windowWidth = Dimensions.get('window').width;

export default function CategoryCard({
  id,
  title,
  imgUrl,
  description,
}) {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => {
      navigation.navigate('Category', {
        id,
        title,
        imgUrl,
        description,
      })
    }}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: imgUrl }} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth / 2 - 25, // Adjust padding and margin as needed
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: themeColors.bgColor(0.2),
    elevation: 5,
    shadowRadius: 7,
    justifyContent:'center',
    alignItems:'center'
  },
  image: {
    height: 150,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
});
