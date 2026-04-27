import { create } from "zustand";

interface LoaderState {
  done: boolean;
  setDone: () => void;
}

export const useLoaderStore = create<LoaderState>((set) => ({
  done: false,
  setDone: () => set({ done: true }),
}));
