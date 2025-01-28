const mongoose =require("mongoose");

const Userschema=mongoose.Schema({
    email:{
        type:String,
        required:[true,"Your email is required"],
        unique:true
    },
     username: {
        type: String,
        required: [true, "Your username is required"],
        
      },
      password: {
        type: String,
        required: [true, "Your password is required"],
        length:8,
      },
      
});
module.exports =mongoose.model('user',Userschema);
