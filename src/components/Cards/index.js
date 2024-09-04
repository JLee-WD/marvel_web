import fetchDataFromApi from '@/utils/fetch'
import { useEffect, useState, useRef, useCallback } from 'react'
import Card from '../Card'
import './styles.css'

const Cards = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // const offset = 0;
  const limit = 32;
  const initialFetchDone = useRef(false);
  const isFetching = useRef(false); 

  const fetchData = async ({ initial = false }) => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);
    // console.log('fetchData page: ', page);
    // console.log('data?.length: ', data?.length);
    // console.log('fetchData page * 16: ', data?.length + 16);
    console.log('fetchData');
    try {
      const apiData = await fetchDataFromApi({
        endpoint: 'characters',
        params: {
          offset: page * limit,
          limit
        }
      })
      if (initial) {
        setData(apiData);
      } else {
        setData(prevData => [...prevData, ...apiData]);
      }
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  // console.log('page: ', page);

  useEffect(() => {
    if (initialFetchDone.current) return;
    console.log('initial fetchData');
    fetchData({initial: true});
    initialFetchDone.current = true;
  }, [])

  const handleScroll = async () => {
    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight * 0.85 || loading) {
      return;
    }
    await fetchData({initial: false});
  };

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading])

  // console.log('data: ', data);
  console.log('initialFetchDone: ', initialFetchDone);
  console.log('data.length: ', data.length);
  console.log('page: ', page);
  return (
    <div className='cards__wrapper'>
      {data && data?.map((item, index) => {
          return <Card key={index} item={item}/>
      })}
      {loading && <p>Loading more cards...</p>}
    </div>
  )
}

export default Cards
