export async function getUserExpenses() {
  const response = await fetch("http://localhost:3000/api/expenses", {
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}
export async function addUserExpense(expenseData) {
  const response = await fetch("http://localhost:3000/api/expenses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(expenseData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}
export async function editUserExpense(expenseId, formData) {
  const response = await fetch(
    `http://localhost:3000/api/expenses/${expenseId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}
export async function deleteExpense(expenseId) {
  const response = await fetch(
    `http://localhost:3000/api/expenses/${expenseId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}
export async function deleteAllExpenses() {
  const response = await fetch(`http://localhost:3000/api/expenses`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}
