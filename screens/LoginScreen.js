import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { useState } from 'react'
import { googleLogin } from '../config/methods'
import { useEffect } from 'react'
import {
    GoogleSignin,
    GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

const LoginScreen = () => {
    const [disable, setDisable] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState();
    const [userInfo, setUserInfo] = useState();

    // useEffect(() => {

    //     googleLogin()

    // }, [])

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                "89153556013-v985oo4me6scftsvd8skju6kkmi6o4dp.apps.googleusercontent.com",
        });
    }, []);

    const signin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn();
            setUserInfo(user);
            setError();
        } catch (e) {
            setError(e);
        }
    };

    const logout = () => {
        setUserInfo();
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
    };
    return (

        <View style={styles.container}>
            <Text>{JSON.stringify(error)}</Text>
            {userInfo && <Text>{JSON.stringify(userInfo.user)}</Text>}
            {userInfo ? (
                <Button title="Logout" onPress={logout} />
            ) : (
                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Standard}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signin}
                />
            )}
            <StatusBar style="auto" />
        </View>
        // <View>
        //     <Text className="text-xl font-extrabold text-gray-700 ml-5" >Enter your full name</Text>

        //     <TouchableOpacity
        //         disabled={disable}
        //         style={disable ? { backgroundColor: themeColors.bgColor(0.4) } : { backgroundColor: themeColors.bgColor(1) }}
        //         onPress={() => googleLogin()}
        //         className="p-3 rounded-full mt-5 ml-5 mr-5">
        //         {loading ? (
        //             <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
        //                 <ActivityIndicator size="large" color="orange" />
        //             </View>
        //         ) : (
        //             <Text className="text-white text-center font-bold text-lg">Login</Text>
        //         )}
        //     </TouchableOpacity>
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default LoginScreen
