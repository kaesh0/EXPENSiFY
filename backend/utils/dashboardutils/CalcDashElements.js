function calculateDashElements(userExpenses){
    let totalIncome=0,totalExpense=0,currBalance=0,transactions=userExpenses.length;
    for(const expense of userExpenses){
        if(expense.type==="Income"){
            totalIncome+=expense.amount
        }
        else{
            totalExpense+=expense.amount;
        }
    }
    currBalance=totalIncome-totalExpense;
    return{
        totalIncome,
        totalExpense,
        currBalance,
        transactions
    }
}
module.exports={calculateDashElements};