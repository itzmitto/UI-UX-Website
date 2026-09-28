import type { UIComponent } from "../types/component";

export const tables: UIComponent[] = [
  {
    id: "basic-table",
    name: "Basic Table",
    description: "Clean table for displaying structured data.",
    category: "Tables",

    preview: (
      <div className="w-full overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs text-zinc-500">
            <tr>
              <th className="px-4 py-3 font-medium">
                Name
              </th>

              <th className="px-4 py-3 font-medium">
                Role
              </th>

              <th className="px-4 py-3 font-medium">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-950">
                Alice
              </td>

              <td className="px-4 py-3 text-zinc-500">
                Designer
              </td>

              <td className="px-4 py-3">
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                  Active
                </span>
              </td>
            </tr>

            <tr>
              <td className="px-4 py-3 font-medium text-zinc-950">
                John
              </td>

              <td className="px-4 py-3 text-zinc-500">
                Developer
              </td>

              <td className="px-4 py-3">
                <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600">
                  Offline
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),

    typescript: `function BasicTable() {
  return (
    <table className="w-full text-left text-sm">
      <thead className="border-b bg-zinc-50 text-xs text-zinc-500">
        <tr>
          <th className="px-4 py-3">Name</th>
          <th className="px-4 py-3">Role</th>
          <th className="px-4 py-3">Status</th>
        </tr>
      </thead>

      <tbody className="divide-y">
        <tr>
          <td className="px-4 py-3">Alice</td>
          <td className="px-4 py-3">Designer</td>
          <td className="px-4 py-3">Active</td>
        </tr>
      </tbody>
    </table>
  );
}

export default BasicTable;`,

    tailwind: `w-full
text-left
text-sm

border-b
bg-zinc-50

px-4
py-3`,
  },

  {
    id: "pricing-table",
    name: "Pricing Table",
    description: "Compact pricing comparison table.",
    category: "Tables",

    preview: (
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-zinc-500">
                Plan
              </th>

              <th className="px-4 py-3 text-center font-medium text-zinc-500">
                Projects
              </th>

              <th className="px-4 py-3 text-right font-medium text-zinc-500">
                Price
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            <tr>
              <td className="px-4 py-3 font-medium">
                Starter
              </td>
              <td className="px-4 py-3 text-center text-zinc-500">
                5
              </td>
              <td className="px-4 py-3 text-right font-medium">
                €9
              </td>
            </tr>

            <tr>
              <td className="px-4 py-3 font-medium">
                Pro
              </td>
              <td className="px-4 py-3 text-center text-zinc-500">
                Unlimited
              </td>
              <td className="px-4 py-3 text-right font-medium">
                €29
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),

    typescript: `function PricingTable() {
  return (
    <table className="w-full text-sm">
      <thead className="bg-zinc-50">
        <tr>
          <th>Plan</th>
          <th>Projects</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody className="divide-y">
        <tr>
          <td>Starter</td>
          <td>5</td>
          <td>€9</td>
        </tr>
      </tbody>
    </table>
  );
}

export default PricingTable;`,

    tailwind: `w-full
text-sm

bg-zinc-50

divide-y
divide-zinc-100`,
  },

  {
    id: "activity-table",
    name: "Activity Table",
    description: "Table layout for recent activity and events.",
    category: "Tables",

    preview: (
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="border-b border-zinc-200 px-4 py-3">
          <h3 className="text-sm font-semibold text-zinc-950">
            Recent activity
          </h3>
        </div>

        <div className="divide-y divide-zinc-100">
          {[
            ["Project created", "2 min ago"],
            ["Profile updated", "1 hour ago"],
            ["Team member invited", "Yesterday"],
          ].map(([activity, time]) => (
            <div
              key={activity}
              className="flex items-center justify-between px-4 py-3"
            >
              <span className="text-sm text-zinc-700">
                {activity}
              </span>

              <span className="text-xs text-zinc-400">
                {time}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),

    typescript: `function ActivityTable() {
  const activities = [
    ["Project created", "2 min ago"],
    ["Profile updated", "1 hour ago"],
    ["Team member invited", "Yesterday"],
  ];

  return (
    <div className="divide-y rounded-xl border">
      {activities.map(([activity, time]) => (
        <div
          key={activity}
          className="flex items-center justify-between px-4 py-3"
        >
          <span>{activity}</span>
          <span className="text-xs text-zinc-400">
            {time}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ActivityTable;`,

    tailwind: `divide-y
rounded-xl
border

flex
items-center
justify-between
px-4
py-3`,
  },
];