import type { UIComponent } from "../types/component";

export const accordions: UIComponent[] = [
  {
    id: "basic-accordion",
    name: "Basic Accordion",
    description: "Expandable content using native details elements.",
    category: "Accordions",

    preview: (
      <details className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-4">
        <summary className="cursor-pointer list-none text-sm font-semibold text-zinc-950">
          What is this component?
        </summary>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          An accordion hides additional content until the user chooses to expand
          it.
        </p>
      </details>
    ),

    typescript: `function BasicAccordion() {
  return (
    <details className="rounded-xl border border-zinc-200 bg-white p-4">
      <summary className="cursor-pointer list-none text-sm font-semibold">
        What is this component?
      </summary>

      <p className="mt-3 text-sm text-zinc-500">
        Additional content appears here.
      </p>
    </details>
  );
}

export default BasicAccordion;`,

    tailwind: `rounded-xl
border
border-zinc-200
bg-white
p-4

cursor-pointer
list-none`,
  },

  {
    id: "faq-accordion",
    name: "FAQ Accordion",
    description: "A stacked accordion layout for frequently asked questions.",
    category: "Accordions",

    preview: (
      <div className="w-full max-w-md divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
        {[
          ["Can I use these components?", "Yes, copy and customize them."],
          [
            "Are they responsive?",
            "Yes, they use responsive Tailwind utilities.",
          ],
          [
            "Do they support TypeScript?",
            "Yes, the examples are written in TSX.",
          ],
        ].map(([question, answer]) => (
          <details key={question} className="p-4">
            <summary className="cursor-pointer list-none text-sm font-medium text-zinc-950">
              {question}
            </summary>

            <p className="mt-3 text-sm leading-6 text-zinc-500">{answer}</p>
          </details>
        ))}
      </div>
    ),

    typescript: `function FAQAccordion() {
  const items = [
    {
      question: "Can I use these components?",
      answer: "Yes, copy and customize them.",
    },
  ];

  return (
    <div className="divide-y rounded-xl border">
      {items.map((item) => (
        <details key={item.question} className="p-4">
          <summary className="cursor-pointer">
            {item.question}
          </summary>

          <p className="mt-3 text-sm text-zinc-500">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

export default FAQAccordion;`,

    tailwind: `divide-y
divide-zinc-200
rounded-xl
border
border-zinc-200
bg-white`,
  },

  {
    id: "minimal-accordion",
    name: "Minimal Accordion",
    description: "Minimal accordion with a clean divider layout.",
    category: "Accordions",

    preview: (
      <div className="w-full max-w-md">
        <details className="border-b border-zinc-200 py-4">
          <summary className="cursor-pointer list-none text-sm font-medium text-zinc-950">
            Account settings
          </summary>

          <p className="pt-3 text-sm text-zinc-500">
            Manage profile and account preferences.
          </p>
        </details>

        <details className="border-b border-zinc-200 py-4">
          <summary className="cursor-pointer list-none text-sm font-medium text-zinc-950">
            Privacy
          </summary>

          <p className="pt-3 text-sm text-zinc-500">
            Manage privacy and security settings.
          </p>
        </details>
      </div>
    ),

    typescript: `function MinimalAccordion() {
  return (
    <details className="border-b border-zinc-200 py-4">
      <summary className="cursor-pointer list-none text-sm font-medium">
        Account settings
      </summary>

      <p className="pt-3 text-sm text-zinc-500">
        Manage profile and account preferences.
      </p>
    </details>
  );
}

export default MinimalAccordion;`,

    tailwind: `border-b
border-zinc-200
py-4`,
  },
];
