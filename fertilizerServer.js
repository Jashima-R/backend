const express=require("express");
const app =express();
const mongoose=require("mongoose");
const cors = require("cors");
app.use(express.json());
app.use(cors());

const mongoUrl="mongodb://127.0.0.1:27017";
mongoose.connect(mongoUrl,{
    useNewUrlParser:true
}).then(()=>{console.log("Connected to db");
}).catch(e=>console.log(e));

app.listen(5000,()=>{
    console.log("Server Started");
});

require("./collections");
const User=mongoose.model("userInfo");
//login-info

app.post("/Login",async(req,res)=>{
   
    try{
        const check=await User.findOne({email:req.body.email})
      if(check.password===req.body.password){
        res.send({message:"Successfully Logged In"})
      }else{
        res.send({message:"Wrong Password"})
      }
       
    }catch{
        res.send({status:"User Not Found"})
    }   
})


//signup info

app.post("/signup",async(req,res)=>{
    const{name,email,password,building_no,street,city,state,pincode,phoneNo}=req.body;
    try{
        await User.create({
            username:name,
            email,
            password,
            building_no,
            street,
            city,
            state,
            pincode,
            phoneNo,
        });
        res.send({status:"ok"})
    }catch(error){
        res.send({status:"error"})
    }
})
// product-info

const Product=mongoose.model("productInfo");
app.post("/home",async(req,res)=>{
    const{productImg,productName,pkgType,pkgSize,price}=req.body;
    try{
        await Product.create({
            productImg,
            productName,
            pkgType,
            pkgSize,
            price,
        });
        res.send({status:"ok"})
    }catch(error){
        res.send({status:"error"})
    }
})

//order-info api

const Order=mongoose.model("orderInfo");
app.post("/Cart",async(req,res)=>{
    const{productId, buyerId, quantity,totalPrice,orderStatus}=req.body;
    try{
        await Order.create({
           productId,
           buyerId,
           quantity,
           totalPrice,
           orderStatus, 
        });
        res.send({status:"ok"})
    }catch(error){
        res.send({status:"error"})
    }
})
//Add-to Cart API     DOUBT
const Cart=mongoose.model("orderInfo" || "productInfo");

app.post("/Add-To-Cart",async(req,res)=>{
   const{productName,price,totalPrice,quantity}=req.body;
try{
 const cartObj=new Cart({
    productName,
    price,
    totalPrice,
    quantity,
 });
 const cartData=await cartObj.save();
 res.status(200).send({success:true,msg:"Cart Product Details",data:cartData});
}catch(error){
    res.status(400).send({success:false,msg:"Add to cart has failed"})
}
})
//Displaying orders in seller page
app.get("/getAllOrders",async(req,res)=>{
    try{
        const allOrders=await Order.find({});
        res.send({status:"ok",data:allOrders});
    }catch(error){
        console.log(error);
    }
})



