const Controller = require('egg').Controller;
class IndexController extends Controller {
  //前台获取所有币种
    * getallcoin() {
    const {ctx} = this; 
    const result=yield ctx.service.webpro.getAllCoin(ctx.query)
    ctx.body = result;
    ctx.status = 200;
  }
   //删除某个币种
   * deleteOneCoin(){
   const {ctx} = this; 
   const result=yield ctx.service.webpro.deleteOneCoin(ctx.request.body)
   ctx.body = result;
   ctx.status = 200;
  }
   //获取单个币种详情
   *getOneCoin(){
    const {ctx} = this; 
    const result=yield ctx.service.webpro.getOneCoin(ctx.request.body)
    ctx.body = result;
    ctx.status = 200;
   }
   //编辑单个币种开盘价
   *editOneCoin(){
    const {ctx} = this; 
    const result=yield ctx.service.webpro.editOneCoin(ctx.request.body)
    ctx.body = result;
    ctx.status = 200;
   }

   //新增单个币种
   *addOneCoin(){
    const {ctx} = this; 
    const result=yield ctx.service.webpro.addOneCoin(ctx.request.body)
    ctx.body = result;
    ctx.status = 200;
   }



 //币种策略
    * getAllTactics() {
    const {ctx} = this; 
    const result=yield ctx.service.webpro.getAllTactics(ctx.query)
    ctx.body = result;
    ctx.status = 200;
  }
   //删除某个币种
   * deleteOneTactics(){
   const {ctx} = this; 
   const result=yield ctx.service.webpro.deleteOneTactics(ctx.request.body)
   ctx.body = result;
   ctx.status = 200;
  }
   //获取单个币种详情
   *getOneTactics(){
    const {ctx} = this; 
    const result=yield ctx.service.webpro.getOneTactics(ctx.request.body)
    ctx.body = result;
    ctx.status = 200;
   }
   //编辑单个币种开盘价
   *editOneTactics(){
    const {ctx} = this; 
    const result=yield ctx.service.webpro.editOneTactics(ctx.request.body)
    ctx.body = result;
    ctx.status = 200;
   }

   //新增单个币种
   *addOneTactics(){
    const {ctx} = this; 
    const result=yield ctx.service.webpro.addOneTactics(ctx.request.body)
    ctx.body = result;
    ctx.status = 200;
   }
   //更新禁用状态
  *updataAbleTactics(){
    const {ctx} = this; 
    console.log(ctx.request.body)
    const result=yield ctx.service.webpro.updataAbleTactics(ctx.request.body)
    ctx.body = result;
    ctx.status = 200;

  }

}
module.exports = IndexController;