import AdaptiveKanbanBoardPreview from "../components/previews/AdaptiveKanbanBoardPreview";
import type { UIComponent } from "../types/component";

export const kanbanBoards: UIComponent[] = [
  {
    id: "adaptive-kanban-task-board",
    name: "Adaptive Kanban Task Board",
    description:
      "User-friendly interactive Kanban board with drag and drop, keyboard movement, search, priority filtering, quick task creation, progress tracking and undo support.",
    category: "Kanban Boards",

    preview: (
      <AdaptiveKanbanBoardPreview />
    ),

    typescript: `import {
  ArrowLeft,
  ArrowRight,
  Check,
  GripVertical,
  Plus,
  RotateCcw,
  Search,
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

const columns = [
  {
    id: "backlog",
    title: "Backlog",
  },
  {
    id: "progress",
    title: "In progress",
  },
  {
    id: "done",
    title: "Done",
  },
] as const;

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Design dashboard",
    description:
      "Create responsive layout.",
    column: "progress",
    priority: "high",
    tags: ["Design"],
  },
  {
    id: 2,
    title: "Build search",
    description:
      "Create keyboard search.",
    column: "backlog",
    priority: "medium",
    tags: ["Search"],
  },
];

function KanbanBoard() {
  const nextId =
    useRef(3);

  const [tasks, setTasks] =
    useState(initialTasks);

  const [query, setQuery] =
    useState("");

  const [priority, setPriority] =
    useState<
      Priority | "all"
    >("all");

  const [draggedTask, setDraggedTask] =
    useState<number | null>(
      null,
    );

  const [history, setHistory] =
    useState<MoveHistory | null>(
      null,
    );

  const filteredTasks =
    useMemo(() => {
      const value =
        query
          .trim()
          .toLowerCase();

      return tasks.filter(
        (task) =>
          (!value ||
            task.title
              .toLowerCase()
              .includes(value)) &&
          (priority ===
            "all" ||
            task.priority ===
              priority),
      );
    }, [
      tasks,
      query,
      priority,
    ]);

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
      task.column ===
        destination
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
  };

  const undo = () => {
    if (!history) return;

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
  };

  return (
    <div className="rounded-[28px] border border-blue-100 bg-white">
      <div className="flex items-center gap-2">
        <Search />

        <input
          value={query}
          onChange={(event) =>
            setQuery(
              event.target.value,
            )
          }
        />

        {history && (
          <button
            onClick={undo}
          >
            <RotateCcw />
            Undo
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {columns.map(
          (column) => (
            <div
              key={column.id}
              onDragOver={(
                event,
              ) =>
                event.preventDefault()
              }
              onDrop={(event) => {
                const id =
                  Number(
                    event.dataTransfer.getData(
                      "text/plain",
                    ),
                  );

                moveTask(
                  id,
                  column.id,
                );
              }}
            >
              <h3>
                {column.title}
              </h3>

              {filteredTasks
                .filter(
                  (task) =>
                    task.column ===
                    column.id,
                )
                .map(
                  (task) => (
                    <div
                      key={
                        task.id
                      }
                      draggable
                      onDragStart={(
                        event,
                      ) => {
                        setDraggedTask(
                          task.id,
                        );

                        event.dataTransfer.setData(
                          "text/plain",
                          String(
                            task.id,
                          ),
                        );
                      }}
                      className="rounded-xl border border-zinc-200 bg-white p-3"
                    >
                      <GripVertical />

                      {
                        task.title
                      }
                    </div>
                  ),
                )}

              <button>
                <Plus />
                Add task
              </button>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default KanbanBoard;`,

    tailwind: `Board:
rounded-[28px]
border
border-blue-100
bg-white
shadow-[0_24px_70px_rgba(59,130,246,0.10)]

Toolbar:
bg-gradient-to-r
from-blue-50
via-white
to-blue-50/60

Search:
border-zinc-200
focus:border-blue-300
focus:ring-4
focus:ring-blue-100

Columns:
rounded-2xl
border
border-zinc-200
bg-white

Drop target:
border-blue-300
bg-blue-50

Task:
rounded-xl
border
border-zinc-200
bg-white
shadow-sm
hover:-translate-y-0.5
hover:border-blue-200
hover:shadow-md

Active drag:
border-blue-300
opacity-50
scale-[0.97]

Primary:
bg-blue-300
text-zinc-950
hover:bg-blue-400

Progress:
bg-blue-300

Keyboard focus:
focus:border-blue-300
focus:ring-4
focus:ring-blue-100`,

    javascript: `const columns = [
  "backlog",
  "progress",
  "done",
];

function createKanbanController(
  initialTasks,
) {
  let tasks = [
    ...initialTasks,
  ];

  let history = null;

  let draggedTask = null;

  let query = "";

  let priorityFilter =
    "all";

  function getTasks() {
    return tasks;
  }

  function moveTask(
    taskId,
    destination,
  ) {
    const task =
      tasks.find(
        (item) =>
          item.id === taskId,
      );

    if (!task) {
      return false;
    }

    if (
      task.column ===
      destination
    ) {
      return false;
    }

    history = {
      taskId,
      from: task.column,
      to: destination,
    };

    tasks =
      tasks.map(
        (item) =>
          item.id === taskId
            ? {
                ...item,
                column:
                  destination,
              }
            : item,
      );

    return true;
  }

  function undoMove() {
    if (!history) {
      return false;
    }

    tasks =
      tasks.map(
        (task) =>
          task.id ===
          history.taskId
            ? {
                ...task,
                column:
                  history.from,
              }
            : task,
      );

    history = null;

    return true;
  }

  function addTask({
    id,
    title,
    description,
    column,
    priority,
    tags = [],
  }) {
    const trimmedTitle =
      title.trim();

    if (!trimmedTitle) {
      return null;
    }

    const task = {
      id,
      title:
        trimmedTitle,
      description,
      column,
      priority,
      tags,
    };

    tasks = [
      ...tasks,
      task,
    ];

    return task;
  }

  function removeTask(
    taskId,
  ) {
    const previousLength =
      tasks.length;

    tasks =
      tasks.filter(
        (task) =>
          task.id !==
          taskId,
      );

    return (
      tasks.length !==
      previousLength
    );
  }

  function setSearch(
    value,
  ) {
    query =
      value
        .trim()
        .toLowerCase();
  }

  function setPriorityFilter(
    priority,
  ) {
    priorityFilter =
      priority;
  }

  function getFilteredTasks() {
    return tasks.filter(
      (task) => {
        const matchesQuery =
          !query ||
          task.title
            .toLowerCase()
            .includes(query) ||
          task.description
            .toLowerCase()
            .includes(query) ||
          task.tags.some(
            (tag) =>
              tag
                .toLowerCase()
                .includes(
                  query,
                ),
          );

        const matchesPriority =
          priorityFilter ===
            "all" ||
          task.priority ===
            priorityFilter;

        return (
          matchesQuery &&
          matchesPriority
        );
      },
    );
  }

  function startDrag(
    taskId,
  ) {
    draggedTask =
      taskId;

    return draggedTask;
  }

  function finishDrag(
    destination,
  ) {
    if (
      draggedTask ===
      null
    ) {
      return false;
    }

    const moved =
      moveTask(
        draggedTask,
        destination,
      );

    draggedTask = null;

    return moved;
  }

  function cancelDrag() {
    draggedTask = null;
  }

  function moveKeyboard(
    taskId,
    direction,
  ) {
    const task =
      tasks.find(
        (item) =>
          item.id === taskId,
      );

    if (!task) {
      return false;
    }

    const index =
      columns.indexOf(
        task.column,
      );

    if (
      direction ===
        "left" &&
      index > 0
    ) {
      return moveTask(
        taskId,
        columns[
          index - 1
        ],
      );
    }

    if (
      direction ===
        "right" &&
      index <
        columns.length - 1
    ) {
      return moveTask(
        taskId,
        columns[
          index + 1
        ],
      );
    }

    return false;
  }

  function getColumnTasks(
    column,
  ) {
    return getFilteredTasks().filter(
      (task) =>
        task.column ===
        column,
    );
  }

  function getColumnCount(
    column,
  ) {
    return tasks.filter(
      (task) =>
        task.column ===
        column,
    ).length;
  }

  function getProgress() {
    if (
      tasks.length === 0
    ) {
      return 0;
    }

    const completed =
      tasks.filter(
        (task) =>
          task.column ===
          "done",
      ).length;

    return Math.round(
      (completed /
        tasks.length) *
        100,
    );
  }

  return {
    getTasks,
    moveTask,
    undoMove,
    addTask,
    removeTask,
    setSearch,
    setPriorityFilter,
    getFilteredTasks,
    startDrag,
    finishDrag,
    cancelDrag,
    moveKeyboard,
    getColumnTasks,
    getColumnCount,
    getProgress,
  };
}

function createDragHandlers(
  controller,
) {
  return {
    dragStart(
      event,
      taskId,
    ) {
      controller.startDrag(
        taskId,
      );

      event.dataTransfer.effectAllowed =
        "move";

      event.dataTransfer.setData(
        "text/plain",
        String(taskId),
      );
    },

    dragOver(event) {
      event.preventDefault();

      event.dataTransfer.dropEffect =
        "move";
    },

    drop(
      event,
      column,
    ) {
      event.preventDefault();

      const taskId =
        Number(
          event.dataTransfer.getData(
            "text/plain",
          ),
        );

      if (taskId) {
        controller.moveTask(
          taskId,
          column,
        );
      }

      controller.cancelDrag();
    },
  };
}

function createKeyboardHandler(
  controller,
  taskId,
) {
  return function onKeyDown(
    event,
  ) {
    if (!event.altKey) {
      return;
    }

    if (
      event.key ===
      "ArrowLeft"
    ) {
      event.preventDefault();

      controller.moveKeyboard(
        taskId,
        "left",
      );
    }

    if (
      event.key ===
      "ArrowRight"
    ) {
      event.preventDefault();

      controller.moveKeyboard(
        taskId,
        "right",
      );
    }
  };
}`,
  },
];