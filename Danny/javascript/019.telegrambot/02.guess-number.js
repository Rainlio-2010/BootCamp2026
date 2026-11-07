import { Bot } from 'node-telegram-bot-api';
import { run } from 'node-telegram-bot-api/node';
import 'dotenv/config';

const bot = new Bot(process.env.BOT_TOKEN);

// 使用 Map 存储每个用户的独立游戏状态（Key 为 chatId）
// 状态包含：target（目标随机数）、attempts（已猜次数）、isPlaying（游戏状态）
const games = new Map();

// 监听 /start 指令：开始新一局游戏
bot.command('start', async (ctx) => {
  const chatId = ctx.chatId;
  const target = Math.floor(Math.random() * 101); // 生成 0 ~ 100 间的随机整数

  games.set(chatId, {
    target,
    attempts: 0,
    isPlaying: true,
  });

  console.log(`[新游戏开始] 会话 ID: ${chatId}，生成目标数字: ${target}`);

  await ctx.reply(
    '🎮 猜数字游戏已开始！\n' +
      '我已经想好了一个 0 到 100 之间的数字。\n' +
      '请直接输入你猜测的数字（例如：50）：',
  );
});

// 监听消息事件：处理用户的猜测数字
bot.on('message', async (ctx) => {
  const text = ctx.message?.text?.trim();
  const chatId = ctx.chatId;

  // 忽略指令（如 /start 等）或非文本内容
  if (!text || text.startsWith('/')) {
    console.log('no text', text);
    return;
  }

  const game = games.get(chatId);

  // 检查是否已有进行中的游戏
  if (!game || !game.isPlaying) {
    await ctx.reply(
      '⚠️ 当前没有进行中的游戏，请输入 /start 开始新一局猜数字！',
    );
    return;
  }

  // 校验输入是否为 0 ~ 100 的有效整数
  const guess = Number(text);
  if (!Number.isInteger(guess) || guess < 0 || guess > 100) {
    await ctx.reply('❌ 请输入 0 到 100 之间的有效整数！');
    return;
  }

  // 记录猜测次数
  game.attempts += 1;

  if (guess > game.target) {
    await ctx.reply(`📉 太大了！你已经猜了 ${game.attempts} 次。`);
  } else if (guess < game.target) {
    await ctx.reply(`📈 太小了！你已经猜了 ${game.attempts} 次。`);
  } else {
    // 猜中目标数字
    const totalAttempts = game.attempts;
    game.isPlaying = false;
    games.delete(chatId); // 猜中后清除会话记录

    await ctx.reply(
      `🎉 恭喜你猜对了！目标数字就是 ${guess}！\n` +
        `👏 你一共猜了 ${totalAttempts} 次。\n\n` +
        '💡 发送 /start 可以开始新的一局游戏。',
    );
  }
});

console.log('🤖 猜数字机器人启动中...');
await run(bot);
