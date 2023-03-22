const express=require("express");
const app =express();
const mongoose=require("mongoose");
app.use(express.json());

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

//order-info

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