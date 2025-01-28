const mongoose =require('mongoose');
const Userschema=require('../Model/User')
module.exports.Signup= async(req,res)=>{

    try {
        
        const{username,email,password,confirmpassword}=req.body;
        
        
       
        const userdata=new Userschema(
            {
                username,
                email,
                password,
            }
        )
        
      await  userdata.save();
      console.log("user added Successfully");
        return res.json({message:"user added Successfully"});
       
    
        
    } catch (error) {
        console.log(error.message);
        return res.json({message:error.message});
    }
   
}
module.exports.Login=async(req,res)=>{
try {
    
    
        const {email,password}=req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
          }
      
          // Find the user by email
          const user = await Userschema.findOne({ email });
          if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
          }
      
          // Compare the plain text password with the one stored in the database
          if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
          }
          else{
            return res.status(200).json({ message: 'Login successful'});
          }
      
  
    
} catch (error) {
    console.log(error.message);
    return res.status(400).json(error.message);
    
}

    

}