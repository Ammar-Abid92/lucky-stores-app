import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app';
import { database } from '../config/firebase';


const useGetCollectionDataByQuery = (collectionName, foreignKey, id) => {

  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [collectionName, id])

  const fetchData = async () => {
    setLoading(true)

    try {

      const collectionRef = database.collection(collectionName);
      const snapshot = await collectionRef.where(foreignKey, '==', id).get();
      const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(fetchedData);
      setLoading(false)

    } catch (e) {

      setError('Error')
      setLoading(false)

    } finally {
      
      setError('Error')
      setLoading(false)

    }

  };

  return { data, error, loading, setLoading }

}

export default useGetCollectionDataByQuery;