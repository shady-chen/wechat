var prefix = "https://api.weixin.qq.com/cgi-bin/";
var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var api = {
        accessToken:prefix+"token?grant_type=client_credential",
}
function Wechat(opts)
{
        var that = this;

        this.appId = opts.appId;
        this.appSecret = opts.appSecret;
        this.getAccessToken = opts.getAccessToken;
        this.saveAccessToken = opts.saveAccessToken;


        this.getAccessToken()
        .then(function(data)
        {
                try{
                        data = JSON.parse(data);
                }
                catch(e){
                        return that.updateAcceesToken();
                }

                if(that.isValidaAccessToken(data))
                {
                        Promise.resolve(data);
                }
                else
                {
                        return that.updateAcceesToken();
                }

        })
        .then(function(data){
                that.access_token = data.access_token;
                that.expires_in   = data.expires_in;

                that.saveAccessToken(data);
        })//end of getAccessToken function;

}//end of Wechat;

Wechat.prototype.isValidaAccessToken = function(data)
{
        if(!data || !data.access_token || !data.expires_in)
        {
                return false;
        }
        var access_token = data.access_token;
        var expires_in   = data.expires_in;

        var now = (new Date().getTime());

        if (now < expires_in)
        {
                return true;
        }
        else
        {
                return false;
        }
}

Wechat.prototype.updateAcceesToken = function ()
{
        var appId = this.appId;
        var appSecret = this.appSecret;

        var url = api.accessToken + "&appid=" +appId + "&secret=" + appSecret;

        return new Promise(function(resolve,reject){
                request({url:url,json:true}).then(function(response){

                var data = response.body;


        //      console.log("reponse:~~~~~~~~~~"+response.body.access_token,response.body.expires_in);
                var now = (new Date().getTime());
                var expires_in = now  + (data.expires_in - 20) * 1000;
        //      data.body.expires_in = expires_in;


                        resolve(data);
                })
        })

}

module.exports = Wechat;
