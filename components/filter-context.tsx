"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { DomainId } from "@/lib/domains";

// The domain picked in the hero graph or the Work filters. Shared so that
// clicking a technique in the graph filters the projects below it.
type Ctx = { filter: DomainId | null; setFilter: (d: DomainId | null) => void };

const FilterContext = createContext<Ctx>({ filter: null, setFilter: () => {} });

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<DomainId | null>(null);
  return <FilterContext.Provider value={{ filter, setFilter }}>{children}</FilterContext.Provider>;
}

export const useFilter = () => useContext(FilterContext);
