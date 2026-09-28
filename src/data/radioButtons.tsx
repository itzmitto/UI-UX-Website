import type { UIComponent } from "../types/component";

export const radioButtons: UIComponent[] = [
  {
    id: "basic-radio-group",
    name: "Basic Radio Group",
    description: "Basic radio buttons for single-choice selections.",
    category: "Radio Buttons",

    preview: (
      <div className="space-y-3">
        {["Small", "Medium", "Large"].map((size, index) => (
          <label key={size} className="flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name="basic-radio-preview"
              defaultChecked={index === 1}
              className="h-4 w-4 accent-zinc-950"
            />

            <span className="text-sm text-zinc-700">{size}</span>
          </label>
        ))}
      </div>
    ),

    typescript: `function BasicRadioGroup() {
  return (
    <div className="space-y-3">
      {["Small", "Medium", "Large"].map((size) => (
        <label
          key={size}
          className="flex items-center gap-3"
        >
          <input
            type="radio"
            name="size"
            className="h-4 w-4 accent-zinc-950"
          />

          <span className="text-sm text-zinc-700">
            {size}
          </span>
        </label>
      ))}
    </div>
  );
}

export default BasicRadioGroup;`,

    tailwind: `space-y-3

flex
items-center
gap-3

h-4
w-4
accent-zinc-950`,
  },

  {
    id: "plan-selector",
    name: "Plan Selector",
    description: "Radio cards for selecting a pricing plan.",
    category: "Radio Buttons",

    preview: (
      <div className="grid w-full max-w-md gap-3">
        {[
          ["Basic", "€9 / month"],
          ["Pro", "€19 / month"],
        ].map(([name, price], index) => (
          <label
            key={name}
            className="flex cursor-pointer items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4"
          >
            <input
              type="radio"
              name="plan-preview"
              defaultChecked={index === 1}
              className="h-4 w-4 accent-zinc-950"
            />

            <div className="flex-1">
              <p className="text-sm font-semibold text-zinc-950">{name}</p>

              <p className="mt-1 text-xs text-zinc-500">{price}</p>
            </div>
          </label>
        ))}
      </div>
    ),

    typescript: `function PlanSelector() {
  return (
    <div className="grid gap-3">
      <label className="flex items-center gap-4 rounded-xl border p-4">
        <input type="radio" name="plan" />

        <div>
          <p className="font-semibold">Basic</p>
          <p className="text-xs text-zinc-500">
            €9 / month
          </p>
        </div>
      </label>
    </div>
  );
}

export default PlanSelector;`,

    tailwind: `grid
gap-3

flex
items-center
gap-4
rounded-xl
border
border-zinc-200
bg-white
p-4`,
  },

  {
    id: "inline-radio",
    name: "Inline Radio",
    description: "Compact horizontal radio button group.",
    category: "Radio Buttons",

    preview: (
      <div className="flex items-center gap-5">
        {["Public", "Private", "Draft"].map((label, index) => (
          <label key={label} className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="visibility-preview"
              defaultChecked={index === 0}
              className="h-4 w-4 accent-zinc-950"
            />

            <span className="text-sm text-zinc-600">{label}</span>
          </label>
        ))}
      </div>
    ),

    typescript: `function InlineRadio() {
  return (
    <div className="flex items-center gap-5">
      {["Public", "Private", "Draft"].map((option) => (
        <label
          key={option}
          className="flex items-center gap-2"
        >
          <input
            type="radio"
            name="visibility"
            className="h-4 w-4 accent-zinc-950"
          />

          <span className="text-sm">
            {option}
          </span>
        </label>
      ))}
    </div>
  );
}

export default InlineRadio;`,

    tailwind: `flex
items-center
gap-5`,
  },
];
