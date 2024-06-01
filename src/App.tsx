import { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import Tile from "./components/Tile";
import { Direction, Game } from "./game";

const App = observer(() => {
  // const board = [
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
        game.initialize();
      }

      if (game.isGameOver) {
        alert("Game over!");
        game.initialize();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [game]);

  return (
    <div className="grid place-content-center mx-auto px-6 py-12">
      <div className="space-y-8">
        <h1 className="text-7xl font-bold text-stone-600">2048</h1>
        <div className="grid grid-cols-4 grid-rows-4 gap-3 w-96 h-96 p-3 bg-stone-300 rounded">
          {game.grid.map((row, i) =>
            row.map((tile, j) => <Tile key={`${i}-${j}`} tile={tile} />)
          )}
        </div>
      </div>
    </div>
  );
});

export default App;
