import { Bot,  } from "node-telegram-bot-api";
import { run } from "node-telegram-bot-api/node"; 
import 'dotenv/config';

const token = process.env.BOT_TOKEN;

const bot = new Bot(token);

bot.command("start", (ctx) => ctx.reply("Hi! Send me anything."));
bot.hears(/echo (.+)/, (ctx) => ctx.reply(ctx.match[1]));


bot.on("message", (ctx) => {
  if (ctx.message.text) {
    ctx.reply(`${ctx.message.text}`);
    console.log(ctx);
    console.log(ctx.message.from)
  }
});

await run(bot);