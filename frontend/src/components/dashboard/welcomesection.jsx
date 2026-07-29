export default function WelcomeSection({name}){
    return(
        <div>
            <h1 className="font-bold text-3xl">HELLO,{name}</h1>
            <p className="text-gray-500 mt-1">Here's an overview of your fiances</p>
        </div>
    )
}