import { Link } from "react-router";

export function Nav() {
  return (
    <nav className="border-b border-gray-200 py-3">
      <div className="container mx-auto flex items-center justify-start gap-12 h-full px-4">
        <Link to="/" className="text-xl font-bold font-happiness text-gray-900">
          Lil Slug Crew
        </Link>
        <ul className="flex flex-row items-center gap-8">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/teams"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Teams
            </Link>
          </li>
          <li>
            <Link
              to="/players"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Players
            </Link>
          </li>
          <li>
            <Link
              to="/matches"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Matches
            </Link>
          </li>
          <li>
            <Link
              to="/drafting"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Drafting
            </Link>
          </li>
          <li>
            <Link
              to="/trading"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Trading
            </Link>
          </li>
          <li>
            <Link
              to="/chemistry"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Chemistry
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
