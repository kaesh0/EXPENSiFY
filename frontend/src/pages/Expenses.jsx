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
  function handleCancel() {
    setEditingExpense(null);
    setShowForm(false);
  }
  useEffect(() => {
    loadExpenses();
  }, []);
  if (loading) {
    return <h2>LOADING YOUR EXPENSES ,HOLD TIGHT.......</h2>;
  }
  return (
    <main className="max-w-5xl mx-auto p-6">
      {userExpenses.length !== 0 && (
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">YOUR EXPENSES</h1>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-100"
            type="button"
            onClick={() => {
              setEditingExpense(null);
              setShowForm(true);
            }}
          >
            Add Expense
          </button>
        </div>
      )}

      {showForm ? (
        <div>
          <ExpenseForm
            expense={editingExpense}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      ) : userExpenses.length === 0 ? (
        <div className="min-h-[60vh] flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mx-3 my-2">NO EXPENSES YET</h2>
          <p>START TRACKING YOUR SPENDING BY ADDING YOUR FIRST EXPENSE</p>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-100"
            type="button"
            onClick={() => {
              setEditingExpense(null);
              setShowForm(true);
            }}
          >
            ADD EXPENSES
          </button>
        </div>
      ) : (
        <div>
          <section>
            <div className="bg-white rounded-md shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-200 uppercase text-left text-sm tracking-wide font-semibold">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Actions</th>
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
            {userExpenses.length!==0 && (<div className="flex justify-end mt-4">
              <button
                  className="bg-red-500 rounded-md mt-2 py-2 px-4 hover:bg-red-700 transition-colors duration-200 text-md"
                  onClick={handleDeleteAllExpenses}
                >
                  Delete All
                </button>
            </div>)}
          </section>
        </div>
      )}
    </main>
  );
}
export default Expenses;
