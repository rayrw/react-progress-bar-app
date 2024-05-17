import { useAtom } from "jotai";
import { useEffect } from "react";
import { progressAtom, hiddenAtom } from "./progressBarUtils";

export function ProgressBar() {
  const [hidden] = useAtom(hiddenAtom);
  const [progress, setProgress] = useAtom(progressAtom);

  useEffect(() => {
    let interval: number | null = null;

    if (!hidden) {
      interval = setInterval(() => {
        setProgress((currentProgress) => {
          if (currentProgress >= 0 && currentProgress < 20) {
            return currentProgress + 0.5;
          } else if (currentProgress >= 20 && currentProgress < 50) {
            return currentProgress + 0.2;
          } else if (currentProgress >= 50 && currentProgress < 80) {
            return currentProgress + 0.1;
          } else {
            return Math.min(100, currentProgress + 0.03);
          }
        });
      }, 200);
    } else {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };
  }, [setProgress, hidden]);

  return (
    <div
      className={`h-1 w-[0%] bg-purple-600 transition-all ease-linear duration-200 absolute z-40 top-0 ${hidden ? "opacity-0" : "opacity-100"}`}
      style={{ width: `${progress}%` }}
    />
  );
}
