import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app';
import { database } from '../config/firebase';


const useGetCollectionDataById = (collectionName, foreignKey, id) => {

    const [data, setData] = useState([])

    useEffect(()=>{
          fetchData()
    }, [collectionName, id])

    const fetchData = async () => {
        
        const collectionRef = database.collection(collectionName);
        const snapshot = await collectionRef.where(foreignKey, '==', id).get();
        const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setData(fetchedData);
      };

    return { data }

}

export default useGetCollectionDataById;