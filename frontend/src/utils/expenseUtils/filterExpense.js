import {
  incomeCategories,
  expenseCategories,
} from "../../constants/expenseCategories";
export function filterExpense(expenses, filters = {}) {
  const {
    searchTerm = "",
    type = "all",
    category = "all",
    dateFrom = "",
    dateTo = "",
    minAmount = "",
    maxAmount = "",
    sortBy = "newest",
  } = filters;
  let result = [...expenses];
  const preDefinedCategories = new Set([...incomeCategories, ...expenseCategories].filter((category)=>category!=="Custom"));
  if (searchTerm.trim()) {
    const finalSearchTerm = searchTerm.trim().toLowerCase();
    result = result.filter((expense) => {
      return (
        expense.description?.toLowerCase().includes(finalSearchTerm) ||
        expense.category?.toLowerCase().includes(finalSearchTerm)
      );
    });
  }
  if (type !== "all") {
    {
      result = result.filter((expense) => {
        return expense.type === type;
      });
    }
  }
  if (category !== "all") {
    if (category === "Custom") {
      result = result.filter((expense) => {
        return !preDefinedCategories.has(expense.category);
      });
    } else {
      result = result.filter((expense) => {
        return expense.category === category;
      });
    }
  }
  if (dateFrom) {
    result = result.filter((expense) => {
      return new Date(expense.transactionDate) >= new Date(dateFrom);
    });
  }
  if (dateTo) {
    result = result.filter((expense) => {
      return new Date(expense.transactionDate) <= new Date(dateTo);
    });
  }
  if (minAmount !== "") {
    result = result.filter((expense) => {
      return Number(expense.amount) >= Number(minAmount);
    });
  }
  if (maxAmount !== "") {
    result = result.filter((expense) => {
      return Number(expense.amount) <= Number(maxAmount);
    });
  }
  result.sort((a, b) => {
    if (sortBy === "oldest") {
      return new Date(a.transactionDate) - new Date(b.transactionDate);
    }
    if (sortBy === "amountHigh") {
      return Number(b.amount) - Number(a.amount);
    }
    if (sortBy === "amountLow") {
      return Number(a.amount) - Number(b.amount);
    }
    return new Date(b.transactionDate) - new Date(a.transactionDate);
  });
  return result;
}
