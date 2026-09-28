import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

type DateRange = {
  start: Date | null;
  end: Date | null;
};

type CalendarDay = {
  date: Date;
  currentMonth: boolean;
};

const WEEK_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function sameDay(first: Date | null, second: Date | null) {
  if (!first || !second) {
    return false;
  }

  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function dayNumber(date: Date) {
  return (
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000
  );
}

function isBefore(first: Date, second: Date) {
  return dayNumber(first) < dayNumber(second);
}

function isBetween(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) {
    return false;
  }

  const value = dayNumber(date);

  const minimum = Math.min(dayNumber(start), dayNumber(end));

  const maximum = Math.max(dayNumber(start), dayNumber(end));

  return value >= minimum && value <= maximum;
}

function addDays(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

function getCalendarDays(visibleMonth: Date): CalendarDay[] {
  const year = visibleMonth.getFullYear();

  const month = visibleMonth.getMonth();

  const firstDay = new Date(year, month, 1);

  const mondayOffset = (firstDay.getDay() + 6) % 7;

  const gridStart = new Date(year, month, 1 - mondayOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = addDays(gridStart, index);

    return {
      date,
      currentMonth: date.getMonth() === month && date.getFullYear() === year,
    };
  });
}

function formatMonth(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatDate(date: Date | null) {
  if (!date) {
    return "Select date";
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatCompact(date: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
  }).format(date);
}

export function AdaptiveDateRangePickerPreview() {
  const today = useMemo(() => {
    const value = new Date();

    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }, []);

  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(today));

  const [range, setRange] = useState<DateRange>({
    start: today,
    end: addDays(today, 6),
  });

  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const [selectingEnd, setSelectingEnd] = useState(false);

  const calendarDays = useMemo(
    () => getCalendarDays(visibleMonth),
    [visibleMonth],
  );

  const selectedDays =
    range.start && range.end
      ? Math.abs(dayNumber(range.end) - dayNumber(range.start)) + 1
      : 0;

  const displayEnd =
    selectingEnd && range.start && hoverDate ? hoverDate : range.end;

  const selectDate = (date: Date) => {
    if (!range.start || range.end) {
      setRange({
        start: date,
        end: null,
      });

      setSelectingEnd(true);
      setHoverDate(date);

      return;
    }

    if (isBefore(date, range.start)) {
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

  const applyPreset = (amount: number) => {
    const start = today;

    const end = addDays(today, amount - 1);

    setRange({
      start,
      end,
    });

    setVisibleMonth(startOfMonth(start));

    setSelectingEnd(false);
    setHoverDate(null);
  };

  const reset = () => {
    setRange({
      start: null,
      end: null,
    });

    setVisibleMonth(startOfMonth(today));

    setSelectingEnd(false);
    setHoverDate(null);
  };

  return (
    <div className="w-full max-w-[620px] overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-[0_24px_60px_rgba(59,130,246,0.10)]">
      <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-blue-50/70 p-5">
        <div className="flex items-start justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-blue-600">
              <CalendarDays size={15} />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
                Date range
              </span>
            </div>

            <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-950">
              Plan your stay
            </h3>

            <p className="mt-1 text-xs leading-5 text-zinc-500">
              Select a start and end date or use a quick preset.
            </p>
          </div>

          <button
            type="button"
            onClick={reset}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-white text-zinc-400 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            aria-label="Reset date range"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="rounded-xl border border-blue-100 bg-white p-3">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">
              Check in
            </p>

            <p className="mt-1 text-xs font-semibold text-zinc-950">
              {formatDate(range.start)}
            </p>
          </div>

          <div className="h-px w-6 bg-blue-200" />

          <div className="rounded-xl border border-blue-100 bg-white p-3">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">
              Check out
            </p>

            <p className="mt-1 text-xs font-semibold text-zinc-950">
              {formatDate(displayEnd)}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setVisibleMonth((current) => addMonths(current, -1))}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="text-center">
            <p className="text-sm font-semibold text-zinc-950">
              {formatMonth(visibleMonth)}
            </p>

            <p className="mt-0.5 text-[9px] font-medium text-blue-500">
              {selectingEnd ? "Choose an end date" : "Choose your dates"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setVisibleMonth((current) => addMonths(current, 1))}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-1">
          {WEEK_DAYS.map((day) => (
            <div
              key={day}
              className="flex h-7 items-center justify-center text-[9px] font-semibold uppercase tracking-wide text-zinc-400"
            >
              {day}
            </div>
          ))}

          {calendarDays.map(({ date, currentMonth }) => {
            const isToday = sameDay(date, today);

            const isStart = sameDay(date, range.start);

            const isEnd = sameDay(date, displayEnd);

            const isRange = isBetween(date, range.start, displayEnd);

            const isMiddle = isRange && !isStart && !isEnd;

            return (
              <button
                key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                type="button"
                onClick={() => selectDate(date)}
                onMouseEnter={() => {
                  if (selectingEnd) {
                    setHoverDate(date);
                  }
                }}
                onFocus={() => {
                  if (selectingEnd) {
                    setHoverDate(date);
                  }
                }}
                aria-label={formatDate(date)}
                aria-pressed={isStart || isEnd}
                className={`relative flex h-9 items-center justify-center text-[11px] transition ${
                  isMiddle ? "bg-blue-50 text-blue-700" : ""
                } ${!currentMonth ? "text-zinc-300" : "text-zinc-700"} ${
                  isStart && !isEnd
                    ? "rounded-l-xl bg-blue-300 font-semibold text-zinc-950"
                    : ""
                } ${
                  isEnd && !isStart
                    ? "rounded-r-xl bg-blue-300 font-semibold text-zinc-950"
                    : ""
                } ${
                  isStart && isEnd
                    ? "rounded-xl bg-blue-300 font-semibold text-zinc-950"
                    : ""
                } ${
                  !isRange
                    ? "rounded-xl hover:bg-blue-50 hover:text-blue-700"
                    : ""
                }`}
              >
                {date.getDate()}

                {isToday && !isStart && !isEnd && (
                  <span className="absolute bottom-1 h-1 w-1 rounded-full bg-blue-400" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-5 border-t border-zinc-100 pt-4">
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="text-blue-500" />

            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Quick select
            </p>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              {
                label: "1 week",
                days: 7,
              },
              {
                label: "2 weeks",
                days: 14,
              },
              {
                label: "1 month",
                days: 30,
              },
            ].map((preset) => {
              const presetEnd = addDays(today, preset.days - 1);

              const active =
                sameDay(range.start, today) && sameDay(range.end, presetEnd);

              return (
                <button
                  key={preset.days}
                  type="button"
                  onClick={() => applyPreset(preset.days)}
                  className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-[10px] font-medium transition ${
                    active
                      ? "border-blue-300 bg-blue-50 text-blue-700"
                      : "border-zinc-200 text-zinc-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {active && <Check size={11} />}

                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-blue-500">
              Selected range
            </p>

            <p className="mt-1 text-xs font-semibold text-zinc-950">
              {range.start && range.end
                ? `${formatCompact(range.start)} — ${formatCompact(range.end)}`
                : "Complete your selection"}
            </p>
          </div>

          <div className="rounded-xl bg-blue-300 px-3 py-2 text-center text-zinc-950">
            <p className="text-base font-bold leading-none">{selectedDays}</p>

            <p className="mt-1 text-[8px] font-semibold uppercase tracking-wider">
              days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdaptiveDateRangePickerPreview;
