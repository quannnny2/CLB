import type { Route } from "./+types/home";

export default function Home({}: Route.ComponentProps) {
  return (
    <div>
      <h1>Lil Slug Crew</h1>
      <p>
        <a href="/kitchen-sink" className="underline hover:text-gray-200">
          Kitchen Sink
        </a>
      </p>
    </div>
  );
}
