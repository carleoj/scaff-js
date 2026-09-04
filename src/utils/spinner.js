const FRAMES = [
  "⠋",
  "⠙",
  "⠹",
  "⠸",
  "⠼",
  "⠴",
  "⠦",
  "⠧",
  "⠇",
  "⠏",
];

export function startSpinner(message) {
  let frame = 0;

  process.stdout.write(`${FRAMES[frame]} ${message}`);

  const interval = setInterval(() => {
    frame = (frame + 1) % FRAMES.length;

    process.stdout.write("\r");
    process.stdout.write(`${FRAMES[frame]} ${message}`);
  }, 80);

  return () => {
    clearInterval(interval);
    process.stdout.write("\r\x1b[K");
  };
}