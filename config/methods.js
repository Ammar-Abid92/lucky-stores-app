import { database } from '../config/firebase';

export const addDataToCollection = async (collectionName, data) => {
    try {
        
        const collectionRef = database.collection(collectionName);
        let res = await collectionRef.add(data);
        console.log('Data added to collection successfully', res);
        return res

    } catch (error) {
        console.error('Error adding data to collection: ', error);
        return error
    }
};