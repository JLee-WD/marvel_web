'use client'

import React, { useContext } from 'react'
import './styles.css'
import { ComicContext } from '../../context/ComicContext';

const ReadingList = () => {
  const { comics } = useContext(ComicContext);
  return (
    <div className='readingList__container'>
      Reading List: {comics ? comics.length : 0}
      <div className='readingList__list'>
        {comics && comics.map(comic => 
          <p key={comic.Comic.id}>{comic.Comic.title}</p>
        )}
      </div>
    </div>
  )
}

export default ReadingList
