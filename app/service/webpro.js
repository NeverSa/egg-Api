const Service = require('egg').Service;
class WebproService extends Service {
   * getAllCoin(prams){ 
     const {pagesize=10,contpage=1}=prams;
     const  totle=yield this.ctx.model.Pro.count();
     const result=yield this.ctx.model.Pro.find({}).limit(parseInt(pagesize)).skip(pagesize*(contpage-1));  
     return {
        success: true,
        list:result,
        totle:totle
      }
   };
   //删除单个币种
   *deleteOneCoin(body){
    const {id}=body;
    const result =yield this.ctx.model.Pro.remove({"_id":id});
    if(result){
        return {
            success: true,
            data:result
          } 
    }
   };
  //获取单个币种
   *getOneCoin(body){
    const {id}=body; 
    const result =yield this.ctx.model.Pro.find({"_id":id});
    if(result){
        return {
            success: true,
            data:result
          } 
    }
   };
   //修改单个币种开盘价
   *editOneCoin(body){
   const {id,closeprice,base_currency,quote_currency,symbol,buyprice}=body; 
   const result =yield this.ctx.model.Pro.findOneAndUpdate({"_id":id},{$set:{closeprice,base_currency,quote_currency,symbol,buyprice}});
   if(result){
       return {
           success: true,
           data:result
         } 
    }
  };
  
  //新增单个币种
  * addOneCoin(body){
   const result =yield this.ctx.model.Pro.create(body);
    if(result){
      return {
        success: true,
        data:result
      } 
    }
  };

//基础币种策略
//
//
//
//
//获取所有币种策略
    * getAllTactics(prams){ 
     const {pagesize=10,contpage=1}=prams;
     const  totle=yield this.ctx.model.Loopbtc.count();
     const result=yield this.ctx.model.Loopbtc.find({}).limit(parseInt(pagesize)).skip(pagesize*(contpage-1));  
     return {
        success: true,
        list:result,
        totle:totle
      }
   };
   //删除单个币种策略
   *deleteOneTactics(body){
    const {id}=body;
    const result =yield this.ctx.model.Loopbtc.remove({"_id":id});
    if(result){
        return {
            success: true,
            data:result
          } 
    }
   };
  //获取单个币种策略
   *getOneTactics(body){
    const {id}=body; 
    const result =yield this.ctx.model.Loopbtc.find({"_id":id});
    if(result){
        return {
            success: true,
            data:result
          } 
    }
   };
   //修改单个币种策略
   *editOneTactics(body){
   const {id,symbol,height,low}=body; 
   const result =yield this.ctx.model.Loopbtc.findOneAndUpdate({"_id":id},{$set:{symbol,height,low}});
   if(result){
       return {
           success: true,
           data:result
         } 
    }
  };
  
  //新增单个币种策略
  * addOneTactics(body){
   const result =yield this.ctx.model.Loopbtc.create(body);
    if(result){
      return {
        success: true,
        data:result
      } 
    }
  };
//更新单个币种的禁用状态
  *updataAbleTactics(body){
    const {_id,abled}=body; 
    console.log(_id)
    const result =yield this.ctx.model.Loopbtc.findOneAndUpdate({"_id":_id},{$set:{abled}});
    if(result){
        return {
            success: true,
            data:result
          } 
     }
     console.log(result)
  }
}



module.exports = WebproService