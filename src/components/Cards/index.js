import fetchDataFromApi from '@/utils/fetch'
import { useEffect, useState, useRef, useCallback } from 'react'
import Card from '../Card'
import './styles.css'
import Graph from '../Graph'

const Cards = () => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const limit = 10;
  const initialFetchDone = useRef(false);
  const isFetching = useRef(false); 

  const fetchData = async ({ initial = false }) => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);
    try {
      const characterData = await fetchDataFromApi({
        endpoint: 'characters',
        params: {
          offset: initial ? 0 : page * limit,
          limit
        }
      })
      const characterNodes = characterData.map(character => ({
        id: character.id,
        name: character.name,
        group: 'character',
        shape: 'circularImage',
        image: character.thumbnail,
        size: 80,
      }))
      const addedComicIds = new Set();
      const comicNodes = characterData.flatMap(character => 
        character.comics
          .filter(comic => {
            const comicId = comic.Comic.id;
            if (addedComicIds.has(comicId)) {
              return false;
            } else {
              addedComicIds.add(comicId);
              return true;
            }
          })
          .map(comic => ({
            id: comic.Comic.id,
            name: comic.Comic.title,
            group: 'comic',   
            shape: 'image',
            image: comic.Comic.thumbnail,
            size: 32,
          }))
      );
      const nodes = [...characterNodes, ...comicNodes]
      const edges = characterData.flatMap(character => 
        character.comics.map(comic => ({
          from: character.id,
          to: comic.Comic.id,
        })));
      const newData = {
        nodes,
        edges
      }
      console.log('newData: ', newData);
      if (initial) {
        setData(characterData);
        setGraphData(newData);
      } else {
        setData(prevData => [...prevData, ...characterData]);
        const combinedNodes = [...graphData.nodes, ...newData.nodes];
        const uniqueNodes = combinedNodes.filter((node, index, self) =>
          index === self.findIndex((n) => n.id === node.id)
        );

        const combinedEdges = [...graphData.edges, ...newData.edges];
        const newGraphData = {
          nodes: [...uniqueNodes],
          edges: [...combinedEdges]
        }
        setGraphData(newGraphData);
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

  console.log('data: ', data);
  console.log('graphData: ', graphData);
  return (
    <div className='cards__mainWrapper'>
      <h1 className='cards__title'>MarvelWeb</h1>
      <h2 className='cards__subTitle'>Scroll down to see more</h2>
      <div className='cards__container'>
        {data && data?.map((item, index) => {
            return <Card key={index} item={item}/>
        })}
        {loading && <p>Loading more cards...</p>}
      </div>
      <div className='cards__graphWrapper'>
        <Graph data={graphData} />
      </div>
    </div>
  )
}

export default Cards
