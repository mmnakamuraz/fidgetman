import { createContext, useContext, useState, type ReactNode } from 'react';
import { createClipboardState, type ClipboardState } from '../tools/system/clipboard/core';

type StoreContextValue = {
  clipboardState: ClipboardState;
  setClipboardState: (state: ClipboardState) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

type Props = { children: ReactNode };

export function StoreManager({ children }: Props) {
  const [clipboardState, setClipboardState] = useState<ClipboardState>(createClipboardState);

  return <StoreContext.Provider value={{ clipboardState, setClipboardState }}>{children}</StoreContext.Provider>;
}

export function useClipboardStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useClipboardStore must be used within StoreManager.');
  return store;
}
