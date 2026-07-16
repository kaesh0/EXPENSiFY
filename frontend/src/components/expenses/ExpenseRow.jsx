export default function ExpenseRow({expense,onEdit,onDelete}) {
    return (
      <tr>
        <td>{expense.type}</td>
        <td>{expense.category}</td>
        <td>{expense.amount}</td>
        <td>{new Date(expense.transactionDate).toLocaleDateString()}</td>
        <td>
          <button type="button" onClick={()=>{
            onEdit(expense);
          }}>EDIT</button>
          <button onClick={()=>onDelete(expense._id)}>DELETE</button>
        </td>
      </tr>
    );
  }