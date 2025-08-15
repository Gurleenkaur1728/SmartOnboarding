import React, { createContext, useContext, useMemo, useState } from "react";
import { useWindowDimensions } from "react-native";

type SidebarCtx = {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: boolean;
  isSmall: boolean;
  width: number;
  sidebarWidth: number;
};

const Ctx = createContext<SidebarCtx | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions();
  const isSmall = width < 820; // same breakpoint you used
  const [isOpen, setOpen] = useState(false);
  const sidebarWidth = Math.min(280, width * 0.85);

  const value = useMemo(
    () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen((v) => !v),
      isOpen,
      isSmall,
      width,
      sidebarWidth,
    }),
    [isOpen, isSmall, width, sidebarWidth]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSidebar() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSidebar must be used inside <SidebarProvider>");
  return v;
}
