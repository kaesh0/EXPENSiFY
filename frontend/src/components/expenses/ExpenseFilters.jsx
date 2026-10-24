import {
  incomeCategories,
  expenseCategories,
} from "../../constants/expenseCategories";
export default function ExpenseFilters({filters,onChange,onClear}) {
    let categories
    if(filters.type==="Income") categories=incomeCategories;
    else if(filters.type==="Expense") categories=expenseCategories;
    else categories=[...new Set([...incomeCategories,...expenseCategories])];
  return (<div className="expense-filter-bar">
    <div>
      <label htmlFor="searchTerm">Search Term</label>
      <input name="searchTerm" value={filters.searchTerm} onChange={onChange} id="searchTerm" type="text" />
    </div>
    <div>
      <label htmlFor="type">Type</label>
      <select value={filters.type} onChange={onChange}  name="type" id="type">
        <option value="all">All Types</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
    </div>
    <div>
      <label htmlFor="category">Category</label>
      <select onChange={onChange}  name="category" id="category" value={filters.category}>
        {categories.map((category)=>{
            return (<option key={category} value={category}>{category}</option>)
        })}
        <option key="all" value="all">All Categories</option>
      </select>
    </div>
    <div>
      <label htmlFor="dateFrom">AFTER DATE</label>
      <input onChange={onChange} name="dateFrom" id="dateFrom" type="date"  value={filters.dateFrom}/>
    </div>
    <div>
      <label htmlFor="dateTo">BEFORE DATE</label>
      <input onChange={onChange}  name="dateTo" id="dateTo" type="date" value={filters.dateTo}/>
    </div>
    <div>
      <label htmlFor="minAmount">Minimum Amount</label>
      <input onChange={onChange}  id="minAmount" type="number" placeholder="Enter Minimum Amount" name="minAmount" value={filters.minAmount} />
    </div>
    <div>
      <label htmlFor="maxAmount">Maximum Amount</label>
      <input onChange={onChange}  id="maxAmount" type="number" placeholder="Enter Maximum Amount" name="maxAmount" value={filters.maxAmount}  />
    </div>
    <div>
      <label htmlFor="sortBy">SORT</label>
      <select onChange={onChange}  name="sortBy" id="sortBy" value={filters.sortBy}>
        <option value="newest">NEWERST</option>
        <option value="oldest">OLDEST</option>
        <option value="amountLow">PRICE LOW TO HIGH</option>
        <option value="amountHigh">PRICE HIGH TO LOW</option>
      </select>
    </div>
    <button type="button" onClick={onClear}>Clear Filters</button>
  </div>
  )
}
