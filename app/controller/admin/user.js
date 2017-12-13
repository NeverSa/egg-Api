const Controller = require('egg').Controller;
class UserController extends Controller {
    * login() {
    const {ctx} = this; 
    const result=yield ctx.service.admin.login(ctx.request.body)
    ctx.body = result;
    ctx.status = 200;
  }
   
  * getUserInfo(){
    const {ctx} = this; 
    const result=yield ctx.service.admin.getUserInfo();
    ctx.body = result;
    ctx.status = 200;
  } 
}
module.exports = UserController;