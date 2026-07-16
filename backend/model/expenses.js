const mongoose=require('mongoose');
const expensesSchema=mongoose.Schema({
    amount:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    transactionDate:{
        type:Date,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},{timestamps:true});
const Expenses=mongoose.model("Expenses",expensesSchema);
module.exports=Expenses;