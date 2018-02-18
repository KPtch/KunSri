var login = require("facebook-chat-api");
var handleMessage = require('./src/handleMessage.js');




var credentials = {email: "0927841939", password: "Papoolob29033"};

var timeout = undefined;
var inTimeout= {};
    
login(credentials, (err, api) => {
    if(err) return console.error(err);
    function sendMessage(str,id){
        return new Promise((resolve, reject) =>{
            api.sendMessage(str,id, function(err){
                if(err){
                    reject(err);
                    return;
                }
                resolve('send str success');

            });
        });
    }
    api.listen(function(err,message ){
        if(err){
            console.log(err);
            return;
        }

        console.log(message);

        var req = message.body ? message.body.toLowerCase() : '';
        var id = message.threadID;
        if(req && !inTimeout[id]){
            handleMessage(req, id, sendMessage);
            if(timeout){
                inTimout[id] = true;
                setTimeout(function(){
                    inTimeout[id] = false;

                }, timeout);
            }
        }

    });
});


