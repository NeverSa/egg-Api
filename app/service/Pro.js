const Service = require('egg').Service;

class ProService extends Service {
   *getindex(){
       console.log(this.ctx)
        return "asdasd"
   }

}

module.exports = ProService