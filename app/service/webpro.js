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
   * editOneCoin(body){
   const {id,price}=body; 
   const result =yield this.ctx.model.Pro.findOneAndUpdate({"_id":id},{$set:{"closeprice":price}});
   if(result){
       return {
           success: true,
           data:result
         } 
    }
  };


}



module.exports = WebproService