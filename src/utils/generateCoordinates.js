const gridSize = {
  width: 20,
  height: 20,
};

const usedCoordinates = new Set();

function generateUniqueCoordinates() {
  while (true) {
    const x = Math.floor(Math.random() * gridSize.width);
    const y = Math.floor(Math.random() * gridSize.height);
    const coordinates = `${x},${y}`;

    if (!usedCoordinates.has(coordinates)) {
      usedCoordinates.add(coordinates);
      return { x, y };
    }
  }
}

export { generateUniqueCoordinates, gridSize };
