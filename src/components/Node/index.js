import React from 'react'
import styles from './styles.module.css'
import getRandomGradient from '../../utils/getRandomGradient'

const Node = ({item}) => {
  const { character } = item;
  const { name, thumbnail } = character;
  const gradientStyle = {
    background: getRandomGradient(),
  };

  return (
    <div className={styles.node__container} style={gradientStyle}>
      <div className={styles.node__imageContainer}>
        <img className={styles.node__image} src={thumbnail} alt={name} />
      </div>
      <h3 className={styles.node__title}>{name}</h3>
    </div>
  )
}

export default Node
