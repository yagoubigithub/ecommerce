const express=  require("express");
require("dotenv").config()
const mongoose = require("mongoose")

const morgan  =require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator")
const cors = require("cors")

//import routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")


const app = express();



mongoose.connect(process.env.DATABASE,{

    useNewUrlParser : true,
    useCreateIndex : true
}).then(()=>{
    console.log("database connected")
})


//midelwares

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator())
app.use(cors())

//routes midelware
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)



const port  = process.env.PORT || 8000;

app.listen(port, ()=>{
console.log(`server is runnig on port ${port}`)
})