import {apiClient} from './apiClient'
export async function getUserExpenses() {
  return apiClient("/api/expenses")
}
export async function addUserExpense(expenseData) {
  return apiClient("/api/expenses/",{
    method: "POST",
    body: JSON.stringify(expenseData),
  });
}
export async function editUserExpense(expenseId,formData){
  return apiClient(`/api/expenses/${expenseId}`,{
    method: "PUT",
    body: JSON.stringify(formData),
  })
}
export async function deleteExpense(expenseId) {
    return apiClient(`/api/expenses/${expenseId}`,{
    method: "DELETE",
  })
}
export async function deleteAllExpenses() {
   return apiClient("/api/expenses",{
    method: "DELETE",
  })
}
