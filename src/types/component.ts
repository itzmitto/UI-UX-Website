import type { ReactNode } from "react";

export type UIComponent = {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: ReactNode;
  typescript: string;
  tailwind: string;
};