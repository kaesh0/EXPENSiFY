import { useNavigate } from "react-router-dom";

const features = [
  {
    eyebrow: "01",
    title: "See your money clearly",
    copy: "One calm view for income, spending, and what is safe to save next.",
    tone: "blue",
  },
  {
    eyebrow: "02",
    title: "Log life as it happens",
    copy: "Capture everyday expenses in seconds, without the spreadsheet overhead.",
    tone: "mint",
  },
  {
    eyebrow: "03",
    title: "Build better momentum",
    copy: "Simple insights help you make confident decisions month after month.",
    tone: "gold",
  },
];

function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="landing-page">
      <section className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Zero stress. Pure clarity.</p>
          <h1>Everyday money tracking, made <span>completely effortless.</span></h1>
          <p className="hero-description">
            Expens!fy helps you understand your income, track expenses, and grow real savings without complicated spreadsheets or financial jargon.
          </p>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={() => navigate("/signup")}>Create free account <span aria-hidden="true">→</span></button>
            <button className="secondary-button" type="button" onClick={() => navigate("/login")}><span className="play-mark" aria-hidden="true">▶</span> See live demo</button>
          </div>
          <p className="trust-line">No bank logins required <span>·</span> 100% private <span>·</span> Free forever</p>
        </div>

        <div className="dashboard-preview" aria-label="Preview of the Expens!fy dashboard">
          <div className="preview-topline"><span>Monthly snapshot</span><span className="goal-pill"><span className="status-dot" /> On track for $500 monthly goal</span></div>
          <div className="preview-heading"><h2>Welcome back, Alex</h2><span className="coach-pill">ⓘ Takes 5 seconds to log an expense</span></div>
          <div className="metric-grid">
            <div className="metric-card"><small>Total balance</small><strong>$3,420</strong><span>Safe to spend this month</span></div>
            <div className="metric-card mint-card"><small>Monthly income</small><strong>+$2,850</strong><span>Paycheck & stipend</span></div>
            <div className="metric-card rose-card"><small>Expenses</small><strong>-$1,240</strong><span>38% of limit used</span></div>
            <div className="metric-card"><small>Net saved</small><strong>+$1,610</strong><span>Target reached!</span></div>
          </div>
          <div className="velocity-row"><div><b>Weekly cash velocity</b><span>Trending +14.2% higher savings than October</span></div><div className="mini-bars" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div></div>
          <div className="spending-log"><div className="log-header"><b>Recent spending log <em>3 items</em></b><span>Today</span></div>
            <div className="spend-item"><span className="spend-icon coffee">●</span><div><b>Morning Coffee & Bagel</b><small>Coffee Shop · 8:45 AM</small></div><strong>-$6.80</strong></div>
            <div className="spend-item"><span className="spend-icon grocery">+</span><div><b>Weekly Groceries</b><small>Trader Joe&apos;s · 12:15 PM</small></div><strong>-$42.50</strong></div>
            <div className="spend-item"><span className="spend-icon work">▰</span><div><b>Freelance Design Stipend</b><small>Client Transfer · 2:30 PM</small></div><strong className="positive">+$350.00</strong></div>
          </div>
        </div>
      </section>

      <section className="features-section"><p className="section-kicker">Designed for everyday ease</p><h2>Built for real life, not tax auditors.</h2><p className="section-intro">Everything you need to stay on top of personal finances in a breezy, judgment-free interface.</p><div className="feature-grid">{features.map((feature) => <article className="feature-card" key={feature.eyebrow}><div className={`feature-icon ${feature.tone}`}>{feature.eyebrow}</div><h3>{feature.title}</h3><p>{feature.copy}</p></article>)}</div></section>

      <section className="cta-card"><p className="section-kicker">Your future self will thank you</p><h2>Ready to feel good about your spending?</h2><p>Join intentional spenders tracking their financial freedom today.</p><div className="hero-actions"><button className="primary-button" type="button" onClick={() => navigate("/signup")}>Get started in seconds <span aria-hidden="true">→</span></button><button className="secondary-button" type="button" onClick={() => navigate("/login")}>I already have an account <span aria-hidden="true">→</span></button></div></section>
    </main>
  );
}

export default HomePage;
