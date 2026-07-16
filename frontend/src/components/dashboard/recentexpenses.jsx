export default function RecentExpenses({ recentExpenses }) {
  function RecentExpenseCardGen(expense) {
    return (
      <div key={expense._id}>
        <h3>{expense.category}</h3>
        <p>{expense.amount}</p>
      </div>
    );
  }
  if(recentExpenses.length===0){
    return <p>NO EXPENSES YET</p>
  }
  return <>{recentExpenses.map(RecentExpenseCardGen)}</>
}
