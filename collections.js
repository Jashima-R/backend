const mongoose =require("mongoose");
// user-Details
const userInfoSchema=new mongoose.Schema(
    {
        username:String,
        email:String,
        password:String,
        building_no:Number,
        street:String,
        city:String,
        state:String,
        pincode:Number,
        phoneNo:String,
    },
    {
        collection:"userInfo",
    }
);
mongoose.model("userInfo",userInfoSchema);


//productDetails
const productInfoSchema=new mongoose.Schema(
    {
       productImg:Buffer,
       productName:String,
       pkgType:String,
       pkgSize:String,
       price:Number,
    },
    {
        collection:"productInfo",
    }
);
mongoose.model("productInfo",productInfoSchema);

//order-details

const orderInfoSchema=new mongoose.Schema(
    {
        productId:String,
        buyerId:String,
        quantity:Number,
        totalPrice:Number,
        orderStatus:String,
    },
    {
        collection:"orderInfo",
    }
);
mongoose.model("orderInfo",orderInfoSchema);


