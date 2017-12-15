const Service = require('egg').Service;
const uuidv4 = require('uuid/v4');
class AdminService extends Service {
  //登录，第一次登录会自动注册新用户

  * login(prams) {
    console.log(this.ctx.cookies)
    let result = {};
    let user = yield this.ctx.model.User.findOne({ "username": prams.username });
    let user_id = uuidv4()
    if (!user) {
      let newUser = yield this.ctx.model.User.create({ "username": prams.username, "password": prams.password, "user_id": user_id });
      if (!newUser) {
        result = {
          success: false,
          msg: "系统错误"
        }
      } else {
        this.ctx.session.user_id = user_id
        result = {
          success: false,
          msg: "注册成功"
        }
      }
    } else {
      try {
        let user = yield this.ctx.model.User.findOne({ "username": prams.username, "password": prams.password }, "user_id");
        let result = {};
        if (!user) {
          result = {
            success: false,
            msg: "密码错误"
          }

        } else {
          this.ctx.session.user_id = user.user_id;
          console.log(this.ctx.session)
          result = {
            success: true,
            msg: "登录成功"
          }
        }
        return result;
      } catch (e) {


      }

    }

  }

  //根据session获取用户信息
  * getUserInfo() {
    if (!this.ctx.session.user_id) {
      return {
        success: false,
        msg: "用户未登录或用户不存在"
      }
    } else {
      let result = yield this.ctx.model.User.findOne({ "user_id": this.ctx.session.user_id }, "username user_id");

      if (result) {
        return {
          success: true,
          data: result
        }
      } else {
        return {
          success: false,
          msg: "服务器错误"
        }
      }
    }

  }
 //获取用户列表
  * getList(prams){
     const {pagesize=10,contpage=1}=prams;
     const  totle=yield this.ctx.model.User.count();
     const result=yield this.ctx.model.User.find({},"username user_id creadt_time").limit(pagesize).skip(pagesize*(contpage-1));
     if(!result){
      return {
        success: false,
        msg: "服务器错误"
      }
     }else{
      return {
        success: true,
        list:result,
        totle:totle
      }
     }
  }

}

module.exports = AdminService