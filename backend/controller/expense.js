const Expenses=require('../model/expenses');
async function handleAddUserExpense(req,res){
    try{ 
        const {amount,type,category,transactionDate}=req.body;
        const expense=await Expenses.create({
            amount,
            type,
            category,
            transactionDate,
            createdBy:req.user._id,
        })
        return res.status(201).json(expense);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err.message});
    }
}
async function handleShowUserExpense(req,res){
    try{
        const userExpenses=await Expenses.find({createdBy:req.user._id});
        return res.status(200).json(userExpenses)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err.message});
    }
}
async function handleGetEditUserExpense(req,res){
    try{
        const expense=await Expenses.findById(req.params.id);
        if(!expense){
            return res.status(404).json({message:"Exepnse does not exist"});
        }
        if(expense.createdBy.toString()!==req.user._id.toString()){
            return res.status(403).json({message:"YOU ARE NOT AUTHORISED TO ACCESS THIS DATA"});
        }
        return res.status(200).json(expense);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err.message});
    }
}
async function handleEditUserExpense(req,res){
    try{
        const {amount,type,category,transactionDate}=req.body;
        const expense=await Expenses.findById(req.params.id);
        if(!expense){
            return res.status(404).json({message:"Exepnse does not exist"});
        }
        if(expense.createdBy.toString()!==req.user._id.toString()){
            return res.status(403).json({message:"YOU ARE NOT AUTHORISED TO ACCESS THIS DATA"})
        }
        await Expenses.findByIdAndUpdate(req.params.id,{
            amount,
            type,
            category,
            transactionDate,
        })
        return res.status(200).json({message:"Expense updated succesfully"})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err.message});
    }
}
async function handleDeleteExpenseAll(req,res) {
    try{
        const expenses=await Expenses.find({createdBy:req.user._id});
        if(expenses.length==0){
            return res.status(404).json({message:'NO EXPENSE ENTRY HAS BEEN CREATED YET'});
        }
        await Expenses.deleteMany({createdBy:req.user._id});
        return res.status(200).json({message:"Expense deleted succesfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err.message});
    }
}
async function handleDeleteExpenseById(req,res) {
    try{
        const expense=await Expenses.findById(req.params.id);
        if(!expense){
            return res.status(404).json({message:"EXPENSE DOESNT EXIST"});
        }
        if(expense.createdBy.toString()!==req.user._id.toString()){
            return res.status(403).json({message:"YOU ARE NOT AUTHORISED TO ACCESS THIS DATA"});
        }
        await Expenses.findByIdAndDelete(req.params.id);
        return res.status(200).json({message:"Expense deleted succesfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err.message});
    }
}
module.exports={handleAddUserExpense,handleEditUserExpense,handleGetEditUserExpense,handleShowUserExpense,handleDeleteExpenseAll,
    handleDeleteExpenseById}