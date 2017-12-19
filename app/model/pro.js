
module.exports = app => {
    const mongoose = app.mongoose;
    const ProSchema = new mongoose.Schema({
      closeprice: { type: Number,default:0},
      creadt_time:{type:Date, default:Date.now},
      "base_currency":{type: String},
      "quote_currency":{type: String},
      "symbol_partition":{type: String},
      "symbol":{type: String}
    });
   
    return mongoose.model('Pro', ProSchema);
  }