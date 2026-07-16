import { useState, useEffect } from "react";
import {
  WelcomeSection,
  RecentExpense,
  QuickActions,
  SummaryCard,
} from "../components/dashboard";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  
  const [currUser, setCurrUser] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [dashboardData,setDashBoardData] = useState({summary:{totalIncome:0,totalExpense:0,currBalance:0,transactions:0},recentExpenses:[]});
  const navigate=useNavigate();

  useEffect(() => {
    async function getCurrentUser() {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/expenses/dashboard", {
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
          console.log(data.message);
          navigate("/login", { replace: true });
          return;
        }
        setCurrUser({ name: data.userInfo.name, email: data.userInfo.email });
        setDashBoardData({summary:data.summary,recentExpenses:data.recentExpenses})
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    getCurrentUser();
  }, []);


  if(loading){
    return <h2>LOADING DASHBOARD,HOLD TIGHT....</h2>;
  }
  return (
    <>
       <section>
        <WelcomeSection name={currUser.name} />
      </section>
      <section>
        <h2>SUMMARY</h2>
        <div>
          <SummaryCard title="TOTAL INCOME" value={dashboardData.summary.totalIncome} />
          <SummaryCard title="TOTAL EXPENSE" value={dashboardData.summary.totalExpense} />
          <SummaryCard title="CURRENT BALANCE" value={dashboardData.summary.currBalance} />
          <SummaryCard title="TRANSACTIONS" value={dashboardData.summary.transactions} />
        </div>
      </section>
      <section>
        <h2>RECENT EXPENSES</h2>
        <RecentExpense recentExpenses={dashboardData.recentExpenses}/>
      </section>
      <section>
        <h2>QUICK ACTIONS</h2>
        <QuickActions/>
      </section>
    </>
  );
}
export default Dashboard