const express = require("express")
const cors = require("cors"); // Add this line
const ApiError = require("./MiddleWare/Apierrors")
const connectDb = require("./Db/db")
require("dotenv").config()
const {router, redirectRoute} = require("./Routes/urlInforoutes")
const bodyParser = require("body-parser")

const app = express()

app.use(cors()); // Use CORS middleware
app.use(express.json())


connectDb()
app.listen(process.env.PORT || 5000,()=>{
console.log("listening on port",process.env.PORT || 5000)
})

app.use("/url-shortener",router)
app.use("/", redirectRoute)

app.use((err, req, res, next) => {
  console.log(err)
  // logic
  let { statusCode, message } = err;

if (!(err instanceof ApiError)) {
  statusCode = 500;
  message = 'Internal Server Error';
}

res.status(statusCode).json({
  status: 'error',
  statusCode,
  message,
});
})
