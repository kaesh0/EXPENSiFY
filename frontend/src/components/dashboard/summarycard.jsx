export default function SummaryCard({title,value}){
    return(
        <div className="shadow-lg rounded-lg p-4">
            <h3 className="font-semibold">{title}</h3>
            <p className="">{value.toLocaleString("en-IN")}</p>
        </div>
    )
}