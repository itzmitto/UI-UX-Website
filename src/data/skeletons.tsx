import type { UIComponent } from "../types/component";

export const skeletons: UIComponent[] = [
  {
    id: "text-skeleton",
    name: "Text Skeleton",
    description: "Animated placeholder for loading text content.",
    category: "Skeletons",

    preview: (
      <div className="w-full max-w-sm animate-pulse space-y-3">
        <div className="h-4 w-3/4 rounded bg-zinc-200" />
        <div className="h-4 w-full rounded bg-zinc-200" />
        <div className="h-4 w-5/6 rounded bg-zinc-200" />
      </div>
    ),

    typescript: `function TextSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 w-3/4 rounded bg-zinc-200" />
      <div className="h-4 w-full rounded bg-zinc-200" />
      <div className="h-4 w-5/6 rounded bg-zinc-200" />
    </div>
  );
}

export default TextSkeleton;`,

    tailwind: `animate-pulse
space-y-3

h-4
rounded
bg-zinc-200`,
  },

  {
    id: "card-skeleton",
    name: "Card Skeleton",
    description: "Loading placeholder for card-based content.",
    category: "Skeletons",

    preview: (
      <div className="w-full max-w-sm animate-pulse rounded-2xl border border-zinc-200 p-5">
        <div className="h-40 rounded-xl bg-zinc-200" />

        <div className="mt-5 h-5 w-2/3 rounded bg-zinc-200" />

        <div className="mt-3 h-4 w-full rounded bg-zinc-200" />

        <div className="mt-2 h-4 w-4/5 rounded bg-zinc-200" />
      </div>
    ),

    typescript: `function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border p-5">
      <div className="h-40 rounded-xl bg-zinc-200" />
      <div className="mt-5 h-5 w-2/3 rounded bg-zinc-200" />
      <div className="mt-3 h-4 w-full rounded bg-zinc-200" />
    </div>
  );
}

export default CardSkeleton;`,

    tailwind: `animate-pulse
rounded-2xl
border
p-5

bg-zinc-200`,
  },

  {
    id: "profile-skeleton",
    name: "Profile Skeleton",
    description: "Loading placeholder for user profile information.",
    category: "Skeletons",

    preview: (
      <div className="flex w-full max-w-sm animate-pulse items-center gap-4">
        <div className="h-14 w-14 shrink-0 rounded-full bg-zinc-200" />

        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/2 rounded bg-zinc-200" />
          <div className="h-3 w-3/4 rounded bg-zinc-200" />
        </div>
      </div>
    ),

    typescript: `function ProfileSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-4">
      <div className="h-14 w-14 rounded-full bg-zinc-200" />

      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/2 rounded bg-zinc-200" />
        <div className="h-3 w-3/4 rounded bg-zinc-200" />
      </div>
    </div>
  );
}

export default ProfileSkeleton;`,

    tailwind: `flex
animate-pulse
items-center
gap-4

rounded-full
bg-zinc-200`,
  },
];