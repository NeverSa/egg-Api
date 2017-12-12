
module.exports = app => {
    const mongoose = app.mongoose;
    const UserSchema = new mongoose.Schema({
      username: { type: String  },
      password: { type: String  },
      userid:{type:String}
    });
   
    return mongoose.model('User', UserSchema);
  }