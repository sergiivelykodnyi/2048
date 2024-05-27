import { cn } from "../utils";

type TileProps = {
  tile: number;
};

function App(props: TileProps) {
  const { tile } = props;

  return (
    <div
      className={cn(
        "grid place-content-center font-bold rounded",
        tile === 0 && "bg-stone-100/25",
        tile === 2 && "bg-orange-50 text-stone-600 text-4xl",
        tile === 4 && "bg-orange-100 text-stone-600 text-4xl",
        tile === 8 && "bg-orange-200 text-stone-600 text-4xl",
        tile === 16 && "bg-orange-300 text-white text-4xl",
        tile === 32 && "bg-orange-400 text-white text-4xl",
        tile === 64 && "bg-orange-500 text-white text-4xl",
        tile === 128 && "bg-yellow-300 text-white text-4xl",
        tile === 256 && "bg-amber-300 text-white text-4xl",
        tile === 512 && "bg-amber-400 text-white text-4xl",
        tile === 1024 && "bg-amber-500 text-white text-2xl",
        tile === 2048 && "bg-red-500 text-white text-2xl"
      )}
    >
      {tile || null}
    </div>
  );
}

export default App;
