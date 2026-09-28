import type { UIComponent } from "../types/component";

export const avatars: UIComponent[] = [
  {
    id: "basic-avatar",
    name: "Basic Avatar",
    description: "Simple circular avatar with user initials.",
    category: "Avatars",

    preview: (
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
        AB
      </div>
    ),

    typescript: `function BasicAvatar() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
      AB
    </div>
  );
}

export default BasicAvatar;`,

    tailwind: `flex
h-14
w-14
items-center
justify-center
rounded-full
bg-zinc-950
text-sm
font-semibold
text-white`,
  },

  {
    id: "status-avatar",
    name: "Status Avatar",
    description: "Avatar with an online status indicator.",
    category: "Avatars",

    preview: (
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-200 text-lg font-semibold text-zinc-700">
          JD
        </div>

        <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
      </div>
    ),

    typescript: `function StatusAvatar() {
  return (
    <div className="relative">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-200 text-lg font-semibold text-zinc-700">
        JD
      </div>

      <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
    </div>
  );
}

export default StatusAvatar;`,

    tailwind: `relative

h-16
w-16
rounded-full

absolute
bottom-0
right-0
h-4
w-4
rounded-full
border-2
border-white
bg-emerald-500`,
  },

  {
    id: "avatar-group",
    name: "Avatar Group",
    description: "Stacked avatars for showing multiple users.",
    category: "Avatars",

    preview: (
      <div className="flex -space-x-3">
        {["AB", "JD", "MK"].map((initials) => (
          <div
            key={initials}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-zinc-800 text-xs font-semibold text-white"
          >
            {initials}
          </div>
        ))}

        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-xs font-semibold text-zinc-600">
          +4
        </div>
      </div>
    ),

    typescript: `function AvatarGroup() {
  const users = ["AB", "JD", "MK"];

  return (
    <div className="flex -space-x-3">
      {users.map((initials) => (
        <div
          key={initials}
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-zinc-800 text-xs font-semibold text-white"
        >
          {initials}
        </div>
      ))}

      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-xs font-semibold">
        +4
      </div>
    </div>
  );
}

export default AvatarGroup;`,

    tailwind: `flex
-space-x-3

h-12
w-12
rounded-full
border-2
border-white`,
  },
];