import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CUSTOMER_KEY } from '../constants';

const useGetUserFromAsync = () => {

    const [customerData, setCustomerData] = useState(null)

    useEffect(() => {

        AsyncStorage.getItem(CUSTOMER_KEY).then(res => {
            setCustomerData(res ? JSON.parse(res) : null)
            console.log("USER IN ASYN--->", customerData, res)
        }).catch(e => {
            console.log('Error getting user from storage:', error);
            setCustomerData(null);
        })
        
    }, [])

    return { customerData }

}

export default useGetUserFromAsync;