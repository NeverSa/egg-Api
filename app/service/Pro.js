const Service = require('egg').Service;
const sign = require("../uitis/sign");
class ProService extends Service {
  
  //更新获取开盘价   
    async getcloseprice(){
     let base=await this.ctx.model.Pro.find({});
    if(base){
        for(let key of base){
            let priceoption={
                apihost:"/market/history/kline",
                methods:"GET", 
                body:{},
                prams:{"period":"1day","size":"1","symbol":key["symbol"]},  
            };
            let result = await this.ctx.curl(sign(priceoption),{
                            dataType: 'json',
                            timeout: 5000,
                         });
            try {
             await this.ctx.model.Pro.findOneAndUpdate({"symbol":key["symbol"]},{$set:{"closeprice":result.data.data[0].open}})
             console.log(`${key["symbol"]}更新成功`)
            } catch (error) {
                
            }             
        }
    }

   
   }    

   //获取btc下所有币种并添加到数据库
   async getallsymbols(){
    const option={
        apihost:"/v1/common/symbols",
        methods:"GET", 
        body:{},
        prams:{},
      }  
      let hasbasebtc =await this.ctx.model.Pro.find({});
      if(hasbasebtc.length==0){
        let result = await this.ctx.curl(sign(option),{
            dataType: 'json',
            timeout: 8000,
         });
         if(result){
            for (let key of result.data.data){       
                if(key["quote-currency"]=="btc"){
                    this.ctx.model.Pro.create({"base_currency":key["base-currency"],"quote_currency":key["quote-currency"],"symbol_partition":key["symbol-partition"],"symbol":key["base-currency"]+key["quote-currency"]});           
                }
            }
          hasbasebtc =await this.ctx.model.Pro.find({}); 
          return hasbasebtc   
         }
      }
      return hasbasebtc
   }

  //获取某个币种的1一分钟K线图返回涨幅
  async getOneCoin(coin){
    let basepice=await this.ctx.model.Pro.find({"symbol":coin},"symbol closeprice buyprice");
    const price=basepice[0].closeprice;//开盘价
    const buyprice=basepice[0].buyprice;//买入价
    let option={
        apihost:"/market/history/kline",
        methods:"GET", 
        body:{},
        prams:{"period":"1min","size":"1","symbol":coin},
      }  
     let result =await this.ctx.curl(sign(option),{
        dataType: 'json',
        timeout: 8000,
     });
     if(!result.data.data[0].close){
          
     }else{

         return {
             height:(result.data.data[0].close-buyprice)/buyprice*100,
             low:(result.data.data[0].close-price)/price*100//对比开盘价时的涨幅
            }
         
     }
   
  }

  //下单买入
  async buy(){
    let option={
        apihost:"/v1/account/accounts",
        methods:"GET", 
        body:{},
        prams:{},
      }  
      let account= await this.ctx.curl(sign(option),{
        dataType: 'json',
        timeout: 8000,
     });
     //用户id
    const account_id=account.data.data[0].id;
    let buyoption={
        apihost:"/v1/order/orders/place",
        methods:"POST", 
        body:{
            "account-id": account_id,
            "amount": 1,
            "symbol":"bcxbtc",
            "type":"buy-market"
        },
        prams:{},
    }
    const result=await this.ctx.curl(sign(buyoption),{
        dataType: 'json',
        method: 'POST',
        timeout: 8000,
        data: {
             "account-id": account_id,
             "amount": 1,
             "symbol":"btcusdt",
             "type":"buy-market"
          },
    })
   console.log(result)   

  };

  //定时任务指定币种扫描
  async loopbtc(){ 
    let suportcoin=await this.ctx.model.Loopbtc.find({});
    for(let key of suportcoin){
      let Percent= await this.getOneCoin(key.symbol);
      console.log(`${key.symbol}对比买入价当前涨幅为 ${Percent.height}%\n`);
     // console.log(`${key.symbol}对比0时开盘价当前涨幅为 ${Percent.low}%\n`);
 


    //    if(Percent>10){
    //     console.log("买入")
    //    }else if(Percent<-10){
    //     console.log("卖出")
    //    }else{
    //        console.log("持有")
    //    }
    }

  }

}

module.exports = ProService