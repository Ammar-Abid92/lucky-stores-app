// // Supportive code for phone authentication with firebase

// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
// import { themeColors } from '../theme';
// import { useNavigation } from '@react-navigation/native';
// import * as Icon from "react-native-feather";
// import { useEffect } from 'react';
// import { PHONE_REGEX } from '../constants';
// import VerificationComponent from '../components/verification';
// import { addDataToCollection, handleSendCode, removeCustomerFromAsyncStorage, saveCustomerToAsyncStorage } from '../config/methods';
// import { useRef } from 'react';
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// import app, { auth } from '../config/firebase';



// function LoginScreen() {
//   const navigation = useNavigation();

//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
//   const [showVerification, setShowVerification] = useState(false);
//   const [verificationWrong, setVerificationWrong] = useState(false);
//   const [disable, setDisable] = useState(true)
//   const [loading, setLoading] = useState(false)
//   const [name, setName] = useState('')
//   const [address, setAddress] = useState('')
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const recaptchaVerifier = useRef(null);


//   useEffect(() => {
//     checkValidity()
//   }, [phoneNumber, name])

//   console.log(formattedPhoneNumber)

//   const checkValidity = () => {
//     if (PHONE_REGEX.test(phoneNumber) && name.length > 0) {
//       setDisable(false)
//     }
//   }

//   const handleVerificationSubmit = async (code) => {
//     if (confirmationResult) {
//       setLoading(true)
//       setDisable(true)
//       try {
//         const userCredential = await confirmationResult.confirm(code);
//         console.log("SUCEEDED---->", userCredential)
//         let customerData = {
//           name: name,
//           phone_number: phoneNumber,
//           residential_address: address,
//           uid: userCredential?.user.uid,
//         }

//         if (userCredential?._tokenResponse?.isNewUser) {

//           addDataToCollection('customers', customerData).then(res => {
//             if (res != 'error') {

//               saveCustomerToAsyncStorage(customerData)
//               setLoading(false)
//               console.log("customer DATA", customerData)
//               navigation.navigate('Cart')
//             } else {
//               throw new Error("Error in login, Kindly try again")
//             }
//           }).catch(e => {
//             setLoading(false)
//             Alert.alert("Error in login, Kindly try again")
//           })
//         } else {
//           saveCustomerToAsyncStorage(customerData)
//           setLoading(false)
//           console.log("customer DATA", customerData)
//           navigation.navigate('Cart')
//         }
//       } catch (error) {
//         setVerificationWrong(true);
//         setLoading(false)
//         setShowVerification(false)
//         checkValidity()
//         console.log("ERROR-------------_>", error)
//         Alert.alert("Error in login, Kindly try again")

//       }
//     }
//   };

//   const handleShowVerification = async () => {
//     setDisable(true)
//     try {

//       let res = await handleSendCode(auth, phoneNumber, recaptchaVerifier.current)
//       if (res != 'error') {
//         setLoading(true)
//         setConfirmationResult(res)
//         setShowVerification(true);
//       } else {
//         setShowVerification(false)
//         setLoading(false)
//         checkValidity()
//       }
//     } catch (e) {
//       console.log("HEREEEE", e)
//       setShowVerification(false)
//       setLoading(false)
//       setDisable(false)
//     }
//   };

//   return (

//     <View
//       className="flex-1"
//     >
//       <View className="relative py-6 shadow-sm">
//         <TouchableOpacity
//           style={{ backgroundColor: themeColors.bgColor(1) }}
//           onPress={navigation.goBack}
//           className="absolute z-10 rounded-full p-1 shadow top-5 left-2">
//           <Icon.ArrowLeft strokeWidth={3} stroke="white" />
//         </TouchableOpacity>
//         <View>
//           <Text className="text-center font-bold text-xl">Login</Text>
//         </View>
//       </View>

//       <FirebaseRecaptchaVerifierModal
//         ref={recaptchaVerifier}
//         firebaseConfig={app.options}
//         androidHardwareAccelerationDisabled
//       />

//       {!showVerification ? (

//         <KeyboardAvoidingView
//           style={styles.container}
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Adjust this offset as needed
//         >

//           <Text className="text-xl font-extrabold text-gray-700 ml-5" >Enter your full name</Text>

//           <TextInput
//             placeholder="Name"
//             onChangeText={(text) => setName(text)}
//             keyboardType="default"
//             style={styles.textInput}
//             className="ml-5 mr-5 mt-5"
//           />
//           <Text className="text-xl font-extrabold text-gray-700 ml-5" >Enter your address</Text>

//           <TextInput
//             placeholder="Address"
//             onChangeText={(text) => setAddress(text)}
//             keyboardType="default"
//             style={styles.textInput}
//             className="ml-5 mr-5 mt-5"
//           />

//           <Text className="text-xl font-extrabold text-gray-700 ml-5" >Enter your phone number</Text>

//           <TextInput
//             placeholder="03xxxxxxxx"
//             onChangeText={(text) => setPhoneNumber(text)}
//             keyboardType="phone-pad"
//             maxLength={11}
//             style={styles.textInput}
//             className="ml-5 mr-5 mt-5"
//           />

//           <TouchableOpacity
//             disabled={disable}
//             style={disable ? { backgroundColor: themeColors.bgColor(0.4) } : { backgroundColor: themeColors.bgColor(1) }}
//             onPress={handleShowVerification}
//             className="p-3 rounded-full mt-5 ml-5 mr-5">
//             {loading ? (
//               <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
//                 <ActivityIndicator size="large" color="orange" />
//               </View>
//             ) : (
//               <Text className="text-white text-center font-bold text-lg">Verify</Text>
//             )}
//           </TouchableOpacity>

//         </KeyboardAvoidingView>

//       ) : (

//         <VerificationComponent
//           phoneNumber={phoneNumber}
//           onVerificationSubmit={handleVerificationSubmit}
//           loading={loading}
//         />
//       )
//       }
//     </View >
//   );
// }

// const styles = StyleSheet.create({
//   textInput: {
//     height: 60,
//     borderColor: 'orange', // Border color
//     borderWidth: 1,
//     borderRadius: 8, // Border radius for rounded corners
//     paddingHorizontal: 10, // Horizontal padding for text inside TextInput
//     shadowColor: 'orange', // Shadow color
//     shadowOffset: { width: 0, height: 2 }, // Shadow offset
//     shadowOpacity: 0.5, // Shadow opacity
//     shadowRadius: 4, // Shadow radius
//     elevation: 5, // Elevation for Android shadow
//     backgroundColor: 'white', // Background color
//     marginBottom: 10, // Bottom margin for spacing
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//   },
// });


// export default LoginScreen;
