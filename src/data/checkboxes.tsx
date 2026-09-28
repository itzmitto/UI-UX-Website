import type { UIComponent } from "../types/component";

export const checkboxes: UIComponent[] = [
  {
    id: "basic-checkbox",
    name: "Basic Checkbox",
    description: "A simple checkbox with a clear label.",
    category: "Checkboxes",

    preview: (
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-zinc-300 accent-zinc-950"
        />
        <span className="text-sm font-medium text-zinc-700">Remember me</span>
      </label>
    ),

    typescript: `function BasicCheckbox() {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-zinc-300 accent-zinc-950"
      />
      <span className="text-sm font-medium text-zinc-700">
        Remember me
      </span>
    </label>
  );
}

export default BasicCheckbox;`,

    tailwind: `flex
cursor-pointer
items-center
gap-3

h-4
w-4
rounded
border-zinc-300
accent-zinc-950`,
  },

  {
    id: "checkbox-card",
    name: "Checkbox Card",
    description: "Selectable card with an integrated checkbox.",
    category: "Checkboxes",

    preview: (
      <label className="flex w-full max-w-sm cursor-pointer items-start gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300">
        <input
          type="checkbox"
          defaultChecked
          className="mt-1 h-4 w-4 accent-zinc-950"
        />

        <div>
          <p className="text-sm font-semibold text-zinc-950">
            Email notifications
          </p>

          <p className="mt-1 text-sm leading-5 text-zinc-500">
            Receive important updates by email.
          </p>
        </div>
      </label>
    ),

    typescript: `function CheckboxCard() {
  return (
    <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-zinc-200 bg-white p-4">
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 accent-zinc-950"
      />

      <div>
        <p className="text-sm font-semibold text-zinc-950">
          Email notifications
        </p>

        <p className="mt-1 text-sm text-zinc-500">
          Receive important updates by email.
        </p>
      </div>
    </label>
  );
}

export default CheckboxCard;`,

    tailwind: `flex
cursor-pointer
items-start
gap-4
rounded-xl
border
border-zinc-200
bg-white
p-4`,
  },

  {
    id: "checkbox-group",
    name: "Checkbox Group",
    description: "A group of checkbox options for multiple selections.",
    category: "Checkboxes",

    preview: (
      <div className="w-full max-w-xs">
        <p className="mb-3 text-sm font-semibold text-zinc-950">
          Notifications
        </p>

        <div className="space-y-3">
          {["Email", "Push notifications", "SMS"].map((label, index) => (
            <label
              key={label}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                defaultChecked={index === 0}
                className="h-4 w-4 accent-zinc-950"
              />

              <span className="text-sm text-zinc-600">{label}</span>
            </label>
          ))}
        </div>
      </div>
    ),

    typescript: `function CheckboxGroup() {
  const options = [
    "Email",
    "Push notifications",
    "SMS",
  ];

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-3"
        >
          <input
            type="checkbox"
            className="h-4 w-4 accent-zinc-950"
          />
          <span className="text-sm text-zinc-600">
            {option}
          </span>
        </label>
      ))}
    </div>
  );
}

export default CheckboxGroup;`,

    tailwind: `space-y-3

flex
items-center
gap-3

h-4
w-4
accent-zinc-950`,
  },
];
