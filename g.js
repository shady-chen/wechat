const koa = require("koa");
const sha1 = require("sha1");
const getRawBody = require("raw-body");
const util = require('./util');
var Wechat = require("./wechat.js");
var xml = require('./answer.js');


module.exports = function(opts){
        return function*(next)
        {
		        var that = this;
                var token = opts.token;
                var signature = this.query.signature;
                var nonce = this.query.nonce;
                var timestamp = this.query.timestamp
                var echostr = this.query.echostr;
                var str = [token,timestamp,nonce].sort().join("");
                var sha = sha1(str);


                if(this.method == "GET")
                {
                      if(sha == signature){this.body = echostr+"";}
                      else{this.body = "wrong"; }
                }
                else if(this.method == "POST")
                {
                        //处理XML包
                       if(sha != signature){this.body = "wrong";return false;}
                       
                       var data = yield getRawBody(this.req,
                       {
                        length:this.length,
                        limit:"1mb",
                        encoding:this.charser,
                       });
                        var content = yield util.parseXMLAsync(data);
                        var message = util.formatMessage(content.xml);
                        var msg = xml.getType(message);
                        console.log(msg);
                        that.type = "application/xml";
                        that.status = 200;
                        that.body =  msg;
                        return;
                }
                else
                {
                    return this.body = "wrong!";
                }


               
        }//end of generator function
}//end of module.exports function;
