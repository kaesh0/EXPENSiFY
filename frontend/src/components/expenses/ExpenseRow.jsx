export default function ExpenseRow({ expense, onEdit, onDelete }) {
  const color=expense.type==='Expense'?'text-orange-500':'text-green-400';
  return (
      <tr className="border-b hover:bg-gray-50 transition-colors duration-200">
        <td className={`px-4 py-3 ${color}`}>{expense.type}</td>
        <td className="px-4 py-3 ">{expense.category}</td>
        <td className="px-4 py-3 ">{expense.amount.toLocaleString("en-IN")}</td>
        <td className="px-4 py-3 ">{new Date(expense.transactionDate).toLocaleDateString("en-GB",{
          day:"numeric",
          month:"short",
          year:"numeric",
        })}</td>
        <td className="px-4 py-3 ">
          <div className="flex  gap-4">
            <button
              type="button"
              className="bg-gray-300 rounded-md py-1 px-3 hover:bg-gray-600 transition-colors duration-200 text-xs"
              onClick={() => {
                onEdit(expense);
              }}
            >
              EDIT
            </button>
            <button
            type="button"
              className="bg-red-500 rounded-md py-1 px-3 hover:bg-red-700 transition-colors duration-200 text-xs"
              onClick={() => onDelete(expense._id)}
            >
              DELETE
            </button>
          </div>
        </td>
      </tr>
  );
}
