export type Direction = "up" | "down" | "left" | "right";

export function addRandomTile(board: number[][]) {
  const emptyTiles = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) {
        emptyTiles.push({ x: i, y: j });
      }
    }
  }

  if (emptyTiles.length > 0) {
    const { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[x][y] = Math.random() < 0.9 ? 2 : 4;
  }
}

export function initialize() {
  const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  addRandomTile(board);
  addRandomTile(board);

  return board;
}

export function slide(row: number[]) {
  // remove zeros
  let arr = row.filter((val) => val);
  const missing = 4 - arr.length;
  const zeros = Array(missing).fill(0);

  // add zeros
  arr = zeros.concat(arr);

  return arr;
}

export function combine(row: number[]) {
  const arr = [...row];

  for (let i = 3; i >= 1; i--) {
    const a = arr[i];
    const b = arr[i - 1];

    if (a === b) {
      arr[i] = a + b;
      arr[i - 1] = 0;
    }
  }

  return arr;
}

export function operate(row: number[]) {
  let arr = [...row];

  arr = slide(arr);
  arr = combine(arr);
  arr = slide(arr);

  return arr;
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
  const newBoard = [...board];

  for (let i = 0; i < 4; i++) {
    let row;

    if (direction === "left") {
      row = newBoard[i].slice().reverse();
      row = operate(row);
      newBoard[i] = row.reverse();
    } else if (direction === "right") {
      row = newBoard[i];
      row = operate(row);
      newBoard[i] = row;
    } else if (direction === "up") {
      row = [
        newBoard[0][i],
        newBoard[1][i],
        newBoard[2][i],
        newBoard[3][i],
      ].reverse();
      row = operate(row);
      for (let j = 0; j < 4; j++) {
        board[j][i] = row[3 - j];
      }
    } else if (direction === "down") {
      row = [newBoard[0][i], newBoard[1][i], newBoard[2][i], newBoard[3][i]];
      row = operate(row);
      for (let j = 0; j < 4; j++) {
        newBoard[j][i] = row[j];
      }
    }
  }

  addRandomTile(newBoard);

  return newBoard;
}
