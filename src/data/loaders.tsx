import type { UIComponent } from "../types/component";

export const loaders: UIComponent[] = [
  {
    id: "spinner-loader",
    name: "Spinner Loader",
    description: "A simple circular loading indicator.",
    category: "Loaders",

    preview: (
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-950" />
    ),

    typescript: `function SpinnerLoader() {
  return (
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-950" />
  );
}

export default SpinnerLoader;`,

    tailwind: `h-10
w-10
animate-spin
rounded-full
border-4
border-zinc-200
border-t-zinc-950`,
  },

  {
    id: "dots-loader",
    name: "Dots Loader",
    description: "Animated dots for compact loading states.",
    category: "Loaders",

    preview: (
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 animate-bounce rounded-full bg-zinc-950 [animation-delay:-0.3s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-zinc-950 [animation-delay:-0.15s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-zinc-950" />
      </div>
    ),

    typescript: `function DotsLoader() {
  return (
    <div className="flex items-center gap-2">
      <span className="h-3 w-3 animate-bounce rounded-full bg-zinc-950 [animation-delay:-0.3s]" />
      <span className="h-3 w-3 animate-bounce rounded-full bg-zinc-950 [animation-delay:-0.15s]" />
      <span className="h-3 w-3 animate-bounce rounded-full bg-zinc-950" />
    </div>
  );
}

export default DotsLoader;`,

    tailwind: `flex
items-center
gap-2

h-3
w-3
animate-bounce
rounded-full
bg-zinc-950`,
  },

  {
    id: "pulse-loader",
    name: "Pulse Loader",
    description: "Soft pulsing loader for background loading states.",
    category: "Loaders",

    preview: (
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute h-full w-full animate-ping rounded-full bg-zinc-300 opacity-60" />

        <div className="relative h-8 w-8 rounded-full bg-zinc-950" />
      </div>
    ),

    typescript: `function PulseLoader() {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center">
      <div className="absolute h-full w-full animate-ping rounded-full bg-zinc-300 opacity-60" />

      <div className="relative h-8 w-8 rounded-full bg-zinc-950" />
    </div>
  );
}

export default PulseLoader;`,

    tailwind: `relative
flex
h-16
w-16
items-center
justify-center

absolute
animate-ping
rounded-full
bg-zinc-300`,
  },
];