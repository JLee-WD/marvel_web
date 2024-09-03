import fetchDataFromApi from '@/utils/fetch'
import { useEffect, useState } from 'react'
import Card from '../Card'

const Cards = () => {
  const [data, setData] = useState(null)
  const fetchData = async () => {
    try {
      const apiData = await fetchDataFromApi({
        endpoint: 'characters',
        params: {
          offset: 0,
          limit: 16
        }
      })
      console.log('apiData: ', apiData);
      setData(apiData)
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  } 
  useEffect(() => {
    fetchData();
  }, [])
  console.log('data: ', data);
  return (
    <div>
      {data && (
        <div>
          {data && data?.map((item, index) => (
            <Card key={index} item={item}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default Cards
