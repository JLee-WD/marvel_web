import React from 'react'
import './styles.css'
import getRandomGradient from '../../utils/getRandomGradient'

const Node = ({item}) => {
  const { character, comic } = item;
  const { name, description, thumbnail } = character;
  const { title, publishedDate } = comic;
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
