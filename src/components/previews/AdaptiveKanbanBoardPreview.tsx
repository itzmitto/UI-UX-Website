import {
  ArrowLeft,
  ArrowRight,
  Check,
  Circle,
  Clock3,
  GripVertical,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import {
  type DragEvent,
  type KeyboardEvent,
  useMemo,
  useRef,
  useState,
} from "react";

type ColumnId =
  | "backlog"
  | "progress"
  | "done";

type Priority =
  | "low"
  | "medium"
  | "high";

type Task = {
  id: number;
  title: string;
  description: string;
  column: ColumnId;
  priority: Priority;
  tags: string[];
};

type MoveHistory = {
  taskId: number;
  from: ColumnId;
  to: ColumnId;
};

const columns: {
  id: ColumnId;
  title: string;
  subtitle: string;
}[] = [
  {
    id: "backlog",
    title: "Backlog",
    subtitle: "Waiting",
  },
  {
    id: "progress",
    title: "In progress",
    subtitle: "Active",
  },
  {
    id: "done",
    title: "Done",
    subtitle: "Completed",
  },
];

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Design dashboard",
    description:
      "Create the responsive dashboard layout and navigation.",
    column: "progress",
    priority: "high",
    tags: [
      "Design",
      "React",
    ],
  },
  {
    id: 2,
    title: "Build search",
    description:
      "Add keyboard-friendly component search.",
    column: "backlog",
    priority: "medium",
    tags: [
      "UX",
      "Search",
    ],
  },
  {
    id: 3,
    title: "Component modal",
    description:
      "Improve preview and code experience.",
    column: "done",
    priority: "high",
    tags: [
      "UI",
    ],
  },
  {
    id: 4,
    title: "Dark mode polish",
    description:
      "Check all interactive dark mode states.",
    column: "backlog",
    priority: "low",
    tags: [
      "Theme",
    ],
  },
  {
    id: 5,
    title: "Responsive testing",
    description:
      "Verify layouts across multiple viewport sizes.",
    column: "progress",
    priority: "medium",
    tags: [
      "QA",
      "Mobile",
    ],
  },
];

const priorityOrder: Priority[] = [
  "high",
  "medium",
  "low",
];

function priorityClasses(
  priority: Priority,
) {
  if (priority === "high") {
    return "border-rose-100 bg-rose-50 text-rose-600";
  }

  if (priority === "medium") {
    return "border-amber-100 bg-amber-50 text-amber-600";
  }

  return "border-blue-100 bg-blue-50 text-blue-600";
}

function columnIndex(
  column: ColumnId,
) {
  return columns.findIndex(
    (item) =>
      item.id === column,
  );
}

export default function AdaptiveKanbanBoardPreview() {
  const nextId = useRef(6);

  const [tasks, setTasks] =
    useState<Task[]>(
      initialTasks,
    );

  const [query, setQuery] =
    useState("");

  const [priorityFilter, setPriorityFilter] =
    useState<
      Priority | "all"
    >("all");

  const [draggedTask, setDraggedTask] =
    useState<number | null>(
      null,
    );

  const [dropTarget, setDropTarget] =
    useState<ColumnId | null>(
      null,
    );

  const [history, setHistory] =
    useState<MoveHistory | null>(
      null,
    );

  const [addingTo, setAddingTo] =
    useState<ColumnId | null>(
      null,
    );

  const [newTitle, setNewTitle] =
    useState("");

  const [newPriority, setNewPriority] =
    useState<Priority>(
      "medium",
    );

  const [notification, setNotification] =
    useState<string | null>(
      null,
    );

  const filteredTasks =
    useMemo(() => {
      const normalizedQuery =
        query
          .trim()
          .toLowerCase();

      return tasks.filter(
        (task) => {
          const matchesSearch =
            !normalizedQuery ||
            task.title
              .toLowerCase()
              .includes(
                normalizedQuery,
              ) ||
            task.description
              .toLowerCase()
              .includes(
                normalizedQuery,
              ) ||
            task.tags.some(
              (tag) =>
                tag
                  .toLowerCase()
                  .includes(
                    normalizedQuery,
                  ),
            );

          const matchesPriority =
            priorityFilter ===
              "all" ||
            task.priority ===
              priorityFilter;

          return (
            matchesSearch &&
            matchesPriority
          );
        },
      );
    }, [
      tasks,
      query,
      priorityFilter,
    ]);

  const doneCount =
    tasks.filter(
      (task) =>
        task.column === "done",
    ).length;

  const progressPercentage =
    tasks.length === 0
      ? 0
      : Math.round(
          (doneCount /
            tasks.length) *
            100,
        );

  const showNotification = (
    message: string,
  ) => {
    setNotification(message);

    window.setTimeout(() => {
      setNotification(null);
    }, 1800);
  };

  const moveTask = (
    taskId: number,
    destination: ColumnId,
  ) => {
    const task =
      tasks.find(
        (item) =>
          item.id === taskId,
      );

    if (
      !task ||
      task.column === destination
    ) {
      return;
    }

    setHistory({
      taskId,
      from: task.column,
      to: destination,
    });

    setTasks((current) =>
      current.map((item) =>
        item.id === taskId
          ? {
              ...item,
              column:
                destination,
            }
          : item,
      ),
    );

    const destinationName =
      columns.find(
        (column) =>
          column.id ===
          destination,
      )?.title;

    showNotification(
      `Moved to ${destinationName}`,
    );
  };

  const undoMove = () => {
    if (!history) {
      return;
    }

    setTasks((current) =>
      current.map((task) =>
        task.id ===
        history.taskId
          ? {
              ...task,
              column:
                history.from,
            }
          : task,
      ),
    );

    setHistory(null);

    showNotification(
      "Move undone",
    );
  };

  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    taskId: number,
  ) => {
    setDraggedTask(taskId);

    event.dataTransfer.effectAllowed =
      "move";

    event.dataTransfer.setData(
      "text/plain",
      String(taskId),
    );
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDropTarget(null);
  };

  const handleDragOver = (
    event: DragEvent<HTMLDivElement>,
    column: ColumnId,
  ) => {
    event.preventDefault();

    event.dataTransfer.dropEffect =
      "move";

    setDropTarget(column);
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
    column: ColumnId,
  ) => {
    event.preventDefault();

    const transferredId =
      Number(
        event.dataTransfer.getData(
          "text/plain",
        ),
      );

    const taskId =
      transferredId ||
      draggedTask;

    if (taskId) {
      moveTask(
        taskId,
        column,
      );
    }

    setDraggedTask(null);
    setDropTarget(null);
  };

  const moveWithKeyboard = (
    event: KeyboardEvent<HTMLDivElement>,
    task: Task,
  ) => {
    if (!event.altKey) {
      return;
    }

    const index =
      columnIndex(
        task.column,
      );

    if (
      event.key ===
        "ArrowRight" &&
      index <
        columns.length - 1
    ) {
      event.preventDefault();

      moveTask(
        task.id,
        columns[
          index + 1
        ].id,
      );
    }

    if (
      event.key ===
        "ArrowLeft" &&
      index > 0
    ) {
      event.preventDefault();

      moveTask(
        task.id,
        columns[
          index - 1
        ].id,
      );
    }
  };

  const createTask = () => {
    const title =
      newTitle.trim();

    if (
      !title ||
      !addingTo
    ) {
      return;
    }

    const task: Task = {
      id: nextId.current,
      title,
      description:
        "Newly created task.",
      column: addingTo,
      priority:
        newPriority,
      tags: ["New"],
    };

    nextId.current += 1;

    setTasks((current) => [
      ...current,
      task,
    ]);

    setNewTitle("");
    setNewPriority(
      "medium",
    );
    setAddingTo(null);

    showNotification(
      "Task created",
    );
  };

  const removeTask = (
    taskId: number,
  ) => {
    setTasks((current) =>
      current.filter(
        (task) =>
          task.id !== taskId,
      ),
    );

    showNotification(
      "Task removed",
    );
  };

  return (
    <div className="relative w-full max-w-[920px] overflow-hidden rounded-[28px] border border-blue-100 bg-white shadow-[0_24px_70px_rgba(59,130,246,0.10)]">
      <header className="border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-blue-50/60 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-300 text-zinc-950">
                <Sparkles
                  size={16}
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-950">
                  Product board
                </h3>

                <p className="text-[9px] text-zinc-400">
                  Drag, search and
                  organize tasks
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {history && (
              <button
                type="button"
                onClick={
                  undoMove
                }
                className="flex h-9 items-center gap-1.5 rounded-xl border border-blue-100 bg-white px-3 text-[10px] font-medium text-zinc-500 shadow-sm transition hover:bg-blue-50 hover:text-blue-600"
              >
                <RotateCcw
                  size={12}
                />
                Undo
              </button>
            )}

            <div className="rounded-xl border border-blue-100 bg-white px-3 py-2 text-right shadow-sm">
              <p className="text-[8px] font-semibold uppercase tracking-wider text-zinc-400">
                Progress
              </p>

              <p className="text-xs font-bold text-blue-700">
                {
                  progressPercentage
                }
                %
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="relative min-w-[190px] flex-1">
            <Search
              size={13}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              value={query}
              onChange={(event) =>
                setQuery(
                  event.target.value,
                )
              }
              placeholder="Search tasks..."
              className="h-9 w-full rounded-xl border border-zinc-200 bg-white pl-9 pr-9 text-[10px] text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
            />

            {query && (
              <button
                type="button"
                onClick={() =>
                  setQuery("")
                }
                className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-lg text-zinc-400 hover:bg-blue-50 hover:text-blue-600"
                aria-label="Clear search"
              >
                <X
                  size={11}
                />
              </button>
            )}
          </div>

          <div className="flex rounded-xl border border-zinc-200 bg-zinc-50 p-1">
            {[
              "all",
              ...priorityOrder,
            ].map(
              (priority) => {
                const active =
                  priorityFilter ===
                  priority;

                return (
                  <button
                    key={
                      priority
                    }
                    type="button"
                    onClick={() =>
                      setPriorityFilter(
                        priority as
                          | Priority
                          | "all",
                      )
                    }
                    className={`rounded-lg px-2.5 py-1.5 text-[9px] font-medium capitalize transition ${
                      active
                        ? "bg-blue-300 text-zinc-950 shadow-sm"
                        : "text-zinc-400 hover:bg-white hover:text-zinc-700"
                    }`}
                  >
                    {priority}
                  </button>
                );
              },
            )}
          </div>
        </div>

        <div className="mt-3 h-1 overflow-hidden rounded-full bg-blue-100">
          <div
            className="h-full rounded-full bg-blue-300 transition-[width] duration-500"
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>
      </header>

      <div className="overflow-x-auto bg-zinc-50/70 p-4">
        <div className="grid min-w-[740px] grid-cols-3 gap-3">
          {columns.map(
            (column) => {
              const columnTasks =
                filteredTasks.filter(
                  (task) =>
                    task.column ===
                    column.id,
                );

              const totalCount =
                tasks.filter(
                  (task) =>
                    task.column ===
                    column.id,
                ).length;

              const activeDrop =
                dropTarget ===
                column.id;

              return (
                <div
                  key={
                    column.id
                  }
                  onDragOver={(
                    event,
                  ) =>
                    handleDragOver(
                      event,
                      column.id,
                    )
                  }
                  onDragLeave={() =>
                    setDropTarget(
                      null,
                    )
                  }
                  onDrop={(
                    event,
                  ) =>
                    handleDrop(
                      event,
                      column.id,
                    )
                  }
                  className={`flex min-h-[370px] flex-col rounded-2xl border p-2.5 transition-all duration-200 ${
                    activeDrop
                      ? "border-blue-300 bg-blue-50 shadow-[inset_0_0_0_1px_rgba(147,197,253,0.8)]"
                      : "border-zinc-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between px-1 py-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-lg ${
                          column.id ===
                          "done"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-blue-50 text-blue-500"
                        }`}
                      >
                        {column.id ===
                        "done" ? (
                          <Check
                            size={12}
                          />
                        ) : column.id ===
                          "progress" ? (
                          <Clock3
                            size={12}
                          />
                        ) : (
                          <Circle
                            size={11}
                          />
                        )}
                      </span>

                      <div>
                        <p className="text-[10px] font-semibold text-zinc-800">
                          {
                            column.title
                          }
                        </p>

                        <p className="text-[8px] text-zinc-400">
                          {
                            column.subtitle
                          }
                        </p>
                      </div>
                    </div>

                    <span className="flex h-6 min-w-6 items-center justify-center rounded-lg bg-zinc-100 px-1.5 text-[9px] font-semibold text-zinc-500">
                      {
                        totalCount
                      }
                    </span>
                  </div>

                  <div className="mt-2 flex flex-1 flex-col gap-2">
                    {columnTasks.map(
                      (task) => {
                        const dragging =
                          draggedTask ===
                          task.id;

                        const index =
                          columnIndex(
                            task.column,
                          );

                        return (
                          <div
                            key={
                              task.id
                            }
                            draggable
                            tabIndex={0}
                            onDragStart={(
                              event,
                            ) =>
                              handleDragStart(
                                event,
                                task.id,
                              )
                            }
                            onDragEnd={
                              handleDragEnd
                            }
                            onKeyDown={(
                              event,
                            ) =>
                              moveWithKeyboard(
                                event,
                                task,
                              )
                            }
                            className={`group relative cursor-grab rounded-xl border bg-white p-3 shadow-sm outline-none transition-all duration-200 active:cursor-grabbing focus:border-blue-300 focus:ring-4 focus:ring-blue-100 ${
                              dragging
                                ? "scale-[0.97] border-blue-300 opacity-50"
                                : "border-zinc-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <GripVertical
                                size={13}
                                className="mt-0.5 shrink-0 text-zinc-300 transition group-hover:text-blue-400"
                              />

                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-[10px] font-semibold leading-4 text-zinc-800">
                                    {
                                      task.title
                                    }
                                  </p>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeTask(
                                        task.id,
                                      )
                                    }
                                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-zinc-300 opacity-0 transition hover:bg-rose-50 hover:text-rose-500 group-hover:opacity-100"
                                    aria-label={`Remove ${task.title}`}
                                  >
                                    <X
                                      size={10}
                                    />
                                  </button>
                                </div>

                                <p className="mt-1 line-clamp-2 text-[8px] leading-4 text-zinc-400">
                                  {
                                    task.description
                                  }
                                </p>

                                <div className="mt-2 flex flex-wrap items-center gap-1">
                                  <span
                                    className={`rounded-md border px-1.5 py-0.5 text-[7px] font-semibold capitalize ${priorityClasses(
                                      task.priority,
                                    )}`}
                                  >
                                    {
                                      task.priority
                                    }
                                  </span>

                                  {task.tags.map(
                                    (
                                      tag,
                                    ) => (
                                      <span
                                        key={
                                          tag
                                        }
                                        className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[7px] font-medium text-zinc-500"
                                      >
                                        {
                                          tag
                                        }
                                      </span>
                                    ),
                                  )}
                                </div>

                                <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-2">
                                  <span className="text-[7px] text-zinc-400">
                                    Alt + ←
                                    / →
                                  </span>

                                  <div className="flex items-center gap-1">
                                    {index >
                                      0 && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          moveTask(
                                            task.id,
                                            columns[
                                              index -
                                                1
                                            ].id,
                                          )
                                        }
                                        className="flex h-6 w-6 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-blue-50 hover:text-blue-600"
                                        aria-label="Move task left"
                                      >
                                        <ArrowLeft
                                          size={11}
                                        />
                                      </button>
                                    )}

                                    {index <
                                      columns.length -
                                        1 && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          moveTask(
                                            task.id,
                                            columns[
                                              index +
                                                1
                                            ].id,
                                          )
                                        }
                                        className="flex h-6 w-6 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-blue-50 hover:text-blue-600"
                                        aria-label="Move task right"
                                      >
                                        <ArrowRight
                                          size={11}
                                        />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      },
                    )}

                    {columnTasks.length ===
                      0 && (
                      <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-zinc-200 p-5 text-center">
                        <div>
                          <Circle
                            size={17}
                            className="mx-auto text-blue-200"
                          />

                          <p className="mt-2 text-[9px] font-medium text-zinc-400">
                            No matching
                            tasks
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {addingTo ===
                  column.id ? (
                    <div className="mt-2 rounded-xl border border-blue-200 bg-blue-50 p-2.5">
                      <input
                        autoFocus
                        value={
                          newTitle
                        }
                        onChange={(
                          event,
                        ) =>
                          setNewTitle(
                            event
                              .target
                              .value,
                          )
                        }
                        onKeyDown={(
                          event,
                        ) => {
                          if (
                            event.key ===
                            "Enter"
                          ) {
                            createTask();
                          }

                          if (
                            event.key ===
                            "Escape"
                          ) {
                            setAddingTo(
                              null,
                            );

                            setNewTitle(
                              "",
                            );
                          }
                        }}
                        placeholder="Task name..."
                        className="h-8 w-full rounded-lg border border-blue-100 bg-white px-2.5 text-[9px] outline-none focus:border-blue-300"
                      />

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <select
                          value={
                            newPriority
                          }
                          onChange={(
                            event,
                          ) =>
                            setNewPriority(
                              event
                                .target
                                .value as Priority,
                            )
                          }
                          className="h-7 rounded-lg border border-blue-100 bg-white px-2 text-[8px] text-zinc-500 outline-none"
                        >
                          <option value="low">
                            Low
                          </option>

                          <option value="medium">
                            Medium
                          </option>

                          <option value="high">
                            High
                          </option>
                        </select>

                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setAddingTo(
                                null,
                              );

                              setNewTitle(
                                "",
                              );
                            }}
                            className="h-7 rounded-lg px-2 text-[8px] font-medium text-zinc-400 hover:bg-white"
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            onClick={
                              createTask
                            }
                            className="h-7 rounded-lg bg-blue-300 px-2.5 text-[8px] font-semibold text-zinc-950 hover:bg-blue-400"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setAddingTo(
                          column.id,
                        );

                        setNewTitle(
                          "",
                        );
                      }}
                      className="mt-2 flex h-8 w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-zinc-200 text-[9px] font-medium text-zinc-400 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Plus
                        size={11}
                      />
                      Add task
                    </button>
                  )}
                </div>
              );
            },
          )}
        </div>
      </div>

      {notification && (
        <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-blue-100 bg-white px-3 py-2 text-[9px] font-medium text-blue-700 shadow-xl">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-300 text-zinc-950">
            <Check
              size={10}
            />
          </span>

          {notification}
        </div>
      )}
    </div>
  );
}