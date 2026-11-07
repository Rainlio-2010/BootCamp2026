import { ToolLoopAgent, tool } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline/promises";

// Dynamically load skills from .agents/skills/*/SKILL.md
const skillsDir = path.join(import.meta.dirname, ".agents", "skills");
const skillEntries: { name: string; description: string }[] = [];
const skillContents = new Map<string, string>();

if (fs.existsSync(skillsDir)) {
  for (const dir of fs.readdirSync(skillsDir)) {
    const skillFile = path.join(skillsDir, dir, "SKILL.md");
    if (fs.existsSync(skillFile)) {
      const content = fs.readFileSync(skillFile, "utf-8");
      // Parse frontmatter
      const match = content.match(/^---\n([\s\S]*?)\n---/);
      if (match) {
        const frontmatter = match[1];
        const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
        const descMatch = frontmatter.match(/^description:\s*(.+)$/m);
        if (nameMatch && descMatch) {
          skillEntries.push({
            name: nameMatch[1].trim(),
            description: descMatch[1].trim(),
          });
          skillContents.set(nameMatch[1].trim(), content);
        }
      }
    }
  }
}

const skillListXml = skillEntries
  .map(
    (s) =>
      `  <skill>\n  <name>${s.name}</name>\n  <description>${s.description}</description>\n  </skill>`,
  )
  .join("\n");

const systemInstructions = `
  <available_skills>
  ${skillListXml}
  </available_skills>

  To use a skill, call the 'read_skill' tool with the skill name.
  Do not assume you know the skill instructions until you call 'read_skill'.
  When a skill requires asking the user questions, output your question as text and stop. Wait for the user's next message.
  `;

const agent = new ToolLoopAgent({
  model: google("gemini-3-flash-preview"),
  instructions: systemInstructions,
  tools: {
    read_skill: tool({
      description:
        "Activates a skill by loading its full instructions. Use this when a user task matches a skill description.",
      inputSchema: z.object({
        skillName: z.string().describe("The name of the skill to activate"),
      }),
      execute: async ({ skillName }) => {
        const content = skillContents.get(skillName);
        if (!content) {
          return `[SYSTEM: Skill "${skillName}" not found. Available skills: ${skillEntries.map((s) => s.name).join(", ")}]`;
        }
        return `[SYSTEM: Skill "${skillName}" activated. You Must Following the instructions below.]\n\n${content}`;
      },
    }),
  },
});

// ── ANSI helpers ──
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
  bgCyan: "\x1b[46m",
  white: "\x1b[37m",
};

// ── Spinner with transparency gradient wave ──
const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
function rgb(r: number, g: number, b: number) {
  return `\x1b[38;2;${r};${g};${b}m`;
}
function createSpinner(text: string) {
  let frame = 0;
  const len = text.length;
  const timer = setInterval(() => {
    const spinner = `${c.cyan}${spinnerFrames[frame % spinnerFrames.length]}${c.reset}`;
    const wave = [...text]
      .map((ch, i) => {
        // Create a sine wave that moves through the text
        const phase = ((frame * 0.15) + (i / len) * Math.PI * 2) % (Math.PI * 2);
        // Map sine to opacity: 0.15 (dim) → 1.0 (bright)
        const t = (Math.sin(phase) + 1) / 2; // 0→1
        const opacity = 0.15 + t * 0.85;
        // Apply opacity to a white base color (255, 255, 255)
        const r = Math.round(255 * opacity);
        const g = Math.round(255 * opacity);
        const b = Math.round(255 * opacity);
        return `${rgb(r, g, b)}${ch}`;
      })
      .join("");
    process.stdout.write(`\r${spinner} ${wave}${c.reset}`);
    frame++;
  }, 80);
  return {
    stop() {
      clearInterval(timer);
      process.stdout.write("\r\x1b[K");
    },
  };
}

// ── Banner ──
const skillList = skillEntries.map((s) => `  ${c.yellow}•${c.reset} ${s.name} ${c.dim}— ${s.description}${c.reset}`).join("\n");

console.log(`
${c.bold}${c.cyan}┌─────────────────────────────────────┐${c.reset}
${c.bold}${c.cyan}│         🤖  Agent Skills CLI        │${c.reset}
${c.bold}${c.cyan}└─────────────────────────────────────┘${c.reset}
${skillEntries.length > 0 ? `\n${c.bold}Available skills:${c.reset}\n${skillList}\n` : ""}${c.dim}Type your message to chat. Press Ctrl+C or enter quit or exit to exit.${c.reset}
`);

// ── Interactive CLI loop ──
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages: { role: "user" | "assistant"; content: string }[] = [];

while (true) {
  const input = await rl.question(`${c.green}${c.bold}❯ ${c.reset}`);
  if (!input.trim()) continue;

  if (input.toLowerCase() === "quit" || input.toLowerCase() === "exit") {
    rl.close();
    break;
  }

  messages.push({ role: "user", content: input });

  console.log();
  const spinner = createSpinner("Thinking...");
  try {
    const result = await agent.generate({ messages });
    spinner.stop();
    const reply = result.text;
    console.log(`${c.magenta}${c.bold}Agent:${c.reset} ${reply}\n`);
    messages.push({ role: "assistant", content: reply });
  } catch (err: any) {
    spinner.stop();
    console.error(`\n${c.red}${c.bold}Error:${c.reset} ${c.red}${err.message}${c.reset}\n`);
  }
}
