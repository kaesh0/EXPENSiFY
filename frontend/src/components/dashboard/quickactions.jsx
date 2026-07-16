import { useNavigate } from "react-router-dom";
export default function QuickActions(){
    const navigate=useNavigate();
    return(
        <div>
            <button type="button">ADD EXPENSE</button>
            <button type="button">VIEW EXPENSE</button>
            <button type="button" onClick={()=>{navigate("/profile",{replace:true})}}>PROFILE</button>
        </div>
    )
}