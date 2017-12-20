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

  

}



module.exports = WebproService