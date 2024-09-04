import React, { useContext } from 'react'
import formatDate from '../../utils/formatDate'
import './styles.css'
import { ComicContext } from '../../context/ComicContext';

const ComicLink = ({comicLink}) => {
  const { comics, setComics } = useContext(ComicContext);
  const date = new Date(comicLink.Comic.publishedDate);
  const formattedDate = formatDate(date);
  const handleClick = () => {
    const newComics = [...comics, comicLink];
    setComics(newComics);
  }
  return (
    <li className='comicLink__container' key={comicLink.comicId}>
      <p title="Click to add to reading list" className='comicLink__plus' onClick={() => handleClick()}>+</p>
      <p>{comicLink.Comic.title} (Published: {formattedDate})</p>
    </li>
  )
}

export default ComicLink;
