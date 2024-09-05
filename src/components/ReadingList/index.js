'use client'

import React from 'react'
import styles from './styles.module.css'

const ReadingList = ({comics}) => {
  return (
    <div className={styles.readingList__container}>
      Reading List: {comics ? comics.length : 0}
      <div className={styles.readingList__list}>
        {comics && comics.map(comic => 
          <p key={comic.Comic.id}>{comic.Comic.title}</p>
        )}
      </div>
    </div>
  )
}

export default ReadingList
