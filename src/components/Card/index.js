import React from 'react'
import './styles.css'
import getRandomGradient from '../../utils/getRandomGradient'



const Card = ({reference, key, item}) => {
  const { name, description, thumbnail, id } = item;

  const thumbnailImg = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? '/silhouette.png' : thumbnail

  const gradientStyle = {
    background: getRandomGradient(),
  };

  return (
    <a href={`/characters/${id}`} target='_blank' rel='noreferrer'>
      <div ref={reference} key={key} style={gradientStyle} className='card__container'>
        <h2 className='card__title'>{name}</h2>
        <div className='card__imageContainer'>
          <img className='card__image' src={thumbnailImg} alt={name} />
        </div>
        <div className='card__descriptionContainer'>
          <p className='card__description'>{description}</p>
        </div>
      </div>
    </a>
  )
}

export default Card
