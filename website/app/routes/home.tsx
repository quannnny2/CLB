import type { Route } from "./+types/home";

export default function Home({}: Route.ComponentProps) {
  return (
    <div>
      <h1>Lil Slug Crew</h1>
      <p>
        <a
          href="/kitchen-sink"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Kitchen Sink
        </a>
      </p>
    </div>
  );
}
