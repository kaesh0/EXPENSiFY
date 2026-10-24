export default function SummaryCard({title,value}){
    return(
        <div className="dashboard-summary-card">
            <div className="summary-card-icon" aria-hidden="true" />
            <h3>{title}</h3>
            <p>{value.toLocaleString("en-IN")}</p>
        </div>
    )
}
