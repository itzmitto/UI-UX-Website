import {
  Check,
  Copy,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const commands = {
  create: "npm create vite@latest my-app -- --template react-ts",
  install:
    "npm install tailwindcss @tailwindcss/vite lucide-react react-router-dom",
  start: "npm run dev",
};

type CommandKey = keyof typeof commands;

function Installation() {
  const [copied, setCopied] = useState<CommandKey | null>(
    null,
  );

  const copyCommand = async (
    key: CommandKey,
    command: string,
  ) => {
    await navigator.clipboard.writeText(command);

    setCopied(key);

    window.setTimeout(() => {
      setCopied(null);
    }, 1500);
  };

  const CommandBlock = ({
    commandKey,
    command,
  }: {
    commandKey: CommandKey;
    command: string;
  }) => (
    <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800 bg-[#282c34]">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#21252b] px-4 py-2.5">
        <span className="text-xs text-zinc-500">
          Terminal
        </span>

        <button
          type="button"
          onClick={() =>
            copyCommand(commandKey, command)
          }
          className="flex items-center gap-2 rounded-md px-2 py-1 text-xs text-zinc-400 transition hover:bg-white/10 hover:text-white"
        >
          {copied === commandKey ? (
            <>
              <Check size={13} />
              Copied
            </>
          ) : (
            <>
              <Copy size={13} />
              Copy
            </>
          )}
        </button>
      </div>

      <pre className="overflow-x-auto p-4 text-sm text-zinc-300">
        <code>{command}</code>
      </pre>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10">
        <p className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
          Getting Started
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
          Installation
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
          Set up a React, TypeScript and Tailwind CSS project before
          using components from the library.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">
              1
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">
                Create a React project
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                Create a new Vite project using the React and TypeScript
                template.
              </p>

              <CommandBlock
                commandKey="create"
                command={commands.create}
              />
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">
              2
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">
                Install dependencies
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                Install Tailwind CSS and the packages used by your
                application.
              </p>

              <CommandBlock
                commandKey="install"
                command={commands.install}
              />
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">
              3
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">
                Start development
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                Start the local Vite development server.
              </p>

              <CommandBlock
                commandKey="start"
                command={commands.start}
              />
            </div>
          </div>
        </section>
      </div>

      <div className="mt-14 grid gap-3 border-t border-zinc-200 pt-8 sm:grid-cols-2 dark:border-zinc-800">
        <Link
          to="/docs/introduction"
          className="rounded-xl border border-zinc-200 p-5 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
        >
          <p className="text-xs text-zinc-400">
            Previous
          </p>

          <p className="mt-1 font-medium text-zinc-950 dark:text-white">
            ← Introduction
          </p>
        </Link>

        <Link
          to="/components"
          className="rounded-xl border border-zinc-200 p-5 text-right transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
        >
          <p className="text-xs text-zinc-400">
            Next
          </p>

          <p className="mt-1 font-medium text-zinc-950 dark:text-white">
            Components →
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Installation;