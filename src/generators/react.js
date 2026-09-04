import fs from "node:fs/promises";
import path from "node:path";

export async function generateReactProject(config, projectRoot) {
  const srcDir = path.join(projectRoot, "src");

  await fs.mkdir(srcDir, {
    recursive: true,
  });

  console.log("Generated React project.");
}