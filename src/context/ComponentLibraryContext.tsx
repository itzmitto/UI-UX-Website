import {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from "react";
import type { UIComponent } from "../types/component";

type ComponentLibraryContextType = {
  selectedComponent: UIComponent | null;
  openComponent: (component: UIComponent) => void;
  closeComponent: () => void;
};

const ComponentLibraryContext =
  createContext<ComponentLibraryContextType | null>(null);

type ComponentLibraryProviderProps = {
  children: ReactNode;
};

export function ComponentLibraryProvider({
  children,
}: ComponentLibraryProviderProps) {
  const [selectedComponent, setSelectedComponent] =
    useState<UIComponent | null>(null);

  const openComponent = (component: UIComponent) => {
    setSelectedComponent(component);
  };

  const closeComponent = () => {
    setSelectedComponent(null);
  };

  return (
    <ComponentLibraryContext.Provider
      value={{
        selectedComponent,
        openComponent,
        closeComponent,
      }}
    >
      {children}
    </ComponentLibraryContext.Provider>
  );
}

export function useComponentLibrary() {
  const context = useContext(ComponentLibraryContext);

  if (!context) {
    throw new Error(
      "useComponentLibrary must be used inside ComponentLibraryProvider",
    );
  }

  return context;
}