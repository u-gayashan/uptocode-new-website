import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <main className="p-6 flex-1">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <p className="mt-2 text-slate-700 dark:text-slate-300">
          Use the sign-in/sign-up buttons in the header to get started.
        </p>
      </main>
    );
  }

  return (
    <main className="p-6 flex-1">
      <h1 className="text-2xl font-bold">You are signed in as {userId}</h1>
      <p className="mt-2 text-slate-700 dark:text-slate-300">
        Clerk-authenticated session is active for this request.
      </p>
    </main>
  );
}
