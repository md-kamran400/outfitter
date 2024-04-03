const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error, log } = require("console");
const fs = require("fs");
app.use(express.json());
app.use(cors());

// mongo db connect
mongoose.connect(
  "mongodb+srv://ka5452488:mongodb123@cluster0.10yjjlt.mongodb.net/outFitter?retryWrites=true&w=majority"
);

// api creation
app.get("/", (req, res) => {
  res.send("Express App is running ");
});

// image stoage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "./upload/images";
    fs.mkdir(uploadDir, { recursive: true }, function (err) {
      if (err && err.code !== "EEXIST") {
        console.error("Error creating directory:", err);
      }
      cb(null, uploadDir);
    });
  },
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });
// creating upload endpoint for images;

app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// schema for creating product
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// creating api for add products 

app.post("/addProduct", async(req, res)=>{
  let products = await Product.find({});
  let id;
  if(products.length>0){
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id +1;
  }else{
    id=1;
  }
  const product = new Product({
    id:id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({
    success: true,
    name: req.body.name,
  })
})

// get all Products;
app.get("/allproducts", async (req, res)=>{
  let products = await Product.find({});
  console.log("all product fetched");
  res.send(products)
});




// creating api for delete products;
app.post("/removeproduct", async(req, res)=>{
  await Product.findOneAndDelete({id:req.body.id});
  console.log("Removed")
  res.json({
    success: true,
    name: req.body.name
  });
});

// Schema for user;

const User = mongoose.model("User",{
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String
  },
  cartData: {
    type: Object
  },
  data: {
    type: Date,
    default: Date.now,
  },
})


// creating api for signup;
app.post("/signup", async(req, res)=>{
  let check = await User.findOne({email: req.body.email});
  if(check){
    return res.status(400).json({success:false, error: "Existing user found with same email address"});
  }
  let cart = {};
  for(let i=0;i<300;i++){
    cart[i]=0;
  }
  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  })
  await user.save()
  const data = {
    user: {
      id: user.id
    }
  }
  const token = jwt.sign(data, "secret_ecom");
  res.json({success: true, token})
})


// creating endpoint for Login

app.post("/login", async(req, res)=>{
  let user = await User.findOne({email: req.body.email});
  if(user){
    const passMatch = req.body.password ===  user.password;
    if(passMatch){
      const data = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(data, "secret_ecom");
      res.json({success: true, token})
    }
    else{
      res.json({success: false, error: "wrong password"})
    }
  }else{
    res.json({success: false, error: "wrong Email address"})
  }
})


// creating endPoint for latest producst

app.get("/newcollections", async(req, res)=>{
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("new collection fetchd");
  res.send(newcollection)
})

// creating endpoint for popular products;

app.get('/popularProducts', async(req, res)=>{
  let products = await Product.find({category: "men"});
  let popularProducts = products.slice(0, 4);
  console.log("fetched popular products");
  res.send(popularProducts);
})



// creating middlewar for fetch user

const fetchUser = async (req, res, next)=>{
  const token = req.header('auth-token');
  if(!token){
    res.status(401).send({errors: "please authenticate using valid login"});
  }else{
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next()
    } catch (error) {
      res.status(401).send({errors: "please authenticate usingn a valid token"});
    }
  }
}

// creating endpoint for adding products in cartdata;

app.post("/addtocart", fetchUser, async(req, res)=>{
  console.log("Added", req.body.itemId)
  let userData = await User.findOne({_id: req.user.id})
  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
  res.send("Added")
})


// creatind endpoint for removing cart
app.post("/removefromcart", fetchUser, async(req, res)=>{
  console.log("removed", req.body.itemId)
  let userData = await User.findOne({_id: req.user.id})
  if(userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})

  res.send("Removed")
})

// creating endPoint for getcart data

app.post('/getCart', fetchUser, async(req, res)=>{
  console.log("get cart");
  let userData = await User.findOne({_id: req.user.id});
  res.json(userData.cartData)
})


app.listen(port, (error) => {
  if (!error) {
    console.log("server is running on the port" + port);
  } else {
    console.log("Error" + error);
  }
});
