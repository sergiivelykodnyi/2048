import { observable, action, toJS, computed, makeObservable } from "mobx";
import zip from "lodash/zip";

export type Direction =
  // Left.
  | "ArrowLeft"
  | "h"
  | "a"
  // Down.
  | "ArrowDown"
  | "j"
  | "s"
  // Up.
  | "ArrowUp"
  | "k"
  | "w"
  // Right.
  | "ArrowRight"
  | "l"
  | "d";

export type Grid = number[][];

interface IGame {
  initialize(): void;
  addRandomTile(grid: Grid): Grid;
  move(direction: Direction): void;
  get isGameOver(): boolean;
  get isWin(): boolean;
}

export class Game implements IGame {
  grid: Grid = [];

  constructor() {
    makeObservable(this, {
      grid: observable,
      isGameOver: computed,
      isWin: computed,
      initialize: action,
      addRandomTile: action,
      move: action,
    });
    this.initialize();
  }

  initialize() {
    this.grid = this.addRandomTile(
      this.addRandomTile([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ])
    );
  }

  addRandomTile(grid: Grid): Grid {
    const emptyTiles = [];

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === 0) {
          emptyTiles.push({ x: i, y: j });
        }
      }
    }

    if (emptyTiles.length > 0) {
      const { x, y } =
        emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      grid[x][y] = Math.random() < 0.9 ? 2 : 4;
    }

    return grid;
  }

  move(direction: Direction) {
    let newGrid: Grid = toJS(this.grid);

    switch (direction) {
      case "ArrowLeft":
      case "h":
      case "a":
        newGrid = this.moveLeft(newGrid);
        break;
      case "ArrowRight":
      case "l":
      case "d":
        newGrid = newGrid.map((row) => row.reverse());
        newGrid = this.moveLeft(newGrid);
        newGrid = newGrid.map((row) => row.reverse());
        break;
      case "ArrowUp":
      case "k":
      case "w":
        newGrid = [...zip(...newGrid)] as Grid;
        newGrid = this.moveLeft(newGrid);
        newGrid = [...zip(...newGrid)] as Grid;
        break;
      case "ArrowDown":
      case "j":
      case "s":
        newGrid = [...zip(...newGrid).map((row) => row.reverse())] as Grid;
        newGrid = this.moveLeft(newGrid);
        newGrid = [...zip(...newGrid.map((row) => row.reverse()))] as Grid;
        break;

      default:
        return;
    }

    this.grid = this.addRandomTile(newGrid);
  }

  slideRowLeft(row: number[]) {
    // remove zeros
    const newRow = row.filter((val) => val);
    const missing = 4 - newRow.length;
    const zeros = Array(missing).fill(0);

    return newRow.concat(zeros);
  }

  mergeNumbersInRow(row: number[]) {
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

  moveLeft(grid: Grid) {
    const newGrid = [];

    for (let row of grid) {
      row = this.slideRowLeft(row);
      row = this.mergeNumbersInRow(row);
      row = this.slideRowLeft(row);
      newGrid.push(row);
    }

    return newGrid;
  }

  get isGameOver() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.grid[i][j] === 0) {
          return false;
        }
        if (i !== 3 && this.grid[i][j] === this.grid[i + 1][j]) {
          return false;
        }
        if (j !== 3 && this.grid[i][j] === this.grid[i][j + 1]) {
          return false;
        }
      }
    }

    return true;
  }

  get isWin() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.grid[i][j] === 2048) {
          return true;
        }
      }
    }

    return false;
  }
}
