import { Heart, LoaderCircle } from "lucide-react";
import { type Puppy } from "../types";
import { useState } from "react";
import { toggleLikedStatus } from "../queries";
import { usePuppies } from "../context/puppies-context";

export function LikeToggle({ puppy }: { puppy: Puppy }) {
  const [loading, setLoading] = useState(false);
  const { setPuppies } = usePuppies();

  async function handleLikedPuppies() {
    setLoading(true);

    const updatedPuppy = await toggleLikedStatus(puppy.id);

    setPuppies((prevPups) => {
      return prevPups.map((existingPuppy) =>
        existingPuppy.id === updatedPuppy.id ? updatedPuppy : existingPuppy,
      );
    });

    setLoading(false);
  }

  return (
    <button className="group" onClick={handleLikedPuppies}>
      {loading ? (
        <LoaderCircle className="animate-spin stroke-slate-300" />
      ) : (
        <Heart
          className={
            puppy.likedBy.includes(1)
              ? "fill-pink-500 stroke-none"
              : "stroke-slate-200 group-hover:stroke-slate-300"
          }
        />
      )}
    </button>
  );
}
