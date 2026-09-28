import { NavLink } from "react-router-dom";

const categories = [
  {
    name: "Buttons",
    path: "/components/buttons",
  },
  {
    name: "Inputs",
    path: "/components/inputs",
  },
  {
    name: "Cards",
    path: "/components/cards",
  },
  {
    name: "Forms",
    path: "/components/forms",
  },
  {
    name: "Navigation",
    path: "/components/navigation",
  },
  {
    name: "Feedback",
    path: "/components/feedback",
  },
  {
    name: "Overlays",
    path: "/components/overlays",
  },
];

function Sidebar() {
  return (
    <aside className="fixed bottom-0 left-0 top-16 hidden w-64 border-r border-zinc-200 bg-white lg:block">
      <div className="h-full overflow-y-auto px-5 py-8">
        <div className="mb-8">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Overview
          </p>

          <NavLink
            to="/components"
            end
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm transition ${
                isActive
                  ? "bg-zinc-100 font-medium text-zinc-950"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950"
              }`
            }
          >
            All Components
          </NavLink>
        </div>

        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Components
          </p>

          <div className="space-y-1">
            {categories.map((category) => (
              <NavLink
                key={category.name}
                to={category.path}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm transition ${
                    isActive
                      ? "bg-zinc-100 font-medium text-zinc-950"
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950"
                  }`
                }
              >
                {category.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;