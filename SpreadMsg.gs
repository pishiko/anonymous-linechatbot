var post_url = "https://api.line.me/v2/bot/message/multicast"
function postbyList(msgs,idList){ 
    var token = CHANNEL_ACCESS_TOKEN    
    var params = {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + token,
      },
      'method':'post',
      'payload':JSON.stringify({
        'to':idList,
        'messages':[{
          'type':'text',
          'text':msgs,
        }],
        
      }),
    };
    UrlFetchApp.fetch(post_url, params);
  return true
}

function spreadMsg(msg,id) {
  var array = getId()
  var ind = searchData(array,0,id)
  
  var icon = array[ind][1]
  
  var idList = []
  for(var i=0;i<array.length;i++){
    var content = array[i][0]
    if(array[i][2] !== "T" && i !== ind){
       idList.push(content);
    }
  }
  var sendMsg = '['+icon+']\n'+msg;
  postbyList(sendMsg,idList);
}
