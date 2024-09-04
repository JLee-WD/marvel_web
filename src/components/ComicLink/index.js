import React from 'react'
import formatDate from '../../utils/formatDate'
import './styles.css'

const ComicLink = ({comicLink}) => {
  const date = new Date(comicLink.Comic.publishedDate);
  const formattedDate = formatDate(date);
  return (
    <li className='comicLink__container' key={comicLink.comicId}>
      <div>
        <p>{comicLink.Comic.title} (Published: {formattedDate})</p>
      </div>
    </li>
  )
}

export default ComicLink;
