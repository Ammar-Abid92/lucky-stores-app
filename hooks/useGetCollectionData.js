import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app';
import { database } from '../config/firebase';


const useGetCollectionData = (collectionName) => {

  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [collectionName])

  const fetchData = async () => {

    setLoading(true)

    try {
      const collectionRef = database.collection(collectionName);
      const snapshot = await collectionRef.get();
      const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(fetchedData);

    } catch (e) {
      console.log("ERROR INSIDE HOOK---->", e)
      setLoading(false)
      setError('Error')

    } finally {

      setLoading(false)
      setError('Error')

    }

  };

  return { data, error, loading, setLoading }

}

export default useGetCollectionData;