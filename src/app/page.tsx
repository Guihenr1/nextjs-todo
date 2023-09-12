import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";
import Link from "next/link";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";

  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2x1 uppercase font-bold select-none">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 p-1 rounded hover:bg-green-700 focus-within:bg-green-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} toggleTodo={toggleTodo} {...todo} />
        ))}
      </ul>
    </>
  );
}
