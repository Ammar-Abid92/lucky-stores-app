// // Supportive code for firebase phone authentication


// import { ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
// import { themeColors } from '../theme';


// export default function VerificationComponent({ phoneNumber, onVerificationSubmit, loading }) {
//     return (
//         <View style={{ flex: 1 }}>
//             <KeyboardAvoidingView
//                 behavior={Platform.OS == "ios" ? "padding" : ""}
//                 style={{
//                     height: "100%",
//                     width: "100%",
//                     background: "#fff"
//                 }}
//             >
//                 <View style={{ flex: 1, alignItems: "center" }}>
//                     {/* <Text style={{ fontSize: 36, marginVertical: 60, color: "#111" }}>
//                         Telegram
//                     </Text> */}
//                     <Text style={{ fontSize: 25, color: "#111", marginVertical: 60 }}>Verify Phone Number</Text>
//                     <Text style={{ fontSize: 15, color: "#111" }}>Enter 4 digits code received on your phone</Text>
//                     <Text style={{ fontSize: 16, color: "#111", marginTop: 14 }}>{phoneNumber ?? '+ 300***********32'}</Text>

//                     <OTPInputView
//                         style={{ width: "100%", height: 200, paddingHorizontal: 32 }}
//                         pinCount={6}
//                         autoFocusOnLoad
//                         codeInputFieldStyle={{
//                             width: 30,
//                             height: 45,
//                             color: "#f4a135",
//                             borderWidth: 0,
//                             borderBottomWidth: 3,
//                             borderBottomColor: "#111"
//                         }}

//                         codeInputHighlightStyle={{
//                             borderColor: "#2ab12f"
//                         }}
//                         onCodeFilled={
//                             (code) => onVerificationSubmit(code)
//                         }
//                     />

//                     {
//                         loading ? (
//                             <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
//                                 <ActivityIndicator size="large" color="orange" />
//                             </View>
//                         ) : (

//                             <View style={{ width: "100%", paddingHorizontal: 22 }}>

//                                 <TouchableOpacity
//                                     style={{
//                                         backgroundColor: themeColors.bgColor(1),
//                                         paddingVertical: 12,
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                         borderRadius: 8,
//                                         paddingVertical: 16
//                                     }}
//                                 >
//                                     <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
//                                 </TouchableOpacity>

//                             </View>
//                         )
//                     }

//                 </View>
//             </KeyboardAvoidingView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     textInput: {
//         height: 60,
//         borderColor: 'orange', // Border color
//         borderWidth: 1,
//         borderRadius: 8, // Border radius for rounded corners
//         paddingHorizontal: 10, // Horizontal padding for text inside TextInput
//         shadowColor: 'orange', // Shadow color
//         shadowOffset: { width: 0, height: 2 }, // Shadow offset
//         shadowOpacity: 0.5, // Shadow opacity
//         shadowRadius: 4, // Shadow radius
//         elevation: 5, // Elevation for Android shadow
//         backgroundColor: 'white', // Background color
//         marginBottom: 10, // Bottom margin for spacing
//     },
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         paddingHorizontal: 10,
//     },
// });