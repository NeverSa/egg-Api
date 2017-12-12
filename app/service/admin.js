const Service = require('egg').Service;

class AdminService extends Service {
  //登录，第一次登录会自动注册新用户

  * login(prams) {
    const {username,password}=prams ;
    let result={};
    let user = yield this.ctx.model.User.findOne({username});
    if(!user){
      let newUser =yield this.ctx.model.User.create(prams);
     if(!newUser){
      result={
        success:false,
        msg:"系统错误"
      }
     }else{
      this.ctx.session.user_id="2222"
      result={
        success:false,
        msg:"注册成功"
      } 
     }
    }else {
      this.ctx.session.user_id="2222"
      result={
        success:true,
        msg:"登录成功"
      }
    }
    return result;
  }

   //根据session获取用户信息
   * getUserInfo(){
      let result=yield {};
      
      return this.ctx.session.user_id
    }
  
}

module.exports = AdminService