const generateColors = userId => {
  const v1 = (userId % 2) * 10;
  const v2 = (userId % 3) * 10;
  const v3 = (userId % 5) * 10;
  return [
    `rgb(${ 120 - v1 }, ${ 120 - v2 }, ${ 120 - v3 })`,
    `rgb(${ 220 - v3 }, ${ 220 - v1 }, ${ 220 - v2 })`
  ]
}

export const generateProfilePicture = userId => {
  const [c1, c2] = generateColors(userId);
  return `linear-gradient(to bottom right, ${c1}, ${c2}`
}

export const generateProfileBackground = userId => {
  const [c1, c2] = generateColors(userId);
  return `linear-gradient(to left, ${c1}, ${c2}`
}