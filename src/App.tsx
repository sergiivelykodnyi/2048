import { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import Tile from "./components/Tile";
import { Direction, Game } from "./game";

const App = observer(() => {
  // const grid = [
  //   [0, 2, 4, 8],
  //   [16, 32, 64, 128],
  //   [256, 512, 1024, 2048],
  //   [0, 0, 0, 0],
  // ];
  const game = useMemo(() => new Game(), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      game.move(e.key as Direction);

      if (game.isWin) {
        alert("You win!");
      }

      if (game.isGameOver) {
        alert("Game over!");
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [game]);

  return (
    <div className="mx-auto px-6 py-12 max-w-[560px]">
      <div className="space-y-6">
        <header>
          <h1 className="text-7xl font-bold text-stone-700">2048</h1>
        </header>
        <div className="grid items-center grid-cols-3 gap-3 text-stone-600 font-semibold">
          <button
            className="p-3 bg-amber-600 text-white rounded"
            type="button"
            onClick={() => game.initialize()}
          >
            New Game
          </button>
          <div className="p-3 bg-stone-500 rounded">
            <span className="text-stone-100">Score:</span>{" "}
            <span className="text-white">{game.score}</span>
          </div>
          <div className="p-3 bg-stone-500 text-white rounded">
            <span className="text-stone-100">Best:</span>{" "}
            <span className="text-white">{game.score}</span>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-4 gap-3 w-full aspect-square p-3 bg-stone-300 rounded">
          {game.grid.map((row, i) =>
            row.map((tile, j) => <Tile key={`${i}-${j}`} tile={tile} />)
          )}
        </div>
      </div>
    </div>
  );
});

export default App;
