#!/usr/bin/env node

const command = process.argv[2];

switch (command) {
    case "init":
        await import("../src/commands/init.js");
        break;

    default:
        console.log("Scaff.js");
        console.log("Scaffold your UI before you code it.");
        console.log("");
        console.log("Usage:");
        console.log("  scf init");
}