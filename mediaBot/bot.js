const Telegraf=require('telegraf');
const bot= new Telegraf('6180046061:AAGWKCVNmvN8yx_PKEWe-PyrxHgudDMBbC0');//constructor of telegraph

bot.command(['start','help'],ctx=>{
    let message=`
    /newyork -get newYork images
    /dubai -get dubai images
    /singapore -get singapore images
    /cities -get cities images
    /citiesList -get cities list

    `;
    ctx.reply(message);
})


//There are 5 ways to interact with files in telegraf library
// existing file_id
//File Path
// Url
//Buffer
//ReadStream
// We b focusing on top 3

//to send a photo using Url
// bot.command('test',ctx => {
//     bot.telegram.sendPhoto(ctx.chat.id,"https://pixabay.com/illustrations/flash-slothmore-fictional-character-7298115/");

// })


//to send photo/file from file path
// bot.command('test',ctx => {
//     bot.telegram.sendPhoto(ctx.chat.id,{source: "res/hongkong.jpg"});

// })

//send file with fiile id
//The bot.on .... below is used to get file id and props when user interacts with user

// bot.on('message', ctx => {
//     console.log(ctx.message.photo);
// })
// bot.command('test',ctx => {

//     bot.telegram.sendPhoto(ctx.chat.id,"AgACAgQAAxkBAAMNZCBH3l2nc0BnlbO5Rt-m66xnkf4AAjbCMRseeghReCMwFhKS5SMBAAMCAANtAAMvBA")//we take the file id at index 1, not 0

// })

bot.command('newyork',ctx =>{
//Send chat action is like a typing... mnamn stuf and doesn't last for long it's like a toast
//In 5 seconds toasting if there is no photo sent in case of this proj it disappears


    bot.telegram.sendChatAction(ctx.chat.id,"upload_photo");

    bot.telegram.sendPhoto(ctx.chat.id,{
        source:'res/newyork.jpg'
    },
    {
        reply_to_message_id : ctx.message.message_id
    })
})
//lets b sending gifs now
bot.command('dubai',ctx =>{
        bot.telegram.sendChatAction(ctx.chat.id,"upload_video");
    
        bot.telegram.sendAnimation(ctx.chat.id,
           "https://giphy.com/gifs/Canticosworld-mexico-canticos-jarabe-tapatio-KHcp972Wt0YKL0Nj6R" ,
        {
            reply_to_message_id : ctx.message.message_id
        })
    })

//cities command
bot.command('cities', ctx =>{
    let cities=['res/hongkong.jpg', 'res/london.jpg','res/newyork.jpg','res/singapore.jpg'];

    let result=cities.map(city =>{
        return{
            type:'photo',
            media:{
                source:city
            }
        }
    })
    bot.telegram.sendMediaGroup(ctx.chat.id,result);
})

//cities list command
bot.command('citiesList',ctx=>{
    bot.telegram.sendDocument(ctx.chat.id,{
        source: "res/citiesList.txt"
    },
    {
        thumb:{
            source: "res/dubai.jpg"
        }
    })
})
//the singapore location command
bot.command('singapore',ctx=>{
    bot.telegram.sendLocation(ctx.chat.id,9.422,42.035);
})

//generate a personal downloadable link with our bot for files and image
//Steps to get file id first console log ctx and see e where file id is stored
bot.on('message', async ctx =>{
    
    if(ctx.updateSubTypes[0]=='document'){
        
        try{
            let link=await bot.telegram.getFileLink(ctx.message.document.file_id);
            ctx.reply('Download link: '+ link);
        }catch(err){
            console.log(err);
            ctx.reply(err.description);
        }
    }
    else if(ctx.updateSubTypes[0]=='photo'){
        try{
            let link=await bot.telegram.getFileLink(ctx.message.photo[0].file_id);
            ctx.reply('Download link: '+ link);
        }catch(err){
            console.log(err);
            ctx.reply(err.description);
        }
    }
})



bot.launch();