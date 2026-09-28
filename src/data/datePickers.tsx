import AdaptiveDateRangePickerPreview from "../components/previews/AdaptiveDateRangePickerPreview";
import type { UIComponent } from "../types/component";

export const datePickers: UIComponent[] = [
  {
    id: "adaptive-date-range-picker",
    name: "Adaptive Date Range Picker",
    description:
      "Interactive date-range calendar with hover previews, month navigation, quick presets, live duration calculations and accessible date controls.",
    category: "Date Pickers",

    preview: <AdaptiveDateRangePickerPreview />,

    typescript: `import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";

type DateRange = {
  start: Date | null;
  end: Date | null;
};

function dayNumber(
  date: Date,
) {
  return (
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ) / 86400000
  );
}

function addDays(
  date: Date,
  amount: number,
) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + amount,
  );
}

function sameDay(
  first: Date | null,
  second: Date | null,
) {
  if (!first || !second) {
    return false;
  }

  return (
    first.getFullYear() ===
      second.getFullYear() &&
    first.getMonth() ===
      second.getMonth() &&
    first.getDate() ===
      second.getDate()
  );
}

function DateRangePicker() {
  const today =
    useMemo(
      () =>
        new Date(),
      [],
    );

  const [range, setRange] =
    useState<DateRange>({
      start: today,
      end: addDays(
        today,
        6,
      ),
    });

  const [hoverDate, setHoverDate] =
    useState<Date | null>(
      null,
    );

  const [selectingEnd, setSelectingEnd] =
    useState(false);

  const selectDate = (
    date: Date,
  ) => {
    if (
      !range.start ||
      range.end
    ) {
      setRange({
        start: date,
        end: null,
      });

      setSelectingEnd(true);
      return;
    }

    if (
      dayNumber(date) <
      dayNumber(range.start)
    ) {
      setRange({
        start: date,
        end: range.start,
      });
    } else {
      setRange({
        start: range.start,
        end: date,
      });
    }

    setSelectingEnd(false);
    setHoverDate(null);
  };

  const applyPreset = (
    days: number,
  ) => {
    setRange({
      start: today,
      end: addDays(
        today,
        days - 1,
      ),
    });

    setSelectingEnd(false);
  };

  return (
    <div className="rounded-3xl border border-blue-100 bg-white shadow-xl">
      <div className="bg-blue-50 p-5">
        <CalendarDays />
        Select your dates
      </div>

      <button
        onClick={() =>
          applyPreset(7)
        }
      >
        1 week
      </button>

      <button
        onClick={() =>
          applyPreset(14)
        }
      >
        2 weeks
      </button>

      <button
        onClick={() =>
          applyPreset(30)
        }
      >
        1 month
      </button>
    </div>
  );
}

export default DateRangePicker;`,

    tailwind: `Container:
rounded-3xl
border
border-blue-100
bg-white
shadow-[0_24px_60px_rgba(59,130,246,0.10)]

Header:
border-b
border-blue-100
bg-gradient-to-r
from-blue-50
via-white
to-blue-50/70

Calendar day:
h-9
rounded-xl
text-[11px]
hover:bg-blue-50
hover:text-blue-700

Range:
bg-blue-50
text-blue-700

Range endpoints:
bg-blue-300
font-semibold
text-zinc-950

Today:
bg-blue-400

Preset:
rounded-xl
border
border-zinc-200
hover:border-blue-200
hover:bg-blue-50

Selected preset:
border-blue-300
bg-blue-50
text-blue-700

Summary:
rounded-2xl
border-blue-100
bg-blue-50/60

Duration:
rounded-xl
bg-blue-300
text-zinc-950`,

    javascript: `function dayNumber(
  date,
) {
  return (
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ) / 86400000
  );
}

function addDays(
  date,
  amount,
) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + amount,
  );
}

function sameDay(
  first,
  second,
) {
  if (!first || !second) {
    return false;
  }

  return (
    first.getFullYear() ===
      second.getFullYear() &&
    first.getMonth() ===
      second.getMonth() &&
    first.getDate() ===
      second.getDate()
  );
}

function isBetween(
  date,
  start,
  end,
) {
  if (!start || !end) {
    return false;
  }

  const value =
    dayNumber(date);

  const minimum =
    Math.min(
      dayNumber(start),
      dayNumber(end),
    );

  const maximum =
    Math.max(
      dayNumber(start),
      dayNumber(end),
    );

  return (
    value >= minimum &&
    value <= maximum
  );
}

function createRange(
  start,
  end,
) {
  if (!start) {
    return {
      start: end,
      end: null,
    };
  }

  if (
    dayNumber(end) <
    dayNumber(start)
  ) {
    return {
      start: end,
      end: start,
    };
  }

  return {
    start,
    end,
  };
}

function createPreset(
  start,
  days,
) {
  return {
    start,
    end: addDays(
      start,
      days - 1,
    ),
  };
}

function getRangeLength(
  start,
  end,
) {
  if (!start || !end) {
    return 0;
  }

  return (
    Math.abs(
      dayNumber(end) -
      dayNumber(start),
    ) + 1
  );
}`,
  },
];
