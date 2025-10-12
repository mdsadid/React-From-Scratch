import { createContext, Dispatch, SetStateAction, use } from "react";
import { type Puppy } from "../types";

export const PuppiesContext = createContext<{
  puppies: Puppy[];
  setPuppies: Dispatch<SetStateAction<Puppy[]>>;
}>(null);

export function usePuppies() {
  const context = use(PuppiesContext);

  if (!context) {
    throw new Error(
      "The usePuppies hook must be used within a PuppiesContext wrapper",
    );
  }

  return context;
}
