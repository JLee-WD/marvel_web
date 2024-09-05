import React from 'react'
import styles from './styles.module.css'
import getRandomGradient from '../../utils/getRandomGradient'
import Link from 'next/link';

const Card = ({reference, key, item}) => {
  const { name, description, thumbnail, id } = item;

  const thumbnailImg = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? '/silhouette.png' : thumbnail

  const gradientStyle = {
    background: getRandomGradient(),
  };

  return (
    <Link href={`/characters/${id}`}>
      <div ref={reference} key={key} style={gradientStyle} className={styles.card__container}>
        <div className={styles.card__imageContainer}>
          <img className={styles.card__image} src={thumbnailImg} alt={name} />
        </div>
        <div className={styles.card__titleContainer}>
          <h2 className={styles.card__title}>{name}</h2>
        </div>
        <div className={styles.card__descriptionContainer}>
          {/* <p className={styles.card__description}>{description}</p> */}
        </div>
      </div>
    </Link>
  )
}

export default Card
