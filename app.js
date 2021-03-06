const koa = require("koa");
const route = require('koa-route');
const wechat = require('./g.js');
const path  = require("path");
const util  = require("./libs/util.js");
var wechat_file = path.join(__dirname,"./config/wechat.txt");
let app = new koa();

let config  =
{
	wechat:
	{
		appId:"wxc56a06516c3043e3",
		appSecret:"f21eb5d592eabc9c4c9668164bee746d",
		token:"shady",
		getAccessToken:function()
		{
			return util.readFileAsync(wechat_file);
		},
		saveAccessToken:function(data)
		{
			data = JSON.stringify(data);
			return util.writeFileAsync(wechat_file,data);
		}
	}

}

app.use(wechat(config.wechat));

let admin = route.get('/admin',(ctx)=>
{
	ctx.type = 'html';
	ctx.body = 'Hello World';
});

app.use(admin);

app.listen(80);
console.log("Server is running at localhost:80;");
