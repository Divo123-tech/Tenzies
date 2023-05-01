import "./Dice.css"

export default function Dice(props){
    const {value, isHeld, toggle} = props
    return(
    <div 
        className="die-face" 
        id={isHeld ? "green" : ""} 
        onClick={toggle}>

            <h1>{value}</h1>
    </div>
)}