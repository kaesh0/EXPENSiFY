require('dotenv').config();
const express=require('express');
const cookie_parser=require('cookie-parser');
const cors=require('cors')
const mongoose=require('mongoose');
const userRoute=require('./route/user')
const expenseRoute=require('./route/expense')
const {restrictedToLoggedOnly}=require('./middleware/auth')
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected successfully")).catch((err) =>console.log(err));
const app=express();
app.use(express.json());
app.use(cookie_parser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use('/api/users',userRoute)
app.use('/api/expenses',restrictedToLoggedOnly,expenseRoute)
app.get("/", (req, res) => {

    res.send("Server is working");

});
app.listen(3000,()=>{
    console.log("SERVER RUNNING AT PORT:3000")
})