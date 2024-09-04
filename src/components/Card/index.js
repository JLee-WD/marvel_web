import React from 'react'
import './styles.css'


const getRandomGradient = () => {
  const colors = ['#c269f7', '#5945fe', '#74f7cf'];
  const shuffledColors = colors.sort(() => 0.5 - Math.random());
  const randomAngle = Math.floor(Math.random() * 360);
  return `linear-gradient(${randomAngle}deg, ${shuffledColors.join(', ')})`;
}

const Card = ({reference, key, item}) => {
  const { name, description, thumbnail } = item;

  const thumbnailImg = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? '/silhouette.png' : thumbnail

  const gradientStyle = {
    background: getRandomGradient(),
  };

  return (
    <div ref={reference} key={key} style={gradientStyle} className='card__container'>
      <h2 className='card__title'>{name}</h2>
      <div className='card__imageContainer'>
        <img className='card__image' src={thumbnailImg} alt={name} />
      </div>
      <div className='card__descriptionContainer'>
        <p className='card__description'>{description}</p>
      </div>
    </div>
  )
}

export default Card
