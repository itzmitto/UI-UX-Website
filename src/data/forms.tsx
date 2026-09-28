import type { UIComponent } from "../types/component";

export const forms: UIComponent[] = [
  {
    id: "login-form",
    name: "Login Form",
    description: "A clean login form with email and password fields.",
    category: "Forms",

    preview: (
      <form
        className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        onSubmit={(event) => event.preventDefault()}
      >
        <h3 className="text-xl font-semibold text-zinc-950">Welcome back</h3>

        <p className="mt-1 text-sm text-zinc-500">Sign in to your account.</p>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Email
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
          />
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Sign in
        </button>
      </form>
    ),

    typescript: `function LoginForm() {
  return (
    <form
      className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
      onSubmit={(event) => event.preventDefault()}
    >
      <h3 className="text-xl font-semibold text-zinc-950">
        Welcome back
      </h3>

      <p className="mt-1 text-sm text-zinc-500">
        Sign in to your account.
      </p>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-zinc-700">
          Email
        </label>

        <input
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        />
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium text-zinc-700">
          Password
        </label>

        <input
          type="password"
          placeholder="••••••••"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
      >
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;`,

    tailwind: `Form:
w-full
max-w-sm
rounded-2xl
border
border-zinc-200
bg-white
p-6
shadow-sm

Input:
w-full
rounded-lg
border
border-zinc-300
px-3
py-2.5
text-sm
outline-none
focus:border-zinc-950
focus:ring-2
focus:ring-zinc-950/10`,
  },

  {
    id: "contact-form",
    name: "Contact Form",
    description: "Contact form with name, email and message fields.",
    category: "Forms",

    preview: (
      <form
        className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        onSubmit={(event) => event.preventDefault()}
      >
        <h3 className="text-xl font-semibold text-zinc-950">Contact us</h3>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Name"
            className="rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-950"
          />

          <input
            type="email"
            placeholder="Email"
            className="rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-950"
          />
        </div>

        <textarea
          rows={4}
          placeholder="How can we help?"
          className="mt-4 w-full resize-none rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-950"
        />

        <button
          type="submit"
          className="mt-4 rounded-lg bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Send message
        </button>
      </form>
    ),

    typescript: `function ContactForm() {
  return (
    <form
      className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
      onSubmit={(event) => event.preventDefault()}
    >
      <h3 className="text-xl font-semibold text-zinc-950">
        Contact us
      </h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Name"
          className="rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-950"
        />

        <input
          type="email"
          placeholder="Email"
          className="rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-950"
        />
      </div>

      <textarea
        rows={4}
        placeholder="How can we help?"
        className="mt-4 w-full resize-none rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-950"
      />

      <button
        type="submit"
        className="mt-4 rounded-lg bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
      >
        Send message
      </button>
    </form>
  );
}

export default ContactForm;`,

    tailwind: `rounded-2xl
border
border-zinc-200
bg-white
p-6
shadow-sm

grid
gap-4
sm:grid-cols-2

rounded-lg
border
border-zinc-300
px-3
py-2.5
text-sm`,
  },

  {
    id: "newsletter-form",
    name: "Newsletter Form",
    description: "Compact newsletter signup form for email subscriptions.",
    category: "Forms",

    preview: (
      <div className="w-full max-w-md rounded-2xl bg-zinc-950 p-6 text-white">
        <h3 className="text-xl font-semibold">Stay updated</h3>

        <p className="mt-2 text-sm text-zinc-400">
          Get new components and updates in your inbox.
        </p>

        <div className="mt-5 flex gap-2">
          <input
            type="email"
            placeholder="Email address"
            className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500"
          />

          <button className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-zinc-950 hover:bg-zinc-200">
            Subscribe
          </button>
        </div>
      </div>
    ),

    typescript: `function NewsletterForm() {
  return (
    <div className="w-full max-w-md rounded-2xl bg-zinc-950 p-6 text-white">
      <h3 className="text-xl font-semibold">
        Stay updated
      </h3>

      <p className="mt-2 text-sm text-zinc-400">
        Get new components and updates in your inbox.
      </p>

      <div className="mt-5 flex gap-2">
        <input
          type="email"
          placeholder="Email address"
          className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-500"
        />

        <button className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-zinc-950 hover:bg-zinc-200">
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default NewsletterForm;`,

    tailwind: `rounded-2xl
bg-zinc-950
p-6
text-white

flex
gap-2

bg-zinc-900
border-zinc-700`,
  },
];
