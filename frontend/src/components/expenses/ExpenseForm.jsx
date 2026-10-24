import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  expenseCategories,
  incomeCategories,
} from "../../constants/expenseCategories";
import { useCreateExpense, useUpdateExpense } from "../../hooks";
const expenseSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than zero"),
  type: z.enum(["Expense", "Income"], {
    message: "Select a transaction type",
  }),
  category: z.string().min(1, "Select a category"),
  customCategory:z.string().optional(),
  description:z.string().optional(),
  transactionDate: z.string().min(1, "Select a transaction date"),
});
const initialFormValues = {
  amount: "",
  type: "",
  category: "",
  customCategory:"",
  description:"",
  transactionDate: "",
};
export default function ExpenseForm({ expense, onSuccess, onCancel }) {
  const createExpenseMutation = useCreateExpense();
  const updateExpenseMutation = useUpdateExpense();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: initialFormValues,
  });
  let categories = [];
  const selectedType = watch("type");
  const selectedCategory=watch("category");
  const typeField = register("type");
  if (selectedType === "Income") {
    categories = incomeCategories;
  } else if (selectedType === "Expense") {
    categories = expenseCategories;
  }
  useEffect(() => {
    if (expense) {
      reset({
        amount: expense.amount,
        type: expense.type,
        category: expense.category,
        customCategory:"",
        description:expense.description ?? "",
        transactionDate: expense.transactionDate.split("T")[0],
      });
    } else {
      reset(initialFormValues);
    }
  }, [expense, reset]);
  function handleTypeChange(e) {
    setValue("category","");
    setValue("customCategory","")
  }
  async function onSubmit(formValues) {
    const finalCategory= formValues.category==="Custom"?formValues.customCategory.trim() || "":formValues.category.trim()
    const payload={
      ...formValues,
      category:finalCategory
    }
    delete payload.customCategory
    try {
      if (expense) {
        await updateExpenseMutation.mutateAsync({
          id: expense._id,
          newData: payload,
        });
      } else {
        await createExpenseMutation.mutateAsync(payload);
      }
      onSuccess();
    } catch (err) {
      console.log(err.message);
    }
  }
  const isSaving =
    createExpenseMutation.isPending || updateExpenseMutation.isPending;
  return (
    <main className="expense-form-page">
      <form
        className="expense-form-card"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-heading">
          <p className="page-kicker">Transaction details</p>
          <h2>
          {expense ? "Update Expense" : "Add Expense"}
          </h2>
          <p>Keep your cash flow clear and up to date.</p>
        </div>
        <div className="form-field">
          <label className="block text-lg font-medium mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            className="form-control"
            placeholder="ENTER AMOUNT"
            id="amount"
            type="number"
            {...register("amount")}
          />
        </div>
        <div className="form-field">
          <label className="block text-lg font-medium mb-2" htmlFor="type">
            Type
          </label>
          <select
            className="form-control"
            id="type"
            {...typeField}
            onChange={(event) => {
              typeField.onChange(event);
              handleTypeChange();
            }}
          >
            <option value="">Select Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          {errors.type && <p>{errors.type.message}</p>}
        </div>
        <div className="form-field">
          <label className="block text-lg font-medium mb-2" htmlFor="category">
            Category
          </label>
          <select
            className="form-control"
            id="category"
            {...register("category")}
            disabled={isSaving}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {selectedCategory==="Custom" && (
            <input className="w-full border rounded-md px-3 py-2 mt-2" type="text" placeholder="Enter a Custom category" {...register("customCategory")}/>
          )}
          {errors.category && <p>{errors.category.message}</p>}
        </div>
        <div>
          <label
            className="block text-lg font-medium mb-2"
            htmlFor="description"
          >
            DESCRIPTION
          </label>
          <input
            className="form-control"
            id="description"
            type="text"
            {...register("description")}
          ></input>
        </div>
        <div className="form-field">
          <label
            className="block text-lg font-medium mb-2"
            htmlFor="transaction-date"
          >
            Transaction Date
          </label>
          <input
            className="form-control"
            id="transaction-date"
            type="date"
            {...register("transactionDate")}
          />
          {errors.transactionDate && <p>{errors.transactionDate.message}</p>}
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="bg-red-500 rounded-md text-lg font-medium px-4 py-1  hover:bg-red-600  transition-colors duration-200"
          >
            CANCEL
          </button>
          <button
            className="bg-green-500 rounded-md text-lg font-medium px-2 py-1  hover:bg-green-600 transition-colors duration-200"
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? "Saving" : expense ? "Update Expense" : "Save Expense"}
          </button>
        </div>
      </form>
    </main>
  );
}
