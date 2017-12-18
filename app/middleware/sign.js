const CryptoJS = require('crypto-js');
const HmacSHA256 = require('crypto-js/hmac-sha256')

const moment = require('moment');

module.exports = options => {
    return async function sign(ctx, next) {
       
    let signobj={
        AccessKeyId:options.AccessKeyId,
        SignatureMethod:options.SignatureMethod,
        SignatureVersion:options.SignatureVersion,
        Timestamp:moment.utc().format('YYYY-MM-DDTHH:mm:ss'),
    }
     const accepturl=require('url').parse(ctx.req.url);
     let newsignobj={},
     pramsurl="",
      usrstr=ctx.request.method+"\n"+options.dome+"\n"+accepturl.pathname+"\n";
     if(ctx.request.method=="GET"){
        newsignobj=Object.assign(ctx.request.query,signobj);
     }else {
        newsignobj=Object.assign(ctx.request.body,signobj); 
     }

     newsignobj=objKeySort(newsignobj)

     for (var i in newsignobj) {
        usrstr+=i+"="+newsignobj[i]+"&"
        pramsurl+=i+"="+newsignobj[i]+"&"
      }
      usrstr=usrstr.substring(0,usrstr.length-1)
   

      var hash = HmacSHA256(usrstr, options.SecretKey);
      var Signature = encodeURIComponent(CryptoJS.enc.Base64.stringify(hash));
      let posturl=options.baseUrl+accepturl.pathname+"?"+pramsurl+"Signature="+Signature;
       ctx.request.url=posturl


     await next();
    };
  };
  //对象排序并将键值对进行URI编码
  function objKeySort(obj){
    var newkey = Object.keys(obj).sort();
    var newObj = {};
    for (var i = 0; i < newkey.length; i++) {
        newObj[newkey[i]] = encodeURIComponent(obj[newkey[i]]);
    }
    return newObj;
  }