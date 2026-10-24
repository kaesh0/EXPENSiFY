import { useState, useEffect } from "react";
import {
  WelcomeSection,
  RecentExpense,
  QuickActions,
  SummaryCard,
} from "../components/dashboard";
import { Link, useNavigate } from "react-router-dom";
const API_URL=import.meta.env.VITE_API_URL;   
function Dashboard() {
  const [currUser, setCurrUser] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashBoardData] = useState({
    summary: {
      totalIncome: 0,
      totalExpense: 0,
      currBalance: 0,
      transactions: 0,
    },
    recentExpenses: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function getCurrentUser() {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/api/expenses/dashboard`,
          {
            credentials: "include",
          },
        );
        const data = await response.json();
        if (!response.ok) {
          console.log(data.message);
          navigate("/login", { replace: true });
          return;
        }
        setCurrUser({ name: data.userInfo.name, email: data.userInfo.email });
        setDashBoardData({
          summary: data.summary,
          recentExpenses: data.recentExpenses,
        });
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    getCurrentUser();
  }, []);

  if (loading) {
    return <h2>LOADING DASHBOARD,HOLD TIGHT....</h2>;
  }
  return (
    <main className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-brand"><span className="dashboard-brand-mark">E</span><strong>Expens!fy</strong></div>
        <div className="dashboard-balance"><span>Wallet balance</span><strong>₹{Number(dashboardData.summary.currBalance || 0).toLocaleString("en-IN")}</strong></div>
        <nav className="dashboard-side-nav" aria-label="Dashboard navigation">
          <Link className="dashboard-side-link active" to="/dashboard">Dashboard</Link>
          <Link className="dashboard-side-link" to="/expenses">Expenses</Link>
          <Link className="dashboard-side-link" to="/profile">Profile</Link>
        </nav>
        <div className="dashboard-user-card"><span className="dashboard-user-avatar">{currUser.name?.charAt(0) || "U"}</span><div><strong>{currUser.name || "Your account"}</strong><small>{currUser.email}</small></div></div>
      </aside>
      <div className="dashboard-content">
        <div className="dashboard-main">
          <section className="dashboard-welcome"><div><p className="page-kicker">Monthly snapshot</p><WelcomeSection name={currUser.name} /><p className="dashboard-subtitle">Your income, spending, and balance at a glance.</p></div><Link className="dashboard-date-link" to="/expenses">View expenses →</Link></section>
          <section className="dashboard-summary-grid">
            <SummaryCard title="TOTAL BALANCE" value={dashboardData.summary.currBalance} />
            <SummaryCard title="MONTHLY INCOME" value={dashboardData.summary.totalIncome} />
            <SummaryCard title="EXPENSES" value={dashboardData.summary.totalExpense} />
            <SummaryCard title="TRANSACTIONS" value={dashboardData.summary.transactions} />
          </section>
          <div className="dashboard-lower-grid"><section className="dashboard-panel dashboard-recent"><div className="dashboard-panel-heading"><h2>Recent spending log</h2><Link to="/expenses">View all records</Link></div><RecentExpense recentExpenses={dashboardData.recentExpenses} /></section><section className="dashboard-panel dashboard-quick"><div className="dashboard-panel-heading"><h2>Quick actions</h2></div><QuickActions /></section></div>
        </div>
      </div>
    </main>
  );
}
export default Dashboard;
