import elements from "typed-html";
import { type Todo } from "@prisma/client";

import { TodoForm } from "../Todo/TodoForm";
import { TodoItem } from "../Todo/TodoItem";

type TodoListProps = {
  todos: Todo[];
};

export function TodoList({ todos }: TodoListProps) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
      <TodoForm />
    </div>
  );
}
