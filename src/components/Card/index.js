import React from 'react'
import './styles.css'


const getRandomGradient = () => {
  const colors = ['#c269f7', '#5945fe', '#74f7cf'];
  const shuffledColors = colors.sort(() => 0.5 - Math.random());
  const randomAngle = Math.floor(Math.random() * 360);
  return `linear-gradient(${randomAngle}deg, ${shuffledColors.join(', ')})`;
}

const Card = ({key, item}) => {
  const { name, description, thumbnail } = item;
  console.log('item: ', item);

  const gradientStyle = {
    background: getRandomGradient(),
  };

  return (
    <div key={key} style={gradientStyle} className='card__container'>
      <h2 className='card__title'>{name}</h2>
      <div className='card__imageContainer'>
        <img className='card__image' src={thumbnail} alt={name} />
      </div>
      <div className='card__descriptionContainer'>
        <p className='card__description'>{description}</p>
      </div>
    </div>
  )
}

export default Card
