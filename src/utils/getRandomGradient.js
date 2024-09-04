const getRandomGradient = () => {
  const colors = ['#c269f7', '#5945fe', '#74f7cf'];
  const shuffledColors = colors.sort(() => 0.5 - Math.random());
  const randomAngle = Math.floor(Math.random() * 360);
  return `linear-gradient(${randomAngle}deg, ${shuffledColors.join(', ')})`;
}

export default getRandomGradient;