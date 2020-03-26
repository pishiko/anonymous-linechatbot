const EMOJI_SHEET_ID = ""//絵文字リスト用スプレッドシートID
const MEMBER_SHEET_ID = ""//絵文字やUUID，設定のスプレッドシートID

function searchData(array,index,content){
  for(var i=0;i<array.length;i++){
    if(array[i][index]==content){
      return i
    }
  }
  return -1
}


function pushId(id,reply_token) {
  //icon
  var spsheet2 = SpreadsheetApp.openById(EMOJI_SHEET_ID)
  var sheet2 = spsheet2.getActiveSheet()
  var icon = sheet2.getRange(1, 1).getValue()
  
  sheet2.deleteRow(1)
  
  //lineid
  var spsheet = SpreadsheetApp.openById(MEMBER_SHEET_ID)
  var sheet = spsheet.getActiveSheet()
  var iconId = sheet.getLastRow()-1
  var values = sheet.getRange(2,1,iconId,3).getValues()
  if(searchData(values,0,id)===-1){
    sheet.appendRow([
      id,
      icon,
      'F'
    ])
  }
  var msg = "[Bot]\n登録ありがとうございます。\nここでは他のBot登録者と匿名でチャットができます。\nあなたのアイコンは["+icon+"]です。\nまた、メニューからミュートにすることもできます。通知がうるさいと感じたら切り替えてください。"
  reply(msg,reply_token)
}

function getId(){
  var spsheet = SpreadsheetApp.openById(MEMBER_SHEET_ID)
  var sheet = spsheet.getActiveSheet()
  var last = sheet.getLastRow()
  var values = sheet.getRange(2,1,last-1,3).getValues()
  
  return values
}

function setIdto(id,index,content){
  var spsheet = SpreadsheetApp.openById(MEMBER_SHEET_ID)
  var sheet = spsheet.getActiveSheet()
  var last = sheet.getLastRow()
  var array = sheet.getRange(2,1,last-1,3).getValues()
  
  var i = searchData(array,0,id)
  if(i===-1){return false}
  sheet.getRange(i+2,index+1).setValue(content)
  return true
}

function clearId(id){
  var spsheet = SpreadsheetApp.openById(MEMBER_SHEET_ID)
  var sheet = spsheet.getActiveSheet()
  var last = sheet.getLastRow()
  var array = sheet.getRange(2,1,last-1,3).getValues()
  
  var i = searchData(array,0,id)
  if(i===-1){return false}
  var icon = sheet.getRange(i+2,2).getValue()
  
  //icon
  var spsheet2 = SpreadsheetApp.openById(EMOJI_SHEET_ID)
  var sheet2 = spsheet2.getActiveSheet()
  
  sheet2.appendRow([icon])
  
  sheet.deleteRow(i+2)
  return true
}