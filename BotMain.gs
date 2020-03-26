const CHANNEL_ACCESS_TOKEN = "" //LINE_TOKEN
const reply_url = "https://api.line.me/v2/bot/message/reply";

function reply(text,reply_token){
  var params = {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
      },
      'method':'post',
      'payload':JSON.stringify({
        'replyToken':reply_token,
        'messages':[{
          'type':'text',
          'text':text,
        }],
        
      }),
    };
  UrlFetchApp.fetch(reply_url, params);
}

function doPost(e){
  
  var event = JSON.parse(e.postData.contents).events[0];
  var reply_token = event.replyToken;
  
  //参加返信
  if(event.type=="join"){
    //reply("join group",reply_token);
  }
  
  //メッセージ返信
  else if(event.type=="message"){
    //文章の場合
    if(event.message.type=="text"){
      
      var txt = event.message.text
      var id = event.source.userId
      if(txt=="!mute"){
          setIdto(event.source.userId,2,'T')
          reply("[Bot]\nミュートに設定しました。\nメニューからミュートを解除できます。",reply_token)
        
      }else if(txt=="!unmute"){
        setIdto(event.source.userId,2,'F')
        reply("[Bot]\nミュートを解除しました。\nメニューからミュートに設定できます。",reply_token)
      }else if(txt=="!checkicon"){
        var array = getId()
        var index = searchData(array,0,event.source.userId)
        var icon = array[index][1]
        reply("[Bot]\nあなたのアイコンは["+icon+"]です。",reply_token)
      }else{
        spreadMsg(txt,id)
      }
      
      //スタンプの場合
    }else if(event.message.type=="sticker"){
//      var params = {
//        'headers': {
//          'Content-Type': 'application/json; charset=UTF-8',
//          'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
//        },
//        'method':'post',
//        'payload':JSON.stringify({
//          'replyToken':reply_token,
//          'messages':[{
//            'type':'sticker',
//            'stickerId':event.message.stickerId,
//            'packageId':event.message.packageId,
//          }],
//          
//        }),
//      };
//      UrlFetchApp.fetch(reply_url, params);
      var msg = '[Bot]\nSorry!スタンプは送信できません..'
      reply(msg,reply_token)
    }else if(event.message.type === "image" || event.message.type === "audio" || event.message.type === "video" || event.message.type === "file" || event.message.type === "location")
      var msg = '[Bot]\nSorry!このコンテンツは送信できません..'
      reply(msg,reply_token)
  }
  else if(event.type == "follow"){
    pushId(event.source.userId,reply_token)
  }else if(event.type == "unfollow"){
    clearId(event.source.userId)
  }
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}
