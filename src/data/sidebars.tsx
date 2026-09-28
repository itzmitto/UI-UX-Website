import {
  Bell,
  Folder,
  Home,
  Settings,
  Users,
} from "lucide-react";
import type { UIComponent } from "../types/component";

export const sidebars: UIComponent[] = [
  {
    id: "basic-sidebar",
    name: "Basic Sidebar",
    description: "Simple navigation sidebar for dashboards.",
    category: "Sidebars",

    preview: (
      <aside className="w-56 rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
        <div className="mb-4 px-3 py-2 text-sm font-semibold text-zinc-950">
          Dashboard
        </div>

        <nav className="space-y-1">
          <button className="flex w-full items-center gap-3 rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-950">
            <Home size={16} />
            Home
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-100">
            <Folder size={16} />
            Projects
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-100">
            <Settings size={16} />
            Settings
          </button>
        </nav>
      </aside>
    ),

    typescript: `import {
  Folder,
  Home,
  Settings,
} from "lucide-react";

function BasicSidebar() {
  return (
    <aside className="w-56 rounded-2xl border border-zinc-200 bg-white p-3">
      <div className="mb-4 px-3 py-2 font-semibold">
        Dashboard
      </div>

      <nav className="space-y-1">
        <button className="flex w-full items-center gap-3 rounded-lg bg-zinc-100 px-3 py-2">
          <Home size={16} />
          Home
        </button>

        <button className="flex w-full items-center gap-3 px-3 py-2">
          <Folder size={16} />
          Projects
        </button>

        <button className="flex w-full items-center gap-3 px-3 py-2">
          <Settings size={16} />
          Settings
        </button>
      </nav>
    </aside>
  );
}

export default BasicSidebar;`,

    tailwind: `w-56
rounded-2xl
border
border-zinc-200
bg-white
p-3

space-y-1`,
  },

  {
    id: "icon-sidebar",
    name: "Icon Sidebar",
    description: "Compact sidebar navigation using icons only.",
    category: "Sidebars",

    preview: (
      <aside className="flex w-16 flex-col items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm">
        <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-950 text-white">
          <Home size={17} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100">
          <Folder size={17} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100">
          <Bell size={17} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100">
          <Settings size={17} />
        </button>
      </aside>
    ),

    typescript: `import {
  Bell,
  Folder,
  Home,
  Settings,
} from "lucide-react";

function IconSidebar() {
  return (
    <aside className="flex w-16 flex-col items-center gap-2 rounded-2xl border p-2">
      <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-950 text-white">
        <Home size={17} />
      </button>

      <button>
        <Folder size={17} />
      </button>

      <button>
        <Bell size={17} />
      </button>

      <button>
        <Settings size={17} />
      </button>
    </aside>
  );
}

export default IconSidebar;`,

    tailwind: `flex
w-16
flex-col
items-center
gap-2
rounded-2xl
border
p-2`,
  },

  {
    id: "workspace-sidebar",
    name: "Workspace Sidebar",
    description: "Sidebar with workspace information and team navigation.",
    category: "Sidebars",

    preview: (
      <aside className="w-64 rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 text-xs font-bold text-white">
            UX
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-950">
              UI Workspace
            </p>

            <p className="text-xs text-zinc-400">
              Pro plan
            </p>
          </div>
        </div>

        <nav className="mt-4 space-y-1">
          <button className="flex w-full items-center gap-3 rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium">
            <Home size={16} />
            Overview
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-100">
            <Users size={16} />
            Team
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-100">
            <Folder size={16} />
            Projects
          </button>
        </nav>
      </aside>
    ),

    typescript: `import {
  Folder,
  Home,
  Users,
} from "lucide-react";

function WorkspaceSidebar() {
  return (
    <aside className="w-64 rounded-2xl border p-3">
      <div className="flex items-center gap-3 rounded-xl border p-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 text-white">
          UX
        </div>

        <div>
          <p className="font-semibold">
            UI Workspace
          </p>

          <p className="text-xs text-zinc-400">
            Pro plan
          </p>
        </div>
      </div>

      <nav className="mt-4 space-y-1">
        <button>
          <Home size={16} />
          Overview
        </button>

        <button>
          <Users size={16} />
          Team
        </button>

        <button>
          <Folder size={16} />
          Projects
        </button>
      </nav>
    </aside>
  );
}

export default WorkspaceSidebar;`,

    tailwind: `w-64
rounded-2xl
border
border-zinc-200
bg-white
p-3`,
  },
];