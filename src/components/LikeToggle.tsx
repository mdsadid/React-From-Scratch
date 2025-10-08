import {Heart, LoaderCircle} from "lucide-react";
import {type Puppy} from "../types";
import {useLiked} from "../context/liked-context";
import {useState} from "react";

export function LikeToggle({id}: { id: Puppy['id'] }) {
  const {liked, setLiked} = useLiked();
  const [pending, setPending] = useState(false);

  function handleLikedPuppies() {
    setPending(true);

    setTimeout(() => {
      if (liked.includes(id)) {
        setLiked(liked.filter(puppyId => puppyId != id));
      } else {
        setLiked([...liked, id]);
      }

      setPending(false);
    }, 1500);
  }

  return (
    <button className="group" onClick={handleLikedPuppies}>
      {
        pending
          ? <LoaderCircle className="animate-spin stroke-slate-300"/>
          : <Heart
            className={liked.includes(id) ? "fill-pink-500 stroke-none" : "stroke-slate-200 group-hover:stroke-slate-300"}
          />
      }
    </button>
  );
}
