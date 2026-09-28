const categories = [
  {
    title: "Buttons",
    components: ["Primary Button", "Secondary Button", "Icon Button"],
  },
  {
    title: "Inputs",
    components: ["Text Input", "Search Input", "Password Input"],
  },
  {
    title: "Cards",
    components: ["Basic Card", "Profile Card", "Product Card"],
  },
  {
    title: "Forms",
    components: ["Login Form", "Contact Form", "Newsletter Form"],
  },
  {
    title: "Navigation",
    components: ["Navbar", "Tabs", "Breadcrumbs"],
  },
  {
    title: "Feedback",
    components: ["Alert", "Toast", "Badge"],
  },
  {
    title: "Overlays",
    components: ["Modal", "Dropdown", "Tooltip"],
  },
];

function Components() {
  return (
    <div>
      <div className="mb-12">
        <p className="mb-2 text-sm font-medium text-blue-600">Components</p>

        <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
          All Components
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
          Explore reusable React and Tailwind CSS components. Select a component
          to view its preview, TypeScript code and Tailwind styling.
        </p>
      </div>

      <div className="space-y-14">
        {categories.map((category) => (
          <section key={category.title}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-zinc-950">
                {category.title}
              </h2>

              <button
                type="button"
                className="text-sm font-medium text-zinc-500 transition hover:text-zinc-950"
              >
                View all
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {category.components.map((component) => (
                <button
                  key={component}
                  type="button"
                  className="group text-left"
                >
                  <div className="flex h-48 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 transition duration-200 group-hover:border-zinc-300 group-hover:bg-zinc-100">
                    <div className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm">
                      {component}
                    </div>
                  </div>

                  <p className="mt-3 text-sm font-medium text-zinc-900">
                    {component}
                  </p>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Components;
