"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  addDays,
  buildStay,
  startOfDay,
  MAX_NIGHTS,
  MIN_NIGHTS,
  type Stay,
} from "@/lib/stay";

type StayContextValue = {
  /** Null until the client has mounted — the server has no "today". */
  arrival: Date | null;
  nights: number;
  stay: Stay | null;
  today: Date | null;
  setArrival: (date: Date) => void;
  setNights: (nights: number) => void;
};

const StayContext = createContext<StayContextValue | null>(null);

export function StayProvider({ children }: { children: ReactNode }) {
  // Deliberately null on the server: rendering a real date during SSR would
  // hydrate against a different "today" for anyone loading across midnight.
  const [today, setToday] = useState<Date | null>(null);
  const [arrival, setArrivalState] = useState<Date | null>(null);
  const [nights, setNightsState] = useState(2);

  useEffect(() => {
    const now = startOfDay(new Date());
    setToday(now);
    setArrivalState(addDays(now, 1));
  }, []);

  const value = useMemo<StayContextValue>(
    () => ({
      today,
      arrival,
      nights,
      stay: arrival ? buildStay(arrival, nights) : null,
      setArrival: (date) => setArrivalState(startOfDay(date)),
      setNights: (n) => setNightsState(Math.min(MAX_NIGHTS, Math.max(MIN_NIGHTS, n))),
    }),
    [today, arrival, nights]
  );

  return <StayContext.Provider value={value}>{children}</StayContext.Provider>;
}

export function useStay() {
  const ctx = useContext(StayContext);
  if (!ctx) throw new Error("useStay must be used inside StayProvider");
  return ctx;
}
