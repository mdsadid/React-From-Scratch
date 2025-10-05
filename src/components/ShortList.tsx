import {type Puppy} from "../types";
import {Heart, X} from "lucide-react";
import {useLiked} from "../context/liked-context";

export function ShortList({puppies}: { puppies: Puppy[] }) {
  const {liked, setLiked} = useLiked();

  return (
    <div>
      <h2 className="flex items-center gap-2 font-medium">
        <span>Your Shortlist</span>
        <Heart className="fill-pink-500 stroke-pink-500"/>
      </h2>
      <ul className="mt-4 flex flex-wrap gap-4">
        {
          puppies
            .filter(puppy => liked.includes(puppy.id))
            .map(puppy => (
              <li
                key={puppy.id}
                className="relative flex items-center overflow-clip rounded-md bg-white shadow-sm ring ring-black/5 transition duration-100 starting:scale-0 starting:opacity-0">
                <img
                  height={32}
                  width={32}
                  alt={puppy.name}
                  className="aspect-square w-8 object-cover"
                  src={puppy.imagePath}
                />
                <p className="px-3 text-sm text-slate-800">{puppy.name}</p>
                <button
                  type="button"
                  className="group h-full border-l border-slate-100 px-2 hover:bg-slate-100"
                  onClick={() => setLiked(liked.filter(id => id != puppy.id))}
                >
                  <X className="size-4 stroke-slate-400 group-hover:stroke-red-400"/>
                </button>
              </li>
            ))
        }
      </ul>
    </div>
  );
}
