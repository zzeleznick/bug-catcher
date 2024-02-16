import { debounce } from "https://deno.land/std@0.207.0/async/debounce.ts";
import { bundle } from "https://deno.land/x/emit@0.36.0/mod.ts";

const log = debounce((event: Deno.FsEvent) => {
  console.log("[%s] %s", event.kind, event.paths[0]);
}, 200);

const bundler = debounce(async (_event: Deno.FsEvent) => {
  const result = await bundle("./main.ts", {
    minify: true,
  });
  await Deno.writeTextFile("./game.bundle.js", result.code);
  console.log("Bundled");
}, 200);

const watcher = Deno.watchFs("./");

for await (const event of watcher) {
  log(event);
  if (event.paths[0].endsWith(".ts")) {
    bundler(event);
  }
}
