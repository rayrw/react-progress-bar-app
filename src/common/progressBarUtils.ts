import { atom } from "jotai";
import { store } from "app/store";

export const progressAtom = atom(0);
export const hiddenAtom = atom(true);

export function startProgressBar() {
  store.set(progressAtom, 0);
  setTimeout(() => {
    store.set(hiddenAtom, false);
  }, 200);
}

export function finishProgressBar() {
  store.set(progressAtom, 100);
  setTimeout(() => {
    store.set(hiddenAtom, true);
  }, 500);
}
