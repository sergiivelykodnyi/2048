import zip from "lodash/zip";

export type Direction = "up" | "down" | "left" | "right";

export function addRandomTile(grid: number[][]) {
  const emptyTiles = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 0) {
        emptyTiles.push({ x: i, y: j });
      }
    }
  }

  if (emptyTiles.length > 0) {
    const { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    grid[x][y] = Math.random() < 0.9 ? 2 : 4;
  }
}

export function initialize() {
  const grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  addRandomTile(grid);
  addRandomTile(grid);

  return grid;
}

export function slideRowLeft(row: number[]) {
  // remove zeros
  const newRow = row.filter((val) => val);
  const missing = 4 - newRow.length;
  const zeros = Array(missing).fill(0);

  return newRow.concat(zeros);
}

export function mergeNumbersInRow(row: number[]) {
  const mergedRow = row.slice();

  for (let i = 0; i < 4; i++) {
    const a = mergedRow[i];
    const b = mergedRow[i + 1];

    if (a === b) {
      mergedRow[i] = a + b;
      mergedRow[i + 1] = 0;
    }
  }

  return mergedRow;
}

export function moveLeft(grid: number[][]) {
  const newGrid = [];

  for (let row of grid) {
    row = slideRowLeft(row);
    row = mergeNumbersInRow(row);
    row = slideRowLeft(row);
    newGrid.push(row);
  }

  return newGrid;
}

export function isGameOver(board: number[][]) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        return false;
      }
      if (i !== 3 && board[i][j] === board[i + 1][j]) {
        return false;
      }
      if (j !== 3 && board[i][j] === board[i][j + 1]) {
        return false;
      }
    }
  }

  return true;
}

export function isWin(board: number[][]) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 2048) {
        return true;
      }
    }
  }

  return false;
}

export function move(board: number[][], direction: Direction) {
  let newBoard: number[][] = [...board];

  if (direction === "left") {
    newBoard = moveLeft(newBoard);
  } else if (direction === "right") {
    newBoard = newBoard.map((row) => row.reverse());
    newBoard = moveLeft(newBoard);
    newBoard = newBoard.map((row) => row.reverse());
  } else if (direction === "up") {
    newBoard = [...zip(...newBoard)] as number[][];
    newBoard = moveLeft(newBoard);
    newBoard = [...zip(...newBoard)] as number[][];
  } else if (direction === "down") {
    newBoard = [...zip(...newBoard).map((row) => row.reverse())] as number[][];
    newBoard = moveLeft(newBoard);
    newBoard = [...zip(...newBoard.map((row) => row.reverse()))] as number[][];
  }

  addRandomTile(newBoard);

  return newBoard;
}
