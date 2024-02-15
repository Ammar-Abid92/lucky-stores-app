import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Icon from "react-native-feather";
import { formatCreationDate, formatNum, themeStyleSheet } from '../constants';
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated';

const OrderList = ({
    name,
    orderTotal,
    itemCount,
    orderStatus,
    createdAt,
    entering
}) => {
    let statusArray = [
        'declined',
        'delivered',
        'cancelled',
        'pending',
        'accepted',
        'shipped'
    ]
    return (
        <Animated.View
            entering={entering}
            // onPress={(e) => navigateToDetails(e)}
            style={styles.thirdSectionBodybox}
        >
            <View style={styles.orderLeftSide}>
                <Text className="font-bold text-lg"> {name}</Text>
                <Text className="text-gray-500">
                    {itemCount} {itemCount > 1 ? 'items' : 'item'}
                </Text>
            </View>
            <View style={styles.orderMiddleSide}>
                <Text className="font-bold text-lg" >{'Rs. '}{formatNum(orderTotal)}</Text>
                <Text>Date: {formatCreationDate( createdAt.seconds )}</Text>
            </View>
            {
                statusArray.includes(orderStatus) ? (
                    <View style={styles.orderRightActionSide}>
                        <Text className="font-bold text-lg">
                            Status:
                        </Text>
                        <View style={styles.OrderListStatusMain}>
                            <View
                                style={{

                                    backgroundColor:
                                        orderStatus === 'declined'
                                            ? themeStyleSheet.red
                                            : orderStatus === 'delivered'
                                                ? themeStyleSheet.brightGreen
                                                : orderStatus === 'cancelled'
                                                    ? themeStyleSheet.mainColor
                                                    : orderStatus === 'pending'
                                                        ? themeStyleSheet.red
                                                        : orderStatus === 'accepted'
                                                            ? themeStyleSheet.brightGreen
                                                            : themeStyleSheet.skyBlue,
                                    padding: 5,
                                    borderRadius: 10
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'white'

                                    }}
                                >
                                    {orderStatus}
                                </Text>
                            </View>
                        </View>
                    </View>
                ) : null}

        </Animated.View>
    );
};

export default OrderList;

const styles = StyleSheet.create({
    thirdSectionBodybox: {
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingVertical: 8,
        alignItems: "center",
        marginLeft: 5,
        marginRight:5,
        marginTop:5,
        borderRadius:10
    },
    orderLeftSide: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 15,
        flex: 0.5,

    },
    orderMiddleSide: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    orderRightActionSide: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.5,

    },
    OrderListStatusMain: {
        flexDirection: 'column',
        alignItems: 'center',
    },
});
