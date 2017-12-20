
module.exports = app => {
    const mongoose = app.mongoose;
    const ProSchema = new mongoose.Schema({
      creadt_time:{type:Date, default:Date.now},
      closeprice: { type: Number,default:0},
      "base_currency":{type: String},
      "quote_currency":{type: String},
      "symbol_partition":{type: String,default:"innovation"},
      "symbol":{type: String},
      "buyprice":{type: Number,default:0}
    });
   
    return mongoose.model('Pro', ProSchema);
  }