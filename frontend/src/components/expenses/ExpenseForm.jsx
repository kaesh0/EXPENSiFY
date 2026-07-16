import { useState, useEffect } from "react";
import { addUserExpense, editUserExpense } from "../../services/expenseService";
import {
  expenseCategories,
  incomeCategories,
} from "../../constants/expenseCategories";
export default function ExpenseForm({ expense, onSuccess }) {
  const [formData, setFormdata] = useState({
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
      setFormdata({
        amount: expense.amount,
        type: expense.type,
        category: expense.category,
        transactionDate: expense.transactionDate.split("T")[0],
      });
    } else {
      setFormdata({
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
      setFormdata((prev) => ({
        ...prev,
        [name]: value,
        category: "",
      }));
      return;
    }
    setFormdata((prev) => ({
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
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="AMOUNT">AMOUNT</label>
        <input
          id="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          min="0"
          name="amount"
          required
        />
        <label htmlFor="TYPE">TYPE</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">SELECT TYPE</option>
          <option value="Income">INCOME</option>
          <option value="Expense">EXPENSE</option>
        </select>
        <label htmlFor="CATEGORY">CATEGORY</label>
        <select
          id="category"
          value={formData.category}
          onChange={handleChange}
          name="category"
          disabled={!formData.type}
          required
        >
          <option value="">SELECT CATEGORY</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <label htmlFor="transaction-date">TRANSACTION DATE</label>
        <input
          id="transaction-date"
          type="date"
          value={formData.transactionDate}
          onChange={handleChange}
          name="transactionDate"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Saving" : expense ? "Update Expense" : "Add Expense"}{" "}
        </button>
      </form>
    </>
  );
}
