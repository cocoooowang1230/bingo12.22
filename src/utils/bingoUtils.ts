export const calculateTotalStars = (stars: Record<number, number>): number => {
  return Object.values(stars).reduce((total, count) => total + (count || 0), 0);
};

export const findCompletedLines = (stars: Record<number, number>, size: number): number[] => {
  const completedLines: number[] = [];

  // Check rows
  for (let i = 0; i < size; i++) {
    if ([...Array(size)].every((_, j) => stars[i * size + j] > 0)) {
      completedLines.push(i);
    }
  }

  // Check columns
  for (let i = 0; i < size; i++) {
    if ([...Array(size)].every((_, j) => stars[i + j * size] > 0)) {
      completedLines.push(size + i);
    }
  }

  // Check diagonals
  if ([...Array(size)].every((_, i) => stars[i * (size + 1)] > 0)) {
    completedLines.push(2 * size);
  }
  if ([...Array(size)].every((_, i) => stars[(i + 1) * (size - 1)] > 0)) {
    completedLines.push(2 * size + 1);
  }

  return completedLines;
};

export const hasCompletedBingo = (stars: Record<number, number>, size: number): boolean => {
  // Check if there's at least one star in the board
  if (Object.keys(stars).length === 0) return false;

  // Check rows
  for (let i = 0; i < size; i++) {
    if ([...Array(size)].every((_, j) => stars[i * size + j] > 0)) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < size; i++) {
    if ([...Array(size)].every((_, j) => stars[i + j * size] > 0)) {
      return true;
    }
  }

  // Check diagonals
  if ([...Array(size)].every((_, i) => stars[i * (size + 1)] > 0)) {
    return true;
  }
  if ([...Array(size)].every((_, i) => stars[(i + 1) * (size - 1)] > 0)) {
    return true;
  }

  return false;
};