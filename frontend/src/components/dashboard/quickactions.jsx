import { useNavigate } from "react-router-dom";
export default function QuickActions() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          navigate("/expenses",{state:{addExpense:true}});
        }}
      >
        ADD EXPENSE
      </button>
      <button
        type="button"
        onClick={() => {
          navigate("/expenses");
        }}
      >
        VIEW EXPENSE
      </button>
      <button
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
