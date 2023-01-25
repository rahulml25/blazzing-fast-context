import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore,
} from "react";

export default function createFastContext<Store>(initalState: Store) {
  function useStoreData(): {
    get(): Store;
    set(value: Partial<Store>): void;
    subscribe(callback: () => void): () => void;
  } {
    const store = useRef(initalState);

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

  type useStoreDataReturnType = ReturnType<typeof useStoreData>;

  const StoreContext = createContext<useStoreDataReturnType>(
    {} as unknown as useStoreDataReturnType
  );

  function useStore<SelectorOutput>(
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

  const Provider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => (
    <StoreContext.Provider value={useStoreData()}>
      {children}
    </StoreContext.Provider>
  );

  return {
    Provider,
    useStore,
  };
}
