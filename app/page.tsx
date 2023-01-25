"use client";

import "@/styles/tailwind.css";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ContentContainer from "@/components/ContentContainer";

type StoreType = {
  first: string;
  last: string;
};

export function useStoreData(): {
  get(): StoreType;
  set(value: Partial<StoreType>): void;
  subscribe(callback: () => void): () => void;
} {
  const store = useRef({
    first: "",
    last: "",
  });

  const get = useCallback(() => store.current, []);

  const subscribers = useRef(new Set<() => void>());

  const set = useCallback((value: Partial<StoreType>) => {
    store.current = { ...store.current, ...value };
    subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  return {
    get,
    set,
    subscribe,
  };
}

export function useStore(): [StoreType, (value: Partial<StoreType>) => void] {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("Store not found");
  }

  const [state, setState] = useState(store.get());

  useEffect(() => {
    return store.subscribe(() => setState(store.get()));
  }, []);

  return [state, store.set];
}

type useStoreDataReturnType = ReturnType<typeof useStoreData>;

export const StoreContext = createContext<useStoreDataReturnType>(
  {} as unknown as useStoreDataReturnType
);

const StoreContextProvider = ({ children }: { children: React.ReactNode }) => (
  <StoreContext.Provider value={useStoreData()}>
    {children}
  </StoreContext.Provider>
);

export default function HomePage() {
  return (
    <StoreContextProvider>
      <div className="max-w-xl mx-auto py-20 px-9 border mt-12">
        <h1 className="font-bold text-4xl mb-7">App</h1>
        <ContentContainer />
      </div>
    </StoreContextProvider>
  );
}
