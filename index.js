const express = require("express");
const  mongoose = require("mongoose");
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories");
const multer = require("multer");

const app = express();
const port = 5000 || process.env.PORT;

app.use(express.json());

dotenv.config();
 mongoose.connect(process.env.MONGO_URL,{
     useNewUrlParser:true,
     useUnifiedTopology: true,
     
 }).then(console.log("connectd to mongoDB")).catch((err)=>console.log(err));

 const storage = multer.diskStorage({
     destination:(req,file,cb)=>{
         cb(null,"images")

     },filename(req,file,cb){
         cb(null,req.body.name)
    }
 });
const upload = multer({storage});
 app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("File has been Uploaded");
});

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/categories",categoryRoute)

app.listen(port,()=>{
    console.log(`app is running at ${port}`);
})