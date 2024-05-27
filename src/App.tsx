import { useEffect, useState } from "react";
import Tile from "./components/Tile";
import * as Game from "./game";

function App() {
  // const board = [
  //   [0, 2, 4, 8],
  //   [16, 32, 64, 128],
  //   [256, 512, 1024, 2048],
  //   [0, 0, 0, 0],
  // ];
  const [board, setBoard] = useState(Game.initialize());

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);

      switch (e.key) {
        case "ArrowUp":
          setBoard(Game.move(board, "up"));
          break;
        case "ArrowDown":
          setBoard(Game.move(board, "down"));
          break;
        case "ArrowLeft":
          setBoard(Game.move(board, "left"));
          break;
        case "ArrowRight":
          setBoard(Game.move(board, "right"));
          break;
      }

      if (Game.isWin(board)) {
        alert("You win!");
        setBoard(Game.initialize());
      }

      if (Game.isGameOver(board)) {
        alert("Game over!");
        setBoard(Game.initialize());
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [board]);

  return (
    <div className="grid place-content-center mx-auto px-6 py-12">
      <div className="space-y-8">
        <h1 className="text-7xl font-bold text-stone-600">2048</h1>
        <div className="grid grid-cols-4 grid-rows-4 gap-3 w-96 h-96 p-3 bg-stone-300 rounded">
          {board.map((row, i) =>
            row.map((tile, j) => <Tile key={`${i}-${j}`} tile={tile} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
