export default function SummaryCard({title,value}){
    const isCurrency = title !== "TRANSACTIONS";
    return(
        <div className="dashboard-summary-card">
            <div className="summary-card-icon" aria-hidden="true" />
            <h3>{title}</h3>
            <p>{isCurrency ? `₹${Number(value || 0).toLocaleString("en-IN")}` : Number(value || 0).toLocaleString("en-IN")}</p>
        </div>
    )
}
