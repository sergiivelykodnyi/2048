import { cn } from "./utils";

function App() {
  const board = [
    [0, 2, 4, 8],
    [16, 32, 64, 128],
    [256, 512, 1024, 2048],
    [0, 0, 0, 0],
  ];

  return (
    <div className="grid place-content-center mx-auto px-6 py-12">
      <div className="space-y-8">
        <h1 className="text-7xl font-bold text-stone-600">2048</h1>
        <div className="grid grid-cols-4 grid-rows-4 gap-3 w-96 h-96 p-3 bg-stone-300 rounded">
          {board.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={cn(
                  "grid place-content-center font-bold rounded",
                  cell === 0 && "bg-stone-100/25",
                  cell === 2 && "bg-orange-50 text-stone-600 text-4xl",
                  cell === 4 && "bg-orange-100 text-stone-600 text-4xl",
                  cell === 8 && "bg-orange-200 text-stone-600 text-4xl",
                  cell === 16 && "bg-orange-300 text-white text-4xl",
                  cell === 32 && "bg-orange-400 text-white text-4xl",
                  cell === 64 && "bg-orange-500 text-white text-4xl",
                  cell === 128 && "bg-yellow-300 text-white text-4xl",
                  cell === 256 && "bg-amber-300 text-white text-4xl",
                  cell === 512 && "bg-amber-400 text-white text-4xl",
                  cell === 1024 && "bg-amber-500 text-white text-2xl",
                  cell === 2048 && "bg-red-500 text-white text-2xl"
                )}
              >
                {cell ? cell : ""}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
