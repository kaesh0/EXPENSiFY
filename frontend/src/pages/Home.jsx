import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="home-page">
      <section className="home-hero">
        <p className="home-kicker">PERSONAL FINANCE, SIMPLIFIED</p>
        <h1>Take control of your finances.</h1>
        <p className="home-lead">
          Track daily expenses, manage your budget, and gain meaningful insights into your spending—all in one simple and intuitive platform.
        </p>
        <button className="home-primary" type="button" onClick={() => navigate("/expenses")}>Start tracking <span aria-hidden="true">→</span></button>
      </section>

      <section className="home-features" aria-labelledby="why-expensify">
        <p className="home-kicker">BUILT FOR EVERYDAY CLARITY</p>
        <h2 id="why-expensify">Everything you need to stay on top of your money.</h2>
        <div className="home-feature-grid">
          <article className="home-feature-card"><span className="home-feature-number">01</span><h3>Dashboard</h3><p>View your financial summary, monitor spending, and stay on top of your budget at a glance.</p></article>
          <article className="home-feature-card"><span className="home-feature-number mint">02</span><h3>Expense tracking</h3><p>Add, edit, and organize daily expenses effortlessly to keep an accurate record of your finances.</p></article>
          <article className="home-feature-card"><span className="home-feature-number gold">03</span><h3>Secure authentication</h3><p>Your account is protected with secure authentication and cookies, keeping your personal data safe.</p></article>
        </div>
      </section>

      <section className="home-message">
        <h2>Make smarter decisions with less effort.</h2>
        <p>Expens!fy keeps your expenses organized in one place, so you can focus less on spreadsheets and more on building better financial habits.</p>
      </section>
    </main>
  );
}

export default HomePage;
