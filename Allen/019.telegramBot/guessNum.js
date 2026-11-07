import { Bot } from "node-telegram-bot-api";
import { run } from "node-telegram-bot-api/node";
import "dotenv/config";

const bot = new Bot(process.env.BOT_TOKEN);

/** Messages for the game */
const MIN_NUMBER = 1;
const MAX_NUMBER = 100;
const START_COMMAND_NAME = "start";
const START_COMMAND = `/${START_COMMAND_NAME}`;
const MESSAGE_OPTIONS = { parse_mode: "HTML" };
const FORMATTED_NUMBER_RANGE = `<b>${MIN_NUMBER} and ${MAX_NUMBER}</b>`;
const NEW_ROUND_PROMPT = `🎯 A new secret number is ready. Keep guessing!`;
const ATTEMPTS_MESSAGE = (attempts) => `🎯 Attempts: <b>${attempts}</b>`;

const RULES_MESSAGE = `🎯 <b>NUMBER GUESSING GAME</b>

I've picked a secret number between ${FORMATTED_NUMBER_RANGE}.
Send me your guess, and I'll tell you whether to go higher or lower.

💡 <i>Ready? Send your first number!</i>`;

const NO_ACTIVE_GAME_MESSAGE = `🎮 <b>No active game</b>

send ${START_COMMAND} to start a new round of the guessing game.`;

const INVALID_NUMBER_MESSAGE = `🔢 <b>That doesn't look like a number</b>

Please enter a whole number between ${FORMATTED_NUMBER_RANGE}.`;

const OUT_OF_RANGE_MESSAGE = `🚧 <b>Out of range</b>

Please choose a number between ${FORMATTED_NUMBER_RANGE}.`;

const TOO_LOW_MESSAGE = (attempts) => `⬆️ <b>Too low!</b>

Try a higher number.
${ATTEMPTS_MESSAGE(attempts)}`;

const TOO_HIGH_MESSAGE = (attempts) => `⬇️ <b>Too high!</b>

Try a lower number.
${ATTEMPTS_MESSAGE(attempts)}`;

const CORRECT_GUESS_MESSAGE = (target, attempts) => `🎉 <b>Congratulations!</b>

You found the secret number: <b>${target}</b>
🏆 Guesses used: <b>${attempts}</b>

${NEW_ROUND_PROMPT}`;

/** ---------------------------------------------- */

const guessHistory = {};
const targetNumbers = {};

function resetGame(userId) {
  targetNumbers[userId] =
    Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;

  guessHistory[userId] = [];
}

function pushGuess(userId, guess) {
  guessHistory[userId] = guessHistory[userId] || [];
  guessHistory[userId].push(guess);
}

function compareNumbers(guess, target, userId) {
  if (guess < target) {
    pushGuess(userId, guess);
    return TOO_LOW_MESSAGE(guessHistory[userId].length);
  } else if (guess > target) {
    pushGuess(userId, guess);
    return TOO_HIGH_MESSAGE(guessHistory[userId].length);
  } else {
    pushGuess(userId, guess);
    const attempts = guessHistory[userId].length;
    const response = CORRECT_GUESS_MESSAGE(target, attempts);
    resetGame(userId);
    return response;
  }
}

bot.command(START_COMMAND_NAME, async (ctx) => {
  const userId = ctx.message.from.id;
  await ctx.reply(RULES_MESSAGE, MESSAGE_OPTIONS);
  resetGame(userId);
});

bot.on("message", async (ctx) => {
  const userId = ctx.message.from.id;
  const guess = parseInt(ctx.message.text, 10);

  if (!targetNumbers[userId]) {
    await ctx.reply(NO_ACTIVE_GAME_MESSAGE, MESSAGE_OPTIONS);
    return;
  }

  if (isNaN(guess)) {
    await ctx.reply(INVALID_NUMBER_MESSAGE, MESSAGE_OPTIONS);
  } else if (guess < MIN_NUMBER || guess > MAX_NUMBER) {
    await ctx.reply(OUT_OF_RANGE_MESSAGE, MESSAGE_OPTIONS);
  } else {
    const response = compareNumbers(guess, targetNumbers[userId], userId);
    await ctx.reply(response, MESSAGE_OPTIONS);
    console.log(guessHistory, targetNumbers);
  }
});

await run(bot);
