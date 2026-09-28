import type { UIComponent } from "../../types/component";

type ComponentCardProps = {
  component: UIComponent;
  onClick: () => void;
};

function ComponentCard({
  component,
  onClick,
}: ComponentCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left"
    >
      <div className="flex h-52 items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition duration-200 group-hover:border-zinc-300 group-hover:bg-zinc-100">
        {component.preview}
      </div>

      <div className="mt-3">
        <h3 className="text-sm font-semibold text-zinc-950">
          {component.name}
        </h3>

        <p className="mt-1 text-sm leading-5 text-zinc-500">
          {component.description}
        </p>
      </div>
    </button>
  );
}

export default ComponentCard;