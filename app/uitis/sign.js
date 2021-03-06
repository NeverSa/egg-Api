const CryptoJS = require('crypto-js');
const HmacSHA256 = require('crypto-js/hmac-sha256')
const moment = require('moment');
const defaultoption={
    AccessKeyId:"20500845-f2ac9a01-b3761663-b3e77",
    SecretKey:"f7d7df07-2932cea5-a503e1e4-dfd6d",
    SignatureMethod:"HmacSHA256",
    SignatureVersion:2,
    baseUrl:"https://api.huobi.pro",
    dome:"api.huobi.pro"
}

module.exports = function fn(option) {

    let signobj={
        AccessKeyId:defaultoption.AccessKeyId,
        SignatureMethod:defaultoption.SignatureMethod,
        SignatureVersion:defaultoption.SignatureVersion,
        Timestamp:moment.utc().format('YYYY-MM-DDTHH:mm:ss')||"",
    }

    let newsignobj={},
    usrstr=option.methods+"\n"+defaultoption.dome+"\n"+option.apihost+"\n",
    pramsurl="";
    if(option.methods=="POST"){
         newsignobj=Object.assign(option.body,signobj); 
    }else{
        newsignobj=Object.assign(option.prams,signobj);   
    }
 
    newsignobj=objKeySort(newsignobj);

    for (var i in newsignobj) {
        usrstr+=i+"="+newsignobj[i]+"&"
        pramsurl+=i+"="+newsignobj[i]+"&"
      }
      usrstr=usrstr.substring(0,usrstr.length-1)
    
      var hash = HmacSHA256(usrstr, defaultoption.SecretKey);
      var Signature = encodeURIComponent(CryptoJS.enc.Base64.stringify(hash));
      let posturl=defaultoption.baseUrl+option.apihost+"?"+pramsurl+"Signature="+Signature;
      //console.log(posturl)
      return posturl;
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