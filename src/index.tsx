import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import elements from "typed-html";
import { prisma } from "./db";

import { Html } from "./components/layout/Html";
import { TodoItem } from "./components/Todo/TodoItem";
import { TodoList } from "./components/Todo/TodoList";
import { Body } from "./components/layout/Body";

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) => {
    return html(
      <Html>
        <Body />
      </Html>
    );
  })
  .get("/todos", async () => {
    const data = await prisma.todo.findMany();
    return <TodoList todos={data} />;
  })
  .post(
    "/todos/toggle/:id",
    async ({ params }) => {
      const oldTodo = await prisma.todo.findUnique({
        where: { id: params.id },
      });
      const newTodo = await prisma.todo.update({
        where: { id: params.id },
        data: { completed: !oldTodo?.completed },
      });
      return <TodoItem {...newTodo} />;
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .delete(
    "/todos/:id",
    async ({ params }) => {
      await prisma.todo.delete({
        where: { id: params.id },
      });
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .post(
    "/todos",
    async ({ body }) => {
      const newTodo = await prisma.todo.create({
        data: {
          content: body.content,
        },
      });
      return <TodoItem {...newTodo} />;
    },
    {
      body: t.Object({
        content: t.String({ minLength: 1 }),
      }),
    }
  )
  .get("/styles.css", () => {
    return Bun.file("./tailwind-gen/styles.css");
  })
  .listen(3000);

console.log(
  `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
