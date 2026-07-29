const Expenses=require('../model/expenses');
const User=require('../model/user');
const {calculateDashElements}=require('../utils/dashboardutils/CalcDashElements')
async function handleDashBoard(req,res){
    try{
        const userInfo=await User.findById(req.user._id).select("name email");
        if(!userInfo){
            return res.status(404).json({message:"USER NOT FOUND"});
        }
        const userExpenses=await Expenses.find({createdBy:req.user._id}).sort({transactionDate:-1}).limit(5);
        if(userExpenses.length===0){
            return res.status(200).json({userInfo,summary:{totalIncome:0,totalExpense:0,currBalance:0,transactions:0},recentExpenses:[]});
        }
        const summary=calculateDashElements(userExpenses);
        const recentExpenses=userExpenses.slice(0,5)
        return res.status(200).json({userInfo,summary,recentExpenses})
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}
module.exports={handleDashBoard}