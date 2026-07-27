import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ExpenseRow, ExpenseForm } from "../components/expenses/";
import {
  getUserExpenses,
  deleteAllExpenses,
  deleteExpense,
} from "../services/expenseService";
function Expenses() {
  const [userExpenses, setUserExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state?.addExpense) {
      setEditingExpense(null);
      setShowForm(true);
      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }
  }, [location.state, navigate]);
  async function loadExpenses() {
    setLoading(true);
    try {
      const expenses = await getUserExpenses();
      setUserExpenses(expenses);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }
  async function handleSuccess() {
    await loadExpenses();
    setShowForm(false);
    setEditingExpense(null);
  }
  function handleEdit(expense) {
    setEditingExpense(expense);
    setShowForm(true);
  }
  async function handleDeleteById(expenseId) {
    try {
      await deleteExpense(expenseId);
      await loadExpenses();
    } catch (err) {
      console.log(err.message);
    }
  }
  async function handleDeleteAllExpenses() {
    try {
      await deleteAllExpenses();
      await loadExpenses();
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    loadExpenses();
  }, []);
  if (loading) {
    return <h2>LOADING YOUR EXPENSES ,HOLD TIGHT.......</h2>;
  }
  return (
    <>
      <h1>YOUR EXPENSES</h1>
      <button
        type="button"
        onClick={() => {
          setEditingExpense(null);
          setShowForm(true);
        }}
      >
        ADD EXPENSES
      </button>

      {showForm ? (
        <>
          <ExpenseForm expense={editingExpense} onSuccess={handleSuccess} />
          <button
            onClick={() => {
              setEditingExpense(null);
              setShowForm(false);
            }}
          >
            CANCEL
          </button>
        </>
      ) : userExpenses.length === 0 ? (
        <p>YOU HAVE NOT CREATED ANY EXPENSE YET</p>
      ) : (
        <>
          <button onClick={handleDeleteAllExpenses}>DELETE ALL</button>
          <section>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>TYPE</th>
                    <th>CATEGORY</th>
                    <th>AMOUNT</th>
                    <th>DATE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {userExpenses.map((expense) => (
                    <ExpenseRow
                      key={expense._id}
                      expense={expense}
                      onEdit={handleEdit}
                      onDelete={handleDeleteById}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </>
  );
}
export default Expenses;
