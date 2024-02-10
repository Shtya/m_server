const express = require("express")
const cors = require("cors")
const {connect } = require("mongoose")
const morgan = require("morgan")
const { errorHandler } = require("./middleware/Error")
const path = require("path") ;

require("dotenv").config()
const app = express();
app.use(cors({origin:"*"}))


app.use(express.json()) ;
app.use(express.urlencoded({extended:false})) ;
app.use(express.static(path.join(__dirname, "uploads")))

app.use(morgan("dev"))

app.use("/api/posts" , require("./routes/Posts"))
// app.use("/api/image" , require("./routes/Image"))

app.use(errorHandler)

app.all("*", (req, res, next) => {
  next(new Error (`can't find this route : ${req.originalUrl}`))
})

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "_error"

  res.status(err.statusCode).json({
    message: err.message,
    status: err.status,
    _error: err,
    stack : err.stack // The Error happen where
  })
})


connect(process.env.MONGO_URI).then(res => console.log("connect db") ).catch(err => console.log(err))
app.listen(process.env.PORT , _=> console.log(`Server running on port ${process.env.PORT}`))
