const Service = require('egg').Service;
const sign = require("../uitis/sign");
class ProService extends Service {
  
  //更新获取开盘价   
    async getcloseprice(){
     let base=await this.getallsymbols();
     if(base){
         for(let key of base){
            let priceoption={
                apihost:"/market/history/kline",
                methods:"GET", 
                body:{},
                prams:{"period":"1min","size":"1","symbol":key["symbol"]},
              }  
               let result = await this.ctx.curl(sign(priceoption),{
                dataType: 'json',
                timeout: 5000,
             });
            try {
                await this.ctx.model.Pro.findOneAndUpdate({"symbol":key["symbol"]},{$set:{"closeprice":result.data.data[0].close}})
            } catch (error) {
                
            }
             this.ctx.logger.info('更新收盘价',result.data.data[0].close);
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
    let basepice=await this.ctx.model.Pro.find({"symbol":coin},"symbol closeprice");
    const price=basepice[0].closeprice;
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

         return (result.data.data[0].close-price)/price*100
     }
   
  }
  //定时任务指定币种扫描
  async loopbtc(){ 
    let suportcoin=await this.ctx.model.Loopbtc.find({});
  
    //console.log(suportcoin)
    for(let key of suportcoin){
      let Percent= await this.getOneCoin(key.symbol);
     
       if(Percent>10){
      console.log("买入")
       }else if(Percent<-10){
        console.log("卖出")
       }else{
           console.log("持有")
       }
    }

  }

}

module.exports = ProService