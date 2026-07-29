import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();
  return (
    <main className="max-w-5xl mx-auto flex flex-col p-8 gap-30">
      <section>
        <div className="flex flex-col items-center gap-6 py-20">
          <h1 className=" text-blue-900 text-center text-5xl font-bold">
            Expens!fy
          </h1>
          <h2 className="text-2xl font-medium">
            Take Control of Your Finances
          </h2>
          <p className="text-md text-center max-w-2xl">
            Track your daily expenses, manage your budget, and gain meaningful
            insights into your spending—all in one simple and intuitive
            platform.
          </p>
          <button
            className="bg-blue-600 rounded-3xl py-3 px-5 hover:bg-blue-700 transition-colors duration-200"
            type="button"
            onClick={() => navigate("/expenses")}
          >
            Start Tracking
          </button>
        </div>
      </section>
      <section className="py-16">
        <h2 className="text-center text-2xl mb-5">Why Choose Expens!fy?</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className=" text-center shadow-md bg-white rounded-xl  p-6 hover:bg-gray-50 transition-colors duration-200">
            <h3 className="font-semibold">Dashboard</h3>
            <p>
              View your financial summary, monitor your spending, and stay on
              top of your budget with a clear dashboard.
            </p>
          </div>
          <div className="text-center shadow-md rounded-xl bg-white p-6 hover:bg-gray-50 transition-colors duration-200">
            <h3 className="font-semibold">Expense Tracking</h3>
            <p>
              Add, edit, and organize your daily expenses effortlessly to keep
              an accurate record of your finances.
            </p>
          </div>
          <div className="text-center shadow-md rounded-xl bg-white p-6 hover:bg-gray-50 transition-colors duration-200">
            <h3 className="font-semibold">Secure Authentication</h3>
            <p>
              Your account is protected using JWT authentication and secure
              cookies, keeping your personal data safe.
            </p>
          </div>
        </div>
      </section>
      <section className="shadow-md bg-white rounded-xl max-w-4xl mx-auto p-8">
        <div className="flex flex-col gap-6 text-gray-600 leading-6">
          <p className="text-lg text-center">
            Expens!fy helps you build better financial habits by keeping all your
            expenses organized in one place. Whether you're planning a monthly
            budget or tracking daily spending, everything is easy to manage.
          </p>
          <p className="text-sm text-center">
            With secure authentication, an interactive dashboard, and seamless
            expense management, you can focus less on managing spreadsheets and
            more on making smarter financial decisions.
          </p>
        </div>
      </section>
    </main>
  );
}
export default HomePage;
