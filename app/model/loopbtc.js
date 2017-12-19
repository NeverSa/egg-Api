
module.exports = app => {
    const mongoose = app.mongoose;
    const LoopbtcSchema = new mongoose.Schema({  
      "creadt_time":{type:Date, default:Date.now},
      "symbol":{type: String},
      "low":{type: Number,default:10},
      "height":{type: Number,default:-10}    
    });
   
    return mongoose.model('Loopbtc', LoopbtcSchema);
  }