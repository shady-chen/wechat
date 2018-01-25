const API = "http://www.tuling123.com/openapi/api";
const KEY = "9bb086eadebf42398a228df264644e9e";
let request = require('sync-request');
module.exports = {
	getType:function(js){
		var now = new Date().getTime();
		
		var returnMsg='';
		if(js.MsgType == "evennt" && js.Event == "subscribe")
		{
			returnMsg = "我等你很久了！";
		}
		else if(js.MsgType == "text")
		{
				var myJson = {
			"key":KEY,
			"info": js.Content,
			"userid":"oL-Uk0wdgi9Lt0lofJjTB8NMEHgQ",
			}
			var res = request('POST', API, {
  json:myJson
});	
var user = JSON.parse(res.getBody('utf8'));
//console.log(user);
	returnMsg = user.text;
		/*	 request.post({url:API, form: myJson}, function(err,httpResponse,body){ 
				if(err)console.log(err);
				else{
				 	returnMsg = body.text;
				}
			})*/
			
		}
		var xml = '<xml>'

                  +'<ToUserName><![CDATA['+js.FromUserName+']]></ToUserName>'

                  +'<FromUserName><![CDATA['+js.ToUserName+']]></FromUserName>'

                  +'<CreateTime>'+now+'</CreateTime>'

				  +	'<MsgType><![CDATA[text]]></MsgType>'

				  +'<Content><![CDATA['+returnMsg+']]></Content>'

				  +	'</xml>';
		return xml;
	}
	

}
