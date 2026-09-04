import { generatePlainProject } from "./plain.js";
import { generateReactProject } from "./react.js";

export async function generateProject(config, projectRoot) {
  switch (config.framework) {
    case "plain":
      return generatePlainProject(config, projectRoot);

    case "react":
      return generateReactProject(config, projectRoot);

    default:
      throw new Error(
        `Unsupported framework: ${config.framework}`
      );
  }
}