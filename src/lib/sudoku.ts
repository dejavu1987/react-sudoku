export type Seed = number[];
export type Board = number[][];

export const oneto9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const getRandomSeed = () => [...oneto9].sort(() => Math.random() - 0.5);

/**
 * shiftRow() shifts given array by the given length
 * @param seed
 * @param index
 * @returns number[]
 */
export const shiftRow = (seed: Seed, index: number) => {
  var rowData = [...seed];
  const moved = rowData.splice(0, index);
  rowData = [...rowData, ...moved];
  return rowData;
};

/**
 * getRow() get the shifted version of the seed row
 * Each row has a predefined shift
 * @param seed
 * @param row
 * @returns number[]
 */
export const getRow = (seed: Seed, row: number) => {
  if (row === 1) return seed;
  if (row === 2) {
    return shiftRow(seed, 3);
  }
  if (row === 3) {
    return shiftRow(seed, 6);
  }
  if (row === 4) {
    return shiftRow(seed, 7);
  }
  if (row === 5) {
    return shiftRow(seed, 1);
  }
  if (row === 6) {
    return shiftRow(seed, 4);
  }
  if (row === 7) {
    return shiftRow(seed, 5);
  }
  if (row === 8) {
    return shiftRow(seed, 8);
  }
  if (row === 9) {
    return shiftRow(seed, 2);
  }
  return seed;
};

/**
 * Swap elements of a given array at given indices i1 and i2
 * @param arr
 * @param i1
 * @param i2
 */
export const swapInArray = (arr: any[], i1: number, i2: number) => {
  let t = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = t;
};

/**
 * Swap columns of a given 2D array at given column indices i1 and i2
 * @param arr
 * @param i1
 * @param i2
 */
export const swapColIn2dArray = (arr: any[], i1: number, i2: number) => {
  for (let r = 0; r < 9; r++) {
    swapInArray(arr[r], i1, i2);
  }
};

/**
 * Randomize board's rows
 * Swaps rows within the 3 row groups randomly
 * @param board
 * @returns Board
 */
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

/**
 * Randomize board's cols
 * Swaps columns within the 3 column groups randomly
 * @param board
 * @returns Board
 */
export const randomizeBoardCols = (board: Board) => {
  const b = [...board];
  for (let c = 1; c <= 9; c++) {
    if (Math.random() > 0.5) {
      if (c % 3) {
        swapColIn2dArray(b, c - 1, c);
      } else {
        swapColIn2dArray(b, c - 1, c - 3);
      }
    }
  }
  return b;
};

/**
 * Randomize the given board
 * @param board
 * @returns Board
 */
export const randomizeBoard = (board: Board): Board => {
  const randBoard = randomizeBoardCols(randomizeBoardRows(board));
  return randBoard;
};

/**
 * Get a random Sudoku board
 * @returns Board
 */
export const getRandomBoard = (): Board => {
  const seed = getRandomSeed();
  const board: Board = oneto9.map((r) => getRow(seed, r));

  return randomizeBoard(board);
};
