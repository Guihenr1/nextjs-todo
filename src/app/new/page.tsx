import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }

  await prisma.todo.create({ data: { title, complete: false } });
  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2x1 uppercase font-bold select-none">New</h1>
      </header>
      <form action={createTodo} className="flex flex-col">
        <label className="text-sm font-bold">Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Type the title for the task"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100 mb-3"
        />
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 p-1 rounded hover:bg-red-700 focus-within:bg-red-700 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 p-1 rounded hover:bg-green-700 focus-within:bg-green-700 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
