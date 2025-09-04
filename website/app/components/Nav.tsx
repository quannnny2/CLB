import { Link } from "react-router";

export function Nav() {
  return (
    <nav className="border-b border-gray-200 py-4">
      <div className="container mx-auto flex items-center justify-start gap-12 h-full px-4">
        <Link to="/" className="text-xl font-bold font-happiness">
          Lil Slug Crew
        </Link>
        <ul className="flex flex-row items-center gap-8">
          <li>
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/teams" className="hover:text-gray-200">
              Teams
            </Link>
          </li>
          <li>
            <Link to="/players" className="hover:text-gray-200">
              Players
            </Link>
          </li>
          <li>
            <Link to="/matches" className="hover:text-gray-200">
              Matches
            </Link>
          </li>
          <li>
            <Link to="/drafting" className="hover:text-gray-200">
              Drafting
            </Link>
          </li>
          <li>
            <Link to="/trading" className="hover:text-gray-200">
              Trading
            </Link>
          </li>
          <li>
            <Link to="/chemistry" className="hover:text-gray-200">
              Chemistry
            </Link>
          </li>
          <li>
            <Link to="/admin" className="hover:text-gray-200">
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
