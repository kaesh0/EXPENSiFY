import { useState, useEffect } from "react";
import { addUserExpense, editUserExpense } from "../../services/expenseService";
import {
  expenseCategories,
  incomeCategories,
} from "../../constants/expenseCategories";
export default function ExpenseForm({ expense, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    amount: "",
    type: "",
    category: "",
    transactionDate: "",
  });
  const [loading, setLoading] = useState(false);
  let categories = [];
  if (formData.type === "Income") {
    categories = incomeCategories;
  } else if (formData.type === "Expense") {
    categories = expenseCategories;
  }
  useEffect(() => {
    if (expense) {
      setFormData({
        amount: expense.amount,
        type: expense.type,
        category: expense.category,
        transactionDate: expense.transactionDate.split("T")[0],
      });
    } else {
      setFormData({
        amount: "",
        type: "",
        category: "",
        transactionDate: "",
      });
    }
  }, [expense]);
  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "type") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        category: "",
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (expense) {
        await editUserExpense(expense._id, formData);
      } else {
        await addUserExpense(formData);
      }
      onSuccess();
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <main>
      <form
        className="bg-white rounded-md p-6 w-full mx-auto max-w-xl shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-8">
          {expense ? "Update Expense" : "Add Expense"}
        </h2>
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            className="w-full border rounded-md px-3 py-2"
            placeholder="ENTER AMOUNT"
            id="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            min="0"
            name="amount"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2" htmlFor="type">
            Type
          </label>
          <select
            className="w-full border rounded-md px-3 py-2"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2" htmlFor="category">
            Category
          </label>
          <select
            className="w-full border rounded-md px-3 py-2"
            id="category"
            value={formData.category}
            onChange={handleChange}
            name="category"
            disabled={!formData.type}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label
            className="block text-lg font-medium mb-2"
            htmlFor="transaction-date"
          >
            Transaction Date
          </label>
          <input
            className="w-full border rounded-md px-3 py-2"
            id="transaction-date"
            type="date"
            value={formData.transactionDate}
            onChange={handleChange}
            name="transactionDate"
            required
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 rounded-md text-lg font-medium px-4 py-1  hover:bg-red-600  transition-colors duration-200"
          >
            CANCEL
          </button>
          <button
            className="bg-green-500 rounded-md text-lg font-medium px-2 py-1  hover:bg-green-600 transition-colors duration-200"
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving" : expense ? "Update Expense" : "Save Expense"}
          </button>
        </div>
      </form>
    </main>
  );
}
