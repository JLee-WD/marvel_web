import fetchDataFromApi from '@/utils/fetch'
import { useEffect, useState } from 'react'
import Card from '../Card'
import './styles.css'

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
    <div className='cards__wrapper'>
      {data && data?.map((item, index) => (
          <Card key={index} item={item}/>
        ))
      }
    </div>
  )
}

export default Cards
