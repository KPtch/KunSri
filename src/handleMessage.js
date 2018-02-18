var db = require('./db');
var responseMap = db.getResponseMap();
var questionArr = db.getQuestionArr();


function getQuestionList(){
    var res = 'สวัสดีจ้าา เราคือบอท KunSri';
    
 

    questionArr.forEach(function(question,index){
        res += '\n' + (index + 1).toString()+ '.'+ question;
    });
        return res;
       
     
}
function getRes(req,id){
    var resKey = null;
    var keys = Object.keys(responseMap);
    for(var i=0; i<keys.length; i++){
        var key = keys[i];
        var regex = new RegExp(key);
        if(req.match(regex)){
            resKey = key;
            break;
        }
    }

    if(resKey){
        
        return responseMap[resKey];
    } else {
        return null;
    }
}

function handleMessage(req,id,sendMessage){
    var response = getRes(req,id);
    if(!response) response = getQuestionList();
        
    sendMessage(response,id).then(() =>{
        console.log('respond to \"' + req + '\" success');
        console.log(response);
    }).catch(err =>{
        console.log(err);
    });
    
}
/* function button(key,res,id,sendMessage){
    var btn = {
            "attachment":{
              "type":"template",
              "payload":{
                "template_type":"button",
                "text":"ต้องการเอกสารอะไรไหม?",
                "buttons":[
                  {
                    "type":"web_url",
                    "url":res,
                    "title":key,
                    "payload":key
                  },
                  {
                    "type":"web_url",
                    "url":res,
                    "title":"คำแนะนำ",
                    "payload":"คำแนะนำ"
                  }
                  
                ]
              }
            }
          
        
    }
    sendMessage(btn,id).then(() =>{
        console.log(btn);
    }).catch(err =>{
        console.log(err);
    });
} */

module.exports = handleMessage;