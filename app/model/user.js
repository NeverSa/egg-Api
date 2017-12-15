
module.exports = app => {
    const mongoose = app.mongoose;
    const UserSchema = new mongoose.Schema({
      username: { type: String  },
      password: { type: String  },
      user_id:{type:String},
      creadt_time:{type:Date, default:Date.now}
    });
   
    return mongoose.model('User', UserSchema);
  }