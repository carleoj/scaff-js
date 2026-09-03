import { writeFile } from "node:fs/promises";

export async function createScaffConfig(config) {
    const content = JSON.stringify(config, null, 2);

    await writeFile("scaff.json", content + "\n");
}