import * as elements from "typed-html";

export const Body = () => {
  return (
    <body
      class="flex w-full h-screen justify-center items-center"
      hx-get="/todos"
      hx-swap="innerHTML"
      hx-trigger="load"
    />
  );
};
