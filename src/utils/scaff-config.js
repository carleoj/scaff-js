import fs from "node:fs/promises";
import path from "node:path";

export async function createScaffConfig(config, projectRoot) {
  await fs.mkdir(projectRoot, {
    recursive: true,
  });

  const configPath = path.join(
    projectRoot,
    "scaff.json"
  );

  await fs.writeFile(
    configPath,
    JSON.stringify(config, null, 2),
    "utf8"
  );
}