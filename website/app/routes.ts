import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("teams", "routes/teams.tsx"),
  route("players", "routes/players.tsx"),
  route("matches", "routes/matches.tsx"),
  route("drafting", "routes/drafting.tsx"),
  route("trading", "routes/trading.tsx"),
  route("chemistry", "routes/chemistry.tsx"),
  route("admin", "routes/admin.tsx"),
  route("kitchen-sink", "routes/kitchen-sink.tsx"),
] satisfies RouteConfig;
