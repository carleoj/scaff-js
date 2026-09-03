import { select } from "@inquirer/prompts";
import { createScaffConfig } from "../../utils/scaff-config.js";

const framework = await select({
    message: "Select Framework",
    choices: [
        {
            name: "Plain HTML/CSS",
            value: "plain"
        },
        {
            name: "React/CSS",
            value: "react"
        }
    ]
});

const config = {
    framework,
    styling: "css",
    components: []
};

await createScaffConfig(config);

console.log("");
console.log("Scaff project initialized.");
console.log("Created scaff.json");