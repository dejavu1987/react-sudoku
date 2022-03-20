export type Seed = number[];
export type Board = number[][];

export const oneto9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const getRandomSeed = () => [...oneto9].sort(() => Math.random() - 0.5);

export const rotateRow = (seed: Seed, index: number) => {
  var rowData = [...seed];
  const moved = rowData.splice(0, index);
  rowData = [...rowData, ...moved];
  return rowData;
};

export const getRow = (seed: Seed, row: number) => {
  if (row === 1) return seed;
  if (row === 2) {
    return rotateRow(seed, 3);
  }
  if (row === 3) {
    return rotateRow(seed, 6);
  }
  if (row === 4) {
    return rotateRow(seed, 7);
  }
  if (row === 5) {
    return rotateRow(seed, 1);
  }
  if (row === 6) {
    return rotateRow(seed, 4);
  }
  if (row === 7) {
    return rotateRow(seed, 5);
  }
  if (row === 8) {
    return rotateRow(seed, 8);
  }
  if (row === 9) {
    return rotateRow(seed, 2);
  }
  return seed;
};

export const swapInArray = (arr: any[], i1: number, i2: number) => {
  let t = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = t;
};

export const randomizeBoardRows = (board: Board) => {
  const b = [...board];
  for (let r = 1; r <= 9; r++) {
    if (Math.random() > 0.5) {
      if (r % 3) {
        swapInArray(b, r - 1, r);
      } else {
        swapInArray(b, r - 1, r - 3);
      }
    }
  }
  return b;
};

export const randomizeBoard = (board: Board) => {
  const randBoard = randomizeBoardRows(board);
  console.log({ board, randBoard });

  return randBoard;
};

export const getRandomBoard = (): Board => {
  const seed = getRandomSeed();
  const board: Board = oneto9.map((r) => getRow(seed, r));

  return randomizeBoard(board);
};
