import { redirect } from "react-router";
import type { Route } from "./+types/admin";
import { requireUser } from "~/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireUser(request);

  if (user.role !== "admin") {
    throw redirect("/");
  }

  return { user };
}

export default function Admin({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Welcome, {loaderData.user.name}</p>
    </div>
  );
}
