const mongoose =require('mongoose');
const express =require('express');
const cors=require("cors")
const {Signup,Login}=require("./Controller/Signup.js");
const { AddNewCategory,GetListOfCategories,RemoveCategory, GetUpdateOfCategories,GetSelectedCategories }=require('./Controller/AddCategories.js')


const app=express();

app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  mongoose.connect("mongodb://127.0.0.1:27017/groccery-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.error("Database connection error:", err);
});

app.listen(3001,()=>{
    console.log("server is listening");

});
app.use(
    cors()
  );

  app.post('/signup',async (req,res)=>{
   
     await Signup(req,res);
     
  })
  app.post('/login',async(req,res)=>{
    console.log(req.body)
    await Login(req,res);
   
  });
  app.post('/groccery-app',async(req,res)=>{
    console.log("login Clicks");
  });
  app.post('/addcategory',async(req,res)=>{
    await AddNewCategory(req,res);
  });
  app.post('/removecategory/:id',async(req,res)=>{
    const {categoryId}=req.params;
    
    await RemoveCategory(req,res,categoryId);
  });
  app.get('/allcategory',async(req,res)=>{
    
    await GetListOfCategories(req,res);
  });
  app.post('/updatecategory',async(req,res)=>{
    
    
    await GetUpdateOfCategories(req,res);
  });
  app.post('/getselectedcategory/:id',async(req,res)=>{
   
    
    await GetSelectedCategories(req,res);
  });