import { redirect } from "next/navigation";

export default function Home() {
  // TODO: Add logic here to check if the user is authenticated.
  // If they are logged in, return the dashboard/home component.
  // For now, we default to redirecting to the sign-in page.
  const isAuthenticated = false;

  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome to TransitOps</h1>
      <p className="mt-4 text-xl">You are logged in.</p>
    </div>
  );
}
