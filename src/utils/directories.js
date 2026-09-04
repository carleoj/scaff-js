import fs from "node:fs/promises";

export async function createDirectories(directories) {
  await Promise.all(
    directories.map((directory) =>
      fs.mkdir(directory, { recursive: true })
    )
  );
}