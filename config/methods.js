import { signInWithCredential, signInWithPhoneNumber, signInWithRedirect } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CUSTOMER_KEY } from '../constants';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";


export const googleLogin = () => {

  const auth = getAuth();

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  signInWithRedirect(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("USERRRR---------__>", user)

    }).catch((error) => {
      const errorMessage = error.message;
      // The email of the user's account used.
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("ERROR-----_>", errorMessage, credential)
    });
}


export const addDataToCollection = async (collectionName, data) => {
  try {

    const collectionRef = database.collection(collectionName);
    let res = await collectionRef.add(data);
    console.log('Data added to collection successfully', res, data);
    return res

  } catch (error) {
    console.error('Error adding data to collection: ', error);
    return "error"
  }
};

export const saveCustomerToAsyncStorage = async (customer) => {
  try {
    await AsyncStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
  } catch (error) {
    console.log('Error saving Customer to storage:', error);
  }
};

export const removeCustomerFromAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem(CUSTOMER_KEY);
  } catch (error) {
    console.log('Error removing Customer from storage:', error);
  }
};

export const handleSendCode = async (auth, phoneNumber, recaptchaVerifier) => {
  let phone = phoneNumber.replace('0', '+92')
  console.log("CHECK------>", phone)

  try {
    const confirmation = await signInWithPhoneNumber(
      auth,
      phone,
      recaptchaVerifier
    );
    console.log("Inside send code----->", confirmation)
    return confirmation
  } catch (error) {
    console.error('Some Error Occurred. Please Try Again!', error);
    return 'error'
  }
};

export const handleVerifyCode = async (verificationCode, confirmationResult) => {
  try {
    if (verificationCode.length === 6) {
      const isCodeVerified = await confirmationResult.confirm(verificationCode);
      if (isCodeVerified) {
        console.log('Logged In Successfully!', isCodeVerified);
        return isCodeVerified
      }
    }
  } catch (error) {
    console.log('error in verification---->', error);
    return false
  }
};