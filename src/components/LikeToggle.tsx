import {Heart} from "lucide-react";
import {type Puppy} from "../types";
import {useLiked} from "../context/liked-context";

export function LikeToggle({id}: { id: Puppy['id'] }) {
  const {liked, setLiked} = useLiked();

  function handleLikedPuppies() {
    if (liked.includes(id)) {
      setLiked(liked.filter(puppyId => puppyId != id));
    } else {
      setLiked([...liked, id]);
    }
  }

  return (
    <button className="group" onClick={handleLikedPuppies}>
      <Heart
        className={liked.includes(id) ? "fill-pink-500 stroke-none" : "stroke-slate-200 group-hover:stroke-slate-300"}
      />
    </button>
  );
}
