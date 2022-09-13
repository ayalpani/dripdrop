[![Node.js CI](https://github.com/ayalpani/react-ivity/actions/workflows/node.js.yml/badge.svg)](https://github.com/ayalpani/react-ivity/actions/workflows/node.js.yml)

# react-ivity

> Manage State and AAAAAHHHHH... relax.

![Manage State and Relax](docs/relax.png "Manage State and Relax")

## Install

```
$ npm install react-ivity
```

## Why?

#### Yet Another State Management Library

React Context, Redux, Zustand, MobX, Recoil, Valtio ... I had them all in projects big or small.

#### react-ivity is...

- Super tiny (&lt; 60 Lines Of Code) dependency-free Vanilla TS (👉 [jump right in](./src/index.ts))
- Implements a simple Observer Pattern and it's core is easy to comprehend
- Doesn't need React Context
- Allows for super granular updates, only re-render if it's really needed
-

## Example Project

=> https://github.com/ayalpani/react-ivity-example

## Usage

1. Import the only two exported API methods:

```ts
import { notifyCallbacks, useSubscribe } from "react-ivity";
```

2. Define your State as a TypeScript safe Object:

```ts
export type AppState = {
  todos: Todo[];
};

const appState: AppState = {
  todos: [],
};
```

3. Export subscriptions hooks for your state:

```ts
export function useSubscribeTodoList(): Todo[] {
  useSubscribe("todoList");
  return appState.todos;
}

export function useSubscribeTodo(todoId: string): Todo | undefined {
  useSubscribe("todo-" + todoId);
  return appState.todos.find((t) => t.id === todoId);
}

export function useSubscribeTodoTitle(todoId: string): string | undefined {
  useSubscribe("todo-" + todoId + ".title");
  return appState.todos?.find((t) => t.id === todoId)?.title;
}

export function useSubscribeTodoIsDone(todoId: string): boolean | undefined {
  useSubscribe("todo-" + todoId + ".isDone");
  return appState.todos.find((t) => t.id === todoId)?.isDone;
}
```

4. Export actions for your state:

```ts
export function actionAddTodo() {
  const id = v4();
  appState.todos.push({
    id,
    isDone: false,
    title: "Todo #" + globalTaskCounter++,
  });

  notifySubscribers("todoList");
}

export function actionToggleTodoIsDone(todoId: string) {
  appState.todos = appState.todos.map((t) =>
    t.id === todoId ? { ...t, isDone: !t.isDone } : t
  );

  notifySubscribers("todo-" + todoId + ".isDone");
}

export function actionDeleteTodo(todoId: string) {
  appState.auth.todos = appState.todos?.filter((t) => t.id !== todoId);

  notifySubscribers("todoList");
}
```

5. Import and use the subscription hooks (see 3) and actions (see 4) inside your React Components:

```ts
const TodosList = () => {
  const todos = useSubscribeTodoList();

  return (
    <div className="TodosList">
      {todos.map((t) => (
        <Todo key={t.id} todoId={t.id} />
      ))}
    </div>
  );
};

const Todo = React.memo(({ todoId }: { todoId: string }) => {
  const todo = useSubscribeTodo(todoId);

  if (todo === undefined) {
    return null;
  }

  return (
    <div className="SingleTodo">
      <TodoCheckbox todoId={todoId} />
      <TodoTitle todoId={todoId} />
      <TodoDeleteButton todoId={todoId} />
    </div>
  );
});

const TodoCheckbox = React.memo(({ todoId }: { todoId: string }) => {
  const isDone = useSubscribeTodoIsDone(todoId);
  const className = isDone ? "TodoCheckbox TodoCheckboxIsDone" : "TodoCheckbox";
  return (
    <div className={className} onClick={() => actionToggleTodoIsDone(todoId)} />
  );
});

const TodoTitle = React.memo(({ todoId }: { todoId: string }) => {
  const title = useSubscribeTodoTitle(todoId);
  return <span className="TodoTitle">{title}</span>;
});

const TodoDeleteButton = React.memo(({ todoId }: { todoId: string }) => {
  return (
    <button
      className="TodoDeleteButton"
      onClick={() => actionDeleteTodo(todoId)}
    >
      DELETE
    </button>
  );
});
```

## Debugging

To get a list of all subscriptions in your app, open the developer console and paste this:

> \_\_react_ivity.getSubscriptionCallbacks()

## Maintainers

- [Arash Yalpani](https://github.com/ayalpani)
