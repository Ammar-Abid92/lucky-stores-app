
// import { getFirestore, collection, addDoc } from '@react-native-firebase/firestore';

import { database } from "./firebase";


export const addDataToCollection = async (collectionName, data) => {

    const docRef = await addDoc(collection(database, collectionName), data);
    console.log('Document written ', docRef);
    return docRef;
  
}


















// // // Add a document to the collection
// // async function addDocumentToCollection(data, collectionName) {
// //     try {
// //         const ref = collection(db, collectionName)
// //         const docRef = await addDoc( ref, data);
// //         console.log("Document written with ID: ", db, data, collectionName, docRef, ref);
// //     } catch (e) {
// //         console.error("Error adding document: ", e);
// //     }
// // }

// // // Get all documents from the collection
// // async function getAllDocumentsFromCollection(collectionName) {
// //     try {
// //         const querySnapshot = await getDocs(collection(db, collectionName));
// //         querySnapshot.forEach((doc) => {
// //             console.log(doc.id, " => ", doc.data());
// //         });
// //     } catch (e) {
// //         console.error("Error getting documents: ", e);
// //     }
// // }

// // // Listen for real-time updates to the collection
// // function listenForUpdates(collectionName) {
// //     const unsubscribe = onSnapshot(collection(db, collectionName), (querySnapshot) => {
// //         querySnapshot.forEach((doc) => {
// //             console.log(doc.id, " => ", doc.data());
// //         });
// //     });
// //     // To unsubscribe from updates:
// //     // unsubscribe();
// // }

// // // Get a specific document from the collection
// // async function getDocumentById(documentId, collectionName) {
// //     const docRef = doc(collection(db, collectionName), documentId);
// //     const docSnap = await getDoc(docRef);
// //     if (docSnap.exists()) {
// //         console.log("Document data:", docSnap.data());
// //     } else {
// //         console.log("No such document!");
// //     }
// // }

// // // Delete a document from the collection
// // async function deleteDocument(documentId, collectionName) {
// //     try {
// //         await deleteDoc(doc(collection(db, collectionName), documentId));
// //         console.log("Document successfully deleted!");
// //     } catch (e) {
// //         console.error("Error removing document: ", e);
// //     }
// // }

// // // Update a document in the collection
// // async function updateDocument(documentId, newData, collectionName) {
// //     try {
// //         await updateDoc(doc(collection(db, collectionName), documentId), newData);
// //         console.log("Document successfully updated!");
// //     } catch (e) {
// //         console.error("Error updating document: ", e);
// //     }
// // }

// // export {
// //     addDocumentToCollection,
// //     getAllDocumentsFromCollection,
// //     listenForUpdates,
// //     getDocumentById,
// //     deleteDocument,
// //     updateDocument
// // }