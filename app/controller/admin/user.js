const Controller = require('egg').Controller;
class UserController extends Controller {
  //登录
    * login() {
    const {ctx} = this; 
    const result=yield ctx.service.admin.login(ctx.request.body)
    ctx.body = result;
    ctx.status = 200;
  }
   //获取用户session信息 
  * getUserInfo(){
    const {ctx} = this; 
    const result=yield ctx.service.admin.getUserInfo();
    ctx.body = result;
    ctx.status = 200;
  }
  //获取管理员列表
  * getUserList(){
    const {ctx} = this; 
    const result=yield ctx.service.admin.getList(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }
  * test(){
    const {ctx} = this; 
    const result=yield ctx.service.pro.getindex(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

}
module.exports = UserController;