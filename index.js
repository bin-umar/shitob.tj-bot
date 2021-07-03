require('dotenv').config();

const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(Telegraf.log());

bot.start((ctx) => ctx.reply('Салом братан'));
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => {
    console.log(ctx.message.message_id);
    console.log(ctx.update.message.from);
    console.log(ctx.update.message.chat);
    ctx.replyWithDocument()
});
bot.launch();

// Конфиг клавиатуры
const keyboard = [
    [
        {
            text: 'Хочу кота', // текст на кнопке
            callback_data: 'moreKeks' // данные для обработчика событий
        }
    ],
    [
        {
            text: 'Хочу песика',
            callback_data: 'morePes'
        }
    ],
    [
        {
            text: 'Хочу проходить курсы',
            url: 'https://htmlacademy.ru/courses' //внешняя ссылка
        }
    ]
];

// обработчик события присылания нам любого сообщения
bot.on('message', (ctx) => {
    const chatId = ctx.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

    // отправляем сообщение
    ctx.telegram.sendMessage(chatId, 'Привет, Друг! чего хочешь?', { // прикрутим клаву
        reply_markup: {
            inline_keyboard: keyboard
        }
    }).then((answer) => {
        console.log('Answer ', answer);
    });
});
//
// bot.on('callback_query', (query) => {
//     const chatId = query.chat.id;
//
//     let img = '';
//
//     console.log(query.data);
//
//     if (query.data === 'moreKeks') { // если кот
//         img = 'keks.png';
//     }
//
//     if (query.data === 'morePes') { // если пёс
//         img = 'pes.png';
//     }
//
//     if (img) {
//         bot.sendPhoto(chatId, img, { // прикрутим клаву
//             reply_markup: {
//                 inline_keyboard: keyboard
//             }
//         });
//     } else {
//         bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', {
//             // прикрутим клаву
//             reply_markup: {
//                 inline_keyboard: keyboard
//             }
//         });
//     }
// });

// bot.command('onetime', (ctx) =>
//     ctx.reply('One time keyboard', Markup
//         .keyboard(['/simple', '/inline', '/pyramid'])
//         .oneTime()
//         .resize()
//     )
// );

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
