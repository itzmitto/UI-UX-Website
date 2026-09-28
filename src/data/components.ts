import { buttons } from "./buttons";
import { inputs } from "./inputs";

export const components = [
  ...buttons,
  ...inputs,
];

export const categories = [
  {
    name: "Buttons",
    slug: "buttons",
  },
  {
    name: "Inputs",
    slug: "inputs",
  },
];