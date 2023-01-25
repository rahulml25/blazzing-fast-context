"use client";

import "@/styles/tailwind.css";
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore,
} from "react";
import ContentContainer from "@/components/ContentContainer";

type Store = {
  first: string;
  last: string;
};

export function useStoreData(): {
  get(): Store;
  set(value: Partial<Store>): void;
  subscribe(callback: () => void): () => void;
} {
  const store = useRef({
    first: "",
    last: "",
  });

  const get = useCallback(() => store.current, []);

  const subscribers = useRef(new Set<() => void>());

  const set = useCallback((value: Partial<Store>) => {
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

export function useStore<SelectorOutput>(
  selector: (store: Store) => SelectorOutput
): [SelectorOutput, (value: Partial<Store>) => void] {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("Store not found");
  }

  const state = useSyncExternalStore(store.subscribe, () =>
    selector(store.get())
  );

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
