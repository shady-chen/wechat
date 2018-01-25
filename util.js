var xml2js = require("xml2js");
var Promise = require("bluebird");



exports.parseXMLAsync = function(xml)
{
	return new Promise(function(resolve,reject){
		xml2js.parseString(xml,{trim:true},function(err,data){if(err)reject(err);else resolve(data);});
        })
}
exports.formatMessage = function (obj)
{
	 var message = {};



	 if(typeof obj === "object"){
	 	var keys = Object.keys(obj);
	 	for(var i = 0;i<keys.length;i++)
	 	{
	 		var item  = obj[keys[i]];
	 		var key = keys[i];

	 		if(!item instanceof Array || item.length === 0){
	 			continue;
	 		}
	 		if(item.length === 1 )
	 		{
	 			var val = item[0];
	 			if(typeof val === 'object')
	 			{
	 				message[key] = formatMessage(val);
	 			}
	 			else
	 			{
	 				message[key] = (val || "").trim(); 
	 			}
	 		}
	 		else
	 		{
	 			message[key] = [];
	 			for(var j = 0,k=item.length;j<k;j++)
	 			{
	 				message[key].push(formatMessage(item[j]));
	 			}
	 		}
	 	}
	 }
	 return message;
}
