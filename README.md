# react-ivity

> React & React Native Hooks for simple state management


## Install

```
$ npm install react-ivity
```

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

const appState = [
  todos: []
];
```

3. Write subscriptions hooks for your state:

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
  return appState.auth?.todos?.find((t) => t.id === todoId)?.title;
}

export function useSubscribeTodoIsDone(todoId: string): boolean | undefined {
  useSubscribe("todo-" + todoId + ".isDone");
  return appState.todos.find((t) => t.id === todoId)?.isDone;
}
```

4. Write actions for your state:

```ts
export function actionAddTodo() {
  const id = v4();
  appState.todos.push({
    id,
    isDone: false,
    title: "Todo #" + globalTaskCounter++,
  });

  notifyCallbacks("todoList");
}

export function actionToggleTodoIsDone(todoId: string) {
  appState.todos = appState.todos.map((t) =>
    t.id === todoId ? { ...t, isDone: !t.isDone } : t
  );

  notifyCallbacks("todo-" + todoId + ".isDone");
}

export function actionDeleteTodo(todoId: string) {
  appState.auth.todos = appState.auth?.todos?.filter((t) => t.id !== todoId);

  notifyCallbacks("todoList");
}
```

5. Use the subscription hooks (see 3) and actions (see 4) in your React Components:

```ts

const Todos = () => {
  const todos = useSubscribeTodoList() || [];

  return (
    <div className="Todos">
      <Header />
      <div className="TodosList">
        {todos.map((t) => (
          <SingleTodo key={t.id} todoId={t.id} />
        ))}
      </div>
    </div>
  );
};

const SingleTodo = React.memo(({ todoId }: { todoId: string }) => {
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
  const isDone: boolean | undefined = useSubscribeTodoIsDone(todoId);
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

## Maintainers

- [Arash Yalpani](https://github.com/ayalpani)
