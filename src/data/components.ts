import { accordions } from "./accordions";
import { advancedComponents } from "./advancedComponents";
import { advancedInteractions } from "./advancedInteractions";
import { avatars } from "./avatars";
import { buttons } from "./buttons";
import { cards } from "./cards";
import { carousels } from "./carousels";
import { checkboxes } from "./checkboxes";
import { checkouts } from "./checkouts";
import { commandBars } from "./commandBars";
import { datePickers } from "./datePickers";
import { emptyStates } from "./emptyStates";
import { feedback } from "./feedback";
import { flyIns } from "./flyIns";
import { forms } from "./forms";
import { heroSections } from "./heroSections";
import { inputs } from "./inputs";
import { kanbanBoards } from "./kanbanBoards";
import { layouts } from "./layouts";
import { loaders } from "./loaders";
import { navigation } from "./navigation";
import { overlays } from "./overlays";
import { pagination } from "./pagination";
import { precisionRangeSlider } from "./precisionRangeSlider";
import { progressBars } from "./progressBars";
import { radioButtons } from "./radioButtons";
import { sidebars } from "./sidebars";
import { skeletons } from "./skeletons";
import { tables } from "./tables";
import { toggles } from "./toggles";

export const components = [
  ...buttons,
  ...inputs,
  ...cards,
  ...forms,
  ...navigation,
  ...feedback,
  ...overlays,
  ...checkboxes,
  ...toggles,
  ...radioButtons,
  ...accordions,
  ...pagination,
  ...skeletons,
  ...avatars,
  ...progressBars,
  ...tables,
  ...heroSections,
  ...loaders,
  ...sidebars,
  ...carousels,
  ...emptyStates,
  ...advancedComponents,
  ...advancedInteractions,
  ...precisionRangeSlider,
  ...flyIns,
  ...datePickers,
  ...commandBars,
  ...layouts,
  ...kanbanBoards,
  ...checkouts,
];

export function slugifyCategory(
  category: string,
) {
  return category
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

export const categories =
  Array.from(
    new Set(
      components.map(
        (component) =>
          component.category,
      ),
    ),
  ).map((name) => ({
    name,
    slug:
      slugifyCategory(name),
  }));