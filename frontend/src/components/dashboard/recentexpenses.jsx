export default function RecentExpenses({ recentExpenses }) {
  function renderRecentExpense(expense) {
    return (
      <div key={expense._id} className="flex justify-between items-center py-3">
        <div>
          <h3 className="font-medium">{expense.category}</h3>
          <p className="font-semibold">{new Date(expense.transactionDate).toLocaleString("en-GB",{
            day:"numeric",
            month:"short",
            year:"numeric",
          })}</p>
        </div>
        <p className="text-gray-500 text-lg">₹{expense.amount.toLocaleString("en-IN")}</p>
      </div>
    );
  }
  if(recentExpenses.length===0){
    return <p>NO EXPENSES YET</p>
  }
  return <>{recentExpenses.map(renderRecentExpense)}</>
}
