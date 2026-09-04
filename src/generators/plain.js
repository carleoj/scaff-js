import path from "node:path";
import fs from "node:fs/promises";
import { createDirectories } from "../utils/directories.js";
import { initializeNpm, installDependencies } from "../utils/install.js";
import { startSpinner } from "../utils/spinner.js";

export async function generatePlainProject(config, projectRoot) {
  const plainRoot = path.join(projectRoot, "plain");

  const directories = [
    path.join(plainRoot, "html"),
    path.join(plainRoot, "js"),
    path.join(plainRoot, "other", "imgs"),
    path.join(plainRoot, "other", "fonts"),
  ];

  const stopSpinner = startSpinner("Scaffolding project...");

  try {
    await createDirectories(directories);

    await initializeNpm(plainRoot);

    await installDependencies(plainRoot, ["tailwindcss", "@tailwindcss/cli"]);
  } finally {
    stopSpinner();
  }

  await fs.writeFile(
    path.join(plainRoot, "input.css"),
    '@import "tailwindcss";\n',
    "utf8",
  );
}
