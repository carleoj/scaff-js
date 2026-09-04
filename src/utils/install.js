import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

export async function initializeNpm(projectRoot) {
  await execAsync("npm init -y", {
    cwd: projectRoot,
  });
}

export async function installDependencies(projectRoot, packages) {
  await execAsync(`npm install ${packages.join(" ")}`, {
    cwd: projectRoot,
  });
}