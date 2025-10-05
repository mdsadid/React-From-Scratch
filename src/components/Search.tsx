import {Dispatch, SetStateAction, useRef} from "react";
import {Delete} from "lucide-react";

export function Search({searchQuery, setSearchQuery}: {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}) {
  const inputRef = useRef(null);

  return (
    <div>
      <label htmlFor="search" className="font-medium">
        Search for a character trait
      </label>
      <div className="mt-2 flex items-center gap-4">
        <input
          ref={inputRef}
          type="text"
          name="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Playful..."
          id="search"
          className="w-full max-w-80 bg-white px-4 py-2 ring ring-black/5 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        />
        <button
          className="inline-block rounded bg-cyan-300 px-4 py-2 !pr-3 !pl-2.5 font-medium text-cyan-900 hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          onClick={() => {
            setSearchQuery('');
            inputRef.current.focus();
          }}
        >
          <Delete/>
        </button>
      </div>
    </div>
  );
}
