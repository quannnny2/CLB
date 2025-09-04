import type { Route } from "./+types/kitchen-sink";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

export async function loader({ request }: Route.LoaderArgs) {
  const imagesDir = join(process.cwd(), "public", "images");

  async function readDirectoryRecursively(
    dir: string,
    relativePath: string = ""
  ): Promise<{ imageFiles: string[]; directories: string[] }> {
    const imageFiles: string[] = [];
    const directories: string[] = [];

    try {
      const items = await readdir(dir, { withFileTypes: true });

      for (const item of items) {
        const fullPath = join(dir, item.name);
        const relativeItemPath = relativePath
          ? `${relativePath}/${item.name}`
          : item.name;

        if (
          item.isFile() &&
          /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(item.name)
        ) {
          imageFiles.push(`/images/${relativeItemPath}`);
        } else if (item.isDirectory()) {
          directories.push(relativeItemPath);

          const subResult = await readDirectoryRecursively(
            fullPath,
            relativeItemPath
          );
          imageFiles.push(...subResult.imageFiles);
          directories.push(...subResult.directories);
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error);
    }

    return { imageFiles, directories };
  }

  try {
    const result = await readDirectoryRecursively(imagesDir);

    return {
      imageFiles: result.imageFiles,
      directories: result.directories,
      totalImages: result.imageFiles.length,
    };
  } catch (error) {
    console.error("Error reading images directory:", error);
    return {
      imageFiles: [],
      directories: [],
      totalImages: 0,
    };
  }
}

export default function KitchenSink({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Font Examples</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Default Sans (NewCezanne Pro M)</h2>
        <p className="font-sans text-lg">
          The quick brown fox jumps over the lazy dog. 1234567890
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Aurea Ultra Roman</h2>
        <p className="font-aurea text-lg">
          The quick brown fox jumps over the lazy dog. 1234567890
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">NewRodin Pro EB</h2>
        <p className="font-rodin text-lg">
          The quick brown fox jumps over the lazy dog. 1234567890
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">PopHappiness Std EB</h2>
        <p className="font-happiness text-lg">
          The quick brown fox jumps over the lazy dog. 1234567890
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">ITC Bolt Bold</h2>
        <p className="font-bolt text-lg">
          The quick brown fox jumps over the lazy dog. 1234567890
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Size Examples</h2>
        <div className="space-y-2">
          <p className="font-aurea text-sm">Small text (14px)</p>
          <p className="font-cezanne text-base">Base text (16px)</p>
          <p className="font-rodin text-lg">Large text (18px)</p>
          <p className="font-happiness text-xl">Extra large text (20px)</p>
          <p className="font-bolt text-2xl">2XL text (24px)</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Screenshots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Batting and Field Positions</h3>
            <img
              src="/misc/screenshots/batting-and-field-positions.webp"
              alt="Batting and field positions"
              className="w-full rounded border"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Batting Interface</h3>
            <img
              src="/misc/screenshots/batting.webp"
              alt="Batting interface"
              className="w-full rounded border"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Captain Selection</h3>
            <img
              src="/misc/screenshots/captin-select.webp"
              alt="Captain selection"
              className="w-full rounded border"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Player Drafting</h3>
            <img
              src="/misc/screenshots/drafting.webp"
              alt="Player drafting"
              className="w-full rounded border"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Empty Draft State</h3>
            <img
              src="/misc/screenshots/empty-draft.webp"
              alt="Empty draft state"
              className="w-full rounded border"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">File Selection</h3>
            <img
              src="/misc/screenshots/file-selection.webp"
              alt="File selection"
              className="w-full rounded border"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Game Tutorial</h3>
            <img
              src="/misc/screenshots/game-tutorial.webp"
              alt="Game tutorial"
              className="w-full rounded border"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Player Leaderboard</h3>
            <img
              src="/misc/screenshots/leaderboard.webp"
              alt="Player leaderboard"
              className="w-full rounded border"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Loading Screen</h3>
            <img
              src="/misc/screenshots/loading.webp"
              alt="Loading screen"
              className="w-full rounded border"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Main Menu</h3>
            <img
              src="/misc/screenshots/main-menu.webp"
              alt="Main menu"
              className="w-full rounded border"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Match Statistics</h3>
            <img
              src="/misc/screenshots/match-stats.webp"
              alt="Match statistics"
              className="w-full rounded border"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Menu Tutorial</h3>
            <img
              src="/misc/screenshots/menu-tutorial.webp"
              alt="Menu tutorial"
              className="w-full rounded border"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Pitching Interface</h3>
            <img
              src="/misc/screenshots/pitching.webp"
              alt="Pitching interface"
              className="w-full rounded border"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Image Gallery ({loaderData.totalImages} images)
        </h2>
        <p className="text-white">
          Found {loaderData.directories.length} directories:{" "}
          {loaderData.directories.join(", ")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {loaderData.imageFiles.map((imagePath, index) => {
            const fileName = imagePath.split("/").pop() || "";
            const displayName = fileName.replace(
              /\.(png|jpg|jpeg|gif|webp|svg)$/i,
              ""
            );

            return (
              <div key={index} className="space-y-2">
                <div className="aspect-square overflow-hidden rounded-lg border bg-gray-50">
                  <img
                    src={imagePath}
                    alt={displayName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                    style={{
                      imageRendering: "crisp-edges",
                    }}
                  />
                </div>
                <p
                  className="text-xs text-center text-white truncate"
                  title={displayName}
                >
                  {displayName}
                </p>
              </div>
            );
          })}
        </div>
        {loaderData.imageFiles.length === 0 && (
          <p className="text-white italic">No images found in the directory.</p>
        )}
      </section>
    </div>
  );
}
