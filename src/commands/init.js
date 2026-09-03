import { confirm, checkbox, select, Separator } from "@inquirer/prompts";

import { createScaffConfig } from "../utils/scaff-config.js";

const CANCEL = "__cancel__";
const EXIT = "__exit__";
const FINISH = "__finish__";

async function configureSection({
  section,
  choices,
  defaultAdd = true,
}) {
  const shouldAdd = await confirm({
    message: `Add ${section}?`,
    default: defaultAdd,
  });

  if (!shouldAdd) {
    return null;
  }

  const variant = await select({
    message: `Select ${section} Configuration`,
    choices: [
      ...choices,

      new Separator("──────────"),

      {
        name: "Cancel",
        value: CANCEL,
      },
    ],
    pageSize: 10,
  });

  // Cancel this section only.
  if (variant === CANCEL) {
    return null;
  }

  return {
    type: section.toLowerCase(),
    variant,
  };
}

async function configureAdditionalComponents() {
  const shouldAdd = await confirm({
    message: "Add Additional Components?",
    default: false,
  });

  if (!shouldAdd) {
    return [];
  }

  const selected = await checkbox({
    message: "Select Additional Components",
    choices: [
      {
        name: "Features",
        value: "features",
      },
      {
        name: "Testimonials",
        value: "testimonials",
      },
      {
        name: "Pricing",
        value: "pricing",
      },
      {
        name: "FAQ",
        value: "faq",
      },
      {
        name: "Gallery",
        value: "gallery",
      },
      {
        name: "Contact",
        value: "contact",
      },
    ],
    pageSize: 6,
  });

  const action = await select({
    message: "Additional Components",
    choices: [
      {
        name: "Finish",
        value: FINISH,
      },

      new Separator("──────────"),

      {
        name: "Cancel",
        value: CANCEL,
      },
    ],
    pageSize: 3,
  });

  if (action === CANCEL) {
    return [];
  }

  return selected.map((type) => ({
    type,
  }));
}

async function initialize() {
  // -------------------------
  // Framework
  // -------------------------

  const framework = await select({
    message: "Select Framework",
    choices: [
      {
        name: "Plain HTML/CSS",
        value: "plain",
      },
      {
        name: "React/CSS",
        value: "react",
      },

      new Separator("──────────"),

      {
        name: "Exit",
        value: EXIT,
      },
    ],
  });

  // Exit the entire initialization.
  if (framework === EXIT) {
    console.log("");
    console.log("Scaffolding cancelled.");
    return;
  }

  const config = {
    framework,
    styling: "css",
    components: [],
  };

  // -------------------------
  // Header
  // -------------------------

  const header = await configureSection({
    section: "Header",
    choices: [
      {
        name: "Logo + Navigation Links",
        value: "logo-navigation",
      },
      {
        name: "Logo + Navigation Links + CTA Button",
        value: "logo-navigation-cta",
      },
      {
        name: "Navigation Links Only",
        value: "navigation-only",
      },
    ],
  });

  if (header) {
    config.components.push(header);
  }

  // -------------------------
  // Hero
  // -------------------------

  const hero = await configureSection({
    section: "Hero",
    choices: [
      {
        name: "Heading + Description + Button",
        value: "heading-description-button",
      },
      {
        name: "Heading + Description + Button + Image",
        value: "heading-description-button-image",
      },
      {
        name: "Heading + Description Only",
        value: "heading-description",
      },
    ],
  });

  if (hero) {
    config.components.push(hero);
  }

  // -------------------------
  // Body
  // -------------------------

  const body = await configureSection({
    section: "Body",
    choices: [
      {
        name: "Text Content",
        value: "text",
      },
      {
        name: "Text + Image",
        value: "text-image",
      },
      {
        name: "Feature Cards",
        value: "feature-cards",
      },
      {
        name: "Content Sections",
        value: "content-sections",
      },
    ],
  });

  if (body) {
    config.components.push(body);
  }

  // -------------------------
  // Footer
  // -------------------------

  const footer = await configureSection({
    section: "Footer",
    choices: [
      {
        name: "Copyright Only",
        value: "copyright",
      },
      {
        name: "Copyright + Navigation Links",
        value: "copyright-navigation",
      },
      {
        name: "Copyright + Social Links",
        value: "copyright-social",
      },
      {
        name: "Copyright + Navigation Links + Social Links",
        value: "copyright-navigation-social",
      },
    ],
  });

  if (footer) {
    config.components.push(footer);
  }

  // -------------------------
  // Additional Components
  // -------------------------

  const additionalComponents =
    await configureAdditionalComponents();

  config.components.push(...additionalComponents);

  // -------------------------
  // Create configuration
  // -------------------------

  await createScaffConfig(config);

  console.log("");
  console.log("Scaffolding complete.");
  console.log("Created scaff.json");
}

await initialize();

