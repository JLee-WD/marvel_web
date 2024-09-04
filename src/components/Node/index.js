import React from 'react'
import './styles.css'
import getRandomGradient from '../../utils/getRandomGradient'

const Node = ({item}) => {
  const { character } = item;
  const { name, thumbnail } = character;
  const gradientStyle = {
    background: getRandomGradient(),
  };

  console.log('Node item: ', item);
  return (
    <div className='node__container' style={gradientStyle}>
      <div className='node__imageContainer'>
        <img className='node__image' src={thumbnail} alt={name} />
      </div>
      <h3 className='node__title'>{name}</h3>
    </div>
  )
}

export default Node
