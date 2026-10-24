import { useState, useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { ExpenseRow, ExpenseForm,ExpenseFilters } from "../../components/expenses";
import {useExpenses,useDeleteExpense,useDeleteAllExpenses} from '../../hooks'
import {filters_schema} from '../../constants/expenseFilters'
import {filterExpense} from '../../utils/expenseUtils/filterExpense'
const initialFilters={...filters_schema}
function Expenses() {
  const{data:expenseData=[],isPending,isError,error}=useExpenses();
  const userExpenses = Array.isArray(expenseData) ? expenseData : [];
  const deleteExpenseMutation=useDeleteExpense();
  const deleteAllExpenseMutation=useDeleteAllExpenses();
  const[filters,setFilters]=useState(initialFilters);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const filteredExpenses=filterExpense(userExpenses,filters)
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
  function handleFilterChange(event){
    const{name,value}=event.target;
    setFilters((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  function handleClearFilters(){
    setFilters(initialFilters);
  }
  async function handleSuccess() {
    setShowForm(false);
    setEditingExpense(null);
  }
  function handleEdit(expense) {
    setEditingExpense(expense);
    setShowForm(true);
  }
  async function handleDeleteById(expenseId) {
    try {
      await deleteExpenseMutation.mutateAsync({id:expenseId})
    } catch (err) {
      console.log(err.message);
    }
  }
  async function handleDeleteAllExpenses() {
    try {
      await deleteAllExpenseMutation.mutateAsync();
    } catch (err) {
      console.log(err.message);
    }
  }
  function handleCancel() {
    setEditingExpense(null);
    setShowForm(false);
  }
  if(isError){
    return <h2>{error.message}</h2>
  }
  if (isPending) {
    return <h2>LOADING YOUR EXPENSES ,HOLD TIGHT.......</h2>;
  }
  return (
    <main className="app-page expenses-page">
      <div className="page-heading">
        <div><p className="page-kicker">Your financial picture</p><h1>Expenses</h1><p>Track every transaction without losing the bigger picture.</p></div>
        <button className="primary-action" type="button" onClick={() => { setEditingExpense(null); setShowForm(true); }}>Add expense</button>
      </div>
      <ExpenseFilters filters={filters} onChange={handleFilterChange} onClear={handleClearFilters}/>
      

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
                  {filteredExpenses.map((expense) => (
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
