const randomArrFunction = (arr : any[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// 1 - easy, 2 - medium, 3 - hard
export const gameCardsFunction = (difficulty : number = 2) => {
  const fullIcons = [
      'paw', 'paw', 'heart', 'heart', 'tree', 'tree',
      'star', 'star', 'bell', 'bell', 'gift', 'gift',
      'cloud', 'cloud', 'apple', 'apple'
  ];

  let icons = []

  if (difficulty === 1) {
    icons = fullIcons.slice(0, 8);
  } else if (difficulty === 2) {
    icons = fullIcons.slice(0, 12);
  } else {
    icons = fullIcons;
  }

  const randomIcons = randomArrFunction(icons);

  return randomIcons.map((icon, index) => ({
      id: index,
      symbol: icon,
      isFlipped: false,
  }));
};