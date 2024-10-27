const randomArrFunction = (arr : any[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const gameCardsFunction = () => {
  const icons = [
      'paw', 'paw', 'heart', 'heart', 'tree', 'tree',
      'star', 'star', 'bell', 'bell', 'gift', 'gift'
  ];
  const randomIcons = randomArrFunction(icons);
  return randomIcons.map((icon, index) => ({
      id: index,
      symbol: icon,
      isFlipped: false,
  }));
};