import create from "zustand";
import { User } from "./types";

type State = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
};

const useStore = create<State>((set) => ({
  user: undefined,
  setUser: (user: User | undefined) => set({ user }),
}));

export default useStore;
