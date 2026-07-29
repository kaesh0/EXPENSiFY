import { useNavigate } from "react-router-dom";
export default function QuickActions() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-start gap-4">
      <button
        className="bg-green-400 px-2 py-1 rounded-md hover:bg-green-600 transition-colors duration-200"
        type="button"
        onClick={() => {
          navigate("/expenses",{state:{addExpense:true}});
        }}
      >
        ADD EXPENSE
      </button>
      <button
              className="bg-blue-600 px-2 py-1 rounded-md hover:bg-blue-700 transition-colors duration-200"
        type="button"
        onClick={() => {
          navigate("/expenses");
        }}
      >
        VIEW EXPENSES
      </button>
      <button
              className="bg-indigo-400 px-2 py-1 rounded-md hover:bg-indigo-600 transition-colors duration-200"
        type="button"
        onClick={() => {
          navigate("/profile");
        }}
      >
        PROFILE
      </button>
    </div>
  );
}
