
module.exports = app => {
    const mongoose = app.mongoose;
    const ProSchema = new mongoose.Schema({
      closeprice: { type: Number},
      creadt_time:{type:Date, default:Date.now}
    });
   
    return mongoose.model('Pro', ProSchema);
  }