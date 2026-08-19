import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type Ambience = {
  /** true once the visitor taps "Enter" — unlocks autoplay with sound */
  entered: boolean;
  enter: () => void;
  /** true while the music player owns the audio, so ambience stays silent */
  ducked: boolean;
  setDucked: (v: boolean) => void;
  /** user toggle for the ambient sound */
  soundOn: boolean;
  toggleSound: () => void;
};

const Ctx = createContext<Ambience | null>(null);

export function AmbienceProvider({ children }: { children: ReactNode }) {
  const [entered, setEntered] = useState(false);
  const [ducked, setDucked] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  const enter = useCallback(() => setEntered(true), []);
  const toggleSound = useCallback(() => setSoundOn((s) => !s), []);

  const value = useMemo(
    () => ({ entered, enter, ducked, setDucked, soundOn, toggleSound }),
    [entered, enter, ducked, soundOn, toggleSound],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAmbience(): Ambience {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAmbience must be used inside <AmbienceProvider>");
  return v;
}
