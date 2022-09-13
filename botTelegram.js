import { Telegraf, Telegram } from 'telegraf';

const BOT_TOKEN = '5483202091:AAGW1FjlnKYdkhR-8Xd_HBvlkiYA79lBLjs'

const bot = new Telegraf(BOT_TOKEN)

const id_anderson= 5416846261

const id_grupo_strategy = -769185789


async function botStrategy(_botMsg){ 

    let msg  = _botMsg+('👍')   

    //const msg = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`

 //   bot.on('sticker', (ctx) => ctx.reply('⚽️🚨⚽️🚨⚽️🚨⚽️'))

    bot.telegram.sendMessage(id_grupo_strategy,msg);

};

export default { botStrategy }

                        
