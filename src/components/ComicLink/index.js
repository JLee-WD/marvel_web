import React, { useContext } from 'react'
import formatDate from '../../utils/formatDate'
import styles from './styles.module.css'
import { ComicContext } from '../../context/ComicContext';

const ComicLink = ({comicLink}) => {
  const { comics, setComics } = useContext(ComicContext);
  const date = new Date(comicLink.Comic.publishedDate);
  const formattedDate = formatDate(date);
  const isComicInList = comics?.some(comic => comic.comicId === comicLink.comicId);   
  const handleAdd = () => {
    if (isComicInList) {
      return;
    }
    const newComics = [...comics, comicLink];
    setComics(newComics);
  }
  const handleMinus = () => {
    const newComics = comics.filter(comic => comic.comicId !== comicLink.comicId);
    setComics(newComics);
  }
  return (
    <li className={styles.comicLink__container} key={comicLink.comicId}>
      {!isComicInList ? <p title="Click to add to reading list" className={styles.comicLink__plus} onClick={() => handleAdd()}>+</p> : <p title="Click to add to reading list" className={styles.comicLink__plus} onClick={() => handleMinus()}>-</p>}
      <p>{comicLink.Comic.title} (Published: {formattedDate})</p>
    </li>
  )
}

export default ComicLink;
